import React, { useState } from "react";

const MissionMatching = () => {
  const [algorithm, setAlgorithm] = useState("proximity");
  const [missions, setMissions] = useState([
    { id: 1, traveler: "M. Dupont", transport: "Train TGV 14:30", priority: "Haute", status: "À assigner" },
    { id: 2, traveler: "Mme Martin", transport: "Avion AF123 16:00", priority: "Normal", status: "À assigner" }
  ]);

  const handleAutoMatch = () => {
    alert(`Matching appliqué avec algo: ${algorithm}`);
    // TODO: Appel API matching
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Attribution Missions (Matching)</h1>

        {/* Algorithm Selection */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-text mb-6">🎯 Paramètres Matching</h2>
          
          <div className="space-y-6">
            <div>
              <label className="text-text font-semibold block mb-3">Algorithme</label>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                {[
                  { value: "proximity", label: "Proximité" },
                  { value: "availability", label: "Disponibilité" },
                  { value: "skills", label: "Compétences" },
                  { value: "balanced", label: "Équilibré" }
                ].map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setAlgorithm(opt.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      algorithm === opt.value
                        ? "border-primary bg-primary/20 text-primary"
                        : "border-border text-text hover:border-primary"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Criteria Weights */}
            <div className="space-y-4">
              {[
                { label: "Proximité Géographique", weight: 40 },
                { label: "Disponibilité", weight: 30 },
                { label: "Compétences", weight: 20 },
                { label: "Charge Travail", weight: 10 }
              ].map((criterion, idx) => (
                <div key={idx}>
                  <div className="flex justify-between mb-2">
                    <span className="text-text">{criterion.label}</span>
                    <span className="text-primary font-bold">{criterion.weight}%</span>
                  </div>
                  <div className="w-full h-2 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      style={{ width: `${criterion.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={handleAutoMatch} className="btn-primary w-full py-3 text-lg">
              Appliquer Matching Automatique
            </button>
          </div>
        </div>

        {/* Missions Queue */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-text mb-6">Files d'Attente</h2>
          
          <div className="space-y-4">
            {missions.map((mission) => (
              <div key={mission.id} className="border border-border/30 rounded-xl p-6 hover:bg-bg-secondary/50 transition-colors">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <h3 className="text-text font-bold mb-1">{mission.traveler}</h3>
                    <p className="text-text-secondary">{mission.transport}</p>
                  </div>
                  <div className="flex gap-4 items-center">
                    <span className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      mission.priority === "Haute" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {mission.priority}
                    </span>
                    <button className="btn-primary px-4 py-2">
                      Assigner Agent
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionMatching;