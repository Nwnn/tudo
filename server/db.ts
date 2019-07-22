import { UserDocument, TaskDocument, updateTaskDocument } from'./interface'
// import mongoose, {Schema, Document, model, connect} from 'mongoose';
import * as mongoose from 'mongoose';
import { Tapable } from 'tapable';
import { resolve, resolveSoa } from 'dns';
import { promises } from 'fs';
import { rejects } from 'assert';
import { ObjectID } from 'bson';
import { response } from 'express';
import { type } from 'os';
import { create } from 'domain';

mongoose.connect('mongodb://localhost:27017/todoDatabase',{useNewUrlParser : true});



// // User schema types
// interface UserDocument extends User, mongoose.Document{
//     name: string;
//     tasks:[String];
// }

// // Task schema types
// interface TaskDocument extends Task, mongoose.Document{
//     name: string;
//     startTime : Date;
//     dueTime : Date;
//     icon :string;
//     description : string;
//     status : boolean;
//     createTime : Date;
//     updateTime : Date | undefined;

// }
// // update types
// interface updateTaskDocument extends updateTask, mongoose.Document {
//     name : string | undefined;
//     startTime: Date | undefined;
//     dueTime : Date | undefined;
//     icon : string | undefined;
//     description : string | undefined;
//     status : boolean | undefined;
// }

// userスキーマ作成
const userSchema:mongoose.Schema = new mongoose.Schema<UserDocument>({
    name : String,
    // tasks : [mongoose.Schema.Types.ObjectId]
});
// Userモデル作成
const User = mongoose.model<UserDocument>('user',userSchema);

// user
// const user = new User();
// user.name = '田中';

// taskスキーマ作成
const taskSchema:mongoose.Schema = new mongoose.Schema<TaskDocument>({
    name : String,
    startTime : mongoose.Schema.Types.Date,
    dueTime : mongoose.Schema.Types.Date,
    icon : mongoose.Schema.Types.String ,
    description : mongoose.Schema.Types.String ,
    status : {type : mongoose.Schema.Types.Boolean, default : false},
    createTime : { type : mongoose.Schema.Types.Date, default : Date.now()},
    updateTime : { type : mongoose.Schema.Types.Date},
    usersId : {type : [mongoose.Schema.Types.ObjectId]}
});

// updateスキーマ作成
const updateSchema:mongoose.Schema = new mongoose.Schema<updateTaskDocument>({
    updateTaskId : {type : mongoose.Schema.Types.ObjectId, default : undefined},
    name : {type : String , default : undefined},
    updateName : {type : String, default : undefined},
    startTime : {type : Date, default : undefined},
    dueTime : {type : Date, default : undefined},
    icon : {type : String, default : undefined},
    status : {type : Boolean, default : undefined},
    description : {type : String, default : undefined},
    usersId : {type : mongoose.Types.ObjectId}
});
const UpdateTasks = mongoose.model<updateTaskDocument>('update',updateSchema);

// task
const Task = mongoose.model<TaskDocument>('task',taskSchema);

const task = new Task();
task.name = "歯磨き";
task.createTime = new Date();
task.description = "徹底的に";
task.icon = "url";



// (async() => {
//     await user.save().then((resolve) => {
//         console.log("###resolve###\n",resolve);
//     }).catch((reject) => {
//         console.log("###rejects###\n",reject);
//     });
// })();




// (async() => {
//     await task.save().then((resolve) => {
//         console.log("#######resolve#####\n",resolve);
//     }).catch((reject) => {
//         console.log("###rejects#####\n",reject);
//     });
// })();


// abstract class DbController extends Document {
//     abstract docSave(): void;
// }

// class CreateUser extends DbController {
//     private userDoc : UserDocument;
//     constructor(userDoc: UserDocument) {
//         super();
//         this.userDoc = userDoc;
//     }
//     public docSave(): any {
//         this.userDoc.save().then((resolve) => {
//             return resolve;
//         }).catch((rejects) => {
//             return rejects;
//         });
//     }
// }

// class CreateTask extends DbController {
//     private taskDoc : TaskDocument;
//     constructor(taskDoc : TaskDocument) {
//         super();
//         this.taskDoc = taskDoc;
//     }
//     public docSave(): any {
//         this.taskDoc.save().then((resolve) => {
//             return resolve;
//         }).catch((rejects) => {
//             return rejects;
//         });
//     }
// }



class CreateUser {
    private userDoc : UserDocument;
    constructor(userDoc : UserDocument){
        // super();
        this.userDoc = userDoc;
    }
    public async saveDoc(): Promise<any> {
        const User = mongoose.model<UserDocument>('user',userSchema);
        const user = new User();
        user.name = this.userDoc.name;
        await user.save();
    }
}

class CreateTask {
    private taskDoc : TaskDocument;
    constructor(taskDoc : TaskDocument) {
        // super();
        this.taskDoc = taskDoc;
    }
    public async saveDoc(): Promise<any> {
        const Task = mongoose.model<TaskDocument>('task',taskSchema);
        const task = new Task();
        task.name = this.taskDoc.name;
        task.createTime = this.taskDoc.createTime;
        task.dueTime = this.taskDoc.dueTime;
        task.description = this.taskDoc.description;
        task.icon = this.taskDoc.icon;
        await task.save();
    }
}


