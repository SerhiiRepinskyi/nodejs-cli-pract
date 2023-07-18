// index.js
const argv = require("yargs").argv;
const { createFile } = require("./files");


// TODO: рефакторити
function invokeAction({ action, fileName, content }) {
  switch (action) {
    case "create":
      createFile(fileName, content);
      break;

    case "":
      // ... name email phone
      break;

    case "":
      // ... id
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
