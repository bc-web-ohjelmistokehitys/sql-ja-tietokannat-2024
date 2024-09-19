# tunti 5

## luento

50% recap presentaatio, hurraa!

https://docs.google.com/presentation/d/1KEDtCIVmUFvjiojcBnTPPJZoPM5-KLfEowKxZG17sBg/

## teoriaa

![Kaunis presentaatio datan liikkeestä](<Screenshot 2024-09-19 at 21.36.00.png>)

Jotta ohjelmointikielemme voi ottaa yhteyden tietokantaan, tarvitaan kirjasto, joka tekee sen.

- [pg](https://node-postgres.com/) on esimerkki matalan tason kirjastosta, jonka kanssa työskentelemme raa'alla SQL:llä.
- [kysely](https://kysely.dev/) on esimerkki kirjastosta, joka auttaa meitä kirjoittamaan SQL:ää.
- [ORM](https://hibernate.org/orm/) on raskaan sarjan ratkaisu, joka pyrkii piilottamaan tietokannan ja SQL:n kokonaan koodarilta. ORM-villitys tulee ja menee, se on yksi alan sykleistä.

## backend-koodausta

- pystytimme uuden projektin nollasta
- päätimme käyttää [TypeScriptiä](https://www.typescriptlang.org/), koska siltä ei voi työelämässä paeta, ja se antaa meille kaipaamamme apupyörät.
- Käytämme [edelliseltä tunnilta](../04/tunti.md) tuttua 3.000.000 rivin ihmistietokantaa.
- Olisimme käyttäneet [PNPM](https://pnpm.io/):ää, mutta se ei suostunut yhteistyöhön. Tähän syynä se, että node on koneillenne asennettu brew'stä, ja siinä [corepack](https://nodejs.org/api/corepack.html) ei jostain syystä tunnu toimivan.

Node asennetaan yleensä esimerkiksi NVM-nimisellä työkalulla, jotta eri projektit voivat käyttää eri versiota. Node itse suosittelee tätä tapaa. Itse olen käyttänyt nvm:ää vuosia, ja se on hyvä. Omalla koneella / paremmalla ajalla kannattaa katsoa tätä.

- https://nodejs.org/en/download/package-manager

Tällä ei ole suurtakaan väliä. Noden mukana automaattisesti tuleva [npm](https://docs.npmjs.com/cli/v10/commands) - työkalu ajaa saman asian. PNPM on vain parempi, ja olen itse tottunut käyttämään sitä. Teidän on hyvä opetella käyttämään _kaikkia_, koska käytettävä asiakasohjelma vaihtelee aina projekteittain. Molemmat ovat OK.

- https://docs.npmjs.com/cli/v10/commands

Asiasta tekee hämäävän se, että kumpikin käyttää samaa "npm" nimistä taustajärjestelmää, jossa paketit asuvat. NPM tarkoittaa sekä paikkaa, missä paketit asuvat, sekä ohjelmistoa, jolla paketteja hallitaan (npm, yarn, pnpm).

Käytimme ainakin näitä komentoja:

- `npm init` alustaa uuden projektin ja luo `package.json` tiedoston.
- `npm i <paketti>` asentaa paketin
- `npm i` asentaa kaikki paketit, jotka löytyvät `package.json` tiedostosta. Ne menevät `node_modules` alle.
- `npm run` ajaa scriptejä, jotka on koodattu `package.json` tiedoston scripts-osioon. Loimme `dev` nimisen skriptin, jota voimme ajaa komennolla `npm run dev`

Otimme käyttöön Gitin, koska koodi tykkää elää versionhallinnassa.

- `git init`
- `git add`
- `git commit`

`node_modules` kansiota ei koskaan laiteta repoon, joten loimme ja muokkasimme `.gitignore` tiedostoa estääksemme sen.

Askel askeleelta edeten, hitaasti mutta varmasti, saavutimme seuraavan lopputuloksen:

- [koodi](../example-applications/border-check/)
- `npm dev`
- [avaa selain](http://localhost:5678)
- ![kuvaruutukaappaus](<Screenshot 2024-09-19 at 22.29.55.png>)

Näyttääkö JSON selaimessasi rumalta? [JSON formatter](https://chromewebstore.google.com/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa) auttaa.

Käyttämämme kirjastot ja työkalut:

- [tsx](https://tsx.is/)
- [pg](https://node-postgres.com/)
- [fastify](https://fastify.dev/)
- [JSON](https://www.json.org/json-en.html) on webin de facto standardi tiedonsiirtomuoto. Joskus käytettiin / käytetään [XML](https://fi.wikipedia.org/wiki/XML):ää, mutta ei onneksi usein. Käänny toiseen suuntaan ja juokse, jos näet sitä.

## mamp, docker et al

Jossain vaiheessa puhuimme MAMPista. Sanoin, että siihen ei törmää työelämässä, ja että asennettuamme MAMPin, tehtävänämme on "oppia sieltä ulos".

En ollut varmaan ihan reilu MAMPille. Tähdennän, että sama "ulos oppiminen" pätee oikeastaan kaikkeen, mitä tässä opetellaan, yhtä lailla omiin opetuksiini. Itsekin olen puhunut paljon "mustista laatikoista" (black box), ja MAMP on tällainen musta laatikko. Olen myös itse aika syrjässä Wordpress / PHP - maailmasta, joten MAMP voi jopa olla siellä yleisempi. [Local](https://localwp.com/) jutusta olen kuullut, ja tiedän, että jotkut ovat sitä käyttäneet.

Mustat laatikot ovat hyviä ja pahoja, koska ne sallivat meidän aloittaa _jostakin_, ilman että meidän pitää ymmärtää kaikki. MAMP piilottaa allensa [PHP](https://php.net/):n, [MySQL](https://mariadb.com/):n, [Apachen](https://httpd.apache.org/) ja / tai [Nginxin](https://nginx.org/en/) (Nginx korvasi apachen omassa käytössäni joskus ~2010-2011, enkä ole sen jälkeen Apacheen juuri törmännyt).

"Ulos oppimisella" tarkoitan sitä, että tehtävänänne on lopulta oppia ymmärtämään kaikki nämä erilliset palaset, ja työskennellä niiden kanssa _ilman apupyöriä_. Näitä kaikkia ei välttämättä tarvitse suoraan työelämässä, mutta ne tulee ymmärtää pärjätäkseen (mitä ne ovat, miten niiden kanssa järkeillään). Vaikka käyttäisi paketoituja palveluja, jotka piilottavat monimutkaisuuksia, niiden ymmärtäminen auttaa tosi paljon.

Oikeissa projekteissa PHP:n, Apachen, MySQL:n, PostgreSQL:n ja monta muuta riippuvuutta hoidetaan usein esimerkiksi [Docker](https://www.docker.com/)-nimisellä systeemillä. Se vasta on tosi monimutkainen himmeli. Kannattaa muistaa se, koska se tulee eteen myöhemmin. Mutta ensin saatte rauhassa oppia kävelemään, ja vasta kun kävely sujuu, aletaan juosta! :)

JavaScript-fronttikoodaus on usein helpompaa, koska siinä riittää Node ja NPM. Mutta heti, jos tehdään jotain palvelinpään juttua, asiat muuttuvat monimutkaisiksi. Yhdellä kehittäjällä on koneellaan monta projektia, jotka kaikki käyttävät eri ohjelmistoja, ja eri ohjelmistojen eri versioita. Tämän kaaoksen hallitseminen on tosielämässä tosi vaikeaa, ja esimerkiksi pelkkä `brew` ei siihen hyvin riitä.
