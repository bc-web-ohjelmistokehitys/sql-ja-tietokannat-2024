# Tunti 06

## Terminaali on elämä^2

Kyselin työ-ystäviltäni mielipidettä minua askarruttavaan asiaan. Teenkö väärin, kun pusken oppilaitani äärimmäisellä voimalla terminaaliin, hokien sen tärkeyttä uudelleen ja uudelleen.

Voimakas yhteisymmärrys vallitsi siitä, että minun pitäisi _entistä voimakkaammin_ puskea oppilaita terminaaliin. Hyvät terminaalitaidot ovat elinehto työssämme muidenkin kuin minun mielestäni.

Jos siis viette mukananne yhden opin kurssilta, olkoon se siis "terminaali on elämä". Opetelkaa käyttämään terminaalia niin, että se tuntuu mukavalta ja on sujuvaa. Rukoilen teitä, ottakaa terminaali sydämeenne.

## Rajapinta, vol 2

Jatkoimme rajapinta-projektin koodaamista. Edellisellä tunnilla lopetimme tilanteeseen,
missä saimme ensimmäistä kertaa **jotakin** ulos tietokannasta. Tällä kertaa tavoitteenamme oli toteuttaa vähän parempia ja järkevämpiä endpointteja!

[omat koodini](../example-applications/border-check/) löytyvät Githubista sellaisena, joiksi ne jäivät tämän päivän jälkeen.

- `/person` <- palauttaa kaikki henkilöt, _sivutettuna_. (3.000.000 riviä ei voi palauttaa kerralla)
- `/person/:id` <- palauttaa yksittäisen henkilön tiedot.

