#! /usr/bin/env node
var fs = require("fs"),
    path = process.cwd(),
    params = process.argv[2],  //jqpm 参数，已有install， publish， addUser
    moduleName = process.argv[3] || "",
    publisher = require("./publish"),
    installer = require("./install"),
    addUser = require("./addUser");

//保存服务器请求
var serverRequest  = ["http://jqms.dev.cnodejs.net/publish",
    "http://jqms.dev.cnodejs.net/addUser",
    "http://jqms.dev.cnodejs.net/install"];
/*var serverRequest  = ["http://192.168.1.103:8888/publish",
    "http://192.168.1.103:8888/addUser",
    "http://192.168.1.103:8888/install"];*/

    paramsArray = ["publish","install","addUser"];
    if(params == paramsArray[0]){
        publisher.publish(path,moduleName,serverRequest,addUser);
    }
    else if(params == paramsArray[1]){
        installer.install(path,moduleName,serverRequest);
    }
    else if(params == paramsArray[2]){
        addUser.addUser(path,serverRequest);
    }
