const fs = require("fs/promises");
const path = require("path");
const chalk = require("chalk");
var basename = require("basename");
const extName = require("ext-name");

const dataValidator = require("./helpers/dataValidator");
const checkExtension = require("./helpers/checkExtension");

// Створити файл "fileName" (вказати розщирення) з вмістом "content"
const createFile = async (fileName, content) => {
  const file = { fileName, content };

  const { error } = dataValidator(file);
  // console.log(error.details);
  if (error) {
    console.log(
      chalk.red(`Please specify ${error.details[0].path} parameter!`)
    );
    return;
  }

  // Перевірка розширення файлу (extension)
  // Повертає об'єкт - { result, extension }
  // де result - true/false залежно від того, чи є введене розширення в масиві дозволених
  const { result, extension } = checkExtension(fileName);

  if (!result) {
    console.log(
      chalk.red(
        `Sorry this application doesn't support files with ${extension} extansion!`
      )
    );
    return;
  }

  try {
    const filePath = path.join(__dirname, "files", fileName);
    await fs.writeFile(filePath, content, "utf-8");
    console.log(chalk.green("File was created successfully."));
  } catch (error) {
    console.log(error);
  }
};

// Прочитати вміст папки files
const getFiles = async () => {
  const folderPath = path.join(__dirname, "files");
  const result = await fs.readdir(folderPath); // readdir - прочитати вміст папки

  if (result.length === 0) {
    console.log(chalk.red("There are no files in this folder!"));
  } else {
    console.log(result);
  }
};

// Для переданого файлу "fileName" з папки files вивести об'єкт - {name, extension, content}
const getInfo = async (fileName) => {
  const folderPath = path.join(__dirname, "files");
  const folderСontent = await fs.readdir(folderPath);
  const isFile = folderСontent.includes(fileName);
  if (!isFile) {
    console.log(chalk.red("This file was not found!"));
    return;
  }
  const filePath = path.join(__dirname, "files", fileName);
  const content = await fs.readFile(filePath, "utf-8");

  const name = basename(filePath);

  const extensionArray = extName(fileName);
  // console.log(extensionArray);
  const extension = extensionArray[0].ext;

  const resultObj = {
    name,
    extension,
    content,
  };
  console.log(resultObj);
};

module.exports = { createFile, getFiles, getInfo };
