select 
  title, reviewers.first_name, reviewers.last_name, rating
from books
left join reviews 
  on books.id = reviews.book_id
left join reviewers
  on reviews.reviewer_id = reviewers.id
order by title desc;