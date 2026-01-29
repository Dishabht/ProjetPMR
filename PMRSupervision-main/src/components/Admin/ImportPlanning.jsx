import React, { useState } from "react";

const ImportPlanning = () => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [bufferTime, setBufferTime] = useState(30);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadStatus(`Fichier reçu: ${file.name}`);
      // TODO: Appel API d'import
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-text mb-8">Import Plannings</h1>

        {/* Import Section */}
        <div className="bg-card border border-border rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-text mb-6">📥 Importer Horaires</h2>
          
          <div className="space-y-6">
            {/* File Upload */}
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept=".csv,.xlsx,.json"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <p className="text-text-secondary text-lg mb-2">
                  Drag & drop ou clique pour sélectionner
                </p>
                <p className="text-text-muted text-sm">CSV, Excel, JSON acceptés</p>
              </label>
            </div>

            {uploadStatus && (
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4 text-green-400">
                ✓ {uploadStatus}
              </div>
            )}

            {/* Buffer Time Config */}
            <div className="space-y-3">
              <label className="text-text font-semibold">
                Buffer Temps (minutes entre correspondances)
              </label>
              <input
                type="number"
                value={bufferTime}
                onChange={(e) => setBufferTime(e.target.value)}
                className="input-modern"
              />
              <p className="text-text-muted text-sm">
                Temps minimum recommandé: {bufferTime} min
              </p>
            </div>

            {/* API Integration Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["SNCF API", "Aéroports API", "Buses API"].map((api) => (
                <button
                  key={api}
                  className="p-4 border border-border rounded-lg hover:border-primary hover:bg-primary/10 transition-all text-text"
                >
                  Synchroniser {api}
                </button>
              ))}
            </div>

            {/* Import Button */}
            <button className="btn-primary w-full py-3 text-lg font-semibold">
              Importer & Créer Créneaux
            </button>
          </div>
        </div>

        {/* Import History */}
        <div className="bg-card border border-border rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-text mb-6">Historique</h2>
          <div className="space-y-3">
            {[
              { date: "24 Jan", file: "planning_sncf.csv", status: "✓ Succès" },
              { date: "23 Jan", file: "orly_flights.xlsx", status: "✓ Succès" },
              { date: "22 Jan", file: "bus_routes.json", status: "⚠ Erreur" }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-border/30 pb-3">
                <div>
                  <p className="text-text font-medium">{item.file}</p>
                  <p className="text-text-muted text-sm">{item.date}</p>
                </div>
                <span className="text-green-400">{item.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportPlanning;