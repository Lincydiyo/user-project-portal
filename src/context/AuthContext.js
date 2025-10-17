import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (username, password) => {
    let role = null;
    if (username === "admin" && password === "admin12345") role = "admin";
    else if (username === "manager" && password === "manager12345")
      role = "manager";
    else if (username === "user" && password === "user12345") role = "user";
    if (!role) return false;
    setUser({ name: username, role });
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
