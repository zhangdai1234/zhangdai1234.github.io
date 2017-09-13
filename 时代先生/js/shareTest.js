

var sharePlatform=function(custom_data){
	var wxData = {
		ready: false,
		imgUrl: custom_data.imgUrl,
		link: custom_data.link,
		desc: custom_data.desc,
		title: custom_data.title,
		share: function() {
			if(!wxData.ready) {
				return;
			}
			//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
			wx.onMenuShareTimeline({
				title: wxData.title,
				link: wxData.link,
				imgUrl: wxData.imgUrl,
				success: function() {
					wxData.success();
					wxData.callback();
				},
				cancel: function() {

				}
			});

			//获取“分享给朋友”按钮点击状态及自定义分享内容接口
			wx.onMenuShareAppMessage({
				title: wxData.title,
				desc: wxData.desc,
				link: wxData.link,
				imgUrl: wxData.imgUrl,
				type: '', // 分享类型,music、video或link，不填默认为link
				dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				success: function() {
					wxData.success();
					wxData.callback();
				},
				cancel: function() {

				}
			});

			//获取“分享到QQ”按钮点击状态及自定义分享内容接口
			wx.onMenuShareQQ({
				title: wxData.title,
				desc: wxData.desc,
				link: wxData.link,
				imgUrl: wxData.imgUrl,
				success: function() {
					wxData.success();
					wxData.callback();
				},
				cancel: function() {

				}
			});

			//获取“分享到腾讯微博”按钮点击状态及自定义分享内容接口
			wx.onMenuShareWeibo({
				title: wxData.title,
				desc: wxData.desc,
				link: wxData.link,
				imgUrl: wxData.imgUrl,
				success: function() {
					wxData.success();
					wxData.callback();
				},
				cancel: function() {

				}
			});

			//获取“分享到QQ空间”按钮点击状态及自定义分享内容接口
			wx.onMenuShareQZone({
				title: wxData.title,
				desc: wxData.desc,
				link: wxData.link,
				imgUrl: wxData.imgUrl,
				success: function() {
					wxData.success();
					wxData.callback();
				},
				cancel: function() {

				}
			});
		},
		success: function() {

		},
		callback: function() {

		}
	};

	wx.ready(function() {
		wxData.ready = true;
		wxData.share();
	});
	wx.error(function(res) {
		wx.hideOptionMenu();
		if(config.debug) {
			alert(JSON.stringify(res));
		}
	});
	var randomStr = function(len) {
		var str = 'qwertyuiopasdfghjklzcxvbnmQWERTYUIOPASDFGHJKLZCXVBNM';
		var result = '';
		while(result.length < len) {
			result += str[getRandomInt(0, 51)];
		}
		return result;
	};
	var getRandomInt=function(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	var callbackName = 'weixin_callback_' + (new Date - 0);
	// noncestr 随机字符串
	var noncestr = randomStr(16);
	// signature 请求参数
	var param = {
		callback: callbackName,
		noncestr: noncestr,
		timestamp: parseInt(new Date / 1000),
		url: String(location.href).split('#')[0],
		state: 0
	};
	$.ajax({
		type: 'GET',
		url: 'http://one.jcmob.cn/jssdk/get_signature2.do',
		data: param,
		dataType: 'jsonp',
		jsonpCallback: callbackName,
		success: function(data) {
			if(data && data.code && data.code === 'success') {
				wx.config({
					debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
					appId: data.appid, // 必填，公众号的唯一标识
					timestamp: data.timestamp, // 必填，生成签名的时间戳
					nonceStr: data.noncestr, // 必填，生成签名的随机串
					signature: data.signature, // 必填，签名，见附录1
					jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'hideOptionMenu', 'showOptionMenu'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
				});
				if(useful.isWeiXin()==false){
					
				
				setShareInfo({
					title:wxData.title,
					summary: wxData.desc,
					pic:wxData.imgUrl,
					url: wxData.link,
					WXconfig: {
						swapTitleInWX: true,
						appId: data.appid,
						timestamp: data.timestamp,
						nonceStr: data.noncestr,
						signature: data.signature
					}
				});
				}
			}
		}
	});	
};
var share_data={
	desc: '广发分享日全新升级！精彩尽在指尖，吆吆切克闹~',
	title: '嘿喂购！跟着颜团子，名画朋友圈里Show个够~',
	imgUrl:"http://minisite4.uuwap.cn/mob/videodemo/img/share.jpg",	
	link:"http://minisite4.uuwap.cn/mob/videodemo/index.html",
};
sharePlatform(share_data);


