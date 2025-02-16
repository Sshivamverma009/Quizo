import { Connection } from "mysql2/typings/mysql/lib/Connection";

export interface Quiz{
    _id : number,
    title : string,
    description : string,
    teacher_id : number,
}

export interface User{
    _id : number,
    username : string,
    password : string,
}

export interface DBConnection extends Connection{
    connectionStatus : boolean,
}