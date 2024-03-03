const mongoose = require('mongoose');
const reqString = {
    type: String,
    required: true
}
const reqObject = {
    type: Object,
    required: true
}
const reqBool = {
    type: Boolean,
    required: true
}
const reqNum = {
    type: Number,
    required: true
}
const reqArray = {
    type: Array,
    required: true
}
const gameSchema = mongoose.Schema({
    _id: reqString,
    gamemode: reqString,
    players: [reqObject],
    events: [reqObject],
    actions: [reqObject],
    startTime: reqNum,
    endTime: reqNum
})
module.exports = mongoose.model('games', gameSchema);
