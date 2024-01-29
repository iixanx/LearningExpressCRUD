const router = require('express')();
const auth = require('../controller/auth');
const { validateWithMail } = require('../middleware/jwt');
const { validate } = require('../controller/user')
// auth = token domain

router.post('/signin', auth.signIn); // 로그인
router.post('/validate', validateWithMail);
router.post('/', validate)

module.exports = router;