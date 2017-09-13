var weixin = {
	config: function(){
		var urll = window.location.href.split("#")[0];
		/*$.get("http://m.palm-h.com/2016/dishui/jssdk/jssdk.php",{"url":url},function(s){
			var s = eval("("+s+")");
			wx.config({
				debug: true,             // 开启调试模式,调用的所有api的返回值会在客户端alert出来。PC通过console出来
				appId: s.appId,           // 必填，公众号的唯一标识
				timestamp: s.timestamp,   // 必填，生成签名的时间戳
				nonceStr: s.nonceStr,     // 必填，生成签名的随机串
				signature: s.signature,   // 必填，签名，见附录1
				// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','uploadImage','downloadImage']
			});
		})*/
		$.ajax({
			type: "GET",
			url: 'http://m.palm-h.com/demo/weixinjssdk/jssdk.php',
			data: {
				url: urll
			},
			dataType: "jsonp",
			success: function(s) {	
				alert('成功');
				// var s = eval("("+s+")");
				wx.config({
					debug: true,             // 开启调试模式,调用的所有api的返回值会在客户端alert出来。PC通过console出来
					appId: s.appId,           // 必填，公众号的唯一标识
					timestamp: s.timestamp,   // 必填，生成签名的时间戳
					nonceStr: s.nonceStr,     // 必填，生成签名的随机串
					signature: s.signature,   // 必填，签名，见附录1
					// 必填，需要使用的JS接口列表，所有JS接口列表见附录2
					jsApiList: ['onMenuShareTimeline','onMenuShareAppMessage','chooseImage','uploadImage','downloadImage']
				});
			},
			error: function(s) {
				alert("失败，请稍后再试！")
			}
		});
	},
	share: function(desc){
		var data = {
			title: "优雅·蜕变",
			link: 'http://m.palm-h.com/2017/yazi1/index.html',
			imgUrl: '',
			// desc: desc?desc:'花漾光感时尚派对邀请函'
			desc: desc?desc:'2017雅姿魅力私享荟邀请函'
		};
		wx.onMenuShareAppMessage({
			title: data.title,            // 分享标题
			desc: data.desc,              // 分享描述
			link: data.link,              // 分享链接
			imgUrl: data.imgUrl,          // 分享图标
			type: '',                     // 分享类型,music、video或link，不填默认为link
			dataUrl: '',                  // 如果type是music或video，则要提供数据链接，默认为空
			success: data.success,
			cancel: data.cancel,
			success: function(res){
				console.log("分享好友成功");
			},
			cancel:function(){
				console.log("用户点击取消时的回调函数");
			}
		});
		wx.onMenuShareTimeline({
			title: data.desc,             // 分享标题
			link: data.link,              // 分享链接
			imgUrl: data.imgUrl,          // 分享图标
			success: data.success,
			cancel: data.cancel,
			success: function(res){
				console.log("分享朋友圈成功");
			},
			cancel:function(){
				console.log("用户点击取消时的回调函数");
			}
		});
	}
}
$(function(){
	weixin.config();
	wx.ready(function(){
		weixin.share();
	});
})

