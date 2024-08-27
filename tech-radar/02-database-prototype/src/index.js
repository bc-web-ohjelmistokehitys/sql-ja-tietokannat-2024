import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "path";
import pg from "pg";
import { createRadar } from "./utils.js";

console.log("wait for the database to connect");

const { Client } = pg;
const client = new Client({
  database: "techradar",
});
await client.connect();

console.log("database is ready");

const __dirname = dirname(fileURLToPath(import.meta.url));

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
  index: "index.html",
});

fastify.get("/config.json", async function handler(request, reply) {
  const { rows } = await client.query("SELECT tech, quadrant, ring FROM radar");

  return createRadar(rows);
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
