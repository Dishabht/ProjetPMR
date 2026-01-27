/**
 * @file Connexion.js
 * @description Ce fichier contient le composant Connexion, utilisé pour permettre à un utilisateur de se connecter à l'application. Il offre également des options pour la connexion via des réseaux sociaux.
 */

import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { login } from "../services/api";
import { UserContext } from "../UserContext";
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
 * Composant Connexion.
 * Permet à un utilisateur de se connecter à l'application avec des champs pour l'email et le mot de passe.
 * Offre également des options de connexion via des réseaux sociaux.
 * Après une connexion réussie, redirige vers la page d'accueil ou exécute une fonction de callback.
 *
 * @component
 * @example
 * return (
 *   <Connexion navigation={navigation} onLoginSuccess={onLoginSuccess} />
 * )
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.navigation - L'objet de navigation pour naviguer entre les écrans.
 * @param {Function} [props.onLoginSuccess] - Fonction appelée après une connexion réussie.
 *
 * @returns {JSX.Element} Le composant de connexion.
 */

export default function Connexion({ navigation, onLoginSuccess }) {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  /**
   * Gère la tentative de connexion de l'utilisateur.
   * Vérifie les champs, interroge l'API pour valider les informations et met à jour le contexte utilisateur en cas de succès.
   *
   * @async
   * @function handleLogin
   * @returns {Promise<void>}
   */

  const handleLogin = async () => {
    console.log("Début de la méthode handleLogin.");

    if (!mail || !password) {
      Alert.alert("Erreur", "Veuillez remplir tous les champs.");
      return;
    }

    try {
      console.log("Envoi des données au serveur :", { mail, password });

      const result = await login(mail, password);
      console.log("Résultat brut de l'API :", result);

      if (!result.user) {
        console.log("Réponse API sans utilisateur :", result);
        throw new Error(result.error || "Données utilisateur non disponibles.");
      }

      // Met à jour le contexte utilisateur
      setUser(result.user);
      console.log("Utilisateur trouvé :", result.user);
      console.log("Utilisateur mis à jour dans le contexte :", result.user);

      // Succès
      Alert.alert("Succès", `Bienvenue, ${result.user.name || "Utilisateur"}!`);

      // Appelle onLoginSuccess si défini
      if (onLoginSuccess) {
        console.log("Appel de onLoginSuccess...");
        onLoginSuccess();
      }

      console.log("Redirection vers la page Accueil...");
      navigation.navigate("Accueil"); // Navigue vers "Accueil"
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      Alert.alert("Erreur", error.message || "Échec de la connexion.");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/BackLogin.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Connexion</Text>
      {/* Ajout de l'image */}

      <View style={styles.form}>
        <Text style={styles.label}>Adresse mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#8892b0"
          keyboardType="email-address"
          value={mail}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Mot de passe</Text>
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#8892b0"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Mot de passe oublié */}
        <TouchableOpacity onPress={() => alert("Mot de passe oublié")}>
          <Text style={styles.forgotPassword}>Mot de passe oublié ?</Text>
        </TouchableOpacity>

        {/* Bouton Connexion */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonPrimaryText}>Se connecter</Text>
        </TouchableOpacity>
      </View>

      {/* Ouverture sociale */}
      <Text style={styles.socialText}>ou connectez-vous avec</Text>

      {/* Boutons sociaux */}
      <View style={styles.socialButtons}>
        {/* Google */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="google"
            size={24}
            color="red"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Continuer avec Google</Text>
        </TouchableOpacity>

        {/* Facebook */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="facebook"
            size={24}
            color="blue"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Continuer avec Facebook</Text>
        </TouchableOpacity>

        {/* Twitter */}
        <TouchableOpacity style={styles.socialButton}>
          <FontAwesome
            name="twitter"
            size={24}
            color="blue"
            style={styles.icon}
          />
          <Text style={styles.socialButtonText}>Continuer avec Twitter</Text>
        </TouchableOpacity>
      </View>

      {/* Lien vers Inscription */}
      <View style={styles.signupLink}>
        <Text style={styles.signupText}>Vous n'avez pas de compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.signupButtonText}>S'inscrire</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  logo: {
    width: 400,
    height: 400,
    flex: 1,
    resizeMode: "contain",
  },
  container: {
    marginTop: 120,
    backgroundColor: "#0a0e27",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 30,
  },
  title: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "bold",
    fontSize: 40,
    color: "#0066ff",
    marginBottom: 40,
  },
  form: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "black",
    fontSize: 14,
    color: "#c7d2e8",
    marginBottom: 8,
  },
  input: {
    width: "100%",
    backgroundColor: "#151b3a",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#2d3454",
    marginBottom: 16,
    color: "#f5f7fb",
  },
  forgotPassword: {
    fontFamily: "RalewayBlack",
    fontSize: 13,
    color: "#ff6b35",
    textAlign: "right",
    marginBottom: 20,
  },
  buttonPrimary: {
    backgroundColor: "#0066ff",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#0066ff",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  buttonPrimaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  socialText: {
    fontFamily: "RalewayExtraBold",
    fontSize: 14,
    color: "#c7d2e8",
    marginBottom: 16,
    marginTop: 36,
  },
  socialButtons: {
    width: "100%",
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1f3a",
    borderColor: "#2d3454",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  socialButtonText: {
    fontFamily: "RalewayBlack",
    fontSize: 14,
    marginLeft: 10,
    color: "#f5f7fb",
  },
  icon: {
    marginRight: 8,
  },
  signupLink: {
    flexDirection: "row",
    marginTop: 20,
  },
  signupText: {
    fontFamily: "RalewayBlack",
    fontSize: 13,
    color: "#c7d2e8",
  },
  signupButtonText: {
    fontFamily: "RalewayBlack",
    fontSize: 13,
    color: "#00d9ff",
    fontWeight: "bold",
    marginLeft: 4,
  },
});
