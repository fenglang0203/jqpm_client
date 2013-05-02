exports.addUser = function addUser(path,serverRequest){
    var http = require('http'),
    fs = require("fs");
    var userName = "";  //用户名
    var passWord = "";  //密码
    var path = process.cwd();
    //console.log("__dirname "+__dirname);
    //var currentPath = __dirname;
    //console.log("addUser: "+path);
    process.stdout.write("please enter name and password(name&password): ");

    process.stdin.resume();
    process.stdin.setEncoding('utf8');

    process.stdin.on('data', function(data) {
        //console.log("1: "+data);
        if(data.indexOf("&") <= -1){
            process.stdout.write("must enter name&password!");
            process.exit(1);
        }
        var info = data.split("&");
        if(info[0] == undefined || info[0] == ""){
            process.stdout.write("must enter name!");
            process.exit(1);
        }
        if(info[1] == undefined || info[1] == ""){
            process.stdout.write("must enter password!");
            process.exit(1);
        }
        userName = info[0];
        passWord = info[1];
        //console.log("name: "+userName);
        //console.log("password: "+passWord);

        //console.log(serverRequest[1]);
        var addUser_url = serverRequest[1] + '?userName=' + userName + "&password=" + passWord;

        http.get(addUser_url, function(res) {
           //console.log(res.statusCode);
            if(res.statusCode == "200"){
                fs.appendFile(__dirname + "\\userinfo.txt", userName + '&' + passWord, function (err) {
                    if (err) console.log(err);
                    console.log("addUser success");
                    process.exit(0);
                });
            }else{
                console.log(res);
                process.exit(1);
            }
        }).on('error', function(e) {
            console.log("Got error: " + e.message);
        });;
    });

}