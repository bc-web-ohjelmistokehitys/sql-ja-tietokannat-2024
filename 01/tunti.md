# Tunti 01 / 08

## Asenna PostgreSQL (16 tai tuorein)

- `brew install postgresql@16`
  - Seuraa ohjeita tarkasti. Kun asennus valittaa "keg only nönnön nöö", echota terminaalissa suositeltu rivi.
- `.zshrc` tiedostoon echottamisen jälkeen sulje kaikki terminaalit ja avaa uudelleen niin polku latautuu.

### servicen käynnistys / stoppaus

- `brew services list` listaa
- `brew services postgresql@16 start` <- start, stop, restart

## Luo tietokanta

- `psql` komennon pitäisi asennus-show'n jälkeen antaa virheilmoitus luokkaa `database name XXXXXX not found`
- `createdb example` luo example-nimisen tietokannan
- `psql example` ottaa shell-yhteyden example-nimiseen tietokantaan kun postgresql-palvelu on pystyssä.

Graafiset ympäristöt (https://drawsql.app/) ovat enemmän kuin ok, mutta shell on asian "oikea" pihvi. Tosielämässä tietokantoja yleensä työstetään shellissä ja SQL-lauseina tekstieditorissa. Siihen kannattaa totutella.

## Esivalmisteltu tietokanta:

`./attendance-db.sql` pitää sisällään esimerkkikannan.

## Läpi käytyjä asioita

- CREATE TABLE
  - primary key
    - auto increment
  - foreign key
  - nullable
- DROP TABLE
- `\d` <- metatiedot kannan relaatioista, `\d taulun_nimi`
- INSERT INTO
- SELECT
  - `*`
  - WHERE
  - ORDER BY (ilman order by:tä järjestys pseudosatunnainen, ei voi luottaa)
  - GROUP BY (vain esikurkistus, ei huolta!)
  - JOIN (vain esikurkistus, ei huolta!)
- DELETE
- UPDATE
- BEGIN TRANSACTION (transaktiot ja ACID https://en.wikipedia.org/wiki/ACID)
  - Aina kannattaa mahdollisuuksien mukaan tehdä transaktio, jos on ajatuksissa tehdä jotain "tuhoisaa"
  - ROLLBACK tai COMMIT peruuttaa / commitoi transaktion

```sql

SELECT * FROM person;

SELECT firstname, lastname FROM person;

BEGIN TRANSACTION;
UPDATE person SET firstname = 'Donald', lastname = 'Trump' WHERE lastname = 'Biden';
COMMIT;

BEGIN TRANSACTION;
DELETE FROM attendance;
/* whoops tuotantopalvelin tyhjä, pare rollbäkkää! */
ROLLBACK;

BEGIN TRANSACTION;
DELETE FROM person WHERE id = 1;
/* viiteavain pitäisi valittaa tässä */
COMMIT;

SELECT person.lastname, person.firstname, attendance.date, attendance.attendance FROM person JOIN attendance ON(person.id = attendance.person_id) WHERE lastname = 'Trump' ORDER BY date, lastname, firstname;

SELECT person.lastname, person.firstname, COUNT(attendance.attendance) FROM person JOIN attendance ON(person.id = attendance.person_id) WHERE attendance.attendance = false GROUP BY(person.lastname, person.firstname) ORDER BY lastname, firstname;

```
