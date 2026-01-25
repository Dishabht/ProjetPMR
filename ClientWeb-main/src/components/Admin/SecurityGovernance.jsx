import React from "react";

const SecurityGovernance = () => {
  const roles = [
    { name: "Admin", rights: "Tous droits, export, audit" },
    { name: "Superviseur", rights: "Affectation, escalade, incidents" },
    { name: "Opérateur externe", rights: "Lecture + confirmations" },
  ];

  const audits = [
    { ts: "14:02", user: "admin", action: "Export CSV missions" },
    { ts: "13:55", user: "superviseur1", action: "Override affectation mission #842" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-text mb-2">Sécurité & gouvernance</h1>
          <p className="text-text-secondary">Rôles, audit, export RGPD</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-text">Rôles</h2>
          {roles.map((r) => (
            <div key={r.name} className="border border-border/40 rounded-lg p-4">
              <p className="text-text font-semibold">{r.name}</p>
              <p className="text-text-secondary text-sm">{r.rights}</p>
            </div>
          ))}
          <button className="btn-primary w-full py-3 font-semibold">Ajouter / modifier un rôle</button>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-text">Journal d'audit</h2>
            <div className="flex gap-2">
              <button className="btn-primary px-4 py-2">Export CSV</button>
              <button className="border border-border px-4 py-2 rounded-lg text-text hover:border-primary">Export JSON</button>
            </div>
          </div>
          {audits.map((a, i) => (
            <div key={i} className="border border-border/40 rounded-lg p-3">
              <p className="text-text-secondary text-sm">{a.ts} • {a.user}</p>
              <p className="text-text">{a.action}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecurityGovernance;