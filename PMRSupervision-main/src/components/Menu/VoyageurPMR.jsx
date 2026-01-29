import React from "react";
import { FaUserFriends, FaSms } from "react-icons/fa";

const VoyageurPMR = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <FaUserFriends className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Voyageur PMR / Accompagnant</h1>
            <p className="text-gray-600">Suivi rassurant et notifications automatiques.</p>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 space-y-4">
          <div className="h-48 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Suivi : agent assigné, localisation estimée, ETA, statut "Un agent arrive".
          </div>
          <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 text-sm text-gray-700 flex items-center gap-2">
            <FaSms className="text-primary" /> Notifications push/SMS : agent en route, prise en charge confirmée, remise effectuée.
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoyageurPMR;
