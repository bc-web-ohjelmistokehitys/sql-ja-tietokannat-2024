# Tunti 07

## Vielä vähän SQL-koodauksesta ja adminoinnista

Muistatteko, kun kerroin, että live-kannan kanssa operointi on oma haasteensa? No, se todellakin on!

- huoltokatkot
  - tietokannan päivitys ilman katkoa on aina hazaardi!
  - CONCURRENTLY indeksit
- migraatiot
  - ylös- ja alas-kyselyt
  - https://kysely.dev/docs/migrations
  - https://knexjs.org/guide/migrations.html

Koodasin esimerkin vuoksi näitä esimerkinomaisesti [viime tunnin koodiin](../example-applications/border-check).

## MySQL / MariaDB

- Olemme ottaneet yhteyden possukkaiseen ja tehneet sillä, mutta wordpress käyttää myskyläistä!

Myskyläinen on ehkä päällä / asennettuna MAMPin ansiosta. Voimme kokeilla!

- `mysql`

Myskyläinen ei ollut päällä, joten unohdimme myskylän.

## Leffatietokannan paluu

Palasimme leffatietokantaan. Totesimme, että teemme oman leffatietokannan, mutta paremman kuin [IMDB](https://www.imdb.com/) tai [TheMovieDB](https://www.themoviedb.org/).

Otimme tarkastelumme kohteeksi elokuvan "The Matrix", koska tekoäly antoi sen opettajalle, ja näyttelijän Keanu Reeves, koska hän näyttelee pääosan elokuvassa.

- https://www.themoviedb.org/movie/603-the-matrix
- https://www.themoviedb.org/person/6384-keanu-reeves

Kävimme saittia läpi ja pohdiskelimme oman tietokantamme rakennetta. Kirjoitimme sitä (ja insertoimme alustavaa dataa) [./movies.sql](movies.sql) tiedostossa.

Suunnittelimme ja kirjoitimme yhdessä, tähän asti oppimaamme kerraten ja soveltaen, seuraavat asiat:

- elokuvan perustiedot
- henkilön perustiedot
- ohjaajat (person-movie kytkös)
- näyttelijät (rooleineen, myös person-movie kytkös)
- ensi-illat eri maissa
- ensisijaiset kuvat elokuville ja henkilöille (surullinen keanu, matrix-elokuvajuliste)
- lisäkuvat henkilöille
- käyttäjät (as in "rekisteröity käyttäjä")
- Käyttäjien arvostelut elokuville (keskiarvopisteytystä varten) 1-10

Sovimme, että viimeisellä tunnilla toteutamme yhdessä rajapinnan tähän uuteen yhdessä tekemäämme tietokantaan.

Opettaja lupasi toimittaa Discordissa viimeistään maanantaina kannan (sql-tiedosto), mihin hän on generoinut muutamia kymmeniä / satoja todellisia elokuvia ja vähän feikkidata, ja lisäksi koodipohjan, johon alamme työstää rajapintaa. Mukana ohjeet.

Kotitehtävänänne on pystyttää ohjeiden mukaan koodausympäristö valmiiksi, niin että pääsemme ensi torstaina lentävällä lähdöllä liikkeelle. Käytännössä hän toteuttaa nollasta pikaisesti about samat asiat, mitä kahdella edellisellä tunnilla koodasimme alusta alkaen.
