const express = require("express");
const morgan = require("morgan");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const homeRoutes = require("./routes/index");
const bookmarkRoutes = require("./routes/bookmark");
const usersRoutes = require("./routes/user");
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
      message: error.message
    }
  });
});

//database connectivity
//for  local connectivity
// mongoose.connect("mongodb://localhost/bookmark", { useNewUrlParser: true });
// console.log(process.env.MONGO_URI, process.env.JWT_SECRET);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const connection = mongoose.connection;
connection.once("open", function() {
  console.log("mongodb connecton established successfully");
});

//server configuration
app.listen(4000);
