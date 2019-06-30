import sequelizeUtil from '../util/sequelize';

export default (sequelize, Sequelize) => {

  const attributes = sequelizeUtil.withDefaultTableFields({
    clientId: { type: Sequelize.STRING },
    clientSecret: { type: Sequelize.STRING },
    redirectUris: { type: Sequelize.STRING },
    grants: { type: Sequelize.STRING },
  }, Sequelize);

  const client = sequelize.define(
    'client',
    sequelizeUtil.appendKeyField(attributes),
    {
      paranoid: true,
    }
  );

  client.associate = (entiry) => {
    client.hasMany(entiry.accessToken, { as: 'accessToken' });
  };

  return client;
};
