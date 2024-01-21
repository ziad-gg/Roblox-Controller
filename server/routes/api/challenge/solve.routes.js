const express = require('express');
const route = express.Router();

route.post('/', async (req, res) => {
    const index = req.query.sovId;
    let data = Challanges.get(req.query.cid)?.[1];

    if (!data) return res.status(301).json({ error: 0, message: 'invalid cid', user_interface: { message: 'You need to pass the challange id first' } })
    if (!index || index > 6) return res.status(400).json({ error: 0, message: 'invalid index' });

    const result = await data.answer(+index);

    await res.json(result);

    // if (result.response === 'answered') Challanges.delete(req.query.cid);

    await res.end();
})

module.exports = route;