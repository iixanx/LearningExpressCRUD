const app = require("express")();
const auth = require("./auth.js");

app.use("/auth", auth);

module.exports = app;
