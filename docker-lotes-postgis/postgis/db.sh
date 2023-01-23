#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
  CREATE TABLE lotes (id SERIAL PRIMARY KEY,name VARCHAR(128),geom geometry,area VARCHAR(10));
  CREATE INDEX lotes_gix ON lotes USING GIST (geom)
EOSQL
