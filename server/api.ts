import express from 'express';
import bodyParser from 'body-parser';

export const api = express.Router();
api.use(bodyParser.json());



api.get('/', (req, res) => {
    res.send([
        
    {
        id : 0,
        name : "作業A",
        time : new Date(),
        dueTime : new Date(),
        icon : '',
        isComplete : false

    },

    {
        id : 1,
        name : "作業B",
        time : new Date(),
        dueTime : new Date(),
        icon : '',
        isComplete : false

    },

    ]);

});