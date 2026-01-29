import React from "react";
import { FaExclamationTriangle, FaExchangeAlt } from "react-icons/fa";

const Incidents = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <FaExclamationTriangle className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Incidents & escalades</h1>
            <p className="text-gray-600">Alertes automatiques et plans B.</p>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-1">Alertes</h3>
              <p>Agent en retard, mission refusée, voyageur non pris en charge.</p>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-1">Escalade</h3>
              <p className="flex items-center gap-2"><FaExchangeAlt className="text-primary" /> Bouton escalade superviseur + propositions automatiques : agent alternatif, taxi PMR, assistance exceptionnelle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Incidents;
