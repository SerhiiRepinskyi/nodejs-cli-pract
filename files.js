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

  const { result, extension } = checkExtension(fileName);

  if (!result) {
    console.log(
      chalk.red(
        `sorry this app does not support files with ${extension} extansion`
      )
    );
    return;
  }

  try {
    const filePath = path.join(__dirname, "files", fileName);
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green(`file was created succsesful`));
  } catch (error) {
    console.log(error);
  }
};

const getFiles = async () => {
  const filePath = path.join(__dirname, "files");
  const res = await fs.readdir(filePath);

  if (res.length === 0) {
    console.log(chalk.red(`There is no files in a dir`));
  } else {
    console.log(res);
  }
};

const getInfo = async (fileName) => {
  const filePath = path.join(__dirname, "files");
  const res = await fs.readdir(filePath);
  const isFile = res.includes(fileName);
  if (!isFile) {
    console.log(chalk.red(`There is no files`));
    return;
  }

  const pathFile = path.join(__dirname, "files", fileName);
  const result = await fs.readFile(pathFile, "utf-8");
  console.log(result);
};

module.exports = { createFile, getFiles, getInfo };
//  Вывести обьект с тремя свойствами name, extension, content extName BaseName
