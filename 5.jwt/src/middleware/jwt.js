const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isJWT } = require("validator");
const { configDotenv } = require("dotenv");

configDotenv();

const validateAccess = async (req, res, next) => {
    const authorization = req.get("authorization")?.split(" ")[1]; // Bearer {token}
    if (!authorization) {
        return res.status(401).json({
            error: "JWT 유효성 검증 실패",
        });
    }
    if (!isJWT(authorization)) {
        return res.status(401).json({
            error: "asdf",
        });
    }

    const salt = process.env.SECRET_OR_PRIVATE; // bcrypt.genSaltSync(Number(process.env.SECRET_OR_PRIVATE))

    req.payload = jwt.verify(authorization, salt, {
        algorithms: "HS256",
    });

    next();
};

module.exports = validateAccess;
