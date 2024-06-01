const { Op, QueryTypes } = require("sequelize");
const { write, sequelize } = require("./");

const findWriteByHeadAndBody = async (head, body) => {
  const result = await write.findOne({
    where: {
      [Op.and]: [
        {
          head,
          body,
        },
      ],
    },
  });

  return result
};

const findWriteByHeadAndBodyQuery = async (head, body) => {
  const result = await sequelize.query('SELECT * FROM `writes` WHERE head=$1 AND body=$2 LIMIT 1', {
    bind: [head, body],
    types: QueryTypes.SELECT,
  })

  return result
}

module.exports = {
  findWriteByHeadAndBody,
  findWriteByHeadAndBodyQuery
};
