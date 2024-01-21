const express = require('express');
const route = express.Router();

const login = require('../../../../login');

route.post('/', async (req, res) => {
    const data = await Challanges.get(req.query.cid);

    console.log(req.query.cid)

    if (data) {
        res.json({ ...data[1], new: false })
    } else {
        const [Solver, Challange] = await login();

        Challanges.set(Challange.data.challengeID, [Solver, Challange]);
        res.json({ ...Challange, new: true });
    };

    res.end();
});

module.exports = route;