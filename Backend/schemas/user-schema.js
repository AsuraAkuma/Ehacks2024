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
const userSchema = mongoose.Schema({
    _id: reqString,
    email: reqString,
    username: reqString,
    password: reqString,
    wins: reqNum,
    loses: reqNum,
    xp: reqNum,
    level: reqNum
})
module.exports = mongoose.model('user-info', userSchema);
