exports.publish = function publish(path,moduleName,serverRequest,addUser){
    var fs = require("fs"),
        pathSys = require("path"),
        zip = new require('node-zip')(),
        poster = require('poster');
    var zipnew = require("node-native-zip");
    var archive = new zipnew();
    /**
     * 压缩数据文件
     * @param filePath
     * @param encoding
     */
    function addDataToZip(filePath,encoding){
        filePath = pathSys.normalize("./"+ filePath);
        //console.log("addData: "+filePath);
        var data = fs.readFileSync(filePath);
        zip.file(filePath.replace("/\\/g","/"), data);
        if(filePath.indexOf("README.md") > -1){
            readMe = data;
        }
        var bufferData = zip.generate({base64:false,compression:'DEFLATE'});
        fs.writeFileSync(moduleName, bufferData, 'binary');
    }
    /**
     * 获取路径下所有的文件
     * @param path
     * @param dir
     */
    function getFile(path,dir){
        var files = fs.readdirSync(path);
        for(var i = 0; i < files.length; i += 1){
            // console.log(files[i]);
            var stats = fs.lstatSync(path + "\\" + files[i]);
            // 目录
            if (stats.isDirectory()) {
                arguments.callee(path + "\\" + files[i],dir + "\\" + files[i]);
            }else{  //文件
                filesZip[files[i]] = dir + "\\" + files[i];
            }
        }
    }
    var userName = "";
    //读取用户名密码
    var  userData = fs.readFileSync(__dirname + "\\userinfo.txt",'utf-8');
    if(userData == undefined || userData == "" || userData.split("&")[0] == undefined || userData.split("&")[0] == ""){
        console.log("You must first addUser(jqpm addUser)");
        process.exit(1);
        return;
    }else{
        userName = userData.split("&")[0];
    }
    var readMe = "";
    //保存目录下的待压缩的文件名和相对路径
    var filesZip = {};
    fs.exists('./README.md', function (exists) {
         if(exists){
             //var readMe = fs.readFile('./README.md', "utf-8");
             fs.readFile('./README.md',"utf-8", function (err, data) {
                 if (err) throw err;
                 readMe += data;
                 publishHttp();
             });
         }else{
             publishHttp();
         }
    });
    //console.log("ress: " + readMe);
    function publishHttp(){
        if(moduleName == ""){
            moduleName = path.substr(path.lastIndexOf("\\") + 1) + ".zip";
        }else{
            moduleName = moduleName + ".zip";
        }
        getFile(path,'');
        //将文件压缩保存
        var fileArray = [];
        for(var fileName in filesZip){
            //addDataToZip(filesZip[fileName],'binary');
            filePath = pathSys.normalize("./"+ filesZip[fileName]);
            fileArray.push({name:filesZip[fileName],path:filePath});
        }
        console.log("d: "+fileArray);

        archive.addFiles(fileArray, function (err) {
            if (err) return console.log("err while adding files", err);

            var buff = archive.toBuffer();

            fs.writeFile(moduleName, buff, function () {
                var options = {
                    uploadUrl: serverRequest[0],
                    method: 'POST',
                    fileId: path + "\\" + moduleName,
                    fields: {
                        'fileName': moduleName,
                        'readMe': readMe,
                        'userName':userName
                    }
                };
                poster.post(path + "\\" + moduleName, options, function(err, data) {
                    if (!err) {
                        console.log(data);
                        //删除上传后的zip临时文件
                        fs.unlinkSync(moduleName);
                    }else{
                        console.log(err);
                    }
                });
            });
        });
    }


}