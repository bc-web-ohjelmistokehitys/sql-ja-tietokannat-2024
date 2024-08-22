
/* DROP TABLES IF THEY EXIST */

DROP TABLE IF EXISTS attendance;
DROP TABLE IF EXISTS person;

/* CREATE TABLES */

/*
    SERIAL === AUTO INCREMENTING INTEGER
*/

CREATE TABLE person(
    id SERIAL NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    firstname VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE attendance(
    id SERIAL NOT NULL,
    person_id INT NOT NULL,
    date DATE NOT NULL,
    attendance BOOLEAN NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(person_id) REFERENCES person(id)
);

/* INSERT PERSONS */

INSERT INTO person(lastname, firstname) VALUES('Doe', 'John');

INSERT INTO person(lastname, firstname) VALUES('Pöksy', 'Peksu');

INSERT INTO person(lastname, firstname) VALUES('Kukkuu', 'Heps');

INSERT INTO person(lastname, firstname) VALUES('Lussenford', 'Lusso');

INSERT INTO person(lastname, firstname) VALUES('Biden', 'Joe');

/* INSERT ATTENDANCES */

INSERT INTO attendance (person_id, date, attendance) VALUES (1, '2024-08-22', true);
INSERT INTO attendance (person_id, date, attendance) VALUES (2, '2024-08-22', true);
INSERT INTO attendance (person_id, date, attendance) VALUES (3, '2024-08-22', false);
INSERT INTO attendance (person_id, date, attendance) VALUES (4, '2024-08-22', false);
INSERT INTO attendance (person_id, date, attendance) VALUES (5, '2024-08-22', true);

INSERT INTO attendance (person_id, date, attendance) VALUES (1, '2024-08-29', true);
INSERT INTO attendance (person_id, date, attendance) VALUES (2, '2024-08-29', true);
INSERT INTO attendance (person_id, date, attendance) VALUES (3, '2024-08-29', true);
INSERT INTO attendance (person_id, date, attendance) VALUES (4, '2024-08-29', true);
INSERT INTO attendance (person_id, date, attendance) VALUES (5, '2024-08-29', false);

INSERT INTO attendance (person_id, date, attendance) VALUES (1, '2024-09-05', false);
INSERT INTO attendance (person_id, date, attendance) VALUES (2, '2024-09-05', false);
INSERT INTO attendance (person_id, date, attendance) VALUES (3, '2024-09-05', false);
INSERT INTO attendance (person_id, date, attendance) VALUES (4, '2024-09-05', false);
INSERT INTO attendance (person_id, date, attendance) VALUES (5, '2024-09-05', true);

