const api = import.meta.env.VITE_API_URL;

export const registrationFunc = async (email, password, firstName) => {
  try {
    const res = await fetch(`${api}/AppUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName }),
    });

    if (!res.ok) {
      throw new Error(`Wrong form: ${res.status}`);
    }

    const data = await res.json();

    return data;
  } catch (err) {
    console.error("Error registration:", err);
    throw err;
  }
};
