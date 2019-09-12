import express, { Request } from 'express';
import { UserDocument, TaskDocument } from './interface';
import {describe, it} from 'mocha'
import { UserModel, TaskModel } from './db';

export class User {
    public userDoc:UserDocument;
    private constructor(userDoc: UserDocument){
        this.userDoc = userDoc;
    }

    public static async getUserById(userId:number): Promise<User>{
        const userDoc = await UserModel.findOne({userId: userId});
        if(userDoc !== null){
            const user = new User(userDoc);
            return user;
        }else {
            throw new Error(`そんな${userId}は存在しません`);
        }
    }

    public static async createUserFromRequest(request: Request): Promise<User>{
        const userDoc = new UserModel();
        userDoc.username = request.body.username;
        
        console.log("createUserFromRequest", userDoc);
        const user = new User(await userDoc.save());
        return user;
    }

    public createTaskFromRequest(request: Request): void{
        const task = Task.createTaskFromRequest(request,this);
    }

    public async getTasks():  Promise<Task[]> {
        const user = (await UserModel.aggregate().lookup(
            {from:'tasks',localField:'_id',foreignField:'author',as:'tasks'}
            ).match({_id:this.userDoc._id}))[0];
        const tasks:Task[] = user.tasks;
        return tasks;
    }

}

class Task {
    public taskDoc:TaskDocument;
    constructor(taskDoc: TaskDocument){
        this.taskDoc = taskDoc;
    }
    public  static async createTaskFromRequest(request: Request, user:User): Promise<Task>{
        const taskDoc = new TaskModel();
        taskDoc.name = request.body.name;
        taskDoc.icon = request.body.icon;
        taskDoc.description = request.body.description;
        taskDoc.dueTime = request.body.dueTime;
        taskDoc.author = user.userDoc._id
        console.log(taskDoc);
        const task = new Task(await taskDoc.save());
        
        return task;
    }

    public changeStatus(status: boolean){
        this.taskDoc.status = status;
        this.taskDoc.save();
    }
    public switchStatus(): void{
        this.changeStatus(!this.taskDoc.status);
    }

    public async update(request:{}): Promise<void>{
        for (const key in request) {
            this.taskDoc[key] = request[key];
        }
        await this.taskDoc.save()
    }public static async getTaskById(taskId:number):Promise<Task>{
       const taskDoc = await TaskModel.findOne({taskId:taskId});
       if(taskDoc !== null){
        const task = new Task(taskDoc);
        return task;
    }else {
        throw new Error(`そんな${taskId}は存在しません`);
    }
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

    public async getTask(taskId: number): Promise<Task>{
        const task = await Task.getTaskById(taskId);
        return task;

    }

}

export const todoapp = new TodoListApp();