import { SkillBuilders } from "ask-sdk-core"
import express from 'express';
import { ExpressAdapter } from 'ask-sdk-express-adapter';

//インテントタイプ、インテント名が一致しているか確認し返却します
function checkIntentTypeName(handlerInput, typeName, intentName) { 
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
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('ハローワールド') 
            .getResponse();
    }
}

const ShowTaskHandler = {
    canHandle(handlerInput) {
        return true
    },
    async handle(handlerInput) {
        return handlerInput.responseBuilder
            .speak('おおおおおおおおおおおおおおおおおおおお') 
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
        ShowTaskHandler,
        LaunchHandler,
        HelpIntentHandler,
        SkillEndHandler)
    .addErrorHandlers(ErrorHandler)

const skill = skillBuilder.create();
export const alexaExpressAdapter = new ExpressAdapter(skill, true, true);
