import { getToken } from "./authService";

const api = import.meta.env.VITE_API_URL;

// C
export const createArtist = async (artist) => {
  try {
    const token = getToken();
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
    console.error("Read artists error:", err);
    throw err;
  }
};

// U

// D
