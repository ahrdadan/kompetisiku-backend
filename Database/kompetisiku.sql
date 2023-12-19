-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 19, 2023 at 04:48 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kompetisiku`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `index` int(11) NOT NULL,
  `id` varchar(45) NOT NULL,
  `category` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `competitions`
--

CREATE TABLE `competitions` (
  `index` int(11) NOT NULL,
  `id` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
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
  `capacity` int(11) NOT NULL,
  `pricePerItem` int(11) NOT NULL,
  `description` mediumtext NOT NULL,
  `attachedFile` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `competitions`
--

INSERT INTO `competitions` (`index`, `id`, `title`, `categoryId`, `category`, `organizerId`, `organizerName`, `image`, `eventStart`, `eventEnd`, `location`, `reward`, `registrationOpen`, `registrationClose`, `capacity`, `pricePerItem`, `description`, `attachedFile`, `createdAt`, `updatedAt`) VALUES
(9, 'aU6zFXXVftDHFPH6', 'title1', 1, NULL, 'dMf1RP3RLQJFJtAF', 'newOrganizer2', 'link1', '2023-12-09', '2023-12-12', 'location1', 'reward1', '2023-12-09', '2023-12-12', 250, 50, 'description1', 'linkFile1', '2023-12-19 22:33:02', '2023-12-19 22:33:02'),
(11, 's6wg1j0V3B0cLe5D', 'title1', 0, 'debat', 'dMf1RP3RLQJFJtAF', 'newOrganizer2', 'link4', '2023-12-09', '2023-12-12', 'location4', 'reward4', '2023-12-09', '2023-12-12', 250, 50, 'description4', 'linkFile4', '2023-12-19 22:41:56', '2023-12-19 22:43:09'),
(8, 'u72IBgWBPs2Gyp5o', 'title1', 1, NULL, 'dMf1RP3RLQJFJtAF', 'newOrganizer2', 'link1', '2023-12-09', '2023-12-12', 'location1', 'reward1', '2023-12-09', '2023-12-12', 250, 50, 'description1', 'linkFile1', '2023-12-19 22:32:42', '2023-12-19 22:32:42');

-- --------------------------------------------------------

--
-- Table structure for table `data_forms`
--

CREATE TABLE `data_forms` (
  `id` int(11) NOT NULL,
  `competitionId` varchar(45) NOT NULL,
  `key` varchar(45) NOT NULL,
  `dataType` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `forms`
--

CREATE TABLE `forms` (
  `index` int(11) NOT NULL,
  `id` varchar(45) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `competitionId` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `dataId` int(11) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `latest_education`
--

CREATE TABLE `latest_education` (
  `id` int(11) NOT NULL,
  `education` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `latest_education`
--

INSERT INTO `latest_education` (`id`, `education`) VALUES
(1, 'SD Kelas 1'),
(2, 'SD Kelas 2'),
(3, 'SD Kelas 3'),
(4, 'SD Kelas 4'),
(5, 'SD Kelas 5'),
(6, 'SD Kelas 6'),
(7, 'SMP Kelas 1'),
(8, 'SMP Kelas 2'),
(9, 'SMP Kelas 3'),
(10, 'SMA Kelas 1'),
(11, 'SMA Kelas 2'),
(12, 'SMA Kelas 3'),
(13, 'D1'),
(14, 'D3'),
(15, 'D4/S1');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `index` int(11) NOT NULL,
  `id` varchar(45) NOT NULL,
  `formId` varchar(45) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `competitionId` varchar(45) NOT NULL,
  `title` varchar(45) NOT NULL,
  `pricePerItem` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`index`, `id`, `formId`, `userId`, `competitionId`, `title`, `pricePerItem`, `createdAt`, `updatedAt`) VALUES
(2, 'B3LLveEG39ktoIys', 'UYu1aOP7zocY4KSd', 'zjSiaV7yRp4tDqFu', 'BayhuyVTP5D6TCGk', 'title4', 0, '2023-12-16 14:16:51', '2023-12-16 14:16:51');

-- --------------------------------------------------------

--
-- Table structure for table `organizers`
--

CREATE TABLE `organizers` (
  `index` int(11) NOT NULL,
  `id` varchar(45) NOT NULL,
  `userId` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `organizerName` varchar(45) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `organizers`
--

INSERT INTO `organizers` (`index`, `id`, `userId`, `username`, `organizerName`, `createdAt`, `updatedAt`) VALUES
(7, 'dMf1RP3RLQJFJtAF', 'IWk8RU6-EbDXNtVw', 'newUsername1', 'newOrganizer2', '2023-12-19 22:29:33', '2023-12-19 22:30:01'),
(6, 'wUAWgsCWArs6M1sd', 'IWk8RU6-EbDXNtVw', 'username2', 'newOrganizer1', '2023-12-19 22:24:16', '2023-12-19 22:29:19');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `status`
--

INSERT INTO `status` (`id`, `status`) VALUES
(1, 'pelajar'),
(2, 'umum');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `index` int(11) NOT NULL,
  `id` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `gender` varchar(45) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  `latestEducationId` int(11) DEFAULT NULL,
  `latestEducation` varchar(45) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`index`, `id`, `username`, `email`, `password`, `phone`, `firstName`, `lastName`, `gender`, `birth`, `statusId`, `status`, `latestEducationId`, `latestEducation`, `createdAt`, `updatedAt`) VALUES
(10, 'IWk8RU6-EbDXNtVw', 'newUsername1', 'newEmail1@email.com', 'newPassword1', '08987654321', 'newFirstName1', 'newLastName1', 'female', '2010-08-07', 2, 'umum', 2, 'SD Kelas 2', '2023-12-19 22:21:22', '2023-12-19 22:26:48');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`index`),
  ADD UNIQUE KEY `index_UNIQUE` (`id`);

--
-- Indexes for table `competitions`
--
ALTER TABLE `competitions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `index_UNIQUE` (`index`),
  ADD KEY `competition-organizer_idx` (`organizerId`);

