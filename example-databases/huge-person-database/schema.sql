DROP TABLE IF EXISTS apb;
DROP TABLE IF EXISTS passport;
DROP TABLE IF EXISTS image;
DROP TABLE IF EXISTS person;

CREATE TABLE person (
  id SERIAL,
  personal_identification_number VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  birthday DATE NOT NULL,
  deathday DATE NULL,
  last_name VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  sex CHAR(1) NOT NULL CHECK(sex IN ('m', 'f')),
  gender VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE image(
  id serial,
  url VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE passport (
  id SERIAL,
  person_id INTEGER NOT NULL UNIQUE REFERENCES person(id) ON DELETE NO ACTION ON UPDATE CASCADE,
  uuid VARCHAR(255) NOT NULL UNIQUE,
  valid_from DATE NOT NULL,
  valid_until DATE NOT NULL,
  passport_image_id INTEGER NOT NULL UNIQUE REFERENCES image (id),
  PRIMARY KEY(id)
);

CREATE TABLE apb (
  id SERIAL,
  person_id INTEGER NOT NULL UNIQUE REFERENCES person(id) ON DELETE NO ACTION ON UPDATE CASCADE,
  description VARCHAR(255) NOT NULL,
  issue_date DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(255) NOT NULL CHECK(status IN ('open', 'closed')),
  PRIMARY KEY(id)
);


