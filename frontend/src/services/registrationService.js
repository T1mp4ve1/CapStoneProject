const api = import.meta.env.VITE_API_URL;

export const registrationFunc = async (email, password, firstName) => {
    const res = await fetch(`${api}/AppUser`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, firstName }),
    });

    if (!res.ok) {
      const errData = await res.json();
      throw errData;
    }

    const data = await res.json();
    return data;
};
