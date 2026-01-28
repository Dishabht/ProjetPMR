/**
 * @file BilletDetails.js
 * @description Composant affichant les détails complets d'un billet, y compris les informations de réservation, les bagages associés, et un QR Code.
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import { deleteReservationFromRedis } from "../services/api";
import { useNavigation } from "@react-navigation/native";
import Billet from "../components/Billet";
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
 * @typedef {Object} Bagage
 * @property {string} weight - Poids du bagage.
 * @property {string} description - Description du bagage.
 */

/**
 * @typedef {Object} Companion
 * @property {string} name - Nom de l'accompagnateur.
 * @property {string} surname - Prénom de l'accompagnateur.
 * @property {string} phone - Numéro de téléphone de l'accompagnateur.
 * @property {string} email - Adresse email de l'accompagnateur.
 */

/**
 * @typedef {Object} Billet
 * @property {string} num_reservation - Numéro unique de la réservation.
 * @property {string} lieu_depart - Lieu de départ du voyage.
 * @property {string} lieu_arrivee - Lieu d'arrivée du voyage.
 * @property {string} heure_depart - Heure de départ au format ISO.
 * @property {string} heure_arrivee - Heure d'arrivée au format ISO.
 * @property {string} wheelchair - Type de fauteuil roulant demandé.
 * @property {string} additionalInfo - Informations supplémentaires.
 * @property {number} numBags - Nombre de bagages associés à la réservation.
 * @property {boolean} hasCompanion - Indique si un accompagnateur est présent.
 * @property {Companion} companion - Informations sur l'accompagnateur.
 * @property {Bagage[]} bagages - Liste des bagages associés.
 */

/**
 * Composant BilletDetails.
 * Ce composant affiche les détails d'un billet de réservation, y compris les informations sur le voyage, les bagages et l'accompagnateur.
 * Il permet également de supprimer la réservation via un appel API.
 *
 * @component
 * @example
 * const billet = {
 *   num_reservation: "101",
 *   lieu_depart: "Paris",
 *   lieu_arrivee: "Lyon",
 *   heure_depart: "2025-01-26T08:00:00Z",
 *   heure_arrivee: "2025-01-26T12:00:00Z",
 *   wheelchair: "RM",
 *   additionalInfo: "Besoin d'assistance spéciale.",
 *   numBags: 2,
 *   hasCompanion: true,
 *   companion: { name: "John", surname: "Doe", phone: "1234567890", email: "john.doe@example.com" },
 *   bagages: [
 *     { weight: "12", description: "Valise rouge" },
 *     { weight: "8", description: "Sac à dos noir" },
 *   ],
 * };
 * return <BilletDetails billet={billet} />;
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Object} props.route - L'objet de navigation contenant les paramètres de la route.
 * @param {Billet} props.route.params.billet - Les détails du billet.
 *
 * @returns {JSX.Element} Le composant BilletDetails.
 */

