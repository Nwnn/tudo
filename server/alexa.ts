import { SkillBuilders, HandlerInput } from "ask-sdk-core"
import express from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import { Events, data,speakText } from './middlewear'
import { TodoApp } from './todoapp'
import moment from 'moment'
import request from 'request'

moment.locale('ja')

const url = "http://localhost:80/api/fullfillment/"

const intentList:Array<any> = [
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
        intentName : 'Task Check Intent',
        intentUrl : 'TaskCheckIntent',
        parameter : 'task'
    }
];

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


const handlers: any[] = [];
for (const intent of intentList) {
    const handler = {
        canHandle(handlerInput) {
            // Alexaのインテント名は空白をのぞかなければならない
            return handlerInput.requestEnvelope.request.intent.name === intent.intentName.replace(/\s+/g, "");
        },
        async handle(handlerInput) {
            console.log(handlerInput.requestEnvelope.request.intent.slots)
            let slots: any = undefined;
            if(handlerInput.requestEnvelope.request.intent.slots){
                slots = Object.entries(handlerInput.requestEnvelope.request.intent.slots);

            }
            
            console.log(slots);

            let slotvalue = undefined;
            if (slots !== undefined) {
                slotvalue = slots[0][1].value
            }
            
            const response = await new Promise(async (resolve, reject) => {

                // ここから取得処理
                const data:data = {
                    name : intent["intentName"],
                    param : {
                        value : slotvalue
                    }
                };

                console.log(data)

                const options = {
                    url : url+intent["intentUrl"],
                    header: {"Content-type": "application/json"},
                    json:data
                }
                const message:speakText = await requestText(options);
                console.log("message",message);
                resolve(message.speakText)

            });
            
            return handlerInput.responseBuilder
            .speak(response)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();

        }
    };
    
    handlers.push(handler)
}

// エラー発生時のHandler
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);
        return handlerInput.responseBuilder
            .speak('申し訳ありません。内部エラーが発生致しました。再度、スキルを立ち上げ直してください。') 
            .getResponse();
    },
};

const skillBuilder = SkillBuilders.custom()
    .addRequestHandlers(
        ...handlers
    )
    .addErrorHandlers(ErrorHandler)

const skill = skillBuilder.create();
export const alexaExpressAdapter = new ExpressAdapter(skill, true, true);