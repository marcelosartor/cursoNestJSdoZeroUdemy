CREATE EXTENSION "uuid-ossp" SCHEMA "public";

CREATE user algafood superuser;

ALTER user algafood password 'P1#fE3@s';

CREATE database algafood;

\connect "algafood";

CREATE EXTENSION "uuid-ossp" SCHEMA "public";
