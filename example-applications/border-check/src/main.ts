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

fastify.get("/", async (request, reply) => {
  const result = await client.query(
    "SELECT * FROM person ORDER BY id LIMIT 1000"
  );

  reply.send(result.rows);
});

fastify.listen({ port: 5678 }).then((address) => {
  console.log("hellurei!");
});
