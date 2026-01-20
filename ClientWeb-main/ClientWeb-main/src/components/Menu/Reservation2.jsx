import React from "react";
import { useLocation } from "react-router-dom";



export default function Reservation2() {
  const { state } = useLocation();
  const { billet } = state || {};

  return (
    <div
      className="bg-gray-50 min-h-screen p-8"
      style={{ fontFamily: "Raleway, sans-serif" }}
    >
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-blue-700 mb-6 text-center">
          Détails de la Réservation
        </h1>

        {!billet ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg">
            <p>
              Aucune réservation trouvée. Veuillez revenir à l'étape précédente.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold">
                Informations de la Réservation
              </h2>
              <p>
                <strong>Numéro de Réservation :</strong>{" "}
                {billet.num_reservation || "Non disponible"}
              </p>
              <p>
                <strong>Lieu de Départ :</strong>{" "}
                {billet.lieu_depart || "Non disponible"}
              </p>
              <p>
                <strong>Lieu d'Arrivée :</strong>{" "}
                {billet.lieu_arrivee || "Non disponible"}
              </p>
            </div>

            <div className="border-b pb-4">
              <h2 className="text-2xl font-semibold">
                Informations Complémentaires
              </h2>
              <p>
                <strong>Nombre de Bagages :</strong>{" "}
                {billet.numBags || "Non renseigné"}
              </p>
              {/* QR Code Bagage */}
              <div className="mt-4 text-center">
                <p className="font-medium mb-2">QR Code pour bagages</p>
                <img 
  src={new URL("../../images/QRCB.png", import.meta.url)} 
  alt="QR Code Bagage" 
  className="mx-auto block w-32 h-32"
/>

              </div>

              <p>
                <strong>Informations Supplémentaires :</strong>{" "}
                {billet.additionalInfo || "Non renseigné"}
              </p>
              <p>
                <strong>Utilisation d'un Fauteuil Roulant :</strong>{" "}
                {billet.wheelchair
                  ? Object.keys(billet.wheelchair)
                      .filter((key) => billet.wheelchair[key])
                      .join(", ") || "Non renseigné"
                  : "Non renseigné"}
              </p>
            </div>

            {billet.hasCompanion && billet.companion && (
              <div className="border-b pb-4">
                <h2 className="text-2xl font-semibold">
                  Informations de l'Accompagnateur
                </h2>
                <p>
                  <strong>Nom :</strong>{" "}
                  {billet.companion.name || "Non renseigné"}
                </p>
                <p>
                  <strong>Prénom :</strong>{" "}
                  {billet.companion.surname || "Non renseigné"}
                </p>
                <p>
                  <strong>Téléphone :</strong>{" "}
                  {billet.companion.phone || "Non renseigné"}
                </p>
                <p>
                  <strong>Email :</strong>{" "}
                  {billet.companion.email || "Non renseigné"}
                </p>
              </div>
            )}


            {/* QR Code Client en bas de page */}
            <div className="text-center mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">QR code réservation</h3>
              <img 
  src={new URL("../../images/QRclient.png", import.meta.url)} 
  alt="QR Code réservation client" 
  className="mx-auto block w-36 h-36"
/>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}