import { body } from "express-validator";

export const signupValidation = [
  body("name")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Name is required"),

  body("email")
    .isEmail()
    .normalizeEmail()
    .withMessage("Invalid email"),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
];
