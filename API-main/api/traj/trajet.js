const express = require("express");
const router = express.Router();
const { redisClient } = require("../../config/config");
const trajetController = require("./trajetController");

/**
 * @swagger
 * tags:
 *   name: Trajet
 *   description: Trajet
 */

/**
 * @swagger
 * /trajet/{lieu}:
 *   get:
 *     summary: Retrieve trajets by lieu
 *     tags: [Trajet]
 *     parameters:
 *       - in: path
 *         name: lieu
 *         required: true
 *         schema:
 *           type: string
 *         description: The lieu to filter trajets
 *     responses:
 *       200:
 *         description: A list of trajets
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: No data found in Redis
 *       500:
 *         description: Internal server error
 */
router.get("/trajet/:lieu", async (req, res) => {
  const lieu = req.params.lieu.toLowerCase(); // attention --> gérer format en minuscules
  const currentDate = new Date().toISOString().split("T")[0]; // attention --> format YYYY-MM-DD
  console.log(`Received request for lieu: ${lieu}`);

  try {
    // Récupérer toutes les sous-clés de 'Trajet'
    const keys = await redisClient.hKeys("Trajet");
    if (keys.length === 0) {
      return res.status(404).json({ message: "No data found in Redis" });
    }

    // Récupérer les données pour chaque sous-clé
    const trajets = await Promise.all(
      keys.map(async (key) => {
        const data = await redisClient.hGet("Trajet", key);
        return JSON.parse(data);
      })
    );

    // Filtrer les trajets par lieu de départ ou d'arrivée et par date
    const filteredTrajet = trajets
      .flatMap((t) => t.trajet)
      .filter(
        (t) =>
          (t.lieu_depart.toLowerCase() === lieu ||
            t.lieu_arrivee.toLowerCase() === lieu) &&
          t.heure_depart.startsWith(currentDate)
      );

    if (filteredTrajet.length === 0) {
      return res.status(404).json({
        message: "No trajet found for the specified location and date",
      });
    }
    res.json(filteredTrajet);
    console.log("Filtered trajets:", filteredTrajet);
  } catch (error) {
    console.error("Error fetching data from Redis:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /trajet/checkReservation:
 *   post:
 *     summary: Check a reservation
 *     tags: [Trajet]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               num_reservation:
 *                 type: string
 *               base:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservation found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing fields
 *       404:
 *         description: Reservation not found
 *       500:
 *         description: Internal server error
 */
router.post("/checkReservation", async (req, res) => {
  const { num_reservation, base } = req.body;

  // Log les données reçues pour déboguer
  console.log("Données reçues dans la requête :", { num_reservation, base });

  // Vérification des champs requis
  if (!num_reservation || !base) {
    console.log("Champs manquants :", { num_reservation, base });
    return res
      .status(400)
      .json({ message: "Les champs num_reservation et base sont requis." });
  }

  try {
    const db =
      base.toLowerCase() === "ratp"
        ? req.mongoRATP
        : base.toLowerCase() === "sncf"
        ? req.mongoSNCF
        : base.toLowerCase() === "airfrance"
        ? req.mongoAirFrance
        : null;

    if (!db) {
      console.log("Base de données non valide :", base);
      return res.status(400).json({
        message: "Base de données non valide. Utilisez 'RATP' ou 'SNCF'.",
      });
    }

    const collection = db.collection("Reservation");
    const existingCount = await collection.countDocuments();
    if (existingCount === 0) {
      const seedData =
        base.toLowerCase() === "ratp"
          ? [
              {
                num_reservation: "100",
                name: "Lea",
                surname: "Martin",
                phone: "0611111111",
                handicap_type: "WCHC",
                numBags: 2,
                lieu_depart: "Gare de Lyon",
                lieu_arrivee: "Châtelet",
                heure_depart: "14:15",
                heure_arrivee: "14:45",
                transport: "RATP",
              },
            ]
          : base.toLowerCase() === "sncf"
          ? [
              {
                num_reservation: "SNCF-001",
                name: "Jean",
                surname: "Dupont",
                phone: "0600000000",
                handicap_type: "WCHR",
                numBags: 1,
                lieu_depart: "Marseille",
                lieu_arrivee: "Gare de Lyon",
                heure_depart: "10:30",
                heure_arrivee: "13:40",
                transport: "SNCF",
              },
            ]
          : [
              {
                num_reservation: "AF-001",
                name: "Nina",
                surname: "Lopez",
                phone: "0622222222",
                handicap_type: "WCHS",
                numBags: 1,
                lieu_depart: "CDG",
                lieu_arrivee: "Nice",
                heure_depart: "18:45",
                heure_arrivee: "20:05",
                transport: "AirFrance",
              },
            ];

      if (seedData.length > 0) {
        await collection.insertMany(seedData);
      }
    }

    // Appel au contrôleur avec num_reservation
    const reservation = await trajetController.checkReservation(
      db,
      num_reservation
    );

    if (reservation) {
      console.log("Réservation trouvée :", reservation);
      res.status(200).json({ message: "Réservation trouvée.", reservation });
    } else {
      console.log("Aucune réservation trouvée pour :", {
        num_reservation,
      });
      res.status(404).json({ message: "Aucune réservation trouvée." });
    }
  } catch (error) {
    console.error("Erreur lors de la vérification de la réservation :", error);
    res.status(500).json({ message: "Erreur interne du serveur.", error });
  }
});

/**
 * @swagger
 * /trajet/{id}/decision:
 *   post:
 *     summary: Accepter ou refuser un trajet
 *     tags: [Trajet]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du trajet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               decision:
 *                 type: string
 *                 enum: [accept, reject]
 *                 description: Décision à prendre pour le trajet
 *     responses:
 *       200:
 *         description: Trajet mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trajet accepted successfully
 *       404:
 *         description: Trajet non trouvé
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Trajet not found
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.post("/trajet/:id/decision", async (req, res) => {
  const { id } = req.params;
  const { decision } = req.body; // "accept" ou "reject"

  try {
    const data = await redisClient.hGet("Trajet", id);
    if (!data) {
      return res.status(404).json({ message: "Trajet not found" });
    }

    const trajet = JSON.parse(data);
    trajet.status = decision === "accept" ? "accepted" : "rejected";

    await redisClient.hSet("Trajet", id, JSON.stringify(trajet));
    res.status(200).json({ message: `Trajet ${decision}ed successfully` });
  } catch (error) {
    console.error("Error updating trajet:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /trajet/today:
 *   get:
 *     summary: Récupérer les trajets du jour
 *     tags: [Trajet]
 *     responses:
 *       200:
 *         description: Liste des trajets du jour
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   heure_depart:
 *                     type: string
 *                   destination:
 *                     type: string
 *                   status:
 *                     type: string
 *       404:
 *         description: Aucun trajet trouvé pour aujourd'hui
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: No trajets found for today
 *       500:
 *         description: Erreur interne du serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */

router.get("/trajet/today", async (req, res) => {
  const currentDate = new Date().toISOString().split("T")[0]; // Format YYYY-MM-DD
  console.log(`Fetching all trajets for date: ${currentDate}`);

  try {
    // Récupérer toutes les sous-clés de 'Trajet'
    const keys = await redisClient.hKeys("Trajet");
    if (keys.length === 0) {
      return res.status(404).json({ message: "No data found in Redis" });
    }

    // Récupérer les données pour chaque sous-clé
    const trajets = await Promise.all(
      keys.map(async (key) => {
        const data = await redisClient.hGet("Trajet", key);
        return JSON.parse(data); // Parsez les données JSON stockées
      })
    );

    // Extraire et filtrer les trajets du jour
    const filteredTrajets = trajets
      .flatMap((t) => t.trajet) // Extraire les trajets depuis chaque objet
      .filter((t) => {
        // Vérifier si la date de départ correspond à la date actuelle
        const trajetDate = t.heure_depart.split("T")[0];
        return trajetDate === currentDate;
      });

    // Vérifier si des trajets sont trouvés
    if (filteredTrajets.length === 0) {
      return res.status(404).json({ message: "No trajets found for today" });
    }

    // Retourner les trajets filtrés
    res.json(filteredTrajets);
  } catch (error) {
    console.error("Error fetching today's trajets from Redis:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
