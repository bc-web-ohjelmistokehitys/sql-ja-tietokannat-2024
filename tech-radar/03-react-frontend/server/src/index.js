import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import pg from "pg";
import { createRadar } from "./utils.js";

const { Client } = pg;
const client = new Client();
await client.connect();

/* eslint-disable-next-line new-cap -- because fastify */
const server = Fastify({
  logger: true,
});

await server.register(cors, {
  // put your options here
});

server.get("/", async () => ({ hello: "world" }));

server.get("/config.json", async () => {
  const { rows } = await client.query("SELECT tech, quadrant, ring FROM radar");
  return createRadar(rows);
});

try {
  await server.listen({ port: process.env.FASTIFY_PORT });
} catch (err) {
  server.log.error(err);
  throw err;
}
