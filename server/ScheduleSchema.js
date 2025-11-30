const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema({
    public: Boolean,
    courses: [mongoose.Schema.Types.ObjectId],
    modified: {type: Date, default: Date.now},
    advisors: [mongoose.Schema.Types.ObjectId],
    comments: [mongoose.Schema.Types.ObjectId]
    /**
     * comments list could also be added like this:
     * comments: [{advisor:..., date:...}]
     * ...is entirely different db necessary?
     */
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;
