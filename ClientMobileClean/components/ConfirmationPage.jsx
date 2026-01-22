/**
 * @file ConfirmationPage.js
 * @description Ce fichier contient le composant ConfirmationPage, utilisé pour afficher une animation de confirmation et rediriger l'utilisateur vers la page d'accueil après un délai.
 */

import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Composant ConfirmationPage.
 * Ce composant affiche une animation confirmant la réussite d'une action (par exemple, la confirmation d'un billet).
 * Une fois l'animation terminée, l'utilisateur est automatiquement redirigé vers la page d'accueil après 5 secondes.
 *
 * @component
 * @example
 * return (
 *   <ConfirmationPage />
 * )
 *
 * @returns {JSX.Element} Le composant ConfirmationPage.
 */

const ConfirmationPage = () => {
  const navigation = useNavigation();
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Accueil"); // Remplacez "Accueil" par le nom de votre page d'accueil
    }, 5000);

    return () => clearTimeout(timer); // Nettoyage du timer
  }, [navigation]);

  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/plane.json")} // Remplace par ton animation
        autoPlay
        loop={false}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.message}>Votre billet a bien été confirmé !</Text>
      <Text style={styles.subMessage}>
        Vous allez être redirigé vers l'accueil dans quelques secondes...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  message: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  subMessage: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

export default ConfirmationPage;