--
-- Indexes for table `data_forms`
--
ALTER TABLE `data_forms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `data_forms_idx` (`competitionId`);

--
-- Indexes for table `forms`
--
ALTER TABLE `forms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `index_UNIQUE` (`index`),
  ADD KEY `form-data_idx` (`dataId`);

--
-- Indexes for table `latest_education`
--
ALTER TABLE `latest_education`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_UNIQUE` (`index`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `organizers`
--
ALTER TABLE `organizers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `index_UNIQUE` (`index`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `organizer-user_idx` (`userId`);

--
-- Indexes for table `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`),
  ADD UNIQUE KEY `index_UNIQUE` (`index`),
  ADD KEY `user-status_idx` (`statusId`),
  ADD KEY `user-education_idx` (`latestEducationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `competitions`
--
ALTER TABLE `competitions`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `data_forms`
--
ALTER TABLE `data_forms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `forms`
--
ALTER TABLE `forms`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `latest_education`
--
ALTER TABLE `latest_education`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `organizers`
--
ALTER TABLE `organizers`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `index` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `competitions`
--
ALTER TABLE `competitions`
  ADD CONSTRAINT `competition-organizer` FOREIGN KEY (`organizerId`) REFERENCES `organizers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `data_forms`
--
ALTER TABLE `data_forms`
  ADD CONSTRAINT `data_form-competition` FOREIGN KEY (`competitionId`) REFERENCES `competitions` (`id`);

--
-- Constraints for table `forms`
--
ALTER TABLE `forms`
  ADD CONSTRAINT `form-data` FOREIGN KEY (`dataId`) REFERENCES `data_forms` (`id`);

--
-- Constraints for table `organizers`
--
ALTER TABLE `organizers`
  ADD CONSTRAINT `organizer-user` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `user-education` FOREIGN KEY (`latestEducationId`) REFERENCES `latest_education` (`id`),
  ADD CONSTRAINT `user-status` FOREIGN KEY (`statusId`) REFERENCES `status` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
