;(function($){
	var defaults = {
		imgUrl:"",//分享图标
		text:"复制成功",//分享提示文案
		content:"",//自定义复制链接地址
		tipTime:2000,//分享提示消失时间
		tip:true//是否显示提示
	};
	$.extend({
		copy:function(option){
			var options = $.extend({},defaults,option);
			var content = options.content == "" ? "请配置复制内容" : options.content;
			var IMG = options.imgUrl == "" ? "" : '<img style="width: 22px;" src="'+options.imgUrl+'">';
			var TIP = options.tip;
			var tipsHtml = '<div id="share-tips" style="position: fixed;top: 50%;left:50%;background: rgba(0,0,0,.5);border-radius: 4px;margin: 0 auto;color: #fff;z-index: 9999;padding: 5px 10px;font-size: 14px;text-align: center;transform: translate(-50%,-50%);">'+
		        IMG+
		        '<p>'+options.text+'</p>'+
		    '</div>';
		    var u = navigator.userAgent; 
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
			if(isAndroid || (!isAndroid && !isiOS)){
				var txt = document.createElement('textarea');
				txt.style = 'position:absolute;top:-9999px;left:-9999px;';
				txt.setAttribute('id',"selector");
				txt.setAttribute('readonly','readonly');
				txt.innerHTML = content;
				$('body').append(txt);
				$("#selector").select();
				document.execCommand("copy",false,null);
			}
			if(isiOS){
				var txt = document.createElement('a');
				txt.setAttribute('id',"selector");
				txt.setAttribute('style','position:absolute;top:-9999px;left:-9999px;');
				txt.innerHTML = content;
				$('body').append(txt);
				var copyDOM = document.querySelectorAll('#selector');
				var range = document.createRange();  
				range.selectNode(copyDOM[0]);
				window.getSelection().removeAllRanges();
				window.getSelection().addRange(range);
				document.execCommand('copy'); 
			}
			if(TIP){
				$("body").append(tipsHtml);
				setTimeout(function(){
					$("#share-tips").remove();
				},options.tipTime);
			}
			$("#selector").remove();
		}
	});
})(jQuery);