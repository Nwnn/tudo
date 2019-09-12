todoアプリ機能概要 2019/7/27

# 1. 機能
* タスクの情報を取得
* タスク追加
* タスクの更新
* ユーザ追加

シナリオ
1. スマートスピーカからアプリ起動　=> APIからユーザのIDを取得
3. 作業内容と期限を発話しタスク追加 =>　ユーザID、タスク名、期限などを含めた情報をAPIに送信
4. タスク一覧の取得 => APIにユーザIDを送信しタスク情報を取得
4. 作業完了時のチェック☑、または内容変更 => APIにタスクIDと更新情報を送信

# 2. データの形式
JSON形式で記述（ ここでは "key" : 型 で表記する ）

## ユーザーのデータ形式
```
{
    "userId": string,
    "username" : string
}
```

## タスクのデータ形式
```
{
    "taskId": number
    "name": string,
    "status" : boolean, // 作業の完了状態 (チェックボックス)
    "createTime": Date (string),
    "updateTime": Date (string),
    "author": userId (string), // タスクの作成者
    "icon": string // タスクアイコン (画像の表示を行う端末用)
}
```

Dateは ``` Date.now() ``` で取得したものを使用

# 3. REST API

## ユーザのタスク取得 (セッション時を想定)

GET /api/tasks

### Request
```
空 
``` 
現在は固定のユーザIDで取得を行っている。ログイン機構などは各スマートスピーカの仕様から検討したい

### Response
200
```
タスクの配列

{
    "status" : boolean,
    "createTime": Date,
    "updateTime": Date,
    "name": string,
    "icon": string,
    "author": ユーザー,
    "taskId": number
}[]
```

----

## 特定ユーザのタスク取得

GET /api/user/:userId/task

### Request
```
空
```

### Response
```
タスクの配列
```

----

## タスクの追加
POST /api/task

### Request
```
{
    "userId" : number,
    "name" : string,
    "icon" : string,
    "dueTime" : Date,
    "description" : string
}
```

### Response

ステータスコード ( 200 または 400 )  
bodyは空

---

## タスクの更新
PUT /api/task

### Request
```
{
    "taskId": number, // 必須

    // 以下は任意
    "status" : boolean,
    "createTime": Date,
    "updateTime": Date,
    "name": string,
    "icon": string,
    "author": userId,

}
```

### Response

ステータスコード ( 200 または 400 )  
bodyは空

----

## ユーザーの追加
POST /api/signup

### Request

```
{
    "userName" : string
}
```

### Response
ステータスコード(200)  
```
{
    "userName" : string,
    "userId" : string
}
```

認証に必要な要素はスマートスピーカー毎の仕様に応じて検討を行う

各デバイスのユーザ識別方法を以下に示す  
Google Home : https://developers.google.com/actions/identity/user-info  
Amazon Alexa : https://developer.amazon.com/ja/docs/account-linking/understand-account-linking.html
