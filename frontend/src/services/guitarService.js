import { imgs } from "./customShopService";

const api = import.meta.env.VITE_API_URL;

// C
export const createGuitar = async (guitar) => {
  try {
    const res = await fetch(`${api}/Guitar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(guitar),
    });
    if (!res.ok) {
      throw new Error(`Error create! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Create guitar error", err);
    throw err;
  }
};

// R
export const getGuitars = async () => {
  try {
    const res = await fetch(`${api}/Guitar`);
    if (!res.ok) {
      throw new Error(`Error read! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Read guitar error:", err);
    throw err;
  }
};

export const getGuitar = async (id) => {
  try {
    const guitarRes = await fetch(`${api}/Guitar/${id}`);
    if (!guitarRes.ok) {
      throw new Error(`Error guitar! Status: ${guitar.status}`);
    }
    const guitar = await guitarRes.json();

    if(guitar.custom){
      return guitar;
    }

    const imgsRes = await fetch(`${api}/Image/${id}`);
    if (!imgsRes.ok) {
      throw new Error(`Error imgs! Status: ${imgs.status}`);
    }
    const imgs = await imgsRes.json();

    return { ...guitar, imgs, mainImg: imgs.find((i) => i.isMain)?.url };
  } catch (err) {
    console.error("Read guitar error:", err);
    throw err;
  }
};

// U
export const updateGuitar = async (id, guitar, token) => {
  try {
    const res = await fetch(`${api}/Guitar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(guitar),
    });
    if (!res.ok) {
      throw new Error(`Error update! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Update guitar error:", err);
  }
};

// D
export const deleteGuitar = async (id, token) => {
  try {
    const res = await fetch(`${api}/Guitar/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`Error delete! Status: ${res.status}`);
    }
    return true;
  } catch (err) {
    console.error("Delete guitar error:", err);
  }
};
