const jwt = require("jsonwebtoken");
const { isJWT } = require("validator");
const { configDotenv } = require("dotenv");
const { Email } = require("../model");
const { createTransport } = require('nodemailer');

configDotenv();

const validateAccess = async (req, res, next) => {
    try {
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
    } catch(e) {
        console.error(e)
        return res.status(400).json({
            error: e
        })
    }
};

const validateWithMail = async (req, res) => {
    const emailId = process.env.EMAIL_ID;
    const emailPw = process.env.EMAIL_PW;

    const { email } = req.body;

    const transport = createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: emailId,
            pass: emailPw,
        },
    });

    try {
        const random = String(Math.floor(Math.random() * 999999)).padStart(
            6,
            0
        );

        await Email.create({
            email,
            key: random,
        });

        await transport.sendMail({
            from: emailId,
            to: email,
            subject: "인증 메일입니다",
            text: `인증 번호는 ${random}`,
        });

        return res.status(200).json({
            message: "인증 메일이 발송되었습니다.",
        });
    } catch (e) {
        console.error(e);
        return e;
    }
};

module.exports = {
    validateAccess,
    validateWithMail,
};
