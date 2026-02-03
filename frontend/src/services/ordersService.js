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
export const getOrders = async (state, token) => {
  try {
    const url = state === "All" ? `${api}/Order` : `${api}/Order?state=${state}`;

    const res = await fetch(url, {
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

export const getUserOrders = async (token) => {
  try {
    const res = await fetch(`${api}/Order/my`, {
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
