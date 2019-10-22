// Import the appropriate service and chosen wrappers
import { dialogflow } from "actions-on-google"
import { TodoApp } from './todoapp'
import moment from 'moment';
import { resolve } from "path";
import { TaskModel } from "./db";
import { strict } from "assert";
import { Task } from './db'
moment.locale('ja')

// Create an app instance
export const app = dialogflow()
  
// 最新のタスク
app.intent('Show Task Intent', async (conv) => {
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
    if(userTasks[0] != undefined){ 
        conv.close(`最新の予定は${ userTasks[0].title }です。締め切りは、${ moment(userTasks[0].dueTime).fromNow() }です。`)

    } else {
        conv.close('予定はありません')

    }

});

// app.intent('Show Tomorrow Task Intent', (conv,{date}) => {
//     const dueDate = moment(date).date();
//     console.log("入力された今日",dueDate)
//     return new Promise((resolve) => {
//         TodoApp.Tasks.getTasksByUsername("user115")
//         .then(userTasks => {
//             for (let i = 0; i < userTasks.length; i++) {
//                 if(moment(userTasks[i].dueDate).date() === dueDate) {
//                     console.log(`あった${userTasks[i].title}`)
//                     conv.close(`本日の予定は${userTasks[i].title}`)

//                 } else {
//                     console.log(`無かった`)
//                     conv.close('本日の予定はありません')
//                 }
//             }
//         });
//     });
// });

// 翌日のタスク
app.intent('Show Tomorrow Task Intent', async (conv,{date}) => {
    const dueDate = moment(date).date();
    console.log("入力された明日",dueDate)
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