-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 07, 2024 at 04:06 AM
-- Server version: 8.0.30
-- PHP Version: 8.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web_nodejs_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `nhom`
--

CREATE TABLE `nhom` (
  `idnhom` int NOT NULL,
  `ten` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `nhom`
--

INSERT INTO `nhom` (`idnhom`, `ten`) VALUES
(1, 'Điện thoại di động'),
(2, 'Laptop'),
(3, 'Máy tính bảng'),
(4, 'Phụ kiện điện tử'),
(5, 'Thiết bị gia dụng'),
(6, 'Tivi & Màn hình'),
(7, 'Đồ dùng nhà bếp'),
(8, 'Máy ảnh'),
(9, 'Thiết bị văn phòng'),
(10, 'Đồng hồ thông minh');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` int NOT NULL,
  `ten` varchar(255) NOT NULL,
  `gia` decimal(10,2) NOT NULL,
  `hinhanh` varchar(255) DEFAULT NULL,
  `mota` text,
  `idnhom` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `ten`, `gia`, `hinhanh`, `mota`, `idnhom`) VALUES
(1, 'iPhone 14', '24000000.00', 'iphone14.jpg', 'Điện thoại iPhone 14 mới nhất của Apple', 1),
(2, 'Samsung Galaxy S22', '21000000.00', 'galaxy_s22.jpg', 'Điện thoại Samsung với camera tiên tiến', 1),
(3, 'MacBook Air M2', '28000000.00', 'macbook_air_m2.jpg', 'Laptop siêu nhẹ, chip M2 mạnh mẽ', 2),
(4, 'Dell XPS 13', '32000000.00', 'dell_xps13.jpg', 'Laptop Dell cao cấp với màn hình InfinityEdge', 2),
(5, 'iPad Pro 11 inch', '20000000.00', 'ipad_pro_11.jpg', 'Máy tính bảng với chip M1 của Apple', 3),
(6, 'Apple Watch Series 8', '10000000.00', 'apple_watch8.jpg', 'Đồng hồ thông minh, theo dõi sức khỏe', 10),
(7, 'Tai nghe Bluetooth Sony', '500000.00', 'sony_headphone.jpg', 'Tai nghe không dây, âm thanh chất lượng cao', 4),
(8, 'Tivi Samsung 55 inch', '18000000.00', 'samsung_tv_55.jpg', 'Tivi màn hình lớn, độ phân giải 4K', 6),
(9, 'Lò vi sóng Panasonic', '3000000.00', 'panasonic_microwave.jpg', 'Lò vi sóng tiện dụng cho nhà bếp', 7),
(10, 'Máy in Canon LBP2900', '2500000.00', 'canon_lbp2900.jpg', 'Máy in laser đen trắng cho văn phòng nhỏ', 9);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `address` text,
  `sex` enum('male','female','other') NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` varchar(5) NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `fullname`, `address`, `sex`, `email`, `role`) VALUES
(13, 'admin', '$2b$10$q.TjrcA35xP8CsrrXEi7MuFj1H.y.fuEVfZVfQrNi8rvue0.7KYBq', 'Trương Chí Khanh', 'AG', 'male', 'user1@gmail.com', 'admin'),
(14, 'user2', '$2b$10$kDg3QqIv/wZhP0dQsjB71.Q8AalFIhghk8CSItRCawV8KVnGl96AO', 'User2', 'AG', 'male', 'user2@gmail.com', 'user'),
(18, 'user3', '$2b$10$yziWa7ayJHh2mgqXysoPAuewhv7chO3KGcjcd8pbSaVnqXL6WbSOK', 'User3', 'AG', 'male', 'user3@gmail.com', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `nhom`
--
ALTER TABLE `nhom`
  ADD PRIMARY KEY (`idnhom`);

--
-- Indexes for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD PRIMARY KEY (`masp`),
  ADD KEY `idnhom` (`idnhom`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `nhom`
--
ALTER TABLE `nhom`
  MODIFY `idnhom` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `sanpham`
--
ALTER TABLE `sanpham`
  MODIFY `masp` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `sanpham`
--
ALTER TABLE `sanpham`
  ADD CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`idnhom`) REFERENCES `nhom` (`idnhom`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
