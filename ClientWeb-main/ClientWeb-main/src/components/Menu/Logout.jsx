import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

const Logout = () => {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:3000/users/logout", {
        method: "POST",
        credentials: "include", // Nécessaire pour inclure les cookies de session
      });

      if (response.ok) {
        setUser(null); // Réinitialise l'utilisateur dans le contexte
        navigate("/"); // Redirige vers la page de connexion
      } else {
        console.error("Erreur lors de la déconnexion.");
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition"
      >
        Se déconnecter
      </button>
    </div>
  );
};

export default Logout;
