const router = require("express").Router();
const auth = require('./auth');
const data = require('./data');
const ingameEvents = require('./ingame-events');
router.use('/auth', auth);
router.use('/data', data);
router.use('/ingame-events', ingameEvents);

module.exports = router;
