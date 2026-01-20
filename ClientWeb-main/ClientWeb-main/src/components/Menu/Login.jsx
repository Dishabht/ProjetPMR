import React, { useState, useContext, useEffect } from "react";
import Logo from "../../images/logo/PMoveLogoAvecStyle.png";
import BackLogin from "../../images/BackLogin.png";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";
import { login, validateToken } from "../../api/api"; // Import de la fonction login et validateToken depuis api.js

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { user, setUser } = useContext(UserContext); // Utilisation du contexte
  const navigate = useNavigate();

  // useEffect(() => {
  //   // Vérifier si token présent
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // Demander a l'api de valider le token
  //     validateToken(token)
  //       .then((data) => {
  //         if (data && data.user) {
  //           setUser(data.user);
  //         }
  //       })
  //       .catch((err) => {
  //         console.error("Erreur lors de la validation du token :", err);
  //         localStorage.removeItem("token");
  //         localStorage.removeItem("user");
  //       });
  //   }
  // }, [setUser]);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
  
    try {
      console.log("Tentative de connexion avec :", { email, password });
      // Appel à la fonction `login` depuis api.js
      const data = await login(email, password);
      console.log("Réponse reçue de l'API :", data);
  
      if (data && data.user) {
        setSuccessMessage(`Bienvenue, ${data.user.name || "Utilisateur"} !`);
        setError("");
        setUser(data.user); // Met à jour l'utilisateur dans le contexte
        localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
        localStorage.setItem("user", JSON.stringify(data.user)); // Stocker les informations de l'utilisateur dans le localStorage
        navigate("/"); // Redirection après connexion
      } else {
        setError(
          "Erreur lors de la connexion. Veuillez vérifier vos identifiants."
        );
      }
    } catch (err) {
      console.error("Erreur lors de la connexion :", err);
      setError(err.message || "Une erreur est survenue. Veuillez réessayer.");
      setSuccessMessage("");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <img
        src={Logo} 
        alt="Logo"
        className="absolute mr-100 3xl:-top-40 xl:top-24 w-3/12 mt-2 hidden lg:block"
      />

      <div className="flex items-center justify-center min-h-screen mt-28">
        <div className="relative flex flex-col xl:items-start items-center p-20 mt-48">
          <h1 className="-mt-40 font-raleway font-bold text-[60px] items-start text-2xl font-bold z-10">
            Connexion
          </h1>

          <div className="relative">
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[375px]">
              {error && (
                <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4 w-[375px] rounded-lg">
                  <p className="font-medium">{error}</p>
                </div>
              )}
              {successMessage && (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4 w-[375px] rounded-lg">
                  <p className="font-medium">{successMessage}</p>
                </div>
              )}
            </div>
          </div>

          {!user ? (
            <div className="flex flex-col xl:items-start items-center mt-12 bg-white">
              <form onSubmit={handleLogin} className="flex flex-col" noValidate>
                <label className="font-raleway text-xl block font-raleway text-left font-bold mb-1 z-10">
                  Adresse mail
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Entrez votre email"
                  className="w-[375px] px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-black z-10 border border-black"
                />

                <label className="block font-raleway text-xl text-left font-bold mb-1 z-10">
                  Mot de passe
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Entrez votre mot de passe"
                  className="w-[375px] px-4 py-2 border rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-black z-10 border border-black"
                />

                {/* Forgot Password */}
                <div className="text-left mt-2 mb-4">
                  <a
                    href="/forgot-password"
                    className="font-raleway text-md text-black font-bold hover:underline "
                  >
                    Mot de passe oublié ?
                  </a>

                  <div className="relative opacity-50 opacity-100">
                    <div className="absolute ">
                      <img
                        src={BackLogin}
                        alt="fond"
                        className="xl:max-w-[650px] xl:ml-64 -ml-16 xl:-mt-[440px] -mt-[460px] max-w-[500px] z-0 "
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-[375px] color-blues-3 text-white py-2 text-lg rounded-lg font-bold font-raleway transition z-10"
                >
                  Se connecter
                </button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col xl:items-start items-center mt-12 bg-white">
              <div className="text-center">
                <h2 className="text-xl font-bold mb-4">
                  Bienvenue, {user.name}!
                </h2>
                <p>Email : {user.email}</p>
              </div>
            </div>
          )}
          <div className="flex items-center mt-12 lg:mt-24 mb-8">
            <div className="border-t border-gray-300 w-[155px] lg:w-[380px]"></div>
            <span className="px-4 text-gray-500">ou</span>
            <div className="border-t border-gray-300 w-[155px] lg:w-[380px]"></div>
          </div>

          <div className="flex flex-col items-center">
            <h2 className="text-lg font-raleway mb-6">Connectez-vous avec</h2>
            <button className="flex font-raleway font-bold items-center justify-center w-[375px] lg:w-[830px] border border-black rounded-lg py-2 mb-4 hover:bg-gray-100 ">
              <FaGoogle className="mr-2 text-xl text-red-600" />
              Continuer avec Google
            </button>

            <button className="flex font-raleway font-bold items-center justify-center  w-[375px] lg:w-[830px] border border-black rounded-lg py-2 mb-4 hover:bg-gray-100">
              <FaFacebook className="mr-2 text-xl text-blue-600" />
              Continuer avec Facebook
            </button>

            <button className="flex font-raleway font-bold items-center justify-center  w-[375px] lg:w-[830px] border border-black rounded-lg py-2 hover:bg-gray-100">
              <FaTwitter className="mr-2 text-xl text-blue-600" />
              Continuer avec Twitter
            </button>
            <div className="flex justify-center items-center">
              <p className="text-center font-raleway text-md mt-4">
                Vous avez besoin d'un compte ?
                <a href="/signup" className="ml-1 text-blue hover:underline">
                  S'inscrire
                </a>
              </p>
            </div>
          </div>

          {/* Sign-up Link */}
        </div>
      </div>
    </div>
  );
};

export default Login;
