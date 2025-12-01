const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
    advisor: mongoose.Schema.Types.ObjectId,
    date: { type: Date, default: Date.now },
    text: String,
    resolved: Boolean
});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;