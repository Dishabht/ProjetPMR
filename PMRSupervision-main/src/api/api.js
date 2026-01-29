import axios from "axios";

// Base URL de l'API (Backend sur localhost:3001)
const API_BASE_URL = "http://localhost:3000";

// Création de l'instance axios
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (mail, password) => {
  try {
    console.log("Tentative de connexion à l'API avec :", { mail, password });
    const response = await api.post("/users/userLog", { mail, password });
    console.log("Réponse reçue de l'API :", response.data); // Ajoute ce log
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la requête à l'API :", error);

    if (error.response) {
      console.log(
        "Erreur réponse API :",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.log("Erreur réseau : Aucune réponse reçue.");
    } else {
      console.log("Erreur inconnue :", error.message);
    }

    throw (
      error.response?.data || { message: "Erreur de connexion au serveur." }
    );
  }
};

export const validateToken = async (token) => {
  try {
    const response = await axios.post("http://localhost:3000/users/validateToken", { token });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la validation du token :", error);
    throw error;
  }
};

export const checkReservation = async (num_reservation, base) => {
  try {
    const response = await api.post("/traj/checkReservation", {
      num_reservation: num_reservation,
      base: base,
    });
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || {
        message: "Erreur lors de la vérification de la réservation.",
      }
    );
  }
};

export const logout = async () => {
  try {
    const response = await api.post("/users/logout");
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Erreur lors de la déconnexion." };
  }
};

export const fetchUserProfile = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/profile`, {
      withCredentials: true, // Inclure les cookies pour la session
    });
    return response.data; // Retourne les données utilisateur
  } catch (error) {
    console.error("Erreur lors de la récupération du profil :", error);
    throw error;
  }
};

export const updateUserProfile = async (updatedData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, updatedData, {
      withCredentials: true, // Inclut les cookies pour la session utilisateur
    });
    return response.data; // Retourne les données mises à jour
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil :", error);
    throw error;
  }
};
