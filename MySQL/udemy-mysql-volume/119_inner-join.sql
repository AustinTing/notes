
-- where could be replace with 'on'
SELECT * FROM customers
    INNER JOIN orders where customers.id=orders.customer_id;

SELECT first_name, last_name, SUM(amount) AS total_amount FROM customers
    INNER JOIN orders WHERE customers.id=orders.customer_id
    GROUP BY customers.id