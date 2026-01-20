/**
 * @file EditProfile.js
 * @description Ce fichier contient le composant EditProfile, qui permet à un utilisateur de modifier son profil.
 */

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Modal,
  Platform,
} from "react-native";
import { UserContext } from "../UserContext";
import { update as updateUser } from "../services/api";
import LottieView from "lottie-react-native";
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
 * Composant EditProfile.
 * Permet à l'utilisateur de modifier son profil en mettant à jour des informations comme le prénom, le nom, l'email, etc.
 *
 * @component
 * @example
 * return (
 *   <EditProfile />
 * )
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.navigation - L'objet de navigation pour permettre de revenir en arrière.
 *
 * @returns {JSX.Element} Le composant EditProfile.
 */

export default function EditProfile({ navigation }) {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState(user?.name || "");
  const [surname, setSurname] = useState(user?.surname || "");
  const [mail, setMail] = useState(user?.mail || "");
  const [num, setNum] = useState(user?.num || "");
  const [contact_num, setContactnum] = useState(user?.contact_num || "");
  const [birth, setBirth] = useState(user?.birth || "");
  const [handicap, setHandicap] = useState(user?.handicap || "");
  const [emergencyMail, setEmergencyMail] = useState(user?.contact_mail || "");
  const [isModalVisible, setIsModalVisible] = useState(false);

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
   * Met à jour les informations de l'utilisateur via l'API.
   * En cas de succès, met à jour le contexte utilisateur et retourne à la page précédente.
   *
   * @async
   * @function handleUpdate
   * @returns {Promise<void>}
   */

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ID_Client: user.ID_Client,
        name,
        surname,
        mail,
        num,
        contact_num,
        birth,
        handicap,
        contact_mail: emergencyMail,
      };

      const response = await updateUser(updatedData);

      if (response.success) {
        Alert.alert(
          "Succès",
          "Vos informations ont été mises à jour. Attention cependant à vos réservation qui ont gardez les anciennes informations"
        );
        setUser({ ...user, ...updatedData });
        navigation.goBack(); // Retourne à la page précédente après l'enregistrement
      } else {
        Alert.alert(
          "Erreur",
          response.message || "Impossible de mettre à jour vos informations."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors de la mise à jour.");
    }
  };

  /**
   * Formate une date en chaîne lisible en français.
   *
   * @function formatDateToFrench
   * @param {string} dateString - La date au format ISO.
   * @returns {string} La date formatée en français.
   */

  const formatDateToFrench = (dateString) => {
    if (!dateString) return "Non renseigné";
    const options = { year: "numeric", month: "long", day: "numeric" };
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("fr-FR", options).format(date);
    } catch (error) {
      console.error("Erreur lors du formatage de la date :", error);
      return "Non valide";
    }
  };

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <Text style={styles.header}>Modifier le profil</Text>

            <Text style={styles.label}>Prénom</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.label}>Nom</Text>
            <TextInput
              style={styles.input}
              value={surname}
              onChangeText={setSurname}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={mail}
              onChangeText={setMail}
              keyboardType="email-address"
            />

            <Text style={styles.label}>Téléphone</Text>
            <TextInput
              style={styles.input}
              value={num}
              onChangeText={setNum}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Contact d'urgence</Text>
            <TextInput
              style={styles.input}
              value={contact_num}
              onChangeText={setContactnum}
              keyboardType="phone-pad"
            />

            <Text style={styles.label}>Date de naissance</Text>
            <TextInput
              style={styles.input}
              value={formatDateToFrench(birth)}
              onChangeText={setBirth}
              placeholder="YY"
            />

            <Text style={styles.label}>Handicap</Text>
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => setIsModalVisible(true)}
            >
              <Text style={styles.selectButtonText}>
                {handicap || "Sélectionnez votre handicap"}
              </Text>
            </TouchableOpacity>

            <Modal
              visible={isModalVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => setIsModalVisible(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.modal}>
                  <Text style={styles.modalTitle}>
                    Sélectionnez un type de handicap
                  </Text>
                  {handicapOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.modalOption}
                      onPress={() => {
                        setHandicap(option.label);
                        setIsModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalOptionText}>{option.label}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    style={[
                      styles.modalOption,
                      { backgroundColor: "#e74c3c", color: "#fff" },
                    ]}
                    onPress={() => setIsModalVisible(false)}
                  >
                    <Text style={styles.modalOptionText}>Annuler</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <Text style={styles.label}>Email Contact d'urgence</Text>
            <TextInput
              style={styles.input}
              value={emergencyMail}
              onChangeText={setEmergencyMail}
              keyboardType="email-address"
            />

            <TouchableOpacity style={styles.saveButton} onPress={handleUpdate}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginHorizontal: 20,
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 80,
  },
  header: {
    fontFamily: "RalewayBlack",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#5895D6",
  },
  label: {
    fontFamily: "RalewayBold",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#436EA5",
  },
  input: {
    fontFamily: "RalewayRegular",
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: "#5489CE",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
  },
  selectButtonText: {
    fontFamily: "RalewayRegular",
    fontSize: 14,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#28a745",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 10,
  },
  modalTitle: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#5489CE",
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
  },
  modalOptionText: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#333",
  },
});
