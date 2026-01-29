import React from "react";
import { FaClipboardList, FaQrcode, FaSignature } from "react-icons/fa";

const HistoriqueAudit = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-20 pb-12 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <FaClipboardList className="text-primary text-3xl" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Historique & audit</h1>
            <p className="text-gray-600">Journal complet, preuves numériques, conformité.</p>
          </div>
        </header>

        <div className="bg-white rounded-xl shadow p-5 border border-gray-100 space-y-4">
          <div className="h-56 border border-dashed border-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm">
            Timeline des missions : qui a affecté quoi, heures exactes, acceptation/refus.
          </div>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 flex items-center gap-2">
              <FaSignature className="text-primary" /> Signatures
            </div>
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50 flex items-center gap-2">
              <FaQrcode className="text-primary" /> QR handover
            </div>
            <div className="p-3 border border-gray-100 rounded-lg bg-gray-50">
              Photos / preuves numériques
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoriqueAudit;
