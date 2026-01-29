import { body } from "express-validator";

export const validateJob = [
  body("title")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Job title is required"),

  body("location")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Location is required"),

  body("jobType")
    .isIn(["Full-time", "Part-time", "Contract", "Internship"])
    .withMessage("Invalid job type"),

  body("experienceRequired")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Experience is required if no Experience put 0"),

  body("description")
    .trim()
    .escape()
    .notEmpty()
    .withMessage("Job description is required"),

  body("salary")
    .optional()
    .trim()
    .escape(),

  body("skills")
    .optional()
    .isArray()
    .withMessage("Skills must be an array"),

  body("skills.*")
    .optional()
    .trim()
    .escape(),

  body("languages.*")
    .optional()
    .trim()
    .escape(),

  body("responsibilities.*")
    .optional()
    .trim()
    .escape(),

  body("requirements.*")
    .optional()
    .trim()
    .escape(),

  body("benefits.*")
    .optional()
    .trim()
    .escape()
];
