const userSchema = require('../schemas/user-schema');
const { generateUserId, getName, getRandomInt } = require('../functions');
const router = require('express').Router();
const gameSchema = require('../schemas/game-schema');
const { userIdLength } = require('../config.json');
let slopes = [];

router.get('/startgame', async (req, res) => {
    const { players, gamemode } = req.query;
    let tickTimer;
    let totalTime = 0;
    const id = generateUserId(userIdLength);

    function graphTick() {
        tickTimer = setTimeout(() => {
            slopes[id] = Math.sin(getRandomInt(0, 100) + getRandomInt(0, 100) + 1);
            totalTime += 4;
            if (totalTime === 300 && gamemode === "timed") {
                clearTimeout(tickTimer);
            } else {
                graphTick();
            }
        }, 4000);
    }
    graphTick();
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
    res.send({ success: true, slope: slope });
});

router.get('/slope', async (req, res) => {
    const { gameId } = req.query;
    if (!slopes[id]) {
        res.send({ success: false, msg: "Game not found" })
    }
    res.send({ success: true, slope: slopes[gameId] });
});


module.exports = router;
