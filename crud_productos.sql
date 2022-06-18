-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 18-06-2022 a las 22:15:56
-- Versión del servidor: 10.4.11-MariaDB
-- Versión de PHP: 7.4.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `test`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `crud_productos`
--

CREATE TABLE `crud_productos` (
  `id` int(11) NOT NULL,
  `sku` varchar(20) NOT NULL,
  `descripcion` varchar(60) NOT NULL,
  `costo` decimal(12,2) NOT NULL,
  `existencia` int(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `crud_productos`
--

INSERT INTO `crud_productos` (`id`, `sku`, `descripcion`, `costo`, `existencia`) VALUES
(2, '123', 'Martillo\r\n                   ', '100.00', 20),
(3, '456', 'Pala\r\n                   ', '400.00', 33),
(4, '678', 'Pico\r\n                   ', '300.00', 44),
(5, '444', 'Carretilla\r\n                   ', '600.00', 34),
(8, '555', 'Cabillas\r\n                   ', '100.00', 10);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `crud_productos`
--
ALTER TABLE `crud_productos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `crud_productos`
--
ALTER TABLE `crud_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
