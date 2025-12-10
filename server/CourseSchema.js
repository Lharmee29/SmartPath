const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    code: String,
    name: String,
    updated: {type: Date, default: Date.now},
    credits: Number,
    semestersOffered: {
        fall: Boolean,
        winter: Boolean,
        spring: Boolean,
        summer: Boolean,
    },
    prereqs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }]
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;