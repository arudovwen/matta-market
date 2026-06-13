const fs = require("fs");
const path = require("path");

const directoryPath = path.join(__dirname);

function searchAndReplace(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) return console.log("Unable to scan directory: " + err);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) return console.log(err);
        
        // Skip node_modules and .git
        if (stat.isDirectory() && !filePath.includes("node_modules") && !filePath.includes(".git") && !filePath.includes(".nuxt")) {
          searchAndReplace(filePath);
        } else if (filePath.endsWith(".vue")) {
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return console.log(err);

            // Replace src="~/assets/..." with src="/assets/..." specifically for NuxtImg.
            // Actually, we can just replace src="~/assets/ with src="/assets/ for any NuxtImg tags.
            // Let's use a regex that finds NuxtImg tags and replaces ~/assets/ with /assets/.
            let updatedData = data.replace(/<NuxtImg([^>]*?)src=["']~\/assets\/(.*?)["']/g, '<NuxtImg$1src="/assets/$2"');
            
            if (data !== updatedData) {
              fs.writeFile(filePath, updatedData, "utf8", (err) => {
                if (err) return console.log(err);
                console.log("Updated: " + filePath);
              });
            }
          });
        }
      });
    });
  });
}

searchAndReplace(directoryPath);
