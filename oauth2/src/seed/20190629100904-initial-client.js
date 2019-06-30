import sequelizeUtil from '../util/sequelize';

const tableName = {
  client: 'client',
};

const clientData = [
  sequelizeUtil.withInsertTimeStamp({
    clientId: 'pomeloService',
    clientSecret: 'mocksecret',
    redirectUris: '\'http://localhost:9001/oauth/authorization\'',
    grants: '\'client_credentials, password, refresh_token\'',
  }),
];

export default {
  up: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkInsert(tableName.client, clientData, { transaction });
    });
  },

  down: (queryInterface) => {
    return queryInterface.sequelize.transaction(async (transaction) => {
      await queryInterface.bulkDelete(tableName.client, { clientId: ['pomeloService'] }, { transaction });
    });
  },
};
