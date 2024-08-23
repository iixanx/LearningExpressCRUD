const bcrypt = require("bcrypt");
const { saveUser } = require("../model/repository");

const signup = async (req, res) => {
  const { userId, password } = req.body;
  console.log(userId, password)

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await saveUser(userId, hashedPassword);

  if(user == "ERROR"){
    return res.status(500).json({
      "errorMsg" : "DB Exception"
    })
  }

  return res.status(201).json({
    id: user.id
  });
};

module.exports = {
  signup,
};
