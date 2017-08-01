;(function(root){
	var events = {};
	// //events={
	// 	crate : [{
	// 		etype:,
	// 		callback : fn
	// 	}]
	// }
	var ps=root.ps = {
		on : function(etype,fn){
			events[etype]||(events[etype]=[]);

			events[etype].push({
				etype : etype,
				// context : dom,
				callback : fn
			})
		},
		trigger : function(etype,data){
			events[etype]||(events[etype]=[]);
			events[etype].forEach(function(item){
				item.callback(data);
			})
		},
		off:function(){}
	}
})(this);