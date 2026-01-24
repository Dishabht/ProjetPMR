import React, { useState } from "react";
import { checkReservation } from "../../api/api";
import { useNavigate } from "react-router-dom";

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
        setBillet(response.reservation);
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
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          <h1 className="text-4xl font-bold text-text text-center mb-8">
            Retrouve ton billet !
          </h1>

          {/* Alert Messages */}
          {message.text && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === "success" 
                ? "bg-green-500/10 border border-green-500/50 text-green-500" 
                : "bg-red-500/10 border border-red-500/50 text-red-500"
            }`}>
              <p className="font-medium">{message.text}</p>
            </div>
          )}

          {/* Transport Selection */}
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {transportOptions.map((option) => (
              <button
                key={option}
                className={`px-6 py-3 rounded-lg text-lg font-semibold transition-all ${
                  selectedTransport === option
                    ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                    : "bg-bg-secondary border border-border text-text hover:bg-bg-tertiary"
                }`}
                onClick={() => handleTransportSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>

          {/* Reservation Number Input */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Numéro de réservation"
              value={numReservation}
              onChange={(e) => setNumReservation(e.target.value)}
              className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg text-lg text-text focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none transition-all"
            />
          </div>

          {/* Check Button */}
          <button
            onClick={handleCheckReservation}
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg text-lg font-bold hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed mb-6"
            disabled={loading}
          >
            {loading ? "Vérification en cours..." : "Vérifier la réservation"}
          </button>

          {/* Billet Display */}
          {billet && (
            <div className="bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 rounded-xl shadow-lg p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-text-secondary text-sm mb-1">Départ</p>
                  <p className="text-text text-xl font-bold">
                    {billet.lieu_depart || "Non disponible"}
                  </p>
                  <p className="text-primary text-3xl font-bold mt-2">
                    {billet.heure_depart
                      ? new Date(billet.heure_depart).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Non disponible"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-text-secondary text-sm mb-1">Arrivée</p>
                  <p className="text-text text-xl font-bold">
                    {billet.lieu_arrivee || "Non disponible"}
                  </p>
                  <p className="text-accent text-3xl font-bold mt-2">
                    {billet.heure_arrivee
                      ? new Date(billet.heure_arrivee).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : "Non disponible"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  console.log("Données envoyées à Reservation :", billet);
                  navigate("/reservation", {
                    state: { billet },
                  });
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-lg text-lg font-bold transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                Confirmer la réservation
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}