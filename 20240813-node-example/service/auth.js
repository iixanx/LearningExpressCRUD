let db = {};

const createRandom = (req, res) => {
  const { email } = req.body;
  const rand = String(Math.floor(Math.random() * 999999)).padStart(6, "0");

  db[email] = rand;

  setTimeout(() => {
    if (db.hasOwnProperty(email)) {
      delete db[email];
    }
  }, 1000 * 60 * 5);

  return res.status(200).json({
    email,
    rand,
  });
};

const verify = async (req, res) => {
  const { email, rand } = req.body;

  if (!email || !rand) {
    return res.status(400).json({
      message: "요청값 오류",
    });
  }

  if (!db.hasOwnProperty(email)) {
    return res.status(404).json({
      message: "Not Found",
    });
  }

  if (rand !== db[email]) {
    return res.status(400).json({
      message: "Code is not same in db",
    });
  }

  delete db[email];

  return res.status(200).json({
    message: "Successed for authentication",
  });
};

module.exports = {
  createRandom,
  verify,
};
