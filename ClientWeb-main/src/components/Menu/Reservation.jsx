import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaWheelchair, FaSuitcase, FaUserFriends, FaInfoCircle } from "react-icons/fa";

export default function Reservation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const billet = state?.billet;

  const [hasCompanion, setHasCompanion] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [numBags, setNumBags] = useState("");
  const [wheelchair, setWheelchair] = useState({
    RM: false,
    RE: false,
    Emprunt: false,
  });
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (!billet) {
      setErrorMessage("Aucune réservation trouvée. Veuillez réessayer.");
    }
  }, [billet]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!numBags) {
      setErrorMessage("Veuillez spécifier le nombre de bagages.");
      return;
    }

    const updatedBillet = {
      ...billet,
      name,
      surname,
      phone,
      email,
      numBags,
      additionalInfo,
      wheelchair,
      hasCompanion,
      companion: hasCompanion
        ? { name, surname, phone, email }
        : null,
    };

    navigate("/reservation2", { state: { billet: updatedBillet } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-5xl">🤝</div>
              <div>
                <h1 className="text-4xl font-bold text-text mb-2">
                  Besoin d'assistance ?
                </h1>
                <h2 className="text-2xl text-text-secondary">
                  Nous sommes là pour vous aider !
                </h2>
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg mb-6">
              <p className="font-medium">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Accompagnateur */}
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6">
              <label className="flex items-center gap-2 text-lg text-text font-semibold mb-4">
                <FaUserFriends className="text-primary" />
                Avez-vous un accompagnateur ?
              </label>
              <div className="flex justify-center gap-4">
                <button
                  type="button"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    hasCompanion
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                      : "bg-bg-secondary border border-border text-text hover:bg-bg-tertiary"
                  }`}
                  onClick={() => setHasCompanion(true)}
                >
                  Oui
                </button>
                <button
                  type="button"
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    !hasCompanion
                      ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                      : "bg-bg-secondary border border-border text-text hover:bg-bg-tertiary"
                  }`}
                  onClick={() => setHasCompanion(false)}
                >
                  Non
                </button>
              </div>
            </div>

            {/* Informations Accompagnateur */}
            {hasCompanion && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-text font-semibold mb-2">Nom</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="Nom de l'accompagnateur"
                  />
                </div>
                <div>
                  <label className="block text-text font-semibold mb-2">Prénom</label>
                  <input
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="Prénom de l'accompagnateur"
                  />
                </div>
                <div>
                  <label className="block text-text font-semibold mb-2">Téléphone</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <label className="block text-text font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="email@exemple.com"
                  />
                </div>
              </div>
            )}

            {/* Nombre de bagages */}
            <div>
              <label className="flex items-center gap-2 text-text font-semibold mb-2">
                <FaSuitcase className="text-accent" />
                Nombre de bagages
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={numBags}
                onChange={(e) => setNumBags(e.target.value)}
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                placeholder="0 à 5 bagages"
              />
            </div>

            {/* Fauteuil roulant */}
            <div>
              <label className="flex items-center gap-2 text-text font-semibold mb-3">
                <FaWheelchair className="text-primary" />
                Utilisation de fauteuil roulant
              </label>
              <div className="flex flex-wrap gap-4">
                {["RM", "RE", "Emprunt"].map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 px-4 py-3 bg-bg-secondary border border-border rounded-lg cursor-pointer hover:bg-bg-tertiary transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={wheelchair[option]}
                      onChange={() =>
                        setWheelchair((prev) => ({
                          ...prev,
                          [option]: !prev[option],
                        }))
                      }
                      className="accent-primary"
                    />
                    <span className="text-text font-medium">{option}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Informations supplémentaires */}
            <div>
              <label className="flex items-center gap-2 text-text font-semibold mb-2">
                <FaInfoCircle className="text-accent" />
                Informations supplémentaires
              </label>
              <textarea
                value={additionalInfo}
                onChange={(e) => setAdditionalInfo(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all resize-none"
                placeholder="Précisions sur votre handicap, besoins spécifiques..."
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <button
                type="submit"
                className="px-12 py-4 bg-gradient-to-r from-primary to-accent text-white text-lg font-bold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}