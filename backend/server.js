const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Audiobook = require("./models/Audiobook");
const Review = require("./models/Review");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://146.56.51.1:27017/audiobook-app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/audiobooks", async (req, res) => {
  const { genre, author, sort } = req.query;
  let filter = {};
  let sortOption = {};

  if (genre) {
    filter.genre = genre;
  }
  if (author) {
    filter.author = author
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  if (sort === "rating") {
    sortOption = { rating: -1 }; // Sort by the rating field
  } else if (sort === "title") {
    sortOption = { title: 1 };
  } else if (sort === "author") {
    sortOption = { author: 1 };
  }

  const audiobooks = await Audiobook.aggregate([
    { $match: filter },
    {
      $lookup: {
        from: "reviews",
        localField: "reviews",
        foreignField: "_id",
        as: "reviews",
      },
    },
    {
      $addFields: {
        averageRating: { $avg: "$reviews.rating" },
      },
    },
  ]);

  // Update each audiobook with the calculated average rating
  for (const audiobook of audiobooks) {
    await Audiobook.findByIdAndUpdate(audiobook._id, {
      rating: audiobook.averageRating,
    });
  }

  // Fetch updated audiobooks with the new rating field
  const updatedAudiobooks = await Audiobook.find(filter)
    .sort(sortOption)
    .populate("reviews");

  res.json(updatedAudiobooks);
});

app.get("/audiobooks/:id", async (req, res) => {
  const audiobook = await Audiobook.findById(req.params.id).populate("reviews");
  res.json({
    ...audiobook.toObject(),
    averageRating: audiobook.averageRating,
  });
});

app.post("/audiobooks/:id/reviews", async (req, res) => {
  const { user, rating, comment } = req.body;
  const review = new Review({
    audiobook: req.params.id,
    user,
    rating,
    comment,
  });
  await review.save();

  const audiobook = await Audiobook.findById(req.params.id);
  audiobook.reviews.push(review);
  await audiobook.save();

  // Update the rating field with the new average rating
  const updatedAudiobook = await Audiobook.findById(audiobook._id).populate(
    "reviews"
  );
  const averageRating =
    updatedAudiobook.reviews.reduce((sum, review) => sum + review.rating, 0) /
    updatedAudiobook.reviews.length;
  await Audiobook.findByIdAndUpdate(audiobook._id, { rating: averageRating });

  res.json(review);
});

app.listen(1000, () => {
  console.log("Server running on port 1000");
});
