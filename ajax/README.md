## ajax请求

* ### 创建 XMLHttpRequest 对象
> XMLHttpRequest是ajax的基础

```javascript
// 创建  XMLHttpRequest对象
var ajax = new XMLHttpRequest();

// 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX 对象;
var ajax = new ActiveXObject("Microsoft.XMLHTTP");
```
* 为了应对所有的现代浏览器，包括 IE5 和 IE6，请检查浏览器是否支持 XMLHttpRequest 对象。
  如果支持，则创建 XMLHttpRequest 对象。如果不支持，则创建 ActiveXObject ;
  ```javascript
    var ajax;
    if (window.XMLHttpRequest){
    // code for IE7+, Firefox, Chrome, Opera, Safari
        ajax = new XMLHttpRequest();
    }else{
    // code for IE6, IE5
        ajax = new ActiveXObject("Microsoft.XMLHTTP");
    }
  ```

* ### 向服务器发送请求
> 需将请求发送到服务器，使用 XMLHttpRequest 对象的 open() 和 send() 方法;

| 方法 | 描述 |
| ---------- | --- |
|ajax.open(method,url,async)  | 规定请求的类型、URL 以及是否异步处理请求 |
|                             | * method：请求的类型；GET 或 POST       |
|                    | * url：文件在服务器上的位置          | 
|                    | * async：true（异步）或 false（同步）   | 
|ajax.send(string);           | **将请求发送到服务器。**                |
|                             | * string：仅用于 POST 请求              |
|setRequestHeader(header,value)|向请求添加 HTTP 头。                    |
|                             | * header: 规定头的名称                  |
|                             | * value: 规定头的值                     |

>* 在以下情况中， **请使用 POST 请求** ：
无法使用缓存文件（更新服务器上的文件或数据库）
向服务器发送大量数据（POST 没有数据量限制）
发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

```javascript
// 示例如下
var ajax = new XMLHttpRequest();
ajax.open("POST","ajax_test.asp",true);
ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");

// 当使用 async=true 时，请规定在响应处于 onreadystatechange 事件中的就绪状态时执行的函数：
ajax.onreadystatechange=function(){
  if (ajax.readyState==4 && ajax.status==200){
    document.getElementById("myDiv").innerHTML=ajax.responseText;
  }
}
ajax.send("fname=Bill&lname=Gates");
```