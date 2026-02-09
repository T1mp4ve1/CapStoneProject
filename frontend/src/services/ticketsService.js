const api = import.meta.env.VITE_API_URL;

// C
export const createTicket = async (ticket, token) => {
  try {
    const res = await fetch(`${api}/Ticket`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ problem: ticket }),
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
export const getTickets = async (state, token) => {
  try {
    const url =
      state === "All" ? `${api}/Ticket` : `${api}/Ticket?state=${state}`;

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`Error read! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Read tickets error:", err);
    throw err;
  }
};

export const getUserTickets = async (token) => {
  try {
    const res = await fetch(`${api}/Ticket/my`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      throw new Error(`Error read! Status: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Read ticket error:", err);
    throw err;
  }
};

// U
export const updateTicketState = async (id, newState, token) => {
  try {
    const res = await fetch(`${api}/Ticket/${id}/update_state`, {
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
export const deleteTicket = async (id, token) => {
  try {
    const request = await fetch(`${api}/Ticket/${id}/delete`, {
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
    console.error("Delete ticket error:", err);
  }
};
