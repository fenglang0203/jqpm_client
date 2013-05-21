jqpm_z
========

jqpm_z ---- jquery插件管理工具客户端

安装
------------

    安装nodejs环境以后在cmd中执行下面命令可安装客户端
	npm install -g jqpm_z

使用
-----
添加新用户：

	命令行执行：jqpm addUser
    提示输入用户名密码（name&password）
    please enter name and password(name&password):  
发布jquery插件:
    
    进入插件所在目录，打开cmd
	执行:jqpm publish <pluginName>[@version]

安装jquery插件:

    进入插件需安装目录，打开cmd
    jqpm install <pluginName>[@version]

License
-------

MIT 