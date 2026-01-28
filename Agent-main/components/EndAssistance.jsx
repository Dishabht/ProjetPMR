import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EndAssistance = () => {
    const navigation = useNavigation();
    useEffect(() => {
      const timer = setTimeout(() => {
        navigation.navigate("Home"); // Remplacez "Accueil" par le nom de votre page d'accueil
      }, 5000);
  
      return () => clearTimeout(timer); // Nettoyage du timer
    }, [navigation]);
  
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>✓</Text>
          </View>
          <Text style={styles.message}>Accompagnement clôturé</Text>
          <Text style={styles.subMessage}>
            Le PMR a été pris en charge avec succès.
          </Text>
          <Text style={styles.redirectMessage}>
            Redirection vers l'accueil dans quelques secondes...
          </Text>
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#0a0e27",
    },
    card: {
      width: "100%",
      paddingVertical: 28,
      paddingHorizontal: 24,
      borderRadius: 20,
      backgroundColor: "#151b3a",
      borderWidth: 1,
      borderColor: "#2d3454",
      alignItems: "center",
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 6 },
      elevation: 5,
    },
    badge: {
      width: 96,
      height: 96,
      borderRadius: 48,
      backgroundColor: "#151b3a",
      borderWidth: 1,
      borderColor: "#2d3454",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 24,
    },
    badgeText: {
      fontSize: 36,
      color: "#F97316",
      fontWeight: "bold",
    },
    message: {
      fontSize: 24,
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: 12,
      color: "#f5f7fb",
    },
    subMessage: {
      fontSize: 16,
      textAlign: "center",
      color: "#c7d2e8",
      marginBottom: 12,
    },
    redirectMessage: {
      fontSize: 14,
      textAlign: "center",
      color: "#94a3b8",
    },
  });

export default EndAssistance;