-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: kompetisiku
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `competitions`
--

DROP TABLE IF EXISTS `competitions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `competitions` (
  `index` int NOT NULL AUTO_INCREMENT,
  `id` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `categoryId` int DEFAULT NULL,
  `category` varchar(45) DEFAULT NULL,
  `organizerId` varchar(45) NOT NULL,
  `organizerName` varchar(45) NOT NULL,
  `image` varchar(45) NOT NULL,
  `eventStart` date NOT NULL,
  `eventEnd` date NOT NULL,
  `location` varchar(45) NOT NULL,
  `reward` varchar(45) NOT NULL,
  `registrationOpen` date NOT NULL,
  `registrationClose` date NOT NULL,
  `capacity` int NOT NULL,
  `pricePerItem` int NOT NULL,
  `description` mediumtext NOT NULL,
  `attachedFile` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `index_UNIQUE` (`index`),
  KEY `competition-organizer_idx` (`organizerId`),
  CONSTRAINT `competition-organizer` FOREIGN KEY (`organizerId`) REFERENCES `organizers` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competitions`
--

LOCK TABLES `competitions` WRITE;
/*!40000 ALTER TABLE `competitions` DISABLE KEYS */;
INSERT INTO `competitions` VALUES (6,'gSSBMH_gkdbpuX9w','title1',1,'Karya Tulis Ilmiah','himx57LC7soidu7V','newOrganizer1','link1','2023-12-09','2023-12-12','location1','reward1','2023-12-09','2023-12-12',250,50,'description1','linkFile1','2023-12-18 13:16:04','2023-12-18 13:16:04'),(7,'MINg-e5CjIRELvvz','title2',2,'Debat','himx57LC7soidu7V','newOrganizer1','link2','2023-12-09','2023-12-12','location2','reward2','2023-12-09','2023-12-12',250,50,'description2','linkFile2','2023-12-18 13:31:51','2023-12-18 13:31:51');
/*!40000 ALTER TABLE `competitions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-12-19 21:19:05
