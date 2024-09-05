# Tech Radar React + Database version

## Setting up the database

`secrets/schema.sql` is a working SQL script that generates a schema and also random data for 100 different radars.

**WARNING!** FOLLOWING THIS INSTRUCTION WILL DESTROY YOUR OWN PRE-EXISTING DATABASE, IF SUCH EXISTS WITH THE SAME NAME.

Edit `server/.env` (look at development instructions below) to alter database name. By default it's `technologyradar`. Alter the database name also the following commands if you decide to change it.

- `createdb technologyradar` (if not already exists)
- `psql technologyradar < secrets/schema.sql`

## Development

- `corepack enable`
  - if this results in an error (corepack is not found) it means that you have a bit weird version of Node installed (corepack should be included). Either of these (I would recommend the first one) should fix it.
    - `npm -g i pnm`
    - `brew install corepack`
  - you don't have to repeat this all the time, just max 1 times per shell session. If `pnpm i` doesn't yield results, run it.
- `pnpm i`
  - If corepack asks you whether it's ok to download something, yes yes.
- `cp server/.env.example server/.env`
- `cp client/.env.local.example client/.env.local`
- `pnpm run dev`

Open a browser and surf to http://localhost:5173/

The backend can be found at: http://localhost:4444/. It has two endpoints, for all the radars and a single radar (with radar id).

- http://localhost:4444/radar.json
- http://localhost:4444/radar/1.json
