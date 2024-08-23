const { Op, QueryType } = require("sequelize");
const { user, sequelize } = require("./");

const saveUser = async (id, password) => {
  if (!id || !password) {
    return "ERROR";
  }
  const result = await user.create({ user_id: id, password: password });

  return result;
};

module.exports = {
  saveUser,
};
