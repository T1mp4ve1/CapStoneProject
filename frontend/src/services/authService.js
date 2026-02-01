const api = import.meta.env.VITE_API_URL;

export const loginFunc = async (email, password) => {
  try {
    const res = await fetch(`${api}/AppUser/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      throw new Error(`Wrong credentials: ${res.status}`);
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error login:", err);
    throw err;
  }
};