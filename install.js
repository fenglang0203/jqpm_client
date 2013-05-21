exports.install = function install(path,moduleName,serverRequest){
    console.log("install");
    var fs = require("fs"),
        url = require('url'),
        http = require('http'),
        //fstream = require("fstream"),
        unzip = require("unzip");

    //下载文件
    //console.log(serverRequest[2]);
    var file_url = serverRequest[2] + '?fileName=' + moduleName;
    //console.log(url.parse(file_url).port);
/*    var options = {
        host: 'localhost',
        port: url.parse(file_url).port,
        path: url.parse(file_url).pathname
    };
    console.log(moduleName);*/

    var file_name = moduleName + ".zip";
    var file = fs.createWriteStream(file_name);
    console.log("getPath: "+ file_url);
    http.get(file_url, function(res) {
        console.log(res.statusCode);
        res.on('data', function(data) {
            file.write(data);
        }).on('end', function() {
            file.end();
            //解压到本地目录jquery_modules    ---这里几个zip解压的插件都不能用，fuck，就先只能下载以后自行解压了
            //fs.createReadStream(file_name).pipe(unzip.Extract({ path: './' }));
/*            var readStream = fs.createReadStream('./' + file_name);
            var writeStream = fstream.Writer('./');

            readStream
                .pipe(unzip.Parse())
                .pipe(writeStream)*/
/*            fs.createReadStream('./' + file_name)
                .pipe(unzip.Parse())
                .on('entry', function (entry) {
                    var fileName = entry.path;
                    var type = entry.type; // 'Directory' or 'File'
                    var size = entry.size;
                    if (fileName === "this IS the file I'm looking for") {
                        entry.pipe(fs.createWriteStream('./'));
                    } else {
                        entry.autodrain();
                    }
                });*/
            //删除压缩文件
            //fs.unlinkSync(file_name);
        });
    }).on('error', function(e) {
            console.log("Got error: " + e.message);
    });;
}