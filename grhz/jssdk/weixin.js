
var weixin = {
    config: function() {
        var url = window.location.href.split("#")[0];
             // alert(url);
             // alert(1);
        $.get("http://test.palm-h.com/main/2017/mirinda/admin/Home/JsSdk/jsSdkApi", { "url": url }, function(s) {
            var s = eval("(" + s + ")");
            // alert(s);
            //          alert(s.signature);
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: s.appId, // 必填，公众号的唯一标识
                timestamp: s.timestamp, // 必填，生成签名的时间戳
                nonceStr: s.nonceStr, // 必填，生成签名的随机串
                signature: s.signature, // 必填，签名，见附录1
                jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'chooseImage', 'uploadImage', 'downloadImage'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        })
    },
    share: function(desc) {
        var data = {
            title: "果然会转-美年达游戏", // 分享标题
            link: 'http://test.palm-h.com/main/2017/mirinda/h5/grhz/index.html', // 分享链接
            imgUrl: "http://test.palm-h.com/main/2017/mirinda/h5/grhz/jssdk/logo.jpg", // 分享图标
            desc: "会玩的人，运气总是不会太差！快来试试吧......", // 分享描述,
            success: function() {
                console.log('分享成功');
            },
            cancel: function() {
                console.log('分享放弃');
            }
        };
        wx.onMenuShareTimeline({ ////分享到朋友圈
            title: data.title, // 分享标题
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            success: data.success,
            cancel: data.cansel
        });
        wx.onMenuShareAppMessage({ ////分享给好友
            title: data.title, // 分享标题
            desc: data.desc, // 分享描述
            link: data.link, // 分享链接
            imgUrl: data.imgUrl, // 分享图标
            type: '', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: data.success,
            cancel: data.cansel
        });

    }
}
    // alert(1);
    weixin.config();
    wx.ready(function() {
        // alert(1);
        weixin.share();
    });
