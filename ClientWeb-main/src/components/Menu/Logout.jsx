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
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      } else {
        console.error("Erreur lors de la déconnexion.");
      }
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary px-4">
      <div className="max-w-md w-full p-8 bg-card border border-border rounded-2xl shadow-xl text-center">
        <div className="text-6xl mb-6">👋</div>
        <h2 className="text-3xl font-bold text-text mb-4">
          Se déconnecter ?
        </h2>
        <p className="text-text-secondary mb-8">
          Êtes-vous sûr de vouloir vous déconnecter de votre compte ?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex-1 px-6 py-3 bg-bg-secondary border border-border text-text font-semibold rounded-lg hover:bg-bg-tertiary transition-all"
          >
            Annuler
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;