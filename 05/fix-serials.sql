/*

https://www.postgresql.org/docs/17/ddl-identity-columns.html

*/


BEGIN;

SELECT * FROM person_id_seq; -- get the current value from here. use later.

ALTER TABLE person ALTER id DROP DEFAULT; -- drop default

DROP SEQUENCE person_id_seq;             -- drop owned sequence

ALTER TABLE person
   ALTER id ADD GENERATED ALWAYS AS IDENTITY (RESTART 3000001);
COMMIT;

BEGIN;
ALTER TABLE passport ALTER id DROP DEFAULT; -- drop default

DROP SEQUENCE passport_id_seq;             -- drop owned sequence

ALTER TABLE passport
   ALTER id ADD GENERATED ALWAYS AS IDENTITY (RESTART 3000001);
COMMIT;

BEGIN;
ALTER TABLE apb ALTER id DROP DEFAULT; -- drop default

DROP SEQUENCE apb_id_seq;             -- drop owned sequence

ALTER TABLE apb
   ALTER id ADD GENERATED ALWAYS AS IDENTITY (RESTART 50000);
COMMIT;

BEGIN;
ALTER TABLE image ALTER id DROP DEFAULT; -- drop default

DROP SEQUENCE image_id_seq;             -- drop owned sequence

ALTER TABLE image
   ALTER id ADD GENERATED ALWAYS AS IDENTITY (RESTART 700000);
COMMIT;

