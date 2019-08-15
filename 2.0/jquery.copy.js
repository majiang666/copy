;(function($){
	var defaults = {
		content:"",//自定义复制链接地址
		callback:null//成功回调
	};
	$.extend({
		copy:function(option){
			var options = $.extend({},defaults,option);
			var content = options.content == "" ? "请配置复制内容" : options.content;
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
			$("#selector").remove();
			if(options.callback) options.callback();
		}
	});
})(jQuery);