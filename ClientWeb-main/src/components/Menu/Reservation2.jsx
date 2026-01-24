import React from "react";
import { useLocation } from "react-router-dom";
import { FaCheckCircle, FaMapMarkerAlt, FaClock, FaSuitcase, FaWheelchair, FaUser, FaQrcode } from "react-icons/fa";

export default function Reservation2() {
  const { state } = useLocation();
  const { billet } = state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold text-text mb-2">
              Réservation Confirmée
            </h1>
            <p className="text-text-secondary">
              Voici le récapitulatif de votre assistance
            </p>
          </div>

          {!billet ? (
            <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-lg">
              <p className="font-medium">
                Aucune réservation trouvée. Veuillez revenir à l'étape précédente.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Informations Trajet */}
              <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary" />
                  Informations du Trajet
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Numéro de réservation</p>
                    <p className="text-text text-lg font-semibold">
                      {billet.num_reservation || "Non disponible"}
                    </p>
                  </div>
                  <div>
                    <p className="text-text-secondary text-sm mb-1">Type de transport</p>
                    <p className="text-text text-lg font-semibold">
                      {billet.type_transport || "Non disponible"}
                    </p>
                  </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="bg-bg-secondary/50 rounded-lg p-4">
                    <p className="text-text-secondary text-sm mb-2">Départ</p>
                    <p className="text-text text-xl font-bold mb-1">
                      {billet.lieu_depart || "Non disponible"}
                    </p>
                    <p className="text-primary text-2xl font-bold flex items-center gap-2">
                      <FaClock className="text-lg" />
                      {billet.heure_depart
                        ? new Date(billet.heure_depart).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Non disponible"}
                    </p>
                  </div>
                  
                  <div className="bg-bg-secondary/50 rounded-lg p-4">
                    <p className="text-text-secondary text-sm mb-2">Arrivée</p>
                    <p className="text-text text-xl font-bold mb-1">
                      {billet.lieu_arrivee || "Non disponible"}
                    </p>
                    <p className="text-accent text-2xl font-bold flex items-center gap-2">
                      <FaClock className="text-lg" />
                      {billet.heure_arrivee
                        ? new Date(billet.heure_arrivee).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "Non disponible"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Informations Complémentaires */}
              <div className="bg-bg-secondary/50 border border-border rounded-xl p-6">
                <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
                  <FaSuitcase className="text-accent" />
                  Informations Complémentaires
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-border">
                    <span className="text-text-secondary">Nombre de bagages</span>
                    <span className="text-text font-semibold">
                      {billet.numBags || "Non renseigné"}
                    </span>
                  </div>

                  {billet.wheelchair && Object.keys(billet.wheelchair).some(key => billet.wheelchair[key]) && (
                    <div className="flex items-center justify-between py-3 border-b border-border">
                      <span className="text-text-secondary flex items-center gap-2">
                        <FaWheelchair />
                        Fauteuil roulant
                      </span>
                      <span className="text-text font-semibold">
                        {Object.keys(billet.wheelchair)
                          .filter((key) => billet.wheelchair[key])
                          .join(", ") || "Non renseigné"}
                      </span>
                    </div>
                  )}

                  {billet.additionalInfo && (
                    <div className="py-3">
                      <p className="text-text-secondary mb-2">Informations supplémentaires</p>
                      <p className="text-text bg-bg p-3 rounded-lg">
                        {billet.additionalInfo}
                      </p>
                    </div>
                  )}
                </div>

                {/* QR Code Bagage */}
                <div className="mt-6 text-center bg-bg p-6 rounded-lg">
                  <p className="text-text font-semibold mb-3 flex items-center justify-center gap-2">
                    <FaQrcode className="text-primary" />
                    QR Code Bagages
                  </p>
                  <img 
                    src={new URL("../../images/QRCB.png", import.meta.url)} 
                    alt="QR Code Bagage" 
                    className="mx-auto w-32 h-32 border-2 border-border rounded-lg"
                  />
                </div>
              </div>

              {/* Accompagnateur */}
              {billet.hasCompanion && billet.companion && (
                <div className="bg-bg-secondary/50 border border-border rounded-xl p-6">
                  <h2 className="text-2xl font-bold text-text mb-4 flex items-center gap-2">
                    <FaUser className="text-green-500" />
                    Informations de l'Accompagnateur
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-text-secondary text-sm mb-1">Nom complet</p>
                      <p className="text-text font-semibold">
                        {billet.companion.name} {billet.companion.surname}
                      </p>
                    </div>
                    <div>
                      <p className="text-text-secondary text-sm mb-1">Téléphone</p>
                      <p className="text-text font-semibold">
                        {billet.companion.phone || "Non renseigné"}
                      </p>
                    </div>
                    <div className="md:col-span-2">
                      <p className="text-text-secondary text-sm mb-1">Email</p>
                      <p className="text-text font-semibold">
                        {billet.companion.email || "Non renseigné"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* QR Code Réservation */}
              <div className="text-center pt-6 border-t border-border">
                <h3 className="text-xl font-bold text-text mb-4 flex items-center justify-center gap-2">
                  <FaQrcode className="text-accent" />
                  QR Code Réservation Client
                </h3>
                <div className="inline-block bg-bg p-6 rounded-xl border border-border">
                  <img 
                    src={new URL("../../images/QRclient.png", import.meta.url)} 
                    alt="QR Code réservation client" 
                    className="w-40 h-40"
                  />
                </div>
                <p className="text-text-secondary mt-4 text-sm">
                  Présentez ce code à l'agent d'assistance
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}