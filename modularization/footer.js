;(function(root,ps){
 		root.footerZone = {
    		updateNum : function(num){
    			this.element.querySelector("#num").innerHTML = num;
    		},
    		toggleShowClearBtn : function(checked){
    			this.element.querySelector("#clear-all").style.display = 
    			checked?"block":"none" ;
    		},
    		init : function(selector){
    			this.element = document.querySelector(selector);
    			var self = this;
    			//绑定清空点击按钮事件
    			this.element.querySelector("#clear-all").onclick = function(e){
    				//main zone 清空
    				ps.trigger("removeAll");
    				//clear localStorage
    				localStorage.clear();
    				//update 数据记录数标记
    				self.updateNum(0);
    			}
    			//监听updateNum事件，并且更新数据num显示
    			ps.on("updateNum",function(data){
	    			self.updateNum(data);
	    		})
	    		//监听全选按钮，控制清空按钮的显示隐藏
	    		ps.on("toggleShowClearBtn",function(data){
	    			self.toggleShowClearBtn(data);
	    		})
    		}
    	}
})(this,ps);