import { createContext, useEffect, useState } from "react";
import { LOCAL_STORAGE_TODOS_APP } from "../utils/constants";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_TODOS_APP, JSON.stringify(user));
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
