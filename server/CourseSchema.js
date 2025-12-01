const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    name: String,
    updated: {type: Date, default: Date.now},
    semestersOffered: {
        fall: Boolean,
        winter: Boolean,
        spring: Boolean,
        summer: Boolean,
    },
    prereqs: [mongoose.Schema.Types.ObjectId]
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;