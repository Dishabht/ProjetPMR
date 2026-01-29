import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { FaQuestionCircle, FaPhone, FaChevronDown, FaEnvelope } from "react-icons/fa";

const Support = () => {
  const [activeTab, setActiveTab] = useState("faq");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/send-email",
        { email, name, subject, message },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (res.data.code === 200) {
        toast.success("Votre message a été envoyé avec succès !");
        setSubmitted(true);
      } else {
        toast.error("Une erreur s'est produite. Veuillez réessayer.");
      }
    } catch (err) {
      toast.error("Erreur réseau lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary">
        <div className="max-w-lg p-8 text-center bg-card border border-border rounded-2xl shadow-xl">
          <div className="text-6xl mb-6">🎉</div>
          <h2 className="mb-4 text-4xl font-extrabold text-text">
            Merci pour votre message !
          </h2>
          <p className="mb-8 text-lg text-text-secondary">
            Nous vous répondrons dans les plus brefs délais.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 text-white bg-gradient-to-r from-primary to-accent rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
          >
            Retour à l'accueil
          </button>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-bg-secondary to-bg-tertiary py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text mb-4">
            Support & Aide
          </h1>
          <p className="text-xl text-text-secondary">
            Trouvez des réponses à vos questions ou contactez-nous
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-card border border-border rounded-xl p-2 inline-flex">
            <button
              onClick={() => setActiveTab("faq")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "faq"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              <FaQuestionCircle className="inline mr-2" />
              Aide
            </button>
            <button
              onClick={() => setActiveTab("contact")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "contact"
                  ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg"
                  : "text-text-secondary hover:text-text"
              }`}
            >
              <FaEnvelope className="inline mr-2" />
              Contact
            </button>
          </div>
        </div>

        {/* Aide Tab Content */}
        {activeTab === "faq" && (
          <div>
            {/* Quick Questions */}
            <section className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-text">Questions Fréquentes</h2>
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

            {/* CTA to Contact */}
            <div className="mt-12 text-center">
              <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-text mb-4">
                  Vous ne trouvez pas votre réponse ?
                </h3>
                <p className="text-text-secondary mb-6">
                  Notre équipe est disponible pour vous aider
                </p>
                <button
                  onClick={() => setActiveTab("contact")}
                  className="px-8 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-lg font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Nous contacter
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Contact Tab Content */}
        {activeTab === "contact" && (
          <div className="w-full max-w-2xl mx-auto p-8 bg-card border border-border rounded-2xl shadow-xl">
            <h2 className="mb-2 text-3xl font-bold text-text">
              Nous Contacter
            </h2>
            <p className="mb-8 text-text-secondary">
              Une question ? N'hésitez pas à nous écrire.
            </p>
            
            <form onSubmit={submit} className="space-y-6">
              {/* Name and Email Fields */}
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="w-full">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-semibold text-text"
                  >
                    Nom
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-gray-900 transition-all"
                    placeholder="Votre nom"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-semibold text-text"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-gray-900 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>
              </div>

              {/* Subject Field */}
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 font-semibold text-text"
                >
                  Sujet
                </label>
                <input
                  id="subject"
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-gray-900 transition-all"
                  placeholder="Objet de votre message"
                />
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="block mb-2 font-semibold text-text"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary focus:outline-none text-gray-900 transition-all resize-none"
                  placeholder="Écrivez votre message ici..."
                  rows="6"
                />
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="flex items-center justify-center px-8 py-3 text-white bg-gradient-to-r from-primary to-accent rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold min-w-[180px]"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg
                        className="w-5 h-5 mr-2 text-white animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 100 8H4z"
                        ></path>
                      </svg>
                      Envoi...
                    </>
                  ) : (
                    "Envoyer le message"
                  )}
                </button>
              </div>
            </form>
          </div>
        )}

        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
    </div>
  );
};

export default Support;
