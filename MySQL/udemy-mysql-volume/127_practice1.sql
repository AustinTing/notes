SELECT
    title, ROUND(AVG(rating), 2) as avg_rating
from books 
inner join reviews
on books.id=reviews.book_id
group by books.id
order by avg_rating desc;