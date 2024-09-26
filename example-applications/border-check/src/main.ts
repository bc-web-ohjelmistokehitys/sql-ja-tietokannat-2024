// npm i --save-dev dotenv

// EKA IMPORT!!!! EKAAAAAAA!
import "dotenv/config";

import Fastify from "fastify";
import pg from "pg";

import { Kysely, PostgresDialect } from "kysely";
import { DB } from "kysely-codegen";
// import { Pool } from "pg";

const { Client, Pool } = pg;

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({
      connectionString: process.env.DATABASE_URL,
    }),
  }),
});

console.log("HUHHAHHEI", process.env.DATABASE_URL);

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  // database: "suomioy",
});

await client.connect();

// vasta kun yhteys on muodostunut

console.log("connettore!");

const fastify = Fastify({
  logger: true,
});

fastify.get<{
  Params: {
    id: string;
  };
}>("/person/:id", async (request, reply) => {
  const id = request.params.id;

  const result = await db
    .selectFrom("person")
    .select(["id", "first_name", "last_name"])
    .where("id", "=", parseInt(id, 10))
    .executeTakeFirstOrThrow();

  return result;
  // the same ->

  /*
  const sql = `SELECT
    id, first_name, last_name
    FROM person
    WHERE id = $1
  `;

  const result = await client.query(sql, [id]);

  if (result.rows.length !== 1) { 
    throw new Error('foofofofo')
  }
  reply.send(result.rows[0]);

  */
});

// create new person

fastify.get<{
  Querystring: {
    page: string;
    sortBy: "id" | "last_name";
  };
}>("/person", async (request, reply) => {
  const page = request.query.page || "1";

  const offset = (parseInt(page, 10) - 1) * 100;

  const sortBy = request.query.sortBy || "id";

  /*
  http://127.0.0.1:5678/person?page=2&sortBy=last_name LIMIT 1; DROP TABLE person CASCADE;--
  */

  const result = await db
    .selectFrom("person")
    .select(["id", "first_name", "last_name"])
    .orderBy(sortBy)
    .offset(offset)
    .limit(100)
    .execute();

  return result.toSorted((a, b) => {
    return a.last_name.localeCompare(b.last_name);
  });
  // sama asia kuin return ylemmällä rivillä -> reply.send(result);

  /*
  const sql = `SELECT
    id, first_name, last_name
    FROM person
    ORDER BY ${sortBy} ASC
    LIMIT 100 OFFSET $1
  `;

  const result = await client.query(sql, [offset]);

  reply.send(result.rows);
  */
});

fastify.listen({ port: 5678 }).then((address) => {
  console.log("hellurei!");
});
