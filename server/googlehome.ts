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
            value : ""
        }
    };return Events.intent(data).then(text => {
        const message:speakText = text;
        conv.close(message.speakText)
    });
});

// app.intent('Show Task Intent', async (conv) => {
//     const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
//     console.log(userTasks[userTasks.length - 1])
//     if(userTasks[userTasks.length  - 1] != undefined){ 
//         conv.close(`最新の予定は${ userTasks[userTasks.length - 1].title }です。締め切りは、${ moment(userTasks[userTasks.length - 1].dueTime).fromNow() }です。`)

//     } else {
//         conv.close('予定はありません')

//     }

// });

// 翌日のタスク
// app.intent('Show Tomorrow Task Intent', async (conv,{date}) => {
//     const dueDate = moment(date).date();
//     const data = {
//         "intent" : conv.intent,
//         "param" : {
//             "value" : dueDate
//         }
//     };
//     const text = Middle.

// });
// 翌日のタスク
app.intent('Show Tomorrow Task Intent', async (conv,{date}) => {
    const dueDate = moment(date).date();
    console.log("入力された明日",dueDate)
    console.log("\n===================\nインテント",conv.intent,"\nparams",conv.parameters,"\n==================\n")
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    let ans = "";
    userTasks.forEach(userTask => {
        console.log(`${userTask.dueTime}`)
        console.log(`明日${moment(userTask.dueTime).date()}`)
        if(moment(userTask.dueTime).date() === dueDate) {
            console.log(`今日のタスクあった${moment(userTask.dueTime)}`)
            ans = `本日の締め切りは${userTask.title}です`
        } else {
            console.log("無かった\n",moment(userTask.dueTime).date())
            ans = '本日の予定はありません'
        }
    });
    conv.close(ans);
});
// 個数選択
app.intent('Num Specified Intent', async (conv,{number}) => {
    console.log("\n===================\nインテント",conv.intent,"\nparams",conv.parameters,"\n===================\n")
    let num:number = 0;
    if(typeof number === "string") {
        console.log("num",number);
        num = parseInt(number);
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    let ans = `${num}個前のタスクは${userTasks[userTasks.length-num].title}です。`;
    conv.close(ans);
});

// タスクのチェック
app.intent('TaskCheck Intent', async(conv,{task}) => {
    console.log("\n===================\nインテント",conv.intent,"\nparams",conv.parameters,"\n==================\n")
    let taskName:string = '';
    if(typeof task === "string") {
        taskName = task;
        console.log("taskName",taskName);
    }
    let ans = 'そのようなタスクは存在しません';
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    for(let userTask of userTasks) {
        console.log(userTask.title);
        if(userTask.title === taskName) {
            console.log(userTask.taskId)
            const updateTask:Task = {
                title : userTask.title,
                startTime : userTask.startTime,
                dueTime : userTask.dueTime,
                icon : userTask.icon,
                description : userTask.description,
                status : true,
                createTime : userTask.createTime,
                updateTime : userTask.updateTask,
                author : userTask.author,
                member : userTask.member
                }
            await TodoApp.Tasks.updateTask(userTask.taskId,updateTask)
            ans = `${userTask.title}をチェックします`
        }
    }
    console.log(ans)
    conv.close(ans);
});

// タスクの追加
app.intent('Add Task Intent',(conv) => {
    conv.ask('タスクの名前は何ですか？');

})