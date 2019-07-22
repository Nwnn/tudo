import { MongoClient } from 'mongodb';
import { Schema, createConnection, Document, Model, model, Mongoose, SchemaType, SchemaTypes } from 'mongoose';
import { User, Task, updateTask } from './interface'
import { connect } from 'http2';
import { disconnect } from 'cluster';
import { resolve } from 'url';
import { updateExpression } from '@babel/types';

interface personDocument extends Document {
    name : string,
    age : number,
    tasks : [string]
}

interface taskDocument extends Document {
    name : string,
    status : boolean,
}


const url: string = 'mongodb://localhost:27017';

// personスキーマ定義
const personSchema:Schema = new Schema<personDocument>({
    name : Schema.Types.String,
    age : Schema.Types.Number,
    tasks : [String]
});

// taskスキーマ定義
const taskSchema:Schema = new Schema<taskDocument>({
    name : Schema.Types.String,
    status : Schema.Types.Boolean
});


// personモデル作成
const Person: Model<personDocument> = <Model<personDocument>>model('person',personSchema);

// taskモデル作成
const Task: Model<taskDocument> = <Model<taskDocument>>model('task', taskSchema);

// taskモデルのインスタンス
const task = new Task();
task.name = '仕事';
task.status = false;

//モデルのインスタンス 
const person = new Person();
person.name = 'satu';
person.age = 20;

const client = new MongoClient(url, { useNewUrlParser : true });


// client.connect(async(err, client) => {
//     if(err) {
//         console.log(err);
//     }
//     else {
//         await person.save().then(value => {
//             console.log(value);
//         }).catch(err => {
//             console.log(err);
//         })
//     }
//     client.close();
// });

// person.save((err, result) => {
//     if(err){
//         console.log(err);
//     }
//     else {
//         console.log('成功？');
//     }
// });


// taskの追加の処理
function task_add() {
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db('todoDatabase');
            db.collection('task',(err, client) => {
                client.insert(task, (err, result) => {
                    if(err) {
                        console.log(err);
                    }else {
                        console.log("成功");
                    }
                });
            });
        }client.close();
    });
}
// personの追加の処理
function person_add() {
    client.connect((err, client) => {
        if(err) {
            console.log('エラー',err);
        }
        else {
            const db = client.db('todoDatabase');
            db.collection('person',(err, client) => {
                client.insert(person,(err, result) =>{
                    if(err){
                        console.log('エラー',err);
                    }
                    else {
                        console.log("成功");
                    }
                });
            });
        }client.close();
    });
}


// 更新の処理
function taskid_add_Person(){
    client.connect((err, client) => {
        if(err) {
            console.log(err);
        }
        else {
            const db = client.db('todoDatabase');
            db.collection('task',async(err, client) => {
                if(err) {
                    console.log(err);
                }
                else {
                    const doc_task = await client.findOne({name : '仕事'});
                    db.collection('person',async(err, client_person) => {
                        if(err) {
                            console.log(err);
                        }
                        else {
                            console.log(doc_task);
                            await client_person.findOneAndUpdate(
                                {name : "sakamoto"}, 
                                { $push : {tasks : doc_task._id}},
                                {upsert:false}
                                ).then((resolve) => {
                                console.log(resolve);
                            })
                        }
                    });
                }
            });
        }
    });
}
// person_add()
taskid_add_Person();