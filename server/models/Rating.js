const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingSchema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Events",
    },
    numbre: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = Rating = mongoose.model("Rating", RatingSchema);
