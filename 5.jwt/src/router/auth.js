const router = require('express')();
const auth = require('../controller/auth');
const { validateAccess } = require('../middleware/jwt');
// auth = token domain

router.post('/signin', auth.signIn); // 로그인
router.get('/refresh', ); // 리프레시 인증

module.exports = router;