const express = require("express");
const router = express.Router();

const feedbackCtrl = require('../controller/feedback.controller')

const verifyToken = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

router.get("/", feedbackCtrl.getAll);
router.post("/create", feedbackCtrl.create);
// router.post("/delete", userCtrl.deleteUser);

module.exports = router;
