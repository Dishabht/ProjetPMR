const express = require("express");
const mongoose = require("mongoose");
const { createClient } = require("redis");
const router = express.Router();
const nodemailer = require("nodemailer");
const { sendConfirmationEmail } = require("./mailler");
const { redisClient } = require("../../config/config");

const reservationSchema = new mongoose.Schema(
  {
    num_reservation: { type: String, required: true },
    name: String,
    surname: String,
    phone: String,
    handicap_type: String,
    numBags: Number,
    lieu_depart: { type: String, required: true },
    lieu_arrivee: { type: String, required: true },
    heure_depart: { type: String, required: true },
    heure_arrivee: String,
    transport: { type: String, required: true },
  },
  { timestamps: true }
);

const getReservationModel = (connection) =>
  connection.models.Reservation ||
  connection.model("Reservation", reservationSchema);

const getMongoConnections = (req) => {
  if (!req) return [];

  return [
    { name: "RATP", connection: req.mongoRATP },
    { name: "SNCF", connection: req.mongoSNCF },
    { name: "AirFrance", connection: req.mongoAirFrance },
  ].filter((entry) => entry.connection && entry.connection.readyState === 1);
};

const getConnectionsByTransport = (req, transport) => {
  const connections = getMongoConnections(req);
  if (!transport) return connections;

  return connections.filter(
    (entry) => entry.name.toLowerCase() === transport.toLowerCase()
  );
};

const mongoSeedData = {
  RATP: [
    {
      num_reservation: "101",
      name: "Client",
      surname: "Test",
      phone: "0751033970",
      handicap_type: "WCHR",
      numBags: 1,
      lieu_depart: "Marseille",
      lieu_arrivee: "Nice",
      heure_depart: "2025-12-02T07:30:00Z",
      heure_arrivee: "2025-12-02T10:30:00Z",
      transport: "RATP",
    },
  ],
  SNCF: [
    {
      num_reservation: "102",
      name: "Client",
      surname: "Test",
      phone: "0751033970",
      handicap_type: "WCHR",
      numBags: 1,
      lieu_depart: "Nice",
      lieu_arrivee: "Paris",
      heure_depart: "2025-12-02T12:00:00Z",
      heure_arrivee: "2025-12-02T17:40:00Z",
      transport: "SNCF",
    },
  ],
  AirFrance: [
    {
      num_reservation: "103",
      name: "Client",
      surname: "Test",
      phone: "0751033970",
      handicap_type: "WCHR",
      numBags: 1,
      lieu_depart: "Paris (CDG)",
      lieu_arrivee: "Marseille",
      heure_depart: "2025-12-02T20:00:00Z",
      heure_arrivee: "2025-12-02T21:25:00Z",
      transport: "Air France",
    },
  ],
};

const ensureMongoSeed = async (req) => {
  const connections = getMongoConnections(req);
  if (connections.length === 0) return;
  await Promise.all(
    connections.map(async ({ name, connection }) => {
      const model = getReservationModel(connection);
      const seed = mongoSeedData[name] || [];
      if (seed.length === 0) return;

      await Promise.all(
        seed.map(async (billet) => {
          await model.updateOne(
            { num_reservation: billet.num_reservation },
            { $set: billet },
            { upsert: true }
          );
        })
      );
    })
  );
};

const escapeRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Fallback mémoire si Redis est indisponible
const memoryStore = new Map();

