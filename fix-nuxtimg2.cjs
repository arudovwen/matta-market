const fs = require('fs');
const path = require('path');
function searchAndReplace(dir) {
  fs.readdir(dir, (err, files) => {
    if (err) return;
    files.forEach(file => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stat) => {
        if (err) return;
        if (stat.isDirectory() && !filePath.includes('node_modules') && !filePath.includes('.git') && !filePath.includes('.nuxt')) {
          searchAndReplace(filePath);
        } else if (filePath.endsWith('.vue')) {
          fs.readFile(filePath, 'utf8', (err, data) => {
            let updatedData = data.replace(/<NuxtImg([^>]*?)src=["']@\/assets\/(.*?)["']/g, '<NuxtImg$1src="/assets/$2"');
            if (data !== updatedData) {
              fs.writeFile(filePath, updatedData, 'utf8', () => console.log('Updated: ' + filePath));
            }
          });
        }
      });
    });
  });
}
searchAndReplace(process.cwd());
