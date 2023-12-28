module.exports = {
  format_message: (res, message = "", result = []) =>
    res.status(200).json({
      status: true,
      message: message,
      result: result,
    }),
};
