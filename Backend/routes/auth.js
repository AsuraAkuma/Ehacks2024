const userSchema = require('../schemas/user-schema');
const { generateUserId } = require('../functions');
const router = require('express').Router();
const { userIdLength } = require('../config.json');

router.get('/register', async (req, res) => {
    try {
        const { username, email, password } = req.query;
        const result = await userSchema.findOne({ email: email });
        if (result) {
            throw new Error("Email already used");
        } else {
            let id = generateUserId(userIdLength);
            const userList = await userSchema.find();
            if (userList.length > 0) {
                while (userList.find(a => a._id === id)) {
                    id = generateUserId(userIdLength);
                };
            }
            await userSchema.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    _id: id,
                    email: email,
                    username: username,
                    password: password
                },
                {
                    upsert: true
                }
            );
            const userObj = {
                _id: id,
                email: email,
                username: username,
                password: password
            }
            res.send({ success: true, msg: "success", user: userObj });
        };
    } catch (error) {
        res.send({ success: false, msg: error.message });
    };
});
router.get('/login', async (req, res) => {
    try {
        const { email, password } = req.query;
        const result = await userSchema.findOne({ email: email });
        if (result) {
            if (result.password === password) {
                res.status(200).send({ success: true, msg: "success", user: result });
            } else {
                throw new Error("Wrong password");
            }
        } else {
            throw new Error("Account does not exist.");
        };
    } catch (error) {
        res.send({ success: false, msg: error });
    };
});
router.get('/ping', async (req, res) => {
    res.send({ msg: "pong" });
});

router.get('/discord', async (req, res) => {
    try {
        const { id, email, username } = req.query;
        console.log(username)
        const result = await userSchema.findOne({ email: email });
        if (result) {
            res.status(200).send({ success: true, msg: "success" });
        } else {
            await userSchema.findOneAndUpdate(
                {
                    _id: id
                },
                {
                    _id: id,
                    email: email,
                    username: username,
                    wins: 0,
                    loses: 0,
                    xp: 0,
                    level: 0
                },
                {
                    upsert: true
                }
            );
            res.status(200).send({ success: true, msg: "success" });
        };
    } catch (error) {
        res.send({ success: false, msg: error });
    };
});
module.exports = router;
