require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
}); // Config environment

const express = require("express"); //import express
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require('./middlewares/errorHandler/errorHandler');
const images = require('./routes/flickrPublicImageRoute');

const app = express(); //create express app

app.use(cors()); // enable cors
app.use(errorHandler);
/* Enable req.body */
app.use(express.json()); // Enable req.body JSON
// Enable url-encoded
app.use(
  express.urlencoded({
    extended: true,
  })
);


if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
  app.use(morgan("dev"));
} else {
  // create a write stream (in append mode)
  let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "access.log"),
    {
      flags: "a",
    }
  );
  // setup the logger
  app.use(morgan("combined", { stream: accessLogStream }));
}

//IMPORT ROUTES===============================
// app.get("/",(req, res) => {
//   res.send('HELLO WORLD')
// })


app.use("/images", images);


/* If routes not found */
app.all("*", (req, res, next) => {
  try {
    next({ message: "Endpoint not Found", statusCode: 404 });
  } catch (error) {
    next(error);
  }
});

console.log('ENVIRONTMENT', process.env.NODE_ENV);
//=============================================

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;





