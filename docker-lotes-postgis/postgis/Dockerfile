FROM postgis/postgis
ENV POSTGRES_HOST_AUTH_METHOD trust
ENV POSTGRES_DB locations
COPY db.sh /docker-entrypoint-initdb.d/
COPY update-postgis.sh /docker-entrypoint-initdb.d/
COPY initdb-postgis.sh /docker-entrypoint-initdb.d/
