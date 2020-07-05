const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  agencia: { type: Number, required: true },
  conta: { type: Number, required: true },
  name: { type: String, required: true },
  balance: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("account", accountSchema);
