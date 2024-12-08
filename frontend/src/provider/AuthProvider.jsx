import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("jwt"));
  const updateToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      localStorage.setItem("jwt", newToken);
    } else {
      localStorage.removeItem("jwt");
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("jwt");
      if (token !== storedToken) {
        setToken(storedToken);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken: updateToken }}>
      {children}
    </AuthContext.Provider>
  );
}
