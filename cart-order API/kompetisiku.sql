SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

USE `kompetisiku`;

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `carts`;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `participant_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `carts` (`id`, `participant_id`, `quantity`, `total`, `created_at`, `modified_at`) VALUES
(1,	1,	4,	2.00,	'2023-12-15 15:18:21',	'2023-12-16 08:22:25'),
(2,	1,	4,	2.00,	'2023-12-15 19:02:01',	'2023-12-16 08:22:25'),
(3,	2,	2,	2.00,	'2023-12-16 08:21:09',	'2023-12-16 08:21:09');

DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `cart_id` int NOT NULL,
  `payment_id` int DEFAULT NULL,
  `quantity` int NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `cart_id` (`cart_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `orders` (`id`, `cart_id`, `payment_id`, `quantity`, `total`, `created_at`, `modified_at`) VALUES
(6,	1,	3,	3,	2.00,	'2023-12-15 18:46:07',	'2023-12-15 18:46:07'),
(7,	1,	3,	3,	2.00,	'2023-12-15 18:48:06',	'2023-12-15 18:48:06'),
(9,	2,	2,	2,	4.00,	'2023-12-16 08:28:56',	'2023-12-16 08:28:56');

-- 2023-12-16 08:35:58
