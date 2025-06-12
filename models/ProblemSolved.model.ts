import mongoose from "mongoose";

const problemSolvedSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProblemSolved = mongoose.model("ProblemSolved", problemSolvedSchema);

export default ProblemSolved;
