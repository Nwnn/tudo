import mongoose from 'mongoose';
import * as conf from './conf';

// import sequense from 'mongoose-sequence'
const AutoIncrement = require('mongoose-sequence')(mongoose);
 
mongoose.set('useFindAndModify',false);
mongoose.set('useCreateIndex',true);

mongoose.connect(conf.MONGO_HOST, {useNewUrlParser : true});


/****************************************
    ユーザー定義
****************************************/

export interface User {
    username: string,
    displayName: string;
    password: string;
    tasks: Task[];
    
}

// mongoose用のUser schema types として継承
export interface UserDocument extends User, mongoose.Document{}

// mongo用データベーススキーマ定義
const userSchema:mongoose.Schema = new mongoose.Schema<UserDocument>({
    username : String,
    displayName : String,
    password : String
    // tasks : [mongoose.Schema.Types.ObjectId] 
});

export const UserModel = mongoose.model<UserDocument>('user',userSchema);


/****************************************
    タスク定義
****************************************/

export interface Task{
    // id : number;
    title : string;
    startTime : Date;
    dueTime : Date;
    icon : string;
    description : string;
    status : boolean;
    createTime : Date;
    updateTime : Date | undefined;
    author : string,
    member : [string]

}

// mongoose用のTask schema types として継承
export interface TaskDocument extends Task, mongoose.Document{}

const taskSchema:mongoose.Schema = new mongoose.Schema<TaskDocument>({
    taskId : Number,
    title : String,
    startTime : mongoose.Schema.Types.Date,
    dueTime : mongoose.Schema.Types.Date,
    icon : mongoose.Schema.Types.String ,
    description : mongoose.Schema.Types.String ,
    status : {type : mongoose.Schema.Types.Boolean, default : false},
    createTime : { type : mongoose.Schema.Types.Date, default : Date.now()},
    updateTime : { type : mongoose.Schema.Types.Date, default : Date.now()},
    author : mongoose.Schema.Types.String,
    member : {type : [mongoose.Schema.Types.String],default : undefined}
});
taskSchema.plugin(AutoIncrement,{inc_field: "taskId"})
// task
export const TaskModel = mongoose.model<TaskDocument>('task',taskSchema);


