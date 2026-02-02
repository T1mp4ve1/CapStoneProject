const api = import.meta.env.VITE_API_URL;

// C
export const createOrder = async (order, token) => {
  try {
    const res = await fetch(`${api}/Order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });
    if (!res.ok) {
      throw new Error(`Error create! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Create order error", err);
    throw err;
  }
};

// R
export const getOrders = async (token) => {
  try {
    const res = await fetch(`${api}/Order`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`Error read! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Read orders error:", err);
    throw err;
  }
};

// export const getGuitar = async (id) => {
//   try {
//     const guitarRes = await fetch(`${api}/Guitar/${id}`);
//     if (!guitarRes.ok) {
//       throw new Error(`Error guitar! Status: ${guitar.status}`);
//     }
//     const guitar = await guitarRes.json();

//     const imgsRes = await fetch(`${api}/Image/${id}`);
//     if (!imgsRes.ok) {
//       throw new Error(`Error imgs! Status: ${imgs.status}`);
//     }
//     const imgs = await imgsRes.json();

//     return { ...guitar, imgs, mainImg: imgs.find((i) => i.isMain)?.url };
//   } catch (err) {
//     console.error("Read guitar error:", err);
//     throw err;
//   }
// };

// U
export const updateOrderState = async (id, newState, token) => {
  try {
    const res = await fetch(`${api}/Order/${id}/state`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ state: newState }),
    });
    if (!res.ok) {
      throw new Error(`Error state update! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Update state error:", err);
  }
};

// D
export const deleteOrder = async (id, token) => {
  try {
    const request = await fetch(`${api}/Order/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!request.ok) {
      throw new Error(`Error delete! Status: ${request.status}`);
    }
    const result = request.json();
    return result;
  } catch (err) {
    console.error("Delete order error:", err);
  }
};
