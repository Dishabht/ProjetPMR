import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaQuestionCircle, FaPhone, FaChevronDown } from "react-icons/fa";

const Help = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdown = (dropdown) => {
    setOpenDropdown((prev) => (prev === dropdown ? null : dropdown));
  };

  const faqCategories = [
    {
      id: "reservations",
      title: "Réservations",
      items: [
        "Modifier une réservation existante",
        "Annuler une réservation",
        "Vérifier l'état d'une réservation"
      ]
    },
    {
      id: "accompagnateur",
      title: "Accompagnateur",
      items: [
        "Ajouter un accompagnateur à votre réservation",
        "Modifier les informations de l'accompagnateur",
        "Supprimer un accompagnateur"
      ]
    },
    {
      id: "remboursement",
      title: "Remboursement",
      items: [
        "Demander un remboursement",
        "Vérifier le statut d'un remboursement",
        "Conditions de remboursement"
      ]
    },
    {
      id: "donnees-personnelles",
      title: "Données personnelles",
      items: [
        "Modifier vos données personnelles",
        "Supprimer votre compte",
        "Consulter les politiques de confidentialité"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <section className="bg-card border border-border p-6 md:p-8 rounded-2xl shadow-xl mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-text mb-2">
                Centre d'Aide PMove
              </h1>
              <p className="text-text-secondary">
                Reçois de l'aide pour tes réservations et services
              </p>
            </div>
            <Link to="/login">
              <button className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Se connecter
              </button>
            </Link>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-text">F.A.Q</h2>
            <FaQuestionCircle className="text-primary text-2xl" />
            <FaPhone className="text-accent text-2xl" />
          </div>
          
          <div className="bg-card border border-border p-6 rounded-2xl shadow-lg mb-6">
            <p className="text-text font-semibold mb-4">Questions du moment :</p>
            <ul className="space-y-2 text-text-secondary">
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Comment déclarer la perte d'un billet avec mon compte ?
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">•</span>
                Comment faire si je voyage accompagné d'un proche ?
              </li>
            </ul>
          </div>
        </section>

        {/* FAQ Dropdowns */}
        <section className="grid sm:grid-cols-2 gap-4">
          {faqCategories.map((category) => (
            <div
              key={category.id}
              className="bg-card border border-border rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden"
            >
              <div
                onClick={() => handleDropdown(category.id)}
                className="flex justify-between items-center p-6 cursor-pointer hover:bg-bg-secondary transition-colors"
              >
                <span className="text-text font-semibold text-lg">
                  {category.title}
                </span>
                <FaChevronDown
                  className={`text-primary text-xl transform transition-transform duration-300 ${
                    openDropdown === category.id ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openDropdown === category.id ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 pt-2 border-t border-border bg-bg-secondary/50">
                  <ul className="space-y-2">
                    {category.items.map((item, idx) => (
                      <li key={idx} className="flex items-start text-text-secondary">
                        <span className="text-accent mr-2 mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Contact Section */}
        <section className="mt-12 text-center">
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-text mb-4">
              Besoin d'une aide supplémentaire ?
            </h3>
            <p className="text-text-secondary mb-6">
              Notre équipe est disponible pour répondre à toutes vos questions
            </p>
            <Link to="/contact">
              <button className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105">
                Nous contacter
              </button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Help;