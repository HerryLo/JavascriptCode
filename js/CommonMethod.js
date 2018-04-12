var _method = {
	/**
	 * 判断是否为空数组
	 * @param  {[type]}
	 * @return {Boolean}
	 */
	isArrayEmpty(a) {
	  if(!a) return false;
	  var arr = a;
	  for(var i = 0;i < arr.length;i++){
	      if(arr[i] instanceof Array){
	          return isArrayEmpty(arr[i]);
	      }else{
	          if(arr[i]){
	              return false;//不为空
	          }
	      }
	  }
	  return true;//为空
	}
}