/**
 * @file Billet.js
 * @description Composant pour afficher les détails d'un billet. Permet de naviguer vers la page des détails du billet.
 */

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
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
 * @typedef {Object} Ticket
 * @property {string} lieu_depart - Lieu de départ du billet.
 * @property {string} lieu_arrivee - Lieu d'arrivée du billet.
 * @property {string} heure_depart - Date et heure de départ au format ISO.
 * @property {string} heure_arrivee - Date et heure d'arrivée au format ISO.
 * @property {string} transport - Type de transport utilisé (SNCF, RATP, AirFrance, etc.).
 * @property {string} name - Nom de l'utilisateur associé au billet.
 * @property {string} surname - Prénom de l'utilisateur associé au billet.
 * @property {Object} companion - Informations sur l'accompagnateur (si présent).
 * @property {string} companion.name - Nom de l'accompagnateur.
 * @property {string} companion.surname - Prénom de l'accompagnateur.
 * @property {string} wheelchair - Type de fauteuil roulant demandé pour l'assistance.
 */

/**
 * Composant Billet.
 * Affiche les détails d'un billet avec les informations telles que le lieu de départ, d'arrivée, l'heure et d'autres informations spécifiques.
 * Permet de naviguer vers une page avec plus de détails sur le billet.
 *
 * @component
 * @example
 * const ticket = {
 *   lieu_depart: "Paris",
 *   lieu_arrivee: "Lyon",
 *   heure_depart: "2025-01-26T08:00:00Z",
 *   heure_arrivee: "2025-01-26T12:00:00Z",
 *   transport: "SNCF",
 *   name: "John",
 *   surname: "Doe",
 *   companion: { name: "Jane", surname: "Smith" },
 *   wheelchair: "RM",
 * };
 * return <Billet ticket={ticket} />;
 *
 * @param {Object} props - Propriétés du composant.
 * @param {Ticket} props.ticket - Détails du billet à afficher.
 *
 * @returns {JSX.Element} Le composant Billet.
 */

const Billet = ({ ticket }) => {
  console.log("Détails du ticket :", ticket);

  const navigation = useNavigation();
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  /**
   * Formate une chaîne de date ISO en une date et une heure lisibles.
   *
   * @param {string} isoString - Chaîne de date ISO.
   * @returns {{ date: string, time: string }} Un objet contenant la date et l'heure formatées.
   */

  const formatDateTime = (isoString) => {
    if (!isoString)
      return { date: "Date non spécifiée", time: "Heure non spécifiée" };

    const dateObj = new Date(isoString);
    const hours = dateObj.getHours().toString().padStart(2, "0");
    const minutes = dateObj.getMinutes().toString().padStart(2, "0");
    const day = dateObj.getDate().toString().padStart(2, "0");
    const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObj.getFullYear();

    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`,
    };
  };

  const departDateTime = formatDateTime(ticket?.heure_depart);
  const arriveeDateTime = formatDateTime(ticket?.heure_arrivee);

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity
        onPress={() => navigation.navigate("BilletDetails", { billet: ticket })}
        style={styles.ticketContainer}
      >
        <View style={styles.ticketHeader}>
          <Text style={styles.departArrivee}>
            {ticket.lieu_depart} {"\n"}à {"\n"}
            {ticket.lieu_arrivee}
          </Text>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Départ :</Text>
            <Text style={styles.time}>{departDateTime.time}</Text>
            <Text style={styles.date}>{departDateTime.date}</Text>
          </View>

          <View style={styles.timeContainer}>
            <Text style={styles.timeLabel}>Arrivée :</Text>
            <Text style={styles.time}>{arriveeDateTime.time}</Text>
            <Text style={styles.date}>{arriveeDateTime.date}</Text>
          </View>

          <Text style={styles.transportType}>
            {ticket.transport || "Transport non spécifié"}
          </Text>
        </View>

        <View style={styles.ticketBody}>
          <Text style={styles.ticketInfo}>
            {ticket.name} {ticket.surname}
          </Text>
          <Text style={styles.ticketInfo}>
            Accompagnateur :{" "}
            {ticket.companion
              ? `${ticket.companion.name || " "} ${
                  ticket.companion.surname || " "
                }`
              : "Aucun"}
          </Text>
          <Text style={styles.ticketInfo}>
            Type d'assistance : {ticket.wheelchair || "Aucun"}
          </Text>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/PMoveLogoSANSTITRE.png")}
              style={styles.logo}
            />
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    paddingBottom: 10,
  },
  scrollContent: {
    paddingBottom: 5,
  },
  ticketContainer: {
    backgroundColor: "#151b3a",
    padding: 15,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
    borderColor: "#2d3454",
    borderWidth: 1,
  },
  ticketHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  departArrivee: {
    fontFamily: "RalewayExtraBold",
    fontSize: 16,
    fontWeight: "bold",
    color: "#f5f7fb",
    flex: 2,
  },
  timeContainer: {
    alignItems: "center",
    flex: 1,
  },
  timeLabel: {
    fontFamily: "RalewayBold",
    fontSize: 12,
    fontWeight: "bold",
    color: "#c7d2e8",
    marginBottom: 3,
  },
  time: {
    fontFamily: "RalewayBold",
    fontSize: 18,
    fontWeight: "bold",
    color: "#f5f7fb",
  },
  date: {
    fontFamily: "RalewayBold",
    fontSize: 14,
    fontWeight: "bold",
    color: "#c7d2e8",
    marginTop: 5,
  },
  transportType: {
    fontFamily: "RalewayBlack",
    fontSize: 16,
    fontWeight: "bold",
    color: "#00d9ff",
    flex: 1,
    textAlign: "right",
  },
  ticketBody: {
    marginTop: 10,
  },
  ticketInfo: {
    fontFamily: "RalewayBold",
    fontSize: 14,
    color: "#f5f7fb",
    marginBottom: 5,
  },
  logoContainer: {
    position: "absolute",
    bottom: -20,
    right: -10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 10,
  },
});

export default Billet;
