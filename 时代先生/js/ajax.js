function ajax(method,url,json,cb){
	if (window.XMLHttpRequest) {
		var xmlhttp = new XMLHttpRequest();
	}else{
		var xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");			
	}
	// {name:"abc",age:18}转name=abc&age=18		
	var arr = [];
	for(var key in json){
		var str = key + "=" +json[key];
		arr.push(str);
	}// ["name=abc","age=18"]
	var str = arr.join("&");//"name=abc&age=18"

	if (method=="get") {
		xmlhttp.open("get",url+"?"+str);
		xmlhttp.send();
	}else{
		xmlhttp.open("post",url);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
		xmlhttp.send(str);
	}

	xmlhttp.onreadystatechange = function(){
		if (xmlhttp.readyState==4&&xmlhttp.status==200) {				
			cb(xmlhttp.responseText);
		}
	}
}