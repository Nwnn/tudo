import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../nuxt.config';
import { api } from './api';

const app = express();
app.use('/api', api);

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
