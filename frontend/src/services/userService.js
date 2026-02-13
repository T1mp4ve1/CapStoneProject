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

export const getSingleUsers = async (token) => {
  try {
    const res = await fetch(`${api}/AppUser/single_user`, {
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
export const updateUser = async (body, token) => {
  try {
    const res = await fetch(`${api}/AppUser`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Error update! Status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Update user error:", err);
  }
};

export const updateUserRole = async (userId, newRole, token) => {
  try {
    const res = await fetch(`${api}/AppUser/changeRole`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({userId, newRole}),
    });

    if (!res.ok) {
      throw new Error(`Error update! Status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Update user error:", err);
  }
};

export const appRoles = ["Admin", "Vice", "Operator", "User"];

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
