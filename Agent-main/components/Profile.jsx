import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Switch,
  Animated,
} from "react-native";
import { Feather as FeatherIcon } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFonts, Raleway_400Regular, Raleway_700Bold } from "@expo-google-fonts/raleway";

export default function Profile() {
  const [form, setForm] = useState({
    emailNotifications: true,
    pushNotifications: false,
  });
  const [userInfo, setUserInfo] = useState({
    name: "",
    surname: "",
    agentId: "",
    affiliation: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const navigation = useNavigation();

  useFonts({
    Raleway_400Regular,
    Raleway_700Bold,
  });

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        // const storedFontSize = await AsyncStorage.getItem("fontSize");

        console.log("Données récupérées depuis AsyncStorage :", JSON.parse(user));

        if (user) {
          const { name, surname, agentId, affiliation } = JSON.parse(user);
          setUserInfo({ name, surname, agentId, affiliation });
        }
      } catch (error) {
        console.error("Erreur lors du chargement des informations utilisateur :", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
    // Action de déconnexion
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("agentId");
    console.log("Déconnexion réussie");
    navigation.replace("Login"); // Redirection vers la page Connexion
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
  }
}

  return (
    <SafeAreaView
      style={[
        { flex: 1 },
        styles.lightContainer,
      ]}
    >
      <View style={styles.profile}>
        {/* Animation JSON pour l'avatar */}
        <View style={styles.avatarCard}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>
              {`${userInfo.name?.[0] || "A"}${userInfo.surname?.[0] || "G"}`}
            </Text>
          </View>
          <View>
            <Text style={styles.profileName}>
              {userInfo.name} {userInfo.surname}
            </Text>
            <Text style={styles.profileId}>Agent ID: {userInfo.agentId || "Non trouvé"}</Text>
            <Text style={styles.profileAffiliation || "Non trouvé"}>
              Affiliation : {userInfo.affiliation || "Non spécifiée"}
            </Text>
          </View>
        </View>
      </View>

        <ScrollView>
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { fontFamily: "Raleway_700Bold" }]}>
              Préférences
            </Text>

          {/* Email Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
              <FeatherIcon color="#fff" name="at-sign" size={20} />
            </View>
            <Text style={styles.rowLabel}>Notifications par email</Text>
            <View style={styles.rowSpacer} />
            <View style={styles.switchWrap}>
              <Switch
                onValueChange={(emailNotifications) =>
                  setForm({ ...form, emailNotifications })
                }
                value={form.emailNotifications}
                trackColor={{ false: "#2d3454", true: "#22c55e" }}
                thumbColor={form.emailNotifications ? "#FFFFFF" : "#c7d2e8"}
              />
            </View>
          </View>

          {/* Push Notifications */}
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
              <FeatherIcon color="#fff" name="bell" size={20} />
            </View>
            <Text style={styles.rowLabel}>Notifications push</Text>
            <View style={styles.rowSpacer} />
            <View style={styles.switchWrap}>
              <Switch
                onValueChange={(pushNotifications) =>
                  setForm({ ...form, pushNotifications })
                }
                value={form.pushNotifications}
                trackColor={{ false: "#2d3454", true: "#22c55e" }}
                thumbColor={form.pushNotifications ? "#FFFFFF" : "#c7d2e8"}
              />
            </View>
          </View>
          <TouchableOpacity style={styles.row} onPress={handleLogout}>
        <View style={[styles.rowIcon, { backgroundColor: "#EF4D20" }]}>
          <FeatherIcon color="#fff" name="log-out" size={20} />
        </View>
        <Text style={[styles.rowLabel, { color: "#4c4c4c" }]}>Déconnexion</Text>
        <View style={styles.rowSpacer} />
      </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bouton de déconnexion */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Déconnexion</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    backgroundColor: "#0a0e27",
    flex: 1,
  },
  profile: {
    padding: 24,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarCard: {
    backgroundColor: "#151b3a",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  avatarCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#0f1430",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#2d3454",
    marginTop: 6,
  },
  avatarText: {
    fontSize: 28,
    color: "#F97316",
    fontFamily: "Raleway_700Bold",
  },
  profileName: {
    marginTop: 20,
    fontSize: 19,
    fontWeight: "600",
    color: "#f5f7ff",
    textAlign: "center",
  },
  profileId: {
    marginTop: 5,
    fontSize: 16,
    color: "#c7d2e8",
    textAlign: "center",
  },
  profileAffiliation: {
    marginTop: 5,
    fontSize: 16,
    color: "#c7d2e8",
    textAlign: "center",
    fontStyle: "italic",
  },
  section: {
    paddingHorizontal: 24,
    paddingTop: 8,
    flex: 1,
  },
  sectionTitle: {
    paddingVertical: 12,
    fontSize: 12,
    fontWeight: "600",
    color: "#8b95b8",
    textTransform: "uppercase",
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 56,
    backgroundColor: "#151b3a",
    borderRadius: 14,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#2d3454",
  },
  rowIcon: {
    width: 32,
    height: 32,
    borderRadius: 10,
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  rowLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#f5f7ff",
    flex: 1,
  },
  rowSpacer: {
    flex: 1,
  },
  switchWrap: {
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
});