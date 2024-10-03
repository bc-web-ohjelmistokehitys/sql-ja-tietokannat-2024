CREATE VIEW border_check AS
    SELECT
        passport.uuid,
        person.first_name,
        person.last_name,
        person.birthday,
        passport.passport_image_id,
        image.url
    FROM
        passport
    JOIN
        person ON (passport.person_id = person.id)
    JOIN
        image ON (passport.passport_image_id = image.id)
    WHERE
        passport.uuid = '1c2372a0-b220-4d75-be50-cadfd8779efe';
