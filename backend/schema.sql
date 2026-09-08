-- =======================================================
-- Online Food Ordering System - MySQL Database Schema
-- Database: food_ordering_db
-- =======================================================

CREATE DATABASE IF NOT EXISTS food_ordering_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE food_ordering_db;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(120) NOT NULL,
    full_name VARCHAR(100),
    phone VARCHAR(20),
    address VARCHAR(500),
    role VARCHAR(20) DEFAULT 'ROLE_USER',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Restaurants Table
CREATE TABLE IF NOT EXISTS restaurants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    tagline VARCHAR(255),
    cuisine_types VARCHAR(255),
    rating DOUBLE DEFAULT 4.5,
    total_ratings INT DEFAULT 100,
    delivery_time_minutes INT DEFAULT 30,
    delivery_fee DOUBLE DEFAULT 25.0,
    price_for_two INT DEFAULT 400,
    address VARCHAR(500),
    image_url VARCHAR(1000),
    is_featured BOOLEAN DEFAULT TRUE,
    is_open BOOLEAN DEFAULT TRUE
);

-- Food Items Table
CREATE TABLE IF NOT EXISTS food_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(1000),
    price DOUBLE NOT NULL,
    category VARCHAR(50) NOT NULL,
    sub_category VARCHAR(50),
    image_url VARCHAR(1000),
    is_veg BOOLEAN DEFAULT TRUE,
    is_spicy BOOLEAN DEFAULT FALSE,
    spice_level INT DEFAULT 1,
    calories INT DEFAULT 350,
    preparation_time_minutes INT DEFAULT 20,
    rating DOUBLE DEFAULT 4.5,
    is_available BOOLEAN DEFAULT TRUE,
    restaurant_id BIGINT,
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id) ON DELETE CASCADE
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_number VARCHAR(50) NOT NULL UNIQUE,
    user_id BIGINT NOT NULL,
    restaurant_id BIGINT NOT NULL,
    subtotal_amount DOUBLE,
    delivery_fee DOUBLE,
    taxes DOUBLE,
    discount DOUBLE,
    final_amount DOUBLE,
    status VARCHAR(30) NOT NULL DEFAULT 'CONFIRMED',
    delivery_address VARCHAR(500),
    contact_phone VARCHAR(20),
    payment_method VARCHAR(30) DEFAULT 'UPI',
    payment_status VARCHAR(30) DEFAULT 'PAID',
    customer_notes VARCHAR(500),
    estimated_delivery_minutes INT DEFAULT 30,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (restaurant_id) REFERENCES restaurants(id)
);

-- Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    order_id BIGINT NOT NULL,
    food_item_id BIGINT,
    food_name VARCHAR(100),
    price DOUBLE,
    quantity INT,
    special_instructions VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (food_item_id) REFERENCES food_items(id)
);
