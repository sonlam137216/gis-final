const express = require("express");
const router = express.Router();

const commentCtrl = require('../controller/comment.controller')

const verifyToken = require("../middleware/auth.middleware");
const authAdmin = require("../middleware/authAdmin.middleware");

router.get("/", commentCtrl.getAll);
router.post("/create", commentCtrl.create);
// router.post("/delete", userCtrl.deleteUser);

module.exports = router;
