const router = require('express')();
const user = require('../controller/user');
const { validateAccess } = require('../middleware/jwt');

router.post('/signup', user.signUp); // 회원가입
router.get('/my', validateAccess, user.mypage); // 유저 마이페이지
router.patch('/info', validateAccess, user.info); // 정보 수정
router.patch('/password', validateAccess, user.patchPw); // 비밀번호 수정
router.delete('/delacc', validateAccess, user.deleteAcc); // 회원탈퇴

module.exports = router;