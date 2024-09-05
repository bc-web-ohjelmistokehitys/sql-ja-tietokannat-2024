import * as R from "ramda";
import { DateTime } from "luxon";

/**
 * Maps a row to a tech object.
 * @param {Object} row The db row to map
 * @returns {Object} The radar
 * @throws {Error} If the row is invalid.
 */
function rowMapper(row) {
  return {
    id: row.id,
    quadrant: row.quadrant,
    ring: row.ring,
    name: row.name,
    active: true,
    moved: 0,
    url: row.url || `#`,
    description: row.description,
    // moved: random.pick([-1, 0, 1, 2]),
  };
}

/**
 * Creates a radar from the given rows.
 * @param {import("pg").Client} client Database client
 * @returns {Array} Radars
 */
export async function getAllRadars(client) {
  const { rows: radars } = await client.query(
    "SELECT id, name, created_at as date FROM radar ORDER BY id ASC"
  );

  return radars;
}

/**
 * Creates a radar from the given rows.
 * @param {import("pg").Client} client Database client
 * @param {number} id The radar id
 * @returns {Object} The radar.
 */
export async function createRadar(client, id) {
  const { rows: radars } = await client.query(
    "SELECT name, created_at FROM radar WHERE id = $1",
    [id]
  );

  if (radars.length === 0) {
    throw new Error("Radar not found");
  }

  const { rows } = await client.query(
    "SELECT blip.id, tech.name, tech.quadrant, tech.url, tech.description, blip.ring FROM blip JOIN tech ON (blip.tech_id = tech.id) JOIN radar ON(blip.radar_id = radar.id) WHERE radar.id = $1 ORDER BY blip.id DESC",
    [id]
  );

  const radar = radars[0];

  /* eslint-disable-next-line no-console -- because we want to see. */
  console.log("techs from db", rows);

  const techs = rows.map((row) => rowMapper(row));

  const inversed = R.reverse(techs);
  const deduped = R.uniqBy(R.prop("id"), inversed);
  const filtered = deduped.filter((tech) => tech);

  const now = DateTime.fromJSDate(radar.created_at);

  const ret = {
    id: 1,
    date: now.toISO(),
    name: radar.name,
    quadrants: [
      { name: "Languages & Frameworks" },
      { name: "Datastores" },
      { name: "Tools & Techniques" },
      { name: "Platforms" },
    ],
    rings: [
      { name: "ADOPT", color: "#5ba300" },
      { name: "TRIAL", color: "#009eb0" },
      { name: "ASSESS", color: "#c7ba00" },
      { name: "HOLD", color: "#e09b96" },
    ],
    entries: filtered,
    url: "https://dr-kobros.com",
  };

  return ret;
}
