import mongoose from "mongoose";

const problemInPlaylistSchema = new mongoose.Schema({
  problemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Problem",
    required: true,
    onDelete: "CASCADE",
    unique: true,
  },
  playlistId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Playlist",
    required: true,
    onDelete: "CASCADE",
    unique: true,
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

const ProblemInPlaylist = mongoose.model(
  "ProblemInPlaylist",
  problemInPlaylistSchema
);

export default ProblemInPlaylist;