const BilletDetails = ({ route }) => {
  const billet = route?.params?.billet;
  const navigation = useNavigation();

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayMedium: Raleway_500Medium,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  if (!billet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Impossible de charger les détails du billet.
        </Text>
      </View>
    );
  }

  const qrData = `https://pmrsae5.github.io/PageQRCode/?nom=${encodeURIComponent(
    billet.name || "Non renseigné"
  )}&prenom=${encodeURIComponent(
    billet.surname || "Non renseigné"
  )}&reservation=${encodeURIComponent(
    billet.num_reservation || "Non renseigné"
  )}&depart=${encodeURIComponent(
    billet.lieu_depart || "Non renseigné"
  )}&arrivee=${encodeURIComponent(
    billet.lieu_arrivee || "Non renseigné"
  )}&bagages=${encodeURIComponent(billet.numBags || "0")}`;

  /**
   * Gère la suppression d'une réservation en appelant une API.
   */

  const handleDeleteReservation = async () => {
    Alert.alert(
      "Confirmation",
      "Voulez-vous vraiment supprimer cette réservation ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              const response = await deleteReservationFromRedis(
                billet.num_reservation
              );

              Alert.alert(
                "Succès",
                response.message ||
                  "La réservation a été supprimée avec succès."
              );
              navigation.navigate("Accueil");
            } catch (error) {
              Alert.alert(
                "Erreur",
                error.message ||
                  "Une erreur est survenue lors de la suppression."
              );
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Détails du Billet</Text>
      <Billet ticket={billet} />

      {/* Détails de la réservation */}
      <View style={styles.detailContainer}>
        {/* Affichage des informations deux par deux */}
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Numéro de Réservation :</Text>
            <Text style={styles.value}>{billet.num_reservation}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Lieu de Départ :</Text>
            <Text style={styles.value}>{billet.lieu_depart}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Lieu d'Arrivée :</Text>
            <Text style={styles.value}>{billet.lieu_arrivee}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Heure de Départ :</Text>
            <Text style={styles.value}>
              {new Date(billet.heure_depart).toLocaleString()}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Heure d'Arrivée :</Text>
            <Text style={styles.value}>
              {new Date(billet.heure_arrivee).toLocaleString()}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Type de Fauteuil Roulant :</Text>
            <Text style={styles.value}>{billet.wheelchair || "Aucun"}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Informations Supplémentaires :</Text>
            <Text style={styles.value}>
              {billet.additionalInfo || "Non spécifié"}
            </Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Nombre de Bagages :</Text>
            <Text style={styles.value}>{billet.numBags || "0"}</Text>
          </View>
        </View>

        {/* Informations accompagnateur */}
        <Text style={styles.label}>Accompagnateur :</Text>
        {billet.hasCompanion ? (
          <View style={styles.companionContainer}>
            <Text style={styles.value}>Nom : {billet.companion.name}</Text>
            <Text style={styles.value}>
              Prénom : {billet.companion.surname}
            </Text>
            <Text style={styles.value}>
              Téléphone : {billet.companion.phone}
            </Text>
            <Text style={styles.value}>Email : {billet.companion.email}</Text>
          </View>
        ) : (
          <Text style={styles.value}>Pas d'accompagnateur</Text>
        )}

        {/* Détails des bagages */}
        <Text style={styles.label}>Bagages :</Text>
        {billet.bagages && billet.bagages.length > 0 ? (
          billet.bagages.map((bagage, index) => (
            <View key={index} style={styles.bagageContainer}>
              <Text style={styles.bagageTitle}>Bagage {index + 1}</Text>
              <View style={styles.bagageDetails}>
                <View style={styles.bagageInfo}>
                  <Text style={styles.bagageLabel}>Poids :</Text>
                  <Text style={styles.bagageValue}>{bagage.weight} kg</Text>

                  <Text style={styles.bagageLabel}>Description :</Text>
                  <Text style={styles.bagageValue}>{bagage.description}</Text>
                </View>

                <View style={styles.qrCodeContainer}>
                  <QRCode
                    value={`https://pmrsae5.github.io/PageQRCode/BagageDetails.html?poids=${encodeURIComponent(
                      bagage.weight
                    )}&description=${encodeURIComponent(bagage.description)}`}
                    size={100}
                  />
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.value}>Aucun bagage associé.</Text>
        )}
      </View>

      <View style={styles.qrContainer}>
        <Text style={styles.qrLabel}>QR Code de la Réservation :</Text>
        <QRCode value={qrData} size={200} />
      </View>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={handleDeleteReservation}
      >
        <Text style={styles.deleteButtonText}>Supprimer la Réservation</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 90,
    flexGrow: 1,
    padding: 20,
    paddingBottom: 200,
    backgroundColor: "#0a0e27",
  },
  title: {
    fontFamily: "RalewayBlack",
    fontSize: 24,
    fontWeight: "bold",
    color: "#f5f7fb",
    marginBottom: 20,
    textAlign: "center",
  },
  detailContainer: {
    alignSelf: "stretch",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
    backgroundColor: "#151b3a",
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  column: {
    flex: 1,
    marginRight: 10,
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    fontWeight: "bold",
    color: "#c7d2e8",
    marginBottom: 5,
  },
  value: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#f5f7fb",
    marginBottom: 10,
  },
  companionContainer: {
    backgroundColor: "#0f1535",
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  bagageContainer: {
    marginBottom: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: "#2d3454",
    borderRadius: 10,
    backgroundColor: "#151b3a",
  },
  bagageTitle: {
    fontFamily: "RalewayBlack",
    fontSize: 20,
    color: "#f5f7fb",
    marginBottom: 10,
  },
  bagageDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bagageInfo: {
    flex: 1,
  },
  bagageLabel: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    fontWeight: "bold",
    color: "#c7d2e8",
    marginBottom: 4,
  },
  bagageValue: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#f5f7fb",
    marginBottom: 10,
  },
  qrCodeContainer: {
    marginLeft: 10,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#fff",
    padding: 6,
    borderRadius: 8,
  },
  qrContainer: {
    alignItems: "center",

    alignSelf: "stretch",
  },
  qrLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#c7d2e8",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "100%",
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0a0e27",
  },
  errorText: {
    fontSize: 18,
    color: "#f87171",
    fontWeight: "bold",
  },
});

export default BilletDetails;
