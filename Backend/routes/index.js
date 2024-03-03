const router = require("express").Router();
const auth = require('./auth');
const data = require('./data');
router.use('/auth', auth);
router.use('/data', data);

module.exports = router;
