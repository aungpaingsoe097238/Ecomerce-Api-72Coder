const bcrypt = require("bcryptjs");

module.exports = {
  encode: (payload) => bcrypt.hashSync(payload),
  format_message: (res, message = "", result = []) =>
    res.status(200).json({
      status: true,
      message: message,
      result: result,
    }),
};
