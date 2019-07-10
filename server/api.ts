import express, { Router } from 'express';
import bodyParser, { json } from 'body-parser';
import { Task, User } from './interface';

export const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));

// recieve update message interface
interface UpdateTaskMessage {
    name: string|undefined,
    startTime: Date|undefined,
    dueTime: Date|undefined,
    icon: string|undefined,
    description: string|undefined,
    status: boolean|undefined,
}

const employees:Array<User>  = [
    {
        userid : 1,
        name : "たかし",
        tasks : [
            {
                taskid : 1,
                name : "仕事",
                startTime : new Date(),
                dueTime : new Date(),
                icon : "",
                description : "",
                status : false,
                createTime : new Date(),
                updateTime : undefined,
            },
            {
                taskid : 2,
                name : "家事",
                startTime : new Date(),
                dueTime : new Date(),
                icon : "",
                description : "",
                status : true,
                createTime : new Date(),
                updateTime : undefined,
            }
        ]
    },
    {
        userid: 2,
        name : "ひろし",
        tasks : [
            {
                taskid : 1,
                name : "仕事",
                startTime : new Date(),
                dueTime : new Date(),
                icon : "",
                description : "",
                status : false,
                createTime : new Date(),
                updateTime : undefined,
            },
            {
                taskid : 2,
                name : "運転",
                startTime : new Date(),
                dueTime : new Date(),
                icon : "",
                description : "",
                status : true,
                createTime : new Date(),
                updateTime : undefined,
            }
        ]
    }
]
abstract class TaskController{
    abstract getDataFromDatebase(taskList: Array<User>):any;
    abstract check(task: Task):void;
    abstract update(updatetask: UpdateTaskMessage):void;
    abstract add(userid: number, task: Task):void;
    // abstract delete(taskid: string):void;
    // abstract getTask(name: string): TaskList;
}


// 実装
class TaskControllerImplementation extends TaskController {
    public getDataFromDatebase(taskList: Array<User>): Array<User> {
        return employees;
    }

    public check(task: Task): void {
        task.status = true;
        task.updateTime = new Date();
    }

    public update(updatetask: UpdateTaskMessage):void {

    }
    public add(userid: number,task: Task): void {
        employees.forEach(employee => {
            if(employee.userid === userid){
                employee.tasks.push(task)
            }
        });
    }

}



// アプリ全体の実装
class TodoListApp {
    //
    private taskController: TaskController;
    constructor(taskController: TaskController){
        this.taskController = taskController;
    }
    
    public getDataFromDatebase(taskList: Array<User>): Array<User> {
        const task = taskList;
        return task;
    }

    public check(task: Task): void {
        this.taskController.check(task);
    }

    public update(updatetask: UpdateTaskMessage): void {
        this.update(updatetask);
    }

    public getTask(userid: number): User{
        return employees.filter(employee => employee.userid === userid)[0];
    }
    public add(userid: number, task: Task) :void{
        this.taskController.add(userid, task);
    }

}

// api.get('/',(req, res) => {
//     res.json({message:"hello"});
// });

// タスク全件取得
api.get('/task', (req, res) => {
    const todoapp = new TodoListApp(new TaskControllerImplementation());
    const list = todoapp.getDataFromDatebase(employees);

    const todo: User = JSON.parse(JSON.stringify(list));

    res.send(todo);
});


// ユーザごとのタスク取得
api.get('/task/:userid',(req, res)=>{
    const todoapp = new TodoListApp(new TaskControllerImplementation());
    const userid: number = Number(req.params.userid);
    // console.log(id);
    const task = todoapp.getTask(userid);
    // console.log(task);
    const todo: User = JSON.parse(JSON.stringify(task));

    res.send(todo);
});

// タスクの追加
// { userid : "1" }
api.post('/task',(req, res) => {
    const userid:number = Number(req.body.userid);
    console.log(userid);
    let num: number = employees[userid -1].tasks.length + 1
    const task:Task = {
        taskid : num,
        name : "宿題",
        startTime : new Date(),
        dueTime : new Date(),
        icon : "",
        description : "",
        status : false,
        createTime : new Date(),
        updateTime : undefined
    }
    const todoapp = new TodoListApp(new TaskControllerImplementation());
    employees.forEach(employee => {
        if(employee.userid === userid){
            todoapp.add(userid,task);
        }
    });
    res.redirect('/api/task/'+userid);
});


// api.put('/check/:username?/:taskname?',(req, res)=>{
//     const taskname = req.params.taskname;
//     const name = req.params.username;
//     console.log(req.params)
//     const todoapp = new TodoListApp(new TaskControllerImplementation());

//     employees.forEach(employee => {
//         if(employee.name === name){
//             employee.tasks.forEach(task => {
//                 if(task.name === taskname){
//                     todoapp.check(task);
//                 }
//             })
//         }
//     })
//     res.send(name + 'の'+taskname+'を'+'checked');
// });

// チェック
// { userid : "1", taskid : "1" }
api.put('/check',(req, res)=> {
    const todoapp = new TodoListApp(new TaskControllerImplementation());
    const userid: number = Number(req.body.userid);
    const taskid: number = Number(req.body.taskid);
    // console.log(typeof id);
    employees.forEach(employee=>{
        if (employee.userid === userid){
            employee.tasks.forEach(task =>{
                if(task.taskid === taskid){
                    todoapp.check(task);
                }
            });
        }
    });
    res.redirect('/api/task/'+userid,303)
    // res.json({message: "check success"});
});

// 更新
// { taskid : "1",updatetask : updateTask }
api.put('/update/:userid/',(req, res)=> {
    const userid: number = Number(req.params.userid);
    const taskid: number = Number(req.body.taskid);
    const addtask:UpdateTaskMessage = req.body.updatetask;
    const todoapp = new TodoListApp(new TaskControllerImplementation());

    const updatetask: UpdateTaskMessage = {
            name:"更新",
            startTime:new Date(),
            dueTime:new Date(),
            icon:undefined,
            description:"",
            status:false,
        };
    todoapp.update(updatetask);
});



// module.exports = api;