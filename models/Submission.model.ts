import mongoose from "mongoose";
import { Status } from "../utils/enums.utils";

const submissionSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: Status,
    required: true,
  },
  sourceCode: {
    type: JSON,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  stdin: {
    type: String,
  },
  stdout: {
    type: String,
  },
  stderr: {
    type: String,
  },
  compileOutput: {
    type: String,
  },
  memory: {
    type: Number,
  },
  time: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  problem: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
  },
  testCase: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TestCaseResult",
    required: true,
  },
});

const Submission = mongoose.model("Submission", submissionSchema);

export default Submission;
