// Import the appropriate service and chosen wrappers
import { dialogflow } from "actions-on-google"
import { TodoApp } from './todoapp'
import moment from 'moment';
import { TaskModel } from "./db";
import { strict } from "assert";
import { Task } from './db';
import { Events, data,speakText } from './middlewear'
import { json, text } from "body-parser";
import request from 'request'
import { convert } from "actions-on-google/dist/service/actionssdk";


moment.locale('ja');

// Create an app instance
export const app = dialogflow();

 async function requestText(options):Promise<speakText>{
    let message:speakText = {speakText : ""}
    const responseData:any = await new Promise((resolve, reject) =>{
        request.post(options, (error, response, body)=>{
            if(error){
                reject("取得できませんでした");
            }else {
                resolve(body);
            }
        })
    })
    message={speakText:responseData.speakText}
    return message
}
const url = "http://localhost:80/api/fullfillment/"

const intentList:Array<object> = [
    {
        intentName : 'Default Welcome Intent',
        intentUrl : 'DefaultWelcomeIntent',
        parameter : ''
    },
    {
        intentName : 'Show Task Intent',
        intentUrl : 'ShowTaskIntent',
        parameter : ''
    },
    {
        intentName : 'Show Tomorrow Task Intent',
        intentUrl : 'ShowTomorrowTaskIntent',
        parameter : 'date'
    },
    {
        intentName : 'Num Specified Intent',
        intentUrl : 'NumSpecifiedIntent',
        parameter : 'number'
    },
    {
        intentName : 'TaskCheck Intent',
        intentUrl : 'TaskCheckIntent',
        parameter : 'task'
    }
];

intentList.forEach(intent => {
    app.intent(intent["intentName"],async(conv)=> {
        console.log("intentName",intent["intentName"]);
        console.log("params",conv.parameters[intent["parameter"]]);
        const data:data = {
            name : conv.intent,
            param : {
                value : conv.parameters[intent["parameter"]]
            }
        };
        const options = {
            url : url+intent["intentUrl"],
            header: {"Content-type": "application/json"},
            json:data
        }
        const message:speakText = await requestText(options);
        console.log("message",message);
        conv.ask(message.speakText)
    })
});

// app.intent('Show Task Intent', async(conv) => {
//     console.log(conv.intent);
//     console.log(conv.parameters[""])
//     const data:data = {
//         name : conv.intent,
//         param : {
//             value : undefined
//         }
//     };
//     const options = {
//         url:'http://localhost:80/api/fullfillment/ShowTaskIntent',
//         header: {"Content-type": "application/json"},
//         json:data
//     }
//     const message:speakText = await requestText(options);
//     console.log(message);
//     conv.close(message.speakText);

// });

// // 翌日締め切りのタスク
// app.intent('Show Tomorrow Task Intent', async (conv,{date}) => {
//     console.log(conv.intent)
//     console.log("###",conv.parameters,"###")
//     console.log(date)
//     const data:data = {
//         name : conv.intent,
//         param : {
//             value : conv.parameters["date"]
//         }
//     }
//     const options = {
//         url:'http://localhost:80/api/fullfillment/ShowTomorrowTaskIntent',
//         header: {"Content-type": "application/json"},
//         json:data
//     }
//     console.log(data)
//     const message:speakText = await requestText(options);
//     console.log(message);
//     conv.close(message.speakText);
// });

// // 個数選択でタスクの確認
// app.intent('Num Specified Intent', async (conv,{number}) => {
//     console.log(conv.intent)
//     const data:data = {
//         name : conv.intent,
//         param : {
//             value : number
//         }
//     }
//     const options = {
//         url:'http://localhost:80/api/fullfillment/NumSpecifiedIntent',
//         header: {"Content-type": "application/json"},
//         json:data
//     }
//     console.log(data)
//     const message:speakText = await requestText(options);
//     console.log(message);
//     conv.close(message.speakText);
// });

// // タスクのチェック
// app.intent('TaskCheck Intent', async (conv,{task}) => {
//     console.log(conv.intent)
//     const data:data = {
//         name : conv.intent,
//         param : {
//             value : task
//         }
//     }
//     const options = {
//         url:'http://localhost:80/api/fullfillment/TaskCheckIntent',
//         header: {"Content-type": "application/json"},
//         json:data
//     }
//     console.log(data)
//     const message:speakText = await requestText(options);
//     console.log(message);
//     conv.close(message.speakText);
// });


// 最新のタスク
// app.intent('Show Task Intent', async (conv) => {
//     console.log(conv.intent);
//     const data:data = {
//         name : conv.intent,
//         param : {
//             value : undefined
//         }
//     };return await Events.intent(data).then(text => {
//         const message:speakText = text;
//         conv.close(message.speakText)
//     });
// });
