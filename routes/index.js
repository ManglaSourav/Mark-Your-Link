var router = require("express").Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.send("index file");
});



module.exports = router;
