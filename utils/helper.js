const bcrypt = require("bcryptjs");
const Redis = require("async-redis").createClient();
const jwt = require("jsonwebtoken");

module.exports = {
  encode: (payload) => bcrypt.hashSync(payload),
  comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
  format_message: (res, message = "", result = []) =>
    res.status(200).json({
      status: true,
      message: message,
      result: result,
    }),
  set: async (id, value) =>
    await Redis.set(id.toString(), JSON.stringify(value)),
  get: async (id) => JSON.parse(await Redis.get(id.toString())),
  drop: async (id) => await Redis.del(id.toString()),
  makeToken: (payload) =>
    jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1h" }),
};
