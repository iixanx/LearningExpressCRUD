const app = require('express')();
const user = require('./user.js');
const auth = require('./auth.js');

app.use('/auth', auth); // auth 엔드포인트로 온 모든 요청을 auth 라우터로 넘김
app.use('/user', user); // user 엔드포인트로 온 모든 요청을 user 라우터로 넘김

module.exports = app