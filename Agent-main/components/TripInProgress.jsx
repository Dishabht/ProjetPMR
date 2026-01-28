import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

const TripInProgress = ({ navigation }) => {
  // Simuler un délai avant la redirection vers le formulaire d'assistance
  React.useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("AssistanceForm"); // Rediriger vers le formulaire d'assistance
    }, 5000); // 5 secondes de délai

    return () => clearTimeout(timer); // Nettoyer le timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trajet en cours</Text>
      <Text style={styles.subtitle}>
        Vous accompagnez actuellement le PMR vers le point demandé.
      </Text>

      {/* Indicateur de chargement stylisé */}
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#EF4D20" />
        <Text style={styles.loadingText}>En route...</Text>
      </View>

      <View style={styles.statusCard}>
        <Text style={styles.statusText}>Progression en cours</Text>
        <Text style={styles.statusHint}>Restez disponible pour le PMR.</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e27",
    padding: 24,
  },
  title: {
    fontSize: 26,
    fontFamily: "RalewayExtraBold",
    color: "#F97316",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#c7d2e8",
    textAlign: "center",
    marginBottom: 40,
  },
  loadingContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  loadingText: {
    fontSize: 16,
    fontFamily: "RalewayRegular",
    color: "#F97316",
    marginTop: 10,
  },
  statusCard: {
    width: "100%",
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#151b3a",
    borderWidth: 1,
    borderColor: "#2d3454",
    alignItems: "center",
  },
  statusText: {
    fontSize: 16,
    fontFamily: "RalewayExtraBold",
    color: "#f5f7fb",
    marginBottom: 6,
  },
  statusHint: {
    fontSize: 14,
    fontFamily: "RalewayRegular",
    color: "#c7d2e8",
    textAlign: "center",
  },
});

export default TripInProgress;
