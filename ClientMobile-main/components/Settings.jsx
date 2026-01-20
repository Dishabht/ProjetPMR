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
import { ThemeContext } from "../ThemeContext";
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
import LottieView from "lottie-react-native";

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
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
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
      <View style={[styles.container, isDarkMode && styles.containerDark]}>
        {/* Titre */}
        <Text style={[styles.title, isDarkMode && styles.titleDark]}>
          Paramètres
        </Text>
        <LottieView
          source={require("../assets/settings.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200, alignSelf: "center" }}
        />

        {/* Mode sombre */}
        <View
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
        >
          <Icon name="moon-o" size={24} color={isDarkMode ? "#fff" : "#333"} />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
            Mode sombre
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? primaryColor : "#ccc"}
            trackColor={{ false: "#ccc", true: primaryColor }}
          />
        </View>

        {/* Langue */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
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
          <Icon name="globe" size={24} color={isDarkMode ? "#fff" : "#333"} />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
            Langue ({selectedLanguage})
          </Text>
        </TouchableOpacity>

        {/* Notifications */}
        <View
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
        >
          <Icon name="bell" size={24} color={isDarkMode ? "#fff" : "#333"} />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
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
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
          onPress={() => Alert.alert("Modifier votre mot de passe")}
        >
          <Icon name="lock" size={24} color={isDarkMode ? "#fff" : "#333"} />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
            Modifier le mot de passe
          </Text>
        </TouchableOpacity>

        {/* Modifier le profil */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Icon
            name="user-circle"
            size={24}
            color={isDarkMode ? "#fff" : "#333"}
          />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
            Modifier le profil
          </Text>
        </TouchableOpacity>

        {/* À propos */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
          onPress={() =>
            Alert.alert(
              "À propos",
              "Version 1.0.0\nPolitique de confidentialité."
            )
          }
        >
          <Icon
            name="info-circle"
            size={24}
            color={isDarkMode ? "#fff" : "#333"}
          />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
            À propos de l'application
          </Text>
        </TouchableOpacity>

        {/* Support */}
        <TouchableOpacity
          style={[
            styles.optionContainer,
            isDarkMode && styles.optionContainerDark,
          ]}
          onPress={() => Alert.alert("Contactez-nous à support@pmove.com")}
        >
          <Icon
            name="envelope"
            size={24}
            color={isDarkMode ? "#fff" : "#333"}
          />
          <Text
            style={[styles.optionText, isDarkMode && styles.optionTextDark]}
          >
            Support
          </Text>
        </TouchableOpacity>

        {/* Déconnexion */}
        <TouchableOpacity
          style={[styles.logoutButton, isDarkMode && styles.logoutButtonDark]}
          onPress={handleLogout}
        >
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
  },
  container: {
    paddingTop: 80,
    flex: 1,

    padding: 20,
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  title: {
    fontFamily: "RalewayExtraBold",
    color: "#5489CE",
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  titleDark: {
    color: "#fff",
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    gap: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionContainerDark: {
    backgroundColor: "#1e1e1e",
  },
  optionText: {
    fontFamily: "RalewayExtraBold",
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  optionTextDark: {
    color: "#fff",
  },
  logoutButton: {
    backgroundColor: "#e53935",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 15,
    gap: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  logoutButtonDark: {
    backgroundColor: "#8b0000",
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
