import mongoose from "mongoose";
import { Status } from "../utils/enums.utils";

const testCaseResultSchema = new mongoose.Schema({
  testCaseId: {
    type: Number,
    required: true,
  },
  submissionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Status,
    required: true,
  },
  passed: {
    type: Boolean,
    required: true,
  },
  stdout: {
    type: String,
  },
  stderr: {
    type: String,
  },
  expected: {
    type: JSON,
  },
  expectedOutput: {
    type: String,
  },
  compilerOutput: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  memory: {
    type: Number,
  },
  time: {
    type: Number,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  submission: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
    onDelete: "CASCADE",
  },
});

const TestCaseResult = mongoose.model("TestCaseResult", testCaseResultSchema);

export default TestCaseResult;
