const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    hobby: { type: String },
  },
  { collection: "user-data" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
