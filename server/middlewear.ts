import { TodoApp } from './todoapp';
import moment from 'moment';
import { Task } from './db';

export interface speakText {
    speakText : string
}
export interface data {
    name : string,
    param : {
        value : string | number
    }
}

async function showTaskIntent():Promise<speakText> {
    // console.log(data)
    let message:speakText = {
        speakText : ""
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    if(userTasks[userTasks.length - 1] != undefined){
        message.speakText = `最新の予定は${ userTasks[userTasks.length - 1].title }です。締め切りは${moment(userTasks[userTasks.length - 1].dueTime).fromNow()}です。`;
    } else {
        message.speakText = '予定はありません'
    }
    return message
}

async function showTomorrowTaskIntent(date:Date):Promise<speakText> {
    const dueTime = moment(date).date();
    let message:speakText = {
        speakText : ""
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
    userTasks.forEach(userTask => {
        if(moment(userTask.dueTime).date() === dueTime){
            message.speakText = `本日の締め切りは${userTask.title}です。`
        } else {
            message.speakText = '本日の予定はありません'
        }
    });
    return message
}

async function numSpecifiedIntent(number:number):Promise<speakText> {
    let num = number
    let message:speakText = {
        "speakText" : ""
    };
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
    message.speakText = `${num}個前のタスクは${userTasks[userTasks.length - 1 - num].title}です。`
    return message
}

async function taskCheckIntent(task:string):Promise<speakText> {
    const taskName = task;
    let message:speakText = {
        speakText : ""
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    for(let userTask of userTasks) {
        if(userTask.title === taskName) {
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
            message.speakText = `${userTask.title}をチェックします。`
        } else {
            message.speakText = 'そのようなタスクは存在しません。'
        }
    }return message
}

// const intents = new Map([["Show Task Intent", showTaskIntent],["Show Tomorror Task Intent",showTomorrowTaskIntent],["Num Specified Intent", numSpecifiedIntent],["Task Check Intent",taskCheckIntent]]);
const intents = new Map()
intents.set("Show Task Intent",showTaskIntent)
intents.set("Show Tomorror Task Intent",showTomorrowTaskIntent)
intents.set("Num Specified Intent",numSpecifiedIntent)
intents.set("Task Check Intent",taskCheckIntent)

const func = intents.get("Show Task Intent")

// const tes:data = {
//     name : "show",
//     param : {
//         value : "show"
//     }
// }

// abstract class Event {
//     abstract async intent(data:data):Promise<string>;
// }

// export class Events extends Event {

//     async intent(data):Promise<string>{
//        const func = intents.get(data.name);
//        const message = await func(data.param.value)
//        return message
//     }
// }
export class Events {
    static async intent(data:data):Promise<speakText>{
        const func = intents.get(data.name);
        const message:speakText = await func(data.param.value)
        return message
    }
}