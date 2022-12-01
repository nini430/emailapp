import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [selection, setSelection] = useState(
    localStorage.getItem("recipient")
      ? JSON.parse(localStorage.getItem("recipient"))
      : []
  );

  const setName = (name) => {
    setCurrentUser(name);
  };
  const logout = () => {
    setCurrentUser(null);
    setSelection([]);
    window.location.reload();
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);
  useEffect(() => {
    localStorage.setItem("recipient", JSON.stringify(selection));
  }, [selection]);
  return (
    <UserContext.Provider
      value={{
        user: currentUser,
        setName,
        logout,
        setSelection,
        selection: selection,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
