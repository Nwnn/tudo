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
    author : string,
    member : [string]
}
// Task schema types
export interface TaskDocument extends Task, mongoose.Document{}

// ユーザのリスト
export interface User {
    name: string;
}

// User schema types
export interface UserDocument extends User, mongoose.Document{}


