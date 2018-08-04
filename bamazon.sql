DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
	id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES
("Gum", "Sticky Floors", 1.50, 20),
("Advil", "Pharmacy", 10, 6),
("Paper", "Dying Trees", 2.50, 30),
("Hand Sanitizer", "No-Germs", 5.40, 4),
("Rubber Duck", "Bath Toys Section", 1.20, 9),
("Speakers", "My-Eardrum", 59.99, 12),
("Computer Monitor", "Computers", 150.00, 3),
("Water", "I'm-Thirsty", 1.00, 10),
("Febreeze", "You-stink", 3.99, 2),
("Game Boy Color", "Video Games", 59.99, 4);