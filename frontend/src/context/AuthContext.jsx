import { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
  );
  const [userEmail, setUserEmail] = useState(
    () => localStorage.getItem("userEmail") || null,
  );
  const [userRoles, setUserRoles] = useState(
    () => localStorage.getItem("userRoles") || "[]",
  );

  const isLogged = !!token;

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("userEmail", data.email);
    localStorage.setItem("userRoles", JSON.stringify(data.roles));

    setToken(data.token);
    setUserEmail(data.email);
    setUserRoles(data.roles);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRoles");

    setToken(null);
    setUserEmail(null);
    setUserRoles([]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userEmail,
        userRoles,
        isLogged,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}