/**
 * @file Inscription.js
 * @description Ce composant gère l'inscription des utilisateurs en collectant leurs informations personnelles via un formulaire.
 */

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ImageBackground,
  Modal,
} from "react-native";
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
import { useNavigation } from "@react-navigation/native";

/**
 * Composant Inscription.
 * Permet à un utilisateur de s'inscrire en remplissant un formulaire avec validation et options dynamiques.
 *
 * @component
 * @example
 * return (
 *   <Inscription navigation={navigation} />
 * )
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.navigation - L'objet de navigation pour permettre la navigation entre les écrans.
 *
 * @returns {JSX.Element} Le composant Inscription.
 */

const API_BASE_URL = "http://13.60.153.228:3000";

export default function Inscription({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    num: "",
    mail: "",
    handicap: "",
    civilite: "",
    birth: "",
    password: "",
    contact_mail: "",
    contact_num: "",
  });

  const [showDropdown, setShowDropdown] = useState(false);
  // État pour la checkbox
  const [isChecked, setIsChecked] = useState(false);

  // Gestion du clic sur la checkbox
  const handleCheckboxToggle = () => {
    setIsChecked(!isChecked);
  };

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  /**
   * Met à jour les données du formulaire en fonction de l'entrée utilisateur.
   *
   * @function handleChange
   * @param {string} name - Le nom du champ.
   * @param {string} value - La valeur saisie.
   */

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handicapOptions = [
    { label: "BLND : Malvoyant ou non voyant", value: "1" },
    { label: "DEAF : Malentendant ou sourd", value: "2" },
    {
      label: "DPNA : Déficience Intellectuelle ou comportementale",
      value: "3",
    },
    {
      label: "WCHR : Besoin de fauteuil roulant pour les déplacements",
      value: "4",
    },
    { label: "WCHS : Besoin d'aide pour tout déplacement", value: "5" },
    { label: "WCHC : Assistance complète nécessaire", value: "6" },
    { label: "MAAS : Assistance spécifique", value: "7" },
  ];

  /**
   * Gère l'envoi des données du formulaire d'inscription à l'API.
   *
   * @async
   * @function handleSubmit
   */

  const handleSubmit = async () => {
    console.log("Début de la méthode handleSubmit...");
    if (!isChecked) {
      Alert.alert(
        "Attention",
        "Vous devez accepter les conditions générales pour vous inscrire."
      );
      return; // Arrête l'exécution si la case n'est pas cochée
    }

    try {
      console.log("Envoi des données au serveur :", formData);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 5000); // Timeout après 5 secondes

      const response = await fetch(`${API_BASE_URL}/users/userAdd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        signal: controller.signal, // Associez le signal de timeout
      });

      clearTimeout(timeout); // Annulez le timeout si la requête réussit

      if (response.ok) {
        // Remise du `if (response.ok)`
        const result = await response.json();
        console.log("Réponse du serveur :", result);

        Alert.alert("Succès", "Utilisateur ajouté avec succès !");
        navigation.navigate("Inscription2");
      } else {
        console.error("Erreur côté serveur :", await response.text());
        Alert.alert("Erreur", "Une erreur est survenue lors de l'ajout.");
      }
    } catch (error) {
      if (error.name === "AbortError") {
        console.error("La requête a expiré !");
        Alert.alert("Erreur", "Le serveur a mis trop de temps à répondre.");
      } else {
        console.error("Erreur lors de la requête :", error);
        Alert.alert("Erreur", "Impossible de se connecter au serveur.");
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <ImageBackground
        source={require("../assets/Inscription.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>S'inscrire</Text>

      {/* Civilité */}
      <Text style={styles.label}>Civilité</Text>
      <View style={styles.radioGroup}>
        {["Mr", "Mme"].map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.radioOption}
            onPress={() => handleChange("civilite", option)}
          >
            <View
              style={[
                styles.radioCircle,
                formData.civilite === option && styles.radioSelected,
              ]}
            />
            <Text style={styles.radioText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Nom et Prénom */}
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Nom</Text>
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={formData.name}
            onChangeText={(value) => handleChange("name", value)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Prénom</Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={formData.surname}
            onChangeText={(value) => handleChange("surname", value)}
          />
        </View>
      </View>

      {/* Handicap et Date de naissance */}
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Handicap</Text>
          <TouchableOpacity
            style={[styles.input, styles.dropdown]}
            onPress={() => setShowDropdown(true)}
          >
            <Text style={styles.dropdownText}>
              {formData.handicap || "Sélectionner un handicap"}
            </Text>
          </TouchableOpacity>

          {/* Modal pour afficher les choix */}
          <Modal visible={showDropdown} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                {handicapOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.option}
                    onPress={() => {
                      handleChange("handicap", option.label);
                      setShowDropdown(false);
                    }}
                  >
                    <Text>{option.label}</Text>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setShowDropdown(false)}
                >
                  <Text style={styles.closeButtonText}>Fermer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Date anniversaire</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            value={formData.birth}
            onChangeText={(value) => handleChange("birth", value)}
          />
        </View>
      </View>

      {/* Champs Email et Numéro */}
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={formData.mail}
            onChangeText={(value) => handleChange("mail", value)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Numéro</Text>
          <TextInput
            style={styles.input}
            placeholder="Numéro"
            keyboardType="phone-pad"
            value={formData.num}
            onChangeText={(value) => handleChange("num", value)}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Contact Mail</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Mail"
            value={formData.contact_mail}
            onChangeText={(value) => handleChange("contact_mail", value)}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Contact Num</Text>
          <TextInput
            style={styles.input}
            placeholder="Contact Num"
            keyboardType="phone-pad"
            value={formData.contact_num}
            onChangeText={(value) => handleChange("contact_num", value)}
          />
        </View>
      </View>

      {/* Mot de passe */}
      <View style={styles.row}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Mot de passe</Text>
          <TextInput
            style={styles.input}
            placeholder="Mot de passe"
            secureTextEntry
            value={formData.password}
            onChangeText={(value) => handleChange("password", value)}
          />
        </View>
      </View>

      <View style={styles.inputWrapper}>
        <Text style={styles.label}>Note</Text>
        <TextInput
          style={styles.input}
          placeholder="Entrez une note (facultatif)"
          value={formData.note}
          onChangeText={(value) => handleChange("note", value)}
        />
      </View>

      {/* Conditions générales */}
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, isChecked && styles.checkedCheckbox]}
          onPress={handleCheckboxToggle}
        >
          {isChecked && <Text style={styles.checkboxCheck}>✔</Text>}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Confidentialité")}
        >
          <Text style={styles.linkText}>
            J'ai lu et j'accepte les Conditions générales
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bouton d'inscription */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>S'inscrire</Text>
      </TouchableOpacity>

      <View style={styles.signupLink}>
        <Text style={styles.signupText}>Déjà un compte ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.signupButtonText}>Connectez-vous !</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 550,
    height: 550,
    flex: 4,
    marginTop: 60,
    marginLeft: -70,
    position: "absolute",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    paddingHorizontal: 15,
    paddingVertical: 120,
  },
  title: {
    fontFamily: "RalewayExtraBold",
    fontWeight: "bold",
    fontSize: 42,
    color: "#5895D6",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  dropdown: {
    justifyContent: "center",
    paddingVertical: 10,
  },
  dropdownText: {
    color: "#555",
    opacity: 0.3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "red",
    fontWeight: "bold",
  },
  radioGroup: {
    flexDirection: "row",
    marginBottom: 15,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#5895D6",
    marginRight: 5,
  },
  radioSelected: {
    backgroundColor: "#5895D6",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  linkText: {
    fontFamily: "RalewayBlack",
    color: "#5895D6",
    textDecorationLine: "underline",
  },
  submitButton: {
    backgroundColor: "#5895D6",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  submitButtonText: {
    fontFamily: "RalewayBlack",
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupLink: {
    flexDirection: "row",
    marginTop: 20,
    marginLeft: 96,
  },
  signupText: {
    fontFamily: "RalewayBlack",
    fontSize: 14,
    color: "#555",
  },
  signupButtonText: {
    fontFamily: "RalewayBlack",
    fontSize: 14,
    color: "#5895D6",
    fontWeight: "bold",
    marginLeft: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  checkedCheckbox: {
    backgroundColor: "#5895D6",
    borderColor: "#5895D6",
  },
  checkboxCheck: {
    color: "#fff",
    fontWeight: "bold",
  },
});
