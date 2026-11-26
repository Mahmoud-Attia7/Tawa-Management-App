-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 26, 2026 at 02:19 PM
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
-- Database: `tawa_management_application`
--

-- --------------------------------------------------------

--
-- Table structure for table `area`
--

CREATE TABLE `area` (
  `areaID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `area`
--

INSERT INTO `area` (`areaID`, `name`) VALUES
(20, 'الرياض'),
(21, 'الشرقية'),
(22, 'جده'),
(23, 'مكه'),
(24, 'الشمالية'),
(25, 'المدينة المنورة'),
(26, 'الجنوبية');

-- --------------------------------------------------------

--
-- Table structure for table `branch`
--

CREATE TABLE `branch` (
  `branchID` int(11) NOT NULL,
  `areaID` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL,
  `areaName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch`
--

INSERT INTO `branch` (`branchID`, `areaID`, `name`, `areaName`) VALUES
(35, 20, 'وادي لبن', 'الرياض'),
(36, 20, 'النهضة', 'الرياض'),
(37, 20, 'الندوة', 'الرياض'),
(38, 20, 'الروضة', 'الرياض'),
(39, 20, 'الصحافة', 'الرياض'),
(40, 20, 'اليرموك', 'الرياض'),
(41, 24, 'الشفا', 'الشمالية'),
(42, 22, 'التخصصي', 'جده'),
(43, 21, 'الملك فهد', 'الشرقية'),
(44, 20, 'الملك عبدالله', 'الرياض'),
(45, 26, 'التعاون', 'الجنوبية'),
(46, 25, 'الحمراء', 'المدينة المنورة'),
(47, 24, 'العزيزية', 'الشمالية'),
(48, 20, 'السويدي', 'الرياض'),
(49, 23, 'الدائري الغربي', 'مكه'),
(50, 22, 'قرطبة', 'جده'),
(51, 21, 'الروابي', 'الشرقية'),
(52, 26, 'ابها', 'الجنوبية'),
(53, 26, 'خميس مشيط', 'الجنوبية'),
(54, 26, 'نجران', 'الجنوبية'),
(55, 26, 'محايل عسير', 'الجنوبية'),
(56, 26, 'بيشة', 'الجنوبية'),
(57, 25, 'المدينة ساري', 'المدينة المنورة'),
(58, 25, 'المدينة بخاري', 'المدينة المنورة'),
(59, 24, 'بريدة', 'الشمالية'),
(60, 24, 'حائل', 'الشمالية'),
(61, 24, 'عرعر', 'الشمالية'),
(62, 24, 'سكاكا', 'الشمالية'),
(63, 24, 'تبوك', 'الشمالية'),
(64, 23, 'الطائف', 'مكه'),
(65, 23, 'الشوقية', 'مكه'),
(67, 23, 'العوالي', 'مكه'),
(68, 23, 'الشرائع', 'مكه'),
(69, 23, 'الباحة', 'مكه'),
(70, 22, 'التحلية', 'جده'),
(71, 22, 'الامير سلطان', 'جده'),
(72, 22, 'الاجاويد', 'جده'),
(73, 22, 'الحمدانية', 'جده'),
(74, 22, 'السامر', 'جده'),
(75, 22, 'النسيم', 'جده'),
(76, 21, 'الفيصلية', 'الشرقية'),
(77, 21, 'الخبر', 'الشرقية'),
(78, 21, 'حفر الباطن', 'الشرقية'),
(79, 21, 'الهفوف', 'الشرقية'),
(80, 21, 'المبرز', 'الشرقية'),
(81, 25, 'ينبع', 'المدينة المنورة'),
(82, 20, 'الدوادمي', 'الرياض'),
(83, 26, 'جازان', 'الجنوبية'),
(84, 21, 'الجبيل', 'الشرقية');

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`ID`, `name`) VALUES
(14, 'كيك'),
(15, 'حلا قهوة'),
(16, 'الفطائر'),
(17, 'حلا عربي'),
(18, 'التعبئة');

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order1`
--

CREATE TABLE `order1` (
  `ID` int(11) NOT NULL,
  `Quantity` int(11) DEFAULT NULL,
  `MasterID` int(11) DEFAULT NULL,
  `productID` int(11) DEFAULT NULL,
  `file_name` varchar(100) DEFAULT NULL,
  `shape` varchar(10) DEFAULT NULL,
  `levels` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order1`
--

INSERT INTO `order1` (`ID`, `Quantity`, `MasterID`, `productID`, `file_name`, `shape`, `levels`) VALUES
(370, 1, 145, 23, NULL, 'مستطيل', 2),
(374, 1, 146, 23, 'item374.jpg', 'مستطيل', 2),
(375, 2, 146, 26, 'item375.jpg', NULL, NULL),
(376, 5, 146, 27, 'item376.jpg', NULL, NULL),
(377, 2, 146, 28, NULL, NULL, NULL),
(378, 3, 146, 29, NULL, NULL, NULL),
(379, 3, 146, 30, NULL, NULL, NULL),
(380, 2, 146, 31, NULL, NULL, NULL),
(381, 4, 146, 32, NULL, NULL, NULL),
(382, 15, 146, 33, NULL, NULL, NULL),
(383, 3, 146, 34, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `order2`
--

CREATE TABLE `order2` (
  `orderID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `stuff_one` varchar(25) DEFAULT NULL,
  `stuff_two` varchar(25) DEFAULT NULL,
  `stuff_three` varchar(25) DEFAULT NULL,
  `stuff_four` varchar(25) DEFAULT NULL,
  `stuff_five` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order2`
--

INSERT INTO `order2` (`orderID`, `productID`, `stuff_one`, `stuff_two`, `stuff_three`, `stuff_four`, `stuff_five`) VALUES
(145, 23, 'dfs', '', '', '', ''),
(146, 376, 'نوتيلا', 'نوتيلا', 'نوتيلا', 'نوتيلا', 'نوتيلا'),
(146, 378, 'نوتيلا', 'عسل', '', '', ''),
(146, 380, 'عسل', 'ليمون', 'نوتيلا', '', ''),
(146, 381, 'نوتيلا', 'عسل', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `order3`
--

CREATE TABLE `order3` (
  `orderID` int(11) NOT NULL,
  `productID` int(11) NOT NULL,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `length` int(11) DEFAULT NULL,
  `layer` int(11) NOT NULL,
  `phrase` text DEFAULT NULL,
  `stuff` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order3`
--

INSERT INTO `order3` (`orderID`, `productID`, `width`, `height`, `length`, `layer`, `phrase`, `stuff`) VALUES
(146, 374, 4, 5, 3, 1, 'سعود', 'عسل'),
(146, 374, 6, 7, 5, 2, 'عبدالله', 'ليمون');

-- --------------------------------------------------------

--
-- Table structure for table `order_master`
--

CREATE TABLE `order_master` (
  `ID` int(11) NOT NULL,
  `Reference` text DEFAULT NULL,
  `UserID` int(11) DEFAULT NULL,
  `date` varchar(20) DEFAULT NULL,
  `branchID` int(11) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `submition_date` date DEFAULT NULL,
  `client_name` text DEFAULT NULL,
  `client_number` int(11) DEFAULT NULL,
  `is_widding` tinyint(1) DEFAULT NULL,
  `guest_number` int(11) DEFAULT NULL,
  `branchName` varchar(50) DEFAULT NULL,
  `employeeName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `order_master`
--

INSERT INTO `order_master` (`ID`, `Reference`, `UserID`, `date`, `branchID`, `status`, `submition_date`, `client_name`, `client_number`, `is_widding`, `guest_number`, `branchName`, `employeeName`) VALUES
(145, 'tye457543', 89, '2024-04-17', 35, 'انتهى', '2024-04-26', 'dfgsdfg', 547244048, 0, 1, 'الندوة', 'admin'),
(146, 'OR00325', 89, '2024-04-23', 35, 'جديد', '2024-04-27', 'سعود عبدالله', 547244048, 0, 1, 'التخصصي', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `reference` varchar(50) DEFAULT NULL,
  `measure_unit` varchar(10) DEFAULT NULL,
  `categoryID` int(11) DEFAULT NULL,
  `type` varchar(25) DEFAULT NULL,
  `department` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`ID`, `name`, `reference`, `measure_unit`, `categoryID`, `type`, `department`) VALUES
(23, 'cake', 'FG32', 'بالقطعة', 15, 'cake', 'cake'),
(26, 'كيك عسل', 'FG4658', 'بالقطعة', 14, 'normal', 'cake'),
(27, 'ميلفيه', 'FG793', 'بالقطعة', 14, 'stuff', 'cake'),
(28, 'معمول تمر', 'FG7539', 'بالكيلو', 14, 'normal', 'hala arabi'),
(29, 'معمول حشوة', 'FG853', 'بالكيلو', 14, 'stuff', 'hala arabi'),
(30, 'روشية', 'FG857', 'بالكيلو', 14, 'normal', 'hala coffe'),
(31, 'شوكولاتة حشوة', 'FG8573', 'بالكيلو', 14, 'stuff', 'hala coffe'),
(32, 'فطاير علبة', 'FG753', 'بالقطعة', 14, 'stuff', 'fatayer'),
(33, 'فطاير جبن', 'FG432', 'بالقطعة', 14, 'normal', 'fatayer'),
(34, 'شوكلاتة مغلف', 'FG8453', 'بالكيلو', 14, 'normal', 'red & chocolate');

-- --------------------------------------------------------

--
-- Table structure for table `product_stuffing`
--

CREATE TABLE `product_stuffing` (
  `productID` int(11) DEFAULT NULL,
  `stuffID` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product_stuffing`
--

INSERT INTO `product_stuffing` (`productID`, `stuffID`, `name`) VALUES
(18, 13, 'عسل'),
(18, 16, 'ليمون'),
(20, 14, 'نوتيلا'),
(20, 16, 'ليمون'),
(18, 14, 'نوتيلا'),
(21, 14, 'نوتيلا'),
(23, 13, 'عسل'),
(23, 16, 'ليمون'),
(25, 14, 'نوتيلا'),
(25, 16, 'ليمون'),
(27, 14, 'نوتيلا'),
(29, 14, 'نوتيلا'),
(31, 13, 'عسل'),
(31, 16, 'ليمون'),
(31, 14, 'نوتيلا'),
(32, 14, 'نوتيلا'),
(32, 16, 'ليمون'),
(32, 13, 'عسل'),
(29, 13, 'عسل');

-- --------------------------------------------------------

--
-- Table structure for table `role`
--

CREATE TABLE `role` (
  `ID` int(11) NOT NULL,
  `roleName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role`
--

INSERT INTO `role` (`ID`, `roleName`) VALUES
(17, 'admin'),
(15, 'branch'),
(18, 'cake'),
(21, 'fatayer'),
(19, 'hala arabi'),
(20, 'hala coffe'),
(5, 'read Areas'),
(6, 'read Branchs'),
(2, 'read categories'),
(1, 'read orders'),
(3, 'read Products'),
(7, 'read stuffs'),
(4, 'read Users'),
(22, 'red & chocolate'),
(16, 'relayer'),
(11, 'write area'),
(13, 'write branchs'),
(10, 'write category'),
(8, 'write order'),
(9, 'write product'),
(14, 'write stuff'),
(12, 'write user');

-- --------------------------------------------------------

--
-- Table structure for table `stuffing`
--

CREATE TABLE `stuffing` (
  `ID` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stuffing`
--

INSERT INTO `stuffing` (`ID`, `name`) VALUES
(13, 'عسل'),
(14, 'نوتيلا'),
(16, 'ليمون');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userID` int(11) NOT NULL,
  `userPassword` text DEFAULT NULL,
  `employeeName` text DEFAULT NULL,
  `phoneNumber` int(11) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `departmentID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userID`, `userPassword`, `employeeName`, `phoneNumber`, `email`, `role`, `departmentID`) VALUES
(89, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'admin', 345345, 'admin@tawa.com', 2, 4),
(90, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'branch', 97584274, 'branch@tawa.com', 2, 4),
(91, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'relayer', 409582348, 'relayer@tawa.com', 2, 4),
(94, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'cake@tawa.com', 344345, 'cake@tawa.com', 2, 4),
(95, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'arabi', 2421, 'arabi@tawa.com', 2, 4),
(96, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'cofee', 543, 'cofee@tawa.com', 2, 4),
(97, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'ftayer', 5435, 'ftayer@tawa.com', 2, 4),
(98, '$2y$10$wFf6HoC1q8vsJnzZaUUxkOan4.PB7JJJVa2zQbo/6YiC8eum.PNhm', 'chocolate', 234234, 'chocolate@tawa.com', 2, 4);

-- --------------------------------------------------------

--
-- Table structure for table `user_area`
--

CREATE TABLE `user_area` (
  `userID` int(11) NOT NULL,
  `areaID` int(11) NOT NULL,
  `create_date` date DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_area`
--

INSERT INTO `user_area` (`userID`, `areaID`, `create_date`, `creator`, `name`) VALUES
(89, 20, NULL, NULL, 'الرياض'),
(89, 21, NULL, NULL, 'الشرقية'),
(89, 22, NULL, NULL, 'جده'),
(89, 23, NULL, NULL, 'مكه'),
(89, 24, NULL, NULL, 'الشمالية'),
(89, 25, NULL, NULL, 'المدينة المنورة'),
(89, 26, NULL, NULL, 'الجنوبية'),
(91, 20, NULL, NULL, 'الرياض'),
(91, 21, NULL, NULL, 'الشرقية'),
(91, 22, NULL, NULL, 'جده'),
(91, 23, NULL, NULL, 'مكه'),
(91, 24, NULL, NULL, 'الشمالية'),
(91, 25, NULL, NULL, 'المدينة المنورة'),
(91, 26, NULL, NULL, 'الجنوبية'),
(94, 20, NULL, NULL, 'الرياض'),
(94, 21, NULL, NULL, 'الشرقية'),
(94, 22, NULL, NULL, 'جده'),
(94, 23, NULL, NULL, 'مكه'),
(94, 24, NULL, NULL, 'الشمالية'),
(94, 25, NULL, NULL, 'المدينة المنورة'),
(94, 26, NULL, NULL, 'الجنوبية'),
(95, 20, NULL, NULL, 'الرياض'),
(95, 21, NULL, NULL, 'الشرقية'),
(95, 22, NULL, NULL, 'جده'),
(95, 23, NULL, NULL, 'مكه'),
(95, 24, NULL, NULL, 'الشمالية'),
(95, 25, NULL, NULL, 'المدينة المنورة'),
(95, 26, NULL, NULL, 'الجنوبية'),
(96, 20, NULL, NULL, 'الرياض'),
(96, 21, NULL, NULL, 'الشرقية'),
(96, 22, NULL, NULL, 'جده'),
(96, 23, NULL, NULL, 'مكه'),
(96, 24, NULL, NULL, 'الشمالية'),
(96, 25, NULL, NULL, 'المدينة المنورة'),
(96, 26, NULL, NULL, 'الجنوبية'),
(97, 20, NULL, NULL, 'الرياض'),
(97, 21, NULL, NULL, 'الشرقية'),
(97, 22, NULL, NULL, 'جده'),
(97, 23, NULL, NULL, 'مكه'),
(97, 24, NULL, NULL, 'الشمالية'),
(97, 25, NULL, NULL, 'المدينة المنورة'),
(97, 26, NULL, NULL, 'الجنوبية'),
(98, 20, NULL, NULL, 'الرياض'),
(98, 21, NULL, NULL, 'الشرقية'),
(98, 22, NULL, NULL, 'جده'),
(98, 23, NULL, NULL, 'مكه'),
(98, 24, NULL, NULL, 'الشمالية'),
(98, 25, NULL, NULL, 'المدينة المنورة'),
(98, 26, NULL, NULL, 'الجنوبية');

-- --------------------------------------------------------

--
-- Table structure for table `user_branch`
--

CREATE TABLE `user_branch` (
  `userID` int(11) NOT NULL,
  `branchID` int(11) NOT NULL,
  `create_date` date DEFAULT NULL,
  `creator` int(11) DEFAULT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_branch`
--

INSERT INTO `user_branch` (`userID`, `branchID`, `create_date`, `creator`, `name`) VALUES
(89, 35, NULL, NULL, 'وادي لبن'),
(89, 36, NULL, NULL, 'النهضة'),
(89, 37, NULL, NULL, 'الندوة'),
(89, 38, NULL, NULL, 'الروضة'),
(89, 39, NULL, NULL, 'الصحافة'),
(89, 40, NULL, NULL, 'اليرموك'),
(89, 41, NULL, NULL, 'الشفا'),
(89, 42, NULL, NULL, 'التخصصي'),
(89, 43, NULL, NULL, 'الملك فهد'),
(89, 44, NULL, NULL, 'الملك عبدالله'),
(89, 45, NULL, NULL, 'التعاون'),
(89, 46, NULL, NULL, 'الحمراء'),
(89, 47, NULL, NULL, 'العزيزية'),
(89, 48, NULL, NULL, 'السويدي'),
(89, 49, NULL, NULL, 'الدائري الغربي'),
(89, 50, NULL, NULL, 'قرطبة'),
(89, 51, NULL, NULL, 'الروابي'),
(89, 52, NULL, NULL, 'ابها'),
(89, 53, NULL, NULL, 'خميس مشيط'),
(89, 54, NULL, NULL, 'نجران'),
(89, 55, NULL, NULL, 'محايل عسير'),
(89, 56, NULL, NULL, 'بيشة'),
(89, 57, NULL, NULL, 'المدينة ساري'),
(89, 58, NULL, NULL, 'المدينة بخاري'),
(89, 59, NULL, NULL, 'بريدة'),
(89, 60, NULL, NULL, 'حائل'),
(89, 61, NULL, NULL, 'عرعر'),
(89, 62, NULL, NULL, 'سكاكا'),
(89, 63, NULL, NULL, 'تبوك'),
(89, 64, NULL, NULL, 'الطائف'),
(89, 65, NULL, NULL, 'الشوقية'),
(89, 67, NULL, NULL, 'العوالي'),
(89, 68, NULL, NULL, 'الشرائع'),
(89, 69, NULL, NULL, 'الباحة'),
(89, 70, NULL, NULL, 'التحلية'),
(89, 71, NULL, NULL, 'الامير سلطان'),
(89, 72, NULL, NULL, 'الاجاويد'),
(89, 73, NULL, NULL, 'الحمدانية'),
(89, 74, NULL, NULL, 'السامر'),
(89, 75, NULL, NULL, 'النسيم'),
(89, 76, NULL, NULL, 'الفيصلية'),
(89, 77, NULL, NULL, 'الخبر'),
(89, 78, NULL, NULL, 'حفر الباطن'),
(89, 79, NULL, NULL, 'الهفوف'),
(89, 80, NULL, NULL, 'المبرز'),
(89, 81, NULL, NULL, 'ينبع'),
(89, 82, NULL, NULL, 'الدوادمي'),
(89, 83, NULL, NULL, 'جازان'),
(89, 84, NULL, NULL, 'الجبيل'),
(90, 35, NULL, NULL, 'وادي لبن'),
(90, 36, NULL, NULL, 'النهضة'),
(91, 35, NULL, NULL, 'وادي لبن'),
(91, 36, NULL, NULL, 'النهضة'),
(91, 37, NULL, NULL, 'الندوة'),
(91, 38, NULL, NULL, 'الروضة'),
(91, 39, NULL, NULL, 'الصحافة'),
(91, 40, NULL, NULL, 'اليرموك'),
(91, 41, NULL, NULL, 'الشفا'),
(91, 42, NULL, NULL, 'التخصصي'),
(91, 43, NULL, NULL, 'الملك فهد'),
(91, 44, NULL, NULL, 'الملك عبدالله'),
(91, 45, NULL, NULL, 'التعاون'),
(91, 46, NULL, NULL, 'الحمراء'),
(91, 47, NULL, NULL, 'العزيزية'),
(91, 48, NULL, NULL, 'السويدي'),
(91, 49, NULL, NULL, 'الدائري الغربي'),
(91, 50, NULL, NULL, 'قرطبة'),
(91, 51, NULL, NULL, 'الروابي'),
(91, 52, NULL, NULL, 'ابها'),
(91, 53, NULL, NULL, 'خميس مشيط'),
(91, 54, NULL, NULL, 'نجران'),
(91, 55, NULL, NULL, 'محايل عسير'),
(91, 56, NULL, NULL, 'بيشة'),
(91, 57, NULL, NULL, 'المدينة ساري'),
(91, 58, NULL, NULL, 'المدينة بخاري'),
(91, 59, NULL, NULL, 'بريدة'),
(91, 60, NULL, NULL, 'حائل'),
(91, 61, NULL, NULL, 'عرعر'),
(91, 62, NULL, NULL, 'سكاكا'),
(91, 63, NULL, NULL, 'تبوك'),
(91, 64, NULL, NULL, 'الطائف'),
(91, 65, NULL, NULL, 'الشوقية'),
(91, 67, NULL, NULL, 'العوالي'),
(91, 68, NULL, NULL, 'الشرائع'),
(91, 69, NULL, NULL, 'الباحة'),
(91, 70, NULL, NULL, 'التحلية'),
(91, 71, NULL, NULL, 'الامير سلطان'),
(91, 72, NULL, NULL, 'الاجاويد'),
(91, 73, NULL, NULL, 'الحمدانية'),
(91, 74, NULL, NULL, 'السامر'),
(91, 75, NULL, NULL, 'النسيم'),
(91, 76, NULL, NULL, 'الفيصلية'),
(91, 77, NULL, NULL, 'الخبر'),
(91, 78, NULL, NULL, 'حفر الباطن'),
(91, 79, NULL, NULL, 'الهفوف'),
(91, 80, NULL, NULL, 'المبرز'),
(91, 81, NULL, NULL, 'ينبع'),
(91, 82, NULL, NULL, 'الدوادمي'),
(91, 83, NULL, NULL, 'جازان'),
(91, 84, NULL, NULL, 'الجبيل'),
(94, 35, NULL, NULL, 'وادي لبن'),
(94, 36, NULL, NULL, 'النهضة'),
(94, 37, NULL, NULL, 'الندوة'),
(94, 38, NULL, NULL, 'الروضة'),
(94, 39, NULL, NULL, 'الصحافة'),
(94, 40, NULL, NULL, 'اليرموك'),
(94, 41, NULL, NULL, 'الشفا'),
(94, 42, NULL, NULL, 'التخصصي'),
(94, 43, NULL, NULL, 'الملك فهد'),
(94, 44, NULL, NULL, 'الملك عبدالله'),
(94, 45, NULL, NULL, 'التعاون'),
(94, 46, NULL, NULL, 'الحمراء'),
(94, 47, NULL, NULL, 'العزيزية'),
(94, 48, NULL, NULL, 'السويدي'),
(94, 49, NULL, NULL, 'الدائري الغربي'),
(94, 50, NULL, NULL, 'قرطبة'),
(94, 51, NULL, NULL, 'الروابي'),
(94, 52, NULL, NULL, 'ابها'),
(94, 53, NULL, NULL, 'خميس مشيط'),
(94, 54, NULL, NULL, 'نجران'),
(94, 55, NULL, NULL, 'محايل عسير'),
(94, 56, NULL, NULL, 'بيشة'),
(94, 57, NULL, NULL, 'المدينة ساري'),
(94, 58, NULL, NULL, 'المدينة بخاري'),
(94, 59, NULL, NULL, 'بريدة'),
(94, 60, NULL, NULL, 'حائل'),
(94, 61, NULL, NULL, 'عرعر'),
(94, 62, NULL, NULL, 'سكاكا'),
(94, 63, NULL, NULL, 'تبوك'),
(94, 64, NULL, NULL, 'الطائف'),
(94, 65, NULL, NULL, 'الشوقية'),
(94, 67, NULL, NULL, 'العوالي'),
(94, 68, NULL, NULL, 'الشرائع'),
(94, 69, NULL, NULL, 'الباحة'),
(94, 70, NULL, NULL, 'التحلية'),
(94, 71, NULL, NULL, 'الامير سلطان'),
(94, 72, NULL, NULL, 'الاجاويد'),
(94, 73, NULL, NULL, 'الحمدانية'),
(94, 74, NULL, NULL, 'السامر'),
(94, 75, NULL, NULL, 'النسيم'),
(94, 76, NULL, NULL, 'الفيصلية'),
(94, 77, NULL, NULL, 'الخبر'),
(94, 78, NULL, NULL, 'حفر الباطن'),
(94, 79, NULL, NULL, 'الهفوف'),
(94, 80, NULL, NULL, 'المبرز'),
(94, 81, NULL, NULL, 'ينبع'),
(94, 82, NULL, NULL, 'الدوادمي'),
(94, 83, NULL, NULL, 'جازان'),
(94, 84, NULL, NULL, 'الجبيل'),
(95, 35, NULL, NULL, 'وادي لبن'),
(95, 36, NULL, NULL, 'النهضة'),
(95, 37, NULL, NULL, 'الندوة'),
(95, 38, NULL, NULL, 'الروضة'),
(95, 39, NULL, NULL, 'الصحافة'),
(95, 40, NULL, NULL, 'اليرموك'),
(95, 41, NULL, NULL, 'الشفا'),
(95, 42, NULL, NULL, 'التخصصي'),
(95, 43, NULL, NULL, 'الملك فهد'),
(95, 44, NULL, NULL, 'الملك عبدالله'),
(95, 45, NULL, NULL, 'التعاون'),
(95, 46, NULL, NULL, 'الحمراء'),
(95, 47, NULL, NULL, 'العزيزية'),
(95, 48, NULL, NULL, 'السويدي'),
(95, 49, NULL, NULL, 'الدائري الغربي'),
(95, 50, NULL, NULL, 'قرطبة'),
(95, 51, NULL, NULL, 'الروابي'),
(95, 52, NULL, NULL, 'ابها'),
(95, 53, NULL, NULL, 'خميس مشيط'),
(95, 54, NULL, NULL, 'نجران'),
(95, 55, NULL, NULL, 'محايل عسير'),
(95, 56, NULL, NULL, 'بيشة'),
(95, 57, NULL, NULL, 'المدينة ساري'),
(95, 58, NULL, NULL, 'المدينة بخاري'),
(95, 59, NULL, NULL, 'بريدة'),
(95, 60, NULL, NULL, 'حائل'),
(95, 61, NULL, NULL, 'عرعر'),
(95, 62, NULL, NULL, 'سكاكا'),
(95, 63, NULL, NULL, 'تبوك'),
(95, 64, NULL, NULL, 'الطائف'),
(95, 65, NULL, NULL, 'الشوقية'),
(95, 67, NULL, NULL, 'العوالي'),
(95, 68, NULL, NULL, 'الشرائع'),
(95, 69, NULL, NULL, 'الباحة'),
(95, 70, NULL, NULL, 'التحلية'),
(95, 71, NULL, NULL, 'الامير سلطان'),
(95, 72, NULL, NULL, 'الاجاويد'),
(95, 73, NULL, NULL, 'الحمدانية'),
(95, 74, NULL, NULL, 'السامر'),
(95, 75, NULL, NULL, 'النسيم'),
(95, 76, NULL, NULL, 'الفيصلية'),
(95, 77, NULL, NULL, 'الخبر'),
(95, 78, NULL, NULL, 'حفر الباطن'),
(95, 79, NULL, NULL, 'الهفوف'),
(95, 80, NULL, NULL, 'المبرز'),
(95, 81, NULL, NULL, 'ينبع'),
(95, 82, NULL, NULL, 'الدوادمي'),
(95, 83, NULL, NULL, 'جازان'),
(95, 84, NULL, NULL, 'الجبيل'),
(96, 35, NULL, NULL, 'وادي لبن'),
(96, 36, NULL, NULL, 'النهضة'),
(96, 37, NULL, NULL, 'الندوة'),
(96, 38, NULL, NULL, 'الروضة'),
(96, 39, NULL, NULL, 'الصحافة'),
(96, 40, NULL, NULL, 'اليرموك'),
(96, 41, NULL, NULL, 'الشفا'),
(96, 42, NULL, NULL, 'التخصصي'),
(96, 43, NULL, NULL, 'الملك فهد'),
(96, 44, NULL, NULL, 'الملك عبدالله'),
(96, 45, NULL, NULL, 'التعاون'),
(96, 46, NULL, NULL, 'الحمراء'),
(96, 47, NULL, NULL, 'العزيزية'),
(96, 48, NULL, NULL, 'السويدي'),
(96, 49, NULL, NULL, 'الدائري الغربي'),
(96, 50, NULL, NULL, 'قرطبة'),
(96, 51, NULL, NULL, 'الروابي'),
(96, 52, NULL, NULL, 'ابها'),
(96, 53, NULL, NULL, 'خميس مشيط'),
(96, 54, NULL, NULL, 'نجران'),
(96, 55, NULL, NULL, 'محايل عسير'),
(96, 56, NULL, NULL, 'بيشة'),
(96, 57, NULL, NULL, 'المدينة ساري'),
(96, 58, NULL, NULL, 'المدينة بخاري'),
(96, 59, NULL, NULL, 'بريدة'),
(96, 60, NULL, NULL, 'حائل'),
(96, 61, NULL, NULL, 'عرعر'),
(96, 62, NULL, NULL, 'سكاكا'),
(96, 63, NULL, NULL, 'تبوك'),
(96, 64, NULL, NULL, 'الطائف'),
(96, 65, NULL, NULL, 'الشوقية'),
(96, 67, NULL, NULL, 'العوالي'),
(96, 68, NULL, NULL, 'الشرائع'),
(96, 69, NULL, NULL, 'الباحة'),
(96, 70, NULL, NULL, 'التحلية'),
(96, 71, NULL, NULL, 'الامير سلطان'),
(96, 72, NULL, NULL, 'الاجاويد'),
(96, 73, NULL, NULL, 'الحمدانية'),
(96, 74, NULL, NULL, 'السامر'),
(96, 75, NULL, NULL, 'النسيم'),
(96, 76, NULL, NULL, 'الفيصلية'),
(96, 77, NULL, NULL, 'الخبر'),
(96, 78, NULL, NULL, 'حفر الباطن'),
(96, 79, NULL, NULL, 'الهفوف'),
(96, 80, NULL, NULL, 'المبرز'),
(96, 81, NULL, NULL, 'ينبع'),
(96, 82, NULL, NULL, 'الدوادمي'),
(96, 83, NULL, NULL, 'جازان'),
(96, 84, NULL, NULL, 'الجبيل'),
(97, 35, NULL, NULL, 'وادي لبن'),
(97, 36, NULL, NULL, 'النهضة'),
(97, 37, NULL, NULL, 'الندوة'),
(97, 38, NULL, NULL, 'الروضة'),
(97, 39, NULL, NULL, 'الصحافة'),
(97, 40, NULL, NULL, 'اليرموك'),
(97, 41, NULL, NULL, 'الشفا'),
(97, 42, NULL, NULL, 'التخصصي'),
(97, 43, NULL, NULL, 'الملك فهد'),
(97, 44, NULL, NULL, 'الملك عبدالله'),
(97, 45, NULL, NULL, 'التعاون'),
(97, 46, NULL, NULL, 'الحمراء'),
(97, 47, NULL, NULL, 'العزيزية'),
(97, 48, NULL, NULL, 'السويدي'),
(97, 49, NULL, NULL, 'الدائري الغربي'),
(97, 50, NULL, NULL, 'قرطبة'),
(97, 51, NULL, NULL, 'الروابي'),
(97, 52, NULL, NULL, 'ابها'),
(97, 53, NULL, NULL, 'خميس مشيط'),
(97, 54, NULL, NULL, 'نجران'),
(97, 55, NULL, NULL, 'محايل عسير'),
(97, 56, NULL, NULL, 'بيشة'),
(97, 57, NULL, NULL, 'المدينة ساري'),
(97, 58, NULL, NULL, 'المدينة بخاري'),
(97, 59, NULL, NULL, 'بريدة'),
(97, 60, NULL, NULL, 'حائل'),
(97, 61, NULL, NULL, 'عرعر'),
(97, 62, NULL, NULL, 'سكاكا'),
(97, 63, NULL, NULL, 'تبوك'),
(97, 64, NULL, NULL, 'الطائف'),
(97, 65, NULL, NULL, 'الشوقية'),
(97, 67, NULL, NULL, 'العوالي'),
(97, 68, NULL, NULL, 'الشرائع'),
(97, 69, NULL, NULL, 'الباحة'),
(97, 70, NULL, NULL, 'التحلية'),
(97, 71, NULL, NULL, 'الامير سلطان'),
(97, 72, NULL, NULL, 'الاجاويد'),
(97, 73, NULL, NULL, 'الحمدانية'),
(97, 74, NULL, NULL, 'السامر'),
(97, 75, NULL, NULL, 'النسيم'),
(97, 76, NULL, NULL, 'الفيصلية'),
(97, 77, NULL, NULL, 'الخبر'),
(97, 78, NULL, NULL, 'حفر الباطن'),
(97, 79, NULL, NULL, 'الهفوف'),
(97, 80, NULL, NULL, 'المبرز'),
(97, 81, NULL, NULL, 'ينبع'),
(97, 82, NULL, NULL, 'الدوادمي'),
(97, 83, NULL, NULL, 'جازان'),
(97, 84, NULL, NULL, 'الجبيل'),
(98, 35, NULL, NULL, 'وادي لبن'),
(98, 36, NULL, NULL, 'النهضة'),
(98, 37, NULL, NULL, 'الندوة'),
(98, 38, NULL, NULL, 'الروضة'),
(98, 39, NULL, NULL, 'الصحافة'),
(98, 40, NULL, NULL, 'اليرموك'),
(98, 41, NULL, NULL, 'الشفا'),
(98, 42, NULL, NULL, 'التخصصي'),
(98, 43, NULL, NULL, 'الملك فهد'),
(98, 44, NULL, NULL, 'الملك عبدالله'),
(98, 45, NULL, NULL, 'التعاون'),
(98, 46, NULL, NULL, 'الحمراء'),
(98, 47, NULL, NULL, 'العزيزية'),
(98, 48, NULL, NULL, 'السويدي'),
(98, 49, NULL, NULL, 'الدائري الغربي'),
(98, 50, NULL, NULL, 'قرطبة'),
(98, 51, NULL, NULL, 'الروابي'),
(98, 52, NULL, NULL, 'ابها'),
(98, 53, NULL, NULL, 'خميس مشيط'),
(98, 54, NULL, NULL, 'نجران'),
(98, 55, NULL, NULL, 'محايل عسير'),
(98, 56, NULL, NULL, 'بيشة'),
(98, 57, NULL, NULL, 'المدينة ساري'),
(98, 58, NULL, NULL, 'المدينة بخاري'),
(98, 59, NULL, NULL, 'بريدة'),
(98, 60, NULL, NULL, 'حائل'),
(98, 61, NULL, NULL, 'عرعر'),
(98, 62, NULL, NULL, 'سكاكا'),
(98, 63, NULL, NULL, 'تبوك'),
(98, 64, NULL, NULL, 'الطائف'),
(98, 65, NULL, NULL, 'الشوقية'),
(98, 67, NULL, NULL, 'العوالي'),
(98, 68, NULL, NULL, 'الشرائع'),
(98, 69, NULL, NULL, 'الباحة'),
(98, 70, NULL, NULL, 'التحلية'),
(98, 71, NULL, NULL, 'الامير سلطان'),
(98, 72, NULL, NULL, 'الاجاويد'),
(98, 73, NULL, NULL, 'الحمدانية'),
(98, 74, NULL, NULL, 'السامر'),
(98, 75, NULL, NULL, 'النسيم'),
(98, 76, NULL, NULL, 'الفيصلية'),
(98, 77, NULL, NULL, 'الخبر'),
(98, 78, NULL, NULL, 'حفر الباطن'),
(98, 79, NULL, NULL, 'الهفوف'),
(98, 80, NULL, NULL, 'المبرز'),
(98, 81, NULL, NULL, 'ينبع'),
(98, 82, NULL, NULL, 'الدوادمي'),
(98, 83, NULL, NULL, 'جازان'),
(98, 84, NULL, NULL, 'الجبيل');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `userID` int(11) NOT NULL,
  `roleID` int(11) NOT NULL,
  `isAvailable` int(11) DEFAULT NULL,
  `roleName` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`userID`, `roleID`, `isAvailable`, `roleName`) VALUES
(89, 1, 1, 'read orders'),
(89, 2, 1, 'read categories'),
(89, 3, 1, 'read Products'),
(89, 4, 1, 'read Users'),
(89, 5, 1, 'read Areas'),
(89, 6, 1, 'read Branchs'),
(89, 7, 1, 'read stuffs'),
(89, 8, 1, 'write order'),
(89, 9, 1, 'write product'),
(89, 10, 1, 'write category'),
(89, 11, 1, 'write area'),
(89, 12, 1, 'write user'),
(89, 13, 1, 'write branchs'),
(89, 14, 1, 'write stuff'),
(89, 15, 1, 'branch'),
(89, 16, 0, 'relayer'),
(89, 17, 0, 'admin'),
(89, 18, 0, 'cake'),
(89, 19, 0, 'hala arabi'),
(89, 20, 0, 'hala coffe'),
(89, 21, 0, 'fatayer'),
(89, 22, 0, 'red & chocolate'),
(90, 1, 1, 'read orders'),
(90, 2, 1, 'read categories'),
(90, 3, 1, 'read Products'),
(90, 4, 0, 'read Users'),
(90, 5, 0, 'read Areas'),
(90, 6, 0, 'read Branchs'),
(90, 7, 1, 'read stuffs'),
(90, 8, 1, 'write order'),
(90, 9, 0, 'write product'),
(90, 10, 0, 'write category'),
(90, 11, 0, 'write area'),
(90, 12, 0, 'write user'),
(90, 13, 0, 'write branchs'),
(90, 14, 0, 'write stuff'),
(90, 15, 1, 'branch'),
(90, 16, 0, 'relayer'),
(90, 17, 0, 'admin'),
(90, 18, 0, 'cake'),
(90, 19, 0, 'hala arabi'),
(90, 20, 0, 'hala coffe'),
(90, 21, 0, 'fatayer'),
(90, 22, 0, 'red & chocolate'),
(91, 1, 1, 'read orders'),
(91, 2, 0, 'read categories'),
(91, 3, 0, 'read Products'),
(91, 4, 0, 'read Users'),
(91, 5, 0, 'read Areas'),
(91, 6, 0, 'read Branchs'),
(91, 7, 0, 'read stuffs'),
(91, 8, 1, 'write order'),
(91, 9, 0, 'write product'),
(91, 10, 0, 'write category'),
(91, 11, 0, 'write area'),
(91, 12, 0, 'write user'),
(91, 13, 0, 'write branchs'),
(91, 14, 0, 'write stuff'),
(91, 15, 0, 'branch'),
(91, 16, 1, 'relayer'),
(91, 17, 0, 'admin'),
(91, 18, 0, 'cake'),
(91, 19, 0, 'hala arabi'),
(91, 20, 0, 'hala coffe'),
(91, 21, 0, 'fatayer'),
(91, 22, 0, 'red & chocolate'),
(94, 1, 1, 'read orders'),
(94, 2, 1, 'read categories'),
(94, 3, 1, 'read Products'),
(94, 4, 0, 'read Users'),
(94, 5, 0, 'read Areas'),
(94, 6, 0, 'read Branchs'),
(94, 7, 1, 'read stuffs'),
(94, 8, 0, 'write order'),
(94, 9, 1, 'write product'),
(94, 10, 1, 'write category'),
(94, 11, 0, 'write area'),
(94, 12, 0, 'write user'),
(94, 13, 0, 'write branchs'),
(94, 14, 1, 'write stuff'),
(94, 15, 0, 'branch'),
(94, 16, 0, 'relayer'),
(94, 17, 0, 'admin'),
(94, 18, 1, 'cake'),
(94, 19, 0, 'hala arabi'),
(94, 20, 0, 'hala coffe'),
(94, 21, 0, 'fatayer'),
(94, 22, 0, 'red & chocolate'),
(95, 1, 1, 'read orders'),
(95, 2, 1, 'read categories'),
(95, 3, 1, 'read Products'),
(95, 4, 0, 'read Users'),
(95, 5, 0, 'read Areas'),
(95, 6, 0, 'read Branchs'),
(95, 7, 1, 'read stuffs'),
(95, 8, 0, 'write order'),
(95, 9, 1, 'write product'),
(95, 10, 1, 'write category'),
(95, 11, 0, 'write area'),
(95, 12, 0, 'write user'),
(95, 13, 0, 'write branchs'),
(95, 14, 1, 'write stuff'),
(95, 15, 0, 'branch'),
(95, 16, 0, 'relayer'),
(95, 17, 0, 'admin'),
(95, 18, 0, 'cake'),
(95, 19, 1, 'hala arabi'),
(95, 20, 0, 'hala coffe'),
(95, 21, 0, 'fatayer'),
(95, 22, 0, 'red & chocolate'),
(96, 1, 1, 'read orders'),
(96, 2, 1, 'read categories'),
(96, 3, 1, 'read Products'),
(96, 4, 0, 'read Users'),
(96, 5, 0, 'read Areas'),
(96, 6, 0, 'read Branchs'),
(96, 7, 1, 'read stuffs'),
(96, 8, 0, 'write order'),
(96, 9, 1, 'write product'),
(96, 10, 1, 'write category'),
(96, 11, 0, 'write area'),
(96, 12, 0, 'write user'),
(96, 13, 0, 'write branchs'),
(96, 14, 1, 'write stuff'),
(96, 15, 0, 'branch'),
(96, 16, 0, 'relayer'),
(96, 17, 0, 'admin'),
(96, 18, 0, 'cake'),
(96, 19, 0, 'hala arabi'),
(96, 20, 1, 'hala coffe'),
(96, 21, 0, 'fatayer'),
(96, 22, 0, 'red & chocolate'),
(97, 1, 1, 'read orders'),
(97, 2, 1, 'read categories'),
(97, 3, 1, 'read Products'),
(97, 4, 0, 'read Users'),
(97, 5, 0, 'read Areas'),
(97, 6, 0, 'read Branchs'),
(97, 7, 1, 'read stuffs'),
(97, 8, 0, 'write order'),
(97, 9, 1, 'write product'),
(97, 10, 1, 'write category'),
(97, 11, 0, 'write area'),
(97, 12, 0, 'write user'),
(97, 13, 0, 'write branchs'),
(97, 14, 1, 'write stuff'),
(97, 15, 0, 'branch'),
(97, 16, 0, 'relayer'),
(97, 17, 0, 'admin'),
(97, 18, 0, 'cake'),
(97, 19, 0, 'hala arabi'),
(97, 20, 0, 'hala coffe'),
(97, 21, 1, 'fatayer'),
(97, 22, 0, 'red & chocolate'),
(98, 1, 1, 'read orders'),
(98, 2, 1, 'read categories'),
(98, 3, 1, 'read Products'),
(98, 4, 0, 'read Users'),
(98, 5, 0, 'read Areas'),
(98, 6, 0, 'read Branchs'),
(98, 7, 1, 'read stuffs'),
(98, 8, 0, 'write order'),
(98, 9, 1, 'write product'),
(98, 10, 1, 'write category'),
(98, 11, 0, 'write area'),
(98, 12, 1, 'write user'),
(98, 13, 0, 'write branchs'),
(98, 14, 0, 'write stuff'),
(98, 15, 0, 'branch'),
(98, 16, 0, 'relayer'),
(98, 17, 0, 'admin'),
(98, 18, 0, 'cake'),
(98, 19, 0, 'hala arabi'),
(98, 20, 0, 'hala coffe'),
(98, 21, 0, 'fatayer'),
(98, 22, 1, 'red & chocolate');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `area`
--
ALTER TABLE `area`
  ADD PRIMARY KEY (`areaID`);

--
-- Indexes for table `branch`
--
ALTER TABLE `branch`
  ADD PRIMARY KEY (`branchID`),
  ADD KEY `areaID` (`areaID`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `order1`
--
ALTER TABLE `order1`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `MasterID_index` (`MasterID`);

--
-- Indexes for table `order2`
--
ALTER TABLE `order2`
  ADD PRIMARY KEY (`orderID`,`productID`);

--
-- Indexes for table `order3`
--
ALTER TABLE `order3`
  ADD PRIMARY KEY (`orderID`,`productID`,`layer`);

--
-- Indexes for table `order_master`
--
ALTER TABLE `order_master`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `unique_roleName` (`roleName`);

--
-- Indexes for table `stuffing`
--
ALTER TABLE `stuffing`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `phoneNumber` (`phoneNumber`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_index` (`role`);

--
-- Indexes for table `user_area`
--
ALTER TABLE `user_area`
  ADD PRIMARY KEY (`userID`,`areaID`),
  ADD KEY `areaID_index` (`areaID`);

--
-- Indexes for table `user_branch`
--
ALTER TABLE `user_branch`
  ADD PRIMARY KEY (`userID`,`branchID`),
  ADD KEY `branchID_index` (`branchID`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`userID`,`roleID`),
  ADD KEY `FK_user_role_role_index` (`roleID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `area`
--
ALTER TABLE `area`
  MODIFY `areaID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `branch`
--
ALTER TABLE `branch`
  MODIFY `branchID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `order1`
--
ALTER TABLE `order1`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=384;

--
-- AUTO_INCREMENT for table `order_master`
--
ALTER TABLE `order_master`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=147;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `role`
--
ALTER TABLE `role`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `stuffing`
--
ALTER TABLE `stuffing`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
