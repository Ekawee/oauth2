import Sequelize from 'sequelize';
import config from '../config';
import Client from './client';
import AccessToken from './accessToken';
import User from './user';

Sequelize.postgres.DECIMAL.parse = (value) => parseFloat(value);

const sequelize = new Sequelize(
  config.dbScheme,
  config.dbUser,
  config.dbPassword,
  {
    host: config.dbHost,
    dialect: 'postgres',
    operatorAliases: false,
    logging: !config.disableSqlLog, // Note. false is not to print on console.
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    define: {
      timestamps: true,
      freezeTableName: true,
    },
    benchmark: true,
  }
);

export const checkConnection = async () => {
  try {
    await sequelize.authenticate();
    return 'UP';
  } catch (err) {
    return 'DOWN';
  }
};

const db = {
  client: sequelize.import('client', Client),
  accessToken: sequelize.import('accessToken', AccessToken),
  user: sequelize.import('user', User),
};

Object.keys(db).forEach(model => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize; // Configured model
db.Sequelize = Sequelize; // Sequelize library

export default db;
