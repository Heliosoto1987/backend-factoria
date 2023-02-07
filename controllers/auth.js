const { response } = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const createUser = async (req, res = response) => {
  const { password, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "email exist",
      });
    }
    user = new User(req.body);
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);
    await user.save();

    res.status(201).json({
      ok: true,
      uid: user.uid,
      name: user.name,
      msg: "register",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "please talk with the admin",
      uid: newUser.id,
    });
  }
};

const loginUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "User not exist",
      });
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "wrong Password",
      });
    }

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "please talk with the admin",
    });
  }
};

module.exports = {
  createUser,
  loginUser,
};
