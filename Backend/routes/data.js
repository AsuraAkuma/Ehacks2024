const userSchema = require('../schemas/user-schema');
const { generateUserId, getName } = require('../functions');
const router = require('express').Router();
const { userIdLength } = require('../config.json');


router.get('/getnames', async (req, res) => {
    const { count } = req.query;
    let names = [];
    for (let i = 0; i < count; i++) {
        names[i] = getName();
    }
    res.send({ names: names });
});
module.exports = router;
