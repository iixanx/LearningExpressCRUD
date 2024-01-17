const validator = require('validator');
const { User } = require('../model');
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    try {    
        const { name, email, birth, password } = req.body;
        if(!validator.isEmail(email)){
            return res.status(406).json({
                "error" : "Not match struct"
            });
        }
        
        if(!validator.isDate(birth, {
            format: "yyyy-MM-dd"
        })) {
            return res.status(406).json({
                "error" : "Is not Date"
            })
        }

        if(await User.findOne({ where: {email} })){
            return res.status(409).json({
                "error" : "Already exist email"
            })
        }

        const birthDate = new Date(birth).toISOString()
        const hash = bcrypt.hashSync(password, 10);

        await User.create({
            name,
            email,
            birth: birthDate,
            password: hash
        })

        return res.status(201).json({
            data: null,
            status: 201,
            statusMsg: "회원가입 완료"
        })
    } catch (err) {
        console.error(err)
        return res.status(400).json({
            "error" : "알 수 없는 에러"
        })
    }
}

module.exports = {
    signUp,
}