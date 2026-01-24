import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logo/PMoveLogoSANSTITRE.png";
import { UserContext } from "../../UserContext";
import { logout } from "../../api/api";

const Navbars = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Erreur lors de la déconnexion.");
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-gradient-to-r from-bg-secondary/60 via-bg-tertiary/60 to-bg-secondary/60 backdrop-blur-2xl border-b border-border/40">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between gap-6">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={Logo} alt="PMove" className="h-10 w-auto" />
          <span className="text-xl font-bold text-primary hidden sm:inline">
            PMove
          </span>
        </Link>

        {/* Menu central */}
        <div className="hidden lg:flex items-center gap-1">
          {[
            { to: "/", label: "Accueil" },
            { to: "/itinerary", label: "Trajet" },
            { to: "/prereservation", label: "Réservation" },
            { to: "/contact", label: "Contact" },
            { to: "/help", label: "Aide" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-4 py-2 text-text font-medium text-sm hover:text-primary hover:bg-white/5 rounded-lg transition-all duration-300"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Droite : Auth + Actions */}
        <div className="flex items-center gap-4 ml-auto">
          <div className="hidden md:flex items-center gap-3 text-sm">
            {user ? (
              <>
                <Link to="/profile" className="text-text hover:text-primary transition-smooth font-medium">
                  {user.name}
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-text-secondary hover:text-primary transition-smooth"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-text hover:text-primary transition-smooth font-medium">
                  Connexion
                </Link>
                <Link to="/signup" className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-all duration-300">
                  S'inscrire
                </Link>
              </>
            )}
          </div>

          {/* Mobile CTA */}
          <Link
            to="/prereservation"
            className="md:hidden px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium text-sm transition-all duration-300"
          >
            Réserver
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbars;