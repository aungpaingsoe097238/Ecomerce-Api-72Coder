require("dotenv").config();
const express = require("express"),
  app = express(),
  mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://admin:adminpass@cluster0.45swmim.mongodb.net/${process.env.DB_NAME}`
);

app.use(express.json());

const permitRouter = require("./routes/permit");
const roleRouter = require("./routes/role");
const userRouter = require("./routes/user");
const { validateToken, hasAnyRole } = require("./utils/validator");

app.use("/permits", permitRouter);
app.use("/roles", [
  validateToken(),
  hasAnyRole(["Owner", "Manager", "User"]),
  roleRouter,
]);
app.use("/users", userRouter);

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
