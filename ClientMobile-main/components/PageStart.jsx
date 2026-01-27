/**
 * @file PageStart.js
 * @description Page d'accueil animée avec logo, texte et boutons de navigation.
 */

import React, { useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  Text,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_100Thin,
  Raleway_200ExtraLight,
  Raleway_300Light,
  Raleway_400Regular,
  Raleway_500Medium,
  Raleway_600SemiBold,
  Raleway_700Bold,
  Raleway_800ExtraBold,
  Raleway_900Black,
} from "@expo-google-fonts/raleway";

/**
 * Composant PageStart.
 * Page d'accueil de l'application avec un logo animé, une phrase d'accroche et des boutons de navigation.
 *
 * @component
 * @example
 * return (
 *   <PageStart navigation={navigation} />
 * )
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.navigation - L'objet de navigation pour naviguer entre les écrans.
 *
 * @returns {JSX.Element} Le composant PageStart.
 */

export default function PageStart({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
  });

  useEffect(() => {
    const startZoomAnimation = () => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.3,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 2000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    startZoomAnimation();
  }, [scaleAnim]);

  return (
    <LinearGradient colors={["#0a0e27", "#151b3a"]} style={styles.gradient}>
      <View style={styles.container}>
        {/* Gros logo animé en haut */}
        <Animated.Image
          source={require("../assets/PMoveLogoSANSTITRE.png")}
          style={[styles.largeLogo, { transform: [{ scale: scaleAnim }] }]}
        />

        {/* Texte "Bienvenue sur PMove" */}
        <View style={styles.titleContainer}>
          <Text style={[styles.title]}>Bienvenue sur</Text>
            <Text style={[styles.title2]}>PMove</Text>
        </View>

        {/* Phrase d'accroche */}
        <Text style={styles.subtitle}>
          Simplifions vos trajets, réinventons l'accessibilité.
        </Text>

        {/* Boutons */}
        <TouchableOpacity
          style={styles.buttonSecondary}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextSecondary}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonPrimary}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.buttonTextPrimary}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  largeLogo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row", // Alignement horizontal entre le texte et "PMove"
    alignItems: "center", // Alignement vertical
    marginBottom: 20,
  },
  title: {
    fontFamily: "RalewayBold",
    fontSize: 26,
    fontWeight: "bold",
    color: "#f5f7fb",
    textAlign: "center",
    marginRight: 8,
  },
  title2: {
    fontFamily: "RalewayBold",
    fontSize: 26,
    fontWeight: "bold",
    color: "#00d9ff",
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "bold",
    fontSize: 15,
    color: "#c7d2e8",
    textAlign: "center",
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  buttonPrimary: {
    backgroundColor: "#0066ff",
    paddingVertical: 14,
    paddingHorizontal: 22,
    borderRadius: 12,
    width: "86%",
    alignItems: "center",
    marginTop: 12,
    shadowColor: "#0066ff",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  buttonTextPrimary: {
    fontFamily: "RalewayExtraBold",
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonSecondary: {
    borderColor: "#3385ff",
    borderWidth: 1,
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 22,
    width: "86%",
    alignItems: "center",
  },
  buttonTextSecondary: {
    fontFamily: "RalewayBold",
    color: "#f5f7fb",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e27",
  },
});
