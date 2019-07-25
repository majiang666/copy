![小程序](https://www.love85g.com/wp-content/uploads/2018/12/xcx.jpg)

## 20190716更新npm安装
[react-to-copy](https://www.npmjs.com/package/react-to-copy)  
[vue-to-copy](https://www.npmjs.com/package/vue-to-copy)

# copy
移动端js实现点击复制到剪贴板，【真正】兼容所有浏览器uc、qq、微信、手机自带等浏览器  
http://www.love85g.com/?p=1528

# DEMO 
<pre>
http://www.love85g.com/majiang/copy/index.html
</pre>

前言：在移动端上经常会遇到这样的需求，第一种就是点击复制当前页面的链接，第二种就是类似卡券的功能，需要复制密码等，之前需求太紧急，基本上都使用了clipboard.js  ,使用方法也很简单：（这种办法也会有很多浏览器及机型是不支持的，只能来做降级处理，提示用户去手动复制，但是假如遇到复制卡券这种隐藏值得时候就有问题了，只能在不支持的时候提示及把值再放一遍，用于手动复制，虽然解决了但是还是不完美。）
<pre>
var clipboard = new ClipboardJS('.btn');
clipboard.on('success', function(e) {
    console.info('Action:', e.action);
    console.info('Text:', e.text);
    console.info('Trigger:', e.trigger);

    e.clearSelection();
});
clipboard.on('error', function(e) {
    console.error('Action:', e.action);
    console.error('Trigger:', e.trigger);
});
</pre>
也有比如ZeroClipboard等实现方式。当然了，今天来介绍的是之前在做项目的时候用到的办法，又重新用jquery做了一个插件版的，可以说兼容所有移动端浏览器，自己试了安卓华为自带浏览器、uc浏览器、qq浏览器、iphoneX上的safari浏览器、微信内置浏览器等（假如有不支持的留言告诉我），使用办法也很简单：

# 引入jquery
<pre>
<script src="http://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>
</pre>
# 引入js
<pre>
<script src="http://www.love85g.com/cdn/copy/jquery.copy.min.js"></script>
</pre>
# 使用办法：
<pre>
$.copy({
    imgUrl:"success-tips.png", //分享图标地址
    text:"复制成功", //分享提示文案
    copyUrl:"", //自定义复制链接地址
    tipTime:2000, //分享提示消失时间
    copyId:"#copy"//复制按钮id
});
</pre>
# 扩展：（单页面多个复制功能）
<pre>
var data = [
    {
        "url":"www.baidu.com",
    },
    {
        "url":"www.qq.com",
    },
    {
        "url":"www.163.com",
    }
    ];
 $.each(data,function(i,item){
     # $("body").append('<button id="copy'+i+'">复制链接</button>');
     $.copy({
         imgUrl:"success-tips.png", //分享图标地址
         text:"复制成功", //分享提示文案
         copyUrl:item.url, //自定义复制链接地址
         tipTime:2000, //分享提示消失时间
         copyId:"#copy"+i //复制按钮id
      });
});
</pre>

