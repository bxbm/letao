# 乐淘电商项目学习

移动前台体验地址：http://47.100.203.109:3000/m/   

- 用户名：guilaoqi
- 密码：111111

pc后台体验地址：http://47.100.203.109:3000/admin/

- 用户名：root
- 密码：123456

## 移动端：

#### 技术：

- 前端ui框架：mui
- css预处理：less
- dom操作库：zepto.js
- 模板引擎：artTemplate
- 图标字体库：font awesome
- 其他：图片懒加载：mui.lazyload

#### 结构：

│  cart.html    购物车页面（加入购物车的内容展示，编辑购物车内容、价格计算）   
│  category.html   商品分类页面（运动馆、女士馆。。。）   
│  index.html   主页面（轮播图+商品分类+商品展示）   
│  product.html  商品详情页（单个商品图片轮播、尺码及数量选择、加入购物车）   
│  search.html  搜索页（搜索记录）   
│  searchList.html 搜索结果页（搜索结果排序）   
│     
├─assets   引用的外部资源目录   
│  ├─artTemplate   模板引擎   
│  │      xxx.js   
│  │         
│  ├─fa    字体文件   
│  │  ├─css   
│  │  │      font-awesome.css   
│  │  │      font-awesome.min.css   
│  │  │         
│  │  └─fonts   
│  │          fontawesome-webfont.eot   
│  │          fontawesome-webfont.svg   
│  │          fontawesome-webfont.ttf   
│  │          fontawesome-webfont.woff   
│  │          fontawesome-webfont.woff2   
│  │          FontAwesome.otf   
│  │             
│  ├─mui        UI模板   
│  │  ├─css   
│  │  │      mui.css   
│  │  │      mui.min.css   
│  │  │      mui.picker.css   
│  │  │      mui.poppicker.css   
│  │  │         
│  │  ├─fonts   
│  │  │      mui.ttf   
│  │  │         
│  │  └─js   
│  │          mui.js   
│  │          mui.lazyload.img.js   
│  │          mui.lazyload.js   
│  │          mui.min.js   
│  │             
│  └─zepto       dom操作库（相当于轻量级jq）   
│          zepto.min.js   
│             
├─images     图片文件   
│     xxx.jpg   
│         
├─js              各页面的js文件   
│      address.js   
│      addressManage.js   
│      cart.js   
│      category.js   
│      citydata.js   
│      common.js   
│      index.js   
│      login.js   
│      password.js   
│      product.js   
│      register.js   
│      search.js   
│      searchList.js   
│      u_index.js   
│         
├─less           页面样式文件   
│  │  xxx.css   
│  │  xxx.less   
│  │     
│  └─xxx   
│         container.css   
│         container.less   
│         header.less   
│                       
└─user         用户页面   
        address.html          地址管理   
        addressManage.html     新增收货地址   
        index.html     用户主页面   
        login.html   登录页   
        password.html  修改密码页   
        register.html  注册页   

   

## 后台的前端页面   

#### 技术   

- ui库：bootstrap（响应式布局）   
- 分页插件：bootstrap-paginator   
- 表单校验：bootstrap-validator   
- 图表展示：echarts   
- js库：jquery   
- 进度条插件：nprogress   
  
#### 结构   

│  categoryFirst.html           一级分类目录   
│  categorySecond.html    二级分类目录   
│  index.html        主页   
│  login.html       登录页      
│  productManage.html    商品管理页（编辑、添加、删除）      
│  userManage.html    用户管理      
│        
├─assets         引用的外部资源   
│  ├─artTemplate        模板引擎      
│  │      template-debug.js      
│  │      template-native-debug.js   
│  │      template-native.js   
│  │      template.js      
│  │         
│  ├─bootstrap     响应式UI库   
│  │  ├─css   
│  │  │      bootstrap.css   
│  │  │         
│  │  ├─fonts   
│  │  │      glyphicons-halflings-regular.eot   
│  │  │      glyphicons-halflings-regular.svg   
│  │  │      glyphicons-halflings-regular.ttf   
│  │  │      glyphicons-halflings-regular.woff   
│  │  │      glyphicons-halflings-regular.woff2   
│  │  │         
│  │  └─js   
│  │          bootstrap.js   
│  │          bootstrap.min.js   
│  │          npm.js   
│  │             
│  ├─bootstrap-paginator        分页   
│  │      bootstrap-paginator.js   
│  │      bootstrap-paginator.min.js   
│  │         
│  ├─bootstrap-validator     表单校验   
│  │  ├─css   
│  │  │      bootstrapValidator.css   
│  │  │      bootstrapValidator.min.css   
│  │  │         
│  │  └─js   
│  │      │  bootstrapValidator.js   
│  │      │  bootstrapValidator.min.js   
│  │      │     
│  │      └─language   
│  │              ar_MA.js   
│  │              be_NL.js   
│  │              bg_BG.js   
│  │                 
│  ├─echarts           基于canvans的图表插件   
│  │      echarts.common.min.js   
│  │      echarts.min.js   
│  │      echarts.simple.min.js   
│  │         
│  ├─jquery      js库      
│  │      jquery.js      
│  │      jquery.min.js      
│  │         
│  ├─jquery-fileupload        文件上传插件      
│  │      jquery.fileupload.js      
│  │      jquery.iframe-transport.js      
│  │      jquery.ui.widget.js      
│  │         
│  └─nprogress     进度条插件      
│          nprogress.css      
│          nprogress.js      
│             
├─css           样式文件      
│      admin.css      
│         

├─images         图文件     
│      default.png     
│      none.png        
│         
└─js          各页面js文件         
        admin.js   
        categoryFirst.js   
        categorySecond.js   
        index.js   
        login.js   
        produManage.js   
        userManage.js   



