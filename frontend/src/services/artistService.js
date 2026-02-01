const api = import.meta.env.VITE_API_URL;
// C
export const createArtist = async (artist, token) => {
  try {
    const res = await fetch(`${api}/Artist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(artist),
    });

    if (!res.ok) {
      throw new Error(`Error create! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Create artist error", err);
    throw err;
  }
};

// R
export const getArtists = async () => {
  try {
    const res = await fetch(`${api}/Artist`);
    if (!res.ok) {
      throw new Error(`Error read! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Read artist error:", err);
    throw err;
  }
};

// U
export const updateArtist = async (id, artist, token) => {
  try {
    const res = await fetch(`${api}/Artist/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(artist),
    });

    if (!res.ok) {
      throw new Error(`Error update! Status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error("Update artist error:", err);
  }
};

// D
export const deleteArtist = async (id, token) => {
  try {
    const res = await fetch(`${api}/Artist/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error delete! Status: ${res.status}`);
    }
  } catch (err) {
    console.error("Delete artist error:", err);
  }
};
