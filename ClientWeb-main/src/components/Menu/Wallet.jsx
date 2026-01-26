import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../../UserContext";
import { FaWallet, FaCreditCard, FaMoneyBillWave, FaHistory, FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const Wallet = () => {
  const { user } = useContext(UserContext);
  const [balance, setBalance] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Charger le solde et l'historique depuis l'API
    loadWalletData();
  }, [user]);

  const loadWalletData = async () => {
    try {
      // Simulation de chargement des données
      // TODO: Remplacer par un vrai appel API
      setBalance(125.50);
      setTransactions([
        { id: 1, date: "2026-01-25", type: "charge", amount: 50, description: "Recharge par carte" },
        { id: 2, date: "2026-01-24", type: "payment", amount: -25.50, description: "Paiement réservation #12345" },
        { id: 3, date: "2026-01-22", type: "charge", amount: 100, description: "Recharge par carte" },
        { id: 4, date: "2026-01-20", type: "payment", amount: -30, description: "Paiement réservation #12344" },
      ]);
    } catch (error) {
      console.error("Erreur lors du chargement du portefeuille:", error);
    }
  };

  const handleAddFunds = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validation
      if (!amount || parseFloat(amount) <= 0) {
        alert("Veuillez entrer un montant valide");
        setLoading(false);
        return;
      }

      if (paymentMethod === "card") {
        if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
          alert("Veuillez remplir tous les champs de la carte");
          setLoading(false);
          return;
        }
      }

      // Simulation de l'ajout de fonds
      // TODO: Intégrer avec une vraie passerelle de paiement (Stripe, PayPal, etc.)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newBalance = balance + parseFloat(amount);
      setBalance(newBalance);

      const newTransaction = {
        id: transactions.length + 1,
        date: new Date().toISOString().split('T')[0],
        type: "charge",
        amount: parseFloat(amount),
        description: `Recharge par ${paymentMethod === "card" ? "carte" : "PayPal"}`
      };

      setTransactions([newTransaction, ...transactions]);

      // Réinitialiser le formulaire
      setAmount("");
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCVV("");
      setShowAddFunds(false);

      alert(`${amount}€ ajoutés avec succès à votre portefeuille !`);
    } catch (error) {
      console.error("Erreur lors de l'ajout de fonds:", error);
      alert("Une erreur est survenue lors de l'ajout de fonds");
    } finally {
      setLoading(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.slice(0, 2) + '/' + v.slice(2, 4);
    }
    return v;
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Veuillez vous connecter</h2>
          <p className="text-gray-500">Vous devez être connecté pour accéder à votre portefeuille</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-tertiary pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header avec solde */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-primary to-primary-dark rounded-2xl p-8 mb-8 shadow-2xl"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <FaWallet className="text-white text-3xl" />
                <h1 className="text-3xl font-bold text-white">Mon Portefeuille</h1>
              </div>
              <p className="text-white/80 mb-4">Gérez vos fonds et paiements</p>
              <div className="text-5xl font-bold text-white">
                {balance.toFixed(2)} €
              </div>
            </div>
            <button
              onClick={() => setShowAddFunds(true)}
              className="flex items-center gap-2 px-6 py-3 bg-white text-primary font-semibold rounded-xl hover:bg-gray-100 transition-all duration-300 shadow-lg"
            >
              <FaPlus />
              Ajouter des fonds
            </button>
          </div>
        </motion.div>

        {/* Formulaire d'ajout de fonds */}
        {showAddFunds && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 mb-8 shadow-xl"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Ajouter des fonds</h2>
              <button
                onClick={() => setShowAddFunds(false)}
                className="text-gray-500 hover:text-gray-900"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddFunds}>
              {/* Montant */}
              <div className="mb-6">
                <label className="block text-gray-900 font-semibold mb-2">Montant à ajouter (€)</label>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="50.00"
                  required
                />
              </div>

              {/* Méthode de paiement */}
              <div className="mb-6">
                <label className="block text-gray-900 font-semibold mb-3">Méthode de paiement</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("card")}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "card"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 text-gray-500 hover:border-primary/50"
                    }`}
                  >
                    <FaCreditCard className="text-2xl" />
                    <span className="font-semibold">Carte bancaire</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("paypal")}
                    className={`flex items-center justify-center gap-3 px-6 py-4 rounded-lg border-2 transition-all ${
                      paymentMethod === "paypal"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-gray-300 text-gray-500 hover:border-primary/50"
                    }`}
                  >
                    <FaMoneyBillWave className="text-2xl" />
                    <span className="font-semibold">PayPal</span>
                  </button>
                </div>
              </div>

              {/* Informations de carte */}
              {paymentMethod === "card" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 mb-6"
                >
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Numéro de carte</label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                      maxLength="19"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">Nom sur la carte</label>
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="JEAN DUPONT"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">Date d'expiration</label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="MM/YY"
                        maxLength="5"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-gray-900 font-semibold mb-2">CVV</label>
                      <input
                        type="text"
                        value={cardCVV}
                        onChange={(e) => setCardCVV(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="123"
                        maxLength="3"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Bouton de soumission */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Traitement en cours..." : `Ajouter ${amount || "0.00"} €`}
              </button>
            </form>
          </motion.div>
        )}

        {/* Historique des transactions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaHistory className="text-blue-600 text-2xl" />
            <h2 className="text-2xl font-bold text-gray-900">Historique des transactions</h2>
          </div>

          {transactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">Aucune transaction pour le moment</p>
          ) : (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        transaction.type === "charge"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.type === "charge" ? <FaPlus /> : <FaMoneyBillWave />}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{transaction.description}</p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <div
                    className={`text-xl font-bold ${
                      transaction.type === "charge" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "charge" ? "+" : ""}
                    {transaction.amount.toFixed(2)} €
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Informations de sécurité */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg"
        >
          <h3 className="font-bold text-blue-900 mb-2">🔒 Sécurité et confidentialité</h3>
          <p className="text-blue-800 text-sm">
            Vos informations de paiement sont sécurisées et cryptées. Nous ne stockons pas vos données bancaires.
            Toutes les transactions sont effectuées via des passerelles de paiement certifiées.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Wallet;
