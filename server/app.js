const express = require('express');
const path = require('path');

const app = express();

const bodyParser = require('body-parser');
const { loadRoutes } = require('./routes/routes-loader.js');

global.Challanges = new Map();

const jsonParser = bodyParser.json({ limit: '50MB' })
const urlencodedParser = bodyParser.urlencoded({ extended: false, limit: '50MB' });

app.use(urlencodedParser);
app.use(jsonParser);

app.use(express.json());

app.get('/', async (req, res) => {
    // Send the HTML file
    res.sendFile(path.join(__dirname, '/pages/index.html'));
});

app.get('/:name', (req, res) => {
    console.log(req.params.name);
    const filePath = path.join(__dirname, 'pages', req.params.name);
    res.sendFile(filePath, { headers: { 'Content-Type': 'text/js' } });
});

loadRoutes(app, 'challenge');
loadRoutes(app, 'users');

app.listen(3000, () => {
    console.log('App is listening to port http://localhost:3000');
});