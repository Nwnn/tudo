import express from 'express';
import bodyParser from 'body-parser';
import { api } from './api';
import { app as dialogFlowApp } from './googlehome';

const app = express();
app.use('/api', api);

app.use(bodyParser.json());
app.post('/fulfillment', dialogFlowApp);

(async() => {

    app.listen(80, () => {
        console.log(`Server listening`);
    });

})();
