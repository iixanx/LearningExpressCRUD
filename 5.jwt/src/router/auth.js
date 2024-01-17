const router = require('express')();
const auth = require('../controller/auth');

// auth = token domain

router.post('/signin', ); // 로그인
router.get('/refresh', ); // 리프레시 인증

module.exports = router;