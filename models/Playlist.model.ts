import mongoose from "mongoose";

const playlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  problems: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Problem",
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
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
