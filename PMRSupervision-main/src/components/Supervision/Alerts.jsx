import React from "react";
import { useOutletContext } from "react-router-dom";
import { FiAlertCircle } from "react-icons/fi";

const Alerts = () => {
  const { network, alerts } = useOutletContext();

  return (
    <div className="px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Alertes & incidents</h2>
        <p className="text-text-muted text-sm">Réseau : {network}</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className="card-modern">
            <div className="flex items-center gap-3 mb-2">
              <FiAlertCircle className="text-error text-lg" />
              <h3 className="text-lg font-semibold">{alert.title}</h3>
            </div>
            <p className="text-text-secondary text-sm">
              🟥 {alert.network} — {alert.time}
            </p>
            <p className="text-text-secondary text-sm mt-2">{alert.description}</p>
            <p className="text-text-muted text-xs mt-2">
              Responsable : {alert.owner}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alerts;
