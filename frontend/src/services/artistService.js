const api = import.meta.env.VITE_API_URL;

export const getArtists = async () => {
  try {
    const res = await fetch(`${api}/Artist`);
    if (!res.ok) {
      throw new Error(`Error! Status: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching artists:", err);
    throw err;
  }
};