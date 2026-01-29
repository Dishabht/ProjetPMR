import React, { useState } from "react";

const ZoneManagement = () => {
  const [zones, setZones] = useState([
    { id: 1, name: "Gare - Zone A", type: "Train", capacity: 6 },
    { id: 2, name: "Terminal 2F", type: "Avion", capacity: 10 },
  ]);

  const [draft, setDraft] = useState({ name: "", type: "Train", capacity: 4 });

  const addZone = (e) => {
    e.preventDefault();
    setZones([...zones, { ...draft, id: Date.now() }]);
    setDraft({ name: "", type: "Train", capacity: 4 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Gestion des zones</h1>

        <form onSubmit={addZone} className="bg-card border border-border rounded-2xl p-6 mb-8 space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <input
              required
              value={draft.name}
              onChange={(e) => setDraft({ ...draft, name: e.target.value })}
              placeholder="Nom de zone (ex: Quai 12, Terminal 2F)"
              className="input-modern"
            />
            <select
              value={draft.type}
              onChange={(e) => setDraft({ ...draft, type: e.target.value })}
              className="input-modern"
            >
              <option>Train</option>
              <option>Avion</option>
              <option>Bus</option>
            </select>
            <input
              type="number"
              min={1}
              value={draft.capacity}
              onChange={(e) => setDraft({ ...draft, capacity: Number(e.target.value) })}
              className="input-modern"
              placeholder="Capacité simultanée"
            />
          </div>
          <button type="submit" className="btn-primary w-full py-3 font-semibold">Ajouter la zone</button>
        </form>

        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-bg-secondary border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left text-text">Zone</th>
                <th className="px-4 py-3 text-left text-text">Type</th>
                <th className="px-4 py-3 text-left text-text">Capacité</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z) => (
                <tr key={z.id} className="border-b border-border/40">
                  <td className="px-4 py-3 text-text">{z.name}</td>
                  <td className="px-4 py-3 text-text-secondary">{z.type}</td>
                  <td className="px-4 py-3 text-text-secondary">{z.capacity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ZoneManagement;