import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const adminSections = [
    {
      title: "Import Plannings",
      description: "Importer horaires SNCF, aéroports, compagnies de bus",
      link: "/admin/import-planning",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Attribution Missions",
      description: "Algorithme intelligent de matching agent-mission",
      link: "/admin/mission-matching",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Blocage Agent",
      description: "Bloquer agents entre zones, escalade superviseur",
      link: "/admin/agent-blocking",
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Supervision Temps Réel",
      description: "Dashboard avec états missions, localisation, alarmes",
      link: "/admin/supervision",
      color: "from-green-500 to-emerald-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Panneau Admin PMove
          </h1>
          <p className="text-xl text-text-secondary">
            Gérez les plannings, missions et agents en temps réel
          </p>
        </div>

        {/* Grid Admin Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminSections.map((section, idx) => (
            <Link
              key={idx}
              to={section.link}
              className="group relative overflow-hidden rounded-2xl p-8 bg-card border border-border hover:border-primary transition-all duration-300 shadow-md hover:shadow-xl hover:scale-105"
            >
              {/* Gradient Background */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${section.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-text mb-2">
                  {section.title}
                </h3>
                <p className="text-text-secondary mb-4">
                  {section.description}
                </p>
                <div className="inline-block px-4 py-2 bg-primary/20 text-primary rounded-lg font-semibold group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  Accéder →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Stats Preview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
          {[
            { label: "Missions Actives", value: "24", color: "text-cyan-400" },
            { label: "Agents Disponibles", value: "12", color: "text-green-400" },
            { label: "Incidents", value: "3", color: "text-orange-400" },
            { label: "Taux Réussite", value: "98%", color: "text-blue-400" }
          ].map((stat, idx) => (
            <div key={idx} className="bg-card border border-border rounded-xl p-6">
              <p className="text-text-secondary text-sm mb-2">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;