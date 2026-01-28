import React, { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

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
      <ActivityIndicator size="large" color="#0066ff" />
      <Text style={styles.text}>Chargement de votre réservation...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e27",
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
    color: "#c7d2e8",
  },
});
