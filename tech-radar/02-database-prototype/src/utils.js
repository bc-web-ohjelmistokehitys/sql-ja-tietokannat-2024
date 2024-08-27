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

export const rowMapper = (row) => {
  if (
    ringMap[row.ring] === undefined ||
    quadrantMap[row.quadrant] === undefined
  ) {
    console.log("ERROR: ", row);
    return;
  }

  return {
    quadrant: quadrantMap[row.quadrant],
    ring: ringMap[row.ring],
    label: row.tech,
    active: true,
    moved: 0,
  };
};

export const createRadar = (rows) => {
  const techs = rows.map((row) => rowMapper(row));

  const inversed = R.reverse(techs);
  const deduped = R.uniqBy(R.prop("label"), inversed);
  const filtered = deduped.filter((tech) => tech);

  const ret = {
    date: "2024.08",
    entries: filtered,
  };

  return ret;
};
