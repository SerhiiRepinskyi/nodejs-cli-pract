const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

const createFile = async (fileName, content) => {
  const file = { fileName, content };

  const { error } = dataValidator(file);
  // console.log(error.details);

  if (error) {
    console.log(chalk.red(`Please spesifi ${error.details[0].path} parametr`));
    return;
  }

  const result = checkExtension(fileName);
  console.log(result);
};

module.exports = { createFile };
