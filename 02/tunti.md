# Tunti 02

## Miten kaikki osat liittyvät yhteen?

- client / server
- Kun Pekkis avaa webbiselaimen ja menee osoitteeseen https://www.pekkis.eu, mitä oikeasti tapahtuu?

  - nimipalvelut (DNS) -> IP-osoite (ipv4, ipv6)
  - ip.osoite + [portti](<https://fi.wikipedia.org/wiki/Portti_(tietoliikenne)>)
  - TCP/IP (teidän ei tarvitse ymmärtää tätä syvällisesti)
  - HTTP-protokolla (teidän pitää ymmärtää tämä syvällisesti ennen pitkää)
  - HTTP-palvelinohjelmisto ottaa pyynnön vastaan portissa 443 (SSL)
  - lopulta pyyntö päätyy jonkinlaiselle mankelille joka käsittelee pyynnön
    - usein tässä kohtaa serverillä pyörivä ohjelmisto ottaa yhteyttä jonkun sortin tietovarastoon, esim. **relaatiotietokantaan**, ja hakee sieltä tavaraa.
    - Tietokannasta tiristetystä tiedosta ja muusta tavarasta turautetaan palvelimella kasaan HTTP-protokollan mukainen vastaus, headerit + varsinainen HTML, joka palautetaan asiakkaalle.

  ### Työkaluja

  - curlutus on webbikoodarin perustyökalu
    - `curl --verbose https://www.pekkis.eu/blogi/2017/04/10/hopeakettu-muistelee-osa-1-laimea-uhka`
  - `nmap`
    - `brew install nmap`
    - ÄLÄ nmappaile satunnaisia palvelimia huviksesi.

## Tekkitutka

Rakennetaan organisaation tekkitutka (esim. https://opensource.zalando.com/tech-radar/)

Tätä osiota varten pitää pystyttää ja nostaa pystyyn `postgresql` ja `node`. Ne saattavat olla jo pystytettynä, jos eivät, asenna ja pystytä ne.

- PostgreSQL:n osalta [lue ykköstunnin muistiinpanot](../01/tunti.md)
- Noden osalta:
  - "Tosielämässä" käytetään NVM:n kaltaista työkalua:
    - https://nodejs.org/en/download/package-manager
  - `brew install node` toimii myös, mutta JOMPI KUMPI, ei kumpaakin. Yhdessä ne toimivat... kehnonlaisesti!
  - [PNPM](https://pnpm.io/) on paketinhallintaohjelmisto, sama kuin npm, mutta parempi. On olemassa (me emme käytä sitä) myös [Yarn](https://yarnpkg.com/). npm, pnpm ja yarn hakevat pakettinsa samasta paikasta, ja `package.json` on kaikkien osalta olennainen tiedosto, missä käytettävät paketit määritetään. Tämä tiedosto sijaitsee aina JavaScriptillä (tai TypeScriptillä) tehdyn ohjelmistoprojektin juuressa.

### Staattinen POC

- [staattisen esimerkin kansio](../tech-radar/01-static-prototype/)
- asennusohjeet kansiossa
- CSV:hen (exportti excelistä) perustuva versio

### Tietokantapohjainen versio

- [ohjelmiston kansio](../tech-radar/02-database-prototype/)
- asennusohjeet kansiossa
