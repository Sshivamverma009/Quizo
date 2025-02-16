import dbConnect from "../database/dbConnect";

const createUserTable = async () => {
  try {
    const { connection } = await dbConnect();

    const query = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(55) NOT NULL,
        password VARCHAR(20),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const res = await connection?.query(query);
    if (res) {
      console.log("Users table created successfully!");
    } else {
      console.log("Users table creation failed.");
    }
  } catch (error) {
    console.error("Error creating the users table:", error);
  }
};

export default createUserTable;
