const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
const homeRoutes = require("./routes/index");
const bookmarkRoutes = require("./routes/bookmark");
const usersRoutes = require("./routes/user");
const keys = require("./config/keys");
// var proces = require("nodemon.json");
app = express();

// Middlewares

//for logging everthing
app.use(morgan("dev"));

//parsing the incoming request object into json format
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//allow cross origin resource sharing
// app.use(cors());
const corsOptions = {
  exposedHeaders: "Authorization"
};

app.use(cors(corsOptions));

//to handle routes
app.use("/", homeRoutes);
app.use("/bookmark", bookmarkRoutes);
app.use("/users", usersRoutes);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "..",  "client", "build", "index.html"));
  });
}
// console.log(path.resolve(express.static("client/build")))

//handle errors when page is not found or specified request is not handled
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error); //this will now forwards this error request
});
//this handle all kind of errors
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.messageenv
    }
  });
});

//database connectivity
//for  local connectivity
// mongoose.connect("mongodb://localhost/test", { useNewUrlParser: true });
// console.log(process.env.MONGO_URI, process.env.JWT_SECRET);

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("mongodb connecton established successfully");
});

//server configuration
app.listen(4000);
