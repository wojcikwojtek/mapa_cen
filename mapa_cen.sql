-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: mapa_cen
-- ------------------------------------------------------
-- Server version	8.0.31

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
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`category_id`),
  UNIQUE KEY `category_id_UNIQUE` (`category_id`),
  UNIQUE KEY `category_name_UNIQUE` (`category_name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (6,'nabiał'),(8,'napoje'),(2,'owoce'),(4,'owoce morza'),(3,'pieczywo'),(7,'produkty mięsne'),(5,'słodycze'),(1,'warzywa');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `comment_id` int NOT NULL AUTO_INCREMENT,
  `price_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `date` datetime NOT NULL,
  `content` varchar(500) NOT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `price_id_idx` (`price_id`),
  KEY `user_id1_idx` (`user_id`),
  CONSTRAINT `price_id1` FOREIGN KEY (`price_id`) REFERENCES `prices` (`price_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'2023-01-01 12:00:00','dupa','dupa.jpg');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prices`
--

DROP TABLE IF EXISTS `prices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prices` (
  `price_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `shop_address` varchar(100) NOT NULL,
  `date` datetime NOT NULL,
  `price_value` float NOT NULL,
  `region_id` int NOT NULL,
  PRIMARY KEY (`price_id`),
  KEY `product_id_idx` (`product_id`),
  KEY `region_id_idx` (`region_id`),
  CONSTRAINT `product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `region_id` FOREIGN KEY (`region_id`) REFERENCES `region` (`id_regionu`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,1,'Katowice ul. Mariacka 51','2023-01-01 12:00:00',5.39,34),(2,1,'Gliwice ul. Akademicka 16','2020-01-01 12:11:00',4.99,33),(3,10,'Gliwce ul. Tarnogórska 20','2023-11-20 11:21:11',110.49,33),(4,10,'Gliwce ul. Akademicka 16','2023-11-15 11:21:11',70.49,33),(5,20,'Gliwce ul. Akademicka 16','2022-11-15 11:21:11',18.59,33),(6,20,'Gliwce ul. Tarnogórska 20','2020-05-15 11:21:11',11.59,33),(7,1,'Zabrze ul.Budowlana 67','2023-12-01 12:00:00',4.49,32);
/*!40000 ALTER TABLE `prices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `category_id` int DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  UNIQUE KEY `product_name_UNIQUE` (`product_name`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'pomidor',1,'pomidor.jpg'),(2,'banan',2,'banan.jpg'),(4,'jagody',2,'jagody.jpg'),(5,'sałata',1,'sałata.jpg'),(6,'cebula',1,'cebula.jpg'),(7,'pszenny chleb',3,'pszennyChleb.jpg'),(8,'żytni chleb',3,'żytniChleb.jpg'),(9,'kajzerka',3,'kajzerka.jpg'),(10,'łosoś',4,'łosoś.jpg'),(11,'krewetki',4,'krewetki.jpg'),(12,'homar',4,'homar.jpg'),(13,'snickers',5,'snickers.jpg'),(14,'prince polo',5,'princePolo.jpg'),(15,'michałki',5,'michałki.jpg'),(16,'twaróg',6,'twaróg.jpg'),(17,'mleko',6,'mleko.jpg'),(18,'ser gouda',6,'serGouda.jpg'),(19,'pierś z kurczaka',7,'pierśZKurczaka.jpg'),(20,'udka z kurczaka',7,'udkaZKurczaka.jpg'),(21,'polędwica wołowa',7,'polędwicaWołowa.jpg'),(22,'sucha krakowska',7,'suchaKrakowska.jpg'),(23,'coca cola',8,'cocaCola.jpg'),(24,'woda niegazowana',8,'wodaNiegazowana.jpg');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `rating_id` int NOT NULL AUTO_INCREMENT,
  `price_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `is_positive` tinyint NOT NULL,
  PRIMARY KEY (`rating_id`),
  KEY `price_id_idx` (`price_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `price_id` FOREIGN KEY (`price_id`) REFERENCES `prices` (`price_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,1,1,1);
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `region`
--

DROP TABLE IF EXISTS `region`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `region` (
  `id_regionu` int NOT NULL AUTO_INCREMENT,
  `nazwa_regionu` varchar(45) NOT NULL,
  `id_województwa` int NOT NULL,
  PRIMARY KEY (`id_regionu`),
  KEY `id_województwa_idx` (`id_województwa`),
  CONSTRAINT `id_województwa` FOREIGN KEY (`id_województwa`) REFERENCES `województwa` (`id_województwa`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `region`
--

LOCK TABLES `region` WRITE;
/*!40000 ALTER TABLE `region` DISABLE KEYS */;
INSERT INTO `region` VALUES (1,'Wrocław',1),(2,'wrocławski',1),(3,'trzebnicki',1),(4,'Bydgoszcz',2),(5,'Grudziądz',2),(6,'Toruń',2),(7,'Biała Podlaska',3),(8,'Chełm',3),(9,'Lublin',3),(10,'Gorzów Wielkopolski',4),(11,'Zielona Góra',4),(12,'Łódź',5),(13,'Piotrków Trybunalski',5),(14,'Skierniewice',5),(15,'Kraków',6),(16,'Nowy Sącz',6),(17,'Tarnów',6),(18,'Ostrołęka',7),(19,'Płock',7),(20,'Warszawa',7),(21,'Opole',8),(22,'nyski',8),(23,'Przemyśl',9),(24,'Krosno',9),(25,'Rzeszów',9),(26,'Białystok',10),(27,'Łomża',10),(28,'Suwałki',10),(29,'Gdańsk',11),(30,'Gdynia',11),(31,'Słupsk',11),(32,'Zabrze',12),(33,'Gliwice',12),(34,'Katowice',12),(35,'Kielce',13),(36,'kielecki',13),(37,'Elbląg',14),(38,'Olsztyn',14),(39,'Poznań',15),(40,'Kalisz',15),(41,'Leszno',15),(42,'Koszalin',16),(43,'Szczecin',16),(44,'Świnoujście',16);
/*!40000 ALTER TABLE `region` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL,
  `is_admin` tinyint(1) NOT NULL,
  `id_regionu` int DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@gmail.com','dupa',1,0),(2,'sdiahj','sdafsa','dsadasd',0,34),(3,'string','string','string',0,33),(4,'dddd','dddd@gmail.com','Mapacen123',0,32);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `województwa`
--

DROP TABLE IF EXISTS `województwa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `województwa` (
  `id_województwa` int NOT NULL AUTO_INCREMENT,
  `nazwa` varchar(45) NOT NULL,
  PRIMARY KEY (`id_województwa`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `województwa`
--

LOCK TABLES `województwa` WRITE;
/*!40000 ALTER TABLE `województwa` DISABLE KEYS */;
INSERT INTO `województwa` VALUES (1,'dolnośląskie'),(2,'kujawsko-pomorskie'),(3,'lubelskie'),(4,'lubuskie'),(5,'łódzkie'),(6,'małopolskie'),(7,'mazowieckie'),(8,'opolskie'),(9,'podkarpackie'),(10,'podlaskie'),(11,'pomorskie'),(12,'śląskie'),(13,'świętokrzyskie'),(14,'warmińsko-mazurskie'),(15,'wielkopolskie'),(16,'zachodniopomorskie');
/*!40000 ALTER TABLE `województwa` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-01-09 15:22:42
