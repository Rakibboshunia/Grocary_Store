import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      const { password: _, ...safeUser } = found;
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);
      return { success: true };
    }
    return { success: false, message: "Invalid email or password." };
  };

  const register = (name, email, password) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find(u => u.email === email)) {
      return { success: false, message: "Email already registered." };
    }
    const newUser = { id: Date.now(), name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    const { password: _, ...safeUser } = newUser;
    localStorage.setItem("user", JSON.stringify(safeUser));
    setUser(safeUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
