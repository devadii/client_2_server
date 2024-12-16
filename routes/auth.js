var express = require("express");
var router = express.Router();

const {signup, signin, update_password, trigger_update_password} = require("../controllers/auth");

router.post("/signup", signup);

router.post("/signin", signin); 

router.post("/trigger_update_password", trigger_update_password); 

router.post("/update_password", update_password); 

module.exports = router;
