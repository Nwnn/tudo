// srest URL
const url = "http://localhost:80/api/fullfillment/"

// intentList
const intentList:Array<object> = [
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

// データ取得プロトコル
interface data {
    name : string,
    param : {
        value : any
    }
}

// 応答
interface message {
    speakText : string
}