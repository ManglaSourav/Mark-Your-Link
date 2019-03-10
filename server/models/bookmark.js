const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Bookmark = new Schema({
  link: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  }
});
module.exports = mongoose.model("Bookmark", Bookmark);
