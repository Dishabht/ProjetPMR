import React from "react";
import { FaLock, FaBell } from "react-icons/fa";

const Operateurs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <FaLock className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Opérateurs (accès restreint)</h1>
            <p className="text-gray-600">Lecture seule des prises en charge et notifications inter-opérateurs.</p>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 space-y-4">
          <div className="h-48 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Prises en charge : en attente / en cours / terminé, ETA estimé vers le prochain mode de transport.
          </div>
          <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 text-sm text-gray-700 flex items-center gap-2">
            <FaBell className="text-primary" /> Notifications inter-opérateurs : retards train → vol, voyageur encore en gare, partage d'événements via API sécurisée.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Operateurs;
