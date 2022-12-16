const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const generateTokens = require("../utils/createToken");
const validateEmail = require("../utils/verifyEmail");

const authCtrl = {
  register: async (req, res) => {
    const { email, username, password, confirmPassword } = req.body;

    //simple validation
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email format error!" });
    }

    try {
      const user = await User.findOne({ email: email });

      if (user)
        return res
          .status(400)
          .json({ success: false, message: "Email already taken" });

      if (password !== confirmPassword)
        return res
          .status(400)
          .json({ success: false, message: "Password does not match! Login failed!" });

      // all good
      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password: hashedPassword,
      });

      const { accessToken } = generateTokens(newUser);

      let userInfo = await newUser.save();

      userInfo = _.pick(userInfo, ["_id", "username", "email"]);

      return res.json({
        success: true,
        message: "Register successfully!",
        userInfo,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Missing email or password" });

    if (!validateEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Email format error!" });
    }

    try {
      // check user existing
      const user = await User.findOne({ email });

      if (!user)
        return res
          .status(400)
          .json({ success: false, message: "User not found! Login failed!" });

      const passwordValid = await bcrypt.compare(password, user.password);

      if (!passwordValid)
        return res
          .status(400)
          .json({ success: false, message: "Incorrect password!, Login failed!" });

      const { accessToken } = generateTokens(user);

      return res.json({
        success: true,
        message: "Log in successfully!",
        userInfo: user,
        accessToken,
      });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    }
  },

  logout: async (req, res) => {
    if (req.userId) {
      return res.status(200).json("Logged out!");
    } else {
      return res.status(500).json("Internal server error!");
    }
  },
};

module.exports = authCtrl;
