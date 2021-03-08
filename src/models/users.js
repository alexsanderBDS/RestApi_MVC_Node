const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      email: true,
      validate: (value) => {
        if (!validator.isEmail(value)) {
          throw new Error("invalid Email!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      validate: (value) => {
        if (value.length < 6) {
          throw new Error("Password must be 6 characters or more.");
        } else if (!validator.isAlphanumeric(value)) {
          throw new Error("Password must contain only letters and numbers.");
        }
      },
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 8);
  next();
});

module.exports = mongoose.model("User", userSchema);
