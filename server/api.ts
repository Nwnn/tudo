import express, { Request } from 'express';
import bodyParser from 'body-parser';
import { UserDocument, TaskDocument } from './interface';
import {describe, it} from 'mocha'
import { UserModel, TaskModel } from './db';
import passport from './authorize'

export const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));


class User {
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

const todoapp = new TodoListApp();
// api.get('/',(req, res) => {
//     res.json({message:"hello"});
// });



// タスク全件取得
api.get('/tasks', async (req, res) => {
    const userId = req.query.userId;
    console.log(userId);
    try {
        const user = await todoapp.getUser(userId);
        res.send(await user.getTasks());
    } catch (error) {
        res.status(204).send();
        
    }
    
});

// サインアップ
api.post('/signup',async(req, res) => {
    console.log(req.body);
    const userName = req.body.username;
    try {
        if(req.body.password == undefined) {
            throw new Error("パスがない");
            
        }

        const user = await User.createUserFromRequest(req);
        console.log(user)
        user.userDoc.password = req.body.password
        user.userDoc.save()
        res.send(user);

    } catch (error) {
        res.status(400).send();

    }

});

api.post('/signin', passport.authenticate('local'))
api.post('/signout', (req, res) => {
    req.logout();
    res.send("signout");

})

// タスクの追加
api.post('/task',async(req, res) => {
    const userId = req.body.userId;
    console.log("req.body\n",req.body);
    try {
        const user = await todoapp.getUser(userId);
        user.createTaskFromRequest(req);
        res.send();
    } catch (error) {
        res.status(400).send();
    }


});

// ユーザごとのタスク取得 
api.get('/user/:userId/task',async(req, res)=>{
    const userId: number = Number(req.params.userId);
    // const userId = undefined;
    try {
        const user = await todoapp.getUser(userId);
        res.send(await user.getTasks());
    } catch (error) {
        res.status(204).send(error);
    }

});

// チェック
api.put('/check',async(req, res)=> {
    console.log(req.body);
    const taskId: number = req.body.taskId;
    const task = await todoapp.getTask(taskId);
    try {
        task.switchStatus();
        res.send();
    } catch (error) {
        res.status(400).send(error);
    }
});

// 更新

api.put('/task',async(req, res)=> {
    const taskId: number = req.body.taskId;
    const task = await todoapp.getTask(taskId);
    task.update(req.body)
    res.send()

});
