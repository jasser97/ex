const express = require("express");
const router = express.Router();

const Rating = require("../../models/Rating");

const auth = require("../../config/auth");

router.post("/addRating", auth, (req, res) => {
  const rating = new Rating(req.body);
  rating.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    return res.status(200).json({ success: true });
  });
});

router.post("/RatingNumber", auth, (req, res) => {
  Rating.find({ eventId: req.body.eventId }).exec((err, RatingNumber) => {
    if (err) return res.status(400).send(err);

    res.status(200).json({
      success: true,
      rating: RatingNumber,
      RatingNumber: RatingNumber.length,
    });
  });
});

router.post("/getRating", auth, (req, res) => {
  Rating.find({
    eventId: req.body.eventId,
    userId: req.body.userId,
  }).exec((err, rating) => {
    if (err) return res.status(400).send(err);

    let result = false;
    if (rating.length !== 0) {
      result = true;
    }

    res.status(200).json({ success: true, rating: result });
  });
});

module.exports = router;
