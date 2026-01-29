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

  const navItems = [
    { name: "home", label: "Accueil", route: "Accueil" },
    { name: "plus-circle", label: "Réserver", route: "Reservation" },
    { name: "credit-card", label: "Wallet", route: "Wallet", isWallet: true },
    { name: "user-circle", label: "Profile", route: "Profile" },
    { name: "cogs", label: "Paramètres", route: "Settings" },
  ];

  // Création dynamique des animations pour chaque bouton
  const animationRefs = Array(navItems.length)
    .fill(null)
    .map(() => ({
      scaleIcon: useRef(new Animated.Value(1)).current,
      translateYIcon: useRef(new Animated.Value(0)).current,
      scaleText: useRef(new Animated.Value(1)).current,
      translateYText: useRef(new Animated.Value(0)).current,
    }));
  const handleNavigation = (index, route) => {
    setActiveIndex(index);

    // Animation des boutons
    animationRefs.forEach((ref, i) => {
      const isActive = i === index;

      // Icône
      Animated.timing(ref.scaleIcon, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(ref.translateYIcon, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();

      // Texte
      Animated.timing(ref.scaleText, {
        toValue: 1,
        duration: 0,
        useNativeDriver: false,
      }).start();
      Animated.timing(ref.translateYText, {
        toValue: 0,
        duration: 0,
        useNativeDriver: false,
      }).start();
    });

    navigation.navigate(route);
  };

  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    RalewayBlack: Raleway_900Black,
  });

  return (
    <View style={styles.navbarContainer}>
      <View style={styles.navbar}>
        {navItems.map((item, index) => (
          <TouchableOpacity
            key={item.route}
            style={[styles.navButton, item.isWallet && styles.walletButton]}
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
                color={activeIndex === index ? "#0066ff" : "#c7d2e8"}
              />
            </Animated.View>
            <Animated.Text
              style={[
                styles.navText,
                activeIndex === index && styles.activeText,
                item.isWallet && styles.walletText,
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
    bottom: 8,
    left: 0,
    right: 0,
    width: "100%",
    alignItems: "center",
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#151b3a",
    paddingHorizontal: 0,
    height: 70,
    borderRadius: 0,
    width: "100%",
    borderTopWidth: 1,
    borderTopColor: "#2d3454",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  walletButton: {
    marginTop: 0,
  },
  navText: {
    fontFamily: "RalewayBlack",
    marginTop: 10,
    color: "#c7d2e8",
    fontSize: 12,
  },
  walletText: {
    marginTop: 8,
  },
  activeText: {
    color: "#0066ff",
    fontWeight: "bold",
  },
});

export default NavBar;
