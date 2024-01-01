require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose"),
  fileupload = require("express-fileupload");

mongoose.connect(
  `mongodb+srv://admin:adminpass@cluster0.45swmim.mongodb.net/${process.env.DB_NAME}`
);

app.use(express.json());
app.use(fileupload());

const permitRouter = require("./routes/permit");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");
const categoryRouter = require("./routes/category");
const subCatRouter = require("./routes/subcat");
// const {
//   validateToken,
//   hasAnyRole,
//   hasAnyPermit,
// } = require("./utils/validator");

app.use("/permits", permitRouter);
app.use("/roles", roleRouter);
app.use("/users", userRouter);
app.use("/cats", categoryRouter);
app.use("/subcats", subCatRouter);

app.use((err, req, res, next) => {
  err.status = err.status || 500;
  res.status(err.status).json({ status: false, message: err.message });
});

const defaultData = async () => {
  let migrator = require("./migrations/migrator");
  // await migrator.migrate();
  // await migrator.roles_permissions_migrate();
  // await migrator.add_owner_role();
  await migrator.backup();
};

defaultData();

app.listen(
  process.env.PORT,
  console.log(`Server is running at ${process.env.PORT}`)
);
