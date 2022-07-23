const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user.model");

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/crud-database");

app.post("/api/create-user", async (req, res) => {
  console.log(req.body);
  try {
    await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      location: req.body.location,
      hobby: req.body.hobby,
    });
    res.json({ status: "ok" });
  } catch (err) {
    res.json({ status: "error", error: "Duplicate email or phone number" });
    console.log(err);
  }
});

app.get("/api/find-users", async (req, res) => {
  try {
    const user = await User.find({});
    return res.json({
      status: "ok",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.delete("/api/delete-user", async (req, res) => {
  try {
    const user = await User.remove({ _id: req.body.id });
    console.log(req.body.id);
    return res.json({
      status: "ok",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.post("/api/update-user", async (req, res) => {
  console.log(req.body.id);
  try {
    await User.updateOne(
      { _id: req.body.id },
      {
        $set: {
          firstName: req.body.firstNameState,
          lastName: req.body.lastNameState,
          email: req.body.emailState,
          phone: req.body.phoneState,
          location: req.body.locationState,
          hobby: req.body.hobbyState,
        },
      }
    );
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.get("/api/user", async (req, res) => {
  const userId = req.headers["user-id"];
  try {
    const user = await User.findById(userId);
    return res.json({
      status: "ok",
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      location: user.location,
      hobby: user.hobby,
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", error: "Invalid token" });
  }
});

app.listen(1337, () => {
  console.log("Server started on port 1337");
});
