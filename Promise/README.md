## Promise 异步编程

* ### Promise是异步编程的一种解决方案，比传统的解决方案（回调函数和事件）更合理更强大。

>从语法上说，Promise是一个对象，从它可以获取异步操作的消息。

对象的状态不受外界影响。Promise对象代表一个异步操作， **有三种状态：**

* >Pending(进行中): 初始状态，不是成功或失败状态。
    
* >Resolved(已完成 或者fulfilled): 意味着操作成功完成。
    
* >Rejected(已失败): 意味着操作失败。
   
   pending 状态的 Promise 对象可能触发fulfilled 状态并传递一个值给相应的状态处理方法，也可能触发失败状态（rejected）并传递失败信息。
   
   当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法（handlers ）就会被调用（then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争）。