const seedMemoryBillets = () => {
  const sampleBillets = [
    {
      num_reservation: "101",
      name: "Client",
      surname: "Test",
      phone: "0751033970",
      handicap_type: "WCHR",
      numBags: 1,
      lieu_depart: "Marseille",
      lieu_arrivee: "Nice",
      heure_depart: "2025-12-02T07:30:00Z",
      heure_arrivee: "2025-12-02T10:30:00Z",
      transport: "RATP",
    },
    {
      num_reservation: "102",
      name: "Client",
      surname: "Test",
      phone: "0751033970",
      handicap_type: "WCHR",
      numBags: 1,
      lieu_depart: "Nice",
      lieu_arrivee: "Paris",
      heure_depart: "2025-12-02T14:00:00Z",
      heure_arrivee: "2025-12-02T17:40:00Z",
      transport: "SNCF",
    },
    {
      num_reservation: "103",
      name: "Client",
      surname: "Test",
      phone: "0751033970",
      handicap_type: "WCHR",
      numBags: 1,
      lieu_depart: "Paris (CDG)",
      lieu_arrivee: "Marseille",
      heure_depart: "2025-12-02T20:00:00Z",
      heure_arrivee: "2025-12-02T21:25:00Z",
      transport: "Air France",
    },
  ];

  for (const billet of sampleBillets) {
    const key = `billet:${billet.num_reservation}`;
    memoryStore.set(key, JSON.stringify(billet));
  }
};

seedMemoryBillets();

const seedRedisBillets = async () => {
  for (const billet of memoryStore.values()) {
    const parsed = JSON.parse(billet);
    const key = `billet:${parsed.num_reservation}`;
    await setValue(key, JSON.stringify(parsed));
  }
};

const isRedisReady = () => redisClient && redisClient.isOpen;

const getKeys = async (pattern) => {
  if (isRedisReady()) {
    return redisClient.keys(pattern);
  }

  if (pattern === "billet:*") {
    return Array.from(memoryStore.keys()).filter((key) => key.startsWith("billet:"));
  }

  return [];
};

const getValue = async (key) => {
  if (isRedisReady()) {
    return redisClient.get(key);
  }

  return memoryStore.get(key) ?? null;
};

const setValue = async (key, value) => {
  if (isRedisReady()) {
    return redisClient.set(key, value);
  }

  memoryStore.set(key, value);
  return "OK";
};

const deleteValue = async (key) => {
  if (isRedisReady()) {
    return redisClient.del(key);
  }

  memoryStore.delete(key);
  return 1;
};

/**
 * @swagger
 * tags:
 *   name: Reservation
 *   description: Reservation
 */

/**
 * @swagger
 * /reservation/addToRedis:
 *   post:
 *     summary: Add a billet to Redis
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               billet:
 *                 type: object
 *                 properties:
 *                   num_reservation:
 *                     type: string
 *                   lieu_depart:
 *                     type: string
 *                   lieu_arrivee:
 *                     type: string
 *     responses:
 *       200:
 *         description: Billet successfully added to Redis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing billet or required fields
 *       500:
 *         description: Internal server error
 */
router.post("/addToRedis", async (req, res) => {
  const { billet, email } = req.body;

  console.log("=== Requête reçue pour ajouter dans Redis ===");
  console.log("Données du billet :", billet);
  console.log("Email cible :", email);

  if (!billet || !email) {
    console.error("Données manquantes : billet ou email.");
    return res
      .status(400)
      .json({ success: false, message: "Billet et email requis." });
  }

  try {
    const billetKey = `billet:${billet.num_reservation}`;
    await setValue(billetKey, JSON.stringify(billet));
    console.log("Billet enregistré dans Redis :", billetKey);

    // Envoi de l'email
    const subject = "Confirmation de réservation";
    const message = `
      Votre réservation pour le trajet ${billet.lieu_depart} - ${billet.lieu_arrivee} a bien été enregistrée.
      Numéro de réservation : ${billet.num_reservation}.
    `;

    await sendConfirmationEmail({ name: billet.name, email, subject, message });
    console.log("E-mail de confirmation envoyé à :", email);

    res.json({
      success: true,
      message: "Billet ajouté à Redis et e-mail envoyé.",
    });
  } catch (error) {
    console.error("Erreur dans la route /addToRedis :", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors du traitement de la réservation.",
    });
  }
});

