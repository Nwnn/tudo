// import { Moment } from 'moment';
// import * as moment from 'moment';

import * as mongoose from 'mongoose';

// Taskインターフェース
 export interface Task{
    name : string;
    startTime : Date;
    dueTime : Date;
    icon : string;
    description : string;
    status : boolean;
    createTime : Date;
    updateTime : Date | undefined;
    usersId : [string]
}
// Task schema types
export interface TaskDocument extends Task, mongoose.Document{
    name: string;
    startTime : Date;
    dueTime : Date;
    icon :string;
    description : string;
    status : boolean;
    createTime : Date;
    updateTime : Date | undefined;
    usersId : [string]

}

// ユーザのリスト
export interface User {
    name: string;
    // tasks: [String] | undefined;
}

// User schema types
export interface UserDocument extends User, mongoose.Document{
    name: string;
    // tasks:[String];
}


// update interface
export interface updateTask {
    updateTaskId : string,
    name: string|undefined,
    startTime: Date|undefined,
    dueTime: Date|undefined,
    icon: string|undefined,
    description: string|undefined,
    status: boolean|undefined,
    userId : string | undefined,
}

// update types
export interface updateTaskDocument extends updateTask, mongoose.Document {
    updateTaskId : string;
    name : string | undefined;
    updateName : string | undefined;
    startTime: Date | undefined;
    dueTime : Date | undefined;
    icon : string | undefined;
    description : string | undefined;
    status : boolean | undefined;
    userId : string | undefined;
}