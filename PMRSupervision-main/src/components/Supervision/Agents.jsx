import React from "react";
import { useOutletContext } from "react-router-dom";

const Agents = () => {
  const { network } = useOutletContext();

  const agents = [
    {
      id: "A-10",
      name: "Martin",
      network: "SNCF",
      status: "Disponible",
      load: "2/6",
      position: "Quai 3",
    },
    {
      id: "A-11",
      name: "Leïla",
      network: "RATP",
      status: "En mission",
      load: "4/6",
      position: "Ligne B",
    },
  ];

  return (
    <div className="px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Agents terrain</h2>
        <p className="text-text-muted text-sm">Réseau : {network}</p>
      </div>

      <div className="card-modern overflow-hidden">
        <div className="grid grid-cols-5 text-xs text-text-muted uppercase tracking-wide px-4 py-3 border-b border-border">
          <span>Nom</span>
          <span>Réseau</span>
          <span>Statut</span>
          <span>Charge</span>
          <span>Position</span>
        </div>
        {agents.map((agent) => (
          <div key={agent.id} className="grid grid-cols-5 px-4 py-4 border-b border-border/40">
            <span className="text-sm font-semibold">{agent.name}</span>
            <span className="text-sm text-text-secondary">{agent.network}</span>
            <span className="text-sm">{agent.status}</span>
            <span className="text-sm">{agent.load}</span>
            <span className="text-sm">{agent.position}</span>
          </div>
        ))}
      </div>

      <div className="card-modern mt-6">
        <h3 className="text-lg font-semibold mb-3">Planning agent</h3>
        <p className="text-text-muted text-sm">
          Sélectionnez un agent pour afficher ses compétences, son planning et
          forcer une mission.
        </p>
      </div>
    </div>
  );
};

export default Agents;
