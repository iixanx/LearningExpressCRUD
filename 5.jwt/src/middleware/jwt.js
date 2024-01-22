const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isJWT } = require('validator');
const { configDotenv } = require('dotenv');

configDotenv();

const validateAccess = async (req, res, next) => {
    const authorization = req.header.authorization?.split(' ')[1]; // Bearer {token}
    if(!authorization || !isJWT(authorization)){
        return res.status(401).json({
            "error" : "JWT 유효성 검증 실패"
        })
    }

    const salt = bcrypt.genSaltSync(Number(process.env.SECRET_OR_PRIVATE))

    req.payload = jwt.verify(authorization, 
        salt,
        {
        algorithms: 'HS256',
        complete: true,
    })

    next();
}

module.exports = validateAccess;