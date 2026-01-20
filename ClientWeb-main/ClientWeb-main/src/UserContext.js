import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Vérifie si une session utilisateur existe au chargement de l'application
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/users/me", {
          method: "GET",
          credentials: "include", // Inclure les cookies de session
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user); // Met à jour l'utilisateur si une session est active
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la session :", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
