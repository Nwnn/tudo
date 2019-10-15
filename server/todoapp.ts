import express, { Request } from 'express';
import { UserModel, TaskModel, UserDocument, TaskDocument, Task  } from './db';

export namespace TodoApp {
    interface UserCreateRequest {
        username : string,
        displayName : string,
        password : string

    }

    export class User {
        static async createUser(params: UserCreateRequest){
            // 既に存在するusernameの場合例外を投げる必要がある
            const user = new UserModel();
            for (const key in params) {
                user[key] = params[key];
            }

            const saved = await user.save();
            return {
                username : saved.username,
            }

        }

    }

    interface TaskCreateRequest {
        name : string
        icon : string;
        description : string;
        dueTime : Date;
        
    }

    export class Tasks {
        static async getTasksByUsername(username: string): Promise<any[]> {
            const _id = (await UserModel.findOne({username : username}))!._id;
            const user = (await UserModel.aggregate().lookup({
                from: 'tasks',
                localField: 'username',
                foreignField: 'member',
                as: 'tasks'
            }).match({ _id: _id }))[0];
            
            const tasks = user.tasks;
            return tasks;

        }

        static async createTask(author: string, params: TaskCreateRequest){
            const task = new TaskModel();
            for (const key in params) {
                console.log(key)
                task[key] = params[key];

            }

            task.author = author;

            await task.save();

        }

        static async updateTask(taskId: number, params: Task) {
            const task = await TaskModel.findOne({ taskId: taskId });
            if(task !== null){
                for (const key in params) {
                    console.log(key)
                    task[key] = params[key];
    
                }

                task.updateTime = new Date();

                task.save();

            } else {
                throw new Error(`存在しないタスクId(${ taskId })`);

            }

        }

    }

}
