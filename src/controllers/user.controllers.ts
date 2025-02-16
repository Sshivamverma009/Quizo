import { User } from "../schemas/types";
import { Request, Response } from "express";
import dbConnect from "../database/dbConnect";

export const login = async (req: Request, res: Response) => {
    const { connection } = await dbConnect();

    try {
        const { username, password } = req.body; 

        if (!username || !password) {
            res.status(400).json({ message: "Invalid Credentials" });
            return; 
        }

        const sql = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
        const [rows]: any = await connection?.query(sql);
        const existingUser = rows[0];

        if (!existingUser) {
            res.status(404).json({ message: "User not found" });
            return;  // Ensure no further code execution
        }

        res.status(200).json({ 
            message: "User logged in successfully", 
            id: existingUser.id 
          });
          
    } catch (error: any) {
        console.error("Login unsuccessful:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const register = async (req: Request, res: Response) => {
    const {connection} = await dbConnect();
    try {
        const {username, password} = await req.body;

        if(!username || !password){
            res.json({message : "Invalid Credentials"});
        }

        const sql1 = `SELECT * FROM users  WHERE username = '${username}' AND password = '${password}'`;
        const [rows] : any = await connection?.query(sql1);
        const existingUser : User = rows[0];
        if(existingUser){
            res.json({message :"User already registered", id : existingUser._id});
            return;
        }
        const sql2 = `INSERT INTO users (username, password) VALUES ('${username}', '${password}')`
        const response = await connection?.query(sql2);
        if(!response){
            res.json({message : "User register unsuccessful"});
            return;
        }
        const result = connection?.query('SELECT id FROM users ORDER BY id DESC LIMIT 1');
        console.log(result);
        res.json({message : "user registered successfully", id : response[0]});
    } catch (error) {
        res.json({Error : error});
    }
}
