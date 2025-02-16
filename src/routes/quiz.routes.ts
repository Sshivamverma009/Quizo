import { Router } from "express";
import {
  createQuiz,
  getQuizzes,
  getQuiz,
  editQuiz,
  deleteQuiz,
} from "../controllers/quiz.controllers";

const router = Router();

router.post("/quizzes", createQuiz);
router.get("/teacher_quizzes/:_id", getQuizzes);
router.get("/quizzes/:_id", getQuiz);
router.put("/quizzes/:_id", editQuiz);
router.delete("/quizzes/:_id", deleteQuiz);

export default router;
