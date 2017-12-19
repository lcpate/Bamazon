CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
	id INTEGER (10) AUTO_INCREMENT NOT NULL,
	product_name VARCHAR (50) NOT NULL,
	department_name VARCHAR (30) NOT NULL,
	price INTEGER (10) NOT NULL,
	stock_quantity INTEGER (10) NOT NULL,
	PRIMARY KEY (id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 1000, 57);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Black Columbia Jacket", "Womens Clothing", 150, 79);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Frying Pan", "Kitchen and Bath", 47, 348);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Degree Deodorant", "Personal Care", 5, 2609);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Ceiling Fan", "Home Décor", 139, 140);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Apple Watch Series 3", "Accessories", 350, 462);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Holiday Gift Bags 3Pack", "Holiday Supplies", 7, 265);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("UNC Christmas Ornament", "Holiday Supplies", 14, 36);

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("Outdoor String Lights", "Home Décor", 59, 102);

SELECT * FROM products;