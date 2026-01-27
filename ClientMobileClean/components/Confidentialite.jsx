/**
 * @file Confidentialite.js
 * @description Composant affichant la politique de confidentialité de l'application PMove.
 */

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/**
 * Composant Confidentialite.
 * Ce composant présente la politique de confidentialité de l'application PMove, incluant les sections sur la collecte de données, leur utilisation, la sécurité, et les droits des utilisateurs.
 *
 * @component
 * @example
 * return (
 *   <Confidentialite />
 * )
 *
 * @returns {JSX.Element} Le composant Confidentialite.
 */

export default function Confidentialite() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Politique de confidentialité</Text>

      <Text style={styles.sectionTitle}>1. Introduction</Text>
      <Text style={styles.text}>
        Bienvenue sur Pmove. Nous accordons une grande importance à la
        protection de vos données personnelles et à votre vie privée. Cette
        politique de confidentialité décrit les types de données que nous
        collectons, la manière dont nous les utilisons, et les mesures que nous
        prenons pour les protéger.
      </Text>

      <Text style={styles.sectionTitle}>2. Données Collectées</Text>
      <Text style={styles.text}>
        Lors de l'utilisation de notre application, nous pouvons collecter les
        données suivantes :
      </Text>
      <Text style={styles.listItem}>
        - Informations personnelles : nom, prénom, date de naissance, adresse
        e-mail, numéro de téléphone.
      </Text>
      <Text style={styles.listItem}>
        - Informations de connexion : identifiants de compte, mots de passe.
      </Text>
      <Text style={styles.listItem}>
        - Données de localisation : géolocalisation en temps réel pour fournir
        des services basés sur votre position.
      </Text>
      <Text style={styles.listItem}>
        - Données d'utilisation : informations sur la manière dont vous utilisez
        l'application, y compris les interactions et préférences.
      </Text>
      <Text style={styles.listItem}>
        - Données techniques : type d'appareil, système d'exploitation,
        identifiants uniques de l'appareil, adresse IP.
      </Text>

      <Text style={styles.sectionTitle}>3. Utilisation des Données</Text>
      <Text style={styles.text}>
        Les données collectées sont utilisées pour :
      </Text>
      <Text style={styles.listItem}>- Fournir et améliorer nos services.</Text>
      <Text style={styles.listItem}>
        - Personnaliser votre expérience utilisateur.
      </Text>
      <Text style={styles.listItem}>
        - Assurer la sécurité et la sûreté de l'application.
      </Text>
      <Text style={styles.listItem}>
        - Communiquer avec vous concernant des mises à jour, des offres
        spéciales ou des informations liées aux services.
      </Text>
      <Text style={styles.listItem}>
        - Analyser l'utilisation de l'application pour des fins statistiques.
      </Text>

      <Text style={styles.sectionTitle}>4. Partage des Données</Text>
      <Text style={styles.text}>
        Nous ne vendons pas vos données personnelles à des tiers. Cependant,
        nous pouvons partager vos informations avec :
      </Text>
      <Text style={styles.listItem}>
        - Prestataires de services : tiers qui fournissent des services en notre
        nom, tels que l'hébergement, l'analyse de données, le traitement des
        paiements.
      </Text>
      <Text style={styles.listItem}>
        - Obligations légales : si la loi l'exige, ou pour protéger nos droits
        légaux.
      </Text>

      <Text style={styles.sectionTitle}>5. Sécurité des Données</Text>
      <Text style={styles.text}>
        Nous mettons en œuvre des mesures de sécurité appropriées pour protéger
        vos données contre tout accès non autorisé, altération, divulgation ou
        destruction. Cependant, aucune méthode de transmission sur Internet ou
        de stockage électronique n'est totalement sécurisée.
      </Text>

      <Text style={styles.sectionTitle}>6. Vos Droits</Text>
      <Text style={styles.text}>
        Conformément à la législation en vigueur, vous disposez des droits
        suivants concernant vos données personnelles :
      </Text>
      <Text style={styles.listItem}>
        - Accès : droit d'obtenir la confirmation que vos données sont traitées
        et d'y accéder.
      </Text>
      <Text style={styles.listItem}>
        - Rectification : droit de demander la correction de données inexactes
        ou incomplètes.
      </Text>
      <Text style={styles.listItem}>
        - Suppression : droit de demander la suppression de vos données, sous
        certaines conditions.
      </Text>
      <Text style={styles.listItem}>
        - Opposition : droit de vous opposer au traitement de vos données pour
        des motifs légitimes.
      </Text>
      <Text style={styles.listItem}>
        - Portabilité : droit de recevoir vos données dans un format structuré
        et couramment utilisé.
      </Text>

      <Text style={styles.sectionTitle}>7. Modifications de la Politique</Text>
      <Text style={styles.text}>
        Nous pouvons mettre à jour cette politique de confidentialité de temps à
        autre. Nous vous informerons de tout changement en publiant la nouvelle
        politique sur cette page.
      </Text>

      <Text style={styles.sectionTitle}>8. Contact</Text>
      <Text style={styles.text}>
        Si vous avez des questions ou des préoccupations concernant cette
        politique de confidentialité, veuillez nous contacter à :
      </Text>
      <Text style={styles.text}>PMove</Text>
      <Text style={styles.text}>93000 Bobigny, France</Text>
      <Text style={styles.text}>pmove213@gmail.com</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "#0a0e27",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#f5f7fb",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
    color: "#c7d2e8",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: "#f5f7fb",
  },
  listItem: {
    fontSize: 16,
    marginBottom: 5,
    paddingLeft: 20,
    lineHeight: 24,
    color: "#f5f7fb",
  },
});
