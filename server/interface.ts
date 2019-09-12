// import { Moment } from 'moment';
// import * as moment from 'moment';

import * as mongoose from 'mongoose';

export interface Task{
    // id : number;
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

// mongoose用のTask schema types として継承
export interface TaskDocument extends Task, mongoose.Document{}

export interface User {
    userId: number,
    username: string;
    password: string;
    tasks: Task[];
    
}

// mongoose用のUser schema types として継承
export interface UserDocument extends User, mongoose.Document{}



