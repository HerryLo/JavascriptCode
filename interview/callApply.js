/**
 * Es5 写法
 */
Function.prototype.call2 = function(context) {
    var ctx = context || window;
    var args = [];
    ctx.fn = this;
    // 排除第一个this参数
    for(var i = 1;i<arguments.length;i++) {
        args.push('arguments['+i+']');
    }   
    console.log(args);
    var result = eval('ctx.fn('+args+')');
    delete ctx.fn;
    return result;
}

/**
 * Es6
 */
Function.prototype.call2 = function(context, ...args) {
    var ctx = context || window;
    ctx.fn = this
    var result = ctx.fn(...args)
    delete ctx.fn
    return result
}

/**
 * Es6
 */
Function.prototype.apply2 = function(context, arrArgs) {
    var ctx = context || window;
    ctx.fn = this
    var result = ctx.fn(...arrArgs)
    delete ctx.fn
    return result
}