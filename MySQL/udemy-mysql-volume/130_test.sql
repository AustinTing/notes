SELECT
  book_title,
  reviewer_first_name,
  reviewer_last_name,
  average_rating
FROM (
  SELECT
    books.title AS book_title,
    reviewers.first_name AS reviewer_first_name,
    reviewers.last_name AS reviewer_last_name,
    AVG(reviews.rating) AS average_rating
  FROM
    books
  INNER JOIN
    reviews ON books.id = reviews.book_id
  INNER JOIN
    reviewers ON reviews.reviewer_id = reviewers.id
  GROUP BY
    books.title, reviewers.first_name, reviewers.last_name
) AS avg_ratings_per_reviewer
ORDER BY
  book_title, average_rating DESC;
