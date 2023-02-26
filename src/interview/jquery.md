# JavaScript基础面试题汇总
## 1、❓说下 jQuery/Zepto 中的 on 方法有哪些参数，分别代表什么意思？
https://www.mianshigee.com/question/28790oto/


## 2、❓谈一下 Jquery 中的 bind(), live(), delegate(), on()的区别？
- bind：绑定事件，对新添加的事件不起作用，方法用于将一个处理程序附加到每个匹配元素的事件上并返回 jQuery 对象。
- live：方法将一个事件处理程序附加到与当前选择器匹配的所有元素（包含现有的或将来添加的）的指定事件上并返回 jQuery 对象。
- delegate：方法基于一组特定的根元素将处理程序附加到匹配选择器的所有元素（现有的或将来的）的一个或多个事件上。


## 3、❓jQuery 的队列是如何实现的？队列可以用在哪些地方？


## 4、❓jquery.extend 与 jquery.fn.extend 的区别？


## 5、❓jQuery 的属性拷贝(extend)的实现原理是什么，如何实现深拷贝？


## 6、❓jquery 中如何将数组转化为 json 字符串，然后再转化回来？


## 7、❓jQuery.fn 的 init 方法返回的 this 指的是什么对象？为什么要返回 this？


## 8、❓jQuery 与 jQuery UI、jQuery Mobile 区别？


## 9、❓jQuery 的 slideUp 动画 ，如果目标元素是被外部事件驱动, 当鼠标快速地连续触发外部元素事件, 动画会滞后的反复执行，该如何处理呢?


## 10、❓你觉得 jQuery 源码有哪些写的好的地方


## 11、❓你觉得 zepto 源码有哪些写的好的地方


## 12、jQuery 的实现原理和核心？
1. jQuery 的实现原理
  ```js
  var jQuery = function(selector, context) {
    return new jQuery.fn.init(selector, context);
  };
  ```
  - jQuery 采用的是构造函数模式进行开发的, jQuery 是一个类
  - 上面说的常用的方法(CSS、属性、筛选、事件、动画、文档处理)都是定义在 jQuery.prototype 上的 ->只有 jQuery 的实例才能使用这些方法
2. 选择器/筛选
  - 我们的选择器其实就是创造 jQuery 类的一个实例 ->获取页面中元素用的 jQuery(); -> $()
  ```js
  $()就是 jQuery 的选择器, 就是创建 jQuery 这个类的一个实例
  ```
  - 执行的时候需要传递两个参数
  ```js
  selector -> 选择器的类型 一般都是string类型
  context -> 获取的上下文  第二个参数一般不传，不传默认为document
  $("#div1")
  $(".box")
  $("#div1 span") -> $("span", div1)
  console.log($("#div1 span:first"))
  ```
  - 通过选择器获取的是一个 jQuery 类的实例->jQuery 对象
  ```js
  console. log($( #div1"))

  [jQuery对象的私有的属性]

  $("#div1")[0] -> div1这个元素对象
  S(#div1").selector -> "#div1"
  S(#div1").context -> document
  ("#div1").length-)1 获取元素的个数

  [jQuery对象的公有的属性]
  jQuery.prototype
  ```
  - 我们获取的是 jQuery 对象(他是 jQuery 的实例)不是我们的原生 js 对象
  ```js
  jQuery: $("#div1")
  JS: document.getElementById("div1") 
  ```
  原生JS的对象不能直接的使用jQuery的方法, 同理, jQuery的对象也不能使用原生js的方法
  ```js
  $("#div1").className = "box";
  document.getElementById("div1").addClass();
  ```
  - 互相转化
  ```js
  var $oDiv =$("#div1")
  var oDiv = document.getElementById("div1")
  Js->jQuery: $(oDiv).addClass()
  jQuery->Js: $oDiv[o]/ $oDiv.get(0)
  ```
3. 核心
  ```js
  $(document).ready(function() {
    //HTML结构加载完成就执行这里的代码
  });
  $(function() {});
  ```
  each
  ```js
  $("selector").each( function(){})遍历获取的这些元素 jQuery.prototype
  $.each(ary)遍历数组中的每一项 jQuery.each
  ```
  我们的 jQuery 不仅仅是一个类(在它的原型上定义了很多的方法, 每一个 jQuery 的实例都可以使用这些方法), 它还是一个普通的对象, 在 jQuery 本身的属性中还增加了一系列的方法: Ajax、each、工具<br>
  `$.unique(ary)`、`$.ajax()`
  ```js
  $.extend() -> 把 jQuery当做一个对象,给它扩展属性->完善类库
  $.fn.extend() -> 在 jQuery的原型上扩展属性和方法->编写 jQuery插件
  $.extend({
      a: function(){
      }
  })
  $.a()
  $.fn.extend({
      b: function(){
      }
  })
  $().b()
  ```


