import sequelizeUtil from '../util/sequelize';

export default (sequelize, Sequelize) => {

  const attributes = sequelizeUtil.withDefaultTableFields({
    accessToken: { type: Sequelize.STRING },
    tokenType: { type: Sequelize.STRING },
    expires: { type: Sequelize.DATE },
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

  accessToken.saveAccessToken = (token, userId, expires) => {
    return accessToken.create({ accessToken: token, userId, expires });
  };
  accessToken.getUserIDFromBearerToken = async (bearerToken) => {
    const token = await accessToken.findOne({ where: { accessToken: bearerToken } });
    if(token) {
      return sequelizeUtil.modelToObject(token);
    }
    return null;
  };

  return accessToken;
};
