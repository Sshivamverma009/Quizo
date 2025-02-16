import mysql, { Connection } from "mysql2/promise";
import dotenv from "dotenv";
// import { Connection } from "mysql2/typings/mysql/lib/Connection";
dotenv.config();

type connectionObject = {
  isConnected: number;
  connection : Connection | null
};

const db: connectionObject = { isConnected : 0, connection : null };

const dbConnect = async (): Promise<connectionObject> => {
  if (db.isConnected) {
    console.log("Database Already Connected");
    return db;
  }

  try {
    const instance = await mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE_NAME,
    });
    db.connection = instance;
    db.isConnected = 1;

    console.log("DB Connected successfully!");
    return db;
  } catch (error) {
    throw new Error("db not connected");
  }
};

export default dbConnect;
