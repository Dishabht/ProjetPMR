/**
 * @file Profile.js
 * @bref Composant affichant les informations de l'utilisateur, un QR Code généré dynamiquement, et une mise en page claire et élégante.
 */

import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { UserContext } from "../UserContext";
import QRCode from "react-native-qrcode-svg";
import { ScrollView } from "react-native-gesture-handler";

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
 * Composant Profile.
 * Affiche les informations personnelles de l'utilisateur et un QR Code contenant ses données.
 *
 * @component
 * @example
 * return (
 *   <Profile />
 * )
 *
 * @returns {JSX.Element} Le composant Profile.
 */

export default function Profile() {
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  const { user } = useContext(UserContext);

  /**
   * Formate une chaîne de date en une date lisible en français.
   *
   * @param {string} dateString - La chaîne de date à formater.
   * @returns {string} La date formatée en français ou un message d'erreur si la date n'est pas valide.
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

  return (
    <ScrollView contentContainerStyle={styles.scrollcontent}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Mon espace PMOVE</Text>
        </View>

        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image
            source={require("../assets/PMoveLogoSANSTITRE.png")}
            style={styles.profileImage}
          />
          <Text style={styles.profileName}>
            {user?.name || "Non renseigné"} {user?.surname || "Non renseigné"}
          </Text>
        </View>

        {/* Information Section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Informations personnelles</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email :</Text>
            <Text style={styles.infoValue}>
              {user?.mail || "Non renseigné"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Téléphone :</Text>
            <Text style={styles.infoValue}>{user?.num || "Non renseigné"}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Date de naissance :</Text>
            <Text style={styles.infoValue}>
              {formatDateToFrench(user?.birth) || "Non renseigné"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Handicap :</Text>
            <Text style={styles.infoValue}>
              {user?.handicap || "Non renseigné"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Contact d'urgence :</Text>
            <Text style={styles.infoValue}>
              {user?.contact_num || "Non renseigné"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email Contact d'urgence :</Text>
            <Text style={styles.infoValue}>
              {user?.contact_mail || "Non renseigné"}
            </Text>
          </View>
        </View>

        {/* QR Code Section */}
        <View style={styles.qrCodeSection}>
          <Text style={styles.infoTitle}>Votre QR Code Client</Text>
          <QRCode
            value={`https://pmrsae5.github.io/PageQRCode/client.html?name=${encodeURIComponent(
              user?.name || "Non renseigné"
            )}&surname=${encodeURIComponent(
              user?.surname || "Non renseigné"
            )}&mail=${encodeURIComponent(
              user?.mail || "Non renseigné"
            )}&num=${encodeURIComponent(
              user?.num || "Non renseigné"
            )}&handicap=${encodeURIComponent(
              user?.handicap || "Non renseigné"
            )}&birth=${encodeURIComponent(
              user?.birth || "Non renseigné"
            )}&contact_mail=${encodeURIComponent(
              user?.contact_mail || "Non renseigné"
            )}&contactnum=${encodeURIComponent(
              user?.contact_num || "Non renseigné"
            )}`}
            size={200}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollcontent: {
    flexGrow: 1,
    paddingBottom: 120,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 70,
  },
  header: {
    marginBottom: 20,
  },
  headerText: {
    fontFamily: "RalewayBlack",
    fontSize: 24,
    fontWeight: "bold",
    color: "#5895D6",
    textAlign: "center",
  },
  profileSection: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontFamily: "RalewayBold",
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  infoSection: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  infoTitle: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#5895D6",
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center", // Aligne les éléments sur une même ligne
    marginBottom: 15,
  },
  infoLabel: {
    fontFamily: "RalewayBold",
    fontSize: 14,
    fontWeight: "bold",
    color: "#555",
  },
  infoValue: {
    fontFamily: "RalewayRegular",
    marginLeft: 5,
    fontSize: 14,
    color: "#333",
    flex: 2, // Permet à la valeur d'être bien alignée avec le label
  },
  qrCodeSection: {
    alignItems: "center",
    marginTop: 20,
  },
});
