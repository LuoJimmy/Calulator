/*!	
* Web calulator 0.1
*
* Copyright 2016, Jimmy Luo
* Released under the WTFPL license 
*
* Date: 2016-03-25(c) 
*
*/

var str_input;
var numresult;

function onclicknum(nums) { 
	str_input = document.getElementById("nummessege");
	console.log("str_input value:" + str_input.value);
	if(nums == "+" || nums == "-" || nums == "*" || nums == "/") {
		var str_last_char;
		str_last_char = str_input.value.charAt(str_input.value.length-1);//最后一个字符串
		if(str_input.value == ""){//输入的第一个字符是操作符

		}else if(str_last_char == "+" || str_last_char == "-" || str_last_char == "*" || str_last_char == "/"){//最后一个字符是操作符
		
		}else{
			str_input.value = str_input.value + nums;
		}
	}else{
		str_input.value = str_input.value + nums; 
	}
} 

function onclickclear() { 
	var show_all_str = document.getElementsByClassName("show-all-str");
	str_input = document.getElementById("nummessege");
	str_input.value = ""; 
	show_all_str[0].innerHTML = "";
} 

function onclickresult() { 
	var str_last_char;
	var show_all_str = document.getElementsByClassName("show-all-str");
	str_input = document.getElementById("nummessege"); 
	str_last_char = str_input.value.charAt(str_input.value.length-1);
	console.log("str_input:"+str_input.value);
	if(str_last_char == "+" || str_last_char == "-" || str_last_char == "*" || str_last_char == "/"){//最后一个字符是操作符
		
	}else{
		show_all_str[0].innerHTML = str_input.value+"=";
		numresult = calulate(str_input.value);
		//numresult = eval(str_input.value); 
		str_input.value = numresult; 
	}
	
}

//计算
function calulate(str) {
	console.log("str:"+str);
	var op_add_index = str.indexOf("+");
	var op_sub_index = str.indexOf("-");
	var op_mul_index = str.indexOf("*");
	var op_divide_index = str.indexOf("/");
	var str_len = str.length;
	if(op_sub_index == 0){//"-"符号有点特殊，也可以表示负号
		op_sub_index = str.indexOf("-",1);
	}
	if(op_add_index == -1 && op_sub_index == -1 && op_mul_index == -1 && op_divide_index == -1) {//如果字符串中不存在操作符
		if(str == "Infinity"){
			return "数值太大，无法计算！";
		}else{
			return str;
		}
		
	}else{
		var preview_index, last_index, str1, str2, i, j;
		//如果有‘*’操作符
		if(op_mul_index != -1) {
			if(op_divide_index != -1 && (op_mul_index > op_divide_index) ){//如果乘操作前面有的除操作，先计算除操作
				
			}else{
				preview_index = op_mul_index-1;
				last_index = op_mul_index+1;
				for(i = preview_index; i >= 0; i--){//往前搜索
					var str_char =  str.charAt(i);
					if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
						break;
					}
				}
				for(j = last_index; j < str_len; j++){//往后搜索
					var str_char =  str.charAt(j);
					if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
						break;
					}
				}
				str1 = str.substring(i+1,op_mul_index);
				str2 = str.substring(last_index,j);
				
				str = str.substring(0,i+1) + (parseFloat(str1)*parseFloat(str2)) + str.substring(j,str.length);
				return calulate(str); //可以用别名return arguments.callee(str);这样就可以不依赖函数名calulate
			}
			
		}
		
		//如果有‘/’运算符
		if(op_divide_index != -1) {
			preview_index = op_divide_index-1;
			last_index = op_divide_index+1;
			for(i = preview_index; i >= 0; i--){//往前搜索
				var str_char =  str.charAt(i);
				if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
					break;
				}
			}
			for(j = last_index; j < str_len; j++){//往后搜索
				var str_char =  str.charAt(j);
				if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
					break;
				}
			}
			str1 = str.substring(i+1,op_divide_index);
			str2 = str.substring(last_index,j);
			if(str2 == "0"){//被除数为0
				return "除数不能为零";
			}
			str = str.substring(0,i+1) + (parseFloat(str1)/parseFloat(str2)) + str.substring(j,str.length);
			return calulate(str);
		}
		
		//如果有‘+’运算符
		if(op_add_index != -1) { 
			if(op_sub_index != -1  && (op_add_index > op_sub_index)){//如果加操作前面有的减操作，先计算减操作
				
			}else {
				preview_index = op_add_index-1;
				last_index = op_add_index+1;
				for(i = preview_index; i >= 0; i--){//往前搜索
					var str_char =  str.charAt(i);
					if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
						if(str.indexOf("-") != 0)//如果是“-表示的不是负号”
							break;
					}
				}
				for(j = last_index; j < str_len; j++){//往后搜索
					var str_char =  str.charAt(j);
					if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
						break;
					}
				}
				str1 = str.substring(i+1,op_add_index);
				str2 = str.substring(last_index,j);
				console.log("str1:"+str1+";"+"str2:"+str2);
				//console.log("str.substring(0,i+1):"+";(parseFloat(str1)+parseFloat(str2)):"+(parseFloat(str1)+parseFloat(str2))+";str.substring(j,str.length):"+str.substring(j,str.length));
				str = str.substring(0,i+1) + (parseFloat(str1)+parseFloat(str2)) + str.substring(j,str.length);
				return calulate(str);
			}
			
		}
		
		//如果有‘-’操作符
		if(op_sub_index != -1 && op_sub_index != 0) {
			preview_index = op_sub_index-1;
			last_index = op_sub_index+1;
			for(i = preview_index; i >= 0; i--){//往前搜索
				var str_char =  str.charAt(i);
				if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
					if(str.indexOf("-") != 0)//如果是“-表示的是不是负号”
						break;
				}
			}
			for(j = last_index; j < str_len; j++){//往后搜索
				var str_char =  str.charAt(j);
				if(str_char == "+" || str_char == "-" || str_char == "*" || str_char == "/") {//遇到的是操作符
					break;
				}
			}
			str1 = str.substring(i+1,op_sub_index);
			str2 = str.substring(last_index,j);
			str = str.substring(0,i+1) + (parseFloat(str1)-parseFloat(str2)) + str.substring(j,str.length);
			return calulate(str);
		}
	}
}
