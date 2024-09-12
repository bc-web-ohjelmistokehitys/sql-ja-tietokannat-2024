import "dotenv/config";

import { faker } from "@faker-js/faker";
import * as R from "ramda";
import { DateTime } from "luxon";
import {
  randomFirstName,
  randomLastName,
} from "@pekkis/finnish-name-randomizer";
import { parseArgs } from "node:util";

import { db } from "./kysely.js";
import { encrypt, hashPassword } from "scripts/secrets.js";

const args = parseArgs({
  options: {
    people: { type: "string", default: "100" },
    batchSize: { type: "string", default: "20" },
  },
});

const NUMBER_OF_PEOPLE = parseInt(args.values.people!, 10);
const BATCH_SIZE = parseInt(args.values.batchSize!, 10);

console.log(`WELCOME TO FAKE PERSON CREATOR!`);
console.log(`BATCH SIZE: ${BATCH_SIZE}`);

const getUrl = (n: number): string => {
  const padded = n.toString().padStart(6, "0");

  return (
    "/" +
    padded.substring(1, 2) +
    "/" +
    padded.substring(2, 3) +
    "/" +
    padded +
    ".jpg"
  );
};

type Person = {
  sex: "m" | "f";
  gender: string;
  lastName: () => string;
  firstName: () => string;
  birthday: string;
  deathDay: () => string | null;
  hasPassport: boolean;
  hasApb: boolean;
};

const insertPerson = async (person: Person) => {
  const pimageId = faker.number.int({ min: 1, max: 10000 });

  // const p0 = performance.now();
  const password = await hashPassword(faker.internet.password());
  // const p1 = performance.now();

  // console.log(p1 - p0, "cost of hashing password");

  const ret = await db
    .insertInto("person")
    .values({
      gender: person.gender,
      first_name: person.firstName(),
      last_name: person.lastName(),
      sex: person.sex,
      birthday: person.birthday,
      password,
      personal_identification_number: encrypt(crypto.randomUUID()),
      deathday: person.deathDay(),
    })
    .returning("id")
    .execute();

  const personId = ret[0]!.id;

  if (person.hasPassport) {
    const passportNumber = crypto.randomUUID();

    const imageRet = await db
      .insertInto("image")
      .values({
        url: getUrl(pimageId),
      })
      .returning("id")
      .execute();

    const v = faker.date.past({ years: 4 });

    const validFrom = DateTime.fromJSDate(v);
    const validTo = validFrom.plus({ years: 5 });

    await db
      .insertInto("passport")
      .values({
        person_id: personId,
        uuid: passportNumber,
        passport_image_id: imageRet[0]!.id,
        valid_from: validFrom.toISODate() as string,
        valid_until: validTo.toISODate() as string,
      })
      .execute();
  }

  if (person.hasApb) {
    await db
      .insertInto("apb")
      .values({
        person_id: personId,
        description: faker.lorem.paragraph(),
        issue_date: DateTime.fromJSDate(
          faker.date.past({ years: 10 })
        ).toISODate() as string,
        status: faker.helpers.arrayElement(["open", "closed"]),
      })
      .execute();
  }
};

const createPerson = (): Person => {
  const sex = faker.person.sex() as "male" | "female";
  const gender = faker.person.gender();

  const bd = faker.date.past({ years: 130 });

  const dt = DateTime.fromJSDate(bd);

  const isAlive = faker.number.int({ min: 0, max: 100 }) < 95;

  const hasPassport = faker.number.int({ min: 0, max: 100 }) <= 20;

  const hasApb = faker.number.int({ min: 0, max: 100 }) === 1;

  return {
    lastName: () => randomLastName(),
    firstName: () => randomFirstName({ sex, firstNamesOnly: true }),
    gender,
    sex: sex === "male" ? "m" : "f",
    birthday: dt.toISODate() as string,
    deathDay: () => {
      if (isAlive) {
        return null;
      }

      const dd = faker.date.between({ from: bd, to: new Date() });
      return DateTime.fromJSDate(dd).toISODate() as string;
    },
    hasPassport,
    hasApb,
  };
};

const people = R.times(createPerson, NUMBER_OF_PEOPLE);

const groups = R.splitEvery(BATCH_SIZE, people);

let key = 1;

for (const group of groups) {
  console.log(`INSERTING BATCH ${key} of ${groups.length}`);

  const promises = group.map((person) => insertPerson(person));

  await Promise.all(promises);

  key = key + 1;
}
/*
const groups = R.splitEvery(BATCH_SIZE, people);

groups.forEach((group) => {
  const rows = group.map((person) => {
    return `('${
      person.birthDate
    }', ${person.firstName()}, ${person.lastName()}, '${person.sex}', '${
      person.gender
    }')`;
  });

  const insertPeople = `
INSERT INTO person (birth_date, first_name, last_name, sex, gender)
VALUES
${rows.join(",\n")};
`;

  console.log(insertPeople);
});
*/

await db.destroy();
