const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,

    plans: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],

    isAdvisor: { type: Boolean, default: false },
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
