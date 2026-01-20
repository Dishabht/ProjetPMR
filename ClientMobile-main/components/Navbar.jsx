/**
 * @file NavBar.js
 * @description Barre de navigation animée pour naviguer entre les différents écrans.
 */

import React, { useState, useRef } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
 * Composant NavBar.
 * Barre de navigation personnalisée avec un effet animé pour indiquer la sélection active.
 * Chaque bouton de navigation est animé lorsqu'il est sélectionné.
 *
 * @component
 * @example
 * return (
 *   <NavBar />
 * )
 *
 * @returns {JSX.Element} La barre de navigation animée.
 */
const NavBar = () => {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0); // Commence par Home
  const screenWidth = Dimensions.get("window").width;

  // Animation pour déplacer le rond
  const position = useRef(new Animated.Value(activeIndex)).current;

  // Création dynamique des animations pour chaque bouton
  const animationRefs = Array(4)
    .fill(null)
    .map(() => ({
      scaleIcon: useRef(new Animated.Value(1)).current,
      translateYIcon: useRef(new Animated.Value(0)).current,
      scaleText: useRef(new Animated.Value(1)).current,
      translateYText: useRef(new Animated.Value(0)).current,
    }));

  /**
   * Gère la navigation entre les écrans et l'animation des boutons.
   *
   * @param {number} index - L'index de l'élément sélectionné.
   * @param {string} route - Le nom de la route à naviguer.
   */
  const handleNavigation = (index, route) => {
    setActiveIndex(index);

    // Animation du déplacement du rond
    Animated.timing(position, {
      toValue: index,
      duration: 300,
      useNativeDriver: false,
    }).start();

    // Animation des boutons
    animationRefs.forEach((ref, i) => {
      const isActive = i === index;

      // Icône
      Animated.timing(ref.scaleIcon, {
        toValue: isActive ? 1.5 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(ref.translateYIcon, {
        toValue: isActive ? -10 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();

      // Texte
      Animated.timing(ref.scaleText, {
        toValue: isActive ? 1.2 : 1,
        duration: 300,
        useNativeDriver: false,
      }).start();
      Animated.timing(ref.translateYText, {
        toValue: isActive ? -5 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    });

    navigation.navigate(route);
  };

  // Calcul précis de la position des icônes
  const translateX = position.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [
      screenWidth * 0.06, // Position Home
      screenWidth * 0.278, // Position Réserver
      screenWidth * 0.5, // Position Profile
      screenWidth * 0.72, // Position Settings
    ],
  });

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        {/* Rond central animé */}
        <Animated.View
          style={[styles.centralIndicator, { transform: [{ translateX }] }]}
        />

        {[
          { name: "home", label: "Accueil", route: "Accueil" },
          { name: "plus-circle", label: "Réserver", route: "Reservation" },
          { name: "user-circle", label: "Profile", route: "Profile" },
          { name: "cogs", label: "Paramètres", route: "Settings" },
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navButton}
            onPress={() => handleNavigation(index, item.route)}
          >
            <Animated.View
              style={{
                transform: [
                  { scale: animationRefs[index].scaleIcon },
                  { translateY: animationRefs[index].translateYIcon },
                ],
              }}
            >
              <Icon
                name={item.name}
                size={24}
                color={activeIndex === index ? "#fff" : "#ccc"}
              />
            </Animated.View>
            <Animated.Text
              style={[
                styles.navText,
                activeIndex === index && styles.activeText,
                {
                  transform: [
                    { scale: animationRefs[index].scaleText },
                    { translateY: animationRefs[index].translateYText },
                  ],
                },
              ]}
            >
              {item.label}
            </Animated.Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navbarContainer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#5489CE",
    paddingHorizontal: 15,
    height: 70,
    borderRadius: 25,
    width: "95%",
  },
  centralIndicator: {
    position: "absolute",
    bottom: 16,
    width: 75,
    height: 75,
    borderRadius: 60,
    backgroundColor: "#5489CE",
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontFamily: "RalewayBlack",
    marginTop: 10,
    color: "#ccc",
    fontSize: 12,
  },
  activeText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default NavBar;
