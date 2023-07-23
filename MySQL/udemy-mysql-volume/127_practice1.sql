select title, round(avg(rating), 2) as avg_rating from books
  left join reviews on books.id = reviews.book_id
  group by books.id
  order by avg_rating desc;