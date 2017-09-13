<?php
/*************************************************
==================================================

	data/jssdk.php?url=提交页面的路径
	注意提交的路径，路径是调用JS-SDK的页面路径，包括？后面的参数，但不包括hash的内容
	return {appid,timestamp,nonecStr,signature}
==================================================
**************************************************/

//在这里设置你的APPID，AppSecret
$appid = "wxbd789570dc721081";
$secret ="a594020f02f325ab2e72c729c4d1f0cf";

//开始
define("APPID",$appid);
define('SECRET', $secret);

$url = $_GET["url"];
echo sendJson($url);

function sendJson($url){
	$ticketTokenApi = getTicket();
    $timestamp = time();
    $nonceStr = createNonceStr();
    $string = "jsapi_ticket=$ticketTokenApi&noncestr=$nonceStr&timestamp=$timestamp&url=$url";
    $signature = sha1($string);
	$data = array(
		"appId"=> APPID,
		"timestamp"=>$timestamp,
		"nonceStr"=>$nonceStr,
		"signature"=>$signature
	);
	return json_encode($data);
}

function getAccess(){
	$data = json_decode(file_get_contents("access.json"));
	if($data->time < time()){
		$url = "https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=".APPID."&secret=".SECRET;
		$res = json_decode(getHttp($url));
		$access = $res->access_token;
		if($access){
			$data->access = $access;
			$data->time = time()+7000;
//			chmod("access.json",0755);
			$fp = fopen("access.json","w");
			fwrite($fp, json_encode($data));
			fclose($fp);
		}
	}else{
			$access = $data->access;
	}
	return $access;
}

function getTicket(){
	$data = json_decode(file_get_contents("ticket.json"));
	if($data->time < time()){
		$accessToken = getAccess();
		$url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?type=jsapi&access_token=$accessToken";
		$res = json_decode(getHttp($url));
		$ticket = $res->ticket;
		if($ticket){
			$data->ticket = $ticket;
			$data->time = time()+7000;
//			chmod("ticket.json",0755);
			$fp = fopen("ticket.json","w");
			fwrite($fp, json_encode($data));
			fclose($fp);
		}
	}else{
		$ticket = $data->ticket;
	}
	return $ticket;
}
function createNonceStr($length = 16) {
    $chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    $str = "";
    for ($i = 0; $i < $length; $i++) {
      $str .= substr($chars, mt_rand(0, strlen($chars) - 1), 1);
    }
    return $str;
  }

function getHttp($url) {
	$curl = curl_init();
	curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($curl, CURLOPT_TIMEOUT, 500);
	curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
	curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
	curl_setopt($curl, CURLOPT_URL, $url);
	$res = curl_exec($curl);
	curl_close($curl);
	return $res;
}

?>