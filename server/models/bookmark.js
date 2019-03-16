const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Bookmark = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
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
