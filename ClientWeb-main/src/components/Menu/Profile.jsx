import React, { useState } from "react";
import { updateUserProfile } from "../../api/api";
import { FaUser, FaSave } from "react-icons/fa";

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    ID_Client: "",
    civilite: "",
    telephone: "",
    prenom: "",
    nom: "",
    adresse: "",
    handicap: "",
    birth: "",
    contact_mail: "",
    contact_num: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);
      const response = await updateUserProfile(personalInfo);
      setSuccessMessage("Profil mis à jour avec succès !");
      console.log("Profil mis à jour :", response);
    } catch (err) {
      setError("Erreur lors de la mise à jour du profil. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <FaUser className="text-4xl text-primary" />
          <div>
            <h1 className="text-4xl font-bold text-text">Mon Profil</h1>
            <p className="text-text-secondary">Gérez vos informations personnelles</p>
          </div>
        </div>

        {/* Alert Messages */}
        {successMessage && (
          <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-lg">
            <p className="font-medium">{successMessage}</p>
          </div>
        )}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
            <p className="font-medium">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Civilité */}
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Civilité
              </label>
              <select
                name="civilite"
                value={personalInfo.civilite}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
              >
                <option value="">Sélectionnez</option>
                <option value="Monsieur">Monsieur</option>
                <option value="Madame">Madame</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Nom & Prénom */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Prénom
                </label>
                <input
                  type="text"
                  name="prenom"
                  value={personalInfo.prenom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="Votre prénom"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Nom
                </label>
                <input
                  type="text"
                  name="nom"
                  value={personalInfo.nom}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="Votre nom"
                />
              </div>
            </div>

            {/* Téléphone & Date de naissance */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  name="telephone"
                  value={personalInfo.telephone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="06 12 34 56 78"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-text mb-2">
                  Date de naissance
                </label>
                <input
                  type="date"
                  name="birth"
                  value={personalInfo.birth}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                />
              </div>
            </div>

            {/* Adresse */}
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Adresse
              </label>
              <input
                type="text"
                name="adresse"
                value={personalInfo.adresse}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                placeholder="Votre adresse complète"
              />
            </div>

            {/* Handicap */}
            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Type de handicap
              </label>
              <input
                type="text"
                name="handicap"
                value={personalInfo.handicap}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                placeholder="Précisez si nécessaire"
              />
            </div>

            {/* Contact d'urgence */}
            <div className="border-t border-border pt-6 mt-6">
              <h3 className="text-xl font-bold text-text mb-4">Contact d'urgence</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Email de contact
                  </label>
                  <input
                    type="email"
                    name="contact_mail"
                    value={personalInfo.contact_mail}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="contact@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-text mb-2">
                    Téléphone de contact
                  </label>
                  <input
                    type="tel"
                    name="contact_num"
                    value={personalInfo.contact_num}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaSave />
                {loading ? "Enregistrement..." : "Enregistrer les modifications"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;