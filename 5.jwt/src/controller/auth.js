const { User } = require("../model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { redisCli } = require("../redis");

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

        const accesstoken = await generateAccessToken(thisUser.userId, true)
        const refreshtoken = await generateAccessToken(Date.now(), false)
        
        await redisCli.set(thisUser.userId, accesstoken);
        await redisCli.set(refreshtoken, thisUser.userId);

        return res.status(201).json({
            id: thisUser.userId,
            accesstoken,
            refreshtoken
        });
    } catch (e) {
        console.error(e);
        return e;
    }
};

const generateAccessToken = async (id, isAccess) => {
    const salt = process.env.SECRET_OR_PRIVATE; // bcrypt.genSaltSync(Number(process.env.SECRET_OR_PRIVATE))

    const access = jwt.sign(
        {
            id,
        },
        salt,
        {
            algorithm: "HS256",
            expiresIn: isAccess ? "30s" : "3m",
        }
    );

    return access;
};

const refresh = async (req, res) => {
    const token = await req.get('authorization').split(' ')[1]

    // console.log(token)

    if(!req.payload) return res.status(400).json({
        error: "Cannot verify token"
    })

    await redisCli.get(token, async (err, value) => {
        if(err) {
            return res.status(400).json({
                error: err
            })
        }
        const accesstoken = await generateAccessToken(value, true)
        redisCli.set(value, accesstoken)

        return res.status(200).json({
            id: value,
            accesstoken
        })
    })
}

module.exports = {
    signIn,
    generateAccessToken,
    refresh
};