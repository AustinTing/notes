SELECT title, director_name, imdb_score from movie;

SELECT * from movie
WHERE title_year=2013 and content_rating='PG-13';

SELECT * from movie
WHERE NOT country='USA';

SELECT * from movie
WHERE director_name='Peter Jackson' or director_name='Christopher Nolan';

UPDATE movie SET imdb_score=9 
WHERE director_name="Christopher Nolan";

DELETE from movie where imdb_score<6;

DELETE from movie where title_year=2006;