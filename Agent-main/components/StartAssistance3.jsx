import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
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

export default function StartAssistance3({ navigation }) {
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

    if (!fontsLoaded) {
        return (
          <View style={styles.container}>
            <Text>Chargement en cours...</Text>
          </View>
        );
    }

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Vérification d'identité</Text>
          <Text style={styles.subtitle}>
            Avant de commencer l'accompagnement :
          </Text>


          <Text style={styles.note}>

          </Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("PhotoCapture")}
          >
            <Text style={styles.buttonText}>Commencer la vérification</Text>
          </TouchableOpacity>
        </View>
    );
}

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
      fontFamily: "RalewayBold",
      color: "#c7d2e8",
      marginBottom: 20,
      textAlign: "center",
    },
    stepsContainer: {
      marginBottom: 30,
      width: '100%',
      gap: 12,
    },
    stepCard: {
      paddingVertical: 8,
    },
    stepText: {
      fontSize: 16,
      fontFamily: "RalewayRegular",
      color: "#c7d2e8",
      flex: 1,
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
      color: "white", // Texte blanc pour le bouton
      fontFamily: "RalewayExtraBold",
      fontSize: 16,
      letterSpacing: 0.5,
    },
});