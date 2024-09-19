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