/**
 * @swagger
 * /getTickets:
 *   get:
 *     summary: Récupérer les billets d'un utilisateur
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nom de l'utilisateur
 *       - in: query
 *         name: surname
 *         required: true
 *         schema:
 *           type: string
 *         description: Prénom de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des billets de l'utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 billets:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       surname:
 *                         type: string
 *                       otherProperties:
 *                         type: string
 *       400:
 *         description: Nom et prénom requis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Le nom et le prénom sont requis.
 *       404:
 *         description: Aucun billet trouvé pour cet utilisateur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Aucun billet trouvé pour cet utilisateur.
 *       500:
 *         description: Erreur serveur
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Erreur serveur.
 */

router.get("/getTickets", async (req, res) => {
  const { name, surname } = req.query;

  if (!name || !surname) {
    return res.status(400).json({
      success: false,
      message: "Le nom et le prénom sont requis.",
    });
  }

  try {
    // Rechercher tous les billets
    let keys = await getKeys("billet:*");
    if (keys.length === 0) {
      await seedRedisBillets();
      keys = await getKeys("billet:*");
    }

    const billets = [];
    for (const key of keys) {
      const data = await getValue(key);
      if (!data) {
        continue;
      }
      const billet = JSON.parse(data);

      if (
        billet.name.toLowerCase() === name.toLowerCase() &&
        billet.surname.toLowerCase() === surname.toLowerCase()
      ) {
        billets.push(billet);
      }
    }

    if (billets.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun billet trouvé pour cet utilisateur.",
      });
    }

    res.status(200).json({
      success: true,
      billets,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des billets :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur.",
    });
  }
});

/**
 * @swagger
 * /deleteFromRedis:
 *   delete:
 *     summary: Supprimer un billet de Redis
 *     tags: [Reservation]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               num_reservation:
 *                 type: string
 *                 description: Numéro de réservation du billet
 *     responses:
 *       200:
 *         description: Billet supprimé de Redis avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Billet supprimé de Redis avec succès.
 *       400:
 *         description: Numéro de réservation manquant
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Le numéro de réservation est requis.
 *       404:
 *         description: Aucun billet trouvé avec ce numéro de réservation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Aucun billet trouvé avec ce numéro de réservation.
 *       500:
 *         description: Erreur serveur lors de la suppression du billet
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Erreur serveur lors de la suppression du billet.
 */

router.delete("/deleteFromRedis", async (req, res) => {
  console.log("Requête reçue pour suppression :", req.body);

  const { num_reservation } = req.body;

  if (!num_reservation) {
    console.log("Numéro de réservation manquant");
    return res.status(400).json({
      success: false,
      message: "Le numéro de réservation est requis.",
    });
  }

  try {
    const billetKey = `billet:${num_reservation}`;
    const result = await deleteValue(billetKey);

    console.log("Résultat de suppression Redis :", result);

    if (result === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucun billet trouvé avec ce numéro de réservation.",
      });
    }

    res.json({
      success: true,
      message: "Billet supprimé de Redis avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de la suppression de Redis :", error);
    res.status(500).json({
      success: false,
      message: "Erreur serveur lors de la suppression du billet.",
    });
  }
});

/**
 * @swagger
 * /reservation/getByPoint:
 *   get:
 *     summary: Récupère les réservations pour un point de récupération donné
 *     tags: [Reservation]
 *     parameters:
 *       - in: query
 *         name: pmr_point_id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID du point de récupération (gare ou aéroport)
 *     responses:
 *       200:
 *         description: Liste des réservations pour le point de récupération
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   client_name:
 *                     type: string
 *                   client_surname:
 *                     type: string
 *                   client_phone:
 *                     type: string
 *                   handicap_type:
 *                     type: string
 *                   baggage_count:
 *                     type: number
 *                   trajet:
 *                     type: object
 *                     properties:
 *                       point:
 *                         type: string
 *                       heure:
 *                         type: string
 *       400:
 *         description: Paramètre manquant
 *       500:
 *         description: Erreur serveur
 */
