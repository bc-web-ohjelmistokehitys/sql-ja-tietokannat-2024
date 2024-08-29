# Tech Radar Database version

## Development

Open the base folder (the folder where this readme is) in VSCode.

- `corepack enable`
  - if this results in an error (corepack is not found) it means that you have a bit weird version of Node installed (corepack should be included). Either of these (I would recommend the first one) should fix it.
    - `npm -g i pnm`
    - `brew install corepack`
  - you don't have to repeat this all the time, just max 1 times per shell session. If `pnpm i` doesn't yield results, run it.
- `pnpm i`
  - If corepack asks you whether it's ok to download something, yes yes.
- `cp .env.example .env` Look at inside the file.
- `pnpm run start`

If the browser doesn't open automatically when you run the last command, surf to http://localhost:3000/

**If PHP stuff has already reserved port 3000, open `src/index.js`, find '3000' and switch it to be for example 4000, and then surf to http://localhost:4000/**

This is not meant to work without user interference. We are missing a database and all the stuff inside it.

## Database

There is a `secrets` directory that holds the teacher's version of the database. If you missed the class, you can investigate it and copy-paste it to your database.

- `createb techradar`
- `psql techradar`
- copy paste here.
