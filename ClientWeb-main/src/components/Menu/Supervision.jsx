import React from "react";
import { FaMapMarkedAlt, FaCircle, FaRegClock } from "react-icons/fa";

const LegendItem = ({ color, label }) => (
  <div className="flex items-center gap-2 text-sm text-gray-700">
    <FaCircle className={`text-${color}-500`} />
    <span>{label}</span>
  </div>
);

const Supervision = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex items-center gap-3">
          <FaMapMarkedAlt className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Supervision temps réel</h1>
            <p className="text-gray-600">Carte en direct des agents, missions et zones sensibles.</p>
          </div>
        </header>

        <section className="grid md:grid-cols-3 gap-4">
          <div className="col-span-2 bg-white rounded-xl shadow p-4 h-80 border border-gray-100">
            <div className="h-full flex items-center justify-center text-gray-400 text-sm">
              Carte temps réel (agents dispo/occupés, missions en attente/en cours/en retard, zones gare/terminal/quai/bus)
            </div>
          </div>
          <div className="bg-white rounded-xl shadow p-4 border border-gray-100 space-y-4">
            <h3 className="font-semibold text-gray-900">Légende</h3>
            <LegendItem color="green" label="Agent disponible / mission en avance" />
            <LegendItem color="orange" label="En cours / vigilance" />
            <LegendItem color="red" label="En retard / rupture" />
            <div className="pt-2 border-t border-gray-100 text-sm text-gray-700 space-y-2">
              <div className="flex items-center gap-2"><FaRegClock /> <span>ETA et buffers de correspondance</span></div>
              <div>Vue par zone (gare, terminal, quai, bus).</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Supervision;
