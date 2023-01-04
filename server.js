// express server with astro middleware as an entrypoint for page serving
import express from 'express';
import isValid from './routes/auth.js';
import { handler as ssrHandler } from './dist/server/entry.mjs';

// setup express with static directory and urlencoded body parser
const app = express();
app.use(express.static('dist/client'));
app.use(express.urlencoded({ extended: true }));

//routes
app.post('/auth', (req, res) => {
    const { email, password } = req.body;
    if (isValid(email, password)) {
        res.status(200).send('ok');
    } else {
        res.status(401).send('unauthorized');
    }
});

// astro middleware for handling all other pages
app.use(ssrHandler);

// start server
app.listen(443, () => {
});