select 
  first_name, last_name, round(avg(rating), 2) as avg_rating 
from reviewers
left join reviews 
  on reviewers.id = reviews.reviewer_id
group by reviewers.id
order by avg_rating desc;