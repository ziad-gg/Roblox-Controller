const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
    res.send("HELLO USER")
})

module.exports = route;