class TaskCheck {
    private task : updateTaskDocument;
    constructor(task: updateTaskDocument) {
        // super();
        this.task = task;
    }
    public async checkTask(): Promise<any> {
        const Task = mongoose.model<TaskDocument>('task',taskSchema);
        Task.findOne({name : this.task.name}).then((resolve) => {
            if(resolve){
                const id = new ObjectID(resolve._id);
                Task.findById(id).then((resolve) => {
                    if(resolve){
                        resolve.status = true;
                        resolve.save().then((resolve) => {
                            console.log(resolve);
                        }).catch((rejects) => {
                            console.log("saveできない");
                        })
                    }
                }).catch((rejects) => {
                    console.log("そんなidのものはない");
                })
            }
        }).catch((rejects) => {
            console.log("そんな名前のものはない");
        });
    }
}


class UpdateTask {
    private updateTask : updateTaskDocument;
    constructor(updateTask : updateTaskDocument){
        this.updateTask = updateTask;
    }
    public async UpdateTask(){
        const Task = mongoose.model<TaskDocument>('task',taskSchema);
        Task.findOne({name : this.updateTask.name}).then((resolve) => {
            if(resolve) {
                const task = new Task(resolve);
                const taskId = new ObjectID(task._id);
                Task.findById(taskId).then((resolve) => {
                    if(resolve) {
                        if(this.updateTask.icon){
                            resolve.icon = this.updateTask.icon;
                        }
                        if(this.updateTask.description){
                            resolve.description = this.updateTask.description;
                        }
                        if(this.updateTask.startTime){
                            resolve.startTime = this.updateTask.startTime;
                        }
                        if(this.updateTask.dueTime){
                            resolve.dueTime = this.updateTask.dueTime;
                        }
                        if(this.updateTask.userId){
                            // const userId = new ObjectID(this.updateTask.users)
                            resolve.usersId.push(this.updateTask.userId);
                        }
                        if(this.updateTask.updateName){
                            resolve.name = this.updateTask.updateName;
                        }
                        if(this.updateTask.status === true){
                            resolve.status = true;
                        }
                        this.updateTask.updateTaskId = resolve._id;
                        (async()=>{
                            await this.updateTask.save().then((resolve) => {
                                console.log("###resolve###\nupdate保存した\n",resolve)
                            }).catch((rejects) => {
                                console.log("###rejects###\nupdate保存できなかった\n",rejects);
                            })
                        })();
                        resolve.updateTime = new Date();
                        (async()=> {
                            await resolve.save().then((resolve) => {
                                console.log("###taskに保存した###",resolve);
                            }).catch((rejects) => {
                                console.log("保存できないぞ\n",rejects);
                            });
                        })();
                    }
                }).catch((rejects) => {
                    console.log("そんなidのタスクは無い");
                });
            }
        }).catch((rejects) => {
            console.log("そんな名前のタスクはない");
        });
    }
}


class GetTaskByUserName {
    private userName : string;
    constructor(userName : string){
        this.userName = userName;
    }

    public getTaskByUserName(){
        User.findOne({name: this.userName}).then((resolve) => {
            if(resolve){
                const userId  = resolve._id;
                Task.aggregate().lookup({from : 'users', localField : 'usersId', foreignField:'_id',as:'users'}).then((resolve) => {
                    resolve.forEach(task => {
                        task.users.forEach(user => {
                            if(user.name === this.userName){
                                console.log(task.name);
                            }
                        })
                    })
                }).catch((rejects) => {
                    console.log("###rejects###\n",rejects);
                })
            }
        }).catch((rejects) => {
            console.log("###rejects###\n",rejects)
        })
    }
}

class RegistrationTaskToUser {
    private userName: UserDocument;
    private taskName: string;
    constructor(userName,taskName){
        this.userName = userName;
        this.taskName = taskName;
    }
    registration(){
        const updateData = new UpdateTasks();
        User.findOne({name:this.userName}).then((resolve) => {
            if(resolve){
                updateData.userId = resolve._id;
                const userId = new ObjectID(updateData.userId);
                Task.findOne({name : this.taskName}).then((resolve => {
                    if(resolve && updateData.userId){
                        resolve.usersId.push(updateData.userId)
                        resolve.save().then((resolve) => {
                            console.log("###resolve###\n保存できた",resolve);
                        }).catch((rejects) => {
                            console.log("###rejects###\n保存できなかった",rejects);
                        })
                    }
                })).catch((rejects) => {
                    console.log("###rejects###\nそんな名前のtaskは無い",rejects);
                })
            }
        }).catch((rejects) => {
            console.log("###rejects###\nそんな名前の人はいない",rejects);
        })
    }
}



const get = new GetTaskByUserName('佐藤')
// get.getTaskByUserName()

const updatetask = new UpdateTasks();
updatetask.name = "家の掃除";
updatetask.description = "ちゃんとやりなさい";
updatetask.icon = "url変えた";
updatetask.status = true;

// const update = new UpdateTask(updatetask);
// update.UpdateTask();

const user1 = new User();
user1.name = "斎藤";
const createUser = new CreateUser(user1);
// createUser.saveDoc();

const task1 = new Task();
task1.name = "洗濯";
task1.createTime = new Date();
task1.description = "徹底的に";
task1.icon = "url";
const createTask = new CreateTask(task1);
// createTask.saveDoc();

const getTaskByUserName = new GetTaskByUserName('佐藤');
getTaskByUserName.getTaskByUserName();

const registrationTaskToUser = new RegistrationTaskToUser('佐藤',"庭の草取り");
// registrationTaskToUser.registration();


// const update: updateTaskDocument = {icon : "urlsssss",startTime : new Date(2022,11,23)};

// const updateTask = new UpdateTask(update);
