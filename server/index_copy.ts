import express from 'express';
import { api } from './api';

const app = express();
app.use('/api', api);

(async() => {


    app.listen(80, () => {
        console.log(`Server listening`);
    });

})();
