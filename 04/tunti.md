# tunti 4

Tunnin agenda oli "terminaali on elämä". Totesimme, että tosielämässä "oikea" tuotannossa oleva tietokanta ei koskaan asu kotikoneella, ja useimmiten tehtävänämme on käsitellä olemassaolevaa / toisten tekemää kantaa vs. kirjoittaa uusia taulurakenteita. SELECT on 1000% yleisempää kuin UPDATE / INSERT.

- `cd ~` - menemme kotikansioon
- `pwd` - missä olen juuri nyt?
- `brew service stop postgresql@16` - emme tarvinneet omaa palvelinta juuri nyt.

## etäpalvelin

Opettaja oli asentanut palvelimen, jota tutkimme!

- `nmap hunajapurkki.pekkis.eu`

Havaitsimme, että portteja on auki. Yksi porteista oli postgresql:n portti, mikä oli kiintoisaa.

- `PGPASSWORD=<salasana> psql --host=hunajapurkki.pekkis.eu --user=oppilas --port=5433 suomioy`

Tämä portti ei ole enää auki, koska opimme myöhemmin, että se on soosoo tietoturvasyistä. Suljimme portin, ja opettelimme ottamaan yhteyden SSH:lla.

- `ssh oppilas@pekkis.hunajapurkki.eu`

ja päästyämme onnistuneesti sisälle,

- `psql suomioy`

Opettelimme samalla SSH-avaimia.

- https://docs.github.com/en/authentication/connecting-to-github-with-ssh/using-ssh-agent-forwarding

Selitin asian yksinkertaisesti, Github puhuu asiasta tosi yksityiskohtaisesti. Kannattaa lukea, muttei pelästyä.

Pekkiksen yksinkertaiset ohjeet (googleta aiheet)

- `ls -la ~/.ssh` - katsotaan onko olemassa. Ei ollut.
- `ssh-keygen` - luodaan SSH-avain. Hakkaa entteriä kunnes valmis (tulee hassu kuvio)
- `ls -la ~/.ssh` - katsotaan onko olemassa. On. ÄLÄ KOSKAAN JAA KENELLEKÄÄN MUUTA KUIN .pub päätteistä JULKISTA osaa.
- `ssh-add` - otetaan identiteetti käyttöön.
- `ssh-copy-id <tunnus>@<palvelin>` - ssh-copy-id:llä identiteetti voidaan kopioida palvelimelle niin ettei ssh aina kysele salasanaa.

Githubin ohjeiden mukaan kannattaa lisätä ssh-avain myös githubiin omalla ajalla!

## SQL-kyselyitä

Otimme yhteyden etäpalvelimen tietokantaan "suomioy", jossa on 3.000.000 puolirealistista satunnaista "henkilötietoa". Ilman massiivista datamäärää emme pysty ymmärtämään, miten tosielämän tietokanta käyttäytyy.

[ajoimme kaikenlaisia SQL-kyselyitä](./huge-database.sql) yhdessä samalla palvelimella. Ennen lounasta rohkaisin vapaaehtoisia oppilaita tuhoamaan puolestani kaiken tiedon!

- `DELETE FROM person;`
- `DROP TABLE person CASCADE;`

Onnistuimme lanaamaan tietokannan! Lounaan jälkeen palautimme sen, pienten kommervenkkien jälkeen, backupeista.

- `dropdb suomioy`
- `createdb suomioy`
- `psql suomioy < suomioy.sql` - huh!

Otimme tuoreemman backupin. Latasimme sen omalle koneelle.

- `pg_dump suomioy > suomioy-tuore.sql` (palvelimella)
- `scp oppilas@hunajapurkki.pekkis.eu:~/suomioy-tuore.sql .` (omalla koneella)
- `createdb suomioy` (omalla koneella)
- `psql suomioy < suomioy-tuore.sql` (omalla koneella - pekkis-virheet odottamattomia mutta OK!)

`<` ja `>` merkeistä voit lukea seuraavasta linkistä. Niiden lisäksi on `|`. Kutsun itse näitä kaikkia yhdessä ylätermillä "putkitus", mutta se ei ole mikään oikea virallinen nimi.

https://www.tutorialspoint.com/unix/unix-io-redirections.htm

Uploadasin tietokannan Google Driveen. Isoja binääritiedostoja ei voi säilöä Githubiin, ja yhteinen palvelimemme elää vain pienen hetken.

Voit ladata kannan sen ja unzipata ja laittaa omalle paikalliselle serverille.

`https://drive.google.com/file/d/1ffawFMhvVinBlLcG8pX1vsjAzYCFlSTk/view`

## EXPLAIN

Lisäämällä SELECT-kyselyn alkuun `EXPLAIN` saamme selitystä, jonka tulkinta on oma taiteenlajinsa.

Lisäämällä SELECT-kyselyn alkuun `EXPLAIN ANALYZE VERBOSE` saamme aivan hirveän määrän hebreaa. Sen tulkinta on vielä enemmän vaikeampaa. Takerru avainsanoihin (table scan, index, jne) kuin hukkuva oljenkorteen.

Harjoitus tekee mestarin. Opettaja itsekin osaa välttävästi, ja on unohtanut paljon.

## Indeksi

Huomasimme, että tietokanta on "vähän hidas". Korjasimme asian indeksillä, ero oli massiivinen.

- https://www.postgresql.org/docs/current/sql-createindex.html

Opimme, että indeksit voivat joko hidastaa tai nopeuttaa. Opettaja onnistui jumittamaan koko masiinan lisäämällä indeksi, mikä oli yllättävää. Hän ihmetteli asiaa kovasti, mutta osasi sitten kuitenkin tehdä vähän paremman indeksin. LIKE-hakua hän ei saanut toimimaan, vaikka "se oli toiminut kotona", ja hän selvittää asian ensi tunniksi.

## Tehtävä

Kirjoita kysely, joka hakee passin UUID:llä passin tiedot, henkilön olennaiset tiedot ja passikuvan. Skannaamme rajalla maahan saapujan passin, ja haluamme tietää, onko henkilö olemassa ja oikea.

Puhuimme UUID:stä ylipäätään, ja sen tietoturvasta vs. juokseva numero (juoksevan numeron avulla koko kannan / taulun voi juosta läpi, jos teemme vahingossa tietoturva-aukon. UUID:tä ei voi arvata.)

- https://en.wikipedia.org/wiki/Universally_unique_identifier
