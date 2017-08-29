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

	if(empty($data['desc'])){
		echo "内容不能为空";
		exit();	
	}	
	if(mb_strlen($data['name'])>1000){
		echo "咨询内容过长";
		exit;
	}	
	if(mb_strlen($data['name'])>16){
		echo "请填写正确的姓名";
		exit;
	}
	function strFilter($str){
		$str = str_replace('`', '', $str);
		$str = str_replace('·', '', $str);
		$str = str_replace('~', '', $str);
		$str = str_replace('!', '', $str);
		$str = str_replace('！', '', $str);
		$str = str_replace('@', '', $str);
		$str = str_replace('#', '', $str);
		$str = str_replace('$', '', $str);
		$str = str_replace('￥', '', $str);
		$str = str_replace('%', '', $str);
		$str = str_replace('^', '', $str);
		$str = str_replace('……', '', $str);
		$str = str_replace('&', '', $str);
		$str = str_replace('*', '', $str);
		$str = str_replace('(', '', $str);
		$str = str_replace(')', '', $str);
		$str = str_replace('（', '', $str);
		$str = str_replace('）', '', $str);
		$str = str_replace('-', '', $str);
		$str = str_replace('_', '', $str);
		$str = str_replace('——', '', $str);
		$str = str_replace('+', '', $str);
		$str = str_replace('=', '', $str);
		$str = str_replace('|', '', $str);
		$str = str_replace('\\', '', $str);
		$str = str_replace('[', '', $str);
		$str = str_replace(']', '', $str);
		$str = str_replace('【', '', $str);
		$str = str_replace('】', '', $str);
		$str = str_replace('{', '', $str);
		$str = str_replace('}', '', $str);
		$str = str_replace(';', '', $str);
		$str = str_replace('；', '', $str);
		$str = str_replace(':', '', $str);
		$str = str_replace('：', '', $str);
		$str = str_replace('\'', '', $str);
		$str = str_replace('"', '', $str);
		$str = str_replace('“', '', $str);
		$str = str_replace('”', '', $str);
		$str = str_replace(',', '', $str);
		$str = str_replace('，', '', $str);
		$str = str_replace('<', '', $str);
		$str = str_replace('>', '', $str);
		$str = str_replace('《', '', $str);
		$str = str_replace('》', '', $str);
		$str = str_replace('.', '', $str);
		$str = str_replace('。', '', $str);
		$str = str_replace('/', '', $str);
		$str = str_replace('、', '', $str);
		$str = str_replace('?', '', $str);
		$str = str_replace('？', '', $str);
		return trim($str);
	}
	$data['name']=strFilter($data['name']);
	$data['desc']=strFilter($data['desc']);
	$sql = "select * from wx_zixun where {$data['phone']}=phone";
	$result = mysqli_query($link,$sql);
	if(mysqli_num_rows($result)>0){
		echo "对不起，手机号已存在";
		exit;
	}
	$sql = "insert into wx_zixun(phone,name,content,time) values({$data['phone']},'{$data['name']}','{$data['desc']}',now())";
	$result = mysqli_query($link,$sql);
	
	if(mysqli_affected_rows($link)>0){
		echo "您已提交成功！";
	}else{
		echo "对不起，提交失败";
	}	
}
?>