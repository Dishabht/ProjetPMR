/**
 * @file Reservation3.js
 * @description Composant pour afficher un résumé détaillé de la réservation de l'utilisateur, y compris les informations personnelles, les détails de la réservation et des QR codes générés dynamiquement.
 */

import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";
import TransitionPage from "./TransitionPage";
import { addBilletToRedis } from "../services/api";

/**
 * Composant principal Reservation3.
 * Affiche un résumé détaillé de la réservation de l'utilisateur, comprenant :
 * - Les informations personnelles issues du contexte utilisateur.
 * - Les détails du billet, y compris le numéro de réservation, les lieux de départ et d'arrivée.
 * - Les détails supplémentaires comme le nombre de bagages, les notes additionnelles, et l'utilisation de fauteuils roulants.
 * - Les informations d'un éventuel accompagnateur.
 * - Génère des QR codes pour la réservation et pour chaque bagage.
 * - Permet à l'utilisateur de confirmer la réservation et d'envoyer les données à une base de données Redis.
 *
 * @component
 * @example
 * <Reservation3 route={route} navigation={navigation} />
 *
 * @param {Object} props - Les propriétés du composant.
 * @param {Object} props.route - Contient les données de navigation, notamment les informations du billet.
 * @param {Object} props.navigation - L'objet de navigation pour naviguer entre les écrans.
 *
 * @returns {JSX.Element} Le composant Reservation3.
 *
 * @description
 * Fonctionnalités principales :
 * - Affiche un résumé des informations utilisateur issues du contexte.
 * - Affiche les détails de la réservation, y compris le billet, les bagages et l'accompagnateur.
 * - Génère un QR code global pour la réservation, ainsi que des QR codes pour chaque bagage.
 * - Envoie les données de la réservation à un serveur Redis via une API.
 * - Gère les erreurs (données manquantes) avec une interface utilisateur adaptée.
 * - Simule une transition avec un écran de chargement (TransitionPage) avant d'afficher le contenu principal.
 */

