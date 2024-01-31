const express = require('express');
const app = express();
const port = 3000;

function authentication(req, res, next) {
    const authheader = req.headers.authorization;
    console.log(authheader);

    if (authheader === 'Bearer Tokencito') next();
    else {
        res.status(401);
        res.send('Not authenticated!');
    }
}

app.use(express.json());

app.post('/oauth/token', (req, res, next) => {
    const { username, password } = req.body;

    if (username === 'john' && password === '123') {
        res.status(200);
        res.send('Logged in');
    }
});

app.delete('/auth0/api/blocks/ips/:ip', (req, res, next) => {
    authentication(req, res, next);
    res.status(200);
    res.send(`IP ${req.params.ip} has been removed from the blocked list`);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});