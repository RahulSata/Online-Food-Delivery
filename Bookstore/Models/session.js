var mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
    sessionID: String,
    userID: String,
    userName: String,
});
const Session = mongoose.model("Session", sessionSchema);