const Reservation3 = ({ route, navigation }) => {
  const [loading, setLoading] = useState(true);
  const { billet } = route.params || {};
  const { user } = useContext(UserContext);

  /**
   * Effet useEffect.
   * Simule une période de transition de 5 secondes avant d'afficher le contenu principal.
   *
   * @function
   * @returns {void}
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Bascule sur le contenu après 5 secondes
    }, 5000);

    return () => clearTimeout(timer); // Nettoie le timer au démontage
  }, []);

  if (loading) {
    // Affiche la page de transition si loading est true
    return <TransitionPage />;
  }

  if (!billet) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erreur : Données manquantes.</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  console.log("=== Données reçues dans Reservation3 ===");
  console.log("Billet :", billet);

  console.log("Utilisateur :", user);

  /**
   * Données pour le QR code global.
   * Contient les informations principales de la réservation, y compris les informations utilisateur,
   * les détails du billet, le nombre de bagages, et les options liées au fauteuil roulant.
   *
   * @constant
   * @type {string}
   */
  const qrData = `https://pmrsae5.github.io/PageQRCode/?nom=${encodeURIComponent(
    user?.name || "Non renseigné"
  )}&prenom=${encodeURIComponent(
    user?.surname || "Non renseigné"
  )}&reservation=${encodeURIComponent(
    billet?.num_reservation || "Non renseigné"
  )}&depart=${encodeURIComponent(
    billet?.lieu_depart || "Non renseigné"
  )}&arrivee=${encodeURIComponent(
    billet?.lieu_arrivee || "Non renseigné"
  )}&bagages=${encodeURIComponent(
    billet?.numBags || "0"
  )}&fauteuilRoulant=${encodeURIComponent(
    Object.keys(billet?.wheelchair || {})
      .filter((key) => billet?.wheelchair[key])
      .join(", ") || "Non"
  )}`;

  /**
   * Fonction handleConfirm.
   * Envoie les données de la réservation (billet, utilisateur, etc.) à un serveur Redis via une API.
   * Confirme la réservation et redirige l'utilisateur vers l'écran de confirmation.
   * Affiche un message d'erreur en cas de problème avec l'envoi des données.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */

  const handleConfirm = async () => {
    try {
      const response = await addBilletToRedis(
        {
          ...billet,
          bagages: billet.bagages || [],
        },
        user?.mail
      );

      if (response?.success) {
        Alert.alert("Succès", "Données envoyées à Redis et email envoyé !");
        navigation.navigate("Confirmation");
      } else {
        Alert.alert("Erreur", response?.message || "Une erreur est survenue.");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      Alert.alert(
        "Erreur",
        error?.message ||
          "Impossible d'envoyer les données ou l'email. Veuillez réessayer."
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Résumé de votre Réservation</Text>
        <Text style={styles.titlesection}>Profile </Text>
        <View style={styles.section}>
          <Text style={styles.label}>Nom :</Text>
          <Text style={styles.value}>{user?.name || "Non renseigné"}</Text>
          <Text style={styles.label}>Prénom :</Text>
          <Text style={styles.value}>{user?.surname || "Non renseigné"}</Text>
          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.value}>{user?.num || "Non renseigné"}</Text>
          <Text style={styles.label}>Prénom :</Text>
          <Text style={styles.value}>{user?.mail || "Non renseigné"}</Text>
        </View>
        <Text style={styles.titlesection}>Détails de la réservation</Text>
        {/* Détails du billet */}
        <View style={styles.section}>
          <Text style={styles.label}>Numéro de Réservation :</Text>
          <Text style={styles.value}>{billet.num_reservation}</Text>
          <Text style={styles.label}>Lieu de Départ :</Text>
          <Text style={styles.value}>{billet.lieu_depart}</Text>
          <Text style={styles.label}>Lieu d'Arrivée :</Text>
          <Text style={styles.value}>{billet.lieu_arrivee}</Text>
        </View>

        {/* Détails supplémentaires */}
        <Text style={styles.titlesection}>Détails supplémentaires</Text>
        <View style={styles.section}>
          <Text style={styles.value}>
            Nombre de Bagages : {billet.numBags || "Non spécifié"}
          </Text>
          <Text style={styles.value}>
            Type de fauteuil roulant : {billet.wheelchair || "Non spécifié"}
          </Text>
          <Text style={styles.value}>
            Prise de notes : {billet.additionalInfo || "Non spécifié"}
          </Text>
        </View>
        <Text style={styles.titlesection}>Données de l'accompagnateur</Text>
        <View style={styles.section}>
          <Text style={styles.label}>
            {billet.hasCompanion
              ? "Voici votre accompagnateur "
              : "Pas d'accompagnateur pour votre réservation"}
          </Text>
          {billet.hasCompanion && (
            <>
              <Text style={styles.value}>
                Nom : {billet.companion?.name || "Non renseigné"}
              </Text>
              <Text style={styles.value}>
                Prénom : {billet.companion?.surname || "Non renseigné"}
              </Text>
              <Text style={styles.value}>
                Téléphone : {billet.companion?.phone || "Non renseigné"}
              </Text>
              <Text style={styles.value}>
                Email : {billet.companion?.email || "Non renseigné"}
              </Text>
            </>
          )}
        </View>

        {/* Détails des bagages */}
        {billet.bagages && billet.bagages.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Bagages :</Text>
            {billet.bagages.map((bagage, index) => (
              <View key={index} style={styles.bagageContainer}>
                <View style={styles.bagageRow}>
                  {/* Infos du bagage à gauche */}
                  <View style={styles.bagageInfoContainer}>
                    <Text style={styles.bagageTitle}>Bagage {index + 1}</Text>
                    <Text style={styles.bagageLabel}>ID :</Text>
                    <Text style={styles.bagageValue}>{bagage.id_bagage}</Text>
                    <Text style={styles.bagageLabel}>Poids :</Text>
                    <Text style={styles.bagageValue}>{bagage.weight} kg</Text>
                    <Text style={styles.bagageLabel}>Description :</Text>
                    <Text style={styles.bagageValue}>{bagage.description}</Text>
                  </View>
                  {/* QR Code à droite */}
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
            ))}
          </View>
        )}
        <View style={styles.qrSection}>
          <Text style={styles.label}>QR Code :</Text>
          <QRCode value={qrData} size={200} />
        </View>

        {/* Bouton pour confirmer */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmButtonText}>Confirmer la Réservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 200, // Ajout d'espace en bas pour garantir que le dernier contenu est visible
    backgroundColor: "#0a0e27",
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#0a0e27",
  },
  title: {
    fontFamily: "RalewayBlack",
    fontSize: 30,
    color: "#f5f7fb",
    textAlign: "center",
    marginBottom: 20,
  },
  titlesection: {
    fontFamily: "RalewayBlack",
    fontSize: 20,
    color: "#00d9ff",
    marginBottom: 10,
  },
  section: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    backgroundColor: "#151b3a",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  label: {
    fontFamily: "RalewayExtraBold",
    fontSize: 18,
    color: "#c7d2e8",
    marginBottom: 10,
  },
  value: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#f5f7fb",
    marginBottom: 10,
  },
  bagageContainer: {
    backgroundColor: "#151b3a",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  bagageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bagageInfoContainer: {
    flex: 2,
    paddingRight: 10, // Espacement entre les infos et le QR Code
  },
  qrCodeContainer: {
    flex: 1,
    alignItems: "center",
  },
  bagageTitle: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    color: "#00d9ff",
    marginBottom: 10,
  },
  bagageLabel: {
    fontFamily: "RalewayBold",
    fontSize: 16,
    color: "#c7d2e8",
    marginBottom: 5,
  },
  bagageValue: {
    fontFamily: "RalewayMedium",
    fontSize: 16,
    color: "#f5f7fb",
    marginBottom: 10,
  },

  qrSection: {
    alignItems: "center",
    marginTop: 10,
  },
  qrLabel: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    color: "#00d9ff",
    marginBottom: 8,
  },
  confirmButton: {
    backgroundColor: "#0066ff",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  confirmButtonText: {
    fontFamily: "RalewayExtraBold",
    color: "#fff",
    fontSize: 18,
    textTransform: "uppercase",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "#0066ff",
    fontFamily: "RalewayBold",
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    backgroundColor: "#151b3a",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  backButtonText: {
    color: "#fff",
    fontFamily: "RalewayBold",
    textAlign: "center",
    fontSize: 16,
  },
});

export default Reservation3;
