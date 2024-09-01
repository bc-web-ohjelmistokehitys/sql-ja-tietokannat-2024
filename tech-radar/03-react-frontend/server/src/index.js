import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import pg from "pg";
import { createRadar } from "./radar.js";

const { Client } = pg;
const client = new Client();
await client.connect();

/* eslint-disable-next-line new-cap -- because fastify */
const server = Fastify({
  logger: true,
});

await server.register(cors, {
  // CORS (google this!) options here.
});

server.get("/", async () => ({ hello: "world" }));

server.get("/radar.json", async () => {
  const radar = await createRadar(client);
  return radar;
});

try {
  await server.listen({ port: process.env.FASTIFY_PORT });
} catch (err) {
  server.log.error(err);
  throw err;
}
