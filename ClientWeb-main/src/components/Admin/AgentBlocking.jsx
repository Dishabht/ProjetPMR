import React, { useState } from "react";

const AgentBlocking = () => {
  const [blockedAgents, setBlockedAgents] = useState([
    { id: 1, name: "Agent A", zone: "Gare Zone A", reason: "Transfert fauteuil", until: "14:30", status: "Actif" }
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Blocage Agents & Escalade</h1>

        {/* Current Blocks */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-text mb-6">🔒 Agents Bloqués</h2>
          
          <div className="space-y-4">
            {blockedAgents.map((agent) => (
              <div key={agent.id} className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 flex justify-between items-center">
                <div>
                  <h3 className="text-text font-bold">{agent.name}</h3>
                  <p className="text-text-secondary text-sm">
                    {agent.zone} • {agent.reason} • Jusqu'à {agent.until}
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg">
                  Débloquer
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Escalation Rules */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-text mb-6">📋 Politique d'Escalade</h2>
          
          <div className="space-y-6">
            {[
              {
                step: 1,
                title: "Refus Agent",
                action: "Proposition à agent suivant",
                timeout: "30 sec"
              },
              {
                step: 2,
                title: "Non-Réponse",
                action: "Alerte superviseur",
                timeout: "1 min"
              },
              {
                step: 3,
                title: "Pas d'Agent",
                action: "Proposition taxi PMR",
                timeout: "Immédiat"
              }
            ].map((rule) => (
              <div key={rule.step} className="border border-border/30 rounded-xl p-6 flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                  {rule.step}
                </div>
                <div className="flex-1">
                  <h3 className="text-text font-bold mb-1">{rule.title}</h3>
                  <p className="text-text-secondary">{rule.action}</p>
                  <p className="text-text-muted text-sm mt-1">Timeout: {rule.timeout}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBlocking;