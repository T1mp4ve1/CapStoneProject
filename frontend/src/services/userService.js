const api = import.meta.env.VITE_API_URL;

export const registrationFunc = async (email, password, firstName) => {
    const res = await fetch(`${api}/AppUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw errData;
    }

    const data = await res.json();
    return data;
};

// C
// export const createArtist = async (artist) => {
//   try {
//     const res = await fetch(`${api}/Artist`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(artist),
//     });

//     if (!res.ok) {
//       throw new Error(`Error create! Status: ${res.status}`);
//     }
//     return await res.json();
//   } catch (err) {
//     console.error("Create artist error", err);
//     throw err;
//   }
// };

// R
export const getUsers = async (token) => {
  try {
    const res = await fetch(`${api}/AppUser`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`Service error! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Read users error:", err);
    throw err;
  }
};

// U
// export const updateArtist = async (id, artist) => {
//   try {
//     const res = await fetch(`${api}/Artist/${id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(artist),
//     });

//     if (!res.ok) {
//       throw new Error(`Error update! Status: ${res.status}`);
//     }

//     return await res.json();
//   } catch (err) {
//     console.error("Update artist error:", err);
//   }
// };

// D
export const deleteUser = async (email, token) => {
  try {
    const res = await fetch(`${api}/AppUser/${email}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error delete! Status: ${res.status}`);
    }
  } catch (err) {
    console.error("Delete user error:", err);
  }
};
