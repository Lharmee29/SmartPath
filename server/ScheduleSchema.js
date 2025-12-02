const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, default: 'My Plan' },
    public: { type: Boolean, default: false },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    modified: {type: Date, default: Date.now},
    advisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
    /**
     * comments list could also be added like this:
     * comments: [{advisor:..., date:...}]
     * ...is entirely different db necessary?
     */
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;

