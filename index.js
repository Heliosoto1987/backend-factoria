const express = require("express");
require("dotenv").config();
const app = express();
const { dbConnection } = require("./database/config");

dbConnection();

app.use(express.static("public"));

app.use(express.json());

app.use("/api/auth", require("./routes/auth"));

app.listen(process.env.PORT, () => {
  console.log(`Server running in port ${process.env.PORT}`);
});
