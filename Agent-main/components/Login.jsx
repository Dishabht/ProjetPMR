import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, Platform } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { FontAwesome as Icon } from "@expo/vector-icons";

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

const API_BASE = Platform.OS === 'android'
  ? 'http://10.0.2.2:3000'
  : Platform.OS === 'web'
    ? 'http://localhost:3000'
    : 'http://192.168.56.1:3000';
// Si téléphone physique: remplace par ton IPv4, ex: 'http://192.168.1.25:3000'

export default function Login({ navigation, onLoginSuccess }) {
  const [name, setName] = useState(""); // Stocker le nom d'utilisateur
  const [password, setPassword] = useState(""); // Stocker le mot de passe

  useFonts({
    RalewayThin: Raleway_100Thin,
    RalewayExtraLight: Raleway_200ExtraLight,
    RalewayLight: Raleway_300Light,
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewaySemiBold: Raleway_600SemiBold,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  useEffect(() => {
    // Charger les infos de l'utilisateur depuis AsyncStorage
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const { name, password, agentId, affiliation } = JSON.parse(userData); // Inclure affiliation
          setName(name); // Pré remplir le nom
          setPassword(password); // Pré remplir le mot de passe
          // setStayLoggedIn(true); // Cocher "rester connecté"
          console.log("Nom :", name, "Mot de passe :", password, "Affiliation :", affiliation);
        } else {
          const agentIdData = await AsyncStorage.getItem('agentId');
          if (agentIdData) {
            const { agentId } = JSON.parse(agentIdData);
            console.log("Loaded agentId:", agentId); // Afficher l'ID de l'agent dans les logs
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données utilisateur :", error);
      }
    };
  
    loadUserData();
  }, []);

  const handleLoginDirect = async () => {
    try {
      const agentId = 999;
      await AsyncStorage.setItem('agentId', JSON.stringify({ agentId }));
      await AsyncStorage.setItem('user', JSON.stringify({ name: name || "agenttest", password: password || "password123", agentId, surname: "Test", affiliation: "Test" }));
      onLoginSuccess();
      navigation.replace("Home");
    } catch (error) {
      console.error("Erreur lors de la connexion directe :", error.message);
      Alert.alert("Erreur", "Impossible de se connecter en mode test.");
    }
  };
  

  const handleForgotPassword = () => {
    Alert.alert(
      "Mot de passe oublié ?",
      "Veuillez vous diriger vers PMove Support pour récupérer votre mot de passe lié à votre ID Agent."
    ); // Pop-up adaptatif
  };

  return (
    <View style={styles.container}>
      {/* Logo au-dessus du formulaire */}
      <Image
        source={require("../assets/PMoveLogoSANSTITRE.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Bienvenue</Text>
      <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur"
          value={name}
          onChangeText={setName}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <View style={styles.checkboxSection}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
          </TouchableOpacity>
        </View>
        </View>

        {/* Bouton de connexion */}
        <View>
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLoginDirect}>
          <Text style={styles.buttonTextPrimary}>Se connecter</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF6F1", // Fond de la page
    padding: 20,
    justifyContent: "center", // Centrer verticalement
    alignItems: "center", // Centrer horizontalement
  },
  logo: {
    width: 500, // Taille de l'image
    height: 300, // Taille de l'image
    marginBottom: -70, // Marge en bas
  },
  title: {
    fontSize: 27,
    fontFamily: "RalewayBold",
    color: "#EF4D20", // Couleur du titre
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    fontFamily: "RalewayRegular",
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: 16,
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#EF4D20", // Bordure des champs
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#000", // Texte des champs
    borderRadius: 8,
  },
  checkboxSection: {
    flexDirection: "column", // Alignement horizontal
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 6,
  },
  label: {
    fontSize: 16,
    color: "#FF000",
    flex: 1,
    flexWrap: "wrap",
  },
  forgotPassword: {
    fontSize: 14,
    color: "#FF000", // Couleur du texte
    textDecorationLine: "underline",
    marginTop: 10,
  },
  buttonPrimary: {
    backgroundColor: "#EF4D20", // Couleur du bouton
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonTextPrimary: {
    color: "#FFFFFF", // Couleur du texte du bouton
    fontFamily: "RalewayBold",
    fontSize: 16,
  },
  error: {
    color: "#EF4D20",
    textAlign: "center",
    marginBottom: 16,
  },
});