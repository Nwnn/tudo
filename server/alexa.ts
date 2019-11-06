import { SkillBuilders, HandlerInput } from "ask-sdk-core"
import express from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';
import { TodoApp } from './todoapp'
import moment from 'moment'

moment.locale('ja')

//インテントタイプ、インテント名が一致しているか確認し返却します
function checkIntentTypeName(handlerInput, typeName, intentName) { 
    console.log(handlerInput.requestEnvelope.request)
    let request = handlerInput.requestEnvelope.request;
    let isMatch = false;
    //インテントタイプのチェックを行う
    if (typeName && request.type === typeName) {
        isMatch = true;
    } else {
        isMatch = false;
    }
    //リクエストインテント名のチェックを行う
    if (intentName) {
        if (request.intent && request.intent.name === intentName) {
            isMatch = true;
        } else { 
            isMatch = false;
        }
    }
    return isMatch;
}


// スキル起動のHandler
const LaunchHandler = {
    canHandle(handlerInput) {
        console.log(handlerInput)
        return checkIntentTypeName(handlerInput, 'LaunchRequest', '');
    },
    async handle(handlerInput : HandlerInput) {
        return handlerInput.responseBuilder
        .addDirective({
            type: 'Dialog.Delegate',
            updatedIntent: {
              name: 'ShowTaskIntent',
              confirmationStatus: 'NONE',
              slots: {}
            }
        })
        .getResponse();

    }

}

// スキル起動のHandler
const ShowTaskHandler = {
    canHandle(handlerInput) {
        console.log(handlerInput)
        return checkIntentTypeName(handlerInput, 'LaunchRequest', 'ShowTaskIntent');
    },
    async handle(handlerInput: HandlerInput) {
        const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
        const latestTask = userTasks[userTasks.length - 1];

        if(latestTask != undefined){
            // 締め切り「前です」→「過ぎています」
            return handlerInput.responseBuilder
                .speak(`最新の予定は「${ latestTask.title }」です。締め切りは、${ moment(latestTask.dueTime).fromNow() }です。`)
                .getResponse();

        } else {
            return handlerInput.responseBuilder
            .speak("まだ完了していない予定はありません") 
            .getResponse();

        }


    }
}

const ShowTaskByIdHandler = {
    canHandle(handlerInput) {
        console.log(handlerInput)
        return checkIntentTypeName(handlerInput, 'LaunchRequest', 'ShowTaskByIdIntent');
    },
    async handle(handlerInput) {
        const userTasks = await TodoApp.Tasks.getTasksByUsername("user115")
        if(userTasks[0] != undefined){
            // 締め切り「前です」→「過ぎています」
            return handlerInput.responseBuilder
                .speak(`a`) 
                .getResponse();

        } else {
            return handlerInput.responseBuilder
            .speak("まだ完了していない予定はありません") 
            .getResponse();

        }


    }
}

const ShowDescriptionHandler = {
    canHandle(handlerInput) {
        console.log(handlerInput)
        return checkIntentTypeName(handlerInput, 'IntentRequest', 'ShowDescriptionIntent');
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
        .speak("unhandle") 
        .getResponse();

    }
}


// ヘルプのHandler
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return checkIntentTypeName(handlerInput, 'IntentRequest', 'AMAZON.HelpIntent');
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('いま進行中の作業は、「アレクサ、タスク管理でタスクを教えて」と言うことでお知らせします') 
            .getResponse();
    }
}


// スキル終了のHandler
const SkillEndHandler = {
    canHandle(handlerInput) {
        return (
            checkIntentTypeName(handlerInput, 'IntentRequest', 'AMAZON.CancelIntent')
            || checkIntentTypeName(handlerInput, 'IntentRequest', 'AMAZON.StopIntent')
        );
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('スキルを終了します。') 
            .getResponse();
    }
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
        LaunchHandler,
        ShowTaskHandler,
        ShowDescriptionHandler,
        HelpIntentHandler,
        SkillEndHandler)
    .addErrorHandlers(ErrorHandler)

const skill = skillBuilder.create();
export const alexaExpressAdapter = new ExpressAdapter(skill, true, true);
