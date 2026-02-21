import express from "express";
import { body, param, validationResult } from "express-validator";
import { Student } from "../models/Student.js";

const router = express.Router();

function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400);
    return next(new Error(errors.array().map(e => e.msg).join(", ")));
  }
  next();
}

// POST /students (Create)
router.post(
  "/",
  [
    body("name").isString().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("course").isString().isLength({ min: 2 }).withMessage("Course must be at least 2 characters")
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, email, course } = req.body;

      const existing = await Student.findOne({ email });
      if (existing) {
        res.status(409);
        throw new Error("A student with this email already exists");
      }

      const student = await Student.create({ name, email, course });
      res.status(201).json(student);
    } catch (err) {
      next(err);
    }
  }
);

// GET /students (Read all)
router.get("/", async (req, res, next) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.json(students);
  } catch (err) {
    next(err);
  }
});

// PUT /students/:id (Update)
router.put(
  "/:id",
  [
    param("id").isMongoId().withMessage("Invalid student id"),
    body("name").optional().isString().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body("email").optional().isEmail().withMessage("Email must be valid"),
    body("course").optional().isString().isLength({ min: 2 }).withMessage("Course must be at least 2 characters")
  ],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updates = req.body;

      // If updating email, ensure uniqueness
      if (updates.email) {
        const emailOwner = await Student.findOne({ email: updates.email });
        if (emailOwner && emailOwner._id.toString() !== id) {
          res.status(409);
          throw new Error("Another student already uses this email");
        }
      }

      const student = await Student.findByIdAndUpdate(id, updates, { new: true });
      if (!student) {
        res.status(404);
        throw new Error("Student not found");
      }

      res.json(student);
    } catch (err) {
      next(err);
    }
  }
);

// DELETE /students/:id (Delete)
router.delete(
  "/:id",
  [param("id").isMongoId().withMessage("Invalid student id")],
  validate,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const student = await Student.findByIdAndDelete(id);

      if (!student) {
        res.status(404);
        throw new Error("Student not found");
      }

      res.json({ message: "Student deleted successfully" });
    } catch (err) {
      next(err);
    }
  }
);

export default router;