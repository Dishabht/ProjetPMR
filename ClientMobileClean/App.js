import React, { useContext, useState, useEffect } from "react";
import { LogBox, View, Text, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NetInfo from "@react-native-community/netinfo"; // Importer NetInfo
import AsyncStorage from "@react-native-async-storage/async-storage"; // Pour stocker les données hors-ligne
import Toast from "react-native-toast-message";
import { UserProvider } from "./UserContext";
import PageStart from "./components/PageStart.jsx";
import Connexion from "./components/Connexion";
import Inscription from "./components/Inscription";
import Inscription2 from "./components/Inscription2.jsx";
import Accueil from "./components/Accueil.jsx";
import NavBar from "./components/Navbar.jsx";
import Settings from "./components/Settings.jsx";
import Profile from "./components/Profile.jsx";
import Reservation from "./components/Reservation.jsx";
import Reservation2 from "./components/Reservation2.jsx";
import Reservation3 from "./components/Reservation3.jsx";
import SplashScreen from "./components/SplashScreen.jsx";
import BagageDetails from "./components/BagageDetails.jsx";
import ConfirmationPage from "./components/ConfirmationPage.jsx";
import BilletDetails from "./components/BilletDetails.jsx";
import { ThemeProvider, ThemeContext } from "./ThemeContext";
import EditProfile from "./components/EditProfile.jsx";
import Confidentialite from "./components/Confidentialite.jsx";

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isConnected, setIsConnected] = useState(true); // État pour la connexion

  // Gérer l'état de connexion
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected && !isConnected) {
        Toast.show({
          type: "success",
          text1: "Connexion rétablie",
          text2: "Vous êtes de nouveau en ligne ! 👌",
        });
      } else if (!state.isConnected && isConnected) {
        Toast.show({
          type: "error",
          text1: "Pas de connexion",
          text2:
            "Vous êtes hors ligne. Certaines fonctionnalités ne sont pas disponibles. 😔",
        });
      }
      setIsConnected(state.isConnected);
    });

    return () => unsubscribe();
  }, [isConnected]);

  // Fonction pour synchroniser les requêtes hors-ligne
  const syncPendingRequests = async () => {
    try {
      const pendingRequests = await AsyncStorage.getItem("pendingRequests");
      if (pendingRequests) {
        const requests = JSON.parse(pendingRequests);
        for (const req of requests) {
          const response = await fetch(req.url, {
            method: req.method,
            headers: req.headers,
            body: req.body,
          });
          if (response.ok) {
            console.log("Requête synchronisée :", req);
          }
        }
        await AsyncStorage.removeItem("pendingRequests");
      }
    } catch (error) {
      console.error("Erreur lors de la synchronisation :", error);
    }
  };

  // Ignorer les logs spécifiques
  LogBox.ignoreLogs([
    "Request failed with status code 404", // Erreurs spécifiques à ignorer
    "VirtualizedLists should never be nested", // Avertissement FlatList
    "Erreur lors de la récupération des billets", // Erreur de récupération des billets dans Accueil
    "Erreur réponse API : 404", // Erreur de réponse API dans Connexion
  ]);

  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <UserProvider>
            <NavigationContainer
              theme={{ colors: { background: theme.background } }}
            >
       <Stack.Navigator initialRouteName="PageStart">
                <Stack.Screen
                  name="SplashScreen"
                  component={SplashScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="PageStart"
                  component={PageStart}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" options={{ headerShown: false }}>
                  {(props) => (
                    <Connexion
                      {...props}
                      onLoginSuccess={() => setIsLoggedIn(true)}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="Confidentialité"
                  component={Confidentialite}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Signup"
                  component={Inscription}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Inscription2"
                  component={Inscription2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Accueil"
                  component={Accueil}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="Settings" options={{ headerShown: false }}>
                  {(props) => (
                    <Settings
                      {...props}
                      onLogout={() => setIsLoggedIn(false)}
                    />
                  )}
                </Stack.Screen>
                <Stack.Screen
                  name="Profile"
                  component={Profile}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Reservation"
                  component={Reservation}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Reservation2"
                  component={Reservation2}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="BagageDetails"
                  component={BagageDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Reservation3"
                  component={Reservation3}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Confirmation"
                  component={ConfirmationPage}
                  options={{ headerShown: false }}
                />

                <Stack.Screen
                  name="BilletDetails"
                  component={BilletDetails}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="EditProfile"
                  component={EditProfile}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
              {isLoggedIn && <NavBar />}
            </NavigationContainer>

            {/* Affichage de l'état de connexion */}
            {!isConnected && (
              <View style={styles.offlineBanner}>
                <Text style={styles.offlineText}>Mode hors-ligne activé</Text>
              </View>
            )}
          </UserProvider>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  offlineBanner: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "red",
    padding: 10,
    alignItems: "center",
  },
  offlineText: {
    color: "white",
    fontWeight: "bold",
  },
});
