const { User } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        const thisUser = await User.findOne({ where: { email } });

        if (!thisUser)
            return res.status(404).json({
                error: "The User ID doesn't exist",
            });

        if (!bcrypt.compareSync(password, thisUser.password))
            return res.status(409).json({
                error: "Your Password isn't match with this id",
            });

        return res.status(201).json({
            id: thisUser.userId,
            accesstoken: await generateAccessToken(thisUser.userId),
        });
    } catch (e) {
        console.error(e);
        return e;
    }
};

const generateAccessToken = async (id) => {
    const salt = process.env.SECRET_OR_PRIVATE; // bcrypt.genSaltSync(Number(process.env.SECRET_OR_PRIVATE))

    const access = jwt.sign(
        {
            id,
        },
        salt,
        {
            algorithm: "HS256",
            expiresIn: "10m",
        }
    );

    return access;
};

module.exports = {
    signIn,
    generateAccessToken,
};
