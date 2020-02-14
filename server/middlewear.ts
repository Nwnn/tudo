import { TodoApp } from './todoapp';
import moment from 'moment';


/****************************************
    発話内容定義
    speakText内に発話内容を格納
****************************************/
export interface speakText {
    speakText : string
}

/****************************************
    データ取得用プロトコル定義
****************************************/
export interface data {
    name : string,
    param : {
        value : any
    }
}

interface data_2 {
    intentName : string,
    userName : string,
    param : {
        value : any
    }
}

async function showTaskIntent():Promise<speakText> {
    // console.log(data)
    const message:speakText = {
        speakText : ""
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    if(userTasks[userTasks.length - 1] != undefined){
        const task = userTasks[userTasks.length - 1]
        message.speakText = `最新の予定は${ task.title }です。締め切りは${moment(task.dueTime).fromNow()}です。`
    } else {
        message.speakText = '予定はありません'
    }
    return message
}

async function showTomorrowTaskIntent(date:Date):Promise<speakText> {
    const dueTime = moment(date).date();
    const message:speakText = {
        speakText : ""
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    userTasks.forEach(userTask => {
        if(moment(userTask.dueTime).date() === dueTime) {
            message.speakText = `明日締め切りの予定は${userTask.title}です`
        } else {
            message.speakText = '明日締め切りの予定はありません'
        }
    })
    // message.speakText = 'resuponse'
     return message
 }

async function numSpecifiedIntent(number:number):Promise<speakText> {
    let num = number
    const message:speakText = {
        speakText : ""
    };
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    message.speakText = `${num}個前のタスクは${userTasks[userTasks.length - 1 - num].title}です。`;
    return message
}

async function taskCheckIntent(task:string|number):Promise<speakText> {
    console.log(task)
    const taskName = task;
    const message:speakText = {
        speakText : "そのようなタスクはありません"
    }
    const userTasks = await TodoApp.Tasks.getTasksByUsername("user115");
    for(let userTask of userTasks) {
        if(userTask.title === taskName || userTask.taskId === taskName) {
            if(userTask.status === false){
                const taskStatus:any = {
                    status : true
                }
                await TodoApp.Tasks.updateTask(userTask.taskId,taskStatus).then(resolve=>{
                    message.speakText = `${userTask.title}をチェックします`
                });
                
            } else {
                message.speakText = `${userTask.title}はチェック済みです`
            }
        }
    }return message
}

const intents = new Map();

//Todoのintents
intents.set("Show Task Intent",showTaskIntent);
intents.set("Show Tomorrow Task Intent",showTomorrowTaskIntent);
intents.set("Num Specified Intent",numSpecifiedIntent);
intents.set("TaskCheck Intent",taskCheckIntent);

export class Events {
    static async intent(data:data):Promise<speakText>{
        const func = intents.get(data.name);
        const message:speakText = await func(data.param.value);
        return message
    }
}