<?php
$link = @mysqli_connect('localhost','root','gzjzl020','weixing');
	if(mysqli_connect_errno()){
		exit(mysqli_connect_error());
	}
	mysqli_set_charset($link,'utf8');
if(!empty($_POST)){
	$data=$_POST;
	if(!is_numeric($data['phone']) or empty($data['phone'])){
		echo "电话号码不能为空且必须为数字";
		exit();
	}
	if(mb_strlen($data['phone'])!==11){
		echo "电话号码必须为11位";
		exit;
	}
	$sql = "select * from wx_phone where {$data['phone']}=phone";
	$result = mysqli_query($link,$sql);
	if(mysqli_num_rows($result)>0){
		echo "对不起，手机号已存在";
		exit;
	}
	$sql = "insert into wx_phone(phone,time) values({$data['phone']},now())";
	$result = mysqli_query($link,$sql);
	
	if(mysqli_affected_rows($link)>0){
		echo "您已提交成功！";
	}else{
		echo "对不起，提交失败";
	}	
}
?>