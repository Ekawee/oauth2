import bcryptjs from 'bcryptjs';
import sequelizeUtil from '../util/sequelize';

export default (sequelize, Sequelize) => {

  const attributes = sequelizeUtil.withDefaultTableFields({
    username: { type: Sequelize.STRING },
    password: { type: Sequelize.STRING },
  }, Sequelize);

  const user = sequelize.define(
    'user',
    sequelizeUtil.appendKeyField(attributes),
    {
      paranoid: true,
    }
  );

  user.associate = (entiry) => {
    user.hasMany(entiry.accessToken, { as: 'accessToken' });
  };

  user.getUserFromCrentials = async (username, password) => {
    const selectedUser = await user.findOne({ where: { username } });

    if(selectedUser) {
      if (bcryptjs.compareSync(password, selectedUser.password)) {
        return selectedUser;
      }
    }
    return null;
  };

  return user;
};
