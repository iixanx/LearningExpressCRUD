const router = require('express')();
const user = require('../controller/user');

router.post('/signup', user.signUp); // 회원가입
router.get('/my', ); // 유저 마이페이지
router.patch('/info', ); // 정보 수정
router.patch('/password', ); // 비밀번호 수정
router.delete('/delacc', ); // 회원탈퇴

module.exports = router;
// sequelize <-
// typeorm <- NestJS에서 많이 쓰는 거
// prisma <- 2023년 여름부터 주간 다운로드수가 typeorm을 넘음 (물론 차이가 아주 근사하긴 함) / postgreSQL이 default
// mikroORM <- 주간 다운로드수 다른 거 대비 1/10 정도
// mongoose <- mongoDB 전용