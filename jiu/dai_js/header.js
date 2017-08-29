$(document).ready(function(){
    /*** 异步加载页头和页尾 ****/
    $(function(){
        $('#phpheader').load('header.php');
        $('#phplist').load('phplist.php');
        $('#phpfooter').load('phpfooter.php');
    });
});