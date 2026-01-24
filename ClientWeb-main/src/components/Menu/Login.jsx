import React, { useState, useContext } from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { login } from "../../api/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
  
    setLoading(true);
    try {
      const data = await login(email, password);
  
      if (data && data.user) {
        setSuccessMessage(`Bienvenue, ${data.user.name || "Utilisateur"} !`);
        setError("");
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError("Erreur lors de la connexion. Veuillez vérifier vos identifiants.");
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
      setSuccessMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary px-4 py-12">
      <div className="w-full max-w-lg">
        {/* Alert Messages */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg backdrop-blur-sm">
            <p className="font-medium">{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-lg backdrop-blur-sm">
            <p className="font-medium">{successMessage}</p>
          </div>
        )}

        {/* Login Card */}
        <div className="p-8 bg-card border border-border rounded-2xl shadow-xl">
          <h1 className="mb-8 text-4xl font-bold text-text">
            Connexion
          </h1>

          {!user ? (
            <form onSubmit={handleLogin} className="space-y-6" noValidate>
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                />
              </div>

              <div className="text-right">
                <a
                  href="/forgot-password"
                  className="text-sm text-primary hover:text-accent font-medium hover:underline transition-colors"
                >
                  Mot de passe oublié ?
                </a>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 text-white bg-gradient-to-r from-primary to-accent rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Connexion..." : "Se connecter"}
              </button>
            </form>
          ) : (
            <div className="text-center py-8">
              <div className="text-5xl mb-4">👋</div>
              <h2 className="text-2xl font-bold mb-2 text-text">
                Bienvenue, {user.name}!
              </h2>
              <p className="text-text-secondary">Email : {user.email}</p>
            </div>
          )}

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-text-secondary text-sm">ou</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="flex items-center justify-center w-full py-3 border border-border bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-all font-medium text-text">
              <FaGoogle className="mr-2 text-xl text-red-500" />
              Continuer avec Google
            </button>

            <button className="flex items-center justify-center w-full py-3 border border-border bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-all font-medium text-text">
              <FaFacebook className="mr-2 text-xl text-blue-500" />
              Continuer avec Facebook
            </button>

            <button className="flex items-center justify-center w-full py-3 border border-border bg-bg-secondary rounded-lg hover:bg-bg-tertiary transition-all font-medium text-text">
              <FaTwitter className="mr-2 text-xl text-sky-500" />
              Continuer avec Twitter
            </button>
          </div>

          {/* Sign-up Link */}
          <p className="text-center text-text-secondary mt-8">
            Pas encore de compte ?{" "}
            <a href="/signup" className="text-primary hover:text-accent font-semibold hover:underline transition-colors">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;