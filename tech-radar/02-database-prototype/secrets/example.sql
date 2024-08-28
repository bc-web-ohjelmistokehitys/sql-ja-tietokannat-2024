DROP TABLE IF EXISTS radar;

CREATE TABLE radar (
    id SERIAL,
    tech VARCHAR(255) UNIQUE NOT NULL,
    quadrant VARCHAR(255)  NOT NULL,
    ring VARCHAR(255) NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO radar (tech, quadrant, ring) VALUES ('React', 'Programming', 'Adopt');
INSERT INTO radar (tech, quadrant, ring) VALUES ('Angular', 'Programming', 'Hold');