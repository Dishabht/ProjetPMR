import React from "react";

const Coordination = () => {
  const events = [
    { id: 1, type: "ETA", source: "SNCF", detail: "Train TGV 8421 +5 min", ts: "14:05" },
    { id: 2, type: "Incident", source: "Aéroport", detail: "Ascenseur HS zone B", ts: "14:07" },
    { id: 3, type: "Confirmation", source: "Compagnie", detail: "Prise en charge PMR vol AF123", ts: "14:10" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Coordination inter-opérateurs</h1>
          <p className="text-text-secondary">Partage d'événements ETA, incidents, confirmations</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          {events.map((ev) => (
            <div key={ev.id} className="border border-border/40 rounded-lg p-4 flex items-center gap-4">
              <span className="px-3 py-1 rounded-lg bg-primary/15 text-primary text-sm font-semibold">
                {ev.type}
              </span>
              <div className="flex-1">
                <p className="text-text font-semibold">{ev.detail}</p>
                <p className="text-text-secondary text-sm">
                  Source: {ev.source} • {ev.ts}
                </p>
              </div>
              <button className="btn-primary px-3 py-2 text-sm">Notifier</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Coordination;