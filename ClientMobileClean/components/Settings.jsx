/**
 * @file Settings.js
 * @description Interface utilisateur permettant de configurer les paramètres de l'application, y compris le mode sombre, les notifications, la langue et d'autres options utilisateur.
 */

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
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
 * Composant principal Settings.
 * Fournit une interface utilisateur pour configurer différents paramètres liés à l'application et à l'utilisateur.
 *
 * @component
 * @example
 * <Settings onLogout={handleLogout} />
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Function} props.onLogout - Fonction appelée lorsque l'utilisateur se déconnecte.
 *
 * @returns {JSX.Element} Le composant Settings.
 *
 * @description
 * Fonctionnalités principales :
 * - **Mode sombre** : Permet à l'utilisateur d'activer ou de désactiver le mode sombre via un interrupteur.
 * - **Langue de l'application** : Propose un choix de langue parmi plusieurs options (Français, Anglais, Espagnol).
 * - **Notifications** : Permet d'activer ou de désactiver les notifications via un interrupteur.
 * - **Modifier le mot de passe** : L'utilisateur peut accéder à une option pour changer son mot de passe.
 * - **Modifier le profil** : Redirige vers une page où l'utilisateur peut éditer ses informations personnelles.
 * - **À propos de l'application** : Affiche des informations sur la version de l'application et la politique de confidentialité.
 * - **Support** : Fournit les coordonnées du support client.
 * - **Déconnexion** : Propose une alerte pour confirmer la déconnexion et redirige l'utilisateur vers l'écran de connexion.
 *
 * @see ThemeContext - Gère le mode sombre dans l'application.
 * @see UserContext - Gère l'état de l'utilisateur connecté.
 */

export default function Settings({ onLogout }) {
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  const [selectedLanguage, setSelectedLanguage] = useState("Français");
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [primaryColor, setPrimaryColor] = useState("#5489CE");

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  const handleLogout = () => {
    Alert.alert("Déconnexion", "Êtes-vous sûr de vouloir vous déconnecter ?", [
      { text: "Annuler", style: "cancel" },
      {
        text: "Oui",
        onPress: () => {
          setUser(null);
          onLogout();
          navigation.navigate("Login");
        },
      },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>
        {/* Titre */}
        <Text style={styles.title}>Paramètres</Text>

        {/* Langue */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() =>
            Alert.alert(
              "Changer de langue",
              null,
              [
                {
                  text: "Français",
                  onPress: () => setSelectedLanguage("Français"),
                },
                {
                  text: "Anglais",
                  onPress: () => setSelectedLanguage("Anglais"),
                },
                {
                  text: "Espagnol",
                  onPress: () => setSelectedLanguage("Espagnol"),
                },
              ],
              { cancelable: true }
            )
          }
        >
          <Icon name="globe" size={24} color="#f5f7fb" />
          <Text style={styles.optionText}>
            Langue ({selectedLanguage})
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <View style={styles.optionContainer}>
          <Icon name="bell" size={24} color="#f5f7fb" />
          <Text style={styles.optionText}>
            Notifications
          </Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? primaryColor : "#ccc"}
            trackColor={{ false: "#ccc", true: primaryColor }}
          />
        </View>

        {/* Modifier le mot de passe */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => Alert.alert("Modifier votre mot de passe")}
        >
          <Icon name="lock" size={24} color="#f5f7fb" />
          <Text style={styles.optionText}>
            Modifier le mot de passe
          </Text>
        </TouchableOpacity>

        {/* Modifier le profil */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Icon name="user-circle" size={24} color="#f5f7fb" />
          <Text style={styles.optionText}>
            Modifier le profil
          </Text>
        </TouchableOpacity>

        {/* À propos */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() =>
            Alert.alert(
              "À propos",
              "Version 1.0.0\nPolitique de confidentialité."
            )
          }
        >
          <Icon name="info-circle" size={24} color="#f5f7fb" />
          <Text style={styles.optionText}>
            À propos de l'application
          </Text>
        </TouchableOpacity>

        {/* Support */}
        <TouchableOpacity
          style={styles.optionContainer}
          onPress={() => Alert.alert("Contactez-nous à support@pmove.com")}
        >
          <Icon name="envelope" size={24} color="#f5f7fb" />
          <Text style={styles.optionText}>
            Support
          </Text>
        </TouchableOpacity>

        {/* Déconnexion */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Icon
            name="sign-out"
            size={24}
            color="#fff"
            style={styles.logoutIcon}
          />
          <Text style={styles.logoutButtonText}>Se déconnecter</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
    paddingBottom: 150,
    backgroundColor: "#0a0e27",
  },
  container: {
    paddingTop: 80,
    flex: 1,
    padding: 20,
    backgroundColor: "#0a0e27",
  },
  title: {
    fontFamily: "RalewayExtraBold",
    color: "#f5f7fb",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#151b3a",
    padding: 15,
    marginBottom: 15,
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2d3454",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  optionText: {
    fontFamily: "RalewayExtraBold",
    flex: 1,
    fontSize: 16,
    color: "#f5f7fb",
  },
  logoutButton: {
    backgroundColor: "#151b3a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
    gap: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#2d3454",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  logoutButtonText: {
    flex: 1,
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 16,
  },
  logoutIcon: {
    marginLeft: 5,
  },
});
