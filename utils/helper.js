const bcrypt = require("bcryptjs");

module.exports = {
  encode: (payload) => bcrypt.hashSync(payload),
  comparePass: (plain, hash) => bcrypt.compareSync(plain, hash),
  format_message: (res, message = "", result = []) =>
    res.status(200).json({
      status: true,
      message: message,
      result: result,
    }),
};
