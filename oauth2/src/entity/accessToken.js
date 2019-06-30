import sequelizeUtil from '../util/sequelize';

export default (sequelize, Sequelize) => {

  const attributes = sequelizeUtil.withDefaultTableFields({
    accessToken: { type: Sequelize.STRING },
    tokenType: { type: Sequelize.STRING },
    expiresIn: { type: Sequelize.DECIMAL(10, 0) },
    clientId: { type: Sequelize.BIGINT },
    userId: { type: Sequelize.BIGINT },
  }, Sequelize);

  const accessToken = sequelize.define(
    'access_token',
    sequelizeUtil.appendKeyField(attributes),
    {
      paranoid: true,
    }
  );

  accessToken.associate = (entiry) => {
    accessToken.belongsTo(entiry.client, { as: 'client' });
    accessToken.belongsTo(entiry.user, { as: 'user' });
  };

  accessToken.saveAccessToken = (token, userId) => {
    return accessToken.create({ accessToken: token, userId });
  };
  accessToken.getUserIDFromBearerToken = (bearerToken) => {
    return accessToken.findOne({ where: { accessToken: bearerToken } });
  };

  return accessToken;
};
