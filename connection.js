const mongoose = require('mongoose');

async function connectMongoDB(url) {
    return await mongoose.connect(url)
}

module.exports = { connectMongoDB };

// mongodb+srv://harshitkumar1026:w7rdThvd4nFWB1DY@mongolearning.jqze6ow.mongodb.net/?retryWrites=true&w=majority&appName=mongolearning

// name = harshitkumar1026
// pass = xGFFllZadjApDe8x

// mongodb+srv://harshitkumar1026:<db_password>@mongolearning.jqze6ow.mongodb.net/?retryWrites=true&w=majority&appName=mongolearning