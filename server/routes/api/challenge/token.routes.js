const express = require('express');
const route = express.Router();

route.post('/', async (req, res) => {
    console.log(req.query.cid);
    console.log(Challanges)
    let data = Challanges.get(req.query.cid)?.[0];

    if (!data) return res.status(301).json({ error: 0, message: 'invalid cid', user_interface: { message: 'You need to pass the challange id first' } });

    const TokenConfig = await data.continueToken();

    res.json(TokenConfig);
})

module.exports = route;