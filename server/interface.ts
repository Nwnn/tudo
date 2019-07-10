import { Document, Schema } from "mongoose";

// Taskインターフェース
export interface Task{
    taskid: number;
    name : string;
    startTime : Date;
    dueTime : Date;
    icon : string;
    description : string;
    status : boolean;
    createTime : Date;
    updateTime : Date | undefined;

}

// タスクのリスト
export interface User {
    userid: number,
    name: string;
    tasks: Task[];
    
}