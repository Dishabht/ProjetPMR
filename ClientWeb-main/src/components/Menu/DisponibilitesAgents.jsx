import React from "react";
import { FaFilter, FaUserCheck } from "react-icons/fa";

const DisponibilitesAgents = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <FaUserCheck className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disponibilité des agents</h1>
            <p className="text-gray-600">Statut, compétences, localisation et filtres.</p>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow p-4 border border-gray-100">
          <div className="flex flex-wrap gap-3 items-center mb-4 text-sm text-gray-700">
            <FaFilter />
            <span>Filtrer par zone</span>
            <span>• Compétence (fauteuil manuel/électrique, malvoyant...)</span>
            <span>• Charge de travail</span>
          </div>
          <div className="h-64 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Liste filtrable : statut (dispo, en mission, indispo), compétences, localisation estimée.
          </div>
          <div className="mt-3 text-sm text-gray-700">
            Exemple : "Montre-moi les agents disponibles dans la zone Gare A capables de gérer un fauteuil électrique dans les 10 minutes".
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisponibilitesAgents;
