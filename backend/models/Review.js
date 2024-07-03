const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  audiobook: { type: mongoose.Schema.Types.ObjectId, ref: "Audiobook" },
  user: String,
  rating: Number,
  comment: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Review", ReviewSchema);
