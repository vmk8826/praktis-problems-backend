import mongoose from "mongoose";
import { UserRole } from "../utils/enums.utils";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: "https://via.placeholder.com/150",
  },
  problems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Problem",
  },
  role: {
    type: String,
    enum: UserRole,
    default: UserRole.USER,
  },
  submissions: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Submission",
  },
  problemsSolved: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ProblemSolved",
  },
  playlists: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Playlist",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
