DROP TABLE IF EXISTS blip;
DROP TABLE IF EXISTS radar;
DROP TABLE IF EXISTS tech;

CREATE TABLE tech (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT NULL,
    url VARCHAR(255) NULL,
    quadrant INTEGER NOT NULL CHECK(quadrant IN(0, 1, 2, 3)),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE radar (
    id SERIAL NOT NULL,
    name VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE blip (
    id SERIAL NOT NULL,
    tech_id INTEGER NOT NULL REFERENCES tech(id),
    radar_id INTEGER NOT NULL REFERENCES radar(id),
    ring INTEGER NOT NULL CHECK(ring IN(0, 1, 2, 3)),
    UNIQUE(tech_id, radar_id),
    PRIMARY KEY(id)
);

INSERT INTO tech (name, quadrant) VALUES ('PostgreSQL', 0);
INSERT INTO tech (name, quadrant) VALUES ('React', 1);

INSERT INTO radar (name) VALUES ('Peksun paras tutka');
INSERT INTO radar (name) VALUES ('Fronttitiimin tutka');

INSERT INTO blip (tech_id, radar_id, ring) VALUES (1, 1, 0);
INSERT INTO blip (tech_id, radar_id, ring) VALUES (2, 1, 0);

INSERT INTO blip (tech_id, radar_id, ring) VALUES (1, 2, 3);
INSERT INTO blip (tech_id, radar_id, ring) VALUES (2, 2, 3);


SELECT blip.id, radar.name, tech.name, tech.quadrant, blip.ring
FROM blip
JOIN tech ON(blip.tech_id = tech.id)
JOIN radar ON(blip.radar_id = radar.id)
WHERE radar.id = 1
ORDER BY tech.name DESC;






/*

- tutka
    - tiimi


- teknologia
    - id
    - nimi
    - kuvaus
    - url
    - kvadrantti
        - (0, 1, 2, 3 vs string)
    - perus metatiedot
        - luonti
        - muokkaus

# phase 2

- käyttäjät



*/