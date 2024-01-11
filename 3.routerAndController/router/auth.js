const router = require('express')()
const auth = require('../controller/auth')

router.post('/signup', auth.signup)
router.post('/signin', auth.signin)

module.exports = router