# 基于node,vue,mongoose,vuex的全栈论坛架构
所谓全栈工程师已经提出很久了，我在网上竟然搜索不到一套完整的node全栈项目架构，索性就自己来开发一套。

1.先说下思路和使用的主要模块

看项目目录就能看出，首先把项目分为两个目录servers和front_end很明显是服务层和前端层，服务层使用最新的node的koa2框架,数据库使用mongoose，前端层使用了vue2.0和webpack，请把node升级到7+版本，因为项目中大量使用了async和await。

 2.具体细节

（1）服务层，服务器层使用koa2搭建，启动一个localhost:126作为测试服务器，在app.js接入log4.js,路由,并加载所有的actions文件夹里的文件
actions文件夹的文件是用来操作数据库和提供接口输出的，接口都以restfull形式设计。
剩下几个文件夹主要作用如下
database主要用来连接数据库
schema是基于mongoose数据库模型设计
utils主要是工具类

(2)前端层
