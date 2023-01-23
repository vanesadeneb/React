#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
    CREATE TABLE lotes ( 
  srid       INTEGER NOT NULL PRIMARY KEY, 
  auth_name  VARCHAR(256), 
  auth_srid  INTEGER, 
  srtext     VARCHAR(2048), 
  proj4text  VARCHAR(2048) 
);
EOSQL
