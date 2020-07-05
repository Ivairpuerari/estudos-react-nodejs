const config = require("../config/config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.on("connected", function () {
  console.log("===Connect with MongoDB===");
});
mongoose.connection.on("error", function (err) {
  console.log("===Erro at connect: " + err);
});

mongoose.Promise = global.Promise;

module.exports = {
  account: require("../models/account"),
};
