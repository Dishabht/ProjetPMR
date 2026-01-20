-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mer. 25 juin 2025 à 17:35
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `pmove`
--

-- --------------------------------------------------------

--
-- Structure de la table `accompagnateur`
--

DROP TABLE IF EXISTS `accompagnateur`;
CREATE TABLE IF NOT EXISTS `accompagnateur` (
  `ID_Accompagnateur` int NOT NULL AUTO_INCREMENT,
  `name_acc` varchar(50) DEFAULT NULL,
  `surname_acc` varchar(50) DEFAULT NULL,
  `num_acc` int DEFAULT NULL,
  `mail_acc` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_Accompagnateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `acc_client`
--

DROP TABLE IF EXISTS `acc_client`;
CREATE TABLE IF NOT EXISTS `acc_client` (
  `ID_Client` int DEFAULT NULL,
  `ID_Accompagnateur` int DEFAULT NULL,
  KEY `ID_Client` (`ID_Client`),
  KEY `ID_Accompagnateur` (`ID_Accompagnateur`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `agent`
--

DROP TABLE IF EXISTS `agent`;
CREATE TABLE IF NOT EXISTS `agent` (
  `ID_Agent` int DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

DROP TABLE IF EXISTS `client`;
CREATE TABLE IF NOT EXISTS `client` (
  `ID_Client` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  `surname` varchar(50) DEFAULT NULL,
  `num` int DEFAULT NULL,
  `mail` varchar(100) DEFAULT NULL,
  `handicap` int DEFAULT NULL,
  `civilite` int DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `contact_mail` varchar(100) DEFAULT NULL,
  `contact_num` int DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`ID_Client`),
  KEY `handicap` (`handicap`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `handicap`
--

DROP TABLE IF EXISTS `handicap`;
CREATE TABLE IF NOT EXISTS `handicap` (
  `ID_Handicap` int NOT NULL AUTO_INCREMENT,
  `name_handi` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID_Handicap`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `handicap`
--

INSERT INTO `handicap` (`ID_Handicap`, `name_handi`) VALUES
(1, 'BLND'),
(2, 'DEAF'),
(3, 'DPNA'),
(4, 'WCHR'),
(5, 'WCHS'),
(6, 'WCHC'),
(7, 'MAAS');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
