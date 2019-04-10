const express = require("express");
const router = express.Router();
const Bookmark = require("../models/bookmark");
const User = require("../models/user");
const _ = require("lodash");

router.get("/", async function(req, res, next) {
  const user = User.findByToken(req.query.token);
  //{ "_id": user._conditions._id}<-- put this is in find for user._id key
  await Bookmark.find({ user: user._conditions._id},function(err, bookmark) {
    if (err) {
      console.log(err);
    } else {
      // console.log(bookmark);
      
      res.json(bookmark);
    }
  });
});

router.post("/add", function(req, res) {
  console.log(req.data);
  
  const user = User.findByToken(req.body.token);
  const data = _.pick(req.body, ["link", "description", "category"]);
  data["user"] = user._conditions._id;
  // console.log(data);
  let bookmark = new Bookmark(data);
  bookmark
    .save()
    .then(bookmark => {
      res.status(200).json({ todo: "bookmark added successfully" });
    })
    .catch(err => {
      res.status(400).send("adding new bookmark failed");
    });
});

module.exports = router;
