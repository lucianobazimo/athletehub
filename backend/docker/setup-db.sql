CREATE USER elysia with encrypted password 'elysia';
CREATE DATABASE elysia_app;
ALTER DATABASE elysia_app OWNER TO elysia;

GRANT ALL ON SCHEMA public TO elysia;
GRANT ALL PRIVILEGES ON DATABASE elysia_app TO elysia;
