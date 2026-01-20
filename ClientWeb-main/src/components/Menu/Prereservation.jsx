import React, { useState } from "react";
import { checkReservation } from "../../api/api"; // Import de la fonction depuis votre api.js
import { useNavigate } from "react-router-dom"; // Import pour la navigation
import Back from "../../images/BackReser.png";

export default function Prereservation() {
  const navigate = useNavigate();
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [numReservation, setNumReservation] = useState("");
  const [billet, setBillet] = useState(null);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);

  const transportOptions = ["RATP", "SNCF", "AirFrance"];

  const handleTransportSelect = (option) => {
    setSelectedTransport(option);
  };

  const handleCheckReservation = async () => {
    if (!numReservation || !selectedTransport) {
      setMessage({
        text: "Veuillez entrer un numéro de réservation et sélectionner une base.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await checkReservation(
        parseInt(numReservation, 10),
        selectedTransport
      );

      if (response.reservation) {
        setMessage({ text: "Réservation trouvée !", type: "success" });
        setBillet(response.reservation); // Stocke les informations du billet
      } else {
        setMessage({
          text: "Aucune réservation correspondante n'a été trouvée.",
          type: "error",
        });
      }
    } catch (error) {
      setMessage({
        text:
          error.message || "Une erreur s'est produite lors de la vérification.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-between">
      <div className="w-7/12">
        <h1 className="text-4xl font-bold text-blue text-center mb-6">
          Retrouve ton billet !
        </h1>

        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {transportOptions.map((option) => (
            <button
              key={option}
              className={`px-6 py-3 rounded-lg text-lg font-medium ${
                selectedTransport === option
                  ? "color-blues text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
              onClick={() => handleTransportSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Numéro de réservation"
            value={numReservation}
            onChange={(e) => setNumReservation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg text-lg"
          />
        </div>

        <button
          onClick={handleCheckReservation}
          className="w-full color-blues text-white py-3 rounded-lg text-lg font-bold mb-6"
          disabled={loading}
        >
          {loading ? "Vérification en cours..." : "Vérifier la réservation"}
        </button>

        {billet && (
          <div className="bg-gradient-to-r from-blue-200 to-blue-400 text-white rounded-lg shadow-md p-6 max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <div className="text-lg font-semibold">
                <p>De {billet.lieu_depart || "Non disponible"}</p>
                <p>à {billet.lieu_arrivee || "Non disponible"}</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-bold">
                  {billet.heure_depart
                    ? new Date(billet.heure_depart).toLocaleTimeString()
                    : "Non disponible"}
                </p>
                <p className="text-4xl font-bold mt-2">
                  {billet.heure_arrivee
                    ? new Date(billet.heure_arrivee).toLocaleTimeString()
                    : "Non disponible"}
                </p>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => {
                  console.log("Données envoyées à Reservation :", billet);
                  navigate("/reservation", {
                    state: { billet },
                  });
                }}
                className="w-1/2 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg text-lg font-bold"
              >
                Confirmer
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="w-4/12">
        <img src={Back} alt="Back" className="w-full h-auto" />
      </div>
    </div>
  );
}
