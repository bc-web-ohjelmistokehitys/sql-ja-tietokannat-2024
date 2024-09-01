import * as R from "ramda";

const quadrantMap = {
  Programming: 0,
  Databases: 2,
  Platforms: 3,
  Tools: 1,
};

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

  const ret = {
    date: "2024.08",
    entries: filtered,
  };

  return ret;
}
