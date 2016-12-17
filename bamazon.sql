-- phpMyAdmin SQL Dump
-- version 4.4.12
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Oct 01, 2016 at 07:16 PM
-- Server version: 5.6.25
-- PHP Version: 5.5.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `premiere`
--
create database bamazon;
use bamazon;

-- --------------------------------------------------------
--
-- Table structure for table `part`
--

CREATE TABLE IF NOT EXISTS `product` (
  `item_id` char(4) NOT NULL PRIMARY KEY,
  `product_name` char(15) NOT NULL,
  `department_name` varchar(50) NOT NULL,
  `price` decimal(6,2) DEFAULT 0,
  `stock_quantity` integer(4) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `part`
--

INSERT INTO `product` (`item_id`, `product_name`, `department_name`, `price`, `stock_quantity`) VALUES
('AT94', 'Iron', 'Appliances', '24.95', '50'),
('BV06', 'Home Gym', 'Sports and Fitness', '794.95', '45'),
('CD52', 'Microwave Oven', 'Appliances', '165.00', '32'),
('DL71', 'Cordless Drill', 'Hardware', '129.95', '21'),
('DR93', 'Gas Range', 'Appliances', '495.00', '8'),
('DW11', 'Washer', 'Appliances', '399.99', '12'),
('FD21', 'Stand Mixer', 'Appliances', '159.95', '22'),
('KL62', 'Dryer', 'Appliances', '349.95', '12'),
('KT03', 'Dishwasher', 'Appliances', '595.00', '8'),
('KV29', 'Treadmill', 'Sports and Fitness', '1390.00', '9');

