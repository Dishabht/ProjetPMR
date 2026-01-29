import React from "react";
import { useOutletContext } from "react-router-dom";
import { FiMapPin, FiAlertTriangle, FiUsers, FiClock } from "react-icons/fi";

const NetworkOverview = () => {
  const { network } = useOutletContext();

  const kpis = [
    { label: "PMR en attente", value: 3, icon: <FiClock /> },
    { label: "Missions en retard", value: 1, icon: <FiAlertTriangle /> },
    { label: "Agents dispo", value: 12, icon: <FiUsers /> },
    { label: "Correspondances critiques", value: 2, icon: <FiMapPin /> },
  ];

  return (
    <div className="px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold">Vue réseau</h2>
          <p className="text-text-muted text-sm">
            Vision instantanée du réseau sélectionné : {network}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="card-modern flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/15 text-primary flex items-center justify-center text-xl">
              {kpi.icon}
            </div>
            <div>
              <p className="text-text-muted text-sm">{kpi.label}</p>
              <p className="text-2xl font-semibold">{kpi.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card-modern h-[420px] flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Carte / Plan réseau</h3>
          <span className="text-text-muted text-sm">{network}</span>
        </div>
        <div className="flex-1 rounded-xl border border-dashed border-border flex items-center justify-center text-text-muted">
          Carte temps réel (agents, missions PMR, alertes)
        </div>
      </div>
    </div>
  );
};

export default NetworkOverview;
