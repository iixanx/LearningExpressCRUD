const validator = require("validator");
const { User, Email } = require("../model");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
    try {
        const { name, email, birth, password } = req.body;
        if (!validator.isEmail(email)) {
            return res.status(406).json({
                error: "Not match struct",
            });
        }

        if (
            !validator.isDate(birth, {
                format: "yyyy-MM-dd",
            })
        ) {
            return res.status(406).json({
                error: "Is not Date",
            });
        }

        if (await User.findOne({ where: { email } })) {
            return res.status(409).json({
                error: "Already exist email",
            });
        }

        const birthDate = new Date(birth).toISOString();
        const hash = bcrypt.hashSync(password, 10);

        await User.create({
            name,
            email,
            birth: birthDate,
            password: hash,
        });

        return res.status(201).json({
            data: null,
            status: 201,
            statusMsg: "회원가입 완료",
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({
            error: "알 수 없는 에러",
        });
    }
};

const validate = async (req, res) => {
    try {
        const { verify, email } = req.body

        const thisVerify = await Email.findOne({where: {email}});
        if(!thisVerify || !verify) {
            return res.status(404).json({
                "error" : "인증 코드 없음"
            })
        }
        if(thisVerify.key != verify) {
            return res.status(409).json({
                "error" : "인증 코드 불일치"
            })
        }

        await thisVerify.update({
            key: "true"
        })

        return res.status(200).json({
            message: "인증이 완료되었습니다."
        })
    } catch(e) {
        console.error(e)
        return e
    }
}

const mypage = async (req, res) => {
    try {
        const { id } = req.payload;

        const thisUser = await User.findOne({ where: { userId: id } });

        if (!thisUser) {
            return res.status(404).json({
                error: "this user is not existing",
            });
        }

        return res.status(200).json({
            name: thisUser.name,
            email: thisUser.email,
            birth: thisUser.birth,
        });
    } catch (e) {
        console.error(e);
        return e;
    }
};

// 정보수정
const info = async (req, res) => {
    try {
        const { id } = req.payload;
        const { name, birth } = req.body;

        const thisUser = await User.findOne({ where: { userId: id }})

        if(!thisUser) {
            return res.status(404).json({
                error: "this user is not existing",
            })
        }

        const updated = await thisUser.update({
            name,
            birth
        })

        return res.status(200).json({
            user: updated,
        })

    } catch(e) {
        console.error(e)
        return e
    } 
}

const patchPw = async (req, res) => {
    try {
        const { id } = req.payload;
        const { password, newPassword } = req.body;

        const thisUser = await User.findOne({ where: { userId: id }})

        if(await bcrypt.compare(password, thisUser.password)) {
            return res.status(401).json({
                error: "this is not matched with user's password"
            })
        }

        const hashed = await bcrypt.hash(newPassword, 10);

        await thisUser.update({
            password: hashed
        })

        return res.status(200).json({
            message: "The user's password has modified"
        })
    } catch (e) {
        console.error(e)
        return e
    }
}

const deleteAcc = async (req, res) => {
    try {
        const { id } = req.payload;
        const { password } = req.body;
        const thisUser = await User.findOne({ where: { userId : id }});

        if(!await bcrypt.compare(password, thisUser.password)) {
            return res.status(401).json({
                error: "this is not matched with user's password"
            })
        }

        await thisUser.destroy();

        return res.status(204).json()
    } catch(e) {
        console.error(e)
        return e
    }
}

module.exports = {
    signUp,
    mypage,
    info,
    patchPw,
    deleteAcc,
    validate
};