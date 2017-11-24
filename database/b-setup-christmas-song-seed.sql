-- MySQL dump 10.13  Distrib 5.7.17, for macos10.12 (x86_64)
--
-- Host: 127.0.0.1    Database: toppy
-- ------------------------------------------------------
-- Server version	5.6.38

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Dumping data for table `Battles`
--

LOCK TABLES `Battles` WRITE;
/*!40000 ALTER TABLE `Battles` DISABLE KEYS */;
/*!40000 ALTER TABLE `Battles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Contestants`
--

LOCK TABLES `Contestants` WRITE;
/*!40000 ALTER TABLE `Contestants` DISABLE KEYS */;
INSERT INTO `Contestants` VALUES (1,'Jingle Bells',1,1),(2,'Silent Night',1,1),(3,'Joy to the World',1,1),(4,'Oh Come All Ye Faithful',1,1),(5,'Oh Holy Night',1,1),(6,'Let It Snow',1,1),(7,'What Child Is This',1,1),(8,'Away In A Manger',1,1),(9,'Oh Little Town Of Bethlehem',1,1),(10,'Little Drummer Boy',1,1),(11,'Angels We Have Heard On High',1,1);
/*!40000 ALTER TABLE `Contestants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (1,'Jeff','Mills','breathmills@gmail.com');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping data for table `Wars`
--

LOCK TABLES `Wars` WRITE;
/*!40000 ALTER TABLE `Wars` DISABLE KEYS */;
INSERT INTO `Wars` VALUES (1,'Greatest Christmas Song',1);
/*!40000 ALTER TABLE `Wars` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-23 22:29:36
