CREATE USER adonis with encrypted password 'adonis';
CREATE DATABASE adonis_app;
ALTER DATABASE adonis_app OWNER TO adonis;
GRANT ALL ON SCHEMA public TO adonis;
GRANT ALL PRIVILEGES ON DATABASE adonis_app TO adonis;
