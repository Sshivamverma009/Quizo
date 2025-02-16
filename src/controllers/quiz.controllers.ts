import { Request, Response } from "express";
import dbConnect from "../database/dbConnect";
import createQuizTable from "../models/quiz.models";

export const createQuiz = async (req: Request, res: Response) => {
  try {
    const { connection } = await dbConnect();
    const { title, description, teacher_id } = req.body;

    if (!title || !description) {
        res.status(400).json("Title and Description are required");
    }

    const sql = `INSERT INTO quizzes (title, description, teacher_id) VALUES ('${title}', '${description}', ${teacher_id})`;

    const response = await connection?.query(sql);

    res.status(200).json({message :"Quiz created successfully!", response});
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(400).json({ message: "Error occurred while creating quiz" });
  }
};

export const getQuizzes = async (req: Request, res: Response) => {
  try {
    const { connection } = await dbConnect();
    const {_id } = req.params;

    if (!_id) {
        res.status(400).json("Teacher ID not found");
    }

    const sql = `SELECT * FROM quizzes WHERE teacher_id = ${_id}`;
    const result: any = await connection?.query(sql);

    const quizzes = result[0];

    res.status(200).json({ quizzes });
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(400).json({ message: "Error while querying quizzes" });
  }
};

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const { connection } = await dbConnect();
    const { _id } = req.params; // Get `_id` from the request parameters

    if (!_id) {
      res.status(400).json({ message: "Quiz ID not found" }); // Early return
      return;
    }

    // Use parameterized query to prevent SQL injection
    const sql = `SELECT * FROM quizzes WHERE id = ${_id}`;
    const [results]: any = await connection?.query(sql);

    if (results.length === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({ quiz: results[0] });
  } catch (error) {
    console.error("Error caught in try-catch:", error);
    res.status(500).json({ message: "Error while querying quiz" });
  }
};


export const editQuiz = async (req: Request, res: Response) => {
  try {
    const { connection } = await dbConnect();
    const { _id } = req.params;
    const { title, description } = req.body;

    if (!_id) {
      res.status(400).json({ message: "Quiz ID not found" });
      return;
    }

    if (!title || !description) {
      res.status(400).json({ message: "Title and description are required" });
      return;
    }

    const sql = `UPDATE quizzes SET title = '${title}', description = '${description}' WHERE id = ${_id}`;
    const values = [title, description, _id];

    const [result]: any = await connection?.query(sql);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({ message: "Quiz edited successfully" });
  } catch (error) {
    console.error("Error caught in try-catch:", error);
    res.status(500).json({ message: "Error while editing quiz" });
  }
};


export const deleteQuiz = async (req: Request, res: Response) => {
  try {
    const { connection } = await dbConnect();
    const { _id } = req.params;

    if (!_id) {
      res.status(400).json({ message: "Quiz ID not found" });
      return;
    }

    const sql = `DELETE FROM quizzes WHERE id = ${_id}`;
    const [result]: any = await connection?.query(sql);

    if (result.affectedRows === 0) {
      res.status(404).json({ message: "Quiz not found" });
      return;
    }

    res.status(200).json({ message: "Quiz deleted successfully" });
  } catch (error) {
    console.error("Error caught in try-catch:", error);
    res.status(500).json({ message: "Error while deleting quiz" });
  }
};

