import React, { useState } from "react";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    num: "",
    mail: "",
    handicap: "",
    civilite: "",
    birth: "",
    password: "",
    contact_mail: "",
    contact_num: "",
    note: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  console.log("Données envoyées:", formData); // Debug
  try {
    const response = await fetch("http://localhost:3000/users/userAdd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    console.log("Réponse reçue:", result); // Debug
    if (response.ok) {
      alert("Client ajouté avec succès");
      window.location.href = "/login"; // Redirection vers la page de connexion
    } else {
      alert(`Erreur: ${result.error || result.errormessage}`);
      console.error("Détails de l'erreur:", result); // Debug
    }
  } catch (error) {
    console.error("Erreur catch:", error); // Debug
    alert("Erreur lors de l'envoi des données: " + error.message);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-text mb-8">
            S'inscrire
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Civilité */}
            <div>
              <h4 className="text-lg font-semibold text-text mb-3">
                Civilité
              </h4>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="civilite"
                    value="1"
                    onChange={handleChange}
                    className="mr-2 accent-primary"
                  />
                  <span className="text-text">Mr</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="civilite"
                    value="2"
                    onChange={handleChange}
                    className="mr-2 accent-primary"
                  />
                  <span className="text-text">Mme</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="civilite"
                    value="3"
                    onChange={handleChange}
                    className="mr-2 accent-primary"
                  />
                  <span className="text-text">Autre</span>
                </label>
              </div>
            </div>

            {/* Nom et Prénom */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Nom
                </h4>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="Votre nom"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Prénom
                </h4>
                <input
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="Votre prénom"
                />
              </div>
            </div>

            {/* Email et Téléphone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Adresse e-mail
                </h4>
                <input
                  type="email"
                  name="mail"
                  value={formData.mail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="votre@email.com"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Téléphone
                </h4>
                <input
                  type="tel"
                  name="num"
                  value={formData.num}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="06 12 34 56 78"
                />
              </div>
            </div>

            {/* Handicap et Date de naissance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Type de handicap
                </h4>
                <select
                  name="handicap"
                  value={formData.handicap}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                >
                  <option value="">Sélectionner un handicap</option>
                  <option value="1">BLND : Malvoyant ou non voyant</option>
                  <option value="2">DEAF : Malentendant ou sourd</option>
                  <option value="3">DPNA : Déficience Intellectuelle ou comportementale</option>
                  <option value="4">WCHR : Besoin de fauteuil roulant pour les déplacements</option>
                  <option value="5">WCHS : Besoin d'aide pour tout déplacement</option>
                  <option value="6">WCHC : Assistance complète nécessaire</option>
                  <option value="7">MAAS : Assistance spécifique</option>
                </select>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Date de naissance
                </h4>
                <input
                  type="date"
                  name="birth"
                  value={formData.birth}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                />
              </div>
            </div>

            {/* Contact Mail et Contact Num */}
            <div className="border-t border-border pt-6">
              <h3 className="text-xl font-bold text-text mb-4">Contact d'urgence</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-text mb-2">
                    Email de contact
                  </h4>
                  <input
                    type="email"
                    name="contact_mail"
                    value={formData.contact_mail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="contact@email.com"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-text mb-2">
                    Téléphone de contact
                  </h4>
                  <input
                    type="tel"
                    name="contact_num"
                    value={formData.contact_num}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            {/* Mot de passe et Note */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Mot de passe
                </h4>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-text mb-2">
                  Note (optionnel)
                </h4>
                <textarea
                  name="note"
                  value={formData.note}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all resize-none"
                  rows="3"
                  placeholder="Informations complémentaires..."
                ></textarea>
              </div>
            </div>

            {/* Bouton d'inscription */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                S'inscrire
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-text-secondary text-sm">ou</span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <h2 className="text-center text-text mb-4">Connectez-vous avec</h2>
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

          {/* Login Link */}
          <p className="text-center text-text-secondary mt-8">
            Vous avez déjà un compte ?{" "}
            <a href="/login" className="text-primary hover:text-accent font-semibold hover:underline transition-colors">
              Se connecter
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;