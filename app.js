require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://admin:adminpass@cluster0.45swmim.mongodb.net/${process.env.DB_NAME}`
);

app.use(express.json());

const permitRouter = require("./routes/permit");

app.use("/permits", permitRouter);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ status : false, message : err.message });
});

app.listen(
  process.env.PORT,
  console.log(`Server is running at ${process.env.PORT}`)
);
