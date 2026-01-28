import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from "react-native";
import { useNavigation } from "@react-navigation/native";

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

export default function StartAssistance2({ navigation, route }) {
  const qrData = route?.params?.qrData;

  // Animation pour le bouton
  const buttonScale = new Animated.Value(1);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
    ]).start();
  };

  if (!qrData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Erreur : Réservation et données du QR code introuvables !</Text>
      </View>
    );
  }

  // Charger la police Raleway
  const [fontsLoaded] = useFonts({
    Raleway_100Thin,
    Raleway_200ExtraLight,
    Raleway_300Light,
    RalewayRegular: Raleway_400Regular,
    Raleway_500Medium,
    Raleway_600SemiBold,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  // Si les polices ne sont pas encore chargées, afficher un écran de chargement
  if (!fontsLoaded) {
    return (
      <View style={styles.container}>
        <Text>Chargement des polices...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Passage au scan du QR Code Bagage</Text>
      <Text style={styles.subtitle}>
        Demandez maintenant au PMR de vous montrer son ou ses bagages ainsi que son ou leurs QR codes dédiés.
      </Text>

        {/* Bouton animé */}
      <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            animateButton();
            navigation.navigate("ScannerQRCodeBagage");
          }}
        >
            <Text style={styles.buttonText}>Vérification</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

// Styles
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
    color: "#F97316", // Couleur orange pour le titre
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#c7d2e8", // Couleur gris clair pour le sous-titre
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#F97316", // Couleur orange pour le bouton
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    elevation: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});