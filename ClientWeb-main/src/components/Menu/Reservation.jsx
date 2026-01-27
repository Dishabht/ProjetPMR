import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { checkReservation } from "../../api/api";
import { FaWheelchair, FaSuitcase, FaUserFriends, FaInfoCircle } from "react-icons/fa";

export default function Reservation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const billet = state?.billet;
  const [currentBillet, setCurrentBillet] = useState(billet || null);
  const [numReservation, setNumReservation] = useState("");
  const [selectedBase, setSelectedBase] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

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
    setCurrentBillet(billet || null);
  }, [billet]);

  useEffect(() => {
    if (!hasSearched) return;

    if (!currentBillet) {
      setErrorMessage("Aucune réservation trouvée. Veuillez réessayer.");
    } else {
      setErrorMessage("");
    }
  }, [currentBillet, hasSearched]);

  const handleSearchBillet = async () => {
    const normalizedReservation = numReservation.trim();

    if (!normalizedReservation || !selectedBase) {
      setHasSearched(true);
      setErrorMessage("Veuillez entrer un numéro de réservation et sélectionner une base.");
      return;
    }

    try {
      setIsLoading(true);
      setHasSearched(true);
      const response = await checkReservation(normalizedReservation, selectedBase);
      setCurrentBillet(response.reservation);
      setErrorMessage("");
    } catch (error) {
      setHasSearched(true);
      setCurrentBillet(null);
      setErrorMessage(error.message || "Aucune réservation trouvée.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentBillet) {
      setErrorMessage("Veuillez d'abord retrouver votre billet.");
      return;
    }

    if (!numBags) {
      setErrorMessage("Veuillez spécifier le nombre de bagages.");
      return;
    }

    const updatedBillet = {
      ...currentBillet,
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

          <div className="bg-bg-secondary/50 border border-border rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-text mb-4">
              Retrouver mon billet
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-text font-semibold mb-2">
                  Numéro de réservation
                </label>
                <input
                  type="text"
                  value={numReservation}
                  onChange={(e) => setNumReservation(e.target.value)}
                  className="w-full px-4 py-3 bg-bg border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  placeholder="RATP-001"
                />
              </div>
              <div>
                <label className="block text-text font-semibold mb-2">
                  Base
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {["RATP", "SNCF", "AirFrance"].map((base) => (
                    <button
                      key={base}
                      type="button"
                      onClick={() => setSelectedBase(base)}
                      className={`px-3 py-3 rounded-lg text-sm font-semibold transition-all ${
                        selectedBase === base
                          ? "bg-gradient-to-r from-primary to-accent text-white"
                          : "bg-bg border border-border text-text hover:bg-bg-tertiary"
                      }`}
                    >
                      {base}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-center pt-4">
              <button
                type="button"
                onClick={handleSearchBillet}
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-xl transition-all disabled:opacity-60"
              >
                {isLoading ? "Recherche..." : "Voir mon billet"}
              </button>
            </div>
          </div>

          {currentBillet && (
            <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-bold text-text mb-4">
                Billet retrouvé
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Numéro de réservation</p>
                  <p className="text-text text-lg font-semibold">
                    {currentBillet.num_reservation || "Non disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Transport</p>
                  <p className="text-text text-lg font-semibold">
                    {currentBillet.transport || currentBillet.type_transport || "Non disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Départ</p>
                  <p className="text-text text-lg font-semibold">
                    {currentBillet.lieu_depart || "Non disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Arrivée</p>
                  <p className="text-text text-lg font-semibold">
                    {currentBillet.lieu_arrivee || "Non disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Heure de départ</p>
                  <p className="text-text text-lg font-semibold">
                    {currentBillet.heure_depart || "Non disponible"}
                  </p>
                </div>
                <div>
                  <p className="text-text-secondary text-sm mb-1">Heure d'arrivée</p>
                  <p className="text-text text-lg font-semibold">
                    {currentBillet.heure_arrivee || "Non disponible"}
                  </p>
                </div>
              </div>
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