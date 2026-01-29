import React from "react";
import { useOutletContext } from "react-router-dom";
import { FiAlertTriangle } from "react-icons/fi";

const RiskConnections = () => {
  const { network } = useOutletContext();

  const risks = [
    {
      id: "RC-1",
      title: "SNCF → Air France",
      train: "TGV 8421 (retard 12 min)",
      flight: "AF 1234 (embarquement -20 min)",
      buffer: "6 min (min requis : 15)",
    },
  ];

  return (
    <div className="px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Correspondances à risque</h2>
        <p className="text-text-muted text-sm">Réseau : {network}</p>
      </div>

      <div className="space-y-4">
        {risks.map((risk) => (
          <div key={risk.id} className="card-modern">
            <div className="flex items-center gap-3 mb-3">
              <FiAlertTriangle className="text-warning text-lg" />
              <h3 className="text-lg font-semibold">{risk.title}</h3>
            </div>
            <p className="text-text-secondary text-sm">{risk.train}</p>
            <p className="text-text-secondary text-sm">→ {risk.flight}</p>
            <p className="text-warning text-sm font-semibold mt-2">
              Buffer estimé : {risk.buffer}
            </p>
            <button className="btn-primary mt-4">Action</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RiskConnections;
