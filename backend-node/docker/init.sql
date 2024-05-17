CREATE USER eperform with encrypted password 'eperform';
CREATE DATABASE eperform_database;
ALTER DATABASE eperform_database OWNER TO eperform;
GRANT ALL ON SCHEMA public TO eperform;
GRANT ALL PRIVILEGES ON DATABASE eperform_database TO eperform;
