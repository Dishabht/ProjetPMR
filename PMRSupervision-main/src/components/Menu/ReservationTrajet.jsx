import React, { useState } from 'react';
import { FaTrain, FaPlane, FaBus, FaTaxi } from 'react-icons/fa';

const ReservationTrajet = () => {
  const [transportType, setTransportType] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-5xl font-bold text-text mb-4">
              Besoin d'assistance ?
              <br />
              Nous sommes là !
            </h1>
            <h2 className="text-3xl font-semibold text-text-secondary">
              Réservation de trajet
            </h2>
          </div>

          <form className="space-y-8">
            {/* Type de transport */}
            <div>
              <label className="block text-lg font-bold text-text mb-4">
                Sélectionnez le type de transport :
              </label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { value: 'train', label: 'Train - RER - Métro', icon: <FaTrain /> },
                  { value: 'plane', label: 'Avion', icon: <FaPlane /> },
                  { value: 'tramway', label: 'Tramway', icon: <FaTrain /> },
                  { value: 'bus', label: 'Bus', icon: <FaBus /> },
                  { value: 'taxi', label: 'Taxi', icon: <FaTaxi /> },
                ].map((transport) => (
                  <label
                    key={transport.value}
                    className={`flex flex-col items-center justify-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      transportType === transport.value
                        ? 'border-primary bg-primary/10'
                        : 'border-border bg-bg-secondary hover:bg-bg-tertiary'
                    }`}
                  >
                    <input
                      type="radio"
                      name="transportType"
                      value={transport.value}
                      checked={transportType === transport.value}
                      onChange={(e) => setTransportType(e.target.value)}
                      className="sr-only"
                    />
                    <div className={`text-3xl mb-2 ${transportType === transport.value ? 'text-primary' : 'text-text-secondary'}`}>
                      {transport.icon}
                    </div>
                    <span className={`text-sm text-center font-medium ${transportType === transport.value ? 'text-primary' : 'text-text'}`}>
                      {transport.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stations et dates */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    Gare de départ
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="Gare de Paris-Nord"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    Gare d'arrivée
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="Gare de Lyon"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-text mb-2">
                    Numéro de carte de réduction
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-text transition-all"
                    placeholder="123456789"
                  />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
              <button
                type="button"
                className="px-8 py-3 bg-bg-secondary border border-border text-text font-bold rounded-lg hover:bg-bg-tertiary transition-all"
              >
                Réserver
              </button>
              <button
                type="submit"
                className="px-12 py-3 bg-gradient-to-r from-primary to-accent text-white font-bold rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Continuer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReservationTrajet;