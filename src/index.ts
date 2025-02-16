import app from "./app";
import dbConnect from "./database/dbConnect";
import createQuizTable from "./models/quiz.models";
import createUserTable from "./models/user.models";
import dotenv from "dotenv";
dotenv.config();

const startServer = async (): Promise<void> => {
  try {
    const { connection } = await dbConnect(); 
    console.log("Database connected successfully.");
    
    await createUserTable();
    console.log("User Table created successfully");
    
    await createQuizTable(); 
    console.log("Quiz table created successfully.");

    app.listen(process.env.PORT, () => {
      console.log("App started on PORT ::", process.env.PORT);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
