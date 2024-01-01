const fs = require("fs");

// File Saving
const saveFile = (req, res, next) => {
  const file = req.files.file;
  const filename = new Date().valueOf() + "_" + file.name;
  file.mv(`./uploads/${filename}`);
  req.body.image = filename;
  next();
};

// Files Saving
const saveFiles = (req, res, next) => {
  const filenames = [];
  const files = req.files.files;
  files.forEach((file) => {
    const filename = new Date().valueOf() + "_" + file.name;
    file.mv(`./uploads/${filename}`);
    filenames.push(filename);
  });
  req.body.images = filenames;
  next();
};

// File Deleting
const deleteFile = async (filename) => {
  await fs.unlinkSync(`./uploads/${filename}`);
};

module.exports = { saveFile, saveFiles, deleteFile };
