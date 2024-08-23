const router = require("express")();
const logic = require("../service/auth");

router.post("/signup", logic.signup);

module.exports = router;
