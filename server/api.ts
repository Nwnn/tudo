import express, { Router, Request } from 'express';
import bodyParser, { json } from 'body-parser';
import {updateTask, UserDocument } from './interface';
import {describe, it} from 'mocha'
import { model, Mongoose } from 'mongoose';
import { UserModel } from './db';
import { resolve } from 'path';
import { isTSAnyKeyword, returnStatement } from '@babel/types';



export const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

abstract class TaskController{
    abstract getTask(taskList: Array<User>):any;
    abstract check(task: Task):void;
    abstract update(updatetask: updateTask):void;
    abstract add(userid: number, task: Task):void;
    // abstract delete(taskid: string):void;
    // abstract getTask(name: string): TaskList;
}

class User {
    constructor(userData: UserDocument){
    }
    public static async getUserById(userId:number): Promise<User>{
        const userData = await UserModel.findOne({id: userId});
        if(userData !== null){
            const user = new User(userData);
            return user;
        }else {
            throw new Error(`そんな${userId}は存在しません`);
        }
    }public addTask(task: Task){
        throw new Error("まだ追加できません");
    }

    public get tasks():  Task[] {
        return [];
    }
    
}

class Task {
    constructor(){

    }
    public static createTaskFromRequest(request: Request): Task{
        throw new Error("実装してません");
    }
    public check(): void{
        throw new Error("チェック使えないです");
    }
    public update(request:{}): void{
        throw new Error("更新できないです");
    }
}


// アプリ全体の実装
class TodoListApp {

    constructor(){
    }
    
    public async getUser(userId){
        const user = await User.getUserById(userId);
        return user;
    }

    public getTask(userid: number): Task{
        return new Task();
    }

}

const todoapp = new TodoListApp();
// api.get('/',(req, res) => {
//     res.json({message:"hello"});
// });

// タスク全件取得
api.get('/tasks', async (req, res) => {
    const userId = undefined;
    const user = await todoapp.getUser(userId);
    res.send(user.tasks);
});



// タスクの追加
// { userid : 1 }
api.post('/task',async(req, res) => {
    const userId = req.body.userId;
    console.log(userId);
    const user = await todoapp.getUser(userId);
    const task = Task.createTaskFromRequest(req)
    user.addTask(task);
    res.send();
});

// ユーザごとのタスク取得 
api.get('/user/:userid/task',async(req, res)=>{
    const userId: number = Number(req.params.userId);
    // const userId = undefined;
    const user = await todoapp.getUser(userId);

    res.send(user.tasks);
});

// チェック
// { taskId : 1 }
api.put('/check',async(req, res)=> {
    const taskId: number = req.body.taskId;
    const task = await todoapp.getTask(taskId);
    try {
        task.check();
        res.send();
    } catch (error) {
        res.status(400).send(error);
    }
});

// 更新

api.put('/task/',(req, res)=> {
    const taskId: number = Number(req.body.taskId);
    const task = todoapp.getTask(taskId);
    task.update(req.body)
    res.send()
});



// module.exports = api;