const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const router = express.Router();

/* UPDATE PROFILE */

router.put("/update-profile", async (req, res) => {
  try {
    const { email, name, avatar, password } = req.body;

    const updateData = {
      name,
      avatar,
    };

    // UPDATE PASSWORD ONLY IF ENTERED

    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);

      updateData.password = await bcrypt.hash(
        password,
        salt
      );
    }

    const updatedUser = await User.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Error updating profile",
    });
  }
});

module.exports = router;