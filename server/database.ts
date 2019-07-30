import { MongoClient, ObjectId } from 'mongodb';
import { Schema, createConnection, Document, Model, model, Mongoose, SchemaType } from 'mongoose';
import { User, Task, updateTask } from './interface'
// import { Moment, months, min, isDate, } from 'moment';
// import * as moment from 'moment';
import { resolve } from 'url';
import { rejects } from 'assert';

const dbName = 'todoDatabase'
const userCollection = 'user'
const taskCollection = 'task'

const url: string = 'mongodb://tudo-mongo:27017'

// User schema types
interface UserDocument extends User, Document{
    name: string;
    tasks:[String];
}

// Task schema types
interface TaskDocument extends Task, Document{
    name: string;
    startTime : Date;
    dueTime : Date;
    icon :string;
    description : string;
    status : boolean;
    createTime : Date;
    updateTime : Date | undefined;

}
// update types
interface updateTaskDocument extends updateTask, Document {
    name : string | undefined;
    startTime: Date | undefined;
    dueTime : Date | undefined;
    icon : string | undefined;
    description : string | undefined;
    status : boolean | undefined;
}
// userスキーマ作成
const userSchema:Schema = new Schema<UserDocument>({
    name : Schema.Types.String ,
    tasks :[Schema.Types.ObjectId]
});
// Userモデル作成
const userModel:Model<UserDocument> = <Model<UserDocument>>model('user',userSchema);

// userインスタンス userドキュメント作成
const user: UserDocument = new userModel({name:'たけし'});

// taskスキーマ作成
const taskSchema:Schema = new Schema<TaskDocument>({
    name : String ,
    startTime : Schema.Types.Date,
    dueTime : Schema.Types.Date,
    icon : Schema.Types.String ,
    description : Schema.Types.String ,
    status : {type : Schema.Types.Boolean, default : false},
    createTime : { type : Schema.Types.Date, default : Date.now()},
    updateTime : { type : Schema.Types.Date, default : undefined },
});
// taskmodel作成
const taksModel:Model<TaskDocument> = <Model<TaskDocument>>model('task', taskSchema);

// udpateスキーマ作成


// taskインスタンス　taskドキュメント作成
const task: TaskDocument = new taksModel(
    {
        name: '料理',
        startTime: new Date(),
        dueTime: new Date(),
        icon : "url",
        description : undefined,
        status : false,
        createTime : new Date(),
        updateTime : new Date(),
    }
);

const taskTest: TaskDocument = new taksModel(
    {
        name : "散歩",
        dueTime : new Date(2019, 11, 12),
        icon : "url",
        description : "全力で"
    })

const client = new MongoClient(url, {useNewUrlParser : true});

// userの追加
export function createUser(userName: string) {
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection(userCollection,(err, client_user) => {
                if(err) {
                    console.log(err);
                }
                else {
                    const add_user: UserDocument = new userModel({ name : userName });
                    client_user.insert(add_user).then((resolve) => {
                        console.log(resolve);
                    }).catch((rejects) => {
                        console.log(rejects);
                    });
                }
            });
        }client.close();
    });
}


// taskの追加
export function createTask(/*addTask : Task*/){
    client.connect((err, client) => {
        if(err) {
             console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection(taskCollection,(err, client) => {
                if(err){
                    console.log(err);
                }
                else{
                    const task: TaskDocument = new taksModel();
                    // task.name = addTask.name;
                    // task.startTime = addTask.startTime;
                    // task.dueTime = addTask.dueTime;
                    // task.icon = addTask.icon;
                    // task.description = addTask.description;
                    // task.status = addTask.status;
                    // task.updateTime = addTask.updateTime;
                    client.insert(taskTest).then((resolve) => {
                        console.log(resolve);
                    }).catch((rejects) => {
                    console.log('rejects',rejects);
                })
            }
            });
        }client.close();
    })
}

// user_idからtaskの取得
export function getTaskByUserId(user_id: string){
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection(userCollection,async(err, client_user) => {
                if(err) {
                    console.log(err);
                }
                else {
                    const id = new ObjectId(user_id);
                    await client_user.findOne({ _id : id }).then((resolve) => {
                        return resolve;
                    });
                    
                }
            });
        }
    });
}

// userにtaskを追加
export function taskAddToUserTasks(userId: string, taskId: string){
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection(taskCollection,async(err, client_task) =>{
                if(err) {
                    console.log('db',err);
                }
                else {
                    const task_id = new ObjectId(taskId)
                    await client_task.findOne({ _id : task_id }).then((resolve) =>{
                        console.log(resolve);
                        db.collection(userCollection,async(err, cliet_user) => {
                            if(err){
                                console.log(err);
                            }
                            else {
                                const user_id = new ObjectId(userId);
                            await cliet_user.findOneAndUpdate(
                                { _id : user_id },
                                { $addToSet : { tasks : resolve._id }},
                                 { upsert : false }
                                 ).then((resolve) => {
                                     console.log("#####resolve#####",resolve);
                                 }).catch((rejects) => {
                                     console.log("#####rejects#####",rejects);
                                 });
                                }
                        });
                    });
                }
            });
        }
    })
}

// taskの全権取得
export function getTaskAll(){
    client.connect(async(err, client) => {
        if(err){
            console.log(err)
        }
        else {
            console.log("成功はした")
            const db = client.db(dbName);
            const taksModel:Model<TaskDocument> = <Model<TaskDocument>>model(taskCollection, taskSchema);
            await taksModel.findById("5d2dc95ff18c90420cd52879",'name').then((resolve) => {
                console.log(resolve);
            }).catch((rejects) => {
                console.log(rejects);
            });
        }
    });
}

// ユーザごとに検索
export function userSearch(userId:string){
    client.connect((err, client) => {
        if(err) {
            console.log(err)
        }
        else {
            const id = new ObjectId(userId);
            console.log("接続成功");
            const db = client.db(dbName);
            db.collection(userCollection,async(err, client_user) => {
                if(err){
                    console.log(err);
                }else{
                    await client_user.findOne({ _id : id }).then((resolve) => {
                        console.log(resolve);
                    }).catch((rejects) => {
                        console.log(rejects);
               });
            }
            });
        }
    });
}

// taskにチェックする
export　function taskCheck(taskId: string){
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection(taskCollection,async(err, client_task) => {
                if(err) {
                    console.log(err);
                }
                else {
                    const id = new ObjectId(taskId);
                    const _id = new ObjectId(id)
                    await client_task.findOneAndUpdate(
                        { _id : _id },
                        {$set: { status : true , updateTime : new Date() } },
                        {upsert : false}).then((resolve) => {
                        console.log(resolve);
                    }).catch((rejects) => {
                        console.log(rejects);
                    });
                }
            });
        }
    });
}

// taskの更新
export function taskUpdate(updateTask: updateTask){
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db(dbName);
            db.collection(taskCollection,async(err, client_task) => {
                if(err) {
                    console.log(err);
                }
                else {
                    client_task.findOne({name : updateTask.name})
                }
            })
        }
    })    
}


// function taskget(){
//     client.connect((err, client) => {
//         if(err) {
//             console.log(err)
//         }
//         else {
//             console.log("成功");
//             const db = client.db(dbName):
//             db.collection
//         }
//     })
// }


// userSearch('たけし');
// taskCheck();
// taskId_in_userTasks('5d2dd329c8a0ae51b843c556','5d2e6b49f4a15b4980516a79');

// task_add();
// user_add();
createTask();

// メールアドレスも検索に使う
