const userSchema = require('../schemas/user-schema');
const { generateUserId, getName, getRandomInt, getResponse } = require('../functions');
const router = require('express').Router();
const gameSchema = require('../schemas/game-schema');
const { userIdLength } = require('../config.json');
let slopes = [];

router.get('/startgame', async (req, res) => {
    const { players, gamemode, id } = req.query;

    const now = new Date().valueOf();
    const future = new Date(now + 300000).valueOf();
    await gameSchema.findOneAndUpdate(
        {
            _id: id
        },
        {
            _id: id,
            gamemode: gamemode,
            players: players.split("-"),
            events: [],
            actions: [],
            startTime: now,
            endTime: future
        },
        {
            upsert: true
        }
    )
    res.send({ success: true });
});

router.get('/slope', async (req, res) => {
    const { gameId } = req.query;
    slopes[gameId.toString()] = Math.sin(getRandomInt(0, 100) + getRandomInt(0, 100) + 1);
    res.send({ success: true, slope: slopes[gameId.toString()] });
});
router.get('/getId', async (req, res) => {
    const id = generateUserId(userIdLength).toString();
    res.send({ success: true, id: id });
});
router.get('/getEvent', async (req, res) => {
    const { gameId } = req.query;
    const eventData = getResponse();
    res.send({ success: true, data: eventData });
});


module.exports = router;
