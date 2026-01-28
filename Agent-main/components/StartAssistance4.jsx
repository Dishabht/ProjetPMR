import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StartAssistance4 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Démarrons pour de bon le trajet !</Text>

      <Text style={styles.subtitle}>
        Vous êtes prêt à accompagner le PMR vers son point de destination.
      </Text>
      <Text style={styles.note}>
        Assurez-vous que le PMR est confortablement installé et que tous les bagages sont sécurisés.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("TripInProgress")} // Rediriger vers la page "Trajet en cours"
      >
        <Text style={styles.buttonText}>Commencer le trajet</Text>
      </TouchableOpacity>
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
    marginBottom: 24,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#c7d2e8",
    textAlign: "center",
    marginBottom: 16,
  },
  note: {
    fontSize: 14,
    fontFamily: "RalewayRegular",
    color: "#94a3b8",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 20,
  },
  
  button: {
    backgroundColor: "#F97316",
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 2,
  },
  buttonText: {
    color: "white",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});

export default StartAssistance4;