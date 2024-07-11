const fs = require("fs-extra");
const path = require("path");

const sourceDir = path.resolve(__dirname, "../server/src/assets");
const destDir = path.resolve(__dirname, "./dist/assets");

fs.copy(sourceDir, destDir, (err) => {
  if (err) {
    console.error("Error copying assets:", err);
  } else {
    console.log("Assets copied successfully!");
  }
});
