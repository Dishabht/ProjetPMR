import React from "react";
import { FaProjectDiagram, FaMagic } from "react-icons/fa";

const Planification = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <FaProjectDiagram className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Planification & affectation</h1>
            <p className="text-gray-600">Timeline/Gantt, création automatique, affectation manuelle ou IA.</p>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 space-y-4">
          <div className="h-64 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Timeline / Gantt : vols, trains, bus, buffers de correspondance, affectation agents.
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-1">Création automatique</h3>
              <p>Générer des missions à partir des horaires (vols/trains/bus), avec buffers.</p>
            </div>
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-1">Affectation manuelle ou auto</h3>
              <p className="flex items-center gap-2"><FaMagic className="text-primary" /> Suggestion IA optionnelle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Planification;
