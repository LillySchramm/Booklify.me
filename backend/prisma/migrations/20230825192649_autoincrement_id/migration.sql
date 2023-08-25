-- AlterTable
CREATE SEQUENCE secret_id_seq;
ALTER TABLE "Secret" ALTER COLUMN "id" SET DEFAULT nextval('secret_id_seq');
ALTER SEQUENCE secret_id_seq OWNED BY "Secret"."id";
