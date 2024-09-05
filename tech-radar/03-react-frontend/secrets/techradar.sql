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

INSERT INTO radar (name) VALUES ('Radar_Peksu');
INSERT INTO radar (name) VALUES ('Radar_Alpha');
INSERT INTO radar (name) VALUES ('Radar_Beta');
INSERT INTO radar (name) VALUES ('Radar_Gamma');
INSERT INTO radar (name) VALUES ('Radar_Delta');
INSERT INTO radar (name) VALUES ('Radar_Epsilon');
INSERT INTO radar (name) VALUES ('Radar_Zeta');
INSERT INTO radar (name) VALUES ('Radar_Eta');
INSERT INTO radar (name) VALUES ('Radar_Theta');
INSERT INTO radar (name) VALUES ('Radar_Iota');
INSERT INTO radar (name) VALUES ('Radar_Kappa');
INSERT INTO radar (name) VALUES ('Radar_Lambda');
INSERT INTO radar (name) VALUES ('Radar_Mu');
INSERT INTO radar (name) VALUES ('Radar_Nu');
INSERT INTO radar (name) VALUES ('Radar_Xi');
INSERT INTO radar (name) VALUES ('Radar_Omicron');
INSERT INTO radar (name) VALUES ('Radar_Pi');
INSERT INTO radar (name) VALUES ('Radar_Rho');
INSERT INTO radar (name) VALUES ('Radar_Sigma');
INSERT INTO radar (name) VALUES ('Radar_Tau');
INSERT INTO radar (name) VALUES ('Radar_Upsilon');
INSERT INTO radar (name) VALUES ('Radar_Phi');
INSERT INTO radar (name) VALUES ('Radar_Chi');
INSERT INTO radar (name) VALUES ('Radar_Psi');
INSERT INTO radar (name) VALUES ('Radar_Omega');
INSERT INTO radar (name) VALUES ('Radar_Ares');
INSERT INTO radar (name) VALUES ('Radar_Athena');
INSERT INTO radar (name) VALUES ('Radar_Hermes');
INSERT INTO radar (name) VALUES ('Radar_Apollo');
INSERT INTO radar (name) VALUES ('Radar_Artemis');
INSERT INTO radar (name) VALUES ('Radar_Dionysus');
INSERT INTO radar (name) VALUES ('Radar_Hades');
INSERT INTO radar (name) VALUES ('Radar_Hera');
INSERT INTO radar (name) VALUES ('Radar_Poseidon');
INSERT INTO radar (name) VALUES ('Radar_Zeus');
INSERT INTO radar (name) VALUES ('Radar_Hephaestus');
INSERT INTO radar (name) VALUES ('Radar_Demeter');
INSERT INTO radar (name) VALUES ('Radar_Hestia');
INSERT INTO radar (name) VALUES ('Radar_Persephone');
INSERT INTO radar (name) VALUES ('Radar_Hypnos');
INSERT INTO radar (name) VALUES ('Radar_Nyx');
INSERT INTO radar (name) VALUES ('Radar_Erebus');
INSERT INTO radar (name) VALUES ('Radar_Thanatos');
INSERT INTO radar (name) VALUES ('Radar_Eros');
INSERT INTO radar (name) VALUES ('Radar_Hebe');
INSERT INTO radar (name) VALUES ('Radar_Iris');
INSERT INTO radar (name) VALUES ('Radar_Morpheus');
INSERT INTO radar (name) VALUES ('Radar_Nemesis');
INSERT INTO radar (name) VALUES ('Radar_Pan');
INSERT INTO radar (name) VALUES ('Radar_Selene');
INSERT INTO radar (name) VALUES ('Radar_Helios');
INSERT INTO radar (name) VALUES ('Radar_Eos');
INSERT INTO radar (name) VALUES ('Radar_Boreas');
INSERT INTO radar (name) VALUES ('Radar_Zephyrus');
INSERT INTO radar (name) VALUES ('Radar_Notus');
INSERT INTO radar (name) VALUES ('Radar_Eurus');
INSERT INTO radar (name) VALUES ('Radar_Gaia');
INSERT INTO radar (name) VALUES ('Radar_Uranus');
INSERT INTO radar (name) VALUES ('Radar_Cronus');
INSERT INTO radar (name) VALUES ('Radar_Rhea');
INSERT INTO radar (name) VALUES ('Radar_Oceanus');
INSERT INTO radar (name) VALUES ('Radar_Tethys');
INSERT INTO radar (name) VALUES ('Radar_Hyperion');
INSERT INTO radar (name) VALUES ('Radar_Theia');
INSERT INTO radar (name) VALUES ('Radar_Coeus');
INSERT INTO radar (name) VALUES ('Radar_Phoebe');
INSERT INTO radar (name) VALUES ('Radar_Crius');
INSERT INTO radar (name) VALUES ('Radar_Mnemosyne');
INSERT INTO radar (name) VALUES ('Radar_Themis');
INSERT INTO radar (name) VALUES ('Radar_Iapetus');
INSERT INTO radar (name) VALUES ('Radar_Prometheus');
INSERT INTO radar (name) VALUES ('Radar_Epimetheus');
INSERT INTO radar (name) VALUES ('Radar_Atlas');
INSERT INTO radar (name) VALUES ('Radar_Metis');
INSERT INTO radar (name) VALUES ('Radar_Leto');
INSERT INTO radar (name) VALUES ('Radar_Asteria');
INSERT INTO radar (name) VALUES ('Radar_Pallas');
INSERT INTO radar (name) VALUES ('Radar_Styx');
INSERT INTO radar (name) VALUES ('Radar_Electra');
INSERT INTO radar (name) VALUES ('Radar_Maia');
INSERT INTO radar (name) VALUES ('Radar_Taygete');
INSERT INTO radar (name) VALUES ('Radar_Alcyone');
INSERT INTO radar (name) VALUES ('Radar_Celaeno');
INSERT INTO radar (name) VALUES ('Radar_Sterope');
INSERT INTO radar (name) VALUES ('Radar_Merope');
INSERT INTO radar (name) VALUES ('Radar_Clymene');
INSERT INTO radar (name) VALUES ('Radar_Dione');
INSERT INTO radar (name) VALUES ('Radar_Pleione');
INSERT INTO radar (name) VALUES ('Radar_Calypso');
INSERT INTO radar (name) VALUES ('Radar_Circe');
INSERT INTO radar (name) VALUES ('Radar_Medea');
INSERT INTO radar (name) VALUES ('Radar_Pandora');
INSERT INTO radar (name) VALUES ('Radar_Echo');
INSERT INTO radar (name) VALUES ('Radar_Cassiopeia');
INSERT INTO radar (name) VALUES ('Radar_Andromeda');
INSERT INTO radar (name) VALUES ('Radar_Perseus');
INSERT INTO radar (name) VALUES ('Radar_Hercules');
INSERT INTO radar (name) VALUES ('Radar_Orion');
INSERT INTO radar (name) VALUES ('Radar_Pegasus');
INSERT INTO radar (name) VALUES ('Radar_Cetus');


