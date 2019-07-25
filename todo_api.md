# データの形式

## ユーザーのデータ形式
  {
    "userName" : string,
    "userId": string
  }
  
## タスクのデータ形式
  {
    "status" : boolean,
    "createTime": Date,
    "updateTime": Date,
    "name": string,
    "icon": string,
    "author": ユーザー,
    "taskId": number
  }

# api

## タスクの全権取得
GET /api/tasks
in
{
    "userId": number
}
out
タスクの配列


## ユーザーを指定してタスクの取得
GET /api/user/:userId/task

out
タスクの配列

## タスクの追加
POST /api/task
in
{
    "userId" : number,
    "name" : string,
    "icon" : string,
    "dueTime" : Date,
    "description" : string
}
out
status(200)のみ

## タスクの更新
PUT /api/task
in
{
    "taskId" : number
    
}
out
status(200)のみ

## ユーザーの追加(仮)
POST /api/signup
in
{
    "userName" : string
}

out
status(200)のみ