import dotenv from 'dotenv';

dotenv.config();
const {
    DB_USER,
    DEV_DB_NAME,
    DEV_DB_HOST,
    DB_PASSWORD,
    PROD_DB_HOST,
    PROD_DB_USER,
    PROD_DB_NAME,
    PROD_DB_PASSWORD,
} = process.env;

module.exports = {
    development: {
        username: DB_USER,
        password: DB_PASSWORD,
        database: DEV_DB_NAME,
        host: DEV_DB_HOST
    },
    production: {
        username: PROD_DB_USER,
        password: PROD_DB_PASSWORD,
        database: PROD_DB_NAME,
        host: PROD_DB_HOST
    }
};