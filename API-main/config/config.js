const mysql = require("mysql2/promise");
const { createClient } = require("redis");
require("dotenv").config();

const mysqlConnexion = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Configuration Redis (optionnelle)
let redisClient = null;
const redisDisabled = process.env.REDIS_DISABLED === "1";
const hasRedisConfig = !!process.env.REDIS_HOST;

if (!redisDisabled && hasRedisConfig) {
  const redisHost = process.env.REDIS_HOST;
  const redisPort = process.env.REDIS_PORT || 6379;
  const redisPassword = process.env.REDIS_PASSWORD;
  const redisUrl = redisPassword
    ? `redis://:${redisPassword}@${redisHost}:${redisPort}`
    : `redis://${redisHost}:${redisPort}`;

  redisClient = createClient({
    url: redisUrl,
  });

  redisClient.connect().catch(console.error);

  redisClient.on("error", (err) => {
    console.error("Redis error:", err);
  });
}

module.exports = {
  mysqlConnexion,
  redisClient,
};

mysqlConnexion, redisClient;
