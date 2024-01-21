const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
    let data = Challanges.get(req.query.cid)?.[1];

    if (!data || !req.query.index) return res.status(301).json({ error: 0, message: 'invalid cid', user_interface: { message: 'You need to pass the challange id first' } })
    const image = await data.getImage();
    if (!image) return Challanges.delete(req.query.cid);

    await res.write(image);
    res.end();
});

module.exports = route;