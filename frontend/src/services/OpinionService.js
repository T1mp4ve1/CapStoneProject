const api = import.meta.env.VITE_API_URL;;

// C
export const createOpinion = async (body, token) => {
  const res = await fetch(`${api}/Opinion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

// R
export const getAllOpinions = async () => {
  const res = await fetch(`${api}/Opinion`);
  return await res.json();
};

export const getMyOpinions = async (token) => {
  const res = await fetch(`${api}/Opinion/my`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};

// U
export const updateOpinion = async (id, body, token) => {
  const res = await fetch(`${api}/Opinion/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  return await res.json();
};

// D
export const deleteOpinion = async (id, token) => {
  const res = await fetch(`${api}/Opinion/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};