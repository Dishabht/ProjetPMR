import React, { useState } from "react";

const AgentProfiles = () => {
  const [agents] = useState([
    { id: 1, name: "Agent A", skills: ["Fauteuil", "Ascenseur"], habilitations: ["SNCF"], slots: "07h-15h" },
    { id: 2, name: "Agent B", skills: ["Accompagnement"], habilitations: ["Aéroport"], slots: "14h-22h" },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Profils agents</h1>
          <p className="text-text-secondary">Compétences, habilitations, horaires</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {agents.map((a) => (
            <div key={a.id} className="bg-card border border-border rounded-xl p-5 space-y-2">
              <div className="flex justify-between items-center">
                <h3 className="text-text font-bold">{a.name}</h3>
                <span className="text-text-secondary text-sm">{a.slots}</span>
              </div>
              <p className="text-text-secondary text-sm">Compétences: {a.skills.join(", ")}</p>
              <p className="text-text-secondary text-sm">Habilitations: {a.habilitations.join(", ")}</p>
              <button className="btn-primary w-full py-2">Modifier / planifier</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AgentProfiles;