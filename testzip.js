var zip = new require('node-zip')();
fs = require("fs");


zip.file("test.js", "consolo.log");
var bufferData = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync("uu.zip", bufferData, 'binary');

zip.file("aa/test.js", "consolo.log");
var bufferData = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync("uu.zip", bufferData, 'binary');

zip.file("/ea/test.js", "consolo.log");
var bufferData = zip.generate({base64:false,compression:'DEFLATE'});
fs.writeFileSync("uu.zip", bufferData, 'binary');