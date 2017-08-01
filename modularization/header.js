;(function(root,ps){
	root.headerZone = {

    		init : function(selector){
    			this.element = document.querySelector(selector)
    			this.element.querySelector("#editor").onkeyup = function(e){
    				if(e.keyCode == 13){
    					//step 1  render page
	    				var data = {
	    					id : "id_"+Date.now(),
	    					content : this.value
	    				};
	    				//通知mainZone组件新增事件
	    				ps.trigger("create",data);
	    				//保存数据
	    				localStorage.setItem(data.id,JSON.stringify(data));
	    				// 通知footerZone组件更新数字事件
	    				ps.trigger("updateNum",localStorage.length);
    				}

    			};
    			this.element.querySelector("#check-all").onchange = function(e){
    				//更新主要区域的的复选框状态
    				ps.trigger("updateCheckboxs",this.checked);
    				//footer 区域clear 按钮显示隐藏
    				ps.trigger("toggleShowClearBtn",this.checked);
    			}

    		}
    	};
})(this,ps);