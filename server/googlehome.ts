// Import the appropriate service and chosen wrappers
import { dialogflow } from "actions-on-google"
import { TodoApp } from './todoapp'
import moment from 'moment';
import { resolve } from "path";
import { TaskModel } from "./db";
import { strict } from "assert";
import { Task } from './db';
import { Events, data,speakText } from './middlewear'
import { json } from "body-parser";

moment.locale('ja')

// Create an app instance
export const app = dialogflow()


// 最新のタスク
app.intent('Show Task Intent', async (conv) => {
    const data:data ={
        name : conv.intent,
        param : {
            value : undefined
        }
    };return Events.intent(data).then(text => {
        const message:speakText = text;
        conv.close(message.speakText)
    });
});

// 翌日のタスク
app.intent('Show Tomorrow Task Intent', async (conv,{date}) => {
    console.log(conv.intent)
    const data:data = {
        name : conv.intent,
        param : {
            value : undefined
        }
    }
    if(typeof date === "string"){
        data.param.value = date;
    }
    return Events.intent(data).then(text => {
        const message:speakText = text;
        conv.close(message.speakText)
    });
});

// 個数選択
app.intent('Num Specified Intent', async (conv,{number}) => {
    console.log(conv.intent)
    const data:data = {
        name : conv.intent,
        param : {
            value : undefined
        }
    }
    if(typeof number === "string"){
        data.param.value = parseInt(number);
    }
    return Events.intent(data).then(text => {
        const message:speakText = text;
        conv.close(message.speakText)
    });
});

// タスクのチェック
app.intent('TaskCheck Intent', async (conv,{task}) => {
    console.log(conv.intent)
    const data:data = {
        name : conv.intent,
        param : {
            value : undefined
        }
    }
    if(typeof task === "string"){
        data.param.value = task;
    }
    console.log(data)
    return Events.intent(data).then(text => {
        const message:speakText = text;
        conv.close(message.speakText)
    });
});


// app.intent('TaskCheck Intent', async(conv,{task}) => {
//     console.log("\n===================\nインテント",conv.intent,"\nparams",conv.parameters,"\n==================\n")
//     let taskName:string = '';
//     if(typeof task === "string") {
//         taskName = task;
//         console.log("taskName",taskName);
//     }
//     let ans = 'そのようなタスクは存在しません';
//     const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
//     for(let userTask of userTasks) {
//         console.log(userTask.title);
//         if(userTask.title === taskName) {
//             console.log(userTask.taskId)
//             const updateTask:Task = {
//                 title : userTask.title,
//                 startTime : userTask.startTime,
//                 dueTime : userTask.dueTime,
//                 icon : userTask.icon,
//                 description : userTask.description,
//                 status : true,
//                 createTime : userTask.createTime,
//                 updateTime : userTask.updateTask,
//                 author : userTask.author,
//                 member : userTask.member
//                 }
//             await TodoApp.Tasks.updateTask(userTask.taskId,updateTask)
//             ans = `${userTask.title}をチェックします`
//         }
//     }
//     console.log(ans)
//     conv.close(ans);
// });

// タスクの追加
app.intent('Add Task Intent',(conv) => {
    conv.ask('タスクの名前は何ですか？');

})