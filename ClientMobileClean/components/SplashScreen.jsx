import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Composant SplashScreen.
 * Affiche une animation d'écran de chargement avant de naviguer vers la page principale de l'application.
 *
 * @component
 * @example
 * return (
 *   <SplashScreen />
 * )
 *
 * @description
 * - L'écran affiche une image principale et un logo tournant en boucle.
 * - L'image principale s'affiche avec une animation de fondu au bout de 2 secondes.
 * - Le logo tourne en continu grâce à une animation.
 * - Après 5 secondes, l'utilisateur est redirigé vers la page "PageStart".
 *
 * @returns {JSX.Element} Le composant SplashScreen.
 *
 * @see useNavigation - Utilisé pour naviguer automatiquement après un temps de chargement.
 */

export default function SplashScreen() {
  const navigation = useNavigation();

  // Références pour l'animation
  const rotateValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation de rotation
    Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();

    // Animation d'apparition de l'image principale après 2 secondes
    setTimeout(() => {
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1500, // 1.5 secondes pour que l'image devienne visible
        useNativeDriver: true,
      }).start();
    }, 2000);

    // Simuler un temps de chargement, puis naviguer vers la page principale
    const timer = setTimeout(() => {
      navigation.replace("PageStart"); // Naviguez vers la page suivante
    }, 5000); // 5 secondes

    return () => clearTimeout(timer);
  }, [rotateValue, fadeValue, navigation]);

  const rotateInterpolation = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {/* Image principale */}
      <Animated.Image
        source={require("../assets/PMoveLogoAvecStyleSansLogo.png")} // Chemin vers l'image principale
        style={[styles.backgroundImage, { opacity: fadeValue }]}
        resizeMode="contain"
      />

      {/* Logo tournant */}
      <Animated.Image
        source={require("../assets/PMoveLogoAvecStyle.png")} // Chemin vers le logo
        style={[styles.logo, { transform: [{ rotate: rotateInterpolation }] }]}
        resizeMode="contain"
      />
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
  backgroundImage: {
    width: 300,
    height: 300,
    position: "absolute", // Position absolue pour superposition
  },
  logo: {
    width: 90,
    height: 90,
    position: "absolute", // Superpose le logo sur l'image
  },
});
