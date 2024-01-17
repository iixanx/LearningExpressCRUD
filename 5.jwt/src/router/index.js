const router = require('express')();
const auth = require('./auth');
const user = require('./user');

router.use('/auth', auth);
router.use('/user', user);

module.exports = router;