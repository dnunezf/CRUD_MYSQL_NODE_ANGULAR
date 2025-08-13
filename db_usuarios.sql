-- Crear la base de datos
CREATE DATABASE db_usuarios;

-- Seleccionar la base de datos para trabajarla
USE db_usuarios;

-- Crear la tabla con los campos id, nombre, email
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);