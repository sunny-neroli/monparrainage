CREATE DATABASE IF NOT EXISTS kingparrain;
USE kingparrain;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    userType ENUM('filleul', 'parrain') NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS brands (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo VARCHAR(255),
    rewardAmount DECIMAL(10,2),
    conditions TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sponsorships (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sponsorId INT,
    sponsoredId INT,
    brandId INT,
    status ENUM('pending', 'accepted', 'completed', 'rejected') DEFAULT 'pending',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sponsorId) REFERENCES users(id),
    FOREIGN KEY (sponsoredId) REFERENCES users(id),
    FOREIGN KEY (brandId) REFERENCES brands(id)
); 