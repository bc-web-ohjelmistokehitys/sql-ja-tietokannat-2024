import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import pg from "pg";
import { createRadar, getAllRadars } from "./radar.js";

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
  const radars = await getAllRadars(client);

  return radars;
});

server.get("/radar/:id.json", async (request, response) => {
  const { id } = request.params;

  try {
    const radar = await createRadar(client, id);
    return radar;
  } catch (e) {
    // eslint-disable-next-line no-console -- because we want to see.
    console.error(e);

    return response.code(404).send({ error: e.message });
  }
});

try {
  await server.listen({ port: process.env.FASTIFY_PORT });
} catch (err) {
  server.log.error(err);
  throw err;
}
