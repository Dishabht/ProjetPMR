import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";

/**
 * Composant TransitionPage.
 * Affiche une animation de chargement avec un message pour informer l'utilisateur que sa réservation est en cours de chargement.
 *
 * @component
 * @example
 * return (
 *   <TransitionPage />
 * )
 *
 * @description
 * - Ce composant affiche une animation Lottie et un texte pour indiquer que le chargement est en cours.
 * - L'animation est en lecture automatique et en boucle.
 *
 * @returns {JSX.Element} Le composant TransitionPage.
 *
 * @see LottieView - Utilisé pour afficher une animation Lottie.
 */

export default function TransitionPage() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("../assets/transition3.json")} // Remplace par ton animation
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.text}>Chargement de votre réservation...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
  },
  animation: {
    width: 400,
    height: 400,
    resizeMode: "contain",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#5895D6",
  },
});
