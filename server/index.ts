import express from 'express';
import bodyParser from 'body-parser';
import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../nuxt.config';
import { api } from './api';
import { app as dialogFlowApp } from './googlehome';

const app = express();

// restapi Host
app.use('/api', api);

// googleHome Host
app.use(bodyParser.json());
app.post('/fulfillment', dialogFlowApp);

nuxtConfig.dev = !(process.env.NODE_ENV === 'production');

(async() => {
    console.log("build start")
    const nuxt = new Nuxt(nuxtConfig);
    const { host, port } = nuxt.options.server;

    if (nuxtConfig.dev) {
        const builder = new Builder(nuxt);
        await builder.build();

    } else {
        await nuxt.ready();

    }

    app.use(nuxt.render);

    app.listen(port, () => {
        console.log(`Server listening on http://${host}:${port}`);
    
    });

})();
