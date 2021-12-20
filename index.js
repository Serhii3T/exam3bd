// connection express
const express = require("express");
// connection mogoose
const mongoose = require("mongoose");
// connect dotenv
require("dotenv").config(); // for access process.env
// import cors
const cors = require("cors");

// init app
const app = express();
// create a port on which it will run - since the process.env file is missing, we will use port 5000
const PORT = process.env.PORT || 5000;

// middleware -- for requests
app.use(cors());

// function for intermediate processing (middleware) -- for express read json
app.use(express.json({ extended: true }));
// function for intermediate processing (middleware) -- registration route
app.use("/api/auth", require("./routes/auth.route"));
// -- basket route
app.use("/api/product", require("./routes/product.route"));


// create a function in which we will connect to the database
async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://CoderFire:21212121@cluster0.glzcx.mongodb.net/womenUnderwear?retryWrites=true&w=majority",
      {
        // object with setting > remove errors, warnings
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    // call app
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}
start();