## 13、❓是否知道自定义事件？jQuery 里的 fire 函数是什么意思，什么时候用？


## 14、❓jQuery 通过哪个方法和 Sizzle 选择器结合的？


## 15、❓jQuery 一个对象可以同时绑定多个事件，这是如何实现的？
jQuery 可以给一个对象同时绑定多个事件，低层实现方式是使用 addEventListner 或 attachEvent 兼容不同的浏览器实现事件的绑定，这样可以给同一个对象注册多个事件。


## 16、❓针对 jQuery 的优化方法？


## 17、❓jQuery UI 如何自定义组件？


## 18、❓jQuery 对象的特点


## 19、❓Zepto 的点透问题如何解决？


## 20、❓一个 div，有几种方式得到这个 div 的 jQuery 对象？
`<div class='aabbcc' id='nodesView'></div>`想直接获取这个 div 的 dom 对象，如何获取？dom 对象如何转化为 jQuery 对象？


## 21、❓jQuery 框架中$.ajax()的常用参数有哪些？写一个 post 请求并带有发送数据和返回数据的样例


## 22、jQuery 的优点
1. 轻量级
  - JQuery 非常轻巧，采用 Dean Edwards 编写的 Packer 压缩后，大小不到 30KB, 如果使用 Min 版并且在服务器端启用 Gzip 压缩后，大小只有 18KB。
  - gzip： 每天一个 linux 命令（32）：gzip 减少文件大小有两个明显的好处，一是可以减少存储空间，二是通过网络传输文件时，可以减少传输的时间。gzip 是在 Linux 系统中经常使用的一个对文件进行压缩和解压缩的命令，既方便又好用。gzip 不仅可以用来压缩大的、较少使用的文件以节省磁盘空间，还可以和 tar 命令一起构成 Linux 操作系统中比较流行的压缩文件格式。据统计，gzip 命令对文本文件有 60%～ 70%的压缩率。
2. 强大的选择器
  - JQuery 允许开发者使用从 CSS1 到 CSS3 几乎所有的选择器，以及 JQuery 独创的高级而且复杂的选择器，另外还可以加入插件使其支持 XPath 选择器，甚至开发者可以编写属于自己的选择器。由于 JQuery 支持选择器这一特性，因此有一定 CSS 经验的开发人员可以很容易的切入到 JQuery 的学习中来。
  - XPath： XPath 是一门在 XML 文档中查找信息的语言。XPath 可用来在 XML 文档中对元素和属性进行遍历。
  >  XPath 是 W3C XSLT 标准的主要元素，并且 XQuery 和 XPointer 都构建于 XPath 表达之上。
  > 因此，对 XPath 的理解是很多高级 XML 应用的基础。
3. 出色的 DOM 操作的封装
  - JQuery 封装了大量常用的 DOM 操作，使开发者在编写 DOM 操作相关程序的时候能够得心应手。JQuery 轻松地完成各种原本非常复杂的操作，让 JavaScript 新手也能写出出色的程序。
4. 可靠的事件处理机制
  - JQuery 的事件处理机制吸收了 JavaScript 专家 Dean Edwards 编写的事件处理函数的精华，是的 JQuery 在处理事件绑定的时候相当可靠。在预留退路、循序渐进以及非入侵式编程思想方面，JQuery 也做得非常不错。
5. 完善的 Ajax
  - JQuery 将所有的 Ajax 操作封装到一个函数$.ajax()里，使得开发者处理 Ajax 的时候能够专心处理业务逻辑而无需关心复杂的浏览器兼容性和 XMLHttpRequest 对象的创建和使用的问题。
6. 不污染顶级变量
  - JQuery 只建立一个名为 JQuery 的对象，其所有的函数方法都在这个对象之下。其别名$也可以随时交流控制权，绝对不会污染其他的对象。该特性是 JQuery 可以与其他 JavaScript 库共存，在项目中放心地引用而不需要考虑到后期的冲突。
7. 出色的浏览器兼容性
  - 作为一个流行的 JavaScript 库，浏览器的兼容性是必须具备的条件之一。JQuery 能够在 IE6.0+, FF 2+, Safari2.+和 Opera9.0+下正常运行。JQuery 同时修复了一些浏览器之间的的差异，使开发者不必在开展项目前建立浏览器兼容库。
8. 链式操作方式
  - JQuery 中最有特色的莫过于它的链式操作方式——即对发生在同一个 JQuery 对象上的一组动作，可以直接接连写无需要重复获取对象。这一特点使得 JQuery 的代码无比优雅。
