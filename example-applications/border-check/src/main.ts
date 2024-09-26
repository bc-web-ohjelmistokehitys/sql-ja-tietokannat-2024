import Fastify from "fastify";
import pg from "pg";

const { Client } = pg;

const client = new Client({
  database: "suomioy",
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

  const sql = `SELECT
    id, first_name, last_name
    FROM person
    WHERE id = $1
  `;

  const result = await client.query(sql, [id]);

  reply.send(result.rows[0]);
});

// create new person
fastify.post("/person", () => {});

fastify.get<{
  Querystring: {
    page: string;
    sortBy: string;
  };
}>("/person", async (request, reply) => {
  const page = request.query.page || "1";

  const offset = (parseInt(page, 10) - 1) * 100;

  const sortBy = request.query.sortBy || "id";

  /*
  http://127.0.0.1:5678/person?page=2&sortBy=last_name LIMIT 1; DROP TABLE person CASCADE;--
  */

  const sql = `SELECT
    id, first_name, last_name
    FROM person
    ORDER BY ${sortBy} ASC
    LIMIT 100 OFFSET $1
  `;

  const result = await client.query(sql, [offset]);

  reply.send(result.rows);
});

fastify.listen({ port: 5678 }).then((address) => {
  console.log("hellurei!");
});
