import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { addAccompagnateur } from "../services/api";

export default function Inscription2({ navigation }) {
  const [showAccompagnateurFields, setShowAccompagnateurFields] =
    useState(false);
  const [formData, setFormData] = useState({
    name_acc: "",
    surname_acc: "",
    num_acc: "",
    mail_acc: "",
  });

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      await addAccompagnateur(formData);
      Alert.alert("Succès", "Ajout de l'accompagnateur réussis !", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error) {
      Alert.alert("Erreur", error.message || "Impossible de se connecter au serveur.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Souhaitez-vous ajouter un accompagnateur ?
      </Text>

      {/* Boutons Oui / Non */}
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.choiceButton,
            showAccompagnateurFields ? styles.choiceButtonSelected : null,
          ]}
          onPress={() => setShowAccompagnateurFields(true)}
        >
          <Text style={styles.choiceButtonText}>Oui</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.choiceButton,
            !showAccompagnateurFields ? styles.choiceButtonSelected : null,
          ]}
          onPress={() => setShowAccompagnateurFields(false)}
        >
          <Text style={styles.choiceButtonText}>Non</Text>
        </TouchableOpacity>
      </View>

      {/* Champs supplémentaires (affichés uniquement si "Oui" est sélectionné) */}
      {showAccompagnateurFields && (
        <>
          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Nom"
                onChangeText={(value) => handleChange("name_acc", value)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Prénom"
                onChangeText={(value) => handleChange("surname_acc", value)}
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Adresse mail</Text>
              <TextInput
                style={styles.input}
                placeholder="Email"
                onChangeText={(value) => handleChange("mail_acc", value)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <Text style={styles.label}>Numéro</Text>
              <TextInput
                style={styles.input}
                placeholder="Numéro"
                onChangeText={(value) => handleChange("num_acc", value)}
              />
            </View>
          </View>
        </>
      )}

      {/* Bouton de soumission */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Créer le compte</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 50,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#007bff",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  choiceButton: {
    backgroundColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    width: 80,
    alignItems: "center",
  },
  choiceButtonSelected: {
    backgroundColor: "#007bff",
  },
  choiceButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  inputWrapper: {
    flex: 1,
    marginRight: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
