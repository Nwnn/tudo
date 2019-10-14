import express, { Request } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './authorize';
import { TodoApp } from './todoapp'

export const api = express.Router();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({extended: true}));
api.use(session({ 
    secret : "https://www.youtube.com/watch?v=nNeOqvtS39c",
    resave : true,
    saveUninitialized : true
}))
api.use(passport.initialize())
api.use(passport.session())


api.post('/signup',async (req, res) => {
    console.log(req.body);
    try {
        const createdUserInfo = await TodoApp.User.createUser(req.body);
        res.send(createdUserInfo);

    } catch (error) {
        res.status(400).send();

    }

});

api.post('/signin', passport.authenticate('local'), (req, res) => {
    if(req.isAuthenticated()){
        res.status(200).send({ name : req.user.username });

    } else {
        res.status(401).send()

    }

})

api.post('/signout', (req, res) => {
    req.logout();
    res.send("signout");

})

api.get('/tasks', async (req, res) => {
    try {
        const userTasks = await TodoApp.Tasks.getTasksByUsername(req.user.username)
        res.send(await userTasks);

    } catch (error) {
        res.status(204).send();
        
    }
    
});

api.post('/tasks/create',async(req, res) => {
    console.log("/create req.body\n",req.body);

    try {
        if(req.isAuthenticated()){
            const author = req.user.username;
            await TodoApp.Tasks.createTask(author, req.body);
            res.send();

        } else {
            res.status(401).send()

        }

    } catch (error) {
        console.log(error)
        res.status(400).send();

    }


});

// 更新
api.post('/tasks/update/:taskId', async(req, res)=> {
    try {
        const taskId: number = req.params.taskId;
        const task = await TodoApp.Tasks.updateTask(taskId, req.body);
        res.send();

    } catch (error) {
        res.status(400).send();
    }


});

// ユーザ情報の取得
api.get('/user', async(req, res) => {
    if(req.isAuthenticated()){
        res.status(200).send({ username : req.user.username });

    } else {
        res.status(401).send()

    }
})

// ユーザごとのタスク取得 
api.get('/users/:username/tasks',async(req, res)=>{
    const username: number = Number(req.params.username);

    try {
        const userTasks = await TodoApp.Tasks.getTasksByUsername(req.user.username)
        res.send(userTasks);

    } catch (error) {
        res.status(204).send(error);

    }

});


