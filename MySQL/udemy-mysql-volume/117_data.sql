CREATE TABLE customers(
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    email VARCHAR(100) 
);

INSERT INTO customers(first_name, last_name, email) VALUES
    ('Robin', 'Jackman', 'roj@gmail.com'),
    ('Taylor', 'Edward', 'taed@gmail.com'),
    ('Vivian', 'Dickens', 'vidi@gmail.com'),
    ('Harley', 'Gilbert', 'hgi@gmail.com');

CREATE TABLE orders(
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE,
    amount DECIMAL(8,2),
    customer_id INT,
    FOREIGN KEY(customer_id) REFERENCES customers(id)
);

INSERT INTO orders(order_date, amount, customer_id) VALUES
    ('2001-10-12', 99.12, 1),
    ('2001-09-21', 110.99, 2),
    ('2001-10-13', 12.19, 1),
    ('2001-11-29', 88.09, 3),
    ('2001-11-11', 205.01, 4);
