import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("dukaandost_user")) || null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const saved = JSON.parse(localStorage.getItem("dukaandost_registered_users") || "[]");
    const found = saved.find((u) => u.email === email && u.password === password);

    if (!found) {
      if (email === "seller@test.com" && password === "Test@1234") {
        const seller = { name: "Sports Store Owner", email, role: "seller" };
        setUser(seller);
        localStorage.setItem("dukaandost_user", JSON.stringify(seller));
        return seller;
      }
      throw new Error("Invalid email or password.");
    }

    const safeUser = { name: found.name, email: found.email, role: found.role || "customer" };
    setUser(safeUser);
    localStorage.setItem("dukaandost_user", JSON.stringify(safeUser));
    return safeUser;
  };

  const register = (data) => {
    const saved = JSON.parse(localStorage.getItem("dukaandost_registered_users") || "[]");
    if (saved.some((u) => u.email === data.email)) {
      throw new Error("An account with this email already exists.");
    }
    const customer = { ...data, role: "customer" };
    localStorage.setItem(
      "dukaandost_registered_users",
      JSON.stringify([...saved, customer])
    );
    const safeUser = { name: data.name, email: data.email, role: "customer" };
    setUser(safeUser);
    localStorage.setItem("dukaandost_user", JSON.stringify(safeUser));
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("dukaandost_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}