const checkExtension = (fileName) => {
  const EXTENSIONS = ["txt", "js", "json", "html", "css"];

  const lastDotIndex = fileName.lastIndexOf(".");
  const fileExtension = fileName.slice(lastDotIndex + 1);

  const result = EXTENSIONS.includes(fileExtension);

  return { result, extension: fileExtension };
};

module.exports = checkExtension;
