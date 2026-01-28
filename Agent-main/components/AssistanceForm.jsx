import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons"; // Pour les icônes

const AssistanceForm = () => {
  const navigation = useNavigation();

  // États pour le formulaire
  const [isLuggageDeposited, setIsLuggageDeposited] = useState(false); // Bagages déposés
  const [isPmrSeated, setIsPmrSeated] = useState(false); // PMR installé
  const [hasSpecificNeeds, setHasSpecificNeeds] = useState(null); // Besoins spécifiques
  const [specificNeeds, setSpecificNeeds] = useState(""); // Détails des besoins spécifiques
  const [isStaffInformed, setIsStaffInformed] = useState(false); // Personnel informé
  const [isFeedbackPositive, setIsFeedbackPositive] = useState(null); // Feedback positif ou négatif
  const [feedbackDetails, setFeedbackDetails] = useState(""); // Détails du feedback
  const [errors, setErrors] = useState({}); // Erreurs de validation

  const errorAnim = new Animated.Value(0); // Animation pour les erreurs

  // Fonction pour valider les champs obligatoires
  const validateFields = () => {
    const newErrors = {};

    if (!isLuggageDeposited)
      newErrors.isLuggageDeposited = "Champ obligatoire";
    if (!isPmrSeated)
      newErrors.isPmrSeated = "Champ obligatoire";
    if (hasSpecificNeeds === null)
      newErrors.hasSpecificNeeds = "Champ obligatoire";
    if (hasSpecificNeeds === true && !specificNeeds.trim())
      newErrors.specificNeeds = "Champ obligatoire";
    if (hasSpecificNeeds === true && !isStaffInformed)
      newErrors.isStaffInformed = "Champ obligatoire";
    if (isFeedbackPositive === null)
      newErrors.isFeedbackPositive = "Champ obligatoire";

    setErrors(newErrors);

    // Animation des erreurs
    if (Object.keys(newErrors).length > 0) {
      Animated.sequence([
        Animated.timing(errorAnim, { toValue: 1, duration: 200, useNativeDriver: true }),
        Animated.timing(errorAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      ]).start();
    }

    return Object.keys(newErrors).length === 0; // Retourne true si aucune erreur
  };

  // Fonction pour soumettre le formulaire
  const handleSubmit = () => {
    if (validateFields()) {
      const formData = {
        isLuggageDeposited,
        isPmrSeated,
        hasSpecificNeeds,
        specificNeeds,
        isStaffInformed,
        isFeedbackPositive,
        feedbackDetails,
      };

      console.log("Données du formulaire :", formData);

      // Redirection vers la page EndAssistance
      navigation.navigate("EndAssistance");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Clôturer l'accompagnement</Text>

      {/* Section : Validation de l'accompagnement */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Validation de l'accompagnement</Text>

        {/* Champ : Bagages déposés */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsLuggageDeposited(!isLuggageDeposited)}
        >
          <MaterialIcons
            name={isLuggageDeposited ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isLuggageDeposited ? "#F97316" : "#94a3b8"}
          />
          <Text style={styles.checkboxLabel}>Les bagages ont été déposés aux emplacements prévus.</Text>
        </TouchableOpacity>
        {errors.isLuggageDeposited && (
          <Animated.Text style={[styles.errorText, { opacity: errorAnim }]}>
            {errors.isLuggageDeposited}
          </Animated.Text>
        )}

        {/* Champ : PMR installé */}
        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setIsPmrSeated(!isPmrSeated)}
        >
          <MaterialIcons
            name={isPmrSeated ? "check-box" : "check-box-outline-blank"}
            size={24}
            color={isPmrSeated ? "#F97316" : "#94a3b8"}
          />
          <Text style={styles.checkboxLabel}>Le PMR a été accompagné jusqu'à sa place.</Text>
        </TouchableOpacity>
        {errors.isPmrSeated && (
          <Animated.Text style={[styles.errorText, { opacity: errorAnim }]}>
            {errors.isPmrSeated}
          </Animated.Text>
        )}
      </View>

      {/* Section : Besoins spécifiques */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Besoins spécifiques</Text>

        {/* Champ : Besoins spécifiques */}
        <Text style={styles.label}>Le PMR avait-il des besoins spécifiques ?</Text>
        <View style={styles.yesNoContainer}>
          <TouchableOpacity
            style={[styles.yesNoButton, hasSpecificNeeds === true && styles.selectedButton]}
            onPress={() => setHasSpecificNeeds(true)}
          >
            <Text style={styles.yesNoText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.yesNoButton, hasSpecificNeeds === false && styles.selectedButton]}
            onPress={() => setHasSpecificNeeds(false)}
          >
            <Text style={styles.yesNoText}>Non</Text>
          </TouchableOpacity>
        </View>
        {errors.hasSpecificNeeds && <Text style={styles.errorText}>{errors.hasSpecificNeeds}</Text>}

        {/* Champ : Détails des besoins spécifiques */}
        {hasSpecificNeeds === true && (
          <>
            <Text style={styles.label}>Détails des besoins spécifiques :</Text>
            <TextInput
              style={[styles.input, errors.specificNeeds && styles.errorInput]}
              value={specificNeeds}
              onChangeText={setSpecificNeeds}
              multiline
              placeholder="Décrivez les besoins spécifiques..."
              placeholderTextColor="#A5A5A5"
            />
            {errors.specificNeeds && <Text style={styles.errorText}>{errors.specificNeeds}</Text>}

            {/* Champ : Personnel informé */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, isStaffInformed && styles.checked]}
                onPress={() => setIsStaffInformed(!isStaffInformed)}
              />
              <Text style={styles.checkboxLabel}>Le personnel a été informé des besoins spécifiques.</Text>
            </View>
            {errors.isStaffInformed && <Text style={styles.errorText}>{errors.isStaffInformed}</Text>}
          </>
        )}
      </View>

      {/* Section : Feedback */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Feedback</Text>

        {/* Champ : Feedback positif ou négatif */}
        <Text style={styles.label}>L'accompagnement s'est-il bien déroulé ?</Text>
        <View style={styles.yesNoContainer}>
          <TouchableOpacity
            style={[styles.yesNoButton, isFeedbackPositive === true && styles.selectedButton]}
            onPress={() => setIsFeedbackPositive(true)}
          >
            <Text style={styles.yesNoText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.yesNoButton, isFeedbackPositive === false && styles.selectedButton]}
            onPress={() => setIsFeedbackPositive(false)}
          >
            <Text style={styles.yesNoText}>Non</Text>
          </TouchableOpacity>
        </View>
        {errors.isFeedbackPositive && <Text style={styles.errorText}>{errors.isFeedbackPositive}</Text>}

        {/* Champ : Détails du feedback */}
        {isFeedbackPositive === false && (
          <>
            <Text style={styles.label}>Détails du feedback :</Text>
            <TextInput
              style={[styles.input, errors.feedbackDetails && styles.errorInput]}
              value={feedbackDetails}
              onChangeText={setFeedbackDetails}
              multiline
              placeholder="Décrivez les problèmes rencontrés..."
              placeholderTextColor="#A5A5A5"
            />
            {errors.feedbackDetails && <Text style={styles.errorText}>{errors.feedbackDetails}</Text>}
          </>
        )}
      </View>

      {/* Bouton de soumission */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Clôturer l'accompagnement</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e27",
    padding: 24,
    paddingTop: 60, // Pour éviter que le formulaire soit caché par la navbar
  },
  title: {
    fontSize: 26,
    fontFamily: "RalewayExtraBold",
    color: "#f5f7fb",
    marginBottom: 16,
    textAlign: "center",
  },
  section: {
    width: "100%",
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "RalewayBold",
    color: "#f5f7fb",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "RalewayRegular",
    color: "#c7d2e8",
    marginBottom: 8,
  },
  checkboxLabel: {
    fontSize: 16,
    fontFamily: "RalewayRegular",
    color: "#c7d2e8",
    marginLeft: 12,
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    backgroundColor: "#151b3a",
    borderWidth: 1,
    borderColor: "#2d3454",
    padding: 12,
    borderRadius: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#2d3454",
    borderRadius: 4,
    marginRight: 10,
    backgroundColor: "#0f1535",
  },
  checked: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  yesNoContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  yesNoButton: {
    backgroundColor: "#151b3a",
    borderWidth: 1,
    borderColor: "#2d3454",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedButton: {
    backgroundColor: "#F97316",
    borderColor: "#F97316",
  },
  yesNoText: {
    color: "#f5f7fb",
    fontFamily: "RalewayBold",
    fontSize: 16,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#2d3454",
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: "#0f1535",
    fontFamily: "RalewayRegular",
    fontSize: 16,
    color: "#f5f7fb",
  },
  errorInput: {
    borderColor: "#f87171",
  },
  errorText: {
    color: "#f87171",
    fontSize: 14,
    fontFamily: "RalewayRegular",
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: "#F97316",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
  },
});

export default AssistanceForm;