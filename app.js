require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://admin:adminpass@cluster0.45swmim.mongodb.net/${process.env.DB_NAME}`
);

app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something Broke");
});

app.listen(
  process.env.PORT,
  console.log(`Server is running at ${process.env.PORT}`)
);
