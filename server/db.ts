import { UserDocument, TaskDocument } from'./interface'
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/todoDatabase',{useNewUrlParser : true});


// userスキーマ作成
const userSchema:mongoose.Schema = new mongoose.Schema<UserDocument>({
    name : String,
    // tasks : [mongoose.Schema.Types.ObjectId]
});
// Userモデル作成
export const UserModel = mongoose.model<UserDocument>('user',userSchema);

// taskスキーマ作成
const taskSchema:mongoose.Schema = new mongoose.Schema<TaskDocument>({
    name : String,
    startTime : mongoose.Schema.Types.Date,
    dueTime : mongoose.Schema.Types.Date,
    icon : mongoose.Schema.Types.String ,
    description : mongoose.Schema.Types.String ,
    status : {type : mongoose.Schema.Types.Boolean, default : false},
    createTime : { type : mongoose.Schema.Types.Date, default : Date.now()},
    updateTime : { type : mongoose.Schema.Types.Date, default : Date.now()},
    author : {type: mongoose.Schema.Types.ObjectId},
    member : {type : [mongoose.Schema.Types.ObjectId],default : undefined}
});
// task
export const TaskModel = mongoose.model<TaskDocument>('task',taskSchema);


