import React, { useState, useEffect } from "react";
import Info from "../../images/test1.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function Reservation() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const billet = state?.billet; // Vérification pour récupérer les données

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
    } else {
      console.log("Données du billet récupérées :", billet);
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
        ? {
            name,
            surname,
            phone,
            email,
          }
        : null,
    };

    console.log("Billet mis à jour :", updatedBillet);
    navigate("/reservation2", { state: { billet: updatedBillet } });
  };

  return (
    <div
      className="bg-gray-50 min-h-screen p-8"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <div className="flex items-start mb-4">
          <img src={Info} alt="Info" className="w-1/6 h-auto mr-4" />
          <div>
            <h1 className="text-5xl font-bold text-blue-700 mb-2">
              Besoin d'assistance ?
            </h1>
            <h2 className="text-3xl font-semibold text-gray-600">
              Nous sommes là pour vous aider !
            </h2>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-4">
            <p>{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-lg text-gray-800 font-medium mb-2">
              Avez-vous un accompagnateur ?
            </label>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className={`px-6 py-2 rounded-lg transition-colors duration-300 focus:outline-none ${
                  hasCompanion
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setHasCompanion(true)}
              >
                Oui
              </button>
              <button
                type="button"
                className={`px-6 py-2 rounded-lg transition-colors duration-300 focus:outline-none ${
                  !hasCompanion
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setHasCompanion(false)}
              >
                Non
              </button>
            </div>
          </div>

          {hasCompanion && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2">Nom :</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Prénom :</label>
                <input
                  type="text"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Téléphone :</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mail :</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-2">
              Nombre de bagages :
            </label>
            <input
              type="number"
              min="0"
              max="5"
              value={numBags}
              onChange={(e) => setNumBags(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Utilisation de fauteuil roulant :
            </label>
            <div className="flex space-x-4">
              {["RM", "RE", "Emprunt"].map((option) => (
                <label key={option} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={wheelchair[option]}
                    onChange={() =>
                      setWheelchair((prev) => ({
                        ...prev,
                        [option]: !prev[option],
                      }))
                    }
                    className="focus:ring-blue-500"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">
              Informations supplémentaires :
            </label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
