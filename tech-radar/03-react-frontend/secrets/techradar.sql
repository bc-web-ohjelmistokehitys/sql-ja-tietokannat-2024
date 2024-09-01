DROP TABLE IF EXISTS radar;

CREATE TABLE radar (
    id SERIAL,
    tech VARCHAR(255) NOT NULL,
    quadrant VARCHAR(255)  NOT NULL,
    ring VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO radar (tech, quadrant, ring) VALUES ('React', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('React', 'Programming', 'Hold');
INSERT INTO radar (tech, quadrant, ring) VALUES ('React', 'Programming', 'Assess');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Angular', 'Programming', 'Hold');

/* tech should be unique */

BEGIN;

DELETE FROM radar WHERE tech = 'React' AND ring != 'Adopt';

ALTER TABLE radar
ADD CONSTRAINT tech_unique UNIQUE (tech);

COMMIT;



BEGIN;

DELETE FROM radar;

INSERT INTO radar (tech, quadrant, ring) VALUES ('React', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('TypeScript', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('CSS', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('HTML', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('JavaScript', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Angular', 'Programming', 'Hold');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Svelte', 'Programming', 'Assess');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Solid.JS', 'Programming', 'Trial');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Next.js', 'Programming', 'Trial');
INSERT INTO radar (tech, quadrant, ring) VALUES ('GitHub', 'Platforms', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('AWS', 'Platforms', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Google Cloud', 'Platforms', 'Trial');
INSERT INTO radar (tech, quadrant, ring) VALUES ('ChatGPT', 'Tools', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Suno', 'Tools', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Git', 'Tools', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Linux', 'Tools', 'Trial');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Unix', 'Tools', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('PostgreSQL', 'Databases', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('MongoDB', 'Databases', 'Assess');
INSERT INTO radar (tech, quadrant, ring) VALUES ('MariaDB', 'Databases', 'Trial');
INSERT INTO radar (tech, quadrant, ring) VALUES ('SQLite', 'Databases', 'Assess');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Oracle', 'Databases', 'Hold');
INSERT INTO radar (tech, quadrant, ring) VALUES ('MS SQL Server', 'Databases', 'Hold');

COMMIT;
