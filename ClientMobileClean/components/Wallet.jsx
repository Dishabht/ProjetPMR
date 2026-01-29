import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { ThemeContext } from "../ThemeContext";

const Wallet = () => {
  const { theme } = React.useContext(ThemeContext);
  const [balance, setBalance] = useState(125.5);
  const [transactions, setTransactions] = useState([
    {
      id: "1",
      date: "02/12/2025",
      type: "charge",
      amount: 50.0,
      description: "Recharge par carte",
    },
    {
      id: "2",
      date: "02/12/2025",
      type: "payment",
      amount: -25.5,
      description: "Paiement réservation #101",
    },
  ]);
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [loading, setLoading] = useState(false);

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    return parts.length ? parts.join(" ") : value;
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
    }
    return v;
  };

  const handleAddFunds = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      Alert.alert("Montant invalide", "Veuillez entrer un montant valide.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        Alert.alert("Carte incomplète", "Veuillez remplir tous les champs.");
        return;
      }
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const value = parseFloat(amount);
      setBalance((prev) => prev + value);
      const newTransaction = {
        id: String(transactions.length + 1),
        date: new Date().toLocaleDateString("fr-FR"),
        type: "charge",
        amount: value,
        description: `Recharge par ${paymentMethod === "card" ? "carte" : "PayPal"}`,
      };
      setTransactions([newTransaction, ...transactions]);
      setAmount("");
      setCardNumber("");
      setCardName("");
      setCardExpiry("");
      setCardCVV("");
      setShowAddFunds(false);
      Alert.alert("Succès", "Fonds ajoutés avec succès.");
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'ajouter les fonds.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.headerCard}>
        <View style={styles.headerRow}>
          <View style={styles.logoBadge}>
            <Icon name="wallet" size={22} color="#ffffff" />
          </View>
          <Text style={styles.headerTitle}>Mon Wallet</Text>
        </View>
        <Text style={styles.headerSubtitle}>Solde disponible</Text>
        <Text style={styles.balance}>{balance.toFixed(2)} €</Text>
        <TouchableOpacity
          style={styles.addFundsButton}
          onPress={() => setShowAddFunds((prev) => !prev)}
        >
          <Icon name="plus" size={14} color="#0a0e27" />
          <Text style={styles.addFundsText}>Ajouter des fonds</Text>
        </TouchableOpacity>
      </View>

      {showAddFunds && (
        <View style={styles.formCard}>
          <Text style={styles.sectionTitle}>Ajouter des fonds</Text>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Montant (€)</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              placeholder="50.00"
              placeholderTextColor="#7c8bb5"
              keyboardType="decimal-pad"
              style={styles.input}
            />
          </View>

          <View style={styles.paymentRow}>
            <TouchableOpacity
              style={
                paymentMethod === "card"
                  ? styles.paymentActive
                  : styles.paymentButton
              }
              onPress={() => setPaymentMethod("card")}
            >
              <Icon name="credit-card" size={18} color="#0066ff" />
              <Text style={styles.paymentText}>Carte</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                paymentMethod === "paypal"
                  ? styles.paymentActive
                  : styles.paymentButton
              }
              onPress={() => setPaymentMethod("paypal")}
            >
              <Icon name="paypal" size={18} color="#0066ff" />
              <Text style={styles.paymentText}>PayPal</Text>
            </TouchableOpacity>
          </View>

          {paymentMethod === "card" && (
            <View style={styles.cardFields}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Numéro de carte</Text>
                <TextInput
                  value={cardNumber}
                  onChangeText={(value) => setCardNumber(formatCardNumber(value))}
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#7c8bb5"
                  keyboardType="number-pad"
                  maxLength={19}
                  style={styles.input}
                />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nom sur la carte</Text>
                <TextInput
                  value={cardName}
                  onChangeText={(value) => setCardName(value.toUpperCase())}
                  placeholder="JEAN DUPONT"
                  placeholderTextColor="#7c8bb5"
                  style={styles.input}
                />
              </View>
              <View style={styles.rowInputs}>
                <View style={styles.rowInputItem}>
                  <Text style={styles.inputLabel}>Expiration</Text>
                  <TextInput
                    value={cardExpiry}
                    onChangeText={(value) => setCardExpiry(formatExpiry(value))}
                    placeholder="MM/AA"
                    placeholderTextColor="#7c8bb5"
                    maxLength={5}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                </View>
                <View style={styles.rowInputItem}>
                  <Text style={styles.inputLabel}>CVV</Text>
                  <TextInput
                    value={cardCVV}
                    onChangeText={(value) => setCardCVV(value.replace(/[^0-9]/g, ""))}
                    placeholder="123"
                    placeholderTextColor="#7c8bb5"
                    maxLength={3}
                    keyboardType="number-pad"
                    style={styles.input}
                  />
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleAddFunds}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#0a0e27" />
            ) : (
              <Text style={styles.submitText}>Ajouter {amount || "0.00"} €</Text>
            )}
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Historique</Text>
        {transactions.map((item) => (
          <View key={item.id} style={styles.transactionRow}>
            <View style={styles.transactionLeft}>
              <View
                style={[
                  styles.transactionIcon,
                  item.type === "charge"
                    ? styles.chargeIcon
                    : styles.paymentIcon,
                ]}
              >
                <Icon
                  name={item.type === "charge" ? "plus" : "money"}
                  size={14}
                  color={item.type === "charge" ? "#10b981" : "#ef4444"}
                />
              </View>
              <View>
                <Text style={styles.transactionDesc}>{item.description}</Text>
                <Text style={styles.transactionDate}>{item.date}</Text>
              </View>
            </View>
            <Text
              style={
                item.type === "charge"
                  ? styles.amountPositive
                  : styles.amountNegative
              }
            >
              {item.type === "charge" ? "+" : ""}
              {item.amount.toFixed(2)} €
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.securityCard}>
        <Text style={styles.securityTitle}>🔒 Sécurité et confidentialité</Text>
        <Text style={styles.securityText}>
          Vos informations de paiement sont sécurisées et cryptées. Nous ne
          stockons pas vos données bancaires.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 40,
  },
  headerCard: {
    backgroundColor: "#151b3a",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#2d3454",
    marginBottom: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 10,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#0066ff",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: "#c7d2e8",
    fontSize: 14,
  },
  balance: {
    color: "#ffffff",
    fontSize: 32,
    fontWeight: "800",
    marginTop: 6,
  },
  addFundsButton: {
    marginTop: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
  },
  addFundsText: {
    color: "#0a0e27",
    fontWeight: "700",
    fontSize: 13,
  },
  formCard: {
    backgroundColor: "#151b3a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2d3454",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 12,
  },
  inputLabel: {
    color: "#c7d2e8",
    fontSize: 12,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#0f1533",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2d3454",
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: "#f5f7fb",
  },
  paymentRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  paymentButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#2d3454",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flexDirection: "row",
  },
  paymentActive: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#0066ff",
    backgroundColor: "rgba(0, 102, 255, 0.15)",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    flexDirection: "row",
  },
  paymentText: {
    color: "#f5f7fb",
    fontWeight: "600",
  },
  cardFields: {
    marginBottom: 12,
  },
  rowInputs: {
    flexDirection: "row",
    gap: 12,
  },
  rowInputItem: {
    flex: 1,
  },
  submitButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  submitText: {
    color: "#0a0e27",
    fontWeight: "700",
    fontSize: 14,
  },
  section: {
    backgroundColor: "#151b3a",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  sectionTitle: {
    color: "#f5f7fb",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },
  transactionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#2d3454",
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  chargeIcon: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
  },
  paymentIcon: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  transactionDesc: {
    color: "#f5f7fb",
    fontSize: 14,
    fontWeight: "600",
  },
  transactionDate: {
    color: "#c7d2e8",
    fontSize: 12,
  },
  amountPositive: {
    color: "#10b981",
    fontSize: 14,
    fontWeight: "700",
  },
  amountNegative: {
    color: "#ef4444",
    fontSize: 14,
    fontWeight: "700",
  },
  securityCard: {
    marginTop: 20,
    backgroundColor: "rgba(0, 102, 255, 0.12)",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "rgba(0, 102, 255, 0.35)",
  },
  securityTitle: {
    color: "#0a0e27",
    fontWeight: "700",
    marginBottom: 6,
  },
  securityText: {
    color: "#111827",
    fontSize: 12,
  },
});

export default Wallet;
