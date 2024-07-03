const mongoose = require("mongoose");

const AudiobookSchema = new mongoose.Schema({
  title: String,
  author: String,
  coverImage: String,
  description: String,
  genre: String,
  rating: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

// Virtual field to calculate average rating
AudiobookSchema.virtual("averageRating").get(function () {
  if (this.reviews.length === 0) return 0;
  const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return total / this.reviews.length;
});

module.exports = mongoose.model("Audiobook", AudiobookSchema);
