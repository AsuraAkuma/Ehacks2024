const mongoose = require('mongoose');
const { mongoPath } = require('./config.json');

module.exports = async () => {
    await mongoose.connect(mongoPath);
    mongoose.set('strictQuery', true);
    return mongoose
}