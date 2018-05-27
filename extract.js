var path = require("path");

var extractFilePath = function(url) {
  var fileName = "index.html";
  if (url.length > 1) {
    fileName = url.substring(1);
  }
  console.log("extract url = " + fileName);
  var filePath = path.resolve(__dirname, "app", fileName);
  return filePath;
};
module.exports = extractFilePath;
