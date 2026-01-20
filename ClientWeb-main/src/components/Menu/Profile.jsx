import React, { useState } from "react";
import { updateUserProfile } from "../../api/api";

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    ID_Client: "", // Ajoutez l'ID_Client pour l'identification
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

      // Appel de l'API pour mettre à jour les données
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
    <div>
      <h1>Mon espace Pmove</h1>

      {/* Afficher les messages de succès ou d'erreur */}
      {successMessage && <div style={{ color: "green" }}>{successMessage}</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <label>
          Civilité:
          <select
            name="civilite"
            value={personalInfo.civilite}
            onChange={handleInputChange}
          >
            <option value="">Sélectionnez</option>
            <option value="Monsieur">Monsieur</option>
            <option value="Madame">Madame</option>
          </select>
        </label>

        <label>
          Téléphone:
          <input
            type="tel"
            name="telephone"
            value={personalInfo.telephone}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Prénom:
          <input
            type="text"
            name="prenom"
            value={personalInfo.prenom}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Nom:
          <input
            type="text"
            name="nom"
            value={personalInfo.nom}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Adresse:
          <input
            type="text"
            name="adresse"
            value={personalInfo.adresse}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Handicap:
          <input
            type="text"
            name="handicap"
            value={personalInfo.handicap}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Date de naissance:
          <input
            type="date"
            name="birth"
            value={personalInfo.birth}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Contact Mail:
          <input
            type="email"
            name="contact_mail"
            value={personalInfo.contact_mail}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Contact Téléphone:
          <input
            type="tel"
            name="contact_num"
            value={personalInfo.contact_num}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Mise à jour en cours..." : "Mettre à jour"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
