import express from 'express';
import { Nuxt, Builder } from 'nuxt';
import nuxtConfig from '../nuxt.config';
import { api } from './api';
import greenlockExpress from 'greenlock-express';
import { EMAIL } from './conf'

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

    greenlockExpress.create({
        email: EMAIL, // The email address of the ACME user / hosting provider
        agreeTos: true, // You must accept the ToS as the host which handles the certs
        configDir: "~/.config/acme/", // Writable directory where certs will be saved
        communityMember: true, // Join the community to get notified of important updates
        telemetry: true, // Contribute telemetry data to the project
 
        // Using your express app:
        // simply export it as-is, then include it here
        app: app
 
        //, debug: true
    }).listen(8080,4433)

})();
