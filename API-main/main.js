const express = require("express");
const mysql = require("mysql2"); // Utilisez mysql2
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const mongoose = require("mongoose");
const cors = require("cors"); // Import du middleware CORS
require("dotenv").config(); // Charge les variables d'environnement depuis .env
const { createClient } = require("redis");

const app = express();
const port = 3000;

// CORS permissif pour le dev
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: false,
  })
);

// Parser JSON
app.use(express.json());

// Logger des requêtes
app.use((req, res, next) => {
  console.log(`REQUEST: ${req.method} ${req.path}`);
  console.log("Body:", req.body);
  next();
});

// Connexion à MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

db.connect((err) => {
  if (err) {
    console.error("Erreur de connexion à la base de données MySQL:", err);
  } else {
    console.log("Connecté à la base de données MySQL");
  }
});

// Injecter la connexion MySQL dans req
app.use((req, res, next) => {
  req.connexion = db;
  next();
});

// Connexions MongoDB
const mongoRATP = mongoose.createConnection(process.env.MONGO_URI_RATP, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoSNCF = mongoose.createConnection(process.env.MONGO_URI_SNCF, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const mongoAirFrance = mongoose.createConnection(process.env.MONGO_URI_AIRFRANCE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoRATP.on("connected", () => {
  console.log("Connecté à MongoDB (RATP)");
});
mongoRATP.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB (RATP) :", err);
});

mongoSNCF.on("connected", () => {
  console.log("Connecté à MongoDB (SNCF)");
});
mongoSNCF.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB (SNCF) :", err);
});

mongoAirFrance.on("connected", () => {
  console.log("Connecté à MongoDB (AirFrance)");
});
mongoAirFrance.on("error", (err) => {
  console.error("Erreur de connexion à MongoDB (AirFrance) :", err);
});

// Injecter les connexions MongoDB dans req
app.use((req, res, next) => {
  req.mongoRATP = mongoRATP;
  req.mongoSNCF = mongoSNCF;
  req.mongoAirFrance = mongoAirFrance;
  next();
});

// Redis (optionnel, ne bloque pas le serveur)
const redisClient = createClient({
  url: `redis://:${process.env.REDIS_PASSWORD || ""}@${process.env.REDIS_HOST || "localhost"}:${process.env.REDIS_PORT || 6379}`,
});

redisClient.connect().catch((err) => {
  console.error("Redis connection failed (server still running):", err);
});

redisClient.on("ready", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (err) => {
  console.error("Redis error:", err);
});

// Swagger
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API documentation with Swagger",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./api/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/users", require("./api/users/users"));
app.use("/acc", require("./api/acc/accompagnateur"));
app.use("/ag", require("./api/ag/agent"));
app.use("/traj", require("./api/traj/trajet"));
app.use("/reservation", require("./api/reservation/reservation"));
app.use("/chat", require("./api/chat/chatController"));

// Racine
app.get("/", (req, res) => {
  console.log("Poto ca marche mais pas trop");
  res.send("Hello World!");
});

// Démarrage serveur (indépendant de Redis)
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on http://0.0.0.0:${port}`);
});