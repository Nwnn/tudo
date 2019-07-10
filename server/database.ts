import mongoose, { Document } from 'mongoose';
import { Schema } from 'mongoose';
import moment from 'moment';

interface UserDocument extends Document {
    name : string,

}

interface TaskDocument extends Document {
    name : string,
    user : string,
    createTime : moment.Moment,
    dueTime : moment.Moment,
    // owner : string,

}

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser : true

});

const User = new Schema({
    name : Schema.Types.String,
        
});

const Task = new Schema({
    name : Schema.Types.String,
    user : Schema.Types.ObjectId,
    dueTime : Schema.Types.Date,
    createTime : Schema.Types.Date
    
});

const UserModel = mongoose.model<UserDocument>('User', User);
const TaskModel = mongoose.model<TaskDocument>('Task', Task);

(async () => {
    const takashi = await UserModel.findById("5d256b8697040f0cfc0f1de9");
    console.log(takashi);
    if(takashi !== null) {
        const task = new TaskModel();
        task.name = "野菜を買いに行く";
        task.user = takashi._id;
        task.createTime = moment();
        task.dueTime = moment().add(30,"second");

        const taskDocument = await task.save();

        await takashi.save();
        console.log("完了！")

    } else {
        throw new Error("いない");

    }

    // const takashi = await UserModel.findById("5d256b8697040f0cfc0f1de9");

    const value = await UserModel.aggregate().lookup({
        from: 'tasks',
        localField: '_id',
        foreignField: 'user',
        as: 'tasks',
    }).match({ _id : mongoose.Types.ObjectId('5d256b8697040f0cfc0f1de9') });

    
    const tks = value[0];
    for (const task of tks.tasks) {
        if(task.dueTime !== undefined){
            console.log(task.name);
            console.log(moment().diff(task.dueTime));

        }
    }

})();
