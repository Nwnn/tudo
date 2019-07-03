import express from 'express';
import bodyParser from 'body-parser';

export const api = express.Router();
api.use(bodyParser.json());


api.get('/', (req, res) => {
    res.send({
        name : "作業",
        time : new Date(),

    });

});