INSERT INTO tech (name, quadrant, url, description) VALUES ('React', 0, 'https://reactjs.org/', 'A JavaScript library for building user interfaces.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('TypeScript', 0, 'https://www.typescriptlang.org/', 'A typed superset of JavaScript that compiles to plain JavaScript.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('CSS', 0, 'https://developer.mozilla.org/en-US/docs/Web/CSS', 'A style sheet language used for describing the presentation of a document written in HTML or XML.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('HTML', 0, 'https://developer.mozilla.org/en-US/docs/Web/HTML', 'The standard markup language for documents designed to be displayed in a web browser.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('JavaScript', 0, 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', 'A programming language that conforms to the ECMAScript specification.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Angular', 0, 'https://angular.io/', 'A platform for building mobile and desktop web applications.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Svelte', 0, 'https://svelte.dev/', 'A radical new approach to building user interfaces.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Solid.JS', 0, 'https://solidjs.com/', 'A declarative JavaScript library for building user interfaces.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Next.js', 0, 'https://nextjs.org/', 'A React framework for production.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('GitHub', 3, 'https://github.com/', 'A platform for version control and collaboration.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('AWS', 3, 'https://aws.amazon.com/', 'A comprehensive and broadly adopted cloud platform.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Google Cloud', 3, 'https://cloud.google.com/', 'A suite of cloud computing services.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('ChatGPT', 2, 'https://openai.com/chatgpt', 'An AI language model developed by OpenAI.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Suno', 2, 'https://www.suno.ai/', 'A platform for AI-powered audio and video transcription.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Git', 2, 'https://git-scm.com/', 'A free and open source distributed version control system.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Linux', 2, 'https://www.linux.org/', 'An open-source Unix-like operating system.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Unix', 2, 'https://www.unix.org/', 'A family of multitasking, multiuser computer operating systems.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('PostgreSQL', 1, 'https://www.postgresql.org/', 'A powerful, open source object-relational database system.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('MongoDB', 1, 'https://www.mongodb.com/', 'A source-available cross-platform document-oriented database program.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('MariaDB', 1, 'https://mariadb.org/', 'A community-developed, commercially supported fork of the MySQL relational database management system.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('SQLite', 1, 'https://www.sqlite.org/', 'A C-language library that implements a small, fast, self-contained, high-reliability, full-featured, SQL database engine.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('Oracle', 1, 'https://www.oracle.com/database/', 'A multi-model database management system produced and marketed by Oracle Corporation.');
INSERT INTO tech (name, quadrant, url, description) VALUES ('MS SQL Server', 1, 'https://www.microsoft.com/en-us/sql-server', 'A relational database management system developed by Microsoft.');

DO $$
DECLARE
    i INTEGER;
BEGIN
    FOR i IN 1..5000 LOOP
        EXECUTE 'INSERT INTO blip (tech_id, radar_id, ring) VALUES (' || FLOOR(RANDOM() * 23) + 1 || ', ' || FLOOR(RANDOM() * 100) + 1 || ', ' || FLOOR(RANDOM() * 4) || ') ON CONFLICT DO NOTHING';
    END LOOP;
END $$;
