import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  // Load user from localStorage when app first loads
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : "";
  });

  // Whenever user changes, update localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useDetails = () => {
  return useContext(UserContext);
};
