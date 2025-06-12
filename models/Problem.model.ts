import mongoose from "mongoose";
import { Difficulty } from "../utils/enums.utils";

const problemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: Difficulty,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  examples: {
    type: [JSON],
    required: true,
  },
  constraints: {
    type: [String],
    required: true,
  },
  hints: {
    type: [String],
  },
  editorial: {
    type: String,
  },
  testCases: {
    type: [JSON],
    required: true,
  },
  codeSnippets: {
    type: [JSON],
    required: true,
  },
  referenceSolutions: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  submissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Submission",
  },

  solvedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
  },
  problemPlaylists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ProblemPlaylist",
  },
});
const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
