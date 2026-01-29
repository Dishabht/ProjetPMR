import React, { useState } from "react";
import { FaUserPlus, FaUser, FaPhone, FaEnvelope } from "react-icons/fa";

const Accompagnateur = () => {
  const [formData, setFormData] = useState({
    name_acc: "",
    surname_acc: "",
    num_acc: "",
    mail_acc: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch("http://localhost:3000/acc/accAdd", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      
      if (response.ok) {
        setSuccessMessage("Accompagnateur ajouté avec succès !");
        setFormData({
          name_acc: "",
          surname_acc: "",
          num_acc: "",
          mail_acc: "",
        });
      } else {
        setErrorMessage(`Erreur: ${result.error}`);
      }
    } catch (error) {
      setErrorMessage("Erreur lors de l'envoi des données. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <FaUserPlus className="text-5xl text-primary" />
            <div>
              <h1 className="text-4xl font-bold text-text">
                Ajouter un Accompagnateur
              </h1>
              <p className="text-text-secondary mt-1">
                Enregistrez les informations de l'accompagnateur
              </p>
            </div>
          </div>

          {/* Alert Messages */}
          {successMessage && (
            <div className="mb-6 bg-green-500/10 border border-green-500/50 text-green-500 p-4 rounded-lg">
              <p className="font-medium">{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="mb-6 bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nom et Prénom */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-text mb-2">
                  <FaUser className="text-primary" />
                  Nom
                </label>
                <input
                  type="text"
                  name="name_acc"
                  placeholder="Nom de l'accompagnateur"
                  value={formData.name_acc}
                  onChange={handleChange}
                  required
                  autoComplete="given-name"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-text mb-2">
                  <FaUser className="text-primary" />
                  Prénom
                </label>
                <input
                  type="text"
                  name="surname_acc"
                  placeholder="Prénom de l'accompagnateur"
                  value={formData.surname_acc}
                  onChange={handleChange}
                  required
                  autoComplete="family-name"
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                />
              </div>
            </div>

            {/* Téléphone */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-text mb-2">
                <FaPhone className="text-accent" />
                Numéro de téléphone
              </label>
              <input
                type="tel"
                name="num_acc"
                placeholder="06 12 34 56 78"
                value={formData.num_acc}
                onChange={handleChange}
                required
                autoComplete="tel"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-text mb-2">
                <FaEnvelope className="text-accent" />
                Email
              </label>
              <input
                type="email"
                name="mail_acc"
                placeholder="accompagnateur@email.com"
                value={formData.mail_acc}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaUserPlus />
                {loading ? "Ajout en cours..." : "Ajouter l'accompagnateur"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accompagnateur;