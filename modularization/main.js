;(function(root,ps){
	root.mainZone = {
    		updateCheckboxs : function(checked){
    			var cks = this.element.querySelectorAll("input[type=checkbox]");
    			for(var i=0;i<cks.length;i++)cks[i].checked = checked;
    		},
    		renderAll : function(list){
    			var self = this;
    			list.forEach(function(item){
                      self.renderSingle(item);
    			})
    		},
    		renderSingle : function(item){
    			var 
    				div = document.createElement("div"),
    				p = document.createElement("p"),
    				a = document.createElement("a"),
    				ip = document.createElement("input");

    				ip.type="checkbox";

    				
    				a.className = "remove";
    				a.innerHTML ="X";
    				div.id = item.id;
    				p.innerHTML = item.content;

    				div.appendChild(ip);
    				div.appendChild(p);
    				div.appendChild(a);

    				this.element.firstElementChild.appendChild(div);
    		},
    		removeItem : function(node){
    			this.element.firstElementChild.removeChild(node);
    		},
    		removeAll : function(){
    			this.element.firstElementChild.innerHTML = "";
    		},
    		init : function(selector){
    			this.element  = document.querySelector(selector);
    			var self = this;

    			//绑定单条删除按钮点击事件
    			this.element.onclick = function(e){
    				//代理删除按钮
    				var target = e.target;
    				if(target.className=="remove"){
    					//移除标签
    					self.removeItem(target.parentNode);
    					//移除数据
    					localStorage.removeItem(target.parentNode.id);
    					//通知footerZone组件 更新数字
    					ps.trigger("updateNum",localStorage.length);
    				}
    			}
    			//监听headerZone 组件enter按键抬起事件，创建单挑记录渲染
    			ps.on("create",function(data){
	    			self.renderSingle(data);
	    		})
	    		//监听footerZone组件中清空按钮点击事件
	    		ps.on("removeAll",function(){
	    			self.removeAll();
	    		})
	    		//监听window onload 中数据加载成功后的事件，渲染整个页面
	    		ps.on("renderAll",function(data){
	    			self.renderAll(data);
	    		})
	    		//监听headerZone组件全选按钮的状态事件
	    		ps.on("updateCheckboxs",function(data){
	    			self.updateCheckboxs(data);
	    		})
    		}
    	}

})(this,ps);