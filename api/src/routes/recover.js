const express = require("express");
const router = express();

const passwordRecover = require("../controllers/recover/passwordRecover");
const passwordChange = require("../controllers/recover/passwordChange");

router.post("/recuperar-contraseña", passwordRecover);

router.put("/password", passwordChange);

module.exports = router;
