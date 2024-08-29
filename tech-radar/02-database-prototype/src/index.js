import "dotenv/config";
import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";
import { createRadar } from "./utils.js";

const { Client } = pg;
const client = new Client();
await client.connect();

/* eslint-disable-next-line no-underscore-dangle -- because convention */
const __dirname = dirname(fileURLToPath(import.meta.url));

/* eslint-disable-next-line new-cap -- because fastify */
const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyStatic, {
  root: path.join(__dirname, "..", "public"),
  index: "index.html",
});

fastify.get("/config.json", async () => {
  // TODO: fix this seriously XXX-555
  const { rows } = await client.query("SELECT tech, quadrant, ring FROM radar");

  return createRadar(rows);
});

try {
  await fastify.listen({ port: 3000 });
} catch (err) {
  fastify.log.error(err);
  throw err;
}