Kun tehdään rajapintoja, puhutaan usein [REST](https://en.wikipedia.org/wiki/REST)-periaatteesta. Tämä on osittain humpuukia, JSON-rajapinta on kuvaavampi nimi. Kyse on HTTP-rajapinnoista, jotka puhuvat JSONia.

- https://en.wikipedia.org/wiki/REST
- https://en.wikipedia.org/wiki/HTTP#Request_methods

Olen aiemmin maininnut siitä, että HTTP-protokollan tuntemus on menestyksekkään webbikoodauksen tukijalkoja. Tässä kohtaa kannattaa kiinnittää huomio request-metodeihin (GET, POST, jne). Asiat, jotka hakevat juttuja serveriltä, ovat aina GET-pyyntöjä (selain tekee pääsääntöisesti näitä). Asiat, jotka muuttavat tietoa, eivät ole GET-pyyntöjä.

- https://en.wikipedia.org/wiki/URL

URL on tosi tärkeä konsepti. Yritä tulla sinuiksi sen kanssa.

```js
const url = new URL(
  "https://pekkis:salasana@www.pekkis.eu:4584/lussenhof?hip=hei&lus=haa#laalaa"
);

console.log("URL", url);
```

### SQL-injektio

Käyttämällä matalan tason [pg](https://www.npmjs.com/package/pg) kirjastoa teimme `/person`-endpointtiin kyselyn konkatenoimalla käyttäjän syötteitä URLin querystringistä suoraan SQL:ään. Loimme vahingossa mehevän tietoturva-aukon, jonka avulla osaava pahantekijä saa täyden pääsyn tietokantaamme.

Tässä kiltti URL ja tuhma URL peräkkäin.

- http://127.0.0.1:5678/person?page=2&sortBy=last_name
- http://127.0.0.1:5678/person?page=2&sortBy=last_name LIMIT 1; DROP TABLE person CASCADE;--

Tarinan opetus: emme **koskaan**, **koskaan** laita mitään suoraan käyttäjän syötteestä sen enempää SQL:ään kuin mihinkään muuhunkaan. Emme luota mihinkään käyttäjän syötteeseen. Validoimme, filtteröimme, escapoimme ja / tai sanitoimme kaikki, mitä saamme suoraan käyttäjältä.

- https://security.stackexchange.com/questions/143923/whats-the-difference-between-escaping-filtering-validating-and-sanitizing

- filtteröinti: otetaan tuhmat merkit pois syötteistä
- escapointi: korvataan erikoismerkit niin että ne eivät ole enää erikoismerkkejä kohdejärjestelmässä
- validointi: tarkistetaan, että käyttäjän syöte on sellaista, kuin sen tulisi olla.
- sanitointi: kaikki edelliset tai osa niistä yhdessä, pidetään huolta siitä ettei käyttäjän syöte saa aikaan mitään odottamatonta!

Tietoturva on tosi tärkeää. Itse olen koodannut urani alkuvaiheessa kuuluisan "SDP-aukon" ison puolueen kotisivulle. Tästä uutisoitiin valtamedioissa. En itse enää silloin ollut samassa paikassa töissä, mutta olin paria vuotta aikaisemmin koodannut tämän röörin. Se oli rehellinen SQL-injektio, kuten teimme tänään.

- https://www.is.fi/digitoday/tietoturva/art-2000001529207.html

Jos et halua olla kuin minä, OWASPin TOP 10 auttaa. Tätä kannattaa seurata aina muutaman vuoden välein, ja koittaa tavata huolellisesti.

- https://owasp.org/www-project-top-ten/

### Käytämme AINA vain ja ainoastaan parametrisoituja tietokantakutsuja

Tietokantojen suhteen injektion välttäminen on onneksi helppoa. Käytämme vain ja ainoastaan ns "parametrisoituja" rajapintoja.

Nämä rajapinnat ovat aina vähän erilaisia riippuen ohjelmointikielistä ja käytetyistä kirjastoista, mutta periaate on sama. Kirjasto pitää huolen siitä, että parametrit escapoidaan asianmukaisesti. Luotamme siihen.

- https://cheatsheetseries.owasp.org/cheatsheets/Query_Parameterization_Cheat_Sheet.html

```js
// NAUGHTY NAUGHTY!
const ret = executeSQL(
  `SELECT foo, bar FROM xoo WHERE id = ${olenSqlInjektioJaTuhoanMaineesi}`
);

// YES SIR! I CAN BOOGIE!
const ret = executeSQL(`SELECT foo, bar FROM xoo WHERE id = ?`, [
  injektioEiSatutaMinua,
]);
```

## Rajapinta, vol. 3

### kyselynkirjoituskirjastot

Raa'an SQL:n kirjoitus matalan tason tietokantayhteys-kirjastolla muuttuu aika nopeasti aika raskaaksi (järjestys merkitsee jne). Onneksi maailma on täynnä kirjastoja, jotka tekevät SQL:n kirjoittamisen _ohjelmallisesti_ mukavaksi.

Jälleen kerran jokaisella ohjelmointikielellä on omat kirjastonsa, ja vaihtoehtoja on monia. Mitään "oikeaa" vaihtoehtoa ei ole olemassa. Kannattaa myös muistaa periaate siitä, että asiat kannattaa ymmärtää yhtä tasoa "alempana". SQL-kyselykirjastojen tehokas käyttö edellyttää sitä, että ymmärtää SQL:n ja kykenee kirjoittamaan sitä käsin. Voit siis hyvällä omallatunnolla kirjoittaa SQL:ää käsin juuri niin kauan kuin haluat. Sitten kun olet valmis, otat käyttöön kirjaston!

- https://www.doctrine-project.org/projects/doctrine-dbal/en/4.1/reference/query-builder.html (PHP)
- https://knexjs.org/ (JS)
- https://kysely.dev/ (TS)

[kysely](https://kysely.dev/) on tosi kiva TypeScriptissä, koska se antaa meille apupyörät tietämällä täsmälleen, mitä tauluja ja kolumneja meillä tietokannassamme on.

- https://github.com/RobinBlomberg/kysely-codegen

Kun yhdistämme kyselyyn kysely-codegenin joka käy kyselemässä taulut ja kannat suoraan tietokannaltamme, saamme ilmaiseksi _tosi paljon_.

- `npm add kysely`
- `npm add --save-dev kysely-codegen`

### ENV-muuttujat

- `npm exec kysely-codegen`

![voi ei, mikään ei koskaan toimi](<Screenshot 2024-09-26 at 18.12.15.png>)

Voi ei! Meiltä puuttuu jotakin. Kyselyn koodigeneraattori kaipaa env-muuttujaa `DATABASE_URL`.

- https://en.wikipedia.org/wiki/Environment_variable

Env-muuttuja on konsepti, joka tulee vastaan kaikkialla. Koodaamiamme ohjelmat konfiguroidaan toimimaan eri ympäristöissä (kehityskone, tuotantopalvelin, staging-palvelin jne) eri tavalla pääsääntöisesti näillä. Ohjelmat lukevat käynnistettyään ENV-muuttujista tarvitsemansa tiedot, esimerkiksi tietokannan yhteystiedot.

Env-muuttujia voi asettaa ainakin kahdella eri tavalla.

- `export` <- listaa oman koneesi tämänhetkiset muuttujat. Niitä on paljon, voit lukea ja tutkia niitä.
- `export DATABASE_URL=kakkapieru` <- asettaa muuttujan "pysyvästi".
- `unset DATABASE_URL` <- opettaja ei osannut poistaa env-muuttujaa sen kerran exportattuaan. Nyt hän osaa!
- `DATABASE_URL=hiphei TOINEN_MUUTTUJA=xooxoo npm run dev` <- muuttujien asetus suoraan komennon yhteydessä.

**Kehitysympäristöissä** käytetään usein `.env` tiedostoa. Tämä on yhdessä päätetty konventio env-muuttujien kehityksen aikaisen käytön helpottamiseksi. Älä koskaan pushaa tätä tiedostoa gitiin. Esimerkkitiedosto järkevillä vakio- tai esimerkkiarvoilla (`.env.example` tms) on ok laittaa repoon, mutta `.env` menee .gitignoreen.

- https://www.google.com/search?q=dotenv

`.env`-tiedoston (tai vastaavan) lukeminen ei tapahdu automaattisesti. Ohjelmointikielillä on omat kirjastonsa, jotka pitää ottaa käyttöön. JavaScriptissä `dotenv` toimii.

- https://www.npmjs.com/package/dotenv

```js
import "dotenv/config";

// Minut luetaan .env-tiedostosta, jos minut on siellä asetettu!
console.log(process.env.DATABASE_URL);
```

Kun dotenvin on importannut, sen jälkeen muuttujat "vain ladataan". Huomaa, että oikeat env-muuttujat (export ja ajon yhteydessä määritetty) yliajavat aina .envissä asetetun. Tämä on oikein ja tarkoituksellista.

Kun olemme konffanneet `.env` tiedostoon oikean `DATABASE_URL`-muuttujan, kysely-codegen toimii.

```text
DATABASE_URL=postgres://localhost/suomioy
```

- `npm exec kysely-codegen`

![hip hurraa!](<Screenshot 2024-09-26 at 18.38.00.png>)

Aiemmin käsitelty URL nousee taas esiin. URLeilla voi ilmaista kaikenlaista, vaikkapa tietokannan osoitteita.

- `postgres://pekkis:salasana@tietokanta.pekkis.eu:8765/pekkiksenkanta`
- `mysql://pekkis:salasana2@myskylä.pekkis.eu:6765/pekkiksenmysqlkanta`

### Kyselyiden luominen kysely-kirjastolla

Ottaaksemme kyselyn käyttöön meidän tuli hieman refaktoroida koodiamme. Se otti oman aikansa, mutta [lopussa seisoi kiitos](../example-applications/border-check/src/main.ts).

### Sorttaus sorttauksen sisällä

Opettajalta kysyttiin, miten id:n perusteella sortatun sivutuksen _sisällä_ voidaan sortata sukunimen perusteella.

Opettaja oli hämmentynyt eikä osannut. Hän yritti käyttää `toSorted()` metodia, mutta sitä ei "löytynyt". Opettaja epäili ensi hätään, että häneltä puuttuu projektin juuresta `tsconfig.json` tiedosto, joten TypeScript kuvittelee, että käytämme jotain tosi vanhaa JavaScriptin versiota.

- https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

Epäilys osoittautui oikeaksi. Opettaja korjasi asian kopioimalla satunnaisen tsconfig-tiedoston satunnaisesta toisesta hankkeesta omalta koneeltaan (react-kurssinsa kansiosta, tarkalleen ottaen). Sitten hän muokkasi sitä kirjoittaessaan tätä raporttia, poistamalla kaikki (ehkä) turhat ja huonot säännöt.

- https://github.com/pekkis/hardcore-react-training
- https://pekkis.github.io/hardcore-react-training/

Kukaan ei muuten koskaan ymmärrä eikä osaa mitenkään ulkoa tsconfig.jsonia. Se kopioidaan aina jostakin ja sitten sitä puukotetaan kunnes kaikki toimii suunnilleen odotetulla tavalla. Älä siis pillastu tai pelästy.

## Git

Sivusimme jälleen hitusen gitiä, pullasimme asioita, päivitimme forkkeja, resetoimme kovaa. Opettaja oli puoliksi ihan yhtä pihalla kuin oppilaat. Hän vain totesi: "opetelkaa Git huolella" ja "opetelkaa Git terminaalissa".

- `git diff`
- `git checkout`
- `git reset`
- `git pull`

  - `git fetch`
  - `git merge`

- https://www.theserverside.com/blog/Coffee-Talk-Java-News-Stories-and-Opinions/Git-pull-vs-fetch-Whats-the-difference

Opettaja itse ei koskaan käytä `git pull` (yhdistelmä fetch + merge) käskyä. Hän aina fetchaa ja sitten mergaa / rebasettaa / resetoi erikseen. Älkää kysykö, miksi hän tekee niin, mitään loogista selitystä ei ole. Suurin osa hänen kollegoistaan pullailee.

## Pakettien asennus ja päivitys

Puhuimme välissä paketeista, pakettien asennuksesta, ja pakettien ylläpitämisestä.

`package.json` sisältää ohjelmamme käyttämät kirjastot. `package-lock.json` on _lukkotiedosto_, jonka ansiosta pakettimme eivät päivity itsestään.

Pakettien ylläpito on tärkeää, mutta vaikeaa. Joskus kaikki hajoaa, kun paketteja päivittää, mutta jos paketteja ei päivitä, ne hajoavat päivitettäessä ihan varmasti.

Heti kun saat minkä tahansa projektin maaliin ja se elää oikeasti livenä jossain, pakettien päivitys muuttuu ihan oikeaksi tekemiseksi.

- https://semver.org/

Lähes kaikki järkevät kirjastot käyttävät nykyään "semanttista versiointia", missä iso (major) päivitys saa olla taaksepäin yhteensopimaton, mutta pienemmät (minor ja patch) eivät saa rikkoa. Joskus näin totta kai vahingossa käy, jonka takia _automaattiset testit_ ovatkin niin tärkeitä. Ilman testejä kaikki voi käytännössä hajota koska vain, jos paketteja vähänkään päivittää.

```js
{
  "name": "some-package",
  "type": "module",
  "version": "1.0.0",
  "dependencies": {
    "fastify": "^5.0.0",
    "kysely": "^0.27.4",
    "pg": "^8.13.0"
  }
}
```

Versio-ranget (`^`, `~` jne) pakettien versiovaatimuksissa ovat tärkeitä. Ne kertovat, miten paketit voivat päivittyä, kun haluamme niitä päivittää. `^` on ehdottomasti yleisin, silloin paketti saa päivittyä vapaasti, kunhan kyseessä ei ole major-päivitys (ensimmäinen numero).

- https://dev.to/typescripttv/understanding-npm-versioning-3hn4

Jos ja kun paketteja päivitetään (JS-projekteissa "kerran kuukaudessa säännöllisesti" on hyvä nyrkkisääntö), se tapahtuu joko muokkaamalla package.jsonia käsin (mielellään ei näin) tai erilaisten interaktiivisten / automaattisten työkalujen avulla.

- `npx npm-check-updates`

![alt text](<Screenshot 2024-09-26 at 19.02.12.png>)

PNPM:ssä on tosi hyvät interaktiiviset työkalut. Niitä käytän itse paljon.

- `pnpm upgrade --interactive`
- `pnpm upgrade --interactive --latest` (myös major-päivitykset)

![alt text](<Screenshot 2024-09-26 at 19.04.41.png>)

Tässä vielä esimerkki puoliautomaattisesta päivitys-työkalusta, joka tekee pullareita puolestasi.

- https://github.com/renovatebot/renovate
