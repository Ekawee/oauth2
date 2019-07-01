import sequelizeUtil from '../util/sequelize';

const tableName = {
  client: 'client',
  user: 'user',
  accessToken: 'access_token',
};

const client = (queryInterface, Sequelize, transaction) =>
  queryInterface.createTable(
    tableName.client,
    sequelizeUtil.withDefaultTableFields({
      clientId: { type: Sequelize.STRING },
      clientSecret: { type: Sequelize.STRING },
      redirectUris: { type: Sequelize.STRING },
      grants: { type: Sequelize.STRING },
    }, Sequelize),
    { transaction },
  );

const user = (queryInterface, Sequelize, transaction) =>
  queryInterface.createTable(
    tableName.user,
    sequelizeUtil.withDefaultTableFields({
      username: { type: Sequelize.STRING },
      password: { type: Sequelize.STRING },
    }, Sequelize),
    { transaction },
  );

const accessToken = (queryInterface, Sequelize, transaction) =>
  queryInterface.createTable(
    tableName.accessToken,
    sequelizeUtil.withDefaultTableFields({
      accessToken: { type: Sequelize.STRING },
      tokenType: { type: Sequelize.STRING },
      expires: { type: Sequelize.DATE },
      clientId: sequelizeUtil.withForeignKey({ model: tableName.client }, Sequelize),
      userId: sequelizeUtil.withForeignKey({ model: tableName.user }, Sequelize),
    }, Sequelize),
    { transaction },
  );

export default {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      return Promise.all([
        client(queryInterface, Sequelize, transaction),
        user(queryInterface, Sequelize, transaction),
        accessToken(queryInterface, Sequelize, transaction),
      ]);
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      return Promise.all([
        queryInterface.dropTable(tableName.accessToken, { transaction }),
        queryInterface.dropTable(tableName.user, { transaction }),
        queryInterface.dropTable(tableName.client, { transaction }),
      ]);
    });
  },
};
