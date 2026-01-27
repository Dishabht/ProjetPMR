import React, { useState, useRef } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Animated, Easing } from "react-native";
import { FontAwesome as Icon } from "@expo/vector-icons";
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

export default function NavBar() {
  const navigation = useNavigation();
  const [activeIndex, setActiveIndex] = useState(0);

  const animationRefs = [
    {
      scaleIcon: useRef(new Animated.Value(1)).current,
      translateYIcon: useRef(new Animated.Value(0)).current,
    },
    {
      scaleIcon: useRef(new Animated.Value(1)).current,
      translateYIcon: useRef(new Animated.Value(0)).current,
    },
  ];

  const handleNavigation = (index, route) => {
    setActiveIndex(index);

    // Animation désactivée (garder uniquement le changement de couleur)
    animationRefs.forEach((ref) => {
      Animated.timing(ref.scaleIcon, {
        toValue: 1,
        duration: 0,
        useNativeDriver: true,
      }).start();
    });

    navigation.navigate(route);
  };

  // Charger les polices
  useFonts({
    RalewayRegular: Raleway_400Regular,
    RalewayBold: Raleway_700Bold,
    RalewayExtraBold: Raleway_800ExtraBold,
    Raleway_600SemiBold: Raleway_600SemiBold,
    RalewayBlack: Raleway_900Black,
  });

  return (
    <View style={styles.navbarContainer}>
      {/* Bouton Home */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleNavigation(0, "Home")}
      >
        <Animated.View
          style={{
            transform: [
              { scale: animationRefs[0].scaleIcon },
              { translateY: animationRefs[0].translateYIcon },
            ],
          }}
        >
          <Icon
            name="home"
            size={24}
            color={activeIndex === 0 ? "#F97316" : "#c7d2e8"}
          />
        </Animated.View>
        <Text style={[styles.navText, activeIndex === 0 && styles.activeText]}>
          Accueil
        </Text>
      </TouchableOpacity>

      {/* Bouton Profile */}
      <TouchableOpacity
        style={styles.navButton}
        onPress={() => handleNavigation(1, "Profile")}
      >
        <Animated.View
          style={{
            transform: [
              { scale: animationRefs[1].scaleIcon },
              { translateY: animationRefs[1].translateYIcon },
            ],
          }}
        >
          <Icon
            name="user"
            size={24}
            color={activeIndex === 1 ? "#F97316" : "#c7d2e8"}
          />
        </Animated.View>
        <Text style={[styles.navText, activeIndex === 1 && styles.activeText]}>
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: "#151b3a",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  navButton: {
    alignItems: "center",
    flex: 1,
  },
  navText: {
    fontFamily: "RalewayRegular",
    marginTop: 5,
    color: "#c7d2e8",
    fontSize: 12,
  },
  activeText: {
    color: "#F97316",
    fontWeight: "bold",
  },
});