router.get("/getByPoint", async (req, res) => {
  const { pmr_point_id, transport } = req.query;

  if (!pmr_point_id) {
    return res
      .status(400)
      .json({ success: false, message: "Paramètre pmr_point_id manquant." });
  }

  try {
    console.log("Paramètre pmr_point_id reçu :", pmr_point_id); // Log du paramètre reçu

    await ensureMongoSeed(req);
    await seedRedisBillets();

    const pointRegex = new RegExp(
      `^${escapeRegex(pmr_point_id.trim())}$`,
      "i"
    );
    const mongoConnections = getConnectionsByTransport(req, transport);

    if (mongoConnections.length > 0) {
      const mongoResults = await Promise.all(
        mongoConnections.map(async ({ connection }) => {
          const model = getReservationModel(connection);
          return model.find({ lieu_depart: pointRegex }).lean();
        })
      );

      const mongoReservations = mongoResults
        .flat()
        .filter(Boolean)
        .map((billet) => ({
          id: billet.num_reservation,
          client_name: billet.name,
          client_surname: billet.surname,
          client_phone: billet.phone,
          handicap_type: billet.handicap_type,
          baggage_count: billet.numBags,
          trajet: {
            point: billet.lieu_depart,
            heure: billet.heure_depart,
          },
          transport: billet.transport || null,
        }));

      console.log("Réservations Mongo filtrées :", mongoReservations);

      if (mongoReservations.length > 0) {
        return res.status(200).json(mongoReservations);
      }
    }

    const keys = await getKeys("billet:*");
    console.log("Clés Redis trouvées :", keys); // Log des clés Redis

    const reservations = [];

    for (const key of keys) {
      const data = await getValue(key);
      const billet = JSON.parse(data);

      console.log("Données Redis pour la clé", key, ":", billet); // Log des données Redis

      // Normalisation des données pour la comparaison
      const matchesPoint =
        billet.lieu_depart?.trim().toLowerCase() ===
        pmr_point_id.trim().toLowerCase();
      const matchesTransport = transport
        ? billet.transport?.toLowerCase() === transport.trim().toLowerCase()
        : true;

      if (matchesPoint && matchesTransport) {
        reservations.push({
          id: billet.num_reservation,
          client_name: billet.name,
          client_surname: billet.surname,
          client_phone: billet.phone,
          handicap_type: billet.handicap_type,
          baggage_count: billet.numBags,
          trajet: {
            point: billet.lieu_depart,
            heure: billet.heure_depart,
          },
          transport: billet.transport || null,
        });
      }
    }

    console.log("Réservations filtrées :", reservations); // Log des réservations filtrées

    if (reservations.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Aucune réservation trouvée pour ce point.",
      });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});

router.get("/getById", async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Paramètre id manquant." });
  }

  try {
    await ensureMongoSeed(req);

    const mongoConnections = getMongoConnections(req);
    if (mongoConnections.length > 0) {
      for (const { connection } of mongoConnections) {
        const model = getReservationModel(connection);
        const mongoBillet = await model
          .findOne({ num_reservation: id })
          .lean();

        if (mongoBillet) {
          return res.status(200).json({
            success: true,
            reservation: mongoBillet,
          });
        }
      }
    }

    // Rechercher le billet correspondant dans Redis
    const billetKey = `billet:${id}`;
    const data = await getValue(billetKey);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Aucune réservation trouvée pour cet ID.",
      });
    }

    const billet = JSON.parse(data); // Convertir les données en objet JSON
    res.status(200).json({
      success: true,
      reservation: billet,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération de la réservation :", error);
    res.status(500).json({ success: false, message: "Erreur serveur." });
  }
});

// Fermer la connexion Redis proprement si nécessaire (optionnel)
process.on("SIGINT", async () => {
  console.log("Fermeture de la connexion Redis...");
  if (redisClient && redisClient.isOpen) {
    await redisClient.quit();
  }
  process.exit();
});

module.exports = router;
