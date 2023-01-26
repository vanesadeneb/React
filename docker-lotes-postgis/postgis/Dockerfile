FROM postgis/postgis
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD postgres
ENV POSTGRES_HOST_AUTH_METHOD 0.0.0.0/0
ENV POSTGRES_DB locations
COPY db.sh /docker-entrypoint-initdb.d/
COPY update-postgis.sh /docker-entrypoint-initdb.d/
COPY initdb-postgis.sh /docker-entrypoint-initdb.d/