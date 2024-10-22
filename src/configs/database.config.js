import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

// Load environment variables from .env file
config();

// PostgreSQL configuration
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

// Validate environment variables
(() => {
  if (!DB_USER || !DB_HOST || !DB_PORT || !DB_NAME) {
    throw new Error(
      'PostgreSQL configuration variables are not defined in environment variables.'
    );
  }
})();

// PostgreSQL setup with Sequelize
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: parseInt(DB_PORT, 10),
  dialect: 'postgres',
  logging: false, // Set to true if you want to log SQL queries
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

// Export configurations and connection functions
export { sequelize };
