const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
    plans: [mongoose.Schema.Types.ObjectId]
});

const User = mongoose.model("User", UserSchema);

module.exports = User;