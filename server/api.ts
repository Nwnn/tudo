import express, { Request } from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './authorize';
import { todoapp, User } from './todoapp'

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



api.post('/signup',async(req, res) => {
    console.log(req.body);
    try {
        if(req.body.password == undefined) {
            throw new Error("パスがない");
            
        }

        const user = await User.createUserFromRequest(req);
        user.userDoc.password = req.body.password;
        user.userDoc.save();
        console.log(user)
        
        res.send(user);

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
    console.log(req.user)
    try {
        const userId = req.user.userId;
        const user = await todoapp.getUser(userId);
        res.send(await user.getTasks());
    } catch (error) {
        res.status(204).send();
        
    }
    
});

api.post('/tasks/create',async(req, res) => {
    console.log("/create req.body\n",req.body);

    try {
        if(req.isAuthenticated()){
            const userId = req.user.userId;
            const user = await todoapp.getUser(userId);
            user.createTaskFromRequest(req);
            res.send();

        } else {
            res.status(401).send()

        }

    } catch (error) {
        res.status(400).send();
    }


});

// 更新
api.post('/tasks/update/:taskId', async(req, res)=> {
    const taskId: number = req.body.taskId;
    const task = await todoapp.getTask(taskId);
    task.update(req.body)
    res.send()

});

// ユーザごとのタスク取得 
api.get('/users/:username/tasks',async(req, res)=>{
    const username: number = Number(req.params.username);
    // const userId = undefined;
    try {
        const user = await todoapp.getUser(username);
        res.send(await user.getTasks());
    } catch (error) {
        res.status(204).send(error);
    }

});

// チェック
// api.put('/check',async(req, res)=> {
//     console.log(req.body);
//     const taskId: number = req.body.taskId;
//     const task = await todoapp.getTask(taskId);
//     try {
//         task.switchStatus();
//         res.send();
//     } catch (error) {
//         res.status(400).send(error);
//     }
// });


