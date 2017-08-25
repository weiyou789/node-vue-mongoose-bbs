# 基于node,vue,mongoose,vuex的全栈论坛架构
所谓全栈工程师已经提出很久了，我在网上竟然搜索不到一套完整的node全栈项目架构，索性就自己来开发一套。

1.先说下思路和使用的主要模块

看项目目录就能看出，首先把项目分为两个目录servers和front_end很明显是服务层和前端层，服务层使用最新的node的koa2框架,数据库使用mongoose，前端层使用了
vue2.0和webpack，请把node升级到7+版本，因为项目中大量使用了async和await。

2.具体细节

（1）服务层，服务器层使用koa2搭建，启动一个localhost:126作为测试服务器，在app.js接入log4.js,路由,并加载所有的actions文件夹里的文件,actions文件夹

的文件是用来操作数据库和提供接口输出的，接口都以restfull形式设计。

剩下几个文件夹主要作用如下

database主要用来连接数据库

schema是基于mongoose数据库模型设计

utils主要是工具类

（2）前端层

前端层具体没什么好讲的，用过vue-cli都知道是个啥，但是里面有几点需要注意

1.因为涉及到注册，登录功能所以就会涉及到持久化登录和权限问题，我这里主要采用两层防护，首先是在vuex里设置一个token并且写入到localStorage中，在路由进入时验证localStorage里的token。还有就是在服务层使用axios对请求进行统一拦截，在请求头中加入token，当客户端发出请求时验证请求头的token

2.自己增加了一个views文件夹，里面专门用来放页面组件。
