const mongoose = require("mongoose");

// Each course from the major that gets stored in the plan
const MajorCourseSchema = new mongoose.Schema(
  {
    code: String,
    name: String,
    credits: Number,
    suggestedTerm: String,
  },
  { _id: false } // don’t need separate _id for each
);

const CommentSchema = new mongoose.Schema({
  authorName: { type: String, default: "Advisor" },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const PlanSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, default: "My Plan" },
  public: { type: Boolean, default: false },

  // existing relation to Course documents (can stay empty for now)
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],

  modified: { type: Date, default: Date.now },
  advisors: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [CommentSchema],

  // store the chosen major + its courses right in the plan
  majorId: { type: String },
  majorName: { type: String },
  majorCourses: [MajorCourseSchema],
  desiredGradTerm: String,   // e.g., "Spring"/"Fall"
  desiredGradYear: Number,   // e.g., 2027
});

const Plan = mongoose.model("Plan", PlanSchema);

module.exports = Plan;

