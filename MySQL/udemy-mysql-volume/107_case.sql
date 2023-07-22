-- SELECT *,
--     case 
--         when salary>=7000 then "high"
--         else 'low'
--     end as tag
-- from employee order by salary desc;

SELECT *,
    case 
        when title like "%Engineer%" then 1
        when title like "%Architect%" then 2
        else 3
    end as tag
from 99_employee order by tag;