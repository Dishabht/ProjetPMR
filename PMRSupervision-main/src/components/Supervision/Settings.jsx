import React from "react";

const Settings = () => {
  return (
    <div className="px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Paramètres</h2>
        <p className="text-text-muted text-sm">
          Configuration de l'outil de supervision.
        </p>
      </div>

      <div className="card-modern">
        <h3 className="text-lg font-semibold mb-2">Préférences</h3>
        <p className="text-text-muted text-sm">
          Gérez les notifications, les accès superviseur et les seuils de
          criticité.
        </p>
      </div>
    </div>
  );
};

export default Settings;
