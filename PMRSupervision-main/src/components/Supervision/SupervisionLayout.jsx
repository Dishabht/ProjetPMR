import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FiBell, FiUser, FiSettings, FiMap, FiActivity, FiAlertTriangle, FiUsers, FiChevronDown } from "react-icons/fi";
import { MdTransferWithinAStation } from "react-icons/md";
import pMoveLogo from "../../images/logo/PMoveLogoSANSTITRE.png";

const SupervisionLayout = () => {
  const [network, setNetwork] = useState("Tous");
  const [networkOpen, setNetworkOpen] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  const alerts = [
    {
      id: "AL-1",
      title: "Mission non prise",
      network: "SNCF",
      time: "08:30",
      description: "Aucun agent disponible — Taxi PMR déclenché",
      owner: "Superviseur X",
    },
  ];

  const navItems = [
    { label: "Vue réseau", to: "/", icon: <FiMap /> },
    { label: "Missions PMR", to: "/missions", icon: <FiActivity /> },
    { label: "Correspondances à risque", to: "/correspondances", icon: <MdTransferWithinAStation /> },
    { label: "Agents terrain", to: "/agents", icon: <FiUsers /> },
    { label: "Alertes & incidents", to: "/alertes", icon: <FiAlertTriangle /> },
  ];

  const networks = ["Tous", "RATP", "SNCF", "Air France"];


  return (
    <div className="min-h-screen bg-bg text-text font-inter">
      <header className="fixed top-0 left-0 right-0 h-16 bg-bg-secondary border-b border-border flex items-center justify-between px-6 z-40">
        <div className="flex items-center gap-3">
          <img
            src={pMoveLogo}
            alt="PMove"
            className="w-10 h-10 object-contain"
          />
          <h1 className="text-xl md:text-2xl font-semibold">
            <span className="text-text-muted">Supervision</span>{" "}
            <span className="text-text">PMove</span>
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div
              className="flex items-center gap-2 bg-bg-tertiary border border-border rounded-xl px-5 py-2"
              tabIndex={0}
              onBlur={() => setNetworkOpen(false)}
            >
              <span className="text-sm text-text-muted">Réseau :</span>
              <button
                type="button"
                onClick={() => setNetworkOpen((prev) => !prev)}
                className="flex items-center gap-2 text-sm font-semibold text-text"
              >
                {network}
                <FiChevronDown className="text-text-muted" />
              </button>
            </div>
            {networkOpen && (
              <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-bg-secondary border border-border shadow-lg p-2 z-50">
                {networks.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => {
                      setNetwork(item);
                      setNetworkOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-sm transition ${
                      item === network
                        ? "bg-primary/15 text-primary"
                        : "text-text-secondary hover:bg-bg-tertiary"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => setShowAlerts((prev) => !prev)}
              className="w-10 h-10 rounded-xl bg-error/15 border border-error/40 flex items-center justify-center text-error hover:border-error transition"
            >
              <FiAlertTriangle />
              {alerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-error text-white text-xs flex items-center justify-center">
                  {alerts.length}
                </span>
              )}
            </button>
            {showAlerts && (
              <div className="absolute right-0 mt-3 w-80 bg-bg-secondary border border-border rounded-2xl shadow-lg p-4 z-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold">Alertes récentes</h3>
                  <button
                    className="text-xs text-text-muted"
                    onClick={() => setShowAlerts(false)}
                  >
                    Fermer
                  </button>
                </div>
                <div className="space-y-3">
                  {alerts.map((alert) => (
                    <div key={alert.id} className="p-3 rounded-xl bg-bg-tertiary border border-border">
                      <p className="text-sm font-semibold">{alert.title}</p>
                      <p className="text-xs text-text-muted">
                        {alert.network} — {alert.time}
                      </p>
                      <p className="text-xs text-text-secondary mt-1">
                        {alert.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button className="w-10 h-10 rounded-xl bg-bg-tertiary border border-border flex items-center justify-center hover:border-primary transition">
            <FiUser />
          </button>
        </div>
      </header>

      <aside className="fixed top-16 left-0 bottom-0 w-64 bg-bg-secondary border-r border-border px-4 py-6 flex flex-col gap-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/40"
                  : "text-text-secondary hover:bg-bg-tertiary"
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
          </NavLink>
        ))}

        <div className="mt-auto pt-4 border-t border-border">
          <NavLink
            to="/parametres"
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-primary/15 text-primary border border-primary/40"
                  : "text-text-secondary hover:bg-bg-tertiary"
              }`
            }
          >
            <span className="text-lg"><FiSettings /></span>
            <span className="text-sm font-medium">Paramètres</span>
          </NavLink>
        </div>
      </aside>

      <main className="pl-64 pt-20 pb-8">
        <Outlet context={{ network, alerts }} />
      </main>
    </div>
  );
};

export default SupervisionLayout;
