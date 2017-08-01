### Observer
只是自己模拟最简单的观察者模式，但大概的原理应该是这样的
```javascript
;(function(root){
    var events={};
    var ps = root.ps ={
	/* 创建监听 */
	on : function(etype,fn){
	 events[etype] || (events[etype]=[]);
	 events[etype].push({
	    etype :  etype,
	    efn : fn
	 })
	},
	/* 注销 */
	off:function(etype){
	 events[etype]=[];
	},
	/* 触发 */
	trigger:function(etype,data){
	 if(events[etype]){
	 events[etype].forEach(function(info){
	   if(info.etype==etype){
	     info.efn(data);
	   }
	 })
	 }
	}
    }
})(this);
	ps.on("aa",function(name){
		alert(name);
	})
	ps.off("aa")
	ps.trigger("aa","刘恒")
```
以上姿势自己理解的非常简单的观察者模式，如有问题欢迎指正
