import mongoose, { Document } from 'mongoose';
import { Schema } from 'mongoose';

interface UserDocument extends Document {
    name : string,

}

interface TaskDocument extends Document {
    name : string,
    user : string,
    // owner : string,

}

mongoose.connect('mongodb://localhost:27017/todolist', {
    useNewUrlParser : true

});

const User = new Schema({
    name : String,
        
});

const Task = new Schema({
    name : Schema.Types.String,
    user : Schema.Types.ObjectId
    
});

const UserModel = mongoose.model<UserDocument>('User', User);
const TaskModel = mongoose.model<TaskDocument>('Task', Task);

(async () => {
    // const takashi = await UserModel.findById("5d256b8697040f0cfc0f1de9");
    // console.log(takashi);
    // if(takashi !== null) {
    //     const task = new TaskModel();
    //     task.name = "野菜を買いに行く";
    //     task.user = takashi._id;

    //     const taskDocument = await task.save();
    //     takashi.tasks.push(taskDocument._id);

    //     await takashi.save();
    //     console.log("完了！")

    // } else {
    //     throw new Error("いない");

    // }

    // const takashi = await UserModel.findById("5d256b8697040f0cfc0f1de9");

    const value = await UserModel.aggregate().lookup({
        from: 'tasks',
        localField: '_id',
        foreignField: 'user',
        as: 'taskList',
    }).match({ _id : mongoose.Types.ObjectId('5d256b8697040f0cfc0f1de9') });

    

    console.log(value);

})();
