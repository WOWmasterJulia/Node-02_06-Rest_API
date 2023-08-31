const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
const Joi = require("joi");

// const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minlength: [6, "Minimal 6 symbols required for password"],
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      // match: [emailRegexp, "must be in format text@text.domain"],
      required: [true, "Email is required field"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: "",
    },
    avatarURL: {
      type: String, //
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
  email: Joi.string()
    // .email({
    //   // minDomainSegments: 2,
    //   // tlds: { allow: ["com", "net"] },
    // })
    .required()
    .messages({
      "string.base": "email should be a type of 'text'",
      "string.empty": "email cannot be an empty field",
      "string.email": "email must be in format text@text.com or text@text.net",
      "any.required": "missing required email field",
    }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.base": "password should be a type of 'text'",
    "string.empty": "password cannot be an empty field",
    "any.required": "missing required password field",
    "string.min": `password should have min {#limit} symbols`,
    "string.max": `password should have max {#limit} symbols`,
  }),
});

const loginSchema = Joi.object({
  email: Joi.string()
    // .email({
    //   minDomainSegments: 2,
    //   tlds: { allow: ["com", "net"] },
    // })
    .required()
    .messages({
      "string.base": "email should be a type of 'text'",
      "string.empty": "email cannot be an empty field",
      "string.email": "email must be in format text@text.com or text@text.net",
      "any.required": "missing required email field",
    }),
  password: Joi.string().min(6).max(20).required().messages({
    "string.base": "password should be a type of 'text'",
    "string.empty": "password cannot be an empty field",
    "any.required": "missing required password field",
    "string.min": `password should have min {#limit} symbols`,
    "string.max": `password should have max {#limit} symbols`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

const User = model("user", userSchema);

module.exports = { User, schemas };
