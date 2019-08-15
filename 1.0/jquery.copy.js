;(function($){
	var defaults = {
		imgUrl:"",//分享图标
		text:"复制成功",//分享提示文案
		copyUrl:"",//自定义复制链接地址
		tipTime:2000,//分享提示消失时间
		copyId:""//复制按钮id
	};
	$.extend({
		copy:function(option){
			var options = $.extend({},defaults,option);
			var URL = options.copyUrl == "" ? window.location.href.split('#')[0] : options.copyUrl;
			var cId = options.copyId == "" ? '#copy' : options.copyId;
			var IMG = options.imgUrl == "" ? "" : '<img style="width: 22px;" src="'+options.imgUrl+'">';
			var tipsHtml = '<div id="share-tips" style="position: fixed;top: 50%;left:50%;background: rgba(0,0,0,.5);border-radius: 4px;margin: 0 auto;color: #fff;z-index: 9999;padding: 5px 10px;font-size: 14px;text-align: center;transform: translate(-50%,-50%);">'+
		        IMG+
		        '<p>'+options.text+'</p>'+
		    '</div>';
		    var u = navigator.userAgent; 
			var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
			var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 
			var aEle = document.querySelectorAll(cId);
			if(isAndroid || (!isAndroid && !isiOS)){
		        $(aEle).each(function(){
		        	var index = $(this).attr("id").split("y")[1];
		        	$('body').append('<textarea id="selector'+index+'" style="position:absolute;top:-9999px;left:-9999px;" readonly>'+URL+'</textarea>');
		            $(this)[0].onclick=function(event){
		                $("#selector"+index).select();
		                document.execCommand("copy",false,null);
		                $("body").append(tipsHtml);
		                setTimeout(function(){
		                    $("#share-tips").remove();
		                },options.tipTime);
		            };
		        });        
			}
			if(isiOS){
			    $(aEle).each(function(){
			    	var index = $(this).attr("id").split("y")[1];
			    	$('body').append('<a id="selector'+index+'" style="position:absolute;top:-9999px;left:-9999px;">'+URL+'</a>');
			    	this.addEventListener('click',function(){
				        var copyDOM = document.querySelectorAll('#selector'+index);
				        var range = document.createRange();  
				        range.selectNode(copyDOM[0]);
				        window.getSelection().removeAllRanges();
				        window.getSelection().addRange(range);
				        document.execCommand('copy');
				        $("body").append(tipsHtml);
				        setTimeout(function(){
				            $("#share-tips").remove();
				        },options.tipTime);   
				    },false);
			    	
			    });
			    
			}
		}
	});
})(jQuery);