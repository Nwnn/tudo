import express from 'express';
import { api } from './api';
import { alexaExpressAdapter } from "./alexa"

const app = express();
app.use('/api', api);
app.post('/alexa', alexaExpressAdapter.getRequestHandlers());

(async() => {


    app.listen(80, () => {
        console.log(`Server listening`);
    });

})();
