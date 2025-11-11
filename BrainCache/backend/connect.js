const mongoose = require('mongoose');

async function connectToDatabase(url) {
    return  mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
module.exports = connectToDatabase;