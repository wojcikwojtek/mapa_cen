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
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,1,1,'2023-01-01 12:00:00','dupa','\\Images\\pomidor.png'),(2,2,3,'2024-01-16 12:19:41','Kamil paruwa',NULL),(3,3,3,'2024-02-10 13:15:40','Nie dajcie się nabrać, scam',NULL),(4,4,4,'2023-11-15 12:18:20','XD??????',NULL),(5,5,2,'2022-11-29 08:20:19','Sprzedawca połamał mi kartę płatniczą! NIE POLECAM SKLEPU, ale udka z kurczaka w sumie dobre.',NULL),(6,12,4,'2024-02-10 13:57:20','Fiufiufiufiu ekstra',NULL),(7,20,3,'2024-02-06 13:00:15','No cebulka fresz do jajówy jak znalazł, nigdzie w okolicy nie ma takiej fresz cebulki 10/10',NULL),(8,22,2,'2024-02-06 15:28:17','No trochę za sucha ta sucha krakowska, więc no łapka w dół niestety. Musiała być nieświeża, jestem zawiedziony...',NULL),(9,27,3,'2024-02-01 17:15:02','Snickers jak snickers. Nie da się tego z... Zepsuć.',NULL),(10,29,2,'2024-02-10 14:01:15','Jaś Fasolaa',NULL),(11,29,4,'2024-02-10 13:25:18','Fasola była spleśniała!',NULL),(12,30,3,'2024-02-09 12:18:20','Szkoda, że nie lubię skisłego mleka.',NULL),(13,31,2,'2024-02-08 13:12:12','Moje ulubione słodycze!!!!!!!!',NULL),(14,1,1,'2024-02-12 21:14:07','asdsada','\\Images\\1.jpg'),(15,15,1,'2024-02-13 11:53:30','Kraków jest fajny',NULL),(16,15,1,'2024-02-13 11:53:56','Kraków zdjęcie','\\Images\\2.jpg');
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
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prices`
--

LOCK TABLES `prices` WRITE;
/*!40000 ALTER TABLE `prices` DISABLE KEYS */;
INSERT INTO `prices` VALUES (1,1,'Katowice ul. Mariacka 51','2023-01-01 12:00:00',5.39,34),(2,1,'Gliwice ul. Akademicka 16','2020-01-01 12:11:00',4.99,33),(3,10,'Gliwice ul. Tarnogórska 20','2023-11-20 11:21:11',110.49,33),(4,10,'Gliwice ul. Akademicka 16','2023-11-15 11:21:11',70.49,33),(5,20,'Gliwice ul. Akademicka 16','2022-11-15 11:21:11',18.59,33),(6,20,'Gliwice ul. Tarnogórska 20','2020-05-15 11:21:11',11.59,33),(7,1,'Zabrze ul.Budowlana 67','2023-12-01 12:00:00',4.49,32),(8,15,'Mikołów ul. Gliwicka 3','2024-02-08 12:45:48',20,12),(9,13,'Katowice ul. Śląska 34C','2024-02-03 15:45:41',3,34),(10,24,'Gliwice ul. Bojkowska 108','2023-12-31 23:59:59',5,33),(11,5,'Gliwce ul. Tarnogórska 20','2024-02-08 16:12:06',3,33),(12,12,'Zabrze ks. Skargi 5a','2024-02-10 13:12:02',68,32),(13,14,'Poznań ul. Święty Marcin 24','2023-07-05 19:18:27',2,39),(14,18,'Poznań ul. Święty Marcin 24','2024-01-17 19:15:22',3,39),(15,1,'Kraków ul. Stradomska 9','2024-02-10 12:59:13',2,15),(16,2,'Piotrków Trybunalski ul. Sulejowska 10','2024-02-09 14:23:45',4,13),(17,16,'Wrocław ul. Świętokrzyska 32','2024-02-08 08:15:30',7,1),(18,4,'Łódź ul. Przędzalniana 62','2024-02-07 16:55:22',4,12),(19,5,'Grudziądz ul. Legionów 46','2024-02-06 10:30:00',3,5),(20,6,'Toruń ul. Chełmińska 22','2024-02-05 09:12:18',1,6),(21,7,'Krosno ul. Tysiąclecia 1','2024-02-04 14:10:05',9,24),(22,8,'Przemyśl ul. Waleriana Łukasińskiego 14','2024-02-03 11:45:33',10,23),(23,9,'Gdańsk ul. Zawodników 4','2024-02-02 18:20:47',0,29),(24,10,'Gdynia ul. Plac Konstytucji 3','2024-02-01 07:30:15',41,30),(25,11,'Olsztyn ul. Władysława Jagiełły 2','2024-01-31 14:05:10',29,38),(26,12,'Katowice ul. Skowronków 1','2024-01-30 19:45:55',72,34),(27,13,'Warszawa ul. Szczęśliwicka 6A','2024-01-29 22:18:40',2,20),(28,22,'Chełm ul. Śląska 2','2024-01-28 11:11:11',12,8),(29,24,'Kraków ul. Zwierzyniecka 29','2024-01-27 13:20:00',4,15),(30,17,'Tarnów ul. Mickiewicza 27','2024-01-22 14:55:00',2,17),(31,15,'Katowice ul. Gliwicka 52','2024-02-08 12:13:48',20,34),(32,1,'Katowice ul. Mariacka 8','2024-02-12 21:15:31',5,34),(33,16,'Katowice ul. Mariacka 8','2024-02-13 11:17:39',3.44,34),(34,16,'Gliwice ul. Akademicka 16','2024-02-13 11:18:45',3.99,33),(35,17,'Warszawa ul. Wawelska 46','2024-02-13 11:55:30',2.54,20);
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
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'pomidor',1,'pomidor.png'),(2,'banan',2,'banan.png'),(4,'jagody',2,'jagody.png'),(5,'sałata',1,'sałata.png'),(6,'cebula',1,'cebula.png'),(7,'pszenny chleb',3,'chleb_pszenny.png'),(8,'żytni chleb',3,'chleb_żytni.png'),(9,'kajzerka',3,'kajzerka.png'),(10,'łosoś',4,'łosoś.png'),(11,'krewetki',4,'krewetki.png'),(12,'homar',4,'homar.png'),(13,'snickers',5,'snickers.png'),(14,'prince polo',5,'prince_polo.png'),(15,'michałki',5,'michałki.png'),(16,'twaróg',6,'twaróg.png'),(17,'mleko',6,'mleko.png'),(18,'ser gouda',6,'ser_gouda.png'),(19,'pierś z kurczaka',7,'pierś_z_kurczaka.png'),(20,'udka z kurczaka',7,'udka_z_kurczaka.png'),(21,'polędwica wołowa',7,'polędwica_wołowa.png'),(22,'sucha krakowska',7,'sucha_krakowska.png'),(23,'coca cola',8,'coca_cola.png'),(24,'woda niegazowana',8,'woda_niegazowana.png'),(25,'woda gazowana',8,'woda_gazowana.png'),(26,'fasola',1,'bean-dies-from-cringe.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (2,7,3,1),(3,2,3,1),(15,1,1,1),(16,32,1,1),(17,15,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@gmail.com','dupa',1,0),(2,'sdiahj','sdafsa','dsadasd',0,34),(3,'string','string','string',0,12),(4,'dddd','dddd@gmail.com','Mapacen123',0,32);
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

-- Dump completed on 2024-02-13 12:09:16
