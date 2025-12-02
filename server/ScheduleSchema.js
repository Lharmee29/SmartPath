const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  authorName: { type: String, default: "Advisor" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ScheduleSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'My Plan' },
  public: { type: Boolean, default: false },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  modified: { type: Date, default: Date.now },
  advisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema],  
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

module.exports = Schedule;
