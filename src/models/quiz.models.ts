import dbConnect from "../database/dbConnect";

const createQuizTable = async (): Promise<void> => {
  try {
    const { isConnected, connection } = await dbConnect();

    if (!isConnected) {
      console.error("No database connection established.");
      return;
    }

    const query = `
      CREATE TABLE IF NOT EXISTS quizzes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        teacher_id INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (teacher_id) REFERENCES users(id)
      );
    `;

    const results = await connection?.query(query);
    if (results) {
      console.log("Quizzes table created successfully!");
    } else {
      console.error("Failed to create quizzes table.");
    }
  } catch (error) {
    console.error("Error while creating the quizzes table:", error);
  }
};

export default createQuizTable;
