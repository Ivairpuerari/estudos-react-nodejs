const mongoose = require("mongoose");

const account = new mongoose.Schema({
  agencia: { type: Number, required: true },
  conta: { type: Number, required: true },
  name: { type: String, required: true },
  balance: { type: Number, required: true, min: 0 },
});
