/*
kaikki Forsströmit, jotka ovat elossa
*/

SELECT person.last_name, person.first_name, person.birthday, person.deathday
FROM person
WHERE person.last_name = 'Forsström'
AND person.deathday IS NULL
ORDER BY person.birthday ASC;

/*
20 vanhinta Forsströmiä, jotka ovat elossa
*/

SELECT person.last_name, person.first_name, person.birthday, person.deathday
FROM person
WHERE person.last_name = 'Forsström'
AND person.deathday IS NULL
ORDER BY person.birthday ASC;

SELECT person.last_name, person.first_name, person.birthday, person.deathday, passport.uuid
FROM person
LEFT JOIN passport ON (person.id = passport.person_id)
WHERE person.last_name LIKE 'Forsström'
AND person.deathday IS NULL
ORDER BY person.birthday ASC
LIMIT 20;


/*
indeksi on tietokannan tietorakenne, joka nopeuttaa tietokannan hakua!
*/

CREATE INDEX idx_person_last_name ON person(last_name, first_name) INCLUDES (birthday);

/* indeksi ei toimi LIKE-haussa */

SELECT FROM person WHERE last_name LIKE 'F%';



SELECT last_name, COUNT(last_name) as lukumaara
FROM person
GROUP BY last_name
ORDER BY lukumaara
LIMIT 20;