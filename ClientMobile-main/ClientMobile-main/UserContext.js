import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    ID_Client: null,
    name: "",
    surname: "",
    mail: "",
    num: "",
    contact_num: "",
    birth: "",
    handicap: "",
    contact_mail: "",
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
