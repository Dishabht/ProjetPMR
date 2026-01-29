import React, { useState, useRef, useEffect } from "react";
import { FaRobot, FaTimes, FaUser, FaPaperPlane } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Bonjour! 👋 Je suis l'assistant IA de PMove. Comment puis-je vous aider?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Base de connaissances pour les réponses du chatbot
  const knowledgeBase = {
    reservation: [
      "réservation",
      "réserver",
      "booking",
      "trajet",
      "voyage",
      "transport",
    ],
    paiement: ["paiement", "wallet", "portefeuille", "payer", "argent", "fonds"],
    assistance: [
      "aide",
      "help",
      "problème",
      "souci",
      "contact",
      "support",
      "probleme",
    ],
    profil: ["profil", "profile", "compte", "account", "modifications", "infos"],
    compte: ["connexion", "login", "inscription", "signup", "créer compte", "creer compte"],
  };

  const responses = {
    reservation: [
      "Pour réserver un trajet, cliquez sur 'Réservation' dans le menu. Vous pourrez ensuite sélectionner votre itinéraire, la date et l'heure qui vous convient. Un assistant peut vous accompagner si vous le souhaitez.",
      "Vous pouvez consulter vos trajets réservés en accédant à la section 'Réservation'. Pour modifier ou annuler une réservation, contactez notre support.",
      "Les tarifs varient selon la distance et le type d'assistance demandée. Consultez le détail de votre réservation pour voir le prix exactement calculé.",
    ],
    paiement: [
      "Notre Wallet permet de gérer facilement vos paiements. Accédez à 'Wallet' pour ajouter des fonds, consulter votre solde et historique. Vous pouvez payer par carte bancaire ou PayPal.",
      "Le Wallet est sécurisé et crypté. Vos données bancaires ne sont jamais stockées directement, toutes les transactions passent par des passerelles certifiées.",
      "Vous pouvez recharger votre Wallet à tout moment en cliquant sur 'Ajouter des fonds'. Le crédit peut ensuite être utilisé pour vos réservations.",
    ],
    assistance: [
      "Pour toute question ou problème, cliquez sur 'Contact' pour nous envoyer un message. Notre équipe répondra dans les 24h.",
      "Consultez notre section 'Aide' pour trouver des réponses aux questions fréquentes. Vous pouvez aussi utiliser ce chatbot!",
      "Vous avez un problème? N'hésitez pas à nous contacter via la page 'Contact' ou consultez notre FAQ dans 'Aide'.",
    ],
    profil: [
      "Accédez à votre profil en cliquant sur votre nom en haut à droite. Vous pouvez y modifier vos informations personnelles et préférences.",
      "Sur la page de profil, vous pouvez mettre à jour votre photo, vos coordonnées, et vos préférences de voyage.",
      "Votre profil contient aussi l'historique de vos trajets et vos avis.",
    ],
    compte: [
      "Pour créer un compte, cliquez sur 'S'inscrire'. Vous devrez fournir un email et créer un mot de passe. Vérifiez ensuite votre email.",
      "Pour vous connecter, allez à 'Connexion' et entrez vos identifiants. Vous resterez connecté automatiquement.",
      "Si vous oubliez votre mot de passe, utilisez l'option 'Mot de passe oublié?' sur la page de connexion.",
    ],
  };

  const getCategory = (text) => {
    const lowerText = text.toLowerCase();
    for (const [category, keywords] of Object.entries(knowledgeBase)) {
      if (keywords.some((keyword) => lowerText.includes(keyword))) {
        return category;
      }
    }
    return null;
  };

  const getResponse = (text) => {
    const category = getCategory(text);

    if (category && responses[category]) {
      const categoryResponses = responses[category];
      return categoryResponses[
        Math.floor(Math.random() * categoryResponses.length)
      ];
    }

    // Réponses générales pour les questions non catégorisées
    const generalResponses = [
      "C'est une bonne question! Je peux vous aider avec les réservations, le paiement via le Wallet, votre profil, ou l'assistance. Qu'est-ce qui vous intéresse?",
      "Je suis ici pour vous aider! Posez-moi une question sur les trajets, les paiements, votre compte, ou contactez notre équipe via 'Contact'.",
      "Vous pouvez m'interroger sur comment réserver un trajet, utiliser le Wallet, gérer votre profil, ou obtenir de l'aide.",
    ];

    return generalResponses[
      Math.floor(Math.random() * generalResponses.length)
    ];
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    // Ajouter le message de l'utilisateur
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    // Simuler un délai de traitement
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: getResponse(inputValue),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botResponse]);
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {/* Fenêtre du chat */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 z-[9999] bg-white rounded-2xl shadow-2xl w-96 max-h-[600px] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FaRobot className="text-xl" />
                <div>
                  <h3 className="font-bold">Assistant IA PMove</h3>
                  <p className="text-xs text-blue-100">Toujours disponible</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-2 rounded-lg transition-all"
              >
                <FaTimes />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex gap-2 max-w-xs ${
                      message.sender === "user" ? "flex-row-reverse" : ""
                    }`}
                  >
                    {message.sender === "bot" && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <FaRobot className="text-blue-600 text-sm" />
                      </div>
                    )}
                    {message.sender === "user" && (
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                        <FaUser className="text-gray-700 text-sm" />
                      </div>
                    )}
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white rounded-br-none"
                          : "bg-white border border-gray-200 text-gray-900 rounded-bl-none"
                      }`}
                    >
                      <p className="text-sm font-medium text-inherit">{message.text}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <FaRobot className="text-blue-600 text-sm" />
                    </div>
                    <div className="px-4 py-2 rounded-lg bg-white border border-gray-200 rounded-bl-none">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 bg-white"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Posez votre question..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900"
                  disabled={loading}
                />
                <button
                  type="submit"
                  disabled={loading || !inputValue.trim()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <FaPaperPlane className="text-sm" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouton flottant - position fixe séparée */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] bg-gradient-to-br from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all"
      >
        {isOpen ? (
          <FaTimes className="text-xl" />
        ) : (
          <FaRobot className="text-xl" />
        )}
      </motion.button>
    </>
  );
};

export default AIAssistant;
