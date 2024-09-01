import * as R from "ramda";
import { DateTime } from "luxon";
// import random from "./random.js";

/* map quadrant string names to quadrant number */
const quadrantMap = {
  Programming: 0,
  Databases: 2,
  Platforms: 3,
  Tools: 1,
};

/* map ring string names to ring number */
const ringMap = {
  Adopt: 0,
  Trial: 1,
  Assess: 2,
  Hold: 3,
};

/**
 * Maps a row to a tech object.
 * @param {Object} row The db row to map
 * @returns {Object} The radar
 * @throws {Error} If the row is invalid.
 */
export function rowMapper(row) {
  if (
    typeof ringMap[row.ring] === "undefined" ||
    typeof quadrantMap[row.quadrant] === "undefined"
  ) {
    throw new Error("Invalid ring or quadrant");
  }

  return {
    quadrant: quadrantMap[row.quadrant],
    ring: ringMap[row.ring],
    label: row.tech,
    active: true,
    moved: 0,
    link: `#`,
    // moved: random.pick([-1, 0, 1, 2]),
  };
}

/**
 * Creates a radar from the given rows.
 * @param {Array} rows The rows to create the radar from.
 * @returns {Object} The radar.
 */
export function createRadar(rows) {
  const techs = rows.map((row) => rowMapper(row));

  const inversed = R.reverse(techs);
  const deduped = R.uniqBy(R.prop("label"), inversed);
  const filtered = deduped.filter((tech) => tech);

  const now = DateTime.utc();

  const ret = {
    id: 1,
    date: now.toISO(),
    title: "Dr. Kobros Tech Radar",
    quadrants: [
      { name: "Languages & Frameworks" },
      { name: "Tools & Techniques" },
      { name: "Datastores" },
      { name: "Platforms" },
    ],
    rings: [
      { name: "ADOPT", color: "#5ba300" },
      { name: "TRIAL", color: "#009eb0" },
      { name: "ASSESS", color: "#c7ba00" },
      { name: "HOLD", color: "#e09b96" },
    ],
    entries: filtered,
  };

  return ret;
}
