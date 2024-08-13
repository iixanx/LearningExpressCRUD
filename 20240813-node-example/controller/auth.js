const router = require("express")();
const logic = require("../service/auth");

router.post("/verify", logic.verify);
router.post("/create", logic.createRandom);

module.exports = router;