9. 隐式迭代
  - 当用 JQuery 找到带有“.myClass”类的全部元素，然后隐藏他们时。无需循环遍历每一个返回的元素。相反，JQuery 里的方法都被设计成自动操作的对象集合，而不是单独的对象，这使得大量的循环结构变得不再必要，从而大幅度地减少代码量。
10. 行为层与结构层的分离
  - 开发者可以使用选择器选中元素，然后直接给元素添加事件。这种将行为层与结构层完全分离的思想，可以使 JQuery 开发人员和 HTML 或其他页面开发人员各司其职，摆脱过去开发冲突或个人单干的开发模式。同时，后期维护也非常方便，不需要在 HTML 代码中寻找某些函数和重复修改 HTML 代码。
11. 丰富的插件支持
  - JQuery 的易扩展性，吸引了来自全球开发者来编写 JQuery 的扩展插件。目前已经有超过几百种官方插件支持，而且还不断有新插件面试。
12. 完善的文档
  - JQuery 的文档非常丰富，现阶段多位英文文档，中文文档相对较少。很多热爱 JQuery 的团队都在努力完善 JQuery 中文文档，例如 JQuery 的中文 API。
13. 开源
  - JQuery 是一个开源的产品，任何人都可以自由地使用并提出修改意见。


## 23、Jquery 如何获取子元素


## 24、jQuery 库中的 $() 是什么？


## 25、如何找到所有 HTML select 标签的选中项？


## 26、$(this) 和 this 关键字在 jQuery 中有何不同？


## 27、 jquery怎么移除标签onclick属性？


## 28、jquery中addClass, removeClass, toggleClass的使用


## 29、JQuery有几种选择器?
```js
(1)、基本选择器：#id，class,element,*;
(2)、层次选择器：parent > child，prev + next ，prev ~ siblings
(3)、基本过滤器选择器：:first，:last ，:not ，:even ，:odd ，:eq ，:gt ，:lt
(4)、内容过滤器选择器： :contains ，:empty ，:has ，:parent
(5)、可见性过滤器选择器：:hidden ，:visible
(6)、属性过滤器选择器：[attribute] ，[attribute=value] ，[attribute!=value] ，[attribute^=value] ，[attribute$=value] ，[attribute*=value]
(7)、子元素过滤器选择器：:nth-child ，:first-child ，:last-child ，:only-child
(8)、表单选择器： :input ，:text ，:password ，:radio ，:checkbox ，:submit 等；
(9)、表单过滤器选择器：:enabled ，:disabled ，:checked ，:selected
```


## 30、jQuery中的Delegate()函数有什么作用？
delegate()会在以下两个情况下使用到：
- 1、如果你有一个父元素，需要给其下的子元素添加事件，这时你可以使用delegate()了，代码如下：
```js
$("ul").delegate("li", "click", function(){ $(this).hide(); });
```
- 2、当元素在当前页面中不可用时，可以使用delegate()



## 31、如何用jQuery禁用浏览器的前进后退按钮？
```html
<script type="text/javascript" language="javascript">
  $(document).ready(function() {
    window.history.forward(1);
    //OR window.history.forward(-1);
  });
</script>
```


## 32、jquery中$.get()提交和$.post()提交有区别吗？
相同点：都是异步请求的方式来获取服务端的数据；

异同点：
- 1、请求方式不同：$.get() 方法使用GET方法来进行异步请求的。$.post() 方法使用POST方法来进行异步请求的。
- 2、参数传递方式不同：get请求会将参数跟在URL后进行传递，而POST请求则是作为HTTP消息的实体内容发送给Web服务器的，这种传递是对用户不可见的。
- 3、数据传输大小不同：get方式传输的数据大小不能超过2KB 而POST要大的多
- 4、安全问题： GET 方式请求的数据会被浏览器缓存起来，因此有安全问题。


## 33、jQuery获取的dom对象和原生的dom对象有何区别？
js原生获取的dom是一个对象，jQuery对象就是一个数组对象，其实就是选择出来的元素的数组集合，所以说他们两者是不同的对象类型不等价。
原生DOM对象转jQuery对象：
```js
var box = document.getElementById('box');
var $box = $(box);
```
jQuery对象转原生DOM对象：
```js
var $box = $('#box');
var box = $box[0];
```


## 34、jQuery如何扩展自定义方法
```js
// 方式一
(jQuery.fn.myMethod=function () {
     alert('myMethod');
})
// 方式二：
(function ($) {
    $.fn.extend({
         myMethod : function () {
              alert('myMethod');
         }
    })
})(jQuery)
// 使用
$("#div").myMethod();
```