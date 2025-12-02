const mongoose = require("mongoose");
//const majors = require('../majors');

const CommentSchema = new mongoose.Schema({
  authorName: { type: String, default: "Advisor" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PlanSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, default: 'My Plan' },
  public: { type: Boolean, default: false },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
  modified: { type: Date, default: Date.now },
  advisors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [CommentSchema],  
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;
