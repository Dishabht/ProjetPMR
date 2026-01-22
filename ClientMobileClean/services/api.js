import axios from "axios";

const API_BASE_URL = "http://192.168.1.114:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const login = async (mail, password) => {
  try {
    console.log("Tentative de connexion à l'API avec :", { mail, password });
    const response = await api.post("/users/userLog", { mail, password });
    console.log("Réponse reçue de l'API :", response.data);
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

export const uploadImageToRedis = async (id, imageBase64) => {
  try {
    // Envoi de l'image encodée en Base64 à Redis avec un identifiant unique
    const response = await api.post("reservation/storeImage", {
      id,
      imageBase64,
    });

    console.log("Image stockée avec succès :", response.data);
    return response.data.imageKey; // Retourne la clé générée par le backend
  } catch (error) {
    console.error("Erreur lors du stockage de l'image dans Redis :", error);
    throw (
      error.response?.data || {
        message: "Erreur lors du stockage de l'image.",
      }
    );
  }
};

export const addBilletToRedis = async (billet) => {
  try {
    billet.bagages = billet.bagages.map((bagage) => ({
      weight: bagage.weight,
      description: bagage.description,
    }));

    // Encodage UTF-8 des données
    const encodedBillet = Buffer.from(
      JSON.stringify(billet),
      "utf-8"
    ).toString();

      const response = await api.post(`/reservation/addToRedis`, {
      billet: encodedBillet, // Envoie le billet encodé en UTF-8
    });
    console.log("Réponse de l'API :", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi du billet à Redis :",
      error.response?.data || error.message
    );
    throw error.response?.data || { message: "Erreur inconnue" };
  }
};

export const getTickets = async (name, surname) => {
  try {
    console.log("Récupération des billets pour :", { name, surname });
    const response = await api.get(`reservation/getTickets`, {
      params: { name, surname }, // Envoi des paramètres en query string
    });
    console.log("Billets reçus :", response.data);
    return response.data.billets;
  } catch (error) {
    console.error("Erreur lors de la récupération des billets :", error);

    if (error.response) {
      console.error(
        "Erreur réponse API :",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Erreur réseau : aucune réponse reçue.");
    } else {
      console.error("Erreur inconnue :", error.message);
    }

    throw (
      error.response?.data || {
        message: "Erreur lors de la récupération des billets.",
      }
    );
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

export const deleteReservationFromRedis = async (num_reservation) => {
  try {
    console.log("Paramètres envoyés pour suppression :", num_reservation);
    const response = await api.delete("/reservation/deleteFromRedis", {
      data: { num_reservation },
    });
    console.log("Réponse du backend :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la réservation :", error);
    throw (
      error.response?.data || {
        message: "Erreur lors de la suppression de la réservation.",
      }
    );
  }
};

export const update = async (updatedData) => {
  try {
    const response = await api.put("/users/update", updatedData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la requête de mise à jour :", error);

    if (error.response) {
      console.error(
        "Erreur réponse API :",
        error.response.status,
        error.response.data
      );
    } else if (error.request) {
      console.error("Erreur réseau : aucune réponse reçue.");
    } else {
      console.error("Erreur inconnue :", error.message);
    }

    throw (
      error.response?.data || { message: "Erreur de connexion au serveur." }
    );
  }
};

export const sendConfirmationEmail = async (email, subject, message) => {
  try {
    const response = await api.post("/reservation/sendConfirmationEmail", {
  email,
  subject,
  message,
  } 
  );

    console.log("E-mail envoyé :", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
    throw error.response?.data || { message: "Erreur inconnue." };
  }
};
