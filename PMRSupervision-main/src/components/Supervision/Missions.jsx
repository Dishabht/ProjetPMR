import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const Missions = () => {
  const { network } = useOutletContext();
  const [selected, setSelected] = useState(null);

  const missions = [
    {
      id: "M-202",
      time: "08:45",
      network: "SNCF",
      route: "Quai 4 → Sortie",
      assistance: "♿",
      agent: "Dupont",
      status: "En cours",
      priority: "Normal",
      risk: false,
    },
    {
      id: "M-203",
      time: "09:10",
      network: "SNCF → Air France",
      route: "Gare → Terminal 2",
      assistance: "♿♿",
      agent: "—",
      status: "À affecter",
      priority: "Haute",
      risk: true,
    },
  ];

  return (
    <div className="px-8 grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold">Missions PMR</h2>
            <p className="text-text-muted text-sm">Réseau : {network}</p>
          </div>
        </div>

        <div className="card-modern overflow-hidden">
          <div className="grid grid-cols-7 text-xs text-text-muted uppercase tracking-wide px-4 py-3 border-b border-border">
            <span>Heure</span>
            <span>Réseau</span>
            <span>Trajet</span>
            <span>PMR</span>
            <span>Agent</span>
            <span>Statut</span>
            <span>⚠</span>
          </div>
          {missions.map((mission) => (
            <button
              key={mission.id}
              onClick={() => setSelected(mission)}
              className={`grid grid-cols-7 px-4 py-4 text-left border-b border-border/40 hover:bg-bg-tertiary transition ${
                selected?.id === mission.id ? "bg-bg-tertiary" : ""
              }`}
            >
              <span className="text-sm">{mission.time}</span>
              <span className="text-sm text-text-secondary">{mission.network}</span>
              <span className="text-sm">{mission.route}</span>
              <span>{mission.assistance}</span>
              <span className="text-sm">{mission.agent}</span>
              <span className="text-sm">
                <span className="badge-modern">{mission.status}</span>
              </span>
              <span className="text-sm">
                {mission.risk && <FiAlertTriangle className="text-warning" />}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="card-modern h-fit">
        <h3 className="text-lg font-semibold mb-4">Détails mission</h3>
        {selected ? (
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-text-muted">Trajet</p>
              <p className="font-semibold">{selected.route}</p>
            </div>
            <div>
              <p className="text-text-muted">Agent affecté</p>
              <p className="font-semibold">{selected.agent}</p>
            </div>
            <div>
              <p className="text-text-muted">Priorité</p>
              <p className="font-semibold">{selected.priority}</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="btn-primary">Affecter</button>
              <button className="btn-secondary">Réaffecter</button>
            </div>
            <button className="btn-outline w-full">Escalader</button>
          </div>
        ) : (
          <p className="text-text-muted text-sm">Sélectionnez une mission pour afficher les détails.</p>
        )}
      </div>
    </div>
  );
};

export default Missions;
