const { response } = require("express");

const createUser = (req, res) => {
  res.json({
    ok: true,
    msn: "register",
  });
};

const loginUser = (req, res = response) => {
  res.json({
    ok: true,
    msg: "login",
  });
};

module.exports = {
  createUser,
  loginUser,
};
