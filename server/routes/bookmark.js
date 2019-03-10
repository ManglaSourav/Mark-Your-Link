const express = require("express");
const router = express.Router();
const Bookmark = require("../models/bookmark");

router.get("/", async function(req, res, next) {
  await Bookmark.find(function(err, bookmark) {
    if (err) {
      console.log(err);
    } else {
      res.json(bookmark);
    }
  });
});

router.post("/add", function(req, res) {
  let bookmark = new Bookmark(req.body);
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
