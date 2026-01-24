import React, { useState, useEffect } from "react";

const SupervisionRealtime = () => {
  const [filter, setFilter] = useState("all");
  const [missions, setMissions] = useState([
    { id: 1, traveler: "M. Dupont", status: "En cours", agent: "Agent A", location: "Gare SNCF", progress: 60 },
    { id: 2, traveler: "Mme Martin", status: "À faire", agent: "-", location: "-", progress: 0 },
    { id: 3, traveler: "M. Louis", status: "Terminée", agent: "Agent B", location: "-", progress: 100 }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">📊 Supervision Temps Réel</h1>

        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Missions Actives", value: "8", color: "from-blue-500 to-cyan-500" },
            { label: "À Faire", value: "12", color: "from-orange-500 to-yellow-500" },
            { label: "Terminées", value: "34", color: "from-green-500 to-emerald-500" },
            { label: "Incidents", value: "2", color: "from-red-500 to-pink-500" }
          ].map((kpi, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${kpi.color} rounded-2xl p-6 text-white shadow-lg`}>
              <p className="text-white/80 mb-1">{kpi.label}</p>
              <p className="text-4xl font-bold">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
          {["Tous", "À faire", "En cours", "Terminées", "Incidents"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f.toLowerCase())}
              className={`px-6 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                filter === f.toLowerCase()
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-text hover:border-primary"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Missions Table */}
        <div className="bg-card border border-border rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-bg-secondary border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-text font-semibold">Voyageur</th>
                  <th className="px-6 py-4 text-left text-text font-semibold">Statut</th>
                  <th className="px-6 py-4 text-left text-text font-semibold">Agent</th>
                  <th className="px-6 py-4 text-left text-text font-semibold">Localisation</th>
                  <th className="px-6 py-4 text-left text-text font-semibold">Progression</th>
                </tr>
              </thead>
              <tbody>
                {missions.map((mission) => (
                  <tr key={mission.id} className="border-b border-border/30 hover:bg-bg-secondary/50 transition-colors">
                    <td className="px-6 py-4 text-text font-medium">{mission.traveler}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                        mission.status === "En cours" ? "bg-blue-500/20 text-blue-400" :
                        mission.status === "À faire" ? "bg-orange-500/20 text-orange-400" :
                        "bg-green-500/20 text-green-400"
                      }`}>
                        {mission.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-text-secondary">{mission.agent}</td>
                    <td className="px-6 py-4 text-text-secondary">{mission.location}</td>
                    <td className="px-6 py-4">
                      <div className="w-32 h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                          style={{ width: `${mission.progress}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupervisionRealtime;