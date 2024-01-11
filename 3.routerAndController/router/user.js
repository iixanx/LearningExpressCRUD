const router = require('express')()
const user = require('../controller/user')

router.get('/list', user.list)
router.get('/info', user.mypage)

module.exports = router