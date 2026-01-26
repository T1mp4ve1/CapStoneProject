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

    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRoles", JSON.stringify(data.roles));

    return data;
  } catch (err) {
    console.error("Error login:", err);
    throw err;
  }
};

export const logoutFunc = async () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userRoles");
};

export const getToken = () => localStorage.getItem("token");
