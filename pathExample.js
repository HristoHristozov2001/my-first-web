var path = require('path');
var currentDirectory = __dirname;
console.log('Current directory:', currentDirectory);

var viewPath = path.join(currentDirectory, 'views');
console.log('\nView path:', viewPath);

var configFilePath = path.join(currentDirectory, 'config', 'config.json');
console.log('\nJoin file:', configFilePath);

var baseName = path.basename(configFilePath);
console.log('\nBase name: ', baseName);

var extName = path.extname(configFilePath);
console.log('\nExt Name: ',extName);

var dirName = path.dirname(configFilePath);
console.log('\nDir Name: ',dirName);

var absolutePath = path.resolve('folder1', 'folder2', 'file.txt');
console.log('\nAbsolute path: ', absolutePath);