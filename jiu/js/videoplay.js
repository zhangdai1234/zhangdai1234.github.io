/**
 * 依赖ckplayer
 */

(function () {
    var flashvars = {
        // f: 'http://movie.ks.js.cn/flv/other/1_0.flv',
        f: 'http://www.hongmao1739.com/plugins/ckplayer/ckplayer.swf',
        c: 0,
        i: '../images/video_poster.jpg',
        loaded: 'vloadedHandler'
    };
    var params = {
        bgcolor: '#FFF',
        allowFullScreen: true,
        allowScriptAccess: 'always',
        wmode: 'transparent'
    };

    var video = [
        // 'http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4'
        // 'http://www.hongmao1739.com/video/hongmao_video.mp4->video/mp4'
        '/video/hongmao_video.mp4->video/mp4'
    ];

    var vloadedHandler = function () {
        CKobject.getObjectById('ckplayer_videoholder').addListener('play','onVideoPlay');
    };
    var onVideoPlay = function () {
        hmTouch('播放视频');
    };

    window.onVideoPlay = onVideoPlay;
    window.vloadedHandler = vloadedHandler;

    CKobject.embed(
        '/plugins/ckplayer/ckplayer.swf',
        'videoholder',
        'ckplayer_videoholder',
        '1000',
        '600',
        false,
        flashvars,
        video,
        params
    );
    // CKobject.embedSWF('/ckplayer/ckplayer.swf','a1','ckplayer_a1','600','400',flashvars,params);
})();