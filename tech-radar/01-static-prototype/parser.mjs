import assert from "node:assert";
import { parse } from "csv-parse/sync";
import fs from "node:fs";
import * as R from "ramda";

console.log("READING RADAR CONFIG...");

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

const input = fs.readFileSync("radar.csv", "utf8");

const records = parse(input, {
  columns: true,
  skip_empty_lines: true,
  delimiter: [";", ","],
});

/*
    {
      "quadrant": 3,
      "ring": 2,
      "label": "AWS Glue",
      "active": true,
      "moved": 0
    },
*/

const json = records.map((record) => {
  if (
    ringMap[record.Ring] === undefined ||
    quadrantMap[record.Quadrant] === undefined
  ) {
    console.log("ERROR: ", record);
    return;
  }

  return {
    quadrant: quadrantMap[record.Quadrant],
    ring: ringMap[record.Ring],
    label: record.Tech,
    active: true,
    moved: 0,
  };
});

const inversed = R.reverse(json);
const deduped = R.uniqBy(R.prop("label"), inversed);

const json2 = {
  date: "2024.08",
  entries: deduped,
};

console.log("WRITING RADAR JSON...");
fs.writeFileSync("./public/config.json", JSON.stringify(json2, null, 2));
