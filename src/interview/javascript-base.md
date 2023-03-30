# JavaScript基础面试题汇总
## 1、DOMContentLoaded 事件和 Load 事件的区别？
1. 触发时间不同：`DOMContentLoaded`事件在`HTML文档`被完全加载和解析后触发，而`Load`事件在`整个页面及其所有资源`（如图片、样式表、脚本等）都加载完成后触发。
2. 意义不同：`DOMContentLoaded`事件表示`DOM树`已经构建完成，可以进行操作，而`Load`事件则表示整个页面及其所有资源都已经完全加载完成，可以进行一些需要所有资源都准备就绪的操作，例如图像尺寸计算等。
3. 响应速度不同：`DOMContentLoaded`事件响应速度较快，因为它只需要等待`HTML文档`加载和解析完毕即可触发，而`Load`事件需要等待整个页面及其所有资源加载完成后才能触发，因此响应速度较慢。
4. 兼容性不同：`DOMContentLoaded`事件在大多数现代浏览器中都得到支持，而`Load`事件也具有广泛的兼容性，但在某些旧版本浏览器中可能存在兼容性问题。
```html
<h1>DOMContentLoaded和load事件演示</h1>
<p>这是一个简单的演示，展示了在DOM树构建完成和所有资源加载完成时DOMContentLoaded和load事件的触发时间。</p>
<img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg" alt="一棵树">
<script>
  document.addEventListener("DOMContentLoaded", function() {
    console.log("DOMContentLoaded事件: DOMContentLoaded事件触发时间为 " + new Date().getTime());
  });

  window.addEventListener("load", function() {
    console.log("load事件: load事件触发时间为 " + new Date().getTime());
  });
</script>
```
输出结果如下：
```
DOMContentLoaded事件: DOMContentLoaded事件触发时间为 1679649014340
load事件: load事件触发时间为 1679649024547
```
 


## 2、JavaScript 中如何检测一个变量是一个 String 类型？
三种方法（`typeof`、`constructor`、`Object.prototype.toString.call()`）
```js
// typeof
typeof('123') === "string" // true
typeof '123' === "string" // true

// constructor
'123'.constructor === String // true

// Object.prototype.toString.call()：该方法需要先了解call的原理
Object.prototype.toString.call('123') === '[object String]' // true
```


## 3、请用js去除字符串空格？
- 方式一：`str.trim()`，只能去除字符串两端的空格，不能去除中间的空格。
  ```js
  var str = "      xin xiang  ";
  console.log(str.trim()); // xin xiang
  ```
- 方式二：`replace`正则匹配方法，需要了解**正则表达式规则**
  ```js
  let str = '   xin xiang   ';
  console.log('去掉左边空格');
  console.log(str.replace(/^\s*/g, '')); //xin xiang    
  
  console.log('去掉右边空格');
  console.log(str.replace(/\s*$/g, '')); //  xin xiang
  
  console.log('去掉中间空格');
  console.log(str.replace(/[ ]/g,'')); //  xinxiang 
  
  console.log('去掉两端空格');
  console.log(str.replace(/^\s*|\s*$/g, '')); // xin xiang
  
  console.log('去掉全部端空格');
  console.log(str.replace(/\s+/g, '')); // xinxiang
  ```
- 方式三：`str.split(' ').join('')`，清除所有空格
  ```js
  'a b c dd '.split(' ').join('') // abcdd
  ```


## 4、JavaScript是一门怎样的语言，它有什么特点
> 脚本语言。JavaScript 是一种解释型的脚本语言, C、C++等语言先编译后执行, 而 JavaScript 是在程序的运行过程中逐行进行解释。

特点：
- 基于对象。<br>
  JavaScript 是一种基于对象的脚本语言, 它不仅可以创建对象, 也能使用现有的对象。
- 简单。<br>
  JavaScript 语言中采用的是弱类型的变量类型, 对使用的数据类型未做出严格的要求, 是基于 Java 基本语句和控制的脚本语言, 其设计简单紧凑。
- 动态性。<br>
  JavaScript 是一种采用事件驱动的脚本语言, 它不需要经过 Web 服务器就可以对用户的输入做出响应。
- 跨平台性。<br>
  JavaScript 脚本语言不依赖于操作系统, 仅需要浏览器的支持


## 5、== 和 === 的不同
`==`是抽象相等运算符，而`===`是严格相等运算符。`==`运算符是在进行会进行隐式类型转换后，再比较。`===`运算符先判断类型再比较，类型不同直接不相等。使用`==`时，可能发生一些特别的事情，例如：
```js
1 == "1"; // true
1 == [1]; // true
1 == true; // true
0 == ""; // true
0 == "0"; // true
0 == false; // true
```
如果你对`==`和`===`的概念不是特别了解，建议大多数情况下使用`===`。


## 6、事件代理怎么实现？
在元素的父节点注册事件，通过事件冒泡，在父节点捕获事件。


## 7、事件委托是什么？
利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行！
- 那什么样的事件可以用事件委托，什么样的事件不可以用呢？
  - 适合用事件委托的事件：`click`，`mousedown`，`mouseup`，`keydown`，`keyup`，`keypress`。
  - 值得注意的是，`mouseover` 和 `mouseout` 虽然也有事件冒泡，但是处理它们的时候需要特别的注意，因为需要经常计算它们的位置，处理起来不太容易。
  - 不适合的就有很多了，举个例子，`mousemove`，每次都要计算它的位置，非常不好把控，在不如说 `focus`，`blur` 之类的，本身就没用冒泡的特性，自然就不用事件委托了。
- 为什么要用事件委托
  - 提高性能
    ```html
    <ul>
      <li>苹果</li>
      <li>香蕉</li>
      <li>凤梨</li>
    </ul>
    <script>
    // good
    document.querySelector('ul').onclick = (event) => {
      let target = event.target
      if (target.nodeName === 'LI') {
        console.log(target.innerHTML)
      }
    }
    // bad
    document.querySelectorAll('li').forEach((e) => {
      e.onclick = function() {
        console.log(this.innerHTML)
      }
    })
    </script>
    ```
  - 新添加的元素还会有之前的事件
- 事件冒泡与事件委托的对比
  - 事件冒泡：box 内部无论是什么元素，点击后都会触发 box 的点击事件
  - 事件委托：可以对 box 内部的元素进行筛选
- 事件委托怎么取索引？
  ```html
  <ul id="ul">
    <li> aaaaaaaa </li>
    <li> 事件委托了 点击当前， 如何获取 这个点击的下标 </li>
    <li> cccccccc </li>
  </ul>
  ```
  ```js
  window.onload = function() {
    var oUl = document.getElementById("ul");
    var aLi = oUl.getElementsByTagName("li");
    oUl.onclick = function(ev) {
      var ev = ev || window.event;
      var target = ev.target || ev.srcElement;
      if (target.nodeName.toLowerCase() == "li") {
        var that = target;
        var index;
        for (var i = 0; i < aLi.length; i++) {
          if (aLi[i] === target) {
            index = i
          }
        }
        if (index >= 0) alert('我的下标是第' + index + '个');
        target.style.background = "red";
      }
    }
  }
  ```


## 8、事件捕获、事件冒泡、事件委托
DOM事件流指的是事件在DOM结构中传播的过程。当一个元素发生事件时，它的祖先和后代元素也可能会响应同样的事件。事件传播的过程中，有三个阶段：捕获阶段、目标阶段和冒泡阶段。
- 事件捕获: 事件从祖先元素向下传播直到目标元素之前触发。在这一阶段中，事件从顶层元素开始逐级向下，依次经过每个父级元素，直到达到目标元素的父元素为止。
- 目标阶段: 事件到达目标元素，通过执行目标元素上的监听器函数响应事件。
- 冒泡阶段: 事件从目标元素开始向上传播直到顶层元素触发。在这一阶段中，事件从目标元素的父元素开始逐级向上传递至顶层元素，同时依次经过每个父级元素，直到达到顶层元素为止。
![202302272001442.png](http://img.itchenliang.club/img/202302272001442.png)

dom标准事件流的触发的先后顺序为：**先捕获再冒泡**，即当触发dom事件时，会先进行事件捕获，捕获到事件源之后通过事件传播进行事件冒泡。

### 事件捕获
通俗的理解就是，当鼠标点击或者触发dom事件时，浏览器会从根节点开始由**外到内**进行事件传播，即点击了子元素，如果父元素通过事件捕获方式注册了对应的事件的话，会先触发父元素绑定的事件。

### 事件冒泡
与事件捕获恰恰相反，事件冒泡顺序是由**内到外**进行事件传播，直到根节点。

### 事件委托
> 又称`事件代理`，事件委托就是利用事件冒泡，只指定一个事件处理程序，就可以管理某一类型的所有事件。

案例：实现功能是点击li，弹出123，不使用事件委托实现。
```html
<ul id="ul1">
  <li>111</li>
  <li>222</li>
  <li>333</li>
  <li>444</li>
</ul>
```
```js
window.onload = function(){
  var oUl = document.getElementById("ul1");
  var aLi = oUl.getElementsByTagName('li');
  for(var i = 0; i < aLi.length; i++){
    aLi[i].onclick = function(){
      alert(123);
    }
  }
}
```
使用事件委托实现：
```js
window.onload = function(){
  var oUl = document.getElementById("ul1");
  oUl.onclick = function(ev){
    var ev = ev || window.event;
    var target = ev.target || ev.srcElement;
    if(target.nodeName.toLowerCase() == 'li'){
      alert(123);
      alert(target.innerHTML);
    }
  }
}
```

### 经典案例
![202302272024251.png](http://img.itchenliang.club/img/202302272024251.png)

可以看到，上面程序的输出结果：
```
我是 monther
我是 daughter
我是 baby
我是 grandma
```
造成这以结果的原因是：
> `target.addEventListener(type, listener, useCapture)`
> - 参数一：事件类型，比如 click、mouseenter、drag等。
> - 参数二：事件被触发时的回调函数。
> - 参数三：`useCapture`: 默认值为false，表示在冒泡阶段处理事件。**如果为true，则在捕获阶段处理事件**。

前面提到的DOM事件流的执行顺序是**先捕获再冒泡**，所以dom事件流从外向内捕获过程就是`grandma -> monther -> daughter -> baby`，而只有`monther`和`daughter`设置了`useCapture = true`，所以在捕获阶段就先将事件处理了，而`grandma`和`baby`并未设置`useCapture = true`，默认是`false`，而我们又是点击的`baby`所以首先会先处理`baby`目标事件，然后再通过冒泡到`grandma`事件。


## 19、微任务和宏任务
js是一门单线程语言，所以它本身是不可能异步的，但是js的宿主环境（比如浏览器、node）是多线程，宿主环境通过某种方式（事件驱动）使得js具备了异步的属性。而在js中，我们一般将所有的任务都分成两类，一种是**同步任务**，另外一种是**异步**。
> 而在异步任务中，又有着更加细致的分类，那就是`微任务`和`宏任务`。

在事件循环中有两种类型的任务：微任务和宏任务。**在每次事件循环中，先执行所有的微任务，然后再执行一个宏任务。如果在执行过程中出现了新的微任务，会继续执行这些微任务，直到所有微任务执行完成为止，然后才会执行下一个宏任务。**

### 宏任务macrotask
宏任务是指在事件队列中排队等待执行的任务，例如用户交互事件、计时器回调函数等。
- `setTimeout`和`setInterval`
- `I/O操作`（例如读写文件、网络请求等）
- `UI交互事件`（例如点击、滚动等）
- `setImmediate`（Node.js中的宏任务）
- `requestAnimationFrame`（浏览器渲染的宏任务）
- `AJAX请求`、`postMessage`、`MessageChannel`

### 微任务microtask
微任务是指在当前任务执行完成后，在下一个事件循环之前执行的任务，例如Promise的回调函数。
> 微任务通常来说就是需要在当前`同步任务`执行结束后立即执行的任务，比如对一系列动作做出反馈，或者是需要异步的执行任务而又不需要分配一个新的任务，这样便可以减小一点性能的开销。
- `new Promise.then(() => {})`
- `process.nextTick`
- `async/await`
- `MutationObserver(html5 新特性)`

**执行顺序**
```js
// 首先执行的是script任务，也就是全局任务，属于宏任务。
// script任务执行完后，开始执行所有的微任务
// 微任务执行完毕，再取任务队列中的一个宏任务执行
console.log('start');
setTimeout(() => {
  console.log('setTimeout');
}, 0)
new Promise((resolve, reject) => {
  for (var i = 0; i < 5; i++) {
    console.log(i);
  }
  resolve(6); // 修改promise实例对象的状态为成功的状态
}).then((res) => {
  console.log(res);
})
console.log('end');

// start 0 1 2 3 4 end 6 setTimeout
```
从上面结果看出，`start 0 1 2 3 4 end`都是同步代码。同步任务执行完，开始判断微任务是否为空。显然现在还有一个微任务`Promise`，那么开始执行`Promise`，输出6；执行完`Promise`，微任务清空，微任务队列也为空了，然后重新渲染，再次判断任务队列中是否有任务。此时任务队列中有`setTimeout`宏任务，开始执行，于是最后输出`setTimeout`。

**任务关系**
- 宏任务是主流，当js开始被执行的时候，就是开启一个宏任务，在宏任务中执行一条一条的指令，宏任务可以同时拥有多个，但是会按照顺序一个一个执行。
- 每一个宏任务，后面都可以跟着一个微任务队列，如果微任务队列中有指令或者方法，则先执行。如果没有，则开始执行下一个宏任务，知道所有的宏任务执行完毕。


## 9、setTimeout、Promise、async/await 的区别
`setTimeout`、`Promise`、`async/await`是 JavaScript 中常用的异步编程方式，它们之间有以下区别：
- `setTimeout`可以延迟一段时间执行某段函数，是最原始的异步编程方式。而`Promise`和`async/await`则更加高级，允许我们更方便地处理多个异步事件。
- `Promise`是对回调函数的改进，通过`Promise`对象可以更好地控制异步执行状态，避免层层嵌套的回调函数带来的代码难以维护和理解的问题。当 `Promise`对象的状态发生变化时，会触发链式的`then`方法或`catch`方法，便于维护和扩展。
- `async/await`进一步简化了`Promise`的使用，使异步编程更加直观易懂。使用`async/await`，我们可以在函数中以同步的方式编写异步函数，便于代码的编写和阅读。
- 在执行顺序方面，`setTimeout`会将计时器事件放入任务队列的末尾，等待`JavaScript`执行栈上的所有任务完成后才开始执行。而`Promise`和`async/await`在有了结果之后，会在当前事件循环的下一个任务队列上执行。

### setTimeout
```js
console.log('script start') //1. 打印 script start

setTimeout(function() {
  console.log('settimeout') // 4. 打印 settimeout
}) // 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数

console.log('script end') //3. 打印 script start

// 输出顺序：
// ->script start
// ->script end
// ->settimeout
```

### Promise
`Promise`本身是同步的立即执行函数， 当在`executor`中执行`resolve`或者`reject`的时候, 此时是异步操作，会先执行`then/catch`等，当主栈完成后，才会去调用`resolve/reject`中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。
```js
console.log('normal')
setTimeout(() => {
  console.log('setTimeout1')
})
let promise1 = new Promise((resolve) => {
  console.log('promise1')
  resolve()
  console.log('promise1 end')
}).then(function() {
  console.log('promise2')
})
setTimeout(function() {
  console.log('settimeout2')
})
console.log('normal end')
// 输出顺序: 
// normal
// promise1
// promise1 end
// normal end
// promise2
// settimeout1
// settimeout2
```
原因解释:
1. 第一步输出`normal`，表示首先执行了同步代码中的`console.log('normal')`。
2. 接着执行`console.log('promise1')`，输出`promise1`，然后紧接着执行`resolve()`，再输出`promise1 end`。此处的`Promise`是同步代码，因此是立即执行的。
3. 由于`Promise.then`方法是`微任务(microtasks)`，因此不会马上执行，等到`main`函数中的同步代码执行完毕，会先把`Promise`中的回调函数取出来执行，输出`promise2`。
4. 紧接着`Promise`的回调函数执行完毕，执行`setTimeout1`，输出`setTimeout1`。因为`setTimeout`中的回调函数属于`宏任务(macrotasks)`，所以会在主线程的同步任务和`Promise`的微任务执行完之后，在下一个事件循环中执行。
5. 执行完`setTimeout1`，马上执行`setTimeout`中的回调函数，输出`settimeout2`。

总结：**`Promise`中的`then`方法中的回调函数是微任务，在主线程同步任务执行完后依次执行。`setTimeout`属于宏任务，会在主线程的同步任务和 `Promise`的微任务执行完之后，在下一个事件循环中执行，并且`setTimeout`队列里面的回调函数也是按照先后顺序执行的。**

### async/await
```js
async function async1() {
  console.log('async1 start');
  await async2(); // 等待async2()完成，此时会继续执行主程序，输出script end，等async2()完成后，再回到async1()中继续执行剩下的代码
  console.log('async1 end')
}
async function async2() {
  console.log('async2')
}
console.log('script start');
async1();
console.log('script end')

// 输出顺序：
// script start
// async1 start
// async2
// script end
// async1 end
```
解释如下:
1. 首先，打印`"script start"`。
2. 然后，调用`async1()`函数并执行其中的代码。打印`"async1 start"`。
3. 在`async1()`函数中，遇到了一个`await`表达式，暂停当前函数的执行，等待`async2()`函数的完成。于是进入`async2()`函数，打印`"async2"`。
4. 回到主程序中，打印`"script end"`。
5. `async1()`函数执行完毕，继续执行主程序，打印`"async1 end"`。

`async`函数返回一个`Promise`对象，当函数执行的时候，一旦遇到`await`就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。
> 可以理解为，是让出了线程，跳出了`async`函数体。
```js
// 举个例子
async function func1() {
  return 1
}
console.log(func1())
```
控制台查看打印，很显然，`func1`的运行结果其实就是一个`Promise`对象。因此我们也可以使用`then`来处理后续逻辑。
```js
func1().then(res => {
  console.log(res); // 30
})
```
`await`的含义为等待，也就是`async`函数需要等待`await`后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。`await`通过返回一个`Promise`对象来实现同步的效果。


## 29、`setTimeout`和`setImmediate`以及`process.nextTick`的区别
### setTimeout()
`setTimeout()`只是将事件插入了"任务队列"，必须等到当前代码（执行栈）执行完，主线程才会去执行它指定的回调函数。要是当前代码耗时很长，有可能要等很久，所以并没有办法保证，回调函数一定会在`setTimeout()`指定的时间执行。
```js
setTimeout(function(){
  console.log('0')
}, 0);// 意思是回调函数加入事件队列的队尾，主线程和事件队列的函数执行完成之后立即执行定时器的回调函数，如果定时器的定时是相同的，就按定时器回调函数的先后顺序来执行。
console.log(1);
setTimeout(function(){
  console.log(2);
}, 1000);
setTimeout(function(){
  console.log(4);
}, 1000);
console.log(3);
//1 3 0 2 4
```

### setImmediate()
`setImmediate()`是将事件插入到事件队列尾部，主线程和事件队列的函数执行完成之后立即执行`setImmediate`指定的回调函数，和`setTimeout(fn,0)`的效果差不多，但是当他们同时在同一个事件循环中时，执行顺序是不定的。
```js
console.log('1');

setImmediate(function () {
  console.log('2');
});

setTimeout(function () {
  console.log('3');
}, 0);

process.nextTick(function () {
  console.log('4');
});
//1 4 2 3也可能是1 4 3 2
```

### process.nextTick()
`process.nextTick()`方法可以在当前"执行栈"的尾部-->下一次Event Loop（主线程读取"任务队列"）之前-->触发process指定的回调函数。也就是说，它指定的任务总是发生在所有异步任务之前，当前主线程的末尾。（nextTick虽然也会异步执行，但是不会给其他io事件执行的任何机会）
```js
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){
    console.log(2);
  });
});

setTimeout(function C() {
  console.log(3);
}, 0)
// 1
// 2
// 3
```
当然这样也是一样的：
```js
setTimeout(function C() {
    console.log(3);
}, 0)
process.nextTick(function A() {
  console.log(1);
  process.nextTick(function B(){
    console.log(2);
  });
});
// 1
// 2
// 3
```
当然这样还是一样的：
```js
setTimeout(function C() {
  console.log(3);
}, 0)
process.nextTick(function A() {
  process.nextTick(function B(){
    console.log(2);
  });
  console.log(1);
});
// 1
// 2
// 3
```
最后`process.maxTickDepth()`的缺省值是1000，如果超过会报`exceed callback stack`。官方认为在递归中用`process.nextTick`会造成饥饿`event loop`，因为`nextTick`没有给其他异步事件执行的机会，递归中推荐用`setImmediate`
```js
foo = function(bar) {
  console.log(bar);
  return process.nextTick(function() {
    return f(bar + 1);
  });
};
setImmediate(function () {
  console.log('1001');
});
foo(1);//注意这样不会输出1001，当递归执行到1000次是就会报错exceed callback stack，
/*
foo = function(bar) {
    console.log(bar);
　　 if(bar>1000){
      return;
    }
    return process.nextTick(function() {
                return f(bar + 1);
    });
};
setImmediate(function () {
      console.log('1001');
});
foo(1);
*/
```


## 9、JS运行机制（Event Loop）
在主线程上执行的代码会形成一个执行栈。当调用一个异步函数时，它会被放入任务队列中，等待主线程的执行栈中的所有代码执行完成后才会被执行。一旦主线程的执行栈为空，事件循环就会从任务队列中取出一个待执行的任务，并将其放入执行栈中，开始执行相应的代码。


## 10、JavaScript 继承的方式和优缺点
### 10.1、原型链继承
原型链继承是指子类通过将自己的原型对象指向父类的实例来实现继承。
> 这种方式简单易懂，但是存在一些问题，如父类属性被所有子类共享、不能传递参数等。
```js
function Animal() {
  this.type = 'animal';
}
Animal.prototype.say = function() {
  console.log('I am an animal.');
};

function Cat() {}
Cat.prototype = new Animal();

var cat = new Cat();
console.log(cat.type); // 'animal'
cat.say(); // 'I am an animal.'
```

### 10.2、构造函数继承
构造函数继承是指在子类中调用父类的构造函数，使用`call`或`apply`方法来继承父类的属性和方法。
> 但是，这种方式也存在问题，如无法继承父类的原型对象上的属性和方法。
```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.say = function() {
  console.log('I am a ' + this.type + '.');
};

function Cat(type) {
  Animal.call(this, type);
}
var cat = new Cat('cat');
console.log(cat.type); // 'cat'
cat.say(); // TypeError: cat.say is not a function
```

### 10.3、组合继承
组合继承结合了原型链继承和构造函数继承的优点，既可以继承父类的属性和方法，又可以继承父类原型上的属性和方法，同时还可以向父类传递参数。
```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.say = function() {
  console.log('I am a ' + this.type + '.');
};

function Cat(type) {
  Animal.call(this, type);
}
Cat.prototype = new Animal();
var cat = new Cat('cat');
console.log(cat.type); // 'cat'
cat.say(); // 'I am a cat.'
```

### 10.4、寄生组合式继承
寄生组合式继承是对组合继承的改进，避免了重复调用父类构造函数的问题，提高了效率。
```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.say = function() {
  console.log('I am a ' + this.type + '.');
};

function Cat(type) {
  Animal.call(this, type);
}
// 使用 Object.create 创建一个中间对象，将其原型指向 Animal.prototype，
Cat.prototype = Object.create(Animal.prototype);
// 修复constructor的指向
Cat.prototype.constructor = Cat;

var cat = new Cat('cat');
console.log(cat.type); // 'cat'
cat.say(); // 'I am a cat.'
```

### 10.5、class 继承
ES6 中引入了`class`关键字，可以更方便地实现继承。`class`继承本质上仍然是基于原型链的继承，只是语法更加简洁易懂。
```js
class Animal {
  constructor(type) {
    this.type = type;
  }
  say() {
    console.log(`I am a ${this.type}.`);
  }
}

class Cat extends Animal {
  constructor(type) {
    super(type);
  }
}
let cat = new Cat('cat');
console.log(cat.type); // 'cat'
cat.say(); // 'I am a cat.'
```

### 10.6、拷贝继承
对父类实例中的的方法与属性拷贝给子类的原型
```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.say = function() {
  console.log('I am a ' + this.type + '.');
};

function Cat(type, name) {
  const animal = new Animal()
  for (let key in animal) {
    Cat.prototype[key] = animal[key]
  }
  this.type = type
  this.name = name
}
var cat = new Cat('cat', '小喵');
console.log(cat.type, cat.name); // 'cat'，小喵
cat.say(); // 'I am a cat.'
```

### 10.7、实例继承
为父类实例添加新特征，作为子类实例返回
```js
function Animal(type) {
  this.type = type;
}
Animal.prototype.say = function() {
  console.log('I am a ' + this.type + '.');
};

function Cat(type, name) {
  const animal = new Animal()
  animal.type = type
  animal.name = name
  return animal
}

var cat = new Cat('cat', '小喵');
console.log(cat.type, cat.name); // 'cat'，小喵
cat.say(); // 'I am a cat.'
```

## 11、什么是原型链？
原型链就是实例对象和原型对象之间的链接，每一个对象都有原型，原型本身又是对象，原型又有原型，以此类推形成一个链式结构称为原型链
> 通过一个对象的`__proto__`可以找到它的原型对象，原型对象也是一个对象，就可以通过原型对象的`__proto__`，最后找到了我们的 `Object.prototype`, 从实例的原型对象开始一直到 `Object.prototype` 就是我们的原型链。

![2023021413594110.png](http://img.itchenliang.club/img/2023021413594110.png)
![202302141359533.png](http://img.itchenliang.club/img/202302141359533.png)


## 12、`prototype`、`__proto__`与`constructor`的关系
- `__proto__`被称为隐式原型
- `prototype`被称为显式原型
- **实例属性**: 指的是在构造函数方法中定义的属性和方法，每一个实例对象都独立开辟一块内存空间用于保存属性和方法。
- **原型属性**: 指的是用于创建实例对象的构造函数的原型的属性，每一个创建的实例对象都共享原型属性。
- **实例对象**: 通过构造函数的`new`操作创建的对象是实例对象。
- **原型对象**: 构造函数有一个`prototype`属性，指向实例对象的原型对象。

::: tip 1. 构造函数
<span style="color: red">构造函数: 用来初始化新创建的对象的函数。</span>

```js
function Foo(){};
var f1 = new Foo;
```
在例子中，`Foo()`函数是构造函数。
:::

::: tip 2. 实例对象
<span style="color: red">通过构造函数的<code>new</code>操作创建的对象是实例对象。</span>
> 可以用一个构造函数，构造多个实例对象

```js
function Foo(){};
var f1 = new Foo;
var f2 = new Foo;
console.log(f1 === f2);//false
```
:::

::: tip 3. 原型对象及prototype
<span style="color: red">构造函数有一个<code>prototype</code>属性，指向实例对象的原型对象。</span>
> **通过同一个构造函数实例化的多个对象具有相同的原型对象**。经常使用原型对象来实现继承。

```js
function Foo(){};
Foo.prototype.a = 1;
var f1 = new Foo;
var f2 = new Foo;

console.log(Foo.prototype.a); // 1
console.log(f1.a); //1
console.log(f2.a); // 1
console.log(f1.__proto__ === f2.__proto__) // true
```
:::

::: tip 4. constructor
<span style="color: red">原型对象有一个<code>constructor</code>属性，指向该原型对象对应的构造函数</span>

```js
function Foo(){};
console.log(Foo.prototype.constructor === Foo);//true
```
由于实例对象可以继承原型对象的属性，所以实例对象也拥有`constructor`属性，同样指向原型对象对应的构造函数
```js
function Foo(){};
var f1 = new Foo;
console.log(f1.constructor === Foo);//true
```
:::

::: tip 5. proto
<span style="color: red">实例对象有一个<code>__proto__</code>属性，指向该实例对象对应的原型对象。</span>

```js
function Foo(){};
var f1 = new Foo;
console.log(f1.__proto__ === Foo.prototype);//true
```
:::

### `__proto__`隐式原型
ES5使用`Object.getPrototypeOf()`方法来获取实例对象的原型对象。
```js
function Demo() {}
const demo = new Demo()
Object.getPrototypeOf(demo) === Demo.prototype // true
```
**一个对象的隐式原型指向该实例对象对应的原型对象(一个对象的隐式原型指向创建这个对象的函数的显式原型)**，这也保证了实例对象能够访问在构造函数原型中定义的属性和方法。
> 作用：构成原型链，同样用于实现基于原型的继承。

例子：当我们访问`obj`这个对象中的`x`属性时，如果在`obj`中找不到，那么就会沿着`__proto__`依次查找，直到最顶层，如果最顶层还未查找到则返回`undefined`。
```js
function Animal (name, age) {
  this.name = name
  this.age = age
}
const animal = new Animal('小三', 4)
console.log(animal.x) //undefined
Object.prototype.x = '123'
console.log(animal.x) // 123
```
> `Object.prototype`这个对象是个例外，它的`__proto__`值为`null`
```js
// ES5
function Animal (name, age) {
  this.name = name
  this.age = age
}
const animal = new Animal('小灰', 2)
console.log(animal.__proto__ === Animal.prototype) // true

// ES6
class Dog {
  constructor (name, age) {
    this.name = name
    this.age = age
  }
}
const dog = new Dog('小强', 3)
console.log(dog.__proto__ === Dog.prototype) // true
```

### `prototype`显式原型
每一个函数在创建之后都会拥有一个名为`prototype`的属性，这个属性指向函数的原型对象。
> 作用：用来实现基于原型的继承与属性的共享。

> 通过`Function.prototype.bind`方法构造出来的函数是个例外，它没有`prototype`属性。
```js
function Animal (name, age) {
  this.name = name
  this.age = age
}
console.log(Animal.prototype) // {}
Animal.prototype.x = '123'
Animal.prototype.getX = function () {
  return this.x
}
console.log(Animal.prototype) // { x: '123', getX: [Function (anonymous)] }

const animal = new Animal('小三', 4)
console.log(animal.getX()) // 123
```


## 13、JS 块级作用域、变量提升、var、let、const的区别
> 作用域指的是变量和函数在代码中可见性和访问性的范围。即作用域指的是变量的可见区域

### 13.1、作用域
JS 中作用域有：**全局作用域**、**函数作用域**、**块级作用域**(ES6新增)。
> 块作用域由`{ }`包括，`if`语句和`for `语句里面的`{ }`也属于**块作用域**。

#### 全局作用域
- 全局作用域在网页运行时创建，在网页关闭时销毁
- 直接写到script标签中的代码都在全局作用域中
- 全局作用域中的变量是全局变量，可在任意地方访问
```js
let a = 9
console.log(a) // 9

for (let i = 0; i < 2; i++) {
  console.log(a, i) // 9 0, 9 1
}

function demo () {
  console.log(a) // 9
}
```

#### 局部作用域
**函数作用域**: 指在函数内部声明的变量，在`函数内部`和`函数内部声明的函数`中都可以访问到。
- 函数作用域在函数调用时创建，调用结束后销毁
- 函数每一次调用都会产生一个全新的函数作用域，它们都是独立的，互不影响
- 在函数作用域中声明的变量只能在块函数内部访问，外部访问不了
```js
let a = 9
console.log(a) // 9

function demo () {
  let a = 10
  console.log(a) // 10
  console.log(b) // Uncaught ReferenceError: b is not defined
  return function test () {
    let b = 3
    console.log(a) // 10
    console.log(b) // 3
  }
}
demo()()
```

**块级作用域**(es6): 
- 使用let/const关键字创建的变量都具有块级作用域。
- 块级作用域的变量只有在语句块内可以访问。所谓语句块就是用`{ }`包起来的区域。
- 块级作用域有几个特性：`不存在变量提升`、`暂时性死区`、`不允许重复声明`。
  - 什么是暂时性死区呢？<br>
    只要块级作用域内存在`let`命令，它所声明的变量就绑定了这个区域，不再受外部影响。在代码块内，使用`let`命令声明函数之前，该变量都是不可用的，这在语法上称为`“暂时性死区”`。
    ```js
    var tmp = 123;
    if (true) {
      tmp = 'abc'; // Uncaught ReferenceError: Cannot access 'tmp' before initialization
      let tmp;
    }
    ```
- 通过`var`定义的变量可以跨块级作用域，而不能跨函数作用域
  ```js
  // if语句和for语句中用var定义的变量可以在外面访问到，
  // 可见，if语句和for语句属于块作用域，不属于函数作用域。
  f (true) {
    var c = 3;
  }
  console.log(c); // 3
  for (var i = 0; i < 4; i++) {
    var d = 5;
  };
  console.log(i); // 4  (循环结束i已经是4，所以此处i为4)
  console.log(d); // 5
  ```
- 子作用域可以访问到父作用域的变量
  ```js
  // 子作用域可以访问到父作用域的变量
  function demo() {
    var a = 1
    let b = 2
    const c = 3
    test()
    function test () {
      console.log(a)
      console.log(b)
      console.log(c)
    }
  }
  demo()

  // 特殊案例
  // 子作用域可以访问到父作用域的变量
  function demo() {
    if (true) {
      var a = 1
      let b = 2
      const c = 3
    }
    console.log(a)
    console.log(b) // Uncaught ReferenceError: b is not defined
    console.log(c) // Uncaught ReferenceError: c is not defined
  }
  demo()
  ```

### 13.2、变量提升
JS在执行之前，会先进行预编译，主要做两个工作(这就是变量提升)：
1. 将全局作用域或者函数作用域内的所有函数声明提前
2. 将全局作用域或者函数作用域内的所有`var`声明的变量提前声明，并且复制`undefined`

- **变量的提升**<br>
  使用`var`声明的变量，它会在所有代码执行前被声明，所以我们可以在变量声明前就访问变量，此时的值为`undefined`
  ```js
  console.log(a) // undefined
  var a = 1
  console.log(a) // 1

  // 等价于
  var a = undefined
  console.log(a)
  a = 1
  console.log(a)
  ```
  从下面例子可以看出：通过`var`定义的变量可以跨块作用域访问到。
  ```js
  if (true) {
    var a = 1
    console.log(a) // 1
  }
  console.log(a) // 1

  // 等价于
  var a = undefined
  if (true) {
    a = 1
    console.log(a)
  }
  console.log(a)
  ```
  从下面例子可以看出：通过`var`定义的变量不能跨函数作用域访问到。
  ```js
  (() => {
    var a = 1 // Uncaught ReferenceError: a is not defined
  })();
  console.log(a)
  ```
- **函数的提升**<br>
  使用函数声明创建的函数`function fn(){  }`，会在其他代码执行前先执行，所以我们可以在函数声明前调用函数。
  ```js
  demo()
  function demo () {
    console.log('aa') // aa
  }
  ```
  注意：
    - 函数声明可以提升，但是函数表达式不提升，具名的函数表达式的标识符也不会提升。
    - 同名的函数声明，后面的覆盖前面的
    - 函数声明的提升，不受逻辑判断的控制
    ```js
    // 函数表达式和具名函数表达式标识符都不会提升
    test(); // TypeError test is not a function
    log(); // TypeError log is not a function
    var test = function log() {
      console.log('test')
    }

    // 同名函数声明，后面的覆盖前面的
    test(); // 2
    function test() {
      console.log(1);
    }
    function test() {
      console.log(2);
    }

    // 函数声明的提升，不受逻辑判断的控制
    // 注意这是在ES5环境中的规则，在ES6中会报错
    function test() {
      log();
      if (false) {
        function log() {
          console.log('test');
        }
      }
    }
    test(); // 'test'
    ```
  <span style="color: red;">在块级作用域中声明函数会是什么效果呢？</span><br>
  ES6环境中，如果在语句块中声明函数，按照正常的规范，函数声明应该被封闭在语句块里面，但是为了兼容老代码，因此语法标准允许其他的实现：
    - 允许在块级作用域内声明函数。
    - 函数声明类似于var，即会提升到全局作用域或函数作用域的头部。
    - 同时，函数声明还会提升到所在的块级作用域的头部。
    ```js
    /**
     * 简单例子
     */
    f()
    function f(flag) {
      console.log('I am outside!'); // I am outside!

      demo()
      if (flag) {
        function demo () {
          console.log('I am inside!') // Uncaught TypeError: demo is not a function
        }
      }
    }

    /**
     * 同名例子
     */
    function f() {
      console.log('I am outside!');
    }
    (function () {
      if (false) {
        // 重复声明一次函数f
        function f() {
          console.log('I am inside!');
        }
      }
      f(); // Uncaught TypeError: f is not a function
    }());

    // 等价于
    function f() {
      console.log('I am outside!');
    }
    (function () {
      var f = undefined;
      if (false) {
        function f() {
          console.log('I am inside!');
        }
      }
      f(); // Uncaught TypeError: f is not a function
    }());
    ```

### 13.3、var、let、const 的区别
- var 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。`var`可以重复定义同一个变量，效果是重复赋值。
  ```js
  var a = 1
  var a = 2
  console.log(a) // 2
  ```
- let 定义的变量，具有块级作用域，函数内部使用let定义后，对函数外部无影响，不能跨函数访问。`let`定义的变量不能重复定义同一个变量。
  ![202302281614171.png](http://img.itchenliang.club/img/202302281614171.png)
- const 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且定义之后是不允许改变的。
  ![202302281612254.png](http://img.itchenliang.club/img/202302281612254.png)
- 同一个变量只能使用一种方式声明，不然会报错
  ```js
  var a = 1
  let a = 2 // Uncaught SyntaxError: Identifier 'a' has already been declared
  console.log(a)
  ```
- var定义的全局变量会挂载到window对象上，使用window可以访问，let定义的全局变量则不会挂载到window对象上
  ```js
  var a = 1
  console.log(window.a)
  ```


## 13、说说你对作用域链的理解
作用域链，用于解释代码中变量的访问规则。
> 当代码在作用域内访问一个变量时，JavaScript 引擎会先在当前作用域内查找该变量，如果找不到，就会逐级向上查找直到全局作用域，这个查找的过程就是**作用域链**，又称**变量查找的机制**。

作用域链的作用: 保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到`window`对象即被终止，作用域链向下访问变量是不被允许的。
```js
var a = 11
function demo () {
  let a = 1
  console.log(a)
}
demo() // 1
```
上面例子中，在`demo`中输出了变量`a`，首先会在`demo`的函数作用域找是否存在变量`a`，找到了就返回了变量`a`的值`1`。
```js
var a = 11
function demo () {
  console.log(a)
}
demo() // 11
```
上面例子中，在`demo`中输出了变量`a`，首先会在`demo`的函数作用域找是否存在变量`a`，没有找到，就向上级作用域(此处为全局作用域)查找，找到了就反悔了变量`a`的值`11`。
```js
function demo () {
  console.log(a)
}
demo() // Uncaught ReferenceError: a is not defined
```
上面例子中，同样首先在`demo`函数作用域查找变量`a`，没有找到，然后向上级作用域(全局作用域)查找没有找到，就会报`Uncaught ReferenceError: a is not defined`错。


## 13、什么是属性搜索原则？
1. 首先会去查找对象本身上面有没有这个属性，有的话，就返回这个属性
2. 如果对象本身上面没有这个属性，就到它的原型上面去查找，如果有，就返回
3. 然后又在原型的原型上面去查找有没有这个属性，如果查找到最后(`Object.prototype`)一直没有找到，就返回一个`undefined`


## 13、JavaScript中执行上下文和执行栈是什么？
### 执行上下文
在 JavaScript 中，执行上下文是指代码执行时的环境。每当 JavaScript 引擎需要执行一段代码时，就会创建一个对应的执行上下文，并将其放入执行上下文栈 (Execution Context Stack) 中。当这个执行上下文执行完成后，它会从栈中弹出，控制权再次回到上一个执行上下文。

执行上下文通常包括以下三个组成部分：
1. 变量对象(Variable Object)：用于存储当前环境中定义的变量和函数声明。
2. 作用域链(Scope Chain)：由词法作用域决定，用于解析变量和函数的访问权限。
3. this值：用于存储当前函数的上下文对象。

执行上下文可以分为三种类型：
- 全局执行上下文：整个 JavaScript 代码的默认环境，由 JavaScript 引擎自动创建。
- 函数执行上下文：每当一个函数被调用时，都会创建一个对应的函数执行上下文。
- Eval执行上下文：在`eval()`函数中运行的代码块会在`eval`执行上下文中执行。

**执行上下文包含以下三个重要的属性：**
- 变量对象（Variable Object）：存储变量、函数声明和函数参数等信息。
- 作用域链（Scope Chain）：由当前执行上下文的变量对象和所有父级执行上下文变量对象的链式结构，用于实现词法作用域。
- this指向：表示当前函数执行的上下文对象。

注意: 执行上下文是按照执行顺序逐层压入执行栈中的，栈顶的执行上下文表示当前正在执行的代码块。当代码块执行完成后，该执行上下文将从栈中弹出，控制权返回到上一级执行上下文。

### 执行栈
执行栈（Execution Stack），也称为调用栈（Call Stack），是一种后进先出（LIFO）的数据结构，用于存储代码执行时创建的所有执行上下文。
> 每当一个函数被调用时，都会创建一个新的执行上下文，并将其压入执行栈的顶部。当该函数执行完成后，其对应的执行上下文将从栈中弹出，控制权返回到当前执行上下文的下一个语句。

例如，以下代码示例演示了执行栈中的执行顺序：
```js
function add(a, b) {
  return a + b;
}
function multiply(a, b) {
  return a * b;
}
const result = multiply(3, add(2, 4));
console.log(result); // 输出 18
```
- 在上述代码中，当`multiply`函数被调用时，会创建一个新的执行上下文并压入执行栈的顶部；接着，当`add`函数被调用时，也会创建一个新的执行上下文并压入执行栈的顶部。
- 当`add`函数执行完成后，其对应的执行上下文将从栈中弹出，控制权返回到`multiply`函数，继续执行剩余的代码。当`multiply`函数执行完成后，其对应的执行上下文也将从栈中弹出，最终代码执行完毕，执行栈为空。


## 14、javascript 的 typeof 返回哪些数据类型
7 种分别为`string`、`boolean`、`number`、`object`、`function`、`undefined`、`symbol(ES6)`。
1. number
  ```js
  typeof(10);
  typeof(NaN); // NaN在JavaScript中代表的是特殊非数字值,它本身是一个数字类型。
  typeof(Infinity)
  ```
2. boolean
  ```js
  typeof(true);
  typeof(false);
  ```
3. string
  ```js
  typeof("abc");
  ```
4. undefined
  ```js
  typeof(undefined);
  typeof(a); // 不存在的变量
  ```
5. object
  ```js
  // 对象，数组，null返回object
  typeof(null);
  typeof(window);
  ```
6. function
  ```js
  typeof(Array);
  typeof(Date);
  ```
7. symbol
  ```js
  typeof Symbol() // ES6提供的新的类型
  ```


## 15、列举 3 种强制类型转换和 2 种隐式类型转换
- 强制类型转换: 与隐式类型转换相反，强制类型转换需要手动进行，强制类型转换主要是通过调用全局函数来实现的，例如`Number()、Boolean()、parseInt()、parseFloat()`等。
  ```js
  Number("10.5") // 10.5
  Number("10.5a") // NaN
  Number(true) // 1
  Number(false) // 0
  Number(null) // 0

  parseInt("123") // 123
  parseInt('12b3') // 12

  parseFloat("+3.12") // 3.12
  parseFloat("-3.12") // -3.12
  parseFloat(".12") // 0.12
  ```
- 隐式类型转换: 表达式中包含以下运算符时，会发生隐式类型转换
  - 算术运算符: `+`(加)、`-`(减)、`*`(乘)、`/`(除)、`%`(取模)
  - 逻辑运算符: `&&`(逻辑与)、`||`(逻辑或)、`!`(逻辑非)
  - 字符串运算符: `+`、`+=`
  ```js
  '3' - 2 //  1
  '3' + 2 // 32
  3 + '2' // 32
  3 - '2' // 1
  '3' * '2' // 6
  '10' / '2' // 5
  1 + true // 2
  1 + false // 1
  1 + undefined // NaN
  3 + null // 3
  '3' + null // 3null
  true + null // 1
  true + undefined // NaN
  ```


## 16、你对闭包的理解？优缺点？
闭包是指在一个函数内部定义的函数，它可以访问外部函数作用域中的变量和参数，并保持对这些变量和参数的引用，即使外部函数已经返回。
> **闭包就是能够读取其他函数内部变量的函数**。所谓闭包，要拆成闭和包，闭指代不想暴露给外部的数据，包指代将数据打包出去暴露给外部。

在javascript中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“**定义在一个函数内部的函数**”。

### 16.1、闭包理解
要理解闭包，首先必须理解Javascript特殊的变量作用域。变量的作用域无非就是两种：**全局变量和局部变量**。

我们来看下最简单的闭包：
```js
var local = '变量'
function foo () {
  console.log(local)
}
foo() // 变量
```
其实这就是一个闭包：**「函数」和「函数内部能访问到的变量」的总和，就是一个闭包**<br>
有的同学就疑惑了，闭包这么简单么？听说**闭包是需要函数套函数，然后`return`一个函数的呀**，比如：
```js
function foo(){
  var local = 1
  function bar(){
    console.log(++local)
  }
  return bar
}
const func = foo()
func()
```
这里面确实有闭包，**local变量和bar函数就组成了一个闭包（Closure）**

### 16.2、闭包的用途
闭包可以用在许多地方，但是它的最大用处有两个：
- 1、一个是前面提到的可以读取函数内部的变量；
- 2、另一个就是让这些变量的值始终保持在内存中；

变量的值始终保存在内存中和读取函数内部的变量演示：
```js
function demo () {
  let x = 1
  return function increment () {
    var y = 0
    console.log(++x)
    console.log(++y)
  }
}
const fn = demo()
fn() // 2 1
fn() // 3 1
fn() // 4 1
```
上面例子中，变量`x`的值始终保存在内存中，并且我们在`increment`函数中，确实也读取到了`demo`函数中的变量。


### 16.3、使用闭包的注意点
- 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。
  > 解决方法: 在退出函数之前，将不使用的局部变量全部删除。
- 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

### 16.4、思考题
**思考题一**
```js
var name = "The Window"
var object = {
  name: "My Object",
  getNameFunc: function () {
    return function () {
      return this.name
    }
  }
}
console.log(object.getNameFunc()())
```
上面输出`The Window`，为什么呢？
> 因为`object.getNameFunc()()`其实等价于下面两行代码
  ```js
  var result = object.getNameFunc() // 全局定义的变量其实就挂载在window对象上
  console.log(result()) // 谁调用this就指向谁
  ```

**思考题二**
```js
var name = "The Window"
var object = {
  name: "My Object",
  getNameFunc: function () {
    var that = this
    return function () {
      return that.name
    }
  }
}
console.log(object.getNameFunc()())
```
上面代码输出`My Object`，为什么呢？
> 因为这里的`var that = this`，此时的`this`就是我们的`object`，然后由于闭包会使得这些变量的值始终保持在内存中，所以当再次访问的时候`that`还是指向`object`，所以就输出`My Object`了。

### 16.5、优缺点
优点：
- 希望一个变量长期存储在内存中。
- 避免全局变量的污染。
- 私有成员的存在。

缺点：
- 常驻内存，增加内存使用量。
- 使用不当会很容易造成内存泄露。


## 17、如何判断 NaN
**方式一：`isNaN(NaN)`方法**
```js
let a = 1
let b = NaN
console.log('数字a:', typeof a, isNaN(a)) // 数字a: number false
console.log('数字b:', typeof(b), isNaN(b)) // 数字b: number true
```
使用`isNaN()`函数只能判断变量是否非数字，而无法判断变量值是否为`NaN`，于是可以使用方式二。

**方式二：`NaN`的非自反特性**
> 利用`NaN`的性质(非自反: 即`NaN`与谁都不相等，包括它本身)
```js
NaN === NaN // false，永远返回false

let a = NaN
a === a // false
a !== a // true
```
所以想要判断变量值是否为`NaN`，就能使用`===`判断变量是否为`NaN`。只需判断**变量是否与自身相等，若不等的情况，该变量的值即为`NaN`**。


## 18、isNaN 和 Number.isNaN 函数的区别？
函数 `isNaN` 接收参数后，会尝试将这个参数转换为数值，任何不能被转换为数值的的值都会返回 true，因此非数字值传入也会返回 true ，会影响 NaN 的判断。
```js
isNaN(1) // false
isNaN('aaaa') // true
isNaN('1') // false
isNaN(NaN) // true
```
函数 `Number.isNaN` 会首先判断传入参数是否为数字，如果是数字再继续判断是否为 NaN ，这种方法对于 NaN 的判断更为准确。
```js
Number.isNaN(1) // false
Number.isNaN('aaaa') // false
Number.isNaN('1') // false
Number.isNaN(NaN) // true
```
区别：
- `isNaN`方法首先转换类型，而`Number.isNaN`方法不用；
- `isNaN`不能用来判断是否严格等于NaN，`Number.isNaN`方法可用;


## 19、for in、for of、for 和 forEach 的区别
- 1、`for ... in` 和`for ... of`都可以循环数组
  - `for ... in`输出的是数组的`index`下标
  - `for ... of`输出的是数组的每一项的值
```js
const arr = [1,2,3,4]

// for ... in
for (const key in arr) {
  console.log(key) // 输出 0,1,2,3
}
// for ... of
for (const key of arr) {
  console.log(key) // 输出 1,2,3,4
}
```
- 2、`for ... in`可以遍历对象，`for ... of`不能遍历对象，只能遍历带有`iterator`接口的，例如`Set,Map,String,Array`
```js
const obj = {
  a: 1,
  b: 2,
  c: 3
}
for (let i in obj) {
  console.log(i)    //输出 ： a   b  c
}
for (let i of obj) {
  console.log(i)    //输出： Uncaught TypeError: obj is not iterable 报错了
}
```
- 3、`forEach`对数组的每一个元素执行一次提供的函数（**不能使用`return`、`break`等中断循环**），不改变原数组，无返回值。
  ```js
  let arr = ['a', 'b', 'c', 'd']
  arr.forEach(function (val, idx, arr) {
    console.log(val + ', index = ' + idx) // val是当前元素，index当前元素索引，arr数组
    console.log(arr)
  })
  // 输出结果
  // a, index = 0
  // (4) ["a", "b", "c", "d"]
  // b, index = 1
  // (4) ["a", "b", "c", "d"]
  // c, index = 2
  // (4) ["a", "b", "c", "d"]
  // d, index = 3
  // (4) ["a", "b", "c", "d"]
  ```
- 4、`for循环`除了上三种方法以外还有一种最原始的遍历，自Javascript诞生起就一直用的，就是`for循环`，它用来遍历数组。**for循环中可以使用`return`、`break`等来中断循环**
  ```js
  var arr = [1,2,3,4]
  for(var i = 0 ; i< arr.length ; i++){
    console.log(arr[i])
  }
  ```


## 20、for ... in、Object.keys 和 Object.getOwnPropertyNames 对属性遍历有什么区别？
- `for ... in`会遍历**自身及原型链**上的**可枚举属性**
- `Object.keys`会将对象**自身**的**可枚举属性**的 key 输出
- `Object.getOwnPropertyNames`会将**自身所有属性**的 key 输出

ECMAScript 将对象的属性分为两种：数据属性和访问器属性。
```js
var parent = Object.create(Object.prototype, {
  a: {
    value: 123,
    writable: true,
    enumerable: true,
    configurable: true
  }
});
// parent继承自Object.prototype，有一个可枚举的属性a（enumerable:true）。
var child = Object.create(parent, {
  b: {
    value: 2,
    writable: true,
    enumerable: true,
    configurable: true
  },
  c: {
    value: 3,
    writable: true,
    enumerable: false,
    configurable: true
  }
});
// child 继承自 parent ，b可枚举，c不可枚举
```

### for ... in
```js
/**
 * 对象使用
 */
for (var key in child) {
  console.log(key);
}
// b
// a


/**
 * 数组使用
 */
let arr = [1, 2, 3];
Array.prototype.xxx = 5;
for (let i in arr) {
  console.log(i, arr[i])
}
// 0 1
// 1 2
// 2 3
// xxx 5


// for in 会遍历自身及原型链上的可枚举属性
```
如果只想输出**自身**的可枚举属性，可使用`hasOwnProperty`进行判断(数组与对象都可以)
```js
/**
 * 对象使用
 */
for (let key in child) {
  if (child.hasOwnProperty(key)) {
    console.log(key)
  }
}
// b

/**
 * 数组使用
 */
let arr = [1, 2, 3];
Array.prototype.xxx = 1231235;
for (let i in arr) {
  if (arr.hasOwnProperty(i)) {
    console.log(i, arr[i]);
  }
}
// 0 1
// 1 2
// 2 3
```

### Object.keys
```js
/**
 * 对象使用
 */
console.log(Object.keys(child)) // ["b"]

/**
 * 数组使用
 */
let arr = [1, 2, 3];
Array.prototype.xxx = 5;
console.log(Object.keys(arr)) // ['0', '1', '2']

// Object.keys 会将对象自身的可枚举属性的key输出
```

### Object.getOwnPropertyNames
```js
/**
 * 对象使用
 */
console.log(Object.getOwnPropertyNames(child)) // ["b", "c"]

/**
 * 数组使用
 */
let arr = [1, 2, 3];
Array.prototype.xxx = 5;
console.log(Object.getOwnPropertyNames(arr)) // ['0', '1', '2', 'length']
// Object.getOwnPropertyNames 会将自身所有的属性的key输出
```


## 21、如何判断 JS 变量的一个类型（至少三种方式）
### 21.1、typeof
`typeof`返回一个表示数据类型的字符串，返回结果包括：`number、boolean、string、object、undefined、function、symbol(es6)`等7种数据类型。
> 如果是判断一个**基本类型**用`typeof`就是可以的。
```js
typeof ''; // string 有效
typeof 1; // number 有效
typeof true; //boolean 有效
typeof undefined; //undefined 有效
typeof null; //object 无效
typeof []; //object 无效
typeof new Function(); // function 有效
typeof new Date(); // object 无效
typeof new RegExp(); // object 无效
```
**优点**：对于所有基本的数据类型都能进行判断<br>
**缺点**：不能判断其他复杂数据类型

### 21.2、instanceof
`instanceof`是用来判断 A 是否为 B 的实例对象，表达式为：`A instanceof B`，如果A是B的实例，则返回`true`, 否则返回`false`。
> 在这里需要特别注意的是：`instanceof`检测的是原型
```js
[] instanceof Array; //true
{} instanceof Object; //true
new Date() instanceof Date; //true
```
**优点**：`instanceof`可以弥补`Object.prototype.toString.call()`不能判断自定义实例化对象的缺点<br>
**缺点**：`instanceof`只能用来判断对象类型，原始类型不可以。并且所有对象类型`instanceof Object`都是`true`，且不同于其他两种方法的是它不能检测出`iframes`。

### 21.3、constructor
每一个对象实例都可以通过`constrcutor`对象来访问它的构造函数。JS 中内置了一些构造函数：`Object、Array、Function、Date、RegExp、String`等。我们可以通过数据的`constrcutor`是否与其构造函数相等来判断数据的类型。
```js
var arr = [];
var obj = {};
var date = new Date();
var num = 110;
var str = 'Hello';
var getName = function() {};
var sym = Symbol();
var set = new Set();
var map = new Map();

arr.constructor === Array; // true
obj.constructor === Object; // true
date.constructor === Date; // true
str.constructor === String; // true
getName.constructor === Function; // true
sym.constructor === Symbol; // true
set.constructor === Set; // true
map.constructor === Map // true
```

### 21.4、Object.prototype.toString.call()
`toString`是`Object`原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是`toString`运行时`this`指向的对象类型, 返回的类型格式为`[object, xxx]`, `xxx`是具体的数据类型，其中包括：`String, Number, Boolean, Undefined, Null, Function, Date, Array, RegExp, Error, HTMLDocument, ...`基本上所有对象的类型都可以通过这个方法获取到。常用于判断浏览器内置对象。
```js
Object.prototype.toString.call(''); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(new Function()); // [object Function]
Object.prototype.toString.call(new Date()); // [object Date]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(new RegExp()); // [object RegExp]
Object.prototype.toString.call(new Error()); // [object Error]

function f(name) {
  this.name = name
}
var f1 = new f("martin")
console.log(Object.prototype.toString.call(f1)) //[object Object]
```
**优点**：对于所有基本的数据类型都能进行判断，即使是`null`和`undefined`<br>
**缺点**：不能精准判断自定义对象，对于自定义对象只会返回`[object Object]`

### 21.5、Array.isArray()
`Array.isArray()`方法用于确定对象是否为数组，如果对象是数组，则次函数返回`true`，否则返回`false`。
```js
Array.isArray([1, 2, 3, 4])  // true
Array.isArray('1234')  // false
```
**优点**：当检测`Array`实例时，`Array.isArray`优于`instanceof`，因为`Array.isArray`可以检测出`iframes`<br>
**缺点**：只能判别数组


## 22、如何判断一个对象是否为数组
- 1、使用`instanceof`操作符
  ```js
  [1, 2, 3] instanceof Array // true
  ```
- 2、**判断构造函数**，使用`constructor`方法
  ```js
  let a = [1, 2]
  a.constructor === Array // true
  ```
- 3、**判断原型**使用`Object.getPrototypeOf`，缺点：原型是可以人为修改的
  ```js
  let a = [1, 2]
  Object.getPrototypeOf(a) === Array.prototype // true

  Object.setPrototypeOf(a, Object.prototype);
  Object.getPrototypeOf(a) === Array.prototype // false
  ```
- 4、使用 ECMAScript 5 新增的`Array.isArray()`方法
  ```js
  Array.isArray([1, 2, 3]) // true
  ```
- 5、使用`Object.prototype`上的原生`toString()`方法判断
  ```js
  Object.prototype.toString.call([1, 2, 3]) // [object Array]
  ```
- 6、使用`Array.prototype`上的`isPrototypeOf()`方法来判断
  ```js
  Array.prototype.isPrototypeOf([1, 2, 3]) // true
  ```


## 23、iframe 跨域通信和不跨域通信
### 不跨域通信
主页面
```html
<body>
  <iframe name="myIframe" id="iframe" class="" src="flexible.html" width="500px" height="500px">
  </iframe>
</body>
<script type="text/javascript" charset="utf-8">
  function fullscreen() {
    alert(1111);
  }
</script>
```
子页面 flexible.html
```html
<body>
  我是子页面
</body>
<script type="text/javascript" charset="utf-8">
  // window.parent.fullScreens()
  function showalert() {
    alert(222);
  }
</script>
```
1. 主页面要是想要调取子页面的 showalert 方法
  ```js
  myIframe.window.showalert();
  ```
2. 子页面要掉主页面的 fullscreen 方法
  ```js
  window.parent.fullScreens();
  ```
3. js 在 iframe 子页面获取父页面元素
  ```js
  window.parent.document.getElementById("元素id");
  ```
4. js 在父页面获取 iframe 子页面元素代
  ```js
  window.frames["iframe_ID"].document.getElementById("元素id");
  ```

### 跨域通信
使用postMessage
1. 子页面
  ```js
  window.parent.postMessage("hello", "http://127.0.0.1:8089");
  ```
2. 父页面接收
  ```js
  window.addEventListener("message", function(event) {
    alert(123);
  });
  ```


## 24、H5 与 Native 如何交互
jsBridge
> https://zhuanlan.zhihu.com/p/438763800


## 25、`<script>`标签的 defer 和 asnyc 属性的作用以及二者的区别？
a.js文件内容
```js
console.log('aaa')
```
b.js文件内容
```js
const obj = {
  name: '张三',
  age: 23
}
console.log('bbb')
```
**演示案例**
- 案例一: 没有`defer`或`async`属性，浏览器会立即下载并执行相应的脚本，并且在下载和执行时页面的处理会停止
  ```html
  <script>
    console.log('111')
  </script>
  <script src="./a.js"></script>
  <script>
    console.log('222')
  </script>
  ```
  输出结果如下: `111 aaa 222`
- 案例二: 有了`defer`属性，浏览器会在HTML页面解析完毕后按照文件在文档中出现的顺序依次下载JavaScript文件，并等到所有文件下载完成后再按照出现的顺序依次执行这些文件中的代码。
  > `defer`属性保证了JavaScript代码的执行顺序与HTML文档中的顺序一致。
  ```html
  <script>
    console.log('111')
  </script>
  <script src="./b.js" defer></script>
  <script>
    console.log('222')
  </script>
  <script src="./a.js" defer></script>
  ```
  即输出结果如下：`111 222 bbb aaa`
- 案例三: 有了`async`属性，浏览器将尽可能快地下载JavaScript文件，下载完成后立即执行其中的代码，不考虑这些文件在文档中的顺序。
  > 因此，使用`async`属性时无法保证JavaScript代码的执行顺序与HTML文档中的顺序一致。
  ```html
  <script>
    console.log('111')
  </script>
  <script src="./b.js" async></script>
  <script>
    console.log('222')
  </script>
  <script src="./a.js" async></script>
  ```
  输出结果如下：`111 222 aaa bbb`或者`111 222 bbb aaa`，因为是不考虑顺序的，所以输出结果可能会错乱。
- 案例四: 如果同时指定了`async`和`defer`两个属性, 则会**遵从`async`属性而忽略`defer`属性**。
  > 
  ```html
  <script>
    console.log('111')
  </script>
  <script src="./b.js" defer async></script>
  <script>
    console.log('222')
  </script>
  <script src="./a.js" async></script>
  ```
  输出结果如下：`111 222 aaa bbb`或者`111 222 bbb aaa`，因为同时使用`async`和`defer`会采用`async`的特性，即输出结果没有顺序，可能会错乱。


## 26、什么是面向对象OOP？
面向对象（`Object-Oriented Programming`）是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。<br>
面向对象就是一种思想，任何事务都可以看作对象，所以才有了”万物皆对象“这一说，面向对象又称OOP(Object Oriented Programming) 分开来看就是：
- Object：对象
- Oriented： 面向的
- Programming:程序设计

**面向对象和面向过程的异同**
- 面向过程：直接将解决问题的步骤分析出来，然后用函数把步骤一步一步实现，然后再依次调用就可以了。
- 面向对象：将构成问题的事物，分解成若干个对象，建立对象的目的不是为了完成一个步骤，而是为了描述某个事物在解决问题过程中的行为。
> - 面向过程思想偏向于我们做一件事的流程，首先做什么，其次做什么，最后做什么。
> - 面向对象思想偏向于了解一个人，这个人的性格、特长是怎么样的，有没有遗传到什么能力，有没有家族病史。


## 27、你对松散类型的理解
<span style="color: red;">松散类型就是指当一个变量被申明出来就可以保存任意类型的值</span>，就是不像 SQL 一样申明某个键值为 int 就只能保存整型数值，申明 varchar 只能保存字符串。一个变量所保存值的类型也可以改变，这在 JavaScript 中是完全有效的，只是不推荐。相比较于将变量理解为“盒子“，《JavaScript 编程精解》中提到应该将变量理解为“触手”，它不保存值，而是抓取值。这一点在当变量保存引用类型值时更加明显。

JavaScript 中变量可能包含两种不同的数据类型的值：**基本类型和引用类型**。
- 基本类型是指简单的数据段；
- 引用类型指那些可能包含多个值的对象；


## 28、JavaScript 严格模式和正常模式的区别
> 严格模式，顾名思义，这种模式采用更加严格的 JavaScript 语法。

严格模式使用`"use strict"`，老版本的浏览器会把它当作一行普通字符串，加以忽略。

### 作用
早期的 JavaScript 语言有很多设计不合理的地方，但是为了兼容以前的代码，又不能改变老的语法，只能不断添加新的语法，引导程序员使用新语法。严格模式是从 ES5 进入标准的，主要目的有以下几个：
- 明确禁止一些不合理、不严谨的语法，减少 JavaScript 语言的一些怪异行为；
- 增加更多报错的场合，消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 JavaScript 语法做好铺垫。

总之，**严格模式体现了 JavaScript 更合理、更安全、更严谨的发展方向**

### 表现
- 1、严格模式下, 变量必须先声明后使用，且无法删除，不能重复；
  ```js
  'use strict'
  a = 1 // Uncaught ReferenceError: a is not defined

  var b = 2
  delete b // Uncaught SyntaxError: Delete of an unqualified identifier in strict mode.
  ```
- 2、严格模式中，函数形参存在同名的，抛出错误；
  ```js
  'use strict'
  function foo (p1, p1) {} // Uncaught SyntaxError: Duplicate parameter name not allowed in this context
  ```
- 3、严格模式中，不允许八进制数和转义字符；
  ```js
  'use strict'
  var a = 010; //报错 Uncaught SyntaxError: Octal literals are not allowed in strict mode.
  var a = \010; //报错 Uncaught SyntaxError: Invalid or unexpected token
  ```
- 4、严格模式中，不能使用`with`语句；<br>
  `with`语句用于暂时修改作用域链，语法如下：
  ```js
  with (Object)
    statement
  ```
  废弃`with`的主要原因是因为它在引用对象时不可预测，使得代码难以优化，并且还会拖慢代码的执行速度。
- 5、严格模式中，不能对只读属性赋值，不能删除不可删除的属性
  ```js
  'use strict'
  var obj = {};
  obj.defineProperty(obj, 'a', {value:1, writable: false});//writable=false使属性不可写
  obj.a = 2; //报错 Uncaught TypeError: Cannot assign to read only property 'a' of object '#<Object>'

  delete Object.prototype //报错 Uncaught TypeError: Cannot delete property 'prototype' of function Object() { [native code] }
  ```
- 6、严格模式中，`eval`当做关键字，不能被重新赋值和用作变量声明，在作用域`eval()`创建的变量不能被调用；
  ```js
  var eval = 1; // 报错 Uncaught SyntaxError: Unexpected eval or arguments in strict mode
  eval('var a = 1')
  console.log(a) // 报错 Uncaught ReferenceError: a is not defined
  ```
- 7、严格模式中，`arguments`当做关键字，不能被重新赋值和用作变量声明，不会自动反映函数参数的变化；
  ```js
  var arguments = 1; // 报错 Uncaught SyntaxError: Unexpected eval or arguments in strict mode
  ```
- 8、严格模式中，禁止`this`指向全局对象；在严格模式下，顶层`this`指向`undefined`，而不再指向全局对象。
  ```js
  function foo1 () {
    return this; // 返回Window对象
  } 
  function foo2 () { 
    "use strict";
    return this; // 返回undefined
  }
  ```
- 9、严格模式中，不能使用`arguments.callee`、`fn.caller`和`fn.arguments`；
  ```js
  // 正常模式
  function demo () {
    console.log(demo.arguments, arguments, arguments.callee) 
  }
  demo(1, 2) // [1, 2]  [1, 2]  ƒ demo () { console.log(demo.arguments, arguments, arguments.callee) }

  // 严格模式报错
  'use strict'
  function demo () {
    console.log(demo.arguments, arguments, arguments.callee) 
  }
  demo(1, 2) // Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
  ```
- 10、严格模式中，增加了`public`、`private`、`protected`、`static`、`let`、`yield`、`package`、`interface`、`implements`保留字。
- 11、严格模式中，`call`，`apply`传入`null`或`undefined`保持传入的值。
  ```js
  // 正常模式
  function demo () {
    console.log(this)
  }
  demo.apply(undefined) // window

  // 严格模式
  'use strict'
  function demo () {
    console.log(this)
  }
  demo.apply(undefined) // undefined
  ```


## 29、移动端 click 事件、touch 事件、tap 事件的区别
1. `click`事件在移动端会有 200-300ms 的延迟，主要原因是苹果手机在设计时，考虑到用户在浏览网页时需要放大，所以，在用户点击的 200-300ms 之后，才触发`click`，如果 200-300ms 之内还有`click`，就会进行放大缩小。
2. `touch`事件是针对触屏手机上的触摸事件。现今大多数触屏手机 webkit 内核提供了`touch`事件的监听，让开发者可以获取用户触摸屏幕时的一些信息。其中包括：`touchstart`, `touchmove`, `touchend`, `touchcancel`这四个事件，`touchstart`、`touchmove`、`touchend`事件可以类比于 `mousedown`、`mouseover`、`mouseup`的触发
3. `tap`事件在移动端，代替`click`作为点击事件，`tap`事件被很多框架（如`zepto`）封装，来减少这延迟问题，`tap`事件不是原生的，所以是封装的，那么具体是如何实现的呢？
```html
<button id="btn">按钮</button>
<script>
  function tap (ele, callback) {
    // 记录开始时间
    var startTime = 0,
      // 控制允许延迟的时间
      delayTime = 200,
      // 记录是否移动，如果移动，则不触发tap事件
      isMove = false
    
    // 在touchstart时记录开始的时间
    ele.addEventListener('touchstart', (e) => {
      startTime = Date.now()
    })

    // 如果touchmove事件被触发，则isMove为true
    ele.addEventListener('touchmove', (e) => {
      isMove = true
    })

    // 如果touchmove事件触发或者中间时间超过了延迟时间，则返回，否则，调用回调函数。
    ele.addEventListener('touchend', (e) => {
      if (isMove || (Date.now() - startTime > delayTime)) {
        return
      }
      callback(e)
    })
  }
  
  var btn = document.querySelector('#btn')
  tap(btn, () => {
    console.log('触发了')
  })
</script>
```
**注意**：调试时需要打开浏览器的手机模式调试面板。

**移动端tap或touch类型事件的点透问题(点击穿透)**
> 常见到有这种应用场景，点击遮罩层，遮罩层消失，露出底部的页面。当底部的页面中某个元素绑定了click事件，并且点击遮罩的时候正好点的是该元素的位置，会发现该元素的click事件被触发了。

案例：使用`zepto`来测试
```html
<script src="//cdn.bootcss.com/zepto/1.0rc1/zepto.min.js"></script>
<div id="container" style="width: 200px;height: 200px;background: #ccc;text-align: center;position: relative;"></div>
<div id="popup" style="width: 200px;height:200px;background: rgba(255, 0, 0, 0.3);position: absolute;top: 8px;left: 8px;text-align: center;">
  <button id="btn">按钮</button>
</div>
<script>
  $('#btn').on('tap', (e) => {
    console.log('我是btn tap')
    $('#popup').hide()
  })
  $('#container').on('click', () => {
    console.log('我是container click')
  })
</script>
```
打开手机调试模式，然后点击`button`按钮会发现此时控制栏输出了如下所示结果，此现象即为`点击穿透`。
```
我是btn tap
我是container click
```

**解决办法**
1. 延迟遮罩层消失的时间，使其超过300ms<br>
  由于`click`事件的滞后性，在这段时间内原来点击的元素消失了，于是便“穿透”了。因此我们顺着这个思路就想到，可以给元素的消失做一个fade效果，类似jQuery里的fadeOut，并设置动画`duration`大于`300ms`，这样当延迟的`click`触发时，就不会“穿透”到下方的元素了。
  ```js
  $('#btn').on('tap', (e) => {
    console.log('我是btn tap')
    setTimeout(() => {
      $('#popup').hide()
    }, 320)
  })
  $('#container').on('click', () => {
    console.log('我是container click')
  })
  ```
2. 用`touchend`代替`tap`事件并阻止掉`touchend`的默认行为`preventDefault()`
  ```js
  $('#btn').on('touchend', (e) => {
    e.preventDefault()
    console.log('我是btn tap')
    $('#popup').hide()
  })
  $('#container').on('click', () => {
    console.log('我是container click')
  })
  ```
  使用此方法的话，很可能会阻止掉页面上的其他事件。
3. 使用`touchend`代替`tap`事件并使用动态生成的遮盖层挡住
  ```js
  $('#btn').on('touchend', (e) => {
    console.log('我是btn tap')
    $('#popup').hide()
    // 遮挡物
		var $tap = $('<div></div>');
		$tap.css({
			width: '40px',
			height: '40px',
			position: 'absolute',
			opacity: '1',
      top: 0,
      left: 0
		});
    var touch = e.changedTouches[0];
    $tap.css({
      top: (touch.pageY - 20) + 'px',
      left: (touch.pageX - 20) + 'px'
    });

    $('body').append($tap);
    setTimeout(function(){
      $tap.remove();
    }, 400);
  })
  $('#container').on('click', () => {
    console.log('我是container click')
  })
  ```
4. 使用fastclick库<br>
  使用fastclick库，其实现思路是，取消`click`事件，用`touchend`模拟快速点击行为
  ```js
  <script src="https://unpkg.com/fastclick@1.0.6/lib/fastclick.js"></script>
  <script>
    FastClick.attach(document.body);
    $('#btn').on('tap', (e) => {
      console.log('我是btn tap')
      $('#popup').hide()
    })
    $('#container').on('click', () => {
      console.log('我是container click')
    })
  </script>
  ```
5. pointer-events: `pointer-events`是CSS3中的属性，它有很多取值，有用的主要是`auto`和`none`
  - auto: 效果和没有定义`pointer-events`属性相同，鼠标不会穿透当前层。
  - none: 元素不再是鼠标事件的目标，鼠标不再监听当前层而去监听下面的层中的元素。但是如果它的子元素设置了pointer-events为其它值，比如auto，鼠标还是会监听这个子元素的。
  ```js
  $('#btn').on('tap', (e) => {
    console.log('我是btn tap')
    $('#popup').hide()
    $('#container').css('pointer-events', 'none')

    setTimeout(() => {
      $('#container').css('pointer-events', 'auto')
    }, 320)
  })
  $('#container').on('click', () => {
    console.log('我是container click')
  })
  ```


## 30、JS 单线程还是多线程，如何显示异步操作
JS 本身是单线程的，他是依靠浏览器完成的异步操作，而浏览器不是单线程的。
- **同步任务**指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
- **异步任务**指的是，不进入主线程、而进入”任务队列”（`task queue`）的任务，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。

具体步骤：
1. 主线程 执行 js 中所有的代码
2. 主线程 在执行过程中发现了需要异步的任务任务后扔给浏览器（浏览器创建多个线程执行），并在  callback queue  中创建对应的回调函数（回调函数是一个对象，包含该函数是否执行完毕等）
3. 主线程 已经执行完毕所有同步代码。开始监听  callback queue 一旦 浏览器 中某个线程任务完成将会改变回调函数的状态。主线程查看到某个函数的状态为已完成，就会执行该函数
![202302141550108.png](http://img.itchenliang.club/img/202302141550108.png)


## 31、JavaScript 数组常用方法
### map
此方法是将数组中的每个元素调用一个提供的函数，结果作为一个新的数组返回，并`不改变原数组`。
```js
// map
// 作用：对数组进行遍历
// 返回值：新的数组
// 是否改变原有数组：不会
var arr = [2, 5, 3, 4];
var ret = arr.map(function(value) {
  return value + 1;
});
console.log(ret); //[3,6,4,5]
console.log(arr); //[2,5,3,4]
```

### forEach
此方法是将数组中的每个元素执行传进提供的函数，没有返回值，直接`改变原数组`，注意和 map 方法区分
```js
// forEach 方法
// 作用：遍历数组的每一项
// 返回值：undefined
// 是否改变原有数组：不会
var arr = [2, 5, 3, 4];
var ret = arr.forEach(function(value) {
    console.log(value); // 2, 5, 3, 4
});
console.log(ret); //undefined
console.log(arr); //[2,5,3,4]
```

### reduce
此方法是所有元素调用返回函数，返回值为最后结果, 传入的值必须是函数类型，`不改变原数组`：
```js
// reduce 方法
// 作用：对数组进行迭代，然后两两进行操作，最后返回一个值
// 返回值：return出来的结果
// 是否改变原有数组：不会
var arr = [1, 2, 3, 4];
var ret = arr.reduce(function(a, b) {
  return a * b;
});
console.log(ret); // 24
console.log(arr); // [1, 2, 3, 4]
```

### filter
此方法是将所有元素进行判断，将满足条件的元素作为一个新的数组返回，`不改变原数组`
```js
// filter 过滤
// 作用： 筛选一部分元素
// 返回值： 一个满足筛选条件的新数组
// 是否改变原有数组：不会

var arr = [2, 5, 3, 4];
var ret = arr.filter(function(value) {
    return value > 3;
});
console.log(ret); //[5,4]
console.log(arr); //[2,5,3,4]
```

### every
此方法是将所有元素进行判断返回一个布尔值，如果所有元素都满足判断条件，则返回 true，否则为 false，`不改变原数组`：
```js
let arr = [1, 2, 3, 4, 5]
const isLessThan4 = value => value < 4
const isLessThan6 = value => value < 6
arr.every(isLessThan4) // false
arr.every(isLessThan6) // true
```

### some
此方法是将所有元素进行判断返回一个布尔值，如果存在元素都满足判断条件，则返回 true，若所有元素都不满足判断条件，则返回 false，`不改变原数组`：
```js
let arr = [1, 2, 3, 4, 5]
const isLessThan4 = value => value < 4
const isLessThan6 = value => value > 6
arr.some(isLessThan4) // true
arr.some(isLessThan6) // false
```

### push
此方法是在数组的后面添加新加元素，此方法`会改变原数组`，并返回数组的长度：
```js
let arr = [1, 2, 3, 4, 5]
arr.push(6) // 6
arr.push(6) // 7
```

### pop
此方法在数组后面删除最后一个元素，此方法`会改变原数组`，并返回数组的长度：
```js
let arr = [1, 2, 3, 4, 5]
arr.pop(6) // 5
```

### shift
此方法在数组前面删除第一个元素，此方法`会改变原数组`，并返回第一个元素的值：
```js
let arr = [2, 2, 3, 4, 5]
arr.shift() // 2
```

### unshift
此方法是在数组后面删除最后一个元素，此方法`会改变原数组`，并返回最后一个元素的值：
```js
let arr = [2, 2, 3, 4, 5]
arr.unshift() // 5
```

### splice
语法：
```js
arr.splice(开始位置， 删除的个数，元素)
```
万能方法，可以实现增删改：
```js
let arr = [1, 2, 3, 4, 5];
let arr1 = arr.splice(2, 0 'haha')
let arr2 = arr.splice(2, 3)
let arr1 = arr.splice(2, 1 'haha')
console.log(arr1) //[1, 2, 'haha', 3, 4, 5]新增一个元素
console.log(arr2) //[1, 2] 删除三个元素
console.log(arr3) //[1, 2, 'haha', 4, 5] 替换一个元素
```


## 32、复杂数据类型如何转变为字符串
- 首先会调用`valueOf`方法，如果方法的返回值是一个基本数据类型，就返回这个值
  > **时间对象是先调用`toString`方法**
  ```js
  var obj = {
    valueOf: function() {
      return 1;
    }
  };
  console.log(obj + ""); //'1'

  // 时间对象是先调用 toString 方法
  const date = new Date()
  date.valueOf = () => {
    return 'valueOf'
  }
  date.toString = () => {
    return 'toString'
  }
  console.log(date + "") // toString
  ```
- 如果调用`valueOf`方法之后的返回值仍旧是一个复杂数据类型，就会调用该对象的`toString`方法
  ```js
  var obj = {
    valueOf: function() {
      return [1, 2];
    }
  };
  console.log(obj + ""); //'[object Object]';
  ```
- 如果`toString`方法调用之后的返回值是一个基本数据类型，就返回这个值，
  ```js
  // 3;
  var obj = {
    valueOf: function() {
      return [1, 2];
    },
    toString: function() {
      return 1;
    }
  };
  console.log(obj + ""); //'1';
  ```
- 如果`toString`方法调用之后的返回值是一个复杂数据类型，就报一个错误。
  ```js
  // 4;
  var obj = {
    valueOf: function() {
      return [1, 2];
    },
    toString: function() {
      return [1, 2, 3];
    }
  };
  console.log(obj + "");
  // 报错 Uncaught TypeError: Cannot convert object to primitive value
  ```

**拓展**
```js
var arr = [
  new Object(),
  new Date(),
  new RegExp(),
  new String(),
  new Number(),
  new Boolean(),
  new Function(),
  new Array(),
  Math
]
console.log(arr.length) // 9
for (var i = 0; i < arr.length; i++) {
  arr[i].valueOf = function() {
    return [1, 2, 3]
  }
  arr[i].toString = function() {
    return 'toString'
  }
  console.log(arr[i] + '')
}
```
1. 上面程序得到的返回值是`toString * 9`
  > 说明：执行`valueof`后都来执行`toString`
2. 若`return [1, 2, 3]`处为`return "valueof"`，得到的返回值是`valueof toString valueof*7`
  > 说明：其他八种复杂数据类型是先调用`valueOf`方法，**时间对象是先调用`toString`方法**


## 33、null和undefined的区别
共同点：都是原始类型。
- **null**：Null类型，代表“空值"，表示一个变量将来可能指向一个对象，一般用于主动释放指向对象的引用；空值，空引用；
- **undefined**：Undefined 类型，表示变量声明过但并未赋过值，它是所有未赋值变量默认值；
  ```js
  var a
  console.log(a) // undefined
  ```

### 33.1、区别
- 1、数据类型不一样
  ```js
  typeof null // object
  typeof undefined // undefined

  Object.prototype.toString.call(null) // [object Null]
  Object.prototype.toString.call(undefined) // [object Undefined]
  ```
  为什么`typeof null是object`？<br>
  因为不同的对象在底层都表现为二进制，在  JavaScript  中二进制前三位都为 0 的话会被判断为`object`类型，`null`的二进制全部都为 0 ，前三位自然也是 0 ，所以执行`typeof`值会返回`object`。
- 2、`null`和`undefined`两者相等，但是当两者做全等比较时，两者又不等。（因为它们的数据类型不一样）
  ```js
  null == undefined // true
  null === undefined // false
  !!null === !!undefined  // true
  ```
- 3、转化成数字的值不同
  ```js
  Number(null) // 0
  Number(undefined) // NaN
  22 + null // 22
  22 + undefined // NaN
  ```
- 4、`null`代表"空"，代表空指针；`undefined`是定义了没有赋值
  ```js
  var a;
  console.log(a); // undefined

  var b = null;
  console.log(b) // null
  ```
- 5、`null`是 js 语言的关键字，是不允许用户用来作为标识符声明变量的，但是`undefined`可以，`undefined`不是关键字，同时也不能使用`let`定义。
  ```js
  var null = null // 报错：'null' is not allowed as a variable declaration name
  ```
  ![202302281657449.png](http://img.itchenliang.club/img/202302281657449.png)

### 33.2、运用场景
#### undefined
- 1、变量被声明时，但没有赋值时，就等于`undefined`
  ```js
  var a;
  console.log(a); // undefined
  ```
- 2、调用函数时，应该提供的参数没有提供，该参数等于`undefined`
  ```js
  function f(a,b) {
    console.log(a,b)
  }
  f("你好");   //输出结果为：你好 undefined
  ```
- 3、对象没有赋值的属性，该属性的值为`undefined`
  ```js
  var obj = {
    name: "lihua",
    age: "18"
  }
  console.log(obj.sex)  //输出结果为： undefined
  ```
- 4、函数没有返回值时，默认返回`undefined`
  ```js
  function  add(a,b) {
  var c = a+b;
  //  没有返回时为 undefined 
  // return c;
  }
  console.log(add(1,2));  //输出结果为：undefined
  ```

#### null
- 1、作为函数的参数，表示该函数的参数不是对象（不想传递参数）
  ```js
  function  add() {
    console.log(111)
  }
  add(null);
  ```
- 2、作为对象原型链的终点
- 3、如果定义的变量准备在将来用于保存对象，此时可以将该变量初始化为`null`
  ```js
  var a = null;
  console.log(a); / /null
  ```
- 4、释放内存时可以设置为null
  ```js
  let a = {
    name: '张三',
    age: 24
  }
  a = null // 释放内存
  ```


## 34、JS 哪些操作会造成内存泄露/内存泄漏
内存泄漏是指在代码执行期间，分配给对象的内存空间无法被垃圾回收机制释放，从而导致程序使用的内存不断增加，最终可能导致程序崩溃或性能下降的问题。

常见的引起内存泄露的原因: 
- 1、<span style="color: red;">全局变量</span>
  > 当全局变量中保存了对某个对象的引用时，这个对象就无法被垃圾回收机制释放。
  ```js
  var obj = {
    name: '张三'
  }
  ```
- 2、<span style="color: red;">意外的全局变量引起的内存泄露</span>
  ```js
  function leak() {
    leak = "xxx"; //leak成为一个全局变量，不会被回收
  }
  ```
- 3、<span style="color: red;">闭包引起的内存泄露</span>
  ```js
  function bindEvent() {
    var obj = document.createElement("XXX");
    obj.οnclick = function() {
      //Even if it's a empty function
    };
  }
  ```
  闭包可以维持函数内局部变量，使其得不到释放。 上例定义事件回调时，由于是函数内定义函数，并且内部函数--事件回调的引用外暴了，形成了闭包。 解决之道，将事件处理函数定义在外部，解除闭包, 或者在定义事件处理函数的外部函数中，删除对 dom 的引用。
  ```js
  //将事件处理函数定义在外部
  function onclickHandler() {
      //do something
  }

  function bindEvent() {
    var obj = document.createElement("XXX");
    obj.οnclick = onclickHandler;
  }
  //在定义事件处理函数的外部函数中，删除对dom的引用
  function bindEvent() {
    var obj = document.createElement("XXX");
    obj.οnclick = function() {
        //Even if it's a empty function
    };
    obj = null;
  }
  ```
- 4、<span style="color: red;">没有清理的 DOM 元素引用</span>
  ```js
  var elements = {
    button: document.getElementById("button"),
    image: document.getElementById("image"),
    text: document.getElementById("text")
  };

  function doStuff() {
      image.src = "http://some.url/image";
      button.click():
          console.log(text.innerHTML)
  }

  function removeButton() {
      document.body.removeChild(document.getElementById('button'))
  }
  ```
- 5、<span style="color: red;">被遗忘的定时器或者回调</span>
  ```js
  var someResouce = getData();
  setInterval(function() {
      var node = document.getElementById("Node");
      if (node) {
          node.innerHTML = JSON.stringify(someResouce);
      }
  }, 1000);
  ```
  这样的代码很常见, 如果 id 为 Node 的元素从 DOM 中移除, 该定时器仍会存在, 同时, 因为回调函数中包含对 someResource 的引用, 定时器外面的 someResource 也不会被释放。
- 6、<span style="color: red;">子元素存在引起的内存泄露</span>
  ![202302141601126.png](http://img.itchenliang.club/img/202302141601126.png)
  黄色是指直接被 js 变量所引用，在内存里，红色是指间接被 js 变量所引用，如上图，refB 被 refA 间接引用，导致即使 refB 变量被清空，也是不会被回收的子元素 refB 由于 parentNode 的间接引用，只要它不被删除，它所有的父元素（图中红色部分）都不会被删除。

### JS 的回收机制
JavaScript 垃圾回收的机制很简单：找出不再使用的变量，然后释放掉其占用的内存，但是这个过程不是实时的，因为其开销比较大，所以垃圾回收系统（GC）会按照固定的时间间隔, 周期性的执行。


## 35、观察者模式和发布订阅者模式
- 观察者模式：它定义了对象间的一种一对多的依赖关系，使得当一个对象状态发生改变时，所有依赖于它的对象都会得到通知并自动更新。
  ```js
  // Subject: 被观察者
  class Subject {
    constructor () {
      this.observers = []
    }
    add (observer) {
      this.observers.push(observer)
    }
    remove (observer) {
      const index = this.observers.findIndex(el => el === observer)
      if (index > -1) {
        this.observers.splice(index, 1)
      }
    }
    notify () {
      for (let i = 0 ; i < this.observers.length; i++) {
        this.observers[i].update()
      }
    }
  }

  // 观察者
  class Observer {
    update () {
      console.log('update')
    }
  }

  // 创建一个被观察者
  const subject = new Subject()
  // 创建多个观察者
  const observer1 = new Observer()
  const observer2 = new Observer()
  // 将观察者添加到被观察者的观察者列表中
  subject.add(observer1)
  subject.add(observer2)

  // 通知所有观察者更新
  subject.notify()
  ```
- 发布订阅模式：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。
  ```js
  class EventBus {
    constructor () {
      this.hanlders = {}
    }
    // 订阅事件
    on (eventType, handle) {
      if (!this.hanlders[eventType]) {
        this.hanlders[eventType] = []
      }
      this.hanlders[eventType].push(handle)
    }
    // 发布事件
    emit (eventType, ...args) {
      if (this.hanlders[eventType]) {
        this.hanlders[eventType].forEach((item, index) => {
          item(...args)
        })
      }
    }
    // 取消订阅
    off (eventType, handle) {
      if (this.hanlders[eventType]) {
        this.hanlders[eventType].forEach((item, index, arr) => {
          if (item == handle) {
            arr.splice(index, 1)
          }
        })
      }
    }
  }

  const eventBus = new EventBus()
  // 发布者
  const publisher = {
    offwork (...args) {
      eventBus.emit('offwork', ...args)
    },
    onwork (...args) {
      eventBus.emit('onwork', ...args)
    }
  }
  // 订阅者
  const subscriber = {
    onworkHandler (...args) {
      console.log('上班了', args)
    },
    offworkHandler (...args) {
      console.log('下班了', args)
    },
    onwork () {
      eventBus.on('onwork', this.onworkHandler)
    },
    offwork () {
      eventBus.on('offwork', this.offworkHandler)
    },
    cancelOffwork () {
      eventBus.off('offwork', this.offworkHandler)
    }
  }

  subscriber.onwork() // 订阅onwork
  subscriber.offwork() // 订阅offwork
  publisher.onwork('09:00', '记得打卡') // 上班了 ['09:00', '记得打卡']
  publisher.offwork('18:00', '记得打卡') // 下班了 ['18:00', '记得打卡']
  subscriber.cancelOffwork() // 取消订阅
  publisher.offwork('18:00', '记得打卡') // 无输出
  ```
![202302141606478.png](http://img.itchenliang.club/img/202302141606478.png)


## 36、jsonp 优缺点？
**优点**
- 它不像 XMLHttpRequest 对象实现的 Ajax 请求那样受到同源策略的限制，JSONP 可以跨越同源策略；
- 它的兼容性更好，在更加古老的浏览器中都可以运行，不需要 XMLHttpRequest 或 ActiveX 的支持
- 在请求完毕后可以通过调用 callback 的方式回传结果。将回调方法的权限给了调用方。这个就相当于将 controller 层和 view 层终于分 开了。我提供的 jsonp 服务只提供纯服务的数据，至于提供服务以 后的页面渲染和后续 view 操作都由调用者来自己定义就好了。如果有两个页面需要渲染同一份数据，你们只需要有不同的渲染逻辑就可以了，逻辑都可以使用同 一个 jsonp 服务。

**缺点**
- 它只支持 GET 请求而不支持 POST 等其它类型的 HTTP 请求
- 它只支持跨域 HTTP 请求这种情况，不能解决不同域的两个页面之间如何进行 JavaScript 调用的问题
- jsonp 在调用失败的时候不会返回各种 HTTP 状态码
- 缺点是安全性。万一假如提供 jsonp 的服务存在页面注入漏洞，即它返回的 javascript 的内容被人控制的。那么结果是什么？所有调用这个jsonp 的网站都会存在漏洞。于是无法把危险控制在一个域名下…所以在使用 jsonp 的时候必须要保证使用的 jsonp 服务必须是安全可信的


## 37、兼容各种浏览器版本的事件绑定
```js
/*
  兼容低版本IE，ele为需要绑定事件的元素，eventName为事件名，fun为事件响应函数
*/

function addEvent(ele, eventName, fun) {
  // 看是否有addEventListener 
  if (ele.addEventListener) {
    // 大部分浏览器
    ele.addEventListener(eventName, fun, false);
  } else {
    // IE8及以下
    ele.attachEvent("on" + eventName, fun);
  }
}
```


## 38、this 和 bind、call、apply 的应用
比如求数组的最大值`Math.max.apply(this, 数组)`，更多可以参考: 43项
```js
var numbers = [5, 458, 120, -215];
var maxInNumbers = Math.max.apply(this, numbers); //第一个参数也可以填Math或null
console.log(maxInNumbers); // 458
var maxInNumbers = Math.max.call(this, 5, 458, 120, -215);
console.log(maxInNumbers); // 458
```


## 39、split() 和 join()的区别
- join()：用于把数组中的所有元素通过指定的分隔符进行分隔放入一个字符串
- split()：用于把一个字符串通过指定的分隔符进行分隔成数组


## 40、JavaScript 的数据类型
js数据类型分为基本数据类型和引用类型，其中**基本数据类型**：
- String：字符串
- Number：数值
- Boolean：布尔值
- Null：空值
- Undefined：未定义
- Symbol类型：ES6 新增，代表创建后独一无二且不可变的数据类型

**引用类型**包括：
- Object: 对象
- Array: 数组
- Function: 函数


## 41、如何判断一个对象是否属于某个类？
```js
class Person {}
var p = new Person()
// 方式一
if (p instanceof Person) {
  console.log("yes");
}

// 方式二
p.constructor === Person

// 方式三
Object.getPrototypeOf(p) === Person.prototype

// 方式四
p.__proto__ === Person.prototype
```


## 42、new 操作符具体干了什么呢? new 一个对象的过程中发生了什么？
```js
var Fn = function () {

};
var fnObj = new Fn();
```
new 共经过了 4 几个阶段
- 创建一个空对象
  ```js
  var obj = new object();
  ```
- 设置原型链
  ```js
  obj.__proto__ = Fn.prototype;
  ```
- 让`Fn`中的`this`指向`obj`，并执行`Fn`的函数体
  ```js
  var result = Fn.call(obj);
  ```
- 判断`Fn`的返回值类型：判断`Fn`的返回值类型，如果是值类型，返回`obj`。如果是引用类型，就返回这个引用类型的对象。
  ```js
  if (typeof(result) === "object"){  
    return result;  
  } else {  
    return obj;
  }
  ```


## 43、bind()、call()与apply()的作用与区别？
### 43.1、作用
`call`、`apply`、`bind`作用是**改变函数执行时的上下文**，简而言之就是**改变函数运行时的this指向**。
那么什么情况下需要改变this的指向呢？下面举个例子
```html
<script>
  var name = 'lucy' // 其实等价于window.name = 'lucy'
  const obj = {
    name: 'martin',
    say: function () {
      console.log(this.name)
    }
  }
  obj.say() // martin，this指向obj对象
  setTimeout(obj.say, 1000) // lucy，this指向window对象
</script>
```
+ 正常情况`say`方法输出`martin`;
+ 把`say`放在`setTimeout`方法中，在定时器中是作为回调函数来执行的，因此回到主栈执行时是在全局执行上下文的环境中执行的，这时候`this`指向`window`，所以输出`luck`;

但是我们实际需要的是`this`指向`obj`对象，输出`martin`，这时候就需要该改变`this`指向了
```js
setTimeout(obj.say.bind(obj), 0) //martin，this指向obj对象
```

### 43.2、区别
#### apply
`apply`接受两个参数，第一个参数是`this`的指向，第二个参数是函数接受的参数，改变`this`指向后**原函数会立即执行**，且此方法只是临时改变`this`指向一次
```js
// 定义
fn.apply('this指向', [参数一, 参数二, 参数三, ... , 参数n])
```
**返回值**：使用调用者提供的`this`值和参数调用该函数的返回值。若该方法没有返回值，则返回`undefined`(**简单来说就是调用者那个方法`fn`的返回值，如果没有返回值就返回`undefined`**)。
例子：
```js
function fn (...args) {
  console.log('this:', this)
  console.log('args:', args)
  return { name: '小黑', age: 12 }
}
const obj = {
  name: '张三'
}
const res = fn.apply(obj, ['小三', 24]) // this指向传入的obj 
console.log(res) // { name: '小黑', age: 12 }
// this: { name: '张三' }
// args: [ '小三', 24 ]
fn('小三', 24) // this指向window
```
当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)
```html
<script>
  function fn (...args) {
    console.log('this:', this)
    console.log('args:', args)
  }
  fn.apply(null, ['小三', 24]) // this指向window
  fn.apply(undefined, ['小三', 24]) // this指向window
</script>
```
**使用场景**：在面向对象继承特点时会使用到，使子函数继承父函数的私有属性和方法（但原型对象的属性和方法不继承）
```js
function Animal (name, age) {
  this.name = name
  this.age = age
  this.gender = 'male'
}
Animal.prototype.type = '狗类'

function Dog (name, age, color) {
  Animal.apply(this, [name, age]) // 这个来继承父类: 继承父函数的私有属性和方法, 但原型对象的属性和方法不继承
  this.color = color
}
const dog = new Dog('小灰', 3 , 'black')
console.log(dog) // Dog { name: '小灰', age: 3, gender: 'male', color: 'black' }
```

#### call
`call`方法的第一个参数也是`this`的指向，后面传入的是一个参数列表，改变`this`指向后**原函数会立即执行**，且此方法只是临时改变`this`指向一次
```js
// 定义
fn.call('this指向', 参数一, 参数二, 参数三, ... , 参数n)
```
**返回值**：使用调用者提供的`this`值和参数调用该函数的返回值。若该方法没有返回值，则返回`undefined`(**简单来说就是调用者那个方法`fn`的返回值，如果没有返回值就返回`undefined`**)。
例子：
```js
function fn (...args) {
  console.log('this:', this)
  console.log('args:', args)
  return { name: '小黑', age: 12 }
}
const obj = {
  name: '张三'
}
const res = fn.call(obj, '小三', 24) // this指向传入的obj 
console.log(res) // { name: '小黑', age: 12 }
// this: { name: '张三' }
// args: [ '小三', 24 ]
fn('小三', 24) // this指向window
```
当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)
```html
<script>
  function fn (...args) {
    console.log('this:', this)
    console.log('args:', args)
  }
  fn.call(undefined, '小三', 24) // this指向window
  fn.call(null, '小三', 24) // this指向window
</script>
```
**使用场景**：在面向对象继承特点时会使用到，使子函数继承父函数的私有属性和方法（但原型对象的属性和方法不继承）
```js
function Animal (name, age) {
  this.name = name
  this.age = age
  this.gender = 'male'
}
Animal.prototype.type = '狗类'

function Dog (name, age, color) {
  Animal.call(this, name, age)
  this.color = color
}
const dog = new Dog('小灰', 3 , 'black')
console.log(dog) // Dog { name: '小灰', age: 3, color: 'black' }
```

#### bind
`bind`方法和`call`很相似，第一参数也是`this`的指向，后面传入的也是一个参数列表(但是这个参数列表可以分多次传入)，改变`this`指向后不会立即执行，而是返回一个**永久改变`this`指向**的函数。
```js
// 定义
const newFn = fn.bind('this指向', 参数一, 参数二, 参数三, ... , 参数n)
```
**返回值**：返回一个原函数的拷贝，并拥有指定的 this 值和初始参数(**绑定函数(bound function简称BF)**)，调用**绑定函数**通常会导致执行**包装函数**。
**绑定函数的返回值**：**调用者方法`fn`的返回值，如果没有返回值就返回`undefined`**。
例子：
```js
function fn (...args) {
  console.log('this:', this)
  console.log('args:', args)
  return { name: '小黑', age: 12 }
}
const obj = {
  name: '张三'
}
const newFn = fn.bind(obj, '小三')
const res = newFn(24, 'red') // this指向传入的obj，args: ["小三", 24, "red"]
console.log(res) // { name: '小黑', age: 12 }
fn('小三', 24) // this指向window
```
当第一个参数为`null`、`undefined`的时候，默认指向`window`(在浏览器中)
```html
<script>
function fn (...args) {
  console.log('this:', this)
  console.log('args:', args)
}
fn.bind(null, '小三', 24, 'red')() // this指向window
fn.bind(undefined, '小三', 24, 'red')() // this指向window
</script>
```
**使用场景**：在面向对象继承特点时会使用到，使子函数继承父函数的私有属性和方法（但原型对象的属性和方法不继承）
```js
function Animal (name, age) {
  this.name = name
  this.age = age
  this.gender = 'male'
}
Animal.prototype.type = '狗类'

function Dog (name, age, color) {
  Animal.bind(this, name, age)()
  this.color = color
}
const dog = new Dog('小灰', 3 , 'black')
console.log(dog) // Dog { name: '小灰', age: 3, color: 'black' }
```
**注意**：绑定函数(`bind`函数返回的新函数)不可以再通过`apply`和`call`改变其`this`指向，即当绑定函数调用`apply`和`call`改变其`this`指向时，并不能达到预期效果。
```js
var obj = {}
function test() {
    console.log(this === obj)
}
var testObj = test.bind(obj)
testObj()  //true

var objTest = {
    "作者": "chengbo"
}
/**
 * 预期返回false, 但是testObj是个绑定函数，所以不能改变其this指向
 */
testObj.apply(objTest) //true
testObj.call(objTest) //true
```

#### 总结
从上面可以看到，`apply`、`call`、`bind`三者的区别在于：
+ 三者都可以改变函数的`this`对象指向;
+ 三者第一个参数都是`this`要指向的对象，如果如果没有这个参数或参数为`undefined`或`null`，则默认指向全局`window`;
+ 三者都可以传参，但是`apply`是数组，而`call`是参数列表，且`apply`和`call`是一次性传入参数，而`bind`可以分为多次传入;
+ `bind`是返回绑定`this`之后的函数，`apply`、`call`则是立即执行;

### 43.3、手写实现`bind`、`call`、`apply`
参考：https://mp.weixin.qq.com/s/gpZmJ2ZljlW83Pb-TCnm3A
实现的步骤，我们可以分解成为三部分：
+ 修改`this`指向
+ 动态传递参数
+ 兼容`new`关键字

#### bind
```js
Function.prototype.myBind = function() {
    var _this = this;
    var context = [].shift.call(arguments);// 保存需要绑定的this上下文
    var args = [].slice.call(arguments); //剩下参数转为数组
    console.log(_this, context, args);
    return function() {
        return _this.apply(context, [].concat.call(args, [].slice.call(arguments)));
    }
}

// 或者
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new TypeError("Error")
  }
  // 获取参数
  const args = [...arguments].slice(1), fn = this

  return function Fn() {
    // 根据调用方式，传入不同绑定值
    return fn.apply(this instanceof Fn ? new fn(...arguments) : context, args.concat(...arguments))
  }
}
```

#### call
```js
/**
 * 每个函数都可以调用call方法，来改变当前这个函数执行的this关键字，并且支持传入参数
 */
Function.prototype.myCall = function(context) {
    //第一个参数为调用call方法的函数中的this指向
    var context = context || global;
    //将this赋给context的fn属性
    context.fn = this;//此处this是指调用myCall的function

    var arr = [];
    for (var i=0,len=arguments.length;i<len;i++) {
        arr.push("arguments[" + i + "]");
    }
    //执行这个函数，并返回结果
    var result = eval("context.fn(" + arr.toString() + ")");
    //将this指向销毁
    delete context.fn;
    return result;
}
```

#### apply
```js
/**
 * apply函数传入的是this指向和参数数组
 */
Function.prototype.myApply = function(context, arr) {
    var context = context || global;
    context.fn = this;
    var result;
    if (!arr) {
        result = context.fn(); //直接执行
    } else {
        var args = [];
        for (var i=0,len=arr.length;i<len;i++) {
            args.push("arr[" + i + "]");
        }
        result = eval("context.fn([" + args.toString() + "])");
    }
    //将this指向销毁
    delete context.fn;
    return result;
}
```




## 44、sort 排序原理
`sort`排序使用的是冒泡排序法，其原理如下：
- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。
```js
var arr = [1, 5, 4, 2];
// sort()方法的比较逻辑为：
// 第一轮：1和5比，1和4比，1和2比
// 第二轮：5和4比，5和2比
// 第三轮：4和2比
```
```js
// 一.sort排序规则 return大于0则交换数组相邻2个元素的位置
// 二.arr.sort(function (a,b) {})中
//         a -->代表每一次执行匿名函时候，找到的数组中的当前项；
//         b -->代表当前项的后一项；

// 1.升序
var apple = [45, 42, 10, 147, 7, 65, -74];
// ①默认法,缺点:只根据首位排序
console.log(apple.sort());
// ②指定排序规则法,return可返回任何值
console.log(
  apple.sort(function(a, b) {
    return a - b; //若return返回值大于0(即a＞b),则a,b交换位置
  })
);

//2.降序
var arr = [45, 42, 10, 111, 7, 65, -74];
console.log(
  apple.sort(function(a, b) {
    return b - a; //若return返回值大于零(即b＞a),则a,b交换位置
  })
);
```


## 45、如何判断当前脚本运行在浏览器还是 node 环境中？
浏览器端的`window`或者是node端的`process`全局对象。

**方式一**：通过判断Global对象是否为window，如果不为window，则当前脚本运行在node.js环境中。
```js
this === window ? console.log('browser') : console.log('node');
```

**方式二**：通过判断process全局对象
```js
typeof process === undefined ? console.log('browser') : console.log('node')
```


## 46、移动端最小触控区域是多大？
移动端最小触控区域`44*44px`，再小就容易点击不到或者误点。
> 参考：[移动端最小触控区域44*44px](https://www.cnblogs.com/wobushijincan/articles/7300509.html)


## 47、移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？
1. 300 毫秒
2. 因为浏览器捕获第一次单击后，会先等待一段时间，如果在这段时间区间里用户未进行下一次点击，则浏览器会做单击事件的处理。如果这段时间里用户进行了第二次单击操作，则浏览器会做双击事件处理。
3. 推荐 fastclick.js


## 48、Node.js 的适用场景/使用场景？
比如：RESTFUL API、实时聊天、客户端逻辑强大的单页 APP，具体的例子比如说：本地化的在线音乐应用，本地化的在线搜索应用，本地化的在线 APP 等。


## 49、使用构造函数的注意点
1. 一般情况下构造函数的首字母需要大写，因为我们在看到一个函数首字母大写的情况，就认定这是一个构造函数，需要跟new关键字进行搭配使用，创建一个新的实例（对象）
2. 构造函数在被调用的时候需要跟`new`关键字搭配使用。
3. 在构造函数内部通过`this+属性名的形式`为实例添加一些属性和方法。
4. 构造函数一般不需要返回值，如果有返回值
  - 如果返回值是一个`基本数据类型`，那么调用构造函数，返回值仍旧是那么创建出来的对象。
  ```js
  function Person (name) {
    this.name = name
    return 'aaa'
  }
  const person = new Person('张三')
  console.log(person) // Person {name: '张三'}
  ```
  - 如果返回值是一个`复杂数据类型`，那么调用构造函数的时候，返回值就是这个`return`之后的那个`复杂数据类型`。
  ```js
  function Person (name) {
    this.name = name
    return {
      demo: '123'
    }
  }
  const person = new Person('张三')
  console.log(person) // {demo: '123'}
  ```


## 50、如何获取浏览器版本信息
```js
window.navigator.userAgent
```
```js
function getBrowser() {
  var UserAgent = navigator.userAgent.toLowerCase();
  var browserInfo = {};
  var browserArray = {
    // IE
    IE: window.ActiveXObject || "ActiveXObject" in window,
    // Chrome浏览器
    Chrome: UserAgent.indexOf('chrome') > -1 && UserAgent.indexOf('safari') > -1,
    // 火狐浏览器
    Firefox: UserAgent.indexOf('firefox') > -1,
    // Opera浏览器
    Opera: UserAgent.indexOf('opera') > -1,  
    // safari浏览器
    Safari: UserAgent.indexOf('safari') > -1 && UserAgent.indexOf('chrome') == -1,  
    // Edge浏览器  
    Edge: UserAgent.indexOf('edge') > -1, 
    // qq浏览器
    QQBrowser: /qqbrowser/.test(UserAgent), 
    // 微信浏览器
    WeixinBrowser: /MicroMessenger/i.test(UserAgent)
  };
  
  for (var i in browserArray) {
    if (browserArray[i]) {
      var versions = '';
      if (i == 'IE') {
        versions = UserAgent.match(/(msie\s|trident.*rv:)([\w.]+)/)[2];
      } else if (i == 'Chrome') {
        for (var mt in navigator.mimeTypes) {
          //检测是否是360浏览器(测试只有pc端的360才起作用)      
          if (navigator.mimeTypes[mt]['type'] == 'application/360softmgrplugin') {
            i = '360';
          }
        }
        versions = UserAgent.match(/chrome\/([\d.]+)/)[1];
      } else if (i == 'Firefox') {
        versions = UserAgent.match(/firefox\/([\d.]+)/)[1];
      } else if (i == 'Opera') {
        versions = UserAgent.match(/opera\/([\d.]+)/)[1];
      } else if (i == 'Safari') {
        versions = UserAgent.match(/version\/([\d.]+)/)[1];
      } else if (i == 'Edge') {
        versions = UserAgent.match(/edge\/([\d.]+)/)[1];
      } else if (i == 'QQBrowser') {
        versions = UserAgent.match(/qqbrowser\/([\d.]+)/)[1];
      }
      browserInfo.type = i;
      browserInfo.versions = parseInt(versions);
    }
  } return browserInfo;
}

console.log(getBrowser())
```


## 51、❓如何实现文件断点续传
断点续传最核心的内容就是把文件“切片”然后再一片一片的传给服务器，但是这看似简单的上传过程却有着无数的坑。


## 52、字符串常用操作
- charAt(index): 返回指定索引处的字符串
- charCodeAt(index): 返回指定索引处的字符的 Unicode 的值
- concat(str1, str2, ...): 连接多个字符串，返回连接后的字符串的副本
- fromCharCode(): 将 Unicode 值转换成实际的字符串
- indexOf(str): 返回 str 在父串中第一次出现的位置，若没有则返回-1
- lastIndexOf(str): 返回 str 在父串中最后一次出现的位置，若没有则返回-1
- match(regex): 搜索字符串，并返回正则表达式的所有匹配
- replace(str1, str2):str1 也可以为正则表达式，用 str2 替换 str1
- search(regex): 基于正则表达式搜索字符串，并返回第一个匹配的位置
- slice(start, end)：返回字符索引在 start 和 end（不含）之间的子串
- split(sep，limit)：将字符串分割为字符数组，limit 为从头开始执行分割的最大数量
- substr(start，length)：从字符索引 start 的位置开始，返回长度为 length 的子串
- substring(from, to)：返回字符索引在 from 和 to（不含）之间的子串
- toLowerCase()：将字符串转换为小写
- toUpperCase()：将字符串转换为大写
- valueOf()：返回原始字符串值


## 53、自执行函数? 用于什么场景？好处?
自执行函数: 是指声明的一个匿名函数，可以立即调用这个匿名函数。作用是创建一个独立的作用域。
> 自执行函数又称`立即调用函数`或`立即执行函数`，具有自执行，即定义后立即调用的功能。

格式：
```js
// 写法一
(function(){
	console,log("hello world");
})();

// 写法二
(function(){
	console,log("hello world");
}());
```

**使用场景**
> 一般用于框架、插件等场景。

简单的使用场景：`for`循环中通过延时器输出索引`i`
```js
// 不使用立即执行函数
// 注意：这里需要使用var声明i，如果使用let，则不会导致变量提升
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);//输出:55555
  }, 1000);
}

// 使用立即执行函数
for (var i = 0; i < 5; i++) {
  ((index) => {
    setTimeout(() => {
      console.log(index)
    }, 1000)
  })(i);
}
```

**好处**
- 防止变量弥散到全局，以免各种 js 库冲突；
- 隔离作用域避免污染，或者截断作用域链，避免闭包造成引用变量无法释放；
- 利用立即执行特性，返回需要的业务函数或对象，避免每次通过条件判断来处理；


## 54、多个页面之间如何进行通信
1. **使用`Cookies`**：可以在一个页面中设置 Cookie 值，在其他页面中读取该值来实现通信。
2. **使用`Web Storage API`**：可以使用 LocalStorage 或 SessionStorage 来在不同的页面之间存储和共享数据。
3. **使用`postMessage()`方法**：可以在一个页面发送消息到另一个页面，并在那个页面中接收消息。
4. **使用`Broadcast Channel API`**：可以创建一个广播频道，在多个页面之间广播消息。
5. **使用`WebSocket`**：可以使用 WebSocket 连接在不同的页面之间建立实时通信。
6. **使用`web worker(SharedWorker)`**: 可以使用SharedWorker的`onmessage`和`postMessage`进行通信。
  - 新建`worker.js`
    ```js
    // worker.js
    const set = new Set()
    onconnect = event => {
      const port = event.ports[0]
      set.add(port)
      // 接收信息
      port.onmessage = e => {
        // 广播信息
        set.forEach(p => {
          p.postMessage(e.data)
        })
      }
      // 发送信息
      port.postMessage("worker广播信息")
    }
    ```
  - 页面中使用
    ```html
    <!-- pageA -->
    <script>
      const worker = new SharedWorker('./worker.js')
      worker.port.onmessage = e => {
        console.info("pageA收到消息", e.data)
      }
    </script>

    <!-- pageB -->
    <script>
      const worker = new SharedWorker('./worker.js')
      let btnB = document.getElementById("btnB");
      let num = 0;
      btnB.addEventListener("click", () => {
        worker.port.postMessage(`客户端B发送的消息:${num++}`)
      })
    </script>
    ```


## 55、css 动画和 js 动画的差异
### css动画
**优点**
- 1、浏览器可以对css动画进行优化<br>
  浏览器可以对css动画进行优化，其优化原理类似于requestAnimationFrame，会把每一帧的DOM操作都集中起来，在一次重绘和回流中去完成。一般来说频率为每秒60帧。隐藏和不可见的dom不会进行重绘或回流，这样就会更少的使用CPU,GPU和内存使用量。
- 2、强制使用硬件加速<br>
  使用GPU来提高动画性能。
- 3、代码相对简单,性能调优方向固定
- 4、对于帧速不好的浏览器，css3可以做到自动降级，js则需要添加额外的代码

**缺点**
- 1、无法控制中间的某一个状态，或者是给其添加回调函数，不能半路翻转动画，没有进度报告。
- 2、如果想要实现相对复杂的动画效果时，css的代码冗余量很大。

### js动画
**优点**
- 1、js动画的控制能力很强，可以在动画播放过程中对动画进行控制，开始、暂停、回放、终止、取消都是可以做到的。
- 2、动画效果比css3动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有JavaScript动画才能完成。
- 3、CSS3有兼容性问题，而JS大多时候没有兼容性问题

**缺点**
- 1、javascript在浏览器的主线程中运行，而主线程中还存在其他需要运行的javascript脚本，样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况。
- 2、js代码的复杂度要改与css动画


## 56、如何做到修改 url 参数页面不刷新
参考: <a href="#_180、实现一个页面操作不会整页刷新的网站-并且能在浏览器前进、后退时正确响应">180题-实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应</a>



## 57、事件绑定与普通事件有什么区别
事件绑定相当于在一个元素上进行监听，监听事件是否触发。普通事件就是直接触发事件。

两者的区别：
> 在于是否可重复使用。事件绑定可以在一个元素上监听同一事件多次，而普通事件多次写会被覆盖。

**普通事件**
```html
<!-- 普通添加事件的方法 -->
<button id="btn">按钮</button>
<script>
  const btn = document.querySelector('#btn')
  btn.onclick = () => {
    console.log('123')
  }
  btn.onclick = () => {
    console.log('234')
  }
</script>
```
点击`按钮`控制台会输出`234`。

**事件绑定**
```html
<!-- 事件绑定方式添加事件 -->
<button id="btn">按钮</button>
<script>
  const btn = document.querySelector('#btn')
  btn.addEventListener('click', () => {
    console.log('123')
  })
  btn.addEventListener('click', () => {
    console.log('234')
  })
</script>
```
点击`按钮`控制台会输出`123 234`。


## 58、IE 和 DOM 事件流的区别
**事件流的区别**：
- 事件执行的顺序不同
  - IE事件流：IE 的事件执行顺序采用冒泡形式，从事件触发的元素开始，逐级冒泡到 DOM 根节点
  - DOM事件流：支持两种事件模型，即冒泡和捕获，但是捕获先开始，冒泡后发生，捕获从 DOM 根开始到事件触发元素为止，然后再从事件触发的元素冒泡到 DOM 根，从 DOM 根出发最后又回到了 DOM 根。
- 监听方式的不同
  - IE事件流：通过`attachEvent`和`detachEvent`来进行监听与移除
  - DOM事件流：通过`addEventListener`和`removeEventListener`来进行监听与移除

示例：
```html
<body>
  <div>
    <button>点击这里</button>
  </div>
</body>
```
冒泡型事件模型：`button->div->body (IE 事件流) `<br>
捕获型事件模型：`body->div->button (Netscape 事件流)`<br>
DOM 事件模型：`body->div->button->button->div->body (先捕获后冒泡)`

**事件侦听函数的区别**：<br>
IE 使用:
```js
[Object].attachEvent("name_of_event_handler", fnHandler); //绑定函数
[Object].detachEvent("name_of_event_handler", fnHandler); //移除绑定
```
DOM 使用：
```js
[Object].addEventListener("name_of_event", fnHandler, bCapture); //绑定函数
[Object].removeEventListener("name_of_event", fnHandler, bCapture); //移除绑定
```
`bCapture`参数用于设置事件绑定的阶段，`true`为捕获阶段，`false`为冒泡阶段。


## 59、IE 和标准下有哪些兼容性的写法
```js
// 1、获取事件对象
var ev = ev || window.event;
// 2、事件委派
var target = event.target || event.srcElement;
// 3、获得键盘属性
var cpde = event.which || ebent.keyCode;
// 4、阻止冒泡事件
event.stopPropagation ? event.stopPropagation() : event.cancelBubble = true;
// 5、阻止默认行为
event.preventDEfault ? event.preventDEfault() : event.returnValue = false;
// 6、窗口宽高
var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
// 7、滚动条高度
var top = document.documentElement.scrollTop || document.body.scrollTop;
// 8、事件监听
element.addEventListener(), element.attchEvent();
// 9、获取最终生效样式
window.getComputedStyle ? window.getComputedStyle(element) : element.currentStyle;
```


## 60、如何阻止冒泡与默认行为
- 阻止冒泡行为：
  - 非 IE 浏览器`stopPropagation()`
  - IE 浏览器`window.event.cancelBubble = true`
- 阻止默认行为：
  - 非 IE 浏览器`preventDefault()`
  - IE 浏览器`window.event.returnValue = false`

当需要阻止冒泡行为时，可以使用：
```js
function stopBubble(e) {
  //如果提供了事件对象，则这是一个非IE浏览器
  if (e && e.stopPropagation) {
    //因此它支持W3C的stopPropagation()方法
    e.stopPropagation();
  } else {
    //否则，我们需要使用IE的方式来取消事件冒泡
    window.event.cancelBubble = true;
  }
}
```
当需要阻止默认行为时，可以使用
```js
//阻止浏览器的默认行为
function stopDefault(e) {
  //阻止默认浏览器动作(W3C)
  if (e && e.preventDefault) {
    e.preventDefault();
  } else {
    // IE中阻止函数器默认动作的方式
    window.event.returnValue = false;
  }
  return false;
}
```


## 61、JavaScript的本地对象，内置对象和宿主对象
### 本地对象
本地对象(native object)与宿主无关，无论在浏览器还是服务器中都有的对象，就是ECMAScript标准中**定义的类**(构造函数)。在使用过程中需要我们手动`new`创建。
> 包括：`Boolean`、`Number`、`Date`、`RegExp`、`Array`、`String`、`Object`、`Function`、`Error`、`EvalError`、`RangeError`、`ReferenceError`、`SyntaxError`、`TypeError`、`URIError`。

### 内置对象
内置对象(built-in object)与宿主无关，无论在浏览器还是服务器中都有的对象，ECMAScript已经帮我们**创建好的对象**，在使用过程中无需我们动手`new`创建。所有内置对象都是本地对象的子集。
> 包含：`Global`、`Math`、`JSON`

### 宿主对象
宿主对象(host object)由 ECMAScript 实现的宿主环境（如某浏览器）提供的对象（如由浏览器提供的`Window`和`Document`），包含两大类，一个是宿主提供，一个是自定义类对象。所有非本地对象都属于宿主对象。
> 包含：`Window`和`Document`、以及所有的`DOM`和`BOM`对象以及`localStorage`等等。

**什么是宿主？**
> 宿主就是指JavaScript运行环境，js可以在浏览器中运行，也可以在服务器上运行(nodejs)，对于嵌入到网页中的js来说，其宿主对象就是浏览器，所以宿主对象就是浏览器提供的对象。


## 89、内置函数(原生函数)
JavaScript 的内建函数(built-in function)，也叫原生函数(native function)。
- Number()
- String()
- Boolean()
- Function()
- Array()
- Object()
- Symbol()
- Error()
- Date()
- RegExp()

原生函数可以被当作构造函数来使用，但是构造出来的值都是对象类型的：
```js
var str = new String('hello world')
typeof str  // 'object'
Object.prototype.toString.call(str)  // '[object String]'

var str = 'hello world'
typeof str  // 'string'
Object.prototype.toString.call(str)  // '[object String]'
```
通过构造函数（如`new String("hello world")`）创建出来的是封装了基本类型值（如`"hello world"`）的封装对象。注意的是
```js
!!Boolean(false) // 结果: false;  第一步: Boolean(false) = false; 第二步: !!false = false
!!new Boolean(false) // 结果: true; 第一步: new Boolean(false)={false}; 第二步: !!{false} = true
```


## 62、两种函数声明有什么区别？
```js
// 创建函数方式一: 函数表达式
var foo = function() {
  // Some code
};
// 创建函数方式二: 函数声明
function bar() {
  // Some code
};
// 创建函数方式三: 构造函数
const baz = new Function("console.log('aa')")
```
foo的定义是在运行时。想系统说明这个问题，我们要引入变量提升的这一概念。我们可以运行下如下代码看看结果。
```js
console.log(foo)
console.log(bar)

var foo = function() {
  // Some code
};

function bar() {
  // Some code
};
```
输出结果为：
```js
undefined
function bar(){ 
  // Some code
}; 
```
为什么那？为什么`foo`打印出来是`undefined`，而`bar`打印出来却是函数？
> 原因：JavaScript在执行时，会将变量提升。所以上面代码JavaScript 引擎在实际执行时按这个顺序执行。
```js
// foo bar的定义位置被提升
function bar() {
  // Some code
};
var foo;

console.log(foo)
console.log(bar)

foo = function() {
  // Some code
};
```
**函数声明赋值优先于变量声明赋值**
- 函数声明赋值，是在执行上下文的开始阶段进行的
- 变量声明赋值，是在执行赋值语句的时候进行赋值的；
```js
var getName = function() {
  console.log(4);
};

function getName() {
  console.log(5);
}
getName()
```
可以看到输出的结果是`4`。


## 63、require 与 import 的区别
node编程中最重要的思想就是模块化，import 和 require 都是被模块化所使用。在 ES6 当中，用 export 导出接口，用 import 引入模块。但是在 node 模块中，使用module.exports导出接口，使用 require 引入模块。
### 遵循规范不同
- <span style="color: red"><code>require</code>是 CommonJS/AMD 规范；</span>
- <span style="color: red"><code>import</code>是 ESMAScript6+ 规范；</span>

### 遵循时间不同
- <span style="color: red"><code>require</code>是运行时加载；</span>
- <span style="color: red"><code>import</code>是编译时加载，由于编译时加载，所以<code>import</code>会提升到整个模块的头部；</span>

### 调用位置不同
- <span style="color: red"><code>require</code>可以在代码的任意位置调用；</span>
- <span style="color: red"><code>import</code>必须放在代码的顶部</span>

### 本质不同
- <span style="color: red"><code>require</code>是赋值过程</span>。module.exports后面的内容是什么，require的结果就是什么，比如对象、数字、字符串、函数等，然后再把require的结果赋值给某个变量，它相当于module.exports的传送门；
- <span style="color: red"><code>import</code>是解构过程</span>，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require

注意: `import()`是一种异步加载模块的方式，它是 ES6 中新增的一个特性。相比于常规的`import`语句，`import()`允许在运行时动态地加载模块，从而实现按需加载和延迟加载的效果。`import()`返回一个`Promise`对象，可以使用`then()`方法获取导入的模块。
```js
import('./foo.js')
  .then(module => {
    // 处理 module
  })
  .catch(error => {
    // 处理 error
  });
```


## 64、JavaScript全局属性和全局函数有哪些?
### 全局属性
#### Infinity
代表正的无穷大的数值。

#### NaN
指示某个值是不是数字值。

#### undefined
指示未定义的值。

### 全局函数
#### decodeURI()
解码某个编码的URI

#### decodeURIComponent()
解码一个编码的URI组件

#### encodeURI()
把字符串编码为URI

#### encodeURIComponent()
把字符串编码为URI组件

#### escape()
对字符串进行编码

#### eval()
计算 JavaScript 字符串，并把它作为脚本代码来执行

#### isFinite()
检查某个值是否为有穷大的数

#### isNaN()
检查某个值是否是数字

#### Number()
将对象的值转换成数字

#### parseFloat()
解析一个字符串并返回一个浮点数

#### parseInt()
解析一个字符串并返回一个整数

#### String()
把对象的值转换为字符串

#### unescape()
对由`escape()`编码的字符串进行解码


## 65、JavaScript中 this 的指向问题
> 一句话概括this指向：谁调用this就指向谁。优先级: 箭头函数 -> new -> bind -> call&apply -> obj.xx -> 直接调用 -> 不在函数里
### 箭头函数
箭头函数`this`的指向不会发生改变，也就是说在创建箭头函数时就已经确定了它的`this`的指向了；它的指向永远指向箭头函数外层的`this`。
```js
function fn1() {
  console.log(this);
  let fn2 = () => {
    console.log(this);
  }
  fn2(); // this->window
}
fn1();// this->window
// 因为fn1函数中this的指向是window，所以fn2箭头函数this指向fn1函数也就是间接指向window
```

### 直接调用(普通函数)
在函数被直接调用时，`this`将指向全局对象。在浏览器环境中全局对象是`Window`，在 Node.js 环境中是`Global`。
- 全局作用域中：`this`永远指向`window`，无论是否严格模式；
  ```js
  // 非严格模式
  console.log(this) // window

  // 严格模式
  'use strict';
  console.log(this) // window
  ```
- 函数作用域中：
  - 如果函数直接被调用(`函数名()`)，非严格模式`this`指向`window`，严格模式`this`指向`undefined`；
  ```js
  // 简单例子
  function func() {
    console.log(this) // Window
  }
  func()

  // 严格模式
  'use strict';
  function func() {
    console.log(this) // undefined
  }
  func()
  ```
  ```js
  // 复杂的例子: 外层的 outerFunc 就起个迷惑目的
  function outerFunc() {
    console.log(this) // { x: 1 }
    function func() {
      console.log(this) // Window
    }
    func()
  }
  outerFunc.bind({ x: 1 })()
  ```
  - 被对象的`对象.属性()`调用，函数中的`this`指向这个对象，详细查看下节内容。

### obj.xxx()
对象的`对象.属性()`调用，函数中的`this`指向这个对象
```js
// 简单例子
var a = {
  fn () {
    console.log(this) // 指向a = { fn } 这个对象
  }
}
a.fn()

// 复杂例子1
var o = {
  prop: 37,
  f: function() {
    console.log(this.prop)
  }
};
function independent() {
  console.log(this.prop)
}
o.b = {
  g: independent,
  prop: 42
};
o.f() // 37
o.b.g() // 42

// 复杂例子2
var o = {
  a: 10,
  b: {
    // a:12,
    fn: function() {
      console.log(this.a); // undefined
      console.log(this); // {fn: ƒ}
    }
  }
};
o.b.fn();

// 复杂例子3
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function() {
      console.log(this.a); // undefined
      console.log(this); // window
    }
  }
};
var j = o.b.fn;
j();
```
箭头函数中`this`不会被修改
```js
var a = {
  fn: () => {
    console.log(this) // window
  }
}
a.fn()
```
`obj.xxx`与`bind`一起使用
```js
var obj = { name: 'obj' }
var a = {
  name: 'a',
  fn () {
    console.log(this) // obj
  }
}
a.fn.bind(obj)()
```
总结：**this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的**

### new
当使用`new`关键字调用函数时，函数中的`this`一定是 JS 创建的新对象。
```js
// 简单例子
function Person () {
  console.log(this) // Person {}
}
const person = new Person()

// 复杂例子1
function Person () {
  this.name = 'abc'
  return {
    name: 'cba' // 手动设置返回对象
  }
}
const person = new Person()
console.log(person.name) // cba

// 复杂例子2
function Person () {
  this.name = 'abc'
  return 1
}
const person = new Person()
console.log(person.name) // abc

// 复杂例子3
function Person () {
  this.name = 'abc'
  return undefined
}
const person = new Person()
console.log(person.name) // abc

// 复杂例子4
function Person () {
  this.name = 'abc'
  return null
}
const person = new Person()
console.log(person.name) // abc
```
总结: **如果手动设置的返回值是一个对象(`null`除外)，那么`this`指向的就是那个返回的对象，如果返回值不是一个对象那么`this`还是指向函数的实例。**

那么有的人就会疑问，如果使用`new`关键调用箭头函数，是不是箭头函数的`this`就会被修改呢？
```js
Person = () => {}
new Person() // Uncaught TypeError: Person is not a constructor
```
从控制台中可以看出，箭头函数不能当做构造函数，所以不能与`new`一起执行。

### bind
`bind`是指`Function.prototype.bind()`。多次`bind`时只认第一次`bind`的值。
```js
function fn() {
  console.log(this)
}
fn.bind(1).bind(2)() // 1
```
箭头函数中`this`不会被修改
```js
fun = () => {
  // 这里 this 指向取决于外层 this
  console.log(this)
}
fun.bind(1)() // Window
```
易错点：**bind 与 new**
注意: `new`优先
```js
function Person() {
  console.log(this, this.__proto__ === Person.prototype)
}
boundFunc = Person.bind(1)
new Person() // Person {} true
```
`bind`函数中`this`不会被修改
```js
function func() {
  console.log(this)
}
 
boundFunc = func.bind(1)
// 尝试使用apply修改this
boundFunc.apply(2) // 1 -> 由结果可知bind的优先级高
```

### apply和call
`apply()`和`call()`的第一个参数都是`this`，区别在于通过`apply`调用时实参是放到数组中的，而通过`call`调用时实参是逗号分隔的。
```js
function Person(name, age) {
  this.name = name
  this.age = age
  console.log(this)
}
const person = new Person('小明', 23) // Person {name: '小明', age: 23}
var obj = {}
Person.apply(obj, ['李四', 24]) // {name: '李四', age: 24}
Person.call(obj, '王五', 25) // {name: '王五', age: 25}
console.log(person) // Person {name: '小明', age: 23}
```
箭头函数中`this`不会被修改
```js
func = () => {
  // 这里 this 指向取决于外层 this
  console.log(this)
}
func.apply(1) // Window
```

### 不在函数里
不在函数中的场景，可分为浏览器的`script`标签里，或 Node.js 的模块文件里。
- 在`script`标签里，`this`指向`Window`。
- 在 Node.js 的模块文件里，`this`指向`Module`的默认导出对象，也就是`module.exports`

### setTimeout和setInterval
- 对于延时函数内部的回调函数的`this`指向全局对象`window`；
- 可以通过`bind()`方法改变内部函数`this`指向。
```js
// 默认情况下代码
function Person() {
  this.age = 0;
  setTimeout(function() {
    console.log(this); // window
  }, 3000);
}

var p = new Person();

//通过bind绑定
function Person() {
  this.age = 0;
  setTimeout(
    function() {
      console.log(this); // Person{...}
    }.bind(this),
  3000);
}
var p = new Person(); 
```


## 66、正则表达式构造函数`var reg = new RegExp('xxx')`与正则表达字面量`var reg = //`有什么不同？
当使用`RegExp()`构造函数的时候，不仅需要转义引号（即`\`”表示”），并且还需要双反斜杠（即`\\`表示一个`\`）。使用正则表达字面量的效率更高。

示例代码：演示两种可用于创建正则表达式以匹配反斜杠的方法
```js
//正则表达字面量
var re = /\\/gm;

//正则构造函数
var reg = new RegExp("\\\\", "gm");

var foo = "abc\\123"; // foo的值为"abc\123"
console.log(re.test(foo)); //true
console.log(reg.test(foo)); //true
```
如上面的代码中可以看到，使用正则表达式字面量表示法时式子显得更加简短，而且不用按照类似类（class-like）的构造函数方式思考。<br>
其次，在当使用构造函数的时候，在这里要使用四个反斜杠才能匹配单个反斜杠。这使得正则表达式模式显得更长，更加难以阅读和修改。正确来说，当使用 `RegExp()`构造函数的时候，不仅需要转义引号（即"表示"），并且通常还需要双反斜杠（即\表示一个\）。<br>
使用`new RegExp()`的原因之一在于，某些场景中无法事先确定模式，而只能在运行时以字符串方式创建。
```js
// 邮箱的整则匹配
var regMail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/;
```


## 67、JavaScript中 callee 与 caller 的作用
### caller
返回一个调用当前函数的调用者，如果是由顶层调用的话则返回`null`。
```js
function demo () {
  console.log(demo.caller)
}
function nest () {
  demo()
}
demo() // null => 由于是顶层调用所以返回 null
nest() // ƒ nest () { demo() } => 由于是nest调用的demo，所以输出 nest 函数 
```
**应用场景**
> 主要用于察看函数本身被哪个函数调用。

### callee
`callee`是对象的一个属性，该属性是一个指针，指向参数`arguments`对象的函数。返回正被执行的`Function`对象，也就是所指定的`Function`对象的正文。是对象的一个属性，
> `callee`是`arguments`的一个属性成员，它表示对函数对象本身的引用，这有利于匿名函数的递归或者保证函数的封装性。它有个`length`属性（代表形参的长度）。
```js
function demo (name, age) {
  console.log(arguments.callee)
  console.log('实参长度:', arguments.length)
  console.log('形参长度:', arguments.callee.length)
}
demo('张三')
// 输出结果
// ƒ demo (name, age) {
//  console.log(arguments.callee)
//  console.log('实参长度:', arguments.length)
//  console.log('形参长度:', arguments.callee.length)
// }
// 实参长度: 1
// 形参长度: 2

demo('张三', 23)
// 输出结果
// ƒ demo (name, age) {
//  console.log(arguments.callee)
//  console.log('实参长度:', arguments.length)
//  console.log('形参长度:', arguments.callee.length)
// }
// 实参长度: 2
// 形参长度: 2
```
**应用场景**
> 一般用于匿名函数，有利于匿名函数的递归或者保证函数的封装性。
```js
var fn = function (n) {
  if(n > 0) return n + fn(n-1);
  return 0;
}
console.log(fn(10)) // 55
```
函数内部包含了对自身的引用，函数名仅仅是一个变量名，在函数内部调用即相当于调用一个全局变量，不能很好的体现出是调用自身，这时使用`callee`会是一个比较好的方法
```js
var fn = function (n) {
  if(n > 0) return n + arguments.callee(n - 1);
  return 0;
}
console.log(fn(10)) // 55
```
这样就**让代码更加简练。又防止了全局变量的污染**。


## 68、异步加载 js 的方法
**方案一**: `<script>`标签的`async="async"`属性
> 点评：HTML5 中新增的属性，Chrome、FF、IE9&IE9+均支持（IE6~8 不支持）。此外，这种方法不能保证脚本按顺序执行。

**方案二**: `<script>`标签的`defer="defer"`属性
> 点评：兼容所有浏览器。此外，这种方法可以确保所有设置 defer 属性的脚本按顺序执行。

**方案三**: 动态创建`<script>`标签
> 点评：兼容所有浏览器。
```html
<!DOCTYPE html>
<html>
<head>
  <script type="text/javascript">
    (function() {
      var s = document.createElement("script");
      s.type = "text/javascript";
      s.src = "http://code.jquery.com/jquery-1.7.2.min.js";
      var tmp = document.getElementsByTagName("script")[0];
      tmp.parentNode.insertBefore(s, tmp);
    })();
  </>
</head>
<body>
  <img src="http://xybtv.com/uploads/allimg/100601/48-100601162913.jpg" />
</body>
</html>
```

**方案四**: 使用 AJAX 得到脚本内容，然后通过`eval(xmlhttp.responseText)`来运行脚本
> 点评：兼容所有浏览器。

**方案五**: `iframe`方式（这里可以参照：iframe 异步加载技术及性能 中关于 Meboo 的部分）<br>
> 点评：兼容所有浏览器。


## 69、去除数组重复成员的方法（数组去重）
**1、扩展运算符`...`和`Set`结构相结合**
```js
// 去除数组的重复成员
[...new Set([1, 2, 2, 3, 4, 5, 5])];
// [1, 2, 3, 4, 5]
```

**2、`Array.from`和`Set`结构结合**
```js
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]); // [1, 2, 3]
```

**3、使用循环和`indexof/lastIndexOf`**
```js
function unique(arry) {
  const temp = [];
  arry.forEach(e => {
    if (temp.indexOf(e) == -1) {
      temp.push(e);
    }
  });
  return temp;
}
```

**4、使用循环和`includes|filter|find|some`**
```js
let a = [1, 2, 1, 3, 4, 2]
let res = []
for (let i = 0; i< a.length; i++) {
  if (!res.includes(a[i])) {
    res.push(a[i])
  }
}
console.log(res) // [1, 2, 3, 4]
```


## 70、去除字符串里面的重复字符（字符串去重）
**1、展开运算符`...`和`Set`结构**
```js
[...new Set("ababbc")].join(""); // "abc"
```

**2、使用ES5万能的`reduce`函数实现**
```js
var dic = {};
"ababbc".split("").reduce(function(total,next){
  if (!(next in dic)){
    dic[next] = true;
    total += next;
  }
  return total;
}, "")
```

**3、使用正则表达式**
```js
var reg = /(.)(?=.*\1)/g;
var result = 'ababbc'.replace(reg, "");
console.log(result)
```


## 71、求数组的最大值或最小值
**1、for循环**
```js
var a = [3, 1, 2, 3, 5];
let max = a[0]
let min = a[0]
for (let i = 0; i < a.length; i++) {
  if (a[i] > max) {
    max = a[i]
  }
  if (a[i] < min) {
    min = a[i]
  }
}
console.log(max, min) // 5 1
```

**2、借助`apply()`或`call()`方法**
```js
var a = [1, 2, 3, 5];
alert(Math.max.apply(null, a)); //最大值
alert(Math.max.call(null, ...a)); //最大值
alert(Math.min.apply(null, a)); //最小值
alert(Math.min.call(null, ...a)); //最小值
```

**3、借助`reduce()`或`reduceRight()`方法**
```js
var a = [3, 1, 2, 3, 5];
const max = a.reduce((total, currentValue, currentIndex, arr) => {
  if (currentValue >= total) {
    total = currentValue
  }
  return total
}, 0)
console.log(max)
```

**4、借助`sort()`方法**
```js
var a = [3, 1, 2, 3, 5];
let max = a.sort((a, b) => b - a)[0]
console.log(max)
```

**5、借助`sort()`和`reverse()`方法**
```js
var a = [1, 2, 3, 5];
let max = arr.sort().reverse()[0];
console.log(max);
```


## 72、JS 中 文档碎片的理解和使用
**什么是文档碎片？**
```js
document.createDocumentFragment(); // 一个容器，用于暂时存放创建的dom元素
```
**文档碎片有什么用？**
> 将需要添加的大量元素，先添加到文档碎片中，再将文档碎片添加到需要插入的位置，大大减少dom操作，提高性能（IE和火狐比较明显）。

示例：往页面上放100个元素。
```js
// 普通方式：（操作了100次dom）
// 通过for循环，每次循环，添加一个dom元素
for (var i = 100; i > 0; i--) {
  var elem = document.createElement("div");
  document.body.appendChild(elem); // 放到body中
}

// 文档碎片：(操作1次dom)
// 先将dom暂存在文档碎片中，然后在一次性操作dom
var df = document.createDocumentFragment();
for (var i = 100; i > 0; i--) {
  var elem = document.createElement("div");
  df.appendChild(elem);
}
// 最后放入到页面上
document.body.appendChild(df);
```
**前端性能优化都是从一些细节地方做起的，如果不加以注意，后果很严重。**


## 74、offsetWidth/offsetHeight, clientWidth/clientHeight 与 scrollWidth/scrollHeight 的区别？
client系列
- `clientWidth/clientHeight`返回的是元素的内部宽度，它的值只包含`content + padding`，如果有滚动条，不包含滚动条。
- `clientTop`返回的是上边框的宽度。
- `clientLeft`返回的左边框的宽度。

offset系列
- `offsetWidth/offsetHeight`返回的是元素的布局宽度，它的值包含`content + padding + border`包含了滚动条。
- `offsetTop`返回的是当前元素相对于其`offsetParent`元素的顶部的距离。
- `offsetLeft`返回的是当前元素相对于其`offsetParent`元素的左部的距离。

scroll系列
- `scrollWidth/scrollHeight`返回值包含`content + padding + 溢出内容的尺寸`。
- `scrollTop`属性返回的是一个元素的内容垂直滚动的像素数。
- `scrollLeft`属性返回的是元素滚动条到元素左边的距离。


## 75、layerX/layerY、offsetX/offsetY、pageX/pageY、clientX/clientY、screenX/screenY、x/y区别
- **layerX/layerY**
  > 如果触发元素没有设置定位，则以页面左上角为参考点；如果触发元素有设置定位，则以触发元素左上角为参考点；
- **offsetX/offsetY**
  > 鼠标相对于触发事件的元素位置内容区左上角的坐标；
- **pageX/pageY**
  > 鼠标相对于文档左上角的坐标，`pageY = clientY + scrollY`
- **clientX/clientY**
  > 鼠标相对于当前浏览器窗口左上角的坐标；
- **screenX/screenY**
  > 鼠标相对于用户显示器屏幕左上角的坐标；
- **x/y**
  > 和clientX、clientY一样；
```html
<style>
  .father {
    width: 200px;
    height: 200px;
    background: #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
  }
  .child {
    width: 50px;
    height: 50px;
    background: blue;
    color: #fff;
  }
</style>
<div class="father">
  <div class="child">child</div>
</div>
<script>
  document.querySelector('.child').addEventListener('click', (event) => {
    console.log(event)
  })
</script>
```
点击`child`盒子的任何地方，然后看控制台输出结果
![2023032111290710.png](http://img.itchenliang.club/img/2023032111290710.png)
从上面结果看到:
```js
layerX: 87
layerY: 92
clientX: 98 = layerX + 8px(浏览器默认间距)
clientY: 100 = layerY + 8px(浏览器默认间距)
offsetX: 12
offsetY: 17
pageX: 95
pageY: 100
```


## 76、web 开发中会话跟踪的方法有哪些
> 会话跟踪: 从用户进入一个网站浏览到退出这个网站或者关闭浏览器称为一次会话。会话跟踪是指在这个过程中浏览器与服务器的多次请求保持数据共享的状态的技术。

**1、cookie**
> Cookie是客户端技术，程序把每个用户的数据以cookie的形式写给用户各自的浏览器。当用户使用浏览器再去访问服务器中的web资源时，就会带着各自的数据去。

**2、session**
> Session 是存储在服务端的，并针对每个客户端（客户），通过SessionID来区别不同用户的。 该会话过程直到session失效（服务端关闭），或者客户端关闭时结束。相比cookie更安全，一般网站是session结合着cookie一起使用的。

**3、url重写**
> 客户程序在每个URL的尾部添加一些额外数据。这些数据标识当前的会话，服务器将这个标识符与它存储的用户相关数据关联起来。 URL重写是比较不错的会话跟踪解决方案，即使浏览器不支持 cookie 或在用户禁用 cookie 的情况下，这种方案也能够工作。 最大的缺点是每个页面都是动态的，如果用户离开了会话并通过书签或链接再次回来，会话的信息也会丢失，因为存储下来的链接含有错误的标识信息。

**4、隐藏input**
> 提交表单时，要将指定的名称和值自动包括在 GET 或 POST 数据中。这个隐藏域可以用来存储有关会话的信息。
```html
<input type="hidden" name="content" value="haha">
```
主要缺点是：仅当每个页面都是由表单提交而动态生成时，才能使用这种方法。


## 77、说几条写 JavaScript 的基本规范？
在平常项目开发中，我们遵守一些这样的基本规范，比如说：
1. 一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个`var`声明，不允许出现两个连续的`var`声明，声明时如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。
2. 代码中出现地址、时间等字符串时需要使用常量代替。
3. 在进行比较的时候吧，尽量使用`'==='`, `'!=='`代替`'=='`, `'!='`。
4. 不要在内置对象的原型上添加方法，如`Array`, `Date`。
5. `switch`语句必须带有`default`分支。
6. `for`循环必须使用大括号。
7. `if`语句必须使用大括号。


## 78、JavaScript 有几种类型的值？你能画一下他们的内存图吗？
分为两大类: 
- 栈: 原始数据类型(`Undefined`、`Null`、`Boolean`、`String`、`Number`)
- 堆: 引用数据类型(`Array`、`Object`、`Function`)

区别: 两大类存储位置不同。
- 原始数据类型直接存储在栈(stack)中的简单数据段，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储；
- 引用数据类型存储在堆(heap)中的对象，占据空间大、大小不固定，引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址。当解释器寻找引用值时，会首先检索其在栈中的地址，取得地址后从堆中获得实体。
  > 如果存储在栈中，将会影响程序运行的性能；

内存图如下所示: 
![202303021647274.png](http://img.itchenliang.club/img/202303021647274.png)


## 79、eval 是做什么的？
`eval`功能是把对应的字符串解析成JS代码并运行;但不安全,非常耗性能。原因在于：该过程会执行两次：
- 一次解析成 js 语句
- 一次执行 js 语句


## 80、attribute 和 property 的区别是什么？
中文翻译`property`：属性，`attribute`：特性
- `property`是DOM中的属性，是JavaScript里的对象；
  > property是这个DOM元素作为对象，其附加的内容，例如childNodes、firstChild等。
- `attribute`是HTML标签上的特性，它的值只能够是字符串；
  > attribute就是dom节点自带的属性，例如html中常用的id、class、title、align等。


## 81、谈一谈你理解的函数式编程？
主要的编程范式有三种：命令式编程、声明式编程、函数式编程。
> 函数式编程思想是把运算过程抽象成一个函数，定义好输入参数，只关心它的输出结果。

函数式编程能够更大程度上复用代码，减少冗余，vue3.0重构运用了大量的函数式编程，react也是如此。


## 82、UIWebView 和 JavaScript 之间是怎么交互的?
JSBridge
> 参考：https://blog.csdn.net/weixin_30898109/article/details/97440493


## 83、在 js 中哪些会被隐式转换为 false
`Undefined`、`null`、`关键字 false`、`NaN`、`零`、`空字符串`


## 84、列举浏览器对象模型 BOM 里常用的至少 4 个对象，并列举 window 对象的常用方法至少 5 个？
- 对象：`Window`，`Location`，`Screen`，`History`，`Navigator`。
  - `window`: 是 JS 的最顶层对象，其他的 BOM 对象都是`window`对象的属性；
  - `location`: 浏览器当前 URL 信息；
  - `navigator`: 浏览器本身信息；
  - `screen`: 客户端屏幕信息；
  - `history`: 浏览器访问历史信息；
  - `存储对象`: localStorage、sessionStorage、
- 方法：`alert()`，`confirm()`，`prompt()`，`open()`，`close()`。
  > 参考：https://www.runoob.com/jsref/obj-window.html

**DOM对象**
- `Document`: 提供了访问和更新HTML页面内容的属性和方法。
- `Node`: 提供了用于解析DOM节点树结构的属性和方法。
- `Element`: 继承于Node的。


## 85、外部 JS 文件出现中文字符，会出现什么问题，怎么解决？
会出现乱码，设置编码
```html
<meta charset="GB2312">
或者
response.setContentType("text/html;charset=UTF-8");
```


## 86、定时器 setInterval 有一个有名函数 fn1，setInterval(fn1, 500)与 setInterval(fn1(), 500)有什么区别？
```js
function fn1 () {
  console.log(1)
}
function fn2 () {
  console.log(2)
}
setInterval(fn1, 500) // 每隔 500ms 执行一次
setInterval(fn2(), 500) // 只执行一次，并且是立即执行
```
第一个是重复执行每 500 毫秒执行一次，后面一个只执行一次。


## 87、自动分号
有时 JavaScript 会自动为代码行补上缺失的分号，即自动分号插入（Automatic SemicolonInsertion，ASI）。<br>
因为如果缺失了必要的`;`，代码将无法运行。如果 JavaScript 解析器发现代码行可能因为缺失分号而导致错误，那么它就会自动补上分号。并且，只有在代码行末尾与换行符之间除了空格和注释之外没有别的内容时，它才会这样做。
```js
var a = 1
(() => {
  console.log(123)
})()
```
会报错: `Uncaught TypeError: 1 is not a function`


## 88、ES6 引入Symbol的原因
ES5 的对象属性名都是字符串，这容易造成属性名的冲突。

比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。

ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。


## 90、对象浅拷贝和深拷贝有什么区别
对象的浅拷贝和深拷贝是指对于一个对象，将其复制一份后得到的新对象，两者的区别在于新对象与原对象之间是否共享引用的属性。

::: tip 浅拷贝
浅拷贝只复制了对象本身及其非引用类型的属性，而引用类型的属性则共享原对象中的值，修改其中一个对象的引用类型属性会影响到另一个对象。
> 换句话说，新对象中的引用类型属性仍然与原对象中的引用类型属性指向同一个内存地址。因此，在修改新对象中的引用类型属性时，会影响到原对象中的相应属性。

浅拷贝可以使用`直接赋值`、`Object.assign`、`for···in只循环一层`、`扩展运算符`来实现。
```js
// 直接赋值
var obj1 = { a: 1, b: { c: 2 } };
var obj2 = obj1;
obj2.a = 3;
obj2.b.c = 4;
console.log(obj1); // {a: 3, b: {c: 4}}
console.log(obj2); // {a: 3, b: {c: 4}}

// Object.assign
var obj1 = {a: 1, b: {c: 2}};
var obj2 = Object.assign({}, obj1);
obj2.a = 3;
obj2.b.c = 4;
console.log(obj1); // {a: 1, b: {c: 4}}
console.log(obj2); // {a: 3, b: {c: 4}}

// 扩展运算符
var obj1 = { a: 1, b: { c: 2 } };
var obj2 = { ...obj1 };
obj2.a = 3;
obj2.b.c = 4;
console.log(obj1); // {a: 1, b: {c: 4}}
console.log(obj2); // {a: 3, b: {c: 4}}
```
在上述代码中，使用`Object.assign`方法实现了浅拷贝。当修改`obj2`的属性时，也会对`obj1`产生影响，因为它们共享了同一个 b 属性对象。
:::

::: tip 深拷贝
深拷贝则递归地复制了整个对象及其嵌套的引用类型属性，新对象与原对象之间不存在任何关联。
> 因此，在修改新对象中的引用类型属性时，不会影响到原对象中的相应属性。

常见的深拷贝方法可以使用`JSON`的`stringify和parse`两个函数来实现以及手写深拷贝
```js
// JSON实现
var obj1 = {a: 1, b: {c: 2}};
var obj2 = JSON.parse(JSON.stringify(obj1));
obj2.a = 3;
obj2.b.c = 4;
console.log(obj1); // {a: 1, b: {c: 2}}
console.log(obj2); // {a: 3, b: {c: 4}}

// 手写实现
function deepClone (target) {
  let res = Array.isArray(obj) ? [] : {};
  for (let key in target) {
    if (typeof target[key] === 'object') {
      res[key] = deepClone(target[key])
    } else {
      res[key] = target[key]
    }
  }
  return res
}
let obj1 = { name: '张三', age: 23 }
const obj2 = deepClone(obj1)
obj1.name = '王二'
obj2.name = '李四'
console.log(obj1) // {name: '王二', age: 23}
console.log(obj2) // {name: '李四', age: 23}
```
:::


## 91、如何编写高性能的 Javascript？
- 遵循严格模式：`"use strict"`;
- 将JS脚本放在页面底部，加快渲染页面；
- 将JS脚本将脚本成组打包，减少请求；
- 尽量使用局部变量来保存全局变量；
- 尽量减少使用闭包；
- 使用window对象属性方法时，省略window；
- 尽量减少对象成员嵌套；
- 缓存DOM节点的访问；
- 通过避免使用`eval()`和`Function()`构造器；
- 给`setTimeout()`和`setInterval()`传递函数而不是字符串作为参数；
- 尽量使用直接量创建对象和数组；
- 最小化重绘(`repaint`)和回流(`reflow`)。上原文出处链接及本声明。


## 92、documen.write 和 innerHTML 的区别?
1. `document.write`是一个方法，是重写整个`document`, 写入内容是字符串的`html`。
  ```html
  <button id="btn">点击</button>
  <script>
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', () => {
      document.write('<div style="color: red;">哈哈哈哈</div>')
    })
  </script>
  ```
2. `innerHTML`是一个属性，是`HTMLElement`的属性，是一个元素的内部`html`内容。


## 94、用原生 JavaScript 的实现过什么功能吗？
轮播图、手风琴、放大镜、3D动画效果等，切记，所答的一定要知道实现原理！，不知道还不如不说！


## 95、轮播图实现原理
1. 图片移动实现原理：<br>
  利用浮动将所有所有照片依次排成一行，给这一长串图片添加一个父级的遮罩，每次只显示一张图，其余的都隐藏起来。对图片添加绝对定位，通过控制left属性，实现照片的移动。
2. 图片移动动画原理：<br>
  从a位置移动到b位置，需要先计算两点之间的差值，通过差值和时间间隔，计算出每次移动的步长，通过添加定时器，每次移动相同的步长，实现动画效果。
3. 图片定位停止原理：<br>
  每一张照片都有相同的宽度，每张照片都有一个绝对的定位数值，通过检测定每次移动后，照片当前位置和需要到达位置之间的距离是否小于步长，如果小于，说明已经移动到位，可以将定时器清除，来停止动画。
4. 图片切换原理：<br>
  在全局设置一个变量，记录当前图片的位置，每次切换或跳转时，只需要将数值修改，并调用图片页数转像素位置函数，再调用像素运动函数即可。
5. 自动轮播原理：<br>
  设置定时器，一定时间间隔后，将照片标记加1，然后开始切换。
6. 左右点击切换原理：<br>
  修改当前位置标记，开始切换。这里需要注意与自动轮播之间的冲突。当点击事件触发之后，停止自动轮播计时器，开始切换。当动画结束后再次添加自动轮播计时器。
7. 无缝衔接原理：<br>
  需要无缝衔接，难度在于最后一页向后翻到第一页，和第一页向前翻到最后一页。由于图片的基本移动原理。要想实现无缝衔接，两张图片就必须紧贴在一起。所以在第一张的前面需要添加最后一张，最后一张的后面需要添加第一张。
8. 预防鬼畜原理：<br>
  始终保证轮播图的运动动画只有一个，从底层杜绝鬼畜。需要在每次动画开始之前，尝试停止动画定时器，然后开始为新的动画添加定时器。
9. 预防暴力点击原理：<br>
  如果用户快速点击触发事件，会在短时间内多次调用切换函数，虽然动画函数可以保证，不会发生鬼畜，但在照片从最后一张到第一张的切换过程，不会按照正常的轮播，而是实现了跳转。所以需要通过添加口令的方式来，限制用户的点击。当用户点击完成后，口令销毁，动画结束后恢复口令。
10. 小圆点的位置显示原理：<br>
  每次触发动画时，通过全局变量标记，获取当前页数，操作清除所有小圆点，然后指定一页添加样式。
11. 点击触发跳转的原理：<br>
  类似于左右点击触发，只是这是将全局页面标记，直接修改，后执行动画。需要避免与自动轮播定时器的冲突。


## 96、❓如何设计一个轮播图组件
1. 轮播图功能实现
2. 抽出需要传入的变量，如：背景图，文案描述等


## 97、简述创建函数的几种方式
**1、函数声明方式**
```js
function sum1(num1,num2){
  return num1+num2;
}
```
**2、函数表达式方式**
```js
var sum2 = function(num1,num2){
  return num1+num2;
}
```
**3、函数对象（构造函数方式）**
```js
var sum3 = new Function("num1","num2","return num1+num2");
```


## 98、window.location.search和window.location.hash返回的是什么？
### window.location.search
查询(参数)部分。除了给动态语言赋值以外，我们同样可以给静态页面, 并使用 javascript 来获得相信应的参数值 返回值：`?ver=1.0&id=timlq`也就是问号后面的
```js
// 比如当前url是 http://www.baidu.com?ver=1.0&id=timlq
window.location.search // ?ver=1.0&id=timlq
```
### window.location.hash
锚点，返回值：`#love`；
```js
// 比如当前url是 http://dev.app.puliedu.com/#/backstage/sampleLabs
window.location.hash // #/backstage/sampleLabs
```


## 99、window.location.reload()作用？
刷新当前页面


## 100、谈谈你对函数柯里化的理解？
柯里化(`Currying`)是一种函数转化方法，它将一个接收多参数的函数转化为接收部分参数的函数。柯里化后的函数只传递部分参数来调用，并返回一个新的函数，去处理剩余的参数，是逐步传参的过程。
> 是高阶函数的一种: 接收函数作为参数的函数
```js
function add (x, y) {
  return x + y
}
add(2, 3) // 5
```
将上面例子使用`函数柯里化`方式改写
```js
function add (x) {
  return function (y) {
    return x + y
  }
}
add(2)(3) // 5
```
常见的面试题: 用函数柯里化的方式实现一个函数，使`add(1, 2, 3);`、`add(1)(2, 3);`、`add(1)(2)(3);`返回的结果与
```js
function add (x,y,z) {
  return x + y + z
}
```
的返回结果一致。
```js
function add (x, y, z) {
  return x + y +z
}
function curry (fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }
  return (...otherArgs) => {
    return curry(fn, ...args, ...otherArgs)
  }
}
const addCurry = curry(add)
console.log(addCurry(1, 2, 3)) // 6
console.log(addCurry(1)(2, 3)) // 6
console.log(addCurry(1)(2)(3)) // 6
```


## 101、BOM对象有哪些，列举window对象？
- window对象 ，是JS的最顶层对象，其他的BOM对象都是window对象的属性；
- document对象，文档对象；
- location对象，浏览器当前URL信息；
- navigator对象，浏览器本身信息；
- screen对象，客户端屏幕信息；
- history对象，浏览器访问历史信息；


## 102、简述 readonly 与 disabled 的区别
`readonly`和`disabled`是用在表单中的两个属性，它们都能够做到使用户不能够更改表单域中的内容。
> 表单元素设置`disabled`后，当我们将表单以POST或GET的方式提交的话，这个元素的值不会被传递出去，而`readonly`会将该值传递出去。

**区别**：
- `readonly`只针对`input(text/password)`和`textarea`有效
- `disabled`对于所有的表单元素都有效，包括`select`, `radio`, `checkbox`, `button`等


## 103、为什么扩展 javascript 内置对象不是好的做法？
因为扩展内置对象会影响整个程序中所使用到的该内置对象的原型属性。


## 104、什么是三元表达式？“三元”表示什么意思？
三元如名字表示的三元运算符需要三个操作数。<br>
语法是`条件 ? 结果1 : 结果2;` 这里你把条件写在问号(`?`)的前面后面跟着用冒号(`:`)分隔的结果1和结果2。满足条件时结果1否则结果2。


## 105、简述一下 Handlebars 的基本用法？
> Web 模板引擎是为了使用户界面与业务数据（内容）分离而产生的，Handlebars 是 JavaScript 一个语义模板库，通过对 view 和 data 的分离来快速构建 Web 模板。它采用"Logic-less template"（无逻辑模版）的思路，在加载时被预编译，而不是到了客户端执行到代码时再去编译， 这样可以保证模板加载和运行的速度。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://unpkg.com/handlebars@4.7.7/dist/handlebars.js"></script>
  <script src="https://unpkg.com/jquery@3.6.3/dist/jquery.js"></script>
</head>
<body>
  <div id="container"></div>
  <script type="text/x-handlebars-template" id="template-user">
    {{#each this}}
      <p>{{name}}:{{age}}</p>
    {{/each}}
  </script>
  <script>
    var $container = $('#container')
    var source = $('#template-user').html()
    var template = Handlebars.compile(source)   //编译成模板
    var html = template([{
      name: '张三',
      age: 23
    }, {
      name: '李四',
      age: 24
    }])   // 生成完整的html结构
    $container.html(html)
  </script>
</body>
</html>
```
输出结果如下：
![202302150946079.png](http://img.itchenliang.club/img/202302150946079.png)


## 106、知道什么是 webkit 么? 知道怎么用浏览器的各种工具来调试和 debug 代码么?
`Webkit`是一种浏览器引擎，Chrome和safari浏览器的内核。所谓浏览器引擎，其主要工作就是对html文件的解析和JS的执行，同时也可以提供一些工具，例如，调试工具`firebug`的内部实现。
> 与之相对应的引擎有`Gecko`(Mozilla Firefox等使用)和`Trident`(也称 MSHTML，IE使用)。

对于浏览器的调试工具要熟练使用，主要是页面结构分析，后台请求信息查看，js调试工具使用，熟练使用这些工具可以快速提高解决问题的效率。


## 107、如何测试前端代码? 知道 BDD, TDD, Unit Test 么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?
### BDD, TDD, Unit Test
**TDD**
> `TDD`英文全称为：`Test Driven Development`表示测试驱动开发，它是一种测试驱动开发，它是一种测试先于编写代码的思想用于指导软件开发。简单地说就是先根据需求写测试用例，再代码实现，接着测试，循环此过程直到产品的实现。
特点:
- 有利于更加专注软件设计
- 清晰地了解软件的需求
- 很好的诠释了代码即文档

**BDD**
> `BDD`英文全称为：`Behavior Driven Development`表示行为驱动开发，它鼓励软件开发者，测试人员和非技术人员或者商业参与者之间的协作。BDD可以看作是对`TDD`的一种补充，或者说是`TDD`的一个分支。`BDD`更加依赖于需求行为和文档来驱动开发，这些文档的描述跟测试代码很相似。e2e测试更多是和BDD的开发模式进行结合。

**unit test**
> `unit test`为单元测试，主要用于测试开发人员编写的代码是否正确，这部分工作都是由开发人员自己来做的。

### mocha
Mocha.js是一个流行的 JavaScript 测试框架，它提供了一组简单易用的 API 用于编写和运行测试。下面是一个简单的 Mocha.js 测试用例示例：
```js
const assert = require('assert');

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```
该示例定义了描述测试套件的`describe`函数，其中包含一个或多个描述测试用例的`it`函数。在该示例中，我们编写了一个测试用例来测试数组中的元素是否存在并返回其索引值。使用`assert`模块进行断言。

要运行此测试用例，你需要先安装 Mocha.js：
```sh
npm install --global mocha
```
然后，在命令行中进入测试文件所在目录，运行以下命令：
```sh
mocha test.js
```
其中`test.js`是包含测试用例的文件名。执行完毕后，将显示测试结果。



## 108、如何添加 html 元素的事件，有几种方法？请列举
**方法一：在HTML元素当中绑定事件**
```html
<div class="wrap" onclick="show()">绑定事件一</div>
<script type="text/javascript">
  function show() {
    alert('绑定事件一');
  }
</script>
```
**方法二：使用js给元素绑定事件**
```html
<div class="wrap" id="btn">绑定事件二</div>
<script type="text/javascript">
  var btnEle = document.querySelector('#btn');
  btnEle.onclick = show;
  function show() {
    alert('绑定事件二');
  }
</script>
```
**方法三：使用事件注册函数**
```html
<div class="wrap" id="btn">绑定事件三</div>
<script type="text/javascript">
  var btnEle = document.querySelector('#btn');
  btnEle.addEventListener('click', show, !1);
  function show() {
    alert('绑定事件三');
  }
</script>
```


## 109、如何自定义事件？
自定义事件有如下三种方式:
- **1、`createEvent`、`initEvent`、`dispatchEvent`三件套**
  - `createEvent`设置事件类型，是 html 事件还是 鼠标事件
  - `initEvent`初始化事件，事件名称，是否允许冒泡，是否阻止自定义事件
  - `dispatchEvent`触发事件
  ```html
  <div style="width:100px;height:100px;background-color: bisque;" id="div01"></div>
  <script>
    // 1、创建事件.
    var event = document.createEvent('Event');
    const el = document.getElementById("div01")
    // 2、初始化一个点击事件，可以冒泡，无法被取消
    event.initEvent('dianJi', true, false);
    // 3、设置事件监听.
    el.addEventListener('dianJi', function(e) {
      console.log('打印了', e)
    }, false);
    // 4、触发事件监听
    el.dispatchEvent(event);
  </script>
  ```
- **2、`Event()`**
  ```html
  <div style="width:100px;height:100px;background-color: bisque;" id="div01"></div>
  <script>
    // 1、创建事件.
    const event = new Event('custom');
    const el = document.getElementById("div01")
    // 2、设置事件监听.
    el.addEventListener('custom', (e) => {
      console.log('打印', e)
    });
    // 3、触发事件监听
    // 必须使用Dom元素将该事件分发出去，否则无法进行监听
    el.dispatchEvent(event);
  </script>
  ```
- **3、`CustomEvent()`**
  ```html
  <div style="width:100px;height:100px;background-color: bisque;" id="div01"></div>
  <script>
    // 1、创建事件.
    const event = new CustomEvent('custom', { detail: { language: 'JavaScript' } });
    const el = document.getElementById("div01")
    // 2、设置事件监听.
    el.addEventListener('custom', (e) => {
      console.log('打印', e.detail) //  { language: 'JavaScript' }
    });
    // 3、触发事件监听
    // 必须使用Dom元素将该事件分发出去，否则无法进行监听
    el.dispatchEvent(event);
  </script>
  ```


## 110、target 和 currentTarget 区别？
- `event.target`：返回触发事件的元素
- `event.currentTarget`：返回绑定事件的元素

<p style="color: red;"><code>currentTarget</code>始终是监听事件者，而<code>target</code>是事件的真正发出者。</p>

两者在没有冒泡的情况下，是一样的值，但在用了事件委托的情况下，就不一样了；
```html
<ul id="ulT">
  <li class="item1">fsda</li>
  <li class="item2">ewre</li>
  <li class="item3">qewe</li>
  <li class="item4">xvc</li>
  <li class="item5">134</li>
</ul>
<script>
const ul = document.getElementById("ulT")
ul.addEventListener('click', (event) => {
  console.log(event.target, event.currentTarget);
})
</script>
```
![202303211052231.png](http://img.itchenliang.club/img/202303211052231.png)
可以通过设置事件在捕获过程触发，如下例子
```html
<div class="father">
  <div class="child">child</div>
</div>
<script>
  const father = document.querySelector('.father')
  const child = document.querySelector('.child')
  child.addEventListener('click', (event) => {
    // 阻止冒泡
    console.log(event.target, event.currentTarget)
  }, true)
  father.addEventListener('click', (event) => {
    console.log(event.target, event.currentTarget)
  }, true)
</script>
```
点击`child`会发现控制台输出结果如下图所示，是因为我们在father的事件监听上设置了`useCapture: true`，即代表在捕获阶段触发，而事件查找是有外向内查找即`html -> 目标元素`的过程，所以就先触发了`father`的`click`事件。
![202303211054585.png](http://img.itchenliang.club/img/202303211054585.png)


## 113、JSON 的了解
`JSON`(JavaScript Object Notation) 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。
> 在项目开发中，我们使用`JSON`作为前后端数据交换的方式。在前端我们通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。


## 114、怎样添加、移除、移动、复制、创建和查找节点？
- 创建新节点
  - `createDocumentFragment()`：创建一个 DOM 片段
  - `createElement()`：创建一个具体的元素
  - `createTextNode()`：创建一个文本节点
- 添加、移除、替换、插入
  - `appendChild()`：添加
  - `removeChild()`：移除
  - `replaceChild()`：替换
  - `insertBefore()`：插入
- 查找
  - `getElementsByTagName()`：通过标签名称
  - `getElementsByName()`：通过元素的 Name 属性的值
  - `getElementById()`：通过元素 Id，唯一性
  - `querySelector(CSS selectors)`：匹配指定 CSS 选择器的一个元素
  - `querySelectorAll(CSS selectors)`：匹配指定 CSS 选择器的所有元素，返回 NodeList 对象


## 116、如何避免重绘或者重排？
重绘: ``、重排``
- 减少直接操作`dom`元素，改用`className`用于控制或者使用`cssText`统一设置样式
  > 可以添加一个类，样式都集中在类中改变
  ```js
  // 使用cssText
  const el = document.getElementById('test');
  el.style.cssText += 'border-left: 1px; border-right: 2px; padding: 5px;';

  // 修改CSS的class
  const el = document.getElementById('test');
  el.className += ' active'; 
  ```
- 尽量减少`table`使用，`table`属性变化使用会直接导致布局重排或者重绘
- 当`dom`元素`position`属性为`fixed`或者`absolute`，脱离文档流，可以通过css形变触发动画效果，此时是不会出发`reflow`的
- 不要把`DOM`结点的属性值放在一个循环里当成循环里的变量
- 如果需要创建多个`DOM`节点，可以使用`DocumentFragment`创建完后一次性的加入`document`
- 能用css3实现的就用css3实现
  > 比起考虑如何减少回流重绘，我们更期望的是，根本不要回流重绘。这个时候，**css3硬件加速**就闪亮登场啦！！
  - 使用css3硬件加速，可以让`transform、opacity、filters`这些动画不会引起回流重绘
  - 对于动画的其它属性，比如`background-color`这些，还是会引起回流重绘的，不过它还是可以提升这些动画的性能。


## 117、delete 数组的 item，数组的 length 是否会 -1
**`delete Array[index]`**
```js
const arr = ['a', 'b', 'c', 'd', 'e'];
let result = delete arr[1];
console.log(result); // true;
console.log(arr); // ['a', undefined, 'c', 'd', 'e']
console.log(arr.length); // 5
console.log(arr[1]); // undefined
```
使用`delete`删除元素，返回`true`和`false`, `true`表示删除成功，`false`表示删除失败。使用`delete`删除数组元素并不会改变原数组的长度，只是把被删除元素的值变为`undefined`。


## 118、给出`['1', '3', '10', '4', 112].map(parseInt)`执行结果
结果是: `[1, NaN, 2, NaN, 22]`

**`map`使用语法**
```js
[1, 2, 3].map(function(current, index, arr) {
})
```
参数解析:
- **current**: 当前元素值
- **index**: 当前元素索引值
- **arr**: 数组本身

**`parseInt`使用语法**
```js
parseInt(str, radix)
```
参数解析:
- **str**: 需要解析的字符串
- **radix**: ⼏进制
  - 若省略或为0，则以10进⾏解析
  - 若⼩于2或者⼤于36，则返回`NaN`

所以该题展开来写：
```js
const result = ['1', '3', '10'].map(function(cur, index, arr) {
return parseInt(cur, index);
});
// 执⾏过程：
// parseInt('1', 0) -> 1
// parseInt('3', 1) -> 由于基数为1，不在2~36之间，则返回NaN
// parseInt('10', 2) -> // 基数为2，故结果为 1 * 2 ^ 1 + 0 * 2 ^ 0 = 2
// parseInt('4', 3) -> 由于基数为3，而三进制的取值范围是0、1、2，此处为4，不在三进制取值范围，故NaN
// parseInt('112', 4) -> 由于基数为4，故结果为 1 * 4 ^ 2 + 1 * 4 ^ 1 + 2 * 4 ^ 0 = 22
```

## 120、什么是工厂函数
JavaScript 工厂函数（Factory Function）是一种创建和返回对象的函数，它不需要使用`new`关键字来将一个类构造函数实例化，而是直接返回一个新的对象，通常用于抽象对象的创建过程。
> 工厂函数可以接受任意数量的参数，并使用这些参数来生成新的对象。由于工厂函数本身就是一个普通的 JavaScript 函数，因此它具有一些常规的函数特点，比如可以使用函数作用域、闭包等技术来隐藏实现细节、保护私有数据等。
```js
function createStudent(name, age, gender) {
  return {
    name: name,
    age: age,
    gender: gender,
    study: function(subject) {
      console.log(`${this.name} is studying ${subject}.`);
    }
  };
}
```


## 121、数组降维
- 1、**数组字符串化**
  ```js
  let arr = [
    [222, 333, 444],
    [55, 66, 77], {
      a: 1
    }
  ]
  arr += '';
  arr = arr.split(',');
  console.log(arr); // ["222", "333", "444", "55", "66", "77", "[object Object]"]
  ```
  这也是比较简单的一种方式，从以上例子中也能看到问题，所有的元素会转换为字符串，且元素为对象类型会被转换为 "[object Object]" ，对于同一种类型数字或字符串还是可以的。
- 2、**利用`apply`和`concat`转换**
  ```js
  function reduceDimension(arr) {
    return Array.prototype.concat.apply([], arr);
  }

  console.log(reduceDimension([
    [123], 4, [7, 8],
    [9, [111]]
  ])); // [123, 4, 7, 8, 9, Array(1)]
  ```
- 3、**递归**
  ```js
  function reduceDimension(arr) {
    let ret = [];
    let toArr = function(arr) {
      arr.forEach(function(item) {
        item instanceof Array ? toArr(item) : ret.push(item);
      });
    }
    toArr(arr);
    return ret;
  }
  ```
- 4、**`Array​.prototype​.flat()`**
  ```js
  var arr1 = [1, 2, [3, 4]];
  arr1.flat();
  // [1, 2, 3, 4]

  var arr2 = [1, 2, [3, 4, [5, 6]]];
  arr2.flat();
  // [1, 2, 3, 4, [5, 6]]

  var arr3 = [1, 2, [3, 4, [5, 6]]];
  arr3.flat(2);
  // [1, 2, 3, 4, 5, 6]

  //使用 Infinity 作为深度，展开任意深度的嵌套数组
  arr3.flat(Infinity);
  // [1, 2, 3, 4, 5, 6]
  ```
- 5、**使用`reduce`、`concat`和递归无限反嵌套多层嵌套的数组**
  ```js
  var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];
  function flattenDeep(arr1) {
    return arr1.reduce((acc, val) => Array.isArray(val) ? acc.concat(flattenDeep(val)) : acc.concat(val), []);
  }
  flattenDeep(arr1);
  // [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
  ```


## 122、为什么for循环嵌套顺序会影响性能？
把循环次数大的放在内层，执行时间会比较短
```js
var t1 = new Date().getTime()
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 10000; k++) {

    }
  }
}
var t2 = new Date().getTime()
console.log('first time', t2 - t1)
```

| 变量 |  实例化(次数) | 初始化(次数) | 比较(次数) | 自增(次数) |
| --- | --- | --- | --- | --- |
| i | 1 | 1 | 10 | 10 |
| j | 10 | 10 | 10 * 100 | 10 * 100 |
| k | 10 * 100 | 10 * 100 | 10 * 100 * 1000 | 10 * 100 * 1000 |

```js
for (let i = 0; i < 10000; i++) {
  for (let j = 0; j < 1000; j++) {
    for (let k = 0; k < 100; k++) {

    }
  }
}
var t3 = new Date().getTime()
console.log('two time', t3 - t2)
```

| 变量 |  实例化(次数) | 初始化(次数) | 比较(次数) | 自增(次数) |
| --- | --- | --- | --- | --- |
| i | 1 | 1 | 1000 | 1000 |
| j | 1000 | 1000 | 1000 * 100 | 1000 * 100 |
| k | 1000 * 100 | 1000 * 100 | 1000 * 100 * 10 | 1000 * 100 * 10 |


## 123、什么是Generator 函数
如果某个方法之前加上星号（`*`），就表示该方法是一个`Generator`函数。`Generator`函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。
> `Generator`函数有多种理解角度。语法上，首先可以把它理解成，`Generator`函数是一个状态机，封装了多个内部状态。执行`Generator`函数会返回一个遍历器对象，也就是说，`Generator`函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历`Generator`函数内部的每一个状态。形式上，`Generator`函数是一个普通函数，但是有两个特征：
- `function`关键字与函数名之间有一个星号；
- 函数体内部使用`yield`表达式，定义不同的内部状态（`yield`在英语里的意思就是“产出”）。

ES6 没有规定，`function`关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```
由于`Generator`函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在`function`关键字后面。本书也采用这种写法。


## 124、Javascript中，有一个函数，执行时对象查找时，永远不会去查找原型的函数?
`Object.hasOwnProperty(proName)`：是用来判断一个对象是否有你给出名称的属性。
> 此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。


## 125、怎样理解setTimeout执行误差
`setTimeout`函数用于在一定时间后执行指定的代码。然而，由于JavaScript是单线程语言，在调用`setTimeout`时无法保证准确地在指定时间后执行代码。这是因为在指定时间之前可能有其他代码正在执行，从而导致`setTimeout`被延迟执行。
> 此外，也存在浏览器实现的不同，以及硬件性能等因素的影响，都会对`setTimeout`的执行误差产生影响。因此，不能完全依赖`setTimeout`在精确的时间点上执行代码。

这种误差主要是由以下两个方面造成的：
- JS引擎中的事件循环机制：JavaScript 引擎需要在执行代码的同时，处理其他任务，比如用户输入、网络请求等。在这些任务的处理过程中，会影响到 setTimeout 函数的回调函数的执行时间。
- 定时器的实现方式：不同的浏览器对`setTimeout`函数的实现方式可能存在差异，导致回调函数执行的精度也不同。

另外，需要注意的是，如果在一个宏任务中运行了耗时较长的操作，那么在该任务结束前，任何通过`setTimeout`延迟执行的代码都将被阻塞。这意味着，定时器的实际执行时间可能会比预期时间晚很多。
```js
setTimeout(() => {
  console.log('阻塞输出', new Date().getSeconds())
}, 2000)

const startTime = new Date().getSeconds()
console.log('正常时间', new Date().getSeconds())
while (true) {
  const endTime = new Date().getSeconds()
  if (endTime - startTime >= 3) {
    console.log('正常输出', new Date().getSeconds())
    break
  }
}
// 输出
// 正常时间 8
// 正常输出 11
// 阻塞输出 11
```
从上面输出结果来看，我们定的`setTimeout`延迟时间是`2秒`，正常情况下，应该在`正常时间 8`后的两秒即`10秒`时输出，由于我们写了一个`while`语句，使宏任务执行了`3秒`，按照上面的逻辑，所以我们的`setTimeout`实际是延迟了`3秒`。

为了避免`setTimeout`的误差，可以使用`requestAnimationFrame`或`setImmediate`等其他替代性方案。此外，在编写代码时，应尽量减少在`setTimeout`回调函数中执行大量计算或重复性操作的情况，以提高代码执行的效率和精度。

**特殊情况**: 在最新的规范里有这么一句`If nesting level is greater than 5, and timeout is less than 4, then increase timeout to 4.`(意思就是如果`timeout`嵌套`大于5层`，而时间间隔`小于4ms`，则时间间隔增加到`4ms`。)
```js
setTimeout(function() {
  setTimeout(function() {
    setTimeout(function() {
      setTimeout(function() {
        setTimeout(function() {
          setTimeout(function() {
            console.log('嘤嘤嘤');
          }, 0);
        }, 0);
      }, 0);
    }, 0);
  }, 0);
}, 0);
```


## 126、JavaScript 中`undefined`和`not defined`的区别
- `undefined`是没有初始化；
- `not defined`是没有声明；


## 127、在JavaScript中创建一个真正的`private`方法有什么缺点？
每一个对象都会创建一个`private`方法的方法，这样很耗费内存。
```js
var Employee = function(salary) {
  this.salary = salary;
  // 私有方法
  var increaseSalary = function() {
    this.salary = this.salary + 100;
  };
  // 公共方法
  this.printIncreaseSalary = function() {
    increaseSlary();
    console.log(this.salary);
  };
};

// Create Employee class object
var emp1 = new Employee(3000);
// Create Employee class object
var emp2 = new Employee(2000);
```
在这里`emp1`, `emp2`都有一个`increaseSalary`私有方法的副本。所以我们除非必要，非常不推荐使用私有方法。


## 128、JavaScript怎么清空数组？
**方法1**
```js
arrayList = [];
```
直接改变`arrayList`所指向的对象，原对象并不改变。

**方法2**
```js
arrayList.length = 0;
```
这种方法通过设置`length = 0`使原数组清除元素。

**方法3**
```js
arrayList.splice(0, arrayList.length);
```

**方法四**: 该方案不是很简洁，也是最慢的解决方案，与原始答案中引用的早期基准相反。
```js
while (arrayList.length) {
  arrayList.pop()
}
```


## 129、怎么判断一个`object`是否是数组(`array`)？
**方法1**：使用`Object.prototype.toString`来判断是否是数组
```js
Object.prototype.toString.call({}) === '[object Object]';
Object.prototype.toString.call([]) === '[object Array]';
```
这里使用`call`来使`toString`中`this`指向`obj`。进而完成判断

**方法二**：使用`原型链`来完成判断
```js
obj.__proto__ === Array.prototype
```
基本思想是利用 实例如果是某个构造函数构造出来的那么 它的 `__proto__`是指向构造函数的 `prototype` 属性。

**方法3**：使用`Array.isArray`判断
```js
Array.isArray(obj)
```


## 130、javascript 的同源策略
所谓同源是指，域名，协议，端口相同，同源策略是一种安全协议。不同源的客户端脚本(javascript、ActionScript)在没明确授权的情况下，不能读写对方的资源。
> 简单的来说，浏览器允许包含在页面A的脚本访问第二个页面B的数据资源，这一切是建立在A和B页面是同源的基础上。<br>


## 131、什么是跨域？跨域请求资源的方法有哪些？
**跨域请求资源**
1. proxy代理<br>
  定义和用法：proxy代理用于将请求发送给后台服务器，通过服务器来发送请求，然后将请求的结果传递给前端。<br>
  实现方法：通过nginx代理；<br>
  注意点：如果你代理的是https协议的请求，那么你的proxy首先需要信任该证书（尤其是自定义证书）或者忽略证书检查，否则你的请求无法成功。
2. CORS 【Cross-Origin Resource Sharing】<br>
  定义和用法：是现代浏览器支持跨域资源请求的一种最常用的方式。<br>
  使用方法：一般需要后端人员在处理请求数据的时候，添加允许跨域的相关操作。如下：
  ```js
  res.writeHead(200, {
    "Content-Type": "text/html; charset=UTF-8",
    "Access-Control-Allow-Origin":'http://localhost',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type'
  });
  ```
3. 使用window.name+iframe来进行跨域<br>
  `itchenliang.club/index.html`代码
  ```js
  window.name = 'itchenliang'
  ```
  在其他域名的`index.html`中写入如下代码：
  ```html
  <iframe src="http://itchenliang.club/index.html" id="iframe" onload="test()" style="display:none;"></iframe>
  <script>
    function test(){
      const iframe = document.querySelector('#iframe')
      console.log(123)
      iframe.onload = () => {
        var win = iframe.contentWindow;
        alert(win.name)
      }
      iframe.src = 'demo.html'
    }
  </script>
  ```
4. jsonp<br>
  定义和用法：通过动态插入一个script标签。浏览器对script的资源引用没有同源限制，同时资源加载到页面后会立即执行（没有阻塞的情况下）。<br>
  特点：通过情况下，通过动态创建script来读取他域的动态资源，获取的数据一般为json格式。
  ```html
  <script>
    function testjsonp(data) {
      console.log(data.name); // 获取返回的结果
    }
  </script>
  <script>
    var _script = document.createElement('script');
    _script.type = "text/javascript";
    _script.src = "http://localhost:8888/jsonp?callback=testjsonp";
    document.head.appendChild(_script);
  </script>
  ```
  缺点：<br>
  - 这种方式无法发送post请求（这里）
  - 另外要确定jsonp的请求是否失败并不容易，大多数框架的实现都是结合超时时间来判定。


## 132、谈谈垃圾回收机制方式及内存管理
**回收机制方式**<br>
定义和用法：垃圾回收机制(GC:Garbage Collection),执行环境负责管理代码执行过程中使用的内存。<br>
原理：垃圾收集器会定期（周期性）找出那些不在继续使用的变量，然后释放其内存。但是这个过程不是实时的，因为其开销比较大，所以垃圾回收器会按照固定的时间间隔周期性的执行。
```js
function fn1() {
  var obj = {name: 'hanzichi', age: 10};
}
function fn2() {
  var obj = {name:'hanzichi', age: 10};
  return obj;
}
var a = fn1();
var b = fn2();
```
fn1中定义的obj为局部变量，而当调用结束后，出了fn1的环境，那么该块内存会被js引擎中的垃圾回收器自动释放；在fn2被调用的过程中，返回的对象被全局变量b所指向，所以该块内存并不会被释放。

**垃圾回收策略**<br>
标记清除(较为常用)和引用计数。
- 标记清除：
  - 定义和用法：当变量进入环境时，将变量标记"进入环境"，当变量离开环境时，标记为："离开环境"。某一个时刻，垃圾回收器会过滤掉环境中的变量，以及被环境变量引用的变量，剩下的就是被视为准备回收的变量。
  - 到目前为止，IE、Firefox、Opera、Chrome、Safari的js实现使用的都是标记清除的垃圾回收策略或类似的策略，只不过垃圾收集的时间间隔互不相同。
- 引用计数：
  - 定义和用法：引用计数是跟踪记录每个值被引用的次数。
  - 基本原理：就是变量的引用次数，被引用一次则加1，当这个引用计数为0时，被视为准备回收的对象。

**内存管理**
- 什么时候触发垃圾回收？<br>
  垃圾回收器周期性运行，如果分配的内存非常多，那么回收工作也会很艰巨，确定垃圾回收时间间隔就变成了一个值得思考的问题。<br>
  IE6的垃圾回收是根据内存分配量运行的，当环境中的变量，对象，字符串达到一定数量时触发垃圾回收。垃圾回收器一直处于工作状态，严重影响浏览器性能。<br>
  IE7中，垃圾回收器会根据内存分配量与程序占用内存的比例进行动态调整，开始回收工作。
- 合理的GC方案：
  - (1)、遍历所有可访问的对象;
  - (2)、回收已不可访问的对象。
- GC缺陷：
  - 停止响应其他操作；
- GC优化策略
  - (1)、分代回收（Generation GC）;
  - (2)、增量GC


## 133、用正则把yya yyb yyc变成yya5 yyb6 yyc7？
```js
j = 5;
str.replace(/\w+/g, function(m) {
  return m + j++;
});
// function的第一参数代表匹配正则的字符串，第二个代表第一个子表达式匹配的字符串，第三个代表第二个子表达式匹配的字符串。
```


## 134、怎么判断两个json对象的内容相等？
**1、通过`JSON.stringify()`方法转成字符串对比**
```js
obj = { a: 1, b: 2 }
obj2 = { a: 1, b: 2 }
obj3 = { a: 1, b: 2 }
JSON.stringify(obj) == JSON.stringify(obj2); //true
JSON.stringify(obj) == JSON.stringify(obj3); //false
```

**2、通过循环实现**
```js
const obj = { a: 1, b: 2 }
const obj2 = { a: 1, b: 3 }
let flag = true
for (let key in obj) {
  if (obj[key] !== obj2[key]) {
    flag = false
  }
}
```


## 135、关于函数的 length 属性
```js
(() => 1).length === 0; // 输出true
```
函数是有`length`属性的，函数的`length`属性就是函数参数的个数，函数的参数就是`arguments`，而`arguments`也是一个类数组对象所以他是有`length`属性的


## 136、数组中字符串键值的处理
在 JavaScript 中数组是通过数字进行索引，但是有趣的是他们也是对象，所以也可以包含 字符串 键值和属性，但是这些不会被计算在数组的长度（length）内，如果字符串键值能够被强制类型转换为十进制数字的话，它就会被当做数字索引来处理
```js
const arr = [];
arr[0] = 1;
arr['1'] = '嘿嘿';
arr['cym'] = 'cym';
console.log(arr); // [1, '嘿嘿', cym: 'cym']
console.log(arr.length); // 2
```


## 137、什么是链表？
链表是一种物理存储单元上非连续、非顺序的存储结构。链表由一系列结点组成，结点可以在运行时动态生成。

每个结点包括两个部分：
- 一个是存储数据元素的数据域；
- 另一个是存储下一个结点地址的指针域。

js模拟链表: 
- **模拟定义**
  ```js
  const a = { val: 'a' }
  const b = { val: 'b' }
  const c = { val: 'c' }
  const d = { val: 'd' }
  a.next = b
  b.next = c
  c.next = d
  console.log(a)
  ```
  ![202303041736453.png](http://img.itchenliang.club/img/202303041736453.png)
- **遍历链表**
  ```js
  let p = a // 声明一个指针, 指向链表的头部 a
  while (p) {
    console.log(p.val)
    p = p.next // 依次指向下一个链表元素
  }
  ```
- **插入链表**
  ```js
  const e = { val:  'e' }
  d.next = e
  ```
- **删除**
  ```js
  c.next = e
  ```



## 138、链表的基本特征
- 每个元素除了存储数据，需要有额外的内存存储一个引用（地址），来指向下一个元素；
- 每个元素占用的内存空间并不要求是连续的；
- 往往使用链表的第一个节点（根节点）来代表整个链表；
- 长度是可变的，随时可以增加和删除元素；
- 插入和删除元素的效率极高；
- 由于要存储下一个元素的地址，会增加额外的内存开销；
- 通过下标查询链表中的某个节点，效率很低，因此链表的下标遍历效率低。


## 139、如何查找一篇英文文章中出现频率最高的单词？
方式一：将文章通过" "拆解成一个个的单词，然后遍历查询
```js
function getChapterMax (str) {
  const arr = str.split(' ')
  const res = {}
  let maxWord = ''
  let maxNum = 0
  arr.forEach(el => {
    // 只查找是单词的
    if (!/\w+/.test(el)) {
      return
    }
    if (res[el]) {
      res[el] += 1
    } else {
      res[el] = 1
    }
  })
  for (let key in res) {
    if (res[key] >= maxNum) {
      maxNum = res[key]
      maxWord = key
    }
  }
  return {
    maxNum,
    maxWord
  }
}
console.log(getChapterMax(`my name to name to my to`))
```
方式二：通过正则表达是去匹配
```js
function findMostWord(article) {
  // 合法性判断
  if (!article) return;
  // 参数处理
  article = article.trim().toLowerCase();
  let wordList = article.match(/[a-z]+/g),
    visited = [],
    maxNum = 0,
    maxWord = "";
  article = " " + wordList.join("  ") + " ";
  // 遍历判断单词出现次数
  wordList.forEach(function(item) {
    if (visited.indexOf(item) < 0) {
      // 加入 visited 
      visited.push(item);
      let word = new RegExp(" " + item + " ", "g"),
        num = article.match(word).length;
      if (num > maxNum) {
        maxNum = num;
        maxWord = item;
      }
    }
  });
  return maxWord + "  " + maxNum;
}
```


## 141、undefined 与 undeclared 的区别？
`undefined`是Javascript中的语言类型之一，而`undeclared`是Javascript中的一种语法错误。
- `undefined`: 已申明，未赋值<br>
  尝试访问一个`undefined`的变量时，浏览器不会报错并会返回`undefined`。使用`typeof`时返回`undefined`。
- `undeclared`: 未声明，未赋值<br>
  尝试访问一个`undeclared`的变量时，浏览器会报错`ReferenceError: b is not defined`，JS执行会中断。使用`typeof`时返回`undefined`。
```js
var a
console.log(a) // undefined
a = 'aaa'
console.log(a) // aaa
console.log(b) // Uncaught ReferenceError: b is not defined

console.log(typeof undefined) // undefined
console.log(typeof undeclared) // undefined
```


## 142、如何获取安全的`undefined`值？
- 因为`undefined`是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响`undefined`的正常判断。
- 表达式 `void ___` 没有返回值，因此返回结果是 `undefined`。`void`并不改变表达式的结果，只是让表达式不返回值。
- 按惯例我们用`void 0`来获得`undefined`。


## 143、js 获取原型的方法？
基础代码
```js
function Person () {
}
const p = new Person()
```
- `p.__proto__`
  ```js
  console.log(p.__proto__) // {constructor: ƒ Person ()}
  ```
- `p.constructor.prototype`
  ```js
  console.log(p.constructor.prototype) // {constructor: ƒ Person ()}
  // 等价于
  console.log(Person.prototype)
  ```
- `Object.getPrototypeOf(p)`
  ```js
  console.log(Object.getPrototypeOf(p)) // {constructor: ƒ Person ()}
  ```


## 144、在 js 中不同进制数字的表示方式
- 以 `0X、0x` 开头的表示为十六进制。
- 以 `0、0O、0o` 开头的表示为八进制。
- 以 `0B、0b` 开头的表示为二进制格式。
- 十进制就不用特殊表示，因为默认为十进制。


## 145、js 中整数的安全范围是多少
安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数。
- 最大整数`2^53 - 1`，即`9007199254740991`，在 ES6 中被定义为`Number.MAX_SAFE_INTEGER`。
- 最小整数`-2^53 + 1`，是`-9007199254740991`，在 ES6 中被定义为 `Number.MIN_SAFE_INTEGER`。
- 如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的`Infinity`值。如果某次计算返回了正或负的`Infinity`值，那么该值将无法参与下一次的计算。
- 判断一个数是不是有穷的，可以使用`isFinite`函数来判断。


## 140、什么是堆？什么是栈？它们之间有什么区别和联系？
堆和栈都是计算机内存中的一种数据结构，它们之间有以下区别和联系：
- 定义：
  - 栈是一种后进先出（LIFO）的数据结构，用于存储函数调用、局部变量等；
  - 堆是一种动态分配的数据结构，用于存储程序运行时动态生成的对象。
- 存储方式：
  - 栈采用顺序存储结构，所有元素在同一块连续的内存空间中；
  - 堆采用链式存储结构，元素可以分布在不同的内存区域，并通过指针相互连接。
- 内存管理：
  - 栈的内存分配和回收由系统自动完成，无需手动干预；
  - 堆的内存分配和回收需要手动进行操作，否则会导致内存泄漏或内存溢出等问题。
- 访问速度：由于栈采用顺序存储结构，其访问速度比堆更快；而堆采用链式存储结构，访问速度较慢。
- 适用场景：栈适用于多层函数调用、递归等场景，堆适用于存储动态数据结构，如对象、数组等。
- 联系：栈和堆都是内存中的数据结构，程序在运行时使用栈和堆来存储数据。在某些情况下，栈和堆可能同时被使用，例如函数中创建一个对象时，对象的引用存储在栈上，而对象本身存储在堆中。


## 146、栈、堆、队列和哈希表的区别?
栈(Stack)、堆(Heap)、队列(Queue)和哈希表(Hash Table)是常见的数据结构，它们之间的主要区别如下：
- 栈(Stack)：栈是一种**后进先出(LIFO)的数据结构**。只允许在栈顶进行插入和删除操作，类似于弹夹式装弹机。常用于处理递归函数、表达式求值、内存分配等场景。
- 堆(Heap)：是一种**树形数据结构**，在堆中，每个节点都有一个值，通常所说的堆指的是二叉堆，满足一定的堆特性。堆是一个完全二叉树，且父节点的值大于或小于它的左右子节点的值，被称为大根堆或小根堆。常用于实现优先队列、动态存储等场景。
- 队列(Queue)：队列是一种**先进先出(FIFO)的数据结构**。只允许在队尾进行插入操作，在队头进行删除操作，类似于排队买票。常用于实现消息队列、缓存队列等场景。
- 哈希表(Hash Table)：是一种**通过散列函数将键映射到值的数据结构**。哈希表通常具有快速的查找、插入和删除操作，并且可以通过合理的设置散列函数来减少冲突。常用于实现字典、缓存等场景。



## 148、Array 构造函数只有一个参数值时的表现？
`Array`构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（`length`），而非只充当数组中的一个元素。这样创建出来的只是一个空数组，只不过它的 `length` 属性被设置成了指定的值。
```js
// 常规方式
var arr1 = new Array(3) // new Array()
arr1[0] = 'a'
arr1[1] = 'b'
arr1[2] = 'c'

// 简洁方式
var arr2 = new Array('a', 'b', 'c') // ['a', 'b', 'c']
var arr3 = new Array('aa') // ['aa']
var arr3 = new Array(false) // [false]

// 字面方式
var arr4 = ['a', 'b', 'c']
```
构造函数`Array(..)`不要求必须带`new`关键字。不带时，它会被自动补上。
```js
Array(4) // [empty x 4]
new Array(4) // [empty x 4]
```


## 149、js中把其他类型的值转换成字符串的方法？
- **1、`String()`方法**: 将需要转换的数据作为参数传给该函数。
  ```js
  var a = 1
  var b = '1'
  var c = false
  var d = undefined
  var e = null;
  var f = ''
  console.log(String(a)) // '1'
  console.log(String(b)) // '1'
  console.log(String(c)) // 'false'
  console.log(String(d)) // 'undefined'
  console.log(String(e)) // 'null'
  console.log(String(f)) // ''
  ```
  总结:
    - `null`、`false`、`undefined`、`空字符串''`等特殊值也输其对应的字符串；
- **2、`toString()`方法**: 该方法不影响原变量，返回值为转换后的结果。
  ```js
  var a = 1
  var b = '1'
  var c = false
  var d = undefined
  var e = null;
  var f = ''
  console.log(a.toString()) // '1'
  console.log(b.toString()) // '1'
  console.log(c.toString()) // 'false'
  console.log(d.toString()) // Uncaught TypeError: Cannot read properties of undefined (reading 'toString')
  console.log(e.toString()) // Uncaught TypeError: Cannot read properties of null (reading 'toString')
  console.log(f.toString()) // ''
  ```
  总结: 
    - `null`和`undefined`这两种数据类型没有`toString()`方法，使用会报错。
    - 调用`toString()`方法的时候可以传递一个参数，来表示输出数值的基数，可以以`2、8、16`进制表示字符串值
    ```js
    var num = 10;
    num.toString();   // "10"
    num.toString(2);  // "1010"
    num.toString(8);  // "12"
    num.toString(16);  // "a"
    ```
- **3、`+ ""`**：在要转化的数据类型后面` + ""`，同样不改变原数据类型
  ```js
  var a = 1
  var b = '1'
  var c = false
  var d = undefined
  var e = null;
  var f = ''
  console.log(a + '') // '1'
  console.log(b + '') // '1'
  console.log(c + '') // 'false'
  console.log(d + '') // 'undefined'
  console.log(e + '') // 'null'
  console.log(f + '') // ''
  ```
  总结:
    - `null`、`false`、`undefined`、`空字符串''`等特殊值也输其对应的字符串；


## 150、js中把其他类型的值转换成数值的方法？
- **1、`Number()`**: 使用`Number()`方法实现转换
  ```js
  var a = 1;
  var b = '100';
  var c = 'abcd';
  var d = '100abcd';
  var e = false;
  var f = undefined;
  var g = null;
  var h = ''
  console.log(Number(a));   // 输出为数字1
  console.log(Number(b));   // 输出为数字100
  console.log(Number(c));   // 输出为NaN （not a number 不是一个数字）
  console.log(Number(d));   // 输出为NaN
  console.log(Number(e));   // 输出为数字0（false代表0）
  console.log(Number(f));   // 输出为NAN 
  console.log(Number(g));   // 输出为数字0（Null代表0）
  console.log(Number(h));   // 输出为数字0（''代表0）
  ```
  总结：`NaN`是数字类型，代表不是一个数字。
    - `空字符串''`、`false`、`null`转换之后都是`​​0​`
    - 字符串中`不仅仅是数字`、`undefined`转换之后是`​​NaN​​`
    - 其它的正常转换
- **2、`parseInt()`**: 使用`parseInt()`方法取整数
  ```js
  var a;
  var b = null;
  var b = false;
  console.log(parseInt('100'));// 输出数字 100
  console.log(parseInt('100.23'));// 输出数字 100
  console.log(parseInt('abdc'));// 输出数字 NaN
  console.log(parseInt('100.34'));// 输出数字 100
  console.log(parseInt('abc100.34'));// 输出 NaN
  console.log(parseInt('')) // 输出NaN
  console.log(parseInt(a));           // 输出 NaN
  console.log(parseInt(b));           // 输出 NaN
  console.log(parseInt(c));           // 输出 NaN
  ```
  总结: `parseInt()`方法会从左往右开始匹配，保留字串中以数字开始的部分，并且取整数；
    - 如果开头字符串不是数字则转为`NaN`;
    - `null`、`false`、`undefined`、`空字符串''`等特殊值也输出`NaN`。
- **3、`parseFloat()`**: 使用`parseFloat()`转为浮点型数字
  ```js
  console.log(parseFloat('100.33'));    // 输出数字 100.33
  console.log(parseFloat(100.33));    // 输出数字 100.33
  console.log(parseFloat(90));    // 输出数字 90
  console.log(parseFloat('2cdef'));   // 输出数字 2
  console.log(parseFloat('cd5f'));    // 输出 NaN
  console.log(parseFloat('cdef'));    // 输出 NaN
  console.log(parseFloat(undefined));   // 输出 NaN
  console.log(parseFloat(null));    // 输出 NaN
  ```
  `parseFloat()`和`parseInt()`类似，区别是会保留下小数部分。
- **4、使用算数运算符转化**
  ```js
  var number1 = '90';
  console.log(+number1);      // 取正数输出数字 90
  console.log(-number1);      // 取负数输出数字 -90
  console.log(number1 * 0);   // 输出数字0
  console.log(number1 - 0);   // 输出数字90
  console.log(number1 + 0);   // 注意number1 + 0 输出字符串900，不是数字
  ```


## 151、js中把其他类型的值转换成布尔值的方法？
- **1、`Boolean()`**: 使用`Boolean()`方法实现转换
  ```js
  var a = 1
  var b = '1'
  var c = false
  var d = undefined
  var e = null;
  var f = ''
  var g = { a: 'a' }
  console.log(Boolean(a)) // true
  console.log(Boolean(b)) // true
  console.log(Boolean(c)) // false
  console.log(Boolean(d)) // false
  console.log(Boolean(e)) // false
  console.log(Boolean(f)) // false
  console.log(Boolean(g)) // true
  console.log(Boolean([])) // true
  console.log(Boolean(Infinity)) // true
  console.log(Boolean(0)) // false
  console.log(Boolean('0')) // true
  console.log(Boolean(NaN)) // false
  ```
  总结：
    - `空字符串''`、`数值0`、`false`、`null`、`undefined`、`NaN`转换之后都是`false`
    - 其他转换为`true`，特别注意`字符串'0'`转换后为`true`
- **2、`!!`**: 使用`!!`运算符，第一个`'!'`将值转换成布尔值并取其值的非值，第二个`'!'`将其布尔值还原，类似于“负负得正”的道理
  ```js
  console.log(!!1) // true
  console.log(!!0) // false
  console.log(!!'1') // true
  console.log(!!'') // false
  console.log(!!'0') // true
  console.log(!!false) // false
  console.log(!!undefined) // false
  console.log(!!null) // false
  console.log(!!NaN) // false
  ```
  总结:
    - `空字符串''`、`数值0`、`false`、`null`、`undefined`、`NaN`转换之后都是`false`
    - 其他转换为`true`，特别注意`字符串'0'`转换后为`true`
  补充`null`和`undefined`的特殊性
  ```js
  null == undefined //true
  null === undefined //false
  ```


## 152、`{}`和`[]`的`valueOf`和`toString`的结果是什么？
- **valueof**: 返回指定对象的原始值。
  - 不同类型对象的`valueOf()`方法的返回值
  ```js
  var num = new Number('123sd');
  num.valueOf(); // 'NaN'
  var str = new String('12df');
  str.valueOf(); // '12df'
  var bool = new Boolean('fd');
  bool.valueOf(); // true
  var arr = new Array(1,2);
  arr.valueOf(); // [1, 2]
  var d = new Date();
  d.valueOf(); // 1677988531799
  var func = function () {}
  func.valueOf(); // function () {}
  ```
  `Math`和`Error`对象没有`valueOf`方法。
- **toString**: 返回一个表示该对象的字符串。
  - 不同类型对象的`toString()`方法的返回值
  ```js
  var num = new Number('123sd');
  num.toString(); // 'NaN'
  var str = new String('12df');
  str.toString(); // '12df'
  var bool = new Boolean('fd');
  bool.toString(); // 'true'
  var arr = new Array(1,2);
  arr.toString(); // '1,2'
  var d = new Date();
  d.toString(); // "Sun Jul 22 2018 12:38:42 GMT+0800 (中国标准时间)"
  var func = function () {}
  func.toString(); // "function () {}"
  ```
  其他（例如`Object`，`Math`）都是返回该对象的类型。
  ```js
  var obj = new Object({});
  obj.toString(); // "[object Object]"
  Math.toString(); // "[object Math]"
  ```
  可以使用`toString()`检测对象类型。
  ```js
  var toString = Object.prototype.toString;

  toString.call(new Date); // [object Date]
  toString.call(new String); // [object String]
  toString.call(Math); // [object Math]

  //Since JavaScript 1.8.5
  toString.call(undefined); // [object Undefined]
  toString.call(null); // [object Null]
  ```
- `{}`的`valueOf`结果为`{}`，`toString`的结果为`"[object Object]"`
- `[]`的`valueOf`结果为`[]`，`toString`的结果为`""`
```js
let a = {}
let a1 = { name: '张三' }
a.valueOf() // {}
a1.valueOf() // {name: '张三'}
a.toString() // "[object Object]"
a1.toString() // "[object Object]"

let b = []
let b1 = ['1', '2']
b.valueOf() // []
b1.valueOf() // ['1', '2']
b.toString() // ""
b1.toString() // 1, 2
```

## 153、什么是假值对象？
在JavaScript中，以下6个值被认为是假值(`false value`)对象：
- `false`：布尔值false
- `0`：数字零
- `''`：空字符串
- `null`：空对象引用
- `undefined`：未定义的变量或属性
- `NaN`：非数值（Not a Number）

这些值在条件语句中会被自动转换为`false`。例如，在if语句中，如果条件表达式的结果为假值对象，则执行if语句块之外的代码。而其他所有值都被视为真值(`true value`)对象。


## 154、`~`操作符的作用？
`~`返回`2`的补码，并且`~`会将数字转换为`32`位整数，因此我们可以使用`~`来进行取整操作。<br>
`~x`大致等同于`-(x+1)`
```js
~2 // 等同于 -(2+1) = -3
```


## 155、解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字，它们之间的区别是什么？
- 解析允许字符串(如`parseInt()`)中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止;
- 而转换(如`Number()`)不允许出现非数字字符，否则会失败并返回`NaN`。


## 156、`+`操作符什么时候用于字符串的拼接？
简单来说就是，如果`+`的其中一个操作数是字符串，则执行字符串拼接，否则执行数字加法。<br>
对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。
```js
'4' / 2 = 2
1 + 1 = 2
1 + '1' = 11
+'90' = 90
```


## 158、`||(或)`和`&&(与)`操作符的返回值？
首先都会对第一个操作数进行条件判断，检测是否为布尔类型，如果不是，就先强制转换为布尔类型，再进行条件判断。

**||（或）**
- 如果`第一个操作数`为真，则返回第一个操作数；
- 如果`第一个操作数`为假，则返回第二个操作数；
```js
console.log(1 || 2); // 1
console.log(0 || 3); // 3
```

**&&（与）**
- 如果`第一个操作数`为真，则返回第二个操作数的结果；
- 如果`第一个操作数`为假，则返回第一个操作数的结果;
```js
console.log(1 && 2); // 2
console.log(0 && 2); // 0
```
`&&`和`||`不是返回条件判断的结果，而是返回他们其中一个操作数的值。


## 159、Symbol 值的强制类型转换？
- Symbol值转化为字符换，存在显示转换，和隐式转换。
  - 显示转化就直接转换为对应的字符串，但是隐式转换就会报错。
- Symbol值转换为数字类型的值，无论是隐式转换还是显示转换都会报错。
- Symbol值转化为布尔类型的值，无论显示转换还是隐式转换都返回`true`。


## 160、== 操作符的强制类型转换规则？
1. 如果两个操作数的类型相同，则直接比较它们的值。
2. 如果其中一个操作数是`null`，另一个操作数必须是`undefined`或者`null`才会返回`true`，否则返回`false`。
3. 如果其中一个操作数是数字，另一个操作数是字符串，则将字符串转换为数字。
4. 如果其中一个操作数是布尔值，另一个操作数是非布尔值，则将布尔值转换成数字`0`或`1`，再跟另一个操作数进行比较。
5. 如果其中一个操作数是对象，另一个操作数是字符串或数字，则将对象转换为原始类型的值（即调用`valueOf`和`toString`方法），再跟另一个操作数进行比较。如果对象不能被转换成原始类型的值，则返回`false`。
6. 如果其中一个操作数是`NaN`，则返回`false`。注意，`NaN`不等于任何值，包括它本身。
7. 如果两个操作数都是对象，则比较它们的引用是否相等。即使两个对象具有相同的属性和值，但它们在内存中的位置不同，也会返回`false`。


## 161、如何将字符串转化为数字，例如 '12.3b'?
- （1）使用 `Number()` 方法，前提是所包含的字符串不包含不合法字符。
  ```js
  Number('123.b') // NaN
  Number('123') // 123
  Number('123.1') // 123.1
  ```
- （2）使用 `parseInt()` 方法，`parseInt()` 函数可解析一个字符串，并返回一个整数。还可以设置要解析的数字的基数。当基数的值为 0，或没有设置该参数时，`parseInt()` 会根据 string 来判断数字的基数。
  ```js
  parseInt('123.b') // 123
  parseInt('b123') // NaN
  ```
- （3）使用 `parseFloat()` 方法，该函数解析一个字符串参数并返回一个浮点数。
  ```js
  parseFloat('123.b') // 123
  parseFloat('123.1b') // 123.1
  parseFloat('b123') // NaN
  ```
- （4）使用 `+` 操作符的隐式转换，前提是所包含的字符串不包含不合法字符。


## 162、如何将浮点数点左边的数每三位添加一个逗号，如 12000000.11 转化为『12, 000, 000.11』?
```js
// 方法一
function format(number) {
  return number && (number + '').replace(/(?!^)(?=(\d{3})+\.)/g, ",");
}
// 方法二
function format1(number) {
  return Intl.NumberFormat().format(number)
}
// 方法三
function format2(number) {
  return number.toLocaleString('en')
}
```


## 163、常用正则表达式
```js
// （1）匹配 16 进制颜色值
var regex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/g;

// （2）匹配日期，如 yyyy-mm-dd 格式
var regex = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/;

// （3）匹配 qq 号
var regex = /^[1-9][0-9]{4,10}$/g;

// （4）手机号码正则
var regex = /^1[34578]\d{9}$/g;

// （5）用户名正则
var regex = /^[a-zA-Z\$][a-zA-Z0-9_\$]{4,16}$/;
```


## 164、什么是 DOM 和 BOM？
**DOM**
> DOM 全称是`Document Object Model`，也就是文档对象模型。是针对XML的基于树的API。描述了处理网页内容的方法和接口，是HTML和XML的API，DOM把整个页面规划成由节点层级构成的文档。

**BOM**
>  BOM是`Browser Object Model`，浏览器对象模型。刚才说过`DOM`是为了操作文档出现的接口，那`BOM`顾名思义其实就是为了控制浏览器的行为而出现的接口。


## 165、写一个通用的事件侦听器函数。
```js
const EventUtils = {
    // 视能力分别使用dom0||dom2||IE方式 来绑定事件
    // 添加事件
    addEvent: function(element, type, handler) {
        if (element.addEventListener) {
            element.addEventListener(type, handler, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + type, handler);
        } else {
            element["on" + type] = handler;
        }
    },

    // 移除事件
    removeEvent: function(element, type, handler) {
        if (element.removeEventListener) {
            element.removeEventListener(type, handler, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + type, handler);
        } else {
            element["on" + type] = null;
        }
    },

    // 获取事件目标
    getTarget: function(event) {
        return event.target || event.srcElement;
    },

    // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
    getEvent: function(event) {
        return event || window.event;
    },

    // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },

    // 取消事件的默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    }
};
```


## 166、js 延迟加载的方式有哪些？
js 延迟加载，也就是等页面加载完成之后再加载 JavaScript 文件。 js 延迟加载有助于提高页面加载速度。

一般有以下几种方式
- defer 属性
- async 属性
- 动态创建 DOM 方式
- 使用 setTimeout 延迟方法
- 让 JS 最后加载


## 167、Ajax 是什么? 如何创建一个 Ajax？
它是 Asynchronous JavaScript and XML 的缩写，指的是通过 JavaScript 的 异步通信，从服务器获取 XML 文档从中提取数据，再更新当前网页的对应部分，而不用刷新整个网页。

具体来说，AJAX 包括以下几个步骤：
1. 创建 XMLHttpRequest 对象，也就是创建一个异步调用对象
2. 创建一个新的 HTTP 请求，并指定该 HTTP 请求的方法、URL 及验证信息
3. 设置响应 HTTP 请求状态变化的函数
4. 发送 HTTP 请求
5. 获取异步调用返回的数据
6. 使用 JavaScript 和 DOM 实现局部刷新

一般实现：
```js
const SERVER_URL = "/server";

let xhr = new XMLHttpRequest();
// 创建 Http 请求
xhr.open("GET", SERVER_URL, true);
// 设置状态监听函数
xhr.onreadystatechange = function() {
  if (this.readyState !== 4) return;
  // 当请求成功时
  if (this.status === 200) {
    handle(this.response);
  } else {
    console.error(this.statusText);
  }
};
// 设置请求失败时的监听函数
xhr.onerror = function() {
  console.error(this.statusText);
};
// 设置请求头信息
xhr.responseType = "json";
xhr.setRequestHeader("Accept", "application/json");
// 发送 Http 请求
xhr.send(null);
```


## 168、谈一谈浏览器的缓存机制？
浏览器缓存机制是指浏览器在访问网站时，将一些数据（如HTML、CSS、JS、图片等）缓存在本地，以减少网络传输和提高用户体验。

常见的浏览器缓存机制包括以下几种：
1. 强缓存(HTTP Cache-Control、Expires)：当浏览器第一次请求资源时，服务器可以通过设置 HTTP 的 Cache-Control 和 Expires 头部来告诉浏览器该资源是否可以被缓存，以及缓存有效期。在过期时间内，浏览器可以直接从缓存中获取资源，不必再向服务器发送请求。
2. 协商缓存(HTTP ETag、Last-Modified)：当强缓存失效后，浏览器可以通过发送带有 If-Modified-Since 或 If-None-Match 头部的请求，让服务器判断资源是否有更新。如果资源未更改，则服务器返回 304 状态码，告诉浏览器继续使用缓存中的资源，否则返回新的资源。
3. Service Worker缓存：Service Worker 是运行在浏览器后台的一种 JavaScript 脚本，可以在离线状态下缓存网页内容、API 数据等，提供更好的离线体验。Service Worker 可以通过监听 fetch 事件来拦截网络请求，并根据缓存策略返回结果。

注意: 虽然浏览器缓存可以提高性能和用户体验，但也可能出现缓存过期、缓存劫持等问题，导致用户看到旧的或错误的数据。因此，在开发中应该合理使用缓存，并对缓存进行有效的管理和更新。可以使用版本号控制、缓存清除等方式来确保页面和资源的正确性和可用性。


## 169、Ajax解决浏览器缓存问题？
在使用 Ajax 请求时，由于浏览器的缓存机制，可能会导致请求结果被缓存下来，从而出现数据错误或不更新的问题。为了解决这个问题，可以采用以下几种方法：
1. **禁用浏览器缓存**: 在发送 AJAX 请求时，可以通过设置 HTTP 头部或参数来告诉服务器不要缓存该请求。
  > 例如，在 jQuery Ajax 中，可以设置 cache 参数为 false，如下所示：
  ```js
  $.ajax({
    url: 'example.com/api/data',
    cache: false,
    success: function(data) {
      // 处理返回数据
    }
  });
  ```
2. **使用随机数或时间戳**：将时间戳或随机数添加到请求 URL 后面，保证每次请求的 URL 不同，从而避免被缓存。例如：
  ```js
  var timestamp = new Date().getTime();
  $.ajax({
    url: 'example.com/api/data?timestamp=' + timestamp,
    success: function(data) {
      // 处理返回数据
    }
  });
  ```
3. **修改请求方式**：将 HTTP 请求方式从 GET 改为 POST 或其他方式，以防止浏览器缓存数据。
4. **服务端配置**：在服务器端，可以根据请求头信息判断是否需要缓存响应结果，如果需要缓存，则可以设置合适的缓存头部和缓存时间，否则不进行缓存。


## 170、同步和异步的区别？
同步和异步是指程序的执行方式和处理方式，主要区别在于是否阻塞程序的执行。
- **同步**：指程序按照顺序依次执行，当前一个操作没有完成时，下一个操作必须等待。同步操作会阻塞程序的执行，直到前一个操作完成才能执行下一个操作。
- **异步**：指程序不会按照顺序依次执行，而是通过回调函数、事件触发等方式来实现。异步操作不会阻塞程序的执行，当某个异步操作完成后，系统会通知相应的处理程序进行后续处理，从而可以同时执行其他操作。


## 171、如何解决跨域问题？
跨域问题是指当一个Web页面向不同源的服务器请求资源时（例如向其他域名、端口或协议发送XMLHttpRequest请求），浏览器会阻止这种行为，因为它可能会引起安全漏洞。

以下是常用的解决跨域问题的方法：
1. 使用JSONP。JSONP利用script标签没有跨域限制的特性，通过`callback`函数来实现跨域数据的传输。
2. CORS（跨域资源共享）。CORS是一种机制，允许Web应用服务器进行跨域访问控制，从而使跨域数据传输得以安全进行。在服务端设置Access-Control-Allow-Origin响应头即可开启CORS。
3. 代理。在同一域名下，可以通过后端代理，将跨域请求先发送到本地服务端，再由服务端转发到目标服务器。
4. WebSocket。WebSocket是一种基于TCP协议的新型网络传输协议，支持双向通信。由于WebSocket协议定义了与HTTP不同的握手方式，因此也不存在同源限制。使用WebSocket可以实现跨域数据传输。


## 172、简单谈一下 cookie ？
cookie 是服务器提供的一种用于维护会话状态信息的数据，通过服务器发送到浏览器，浏览器保存在本地，当下一次有同源的请求时，将保存的 cookie 值添加到请求头部，发送给服务端。这可以用来实现记录用户登录状态等功能。cookie 一般可以存储 4k 大小的数据，并且只能够被同源的网页所共享访问。

在发生 xhr 的跨域请求的时候，即使是同源下的 cookie，也不会被自动添加到请求头部，除非显示地规定。


## 173、模块化开发怎么做？
JavaScript 模块化是一种用于组织和管理代码的方式，它可以将代码分解为独立的模块，每个模块都具有明确的接口和功能。以下是在 JavaScript 中实现模块化开发的几种常见方式：
1. **CommonJS**：Node.js 使用 CommonJS 规范实现模块化。使用`module.exports`导出模块，使用`require()`导入模块。
  ```js
  // math.js
  module.exports = {
    add: function(num1, num2) {
      return num1 + num2;
    },
    subtract: function(num1, num2) {
      return num1 - num2;
    }
  };
  // index.js
  const math = require('./math');
  console.log(math.add(2, 3)); // 输出 5
  ```
2. **ES6 模块化**：使用`export`导出模块，使用`import`导入模块。
  ```js
  // math.js
  export function add(num1, num2) {
    return num1 + num2;
  }
  export function subtract(num1, num2) {
    return num1 - num2;
  }
  // index.js
  import { add } from './math';
  console.log(add(2, 3)); // 输出 5
  ```
3. **AMD模块化**：用于浏览器端异步加载模块。使用`define()`定义模块，使用`require()`加载模块。
  ```js
  // math.js
  define(function() {
    return {
      add: function(num1, num2) {
        return num1 + num2;
      },
      subtract: function(num1, num2) {
        return num1 - num2;
      }
    };
  });
  // index.js
  require(['math'], function(math) {
    console.log(math.add(2, 3)); // 输出 5
  });
  ```


## 174、js的几种模块规范？
### CommonJS
它通过`require`来引入模块，通过`module.exports`定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。**同步加载**

### AMD
采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。`require.js`实现了`AMD`规范。**立即加载依赖，异步执行木块**

### CMD
和`AMD`方案都是为了解决异步模块加载的问题，`sea.js`实现了`CMD`规范。它和`require.js`的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。**异步加载，运行时加载依赖，同步执行模块代码**

### ES方案
使用`import`和`export`的形式来导入导出模块。该规范支持静态分析和树摇优化，是未来 JavaScript 开发的趋势。**同步加载**


## 175、什么是yield 表达式
在 JavaScript 中，`yield`关键字通常用于生成器函数(Generator)中，它可以暂停函数的执行并返回一个值，然后再次恢复函数的执行。`yield`表达式可以看作是生成器函数的一个断点，用于控制函数的执行流程。
> `yield`是一种强大的特性，它使得生成器函数可以创建一个迭代器，并允许我们以更加直观和灵活的方式控制函数的执行流程。
```js
function* generator() {
  console.log('step 1');
  yield 'yield value';
  console.log('step 2');
}
const gen = generator();
console.log(gen.next()); // 输出 step 1 和 { value: 'yield value', done: false }
console.log(gen.next()); // 输出 step 2 和 { value: undefined, done: true }
```
`yield`表达式可与`for...of`循环一起使用，以便逐一迭代生成器的返回值（即生成器中使用`yield`表达式返回的值）。
```js
function* generator() {
  yield 'apple';
  yield 'banana';
  yield 'cherry';
}
for (const fruit of generator()) {
  console.log(fruit);
}
// 输出 apple、banana 和 cherry
```


## 176、JS 模块加载器的轮子怎么造，也就是如何实现一个模块加载器？
实现一个模块加载器可以让我们更深入地理解 JavaScript 模块化的实现原理。以下是一个简单的模块加载器示例，它可以动态地从指定 URL 加载模块。
```js
class Module {
  constructor (name, deps, fn) {
    this.name = name
    this.deps = deps
    this.fn = fn
  }
  async load () {
    const args = await Promise.all(this.deps.map((dep) => {
      return import(dep)
    }))
    this.fn(...args)
  }
}
class ModuleManager {
  constructor () {
    this.modules = new Map()
  }
  async importModule (name, deps, fn) {
    if (!this.modules.has(name)) {
      const module = new Module(name, deps, fn)
      this.modules.set(name, module)
      await module.load()
    }
    return this.modules.get(name)
  }
}

const moduleManager = new ModuleManager()
await moduleManager.importModule('math', ['./data.js', './data2.js'], async (...args) => {
  const [oss, cos] = args
  console.log(oss.default)
  console.log(cos.default)
})
// 输出结果如下
// {name: 'oss plugin', version: '1.0.0'}
// {name: 'cos plugin', version: '1.0.0'}
```


## 177、ECMAScript6怎么写`class`，为什么会出现`class`这种东西?
ES6 新添加的`class`只是为了补充 js 中缺少的一些面向对象语言的特性，但本质上来说它只是一种语法糖，不是一个新的东西，其背后还是原型继承的思想。通过加入`class`可以有利于我们更好的组织代码。在`class`中添加的方法，其实是添加在类的原型上的。
```js
// es6
class Person {
  constructor (name, age) {
    this.name = name
    this.age = age
  }
  printName () {
    console.log('my name is ', this.name)
  }
}

// es5
function Person (name, age) {
  this.name = name
  this.age = age
}
Person.prototype.printName = function () {
  console.log('my name is ', this.name)
}
```


## 178、innerHTML 与 outerHTML 的区别？
- innerHTML: 包含HTML元素的子元素、文本节点以及它们的属性
  > 可以用于动态地添加或更改 DOM 元素的内容，也可以用于获取元素的 HTML 内容作为字符串。
- outerHTML: 包含HTML元素本身以及它的子元素、文本节点以及它们的属性
  > 可以用于动态地替换整个 DOM 元素，也可以用于获取元素的 HTML 内容作为字符串。
 
对于这样一个 HTML 元素：
```html
<div id="box">content<span>span</span></div>
```
- **innerHTML**：内部HTML，`content<span>span</span>`；
- **outerHTML**：外部 HTML，`<div id="box">content<span>span</span></div>`；


## 179、JavaScript 类数组对象的定义？
JavaScript类数组对象是一个`拥有数字索引`和`length`属性的对象，它类似于一个数组，但并不具备完全的数组特性。
> 例如，它没有数组原型上的方法，如`push()`和`pop()`，但可以通过下标访问元素。

常见的类数组对象包括`函数参数arguments`、`DOM元素列表HTMLCollection`和属性集合等。


## 180、实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应
如果要实现页面操作不刷新网站，并且可以在浏览器中进行前进和后退操作，此时我们存在两个方法: 
- 一个是通过`url的hash值`操作
- 另一个是通过`HTML5的history`方法。

### url的hash方法
![2023030514591610.png](http://img.itchenliang.club/img/2023030514591610.png)
在url中设置锚点，此时不会发生刷新效果，此时我们可以监听`url的hash值`的改变，然后进行请求数据，然后渲染页面即可，此时也是可以实现浏览器前进后退不刷新页面的效果的。
```html
<div class="navbar">
  <a href="#/home">首页</a>
  <a href="#/about">关于</a>
  <a href="#/404">404</a>
</div>
<div id="app">
  default  
</div>
<script>
  const app = document.querySelector('#app')
  window.addEventListener('hashchange', () => {
    switch (location.hash) {
      case '#/home':
        app.innerHTML = 'Home'
        break
      case '#/about':
        app.innerHTML = 'About'
        break
      default:
        app.innerHTML = 'default'
    }
  })
</script>
```
如上面代码所示，此时我们当点击`a`链接时，此时改变`url`的`hash`值，此时我们可以通过监听`url`的`hashchange`方法，来执行相应的函数。
> 优点：`hash`值方法优势是兼容性好，在老版本的ie中可以运行，但是存在一个缺陷，就是存在`#`，显得`url`地址不真实。

### HTML5的history api
在`html5`中存在一些`api`，可以实现改变地址`url`但是不刷新页面。如果我们不使用`html5`中的`api`
```html
<div class="navbar">
  <a href="#/home">首页</a>
  <a href="#/about">关于</a>
  <a href="#/404">404</a>
</div>
<div id="app">
  default  
</div>
```
此时点击`a`链接切换页面，此时会进行刷新。

此时对上面的标签设置相关的事件，执行相关的函数
```html
<button id="btn">回退</button>
<div class="navbar">
  <a href="#/home">首页</a>
  <a href="#/about">关于</a>
  <a href="#/404">404</a>
</div>
<div id="app">
  default
</div>
<script type="module">
  const app = document.querySelector('#app')
  const links = document.querySelectorAll('a')

  // 循环为所有的a绑定点击事件
  for (let link of links) {
    link.addEventListener('click', (e) => {
      // 阻止默认行为
      e.preventDefault()
      let href = link.getAttribute('href')
      // 改变url地址，此时内容页面其他内容不发生改变
      history.pushState({}, '', href)
      // 当pushstate后，触发事件进行匹配
      renderView()
    })
  }

  // 需要在调用 back、go、forward时才会触发
  window.addEventListener('popstate', () => {
    console.log(123)
    renderView()
  })
  // 测试回退
  document.querySelector('#btn').addEventListener('click', () => {
    history.back()
  })

  function renderView () {
    switch (location.hash) {
      case '#/home':
        app.innerHTML = 'Home'
        break
      case '#/about':
        app.innerHTML = 'About'
        break
      default:
        app.innerHTML = 'default'
    }
  }
  renderView()
</script>
```
如果想要切换服务器数据，并且达到无刷新，可以在`popstate`监听函数中和`a`连接点击时触发`ajax`向服务器发起请求。

**history 的 6个api总结**
- `replaceState`: 替换原来的路径。
- `pushState`: 使用新的路径。
- `popState`: 路径回退。
- `go`: 向前或者向后。
- `back`: 向后改变路径。
- `forward`: 向前改变路径。


## 181、什么是“前端路由”？什么时候适合使用“前端路由”？“前端路由”有哪些优点和缺点？
**前端路由**就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据`url`的不同返回不同的页面实现的。

**前端路由使用场景**：
> 在单页面应用，大部分页面结构不变，只改变部分内容的使用。
- **优点**：用户体验好，不需要每次都从服务器全部获取，快速展现给用户
- **缺点**：单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

前端路由一共有两种实现方式: (参考上一问)
- 一种是通过`hash`的方式
- 一种是通过使用`pushState`的方式。


## 182、什么是Polyfill？
`Polyfill`指的是用于实现浏览器并不支持的原生`API`的代码。比如说`querySelectorAll`是很多现代浏览器都支持的原生`Web API`，但是有些古老的浏览器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么这就可以成为一个`Polyfill`。
> 简言之，`polyfill`是用旧语法重写新版本新增的方法(api)，以兼容旧版浏览器。

`polyfill`是一个`js脚本`，我们可以只针对一个方法引入，比如`promise`引入相应的`polyfill`，也可以引入一整个文件，一般来说我们会使用现成的`npm`包，有很多包供我们选择
```sh
npm i promise-polyfill
```
常用的还有
```sh
npm i babel-polyfill
```
还有一个`babel`，是我们常见的做低版本兼容的工具包，**`babel`和`polyfill`的区别在于**:
- <span style="color: red;"><code>babel</code>只转化新的语法，不负责实现新版本js中新增的api</span>
- <span style="color: red;"><code>polyfill</code>负责实现新版本js中新增的api</span>
  例如使用polyfill实现`Object.is`
  ```js
  if (!Object.is) {
    Object.defineProperty(Object, "is", {
      value: function (x, y) {
        // SameValue algorithm
        if (x === y) {
          // return true if x and y are not 0, OR
          // if x and y are both 0 of the same sign.
          // This checks for cases 1 and 2 above.
          return x !== 0 || 1 / x === 1 / y;
        } else {
          // return true if both x AND y evaluate to NaN.
          // The only possibility for a variable to not be strictly equal to itself
          // is when that variable evaluates to NaN (example: Number.NaN, 0/0, NaN).
          // This checks for case 3.
          return x !== x && y !== y;
        }
      }
    });
  }
  ```
- 所以在兼容的时候一般是`babel + polyfill`都用到，所以`babel-polyfill`一步到位


## 183、介绍一下 js 的节流与防抖？
JS 的节流(`throttling`)和防抖(`debouncing`)是两种常见的性能优化技术，用于控制某些频繁执行的操作以减少资源消耗和提高响应速度。
- 节流: 原理是设置一个时间间隔，在该时间间隔内只能执行一次操作
  > 例如: 当用户不断地滚动页面时，我们可以设置一个滚动事件的节流函数，使得在每个固定时间间隔内只执行一次滚动处理函数，而不是每滚动一下就执行一次。
- 防抖: 原理是在某个操作连续触发时，只有最后一次操作完成时才执行相应的处理函数。
  > 例如: 当用户不断地输入搜索关键字时，我们可以设置一个输入框的防抖函数，只有用户停止输入一段时间后才触发搜索操作，而不是在每次输入时都进行搜索。

### 防抖
在事件被触发n秒后再执行回调函数，如果在这n秒内又被触发，则重新计时。

**应用场景**
- 用户在输入框中连续输入一串字符后，只会在输入完后去执行最后一次的查询ajax请求，这样可以有效减少请求次数，节约请求资源；
- `window`的`resize`、`scroll`事件，不断地调整浏览器的窗口大小、或者滚动时会触发对应事件，防抖让其只触发一次；

**实现**
```html
防抖的input
<input type="text" id="debounce"><br/>
<script>
  function ajax(content) {
    console.log(new Date() + 'ajax request' + content);
  }	
  // 防抖的input
  let inputB = document.getElementById('debounce');
  function debounce(func, delay) {
    return function(args) {
      // 获取函数的作用域和变量
      let that = this, _args = args;
      // 每次事件触发,都会清除当前的timer,然后重新设置超时调用
      clearTimeout(func.id);
      func.id = setTimeout(function() {
        func.call(that, _args)
      },delay)
    }
  }
  let debounceAjax = debounce(ajax, 500);
  inputB.addEventListener('keyup', function(e) {
    debounceAjax(e.target.value);
  })
</script>
```
代码说明: 
- 每一次事件被触发，都会清除当前的`timer`然后重新设置超时调用，即重新计时。 这就会导致每一次高频事件都会取消前一次的超时调用，导致事件处理程序不能被触发；
- 只有当高频事件停止，最后一次事件触发的超时调用才能在`delay`时间后执行；

### 节流
规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。

**应用场景**
- 鼠标连续不断地触发某事件（如点击），只在单位时间内只触发一次；
- 在页面的无限加载场景下，需要用户在滚动页面时，每隔一段时间发一次`ajax`请求，而不是在用户停下滚动页面操作时才去请求数据；
- 监听滚动事件，比如是否滑到底部自动加载更多，用`throttle`来判断；

**实现**
```html
节流的input
<input type="text" id="throttle">
<script>
  function ajax(content) {
    console.log(new Date() + 'ajax request' + content);
  }
  // 节流的input
  let inputC = document.getElementById('throttle');
  function throttle(fun, delay) {
    let last, deferTimer;
    return function(args) {
      let that = this;
      let _args = arguments;
      let now = +new Date();
      if(last && now < last + delay) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function() {
          last = now;
          fun.apply(that, _args);
        },delay)
      }else {
        last = now;
        fun.apply(that, _args);
      }
    }
  }
  let throttleAjax = throttle(ajax, 2000);
  inputC.addEventListener("keyup", function(e) {
    throttleAjax(e.target.value);
  })
</script>
```

### 总结
- **效果**
  - 函数防抖是某一段时间内只执行一次；
  - 函数节流是间隔时间执行，不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数。
- **原理**
  - 防抖是维护一个计时器，规定在`delay`时间后触发函数，但是在`delay`时间内再次触发的话，都会清除当前的`timer`然后重新设置超时调用，即重新计时。这样一来，只有最后一次操作能被触发。
  - 节流是通过判断是否到达一定时间来触发函数，若没到规定时间则使用计时器延后，而下一次事件则会重新设定计时器。


## 184、`Object.is()`与原来的比较操作符`“===”`、`“==”`的区别？
- 使用`==`进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用`===`号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回`false`。
- 使用`Object.is`来进行相等判断时，一般情况下和`===`的判断相同，它处理了一些特殊的情况，比如`-0`和`+0`不再相等，两个`NaN`认定为是相等的。
  ```js
  +0 === -0; //true
	NaN === NaN; // false

  Object.is(+0, -0); // false
  Object.is(NaN, NaN) // true
  ```


## 185、`escape`, `encodeURI`, `encodeURIComponent`有什么区别？
JavaScript中有
- **字符串编码的函数**: `escape`, `encodeURI`, `encodeURIComponent`
- **相应解码函数**: `unescape`, `decodeURI`, `decodeURIComponent`

**编码函数的区别**
- `encodeURI`和`encodeURIComponent`两者都是对URL进行编码的，但是两者的区别是编码的范围不同。
  - `encodeURI`是对`URI`的组成部分进行转义，不能对`ascll字符`，`数字`，`~`，`!`，`@`，`#`，`$`，`&`，`*`，`()`，`=`，`:`，`/`，`,`，`;`，`?`，`+`，`'`进行编码。
  - `encodeURIComponent`是对整个`URI`进行转义，不能对`ascll字母`，`数字`，`~`，`!`，`*`，`()`，`'`进行编码。
  所以说`encodeURIComponent`比`encodeURI`的编码范围更大。
- `escape`和`encodeURI`的作用相同，不过它们对于`unicode`编码为`0xff`之外字符的时候会有区别:
  - `escape`是直接在字符的`unicode`编码前加上`%u`，不对`ascll字母`，`数字`，`@`，`*`，`/`，`+`进行编码，其余的都会进行编码。
  - `encodeURI`首先会将字符转换为`UTF-8`的格式，再在每个字节前加上`%`；
```js
encodeURI("https://www.baidu.com?name=张三&age=23") // 'https://www.baidu.com?name=%E5%BC%A0%E4%B8%89&age=23'
encodeURIComponent("https://www.baidu.com?name=张三&age=23") // 'https%3A%2F%2Fwww.baidu.com%3Fname%3D%E5%BC%A0%E4%B8%89%26age%3D23'

console.log(escape("aaa12@*/+"))  //aaa12@*/+
console.log(escape("我是哈哈哈%"))  //%u6211%u662F%u54C8%u54C8%u54C8%25
```


## 186、Unicode 和 UTF-8 之间的关系？
**Unicode**
> 是一种字符集合，现在可容纳 100 多万个字符。每个字符对应一个不同的`Unicode`编码，它只规定了符号的二进制代码，却没有规定这个二进制代码在计算机中如何编码传输。

**UTF-8**
> 是一种对`Unicode`的编码方式，它是一种变长的编码方式，可以用`1~4`个字节来表示一个字符。


## 187、为什么`0.1 + 0.2 != 0.3`？如何解决这个问题？
计算机中所有的数据最终都是以二进制的形式存储的，当然数字的存储也不例外。
> 当计算`0.1+0.2`的时候，实际上计算的是这两个数字在计算机里所存储的二进制，`0.1`和`0.2`在转换为二进制表示的时候会出现位数无限循环的情况。当然计算机不会用无限的空间去存储这些无限循环的二进制数字，那对于这类数据该怎么处理呢？

**JavaScript 中数字的存储**
JavaScript 中数字的存储遵循 IEEE 754 标准，是以`64`位双精度格式来存储数字的，只需要知道，在二进制科学表示法中，双精度浮点的小数部分最多只能保留`52 位`（比如`1.xxx... * 2^n`，小数点后的`x`最多保留`52`位），加上前面的`1`，其实就是保留`53`位有效数字，**超过这个长度的位数会被舍去（会采用 0舍1入 的方式），这样就造成了精度丢失的问题**。

**0.1 + 0.2 运算过程**
1. 根据二进制中数字存储规则，`0.1`转换为二进制后：
  ```js
  1.1001100110011001100110011001100110011001100110011010 * 2^-4
  ```
2. `0.2`转换为二进制后：
  ```js
  1.1001100110011001100110011001100110011001100110011010 * 2^-3
  ```
关于浮点数的运算，一般由以下五个步骤完成：`对阶`、`尾数运算`、`规格化`、`舍入处理`、`溢出判断`。
- 对介: 对阶就是把阶码调整为相同，`0.1`转换为二进制是`1.10011...*2^-4`，阶码为`-4`，`0.2`转换为二进制是`1.10011...*2^-3`，阶码为`-3`，两个阶码不同，所以先调整为相同的阶码再进行计算，调整原则是小阶对大阶，也就是将`0.1`的阶码`-4`调整为`-3`，即对阶后`0.1`表示为：
  ```js
  0.1100110011001100110011001100110011001100110011001101(0) * 2^-3
  ```
  对阶过程中括号中的`0`会舍去，也就是说，对阶过程中也可能造成精度丢失。
- 尾数运算: `0.1 + 0.2`尾数运算为
  ```js
   0.1100110011001100110011001100110011001100110011001101 +
   1.1001100110011001100110011001100110011001100110011010 =
   10.0110011001100110011001100110011001100110011001100111
  ```
  到此，`0.1 + 0.2`计算结果为：
  ```js
  10.0110011001100110011001100110011001100110011001100111 * 2^-3
  ```
- 规格化: 对计算结果进行规格化处理
  ```js
  1.0011001100110011001100110011001100110011001100110011(1) * 2^-2
  ```
  括号中的`1`是规格化处理时要舍入处理的数字
- 舍入处理: （按 0舍1入 规则）后的结果为
  ```js
  1.0011001100110011001100110011001100110011001100110100 * 2^-2
  ```
- 溢出判断: 这里并不涉及，所以`0.1 + 0.2`最终运算结果表示为二进制为
  ```js
  0.010011001100110011001100110011001100110011001100110100
  ```
  将其转换为十进制为：
  ```js
  0.30000000000000004
  ```
  所以，在 JavaScript 中**`0.1 + 0.2 !== 0.3`**

**解决办法**
- 由于小数的运算可能导致精度丢失问题，那么要解决这个问题，可以将其转换为整数后再进行运算，运算后再转换为对应的小数，例如：
  ```js
  var a = 0.1, b = 0.2
  var result = (a * 100 + b * 100) / 100
  console.log(result) // 0.3
  console.log(result === 0.3) // true
  ```
- 当然，除了上述方式外，我们也可以利用 ES6 中的极小数`Number.EPSILON`来进行判断。
  > 例如判断`0.1 + 0.2`是否等于`0.3`，可以将两个数字相加的结果与`0.3`相减，如果想着的结果小于极小数，那么就可以认定是相等的：
  ```js
  var a = 0.1, b = 0.2, c = 0.3;
  var result = (Math.abs(a + b - c) < Number.EPSILON);
  console.log(result) // true
  ```
- 初次之外还可以使用`Decimal.js`进行计算
  ```js
  const Decimal = require('decimal.js');
  const result = new Decimal(0.1).add(0.2); // 0.3
  ```

浮点数运算可能造成精度丢失的情况，可能造成精度丢失的地方有：
- 超过有效数字位数时会被舍入处理
- 运算过程中对阶可能造成精度丢失
- 运算过程中规格化处理后的舍入处理可能造成精度丢失

`0.1 + 0.2`由于两次存储时的精度丢失加上一次运算时的精度丢失，所以最终结果`0.1 + 0.2 !== 0.3`。


## 188、原码、反码和补码的介绍
> 前言：了解原码、反码和补码前，需要知道什么是**机器数**，**一个数在计算机中的表示形式是二进制的话，这个数其实就叫机器数**。<br>

> 机器数通常是带有符号的（指有正数和负数之分），计算机用最高位存放符号，这个`bit`一般叫做符号位。
>  - 正数的符号位为`0`
>  - 负数的符号位为`1`
>  比如，十进制中的数`+7`，计算机字长为8位，转换成二进制就是 0 0 0 0 0 1 1 1（一个`byte`有`8bit`，有效的取值范围是`-128 ~ +127`）。如果是`-7`，就是`1 0 0 0 0 1 1 1`

### 原码
**十进制数据的二进制表现形式就是原码，原码最左边的一个数字就是符号位，0为正，1为负**。
> 例如：`56 -> 0 0 1 1 1 0 0 0`，左边第一位为符号位，其他位为数据位。

> 一个`byte`有`8bit`，最大值是`0 1 1 1 1 1 1 1 (+127)`，最小值是`1 1 1 1 1 1 1 1 (-127)`
- **正数计算**<br>
  使用原码对正数进行计算不会有任何问题的，例如`5 + 2`
  ```js
  0 0 0 0 0 1 0 1
  +        0 0 1 0
  -----------------
  0 0 0 0 0 1 1 1
  ```
  把这个结果转成十进制刚好就等于`7`，完全正确无误。
- **负数计算**<br>
  如果是负数的话，那计算的结果就会大相径庭了，我们拿`-56`这个数字来举例，它的原码是`1 0 1 1 1 0 0 0`，减一之后，就会变成`1 0 1 1 0 1 1 1`，这个数转成十进制就是`-55`。计算前是`-56`，减一之后正确的结果应该是`-57（1 0 1 1 1 0 0 1）`才对，居然还越减越大了。
  ```js
   1 0 1 1 1 0 0 0
  -              1
  -----------------
  1 0 1 1 0 1 1 1
  ```
  为了解决原码不能用于计算负数的这种问题，这时候，反码它出现了，作为负数的“计算的救星”。
  计算规则: 
    - 正数的反码不变和原码一致
    - 负数的反码会在原码的基础上，高位的符号位不变，其他位取反（ 1 变成 0 ， 0 变为 1 ）。

### 反码
**正数的反码是其本身（等于原码），负数的反码是符号位保持不变，其余位取反**。反码的存在是为了正确计算负数，因为原码不能用于计算负数
![202303051616351.png](http://img.itchenliang.club/img/202303051616351.png)
- **负数计算**<br>
  `-56`的原码是`1 0 1 1 1 0 0 0`，如果转成反码（符号位不变，其他位取反），即`1 1 0 0 0 1 1 1`
  ```js
    1 1 0 0 0 1 1 1
  -              1
  -----------------
    1 1 0 0 0 1 1 0
  ```
  `-56 -1 = -57`，`-57`的原码是`1 0 1 1 1 0 0 1`，转成反码刚好是`1 1 0 0 0 1 1 0`，刚好等于刚才我们算出的值。
- **跨零计算**<br>
  不过反码也有它的 “ 软肋 ”，如果是负数跨零进行计算的话，计算得出的结果不对，例如`-3 + 5`
  - `-3`的原码是`1 0 0 0 0 0 1 1`，转成反码的话就是`1 1 1 1 1 1 0 0`
  ```js
   1 1 1 1 1 1 0 0
  +        0 1 0 1  
  -----------------
  0 0 0 0 0 0 0 1 
  ```
  把计算结果转成十进制就是`126`，这结果显然不对。那么我们该怎么计算呢，这时候，作为反码的补充编码 —— 补码就出现了。

### 补码
**正数的补码是其本身，负数的补码等于其反码`+1`。因为反码不能解决负数跨零（类似于`-6 + 7`）的问题，所以补码出现了。**
![202303051620044.png](http://img.itchenliang.club/img/202303051620044.png)
- **跨零计算**<br>
  还是上面的例子: `-3`的原码是`1 0 0 0 0 0 1 1`，转成反码的话就是`1 1 1 1 1 1 0 0`，再转成补码就是`1 1 1 1 1 1 0 1`
  ```js
   1 1 1 1 1 1 0 1
  +        0 1 0 1
  ----------------- 
  0 0 0 0 0 0 1 0
  ```
  把这个数转成十进制刚好等于2，结果正确


## 189、toPrecision 和 toFixed 和 Math.round 的区别？
- `toPrecision` 用于处理精度，精度是从左至右第一个不为 0 的数开始数起。
- `toFixed` 是对小数点后指定位数取整，从小数点开始数起。
- `Math.round` 是将一个数字四舍五入到一个整数。
```js
0.012345.toPrecision(3) // 0.0123
0.012345.toFixed(3) // 0.012
Math.round(3.45) // 3
Math.round(3.54) // 4
```


## 190、什么是 XSS 攻击？如何防范 XSS 攻击？
Cross-Site Scripting（跨站脚本攻击）简称`XSS`，是一种在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。
> XSS的本质是：恶意代码未经过滤，与网站正常的代码混在一起；浏览器无法分辨哪些脚本是可信的，导致恶意脚本被执行。

**XSS攻击有哪几种类型？**
常见的 XSS 攻击有三种：`反射型XSS攻击`、`DOM-based型XXS攻击`以及`存储型XSS攻击`。
- 反射型XSS攻击
  > 反射型 XSS 一般是攻击者通过特定手法（如电子邮件），诱使用户去访问一个包含恶意代码的 URL，当受害者点击这些专门设计的链接的时候，恶意代码会直接在受害者主机上的浏览器执行。反射型XSS通常出现在网站的搜索栏、用户登录口等地方，常用来窃取客户端 Cookies 或进行钓鱼欺骗。
- DOM-based型XXS攻击
  > 基于 DOM 的 XSS 攻击是指通过恶意脚本修改页面的 DOM 结构，是纯粹发生在客户端的攻击。DOM 型 XSS 攻击中，取出和执行恶意代码由浏览器端完成，属于前端 JavaScript 自身的安全漏洞。
- 存储型XSS攻击
  > 也叫持久型XSS，主要将XSS代码提交存储在服务器端（数据库，内存，文件系统等），下次请求目标页面时不用再提交XSS代码。当目标用户访问该页面获取数据时，XSS代码会从服务器解析之后加载出来，返回到浏览器做正常的HTML和JS解析执行，XSS攻击就发生了。存储型 XSS 一般出现在网站留言、评论、博客日志等交互处，恶意脚本存储到客户端或者服务端的数据库中。

**如何防御XSS攻击？**
1. 对输入内容的特定字符进行编码，例如表示 html标记的 < > 等符号。
2. 对重要的 cookie设置 httpOnly, 防止客户端通过document.cookie读取 cookie，此 HTTP头由服务端设置。
3. 将不可信的值输出 URL参数之前，进行 URLEncode操作，而对于从 URL参数中获取值一定要进行格式检测（比如你需要的时URL，就判读是否满足URL格式）。
4. 不要使用 Eval来解析并运行不确定的数据或代码，对于 JSON解析请使用 JSON.parse() 方法。
5. 后端接口也应该要做到关键字符过滤的问题。


## 191、什么是 CSRF 攻击？如何防范 CSRF 攻击？
CSRF 攻击指的是跨站请求伪造攻击，攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。
> CSRF 攻击的本质是利用了`cookie`会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

**CSRF原理**
- 1、用户C打开浏览器，访问受信任网站A，输入用户名和密码请求登录网站A；
- 2、在用户信息通过验证后，网站A产生Cookie信息并返回给浏览器，此时用户登录网站A成功，可以正常发送请求到网站A；
- 3、用户未退出网站A之前，在同一浏览器中，打开一个TAB页访问网站B；
- 4、网站B接收到用户请求后，返回一些攻击性代码，并发出一个请求要求访问第三方站点A；
- 5、浏览器在接收到这些攻击性代码后，根据网站B的请求，在用户不知情的情况下携带Cookie信息，向网站A发出请求。网站A并不知道该请求其实是由B发起的，所以会根据用户C的Cookie信息以C的权限处理该请求，导致来自网站B的恶意代码被执行。

CSRF 攻击的三个条件 :
1. 用户已经登录了站点 A，并在本地记录了 cookie
2. 在用户没有登出站点 A 的情况下（也就是 cookie 生效的情况下），访问了恶意攻击者提供的引诱危险站点 B (B 站点要求访问站点A)。
3. 站点 A 没有做任何 CSRF 防御

**CSRF攻击类型**
- 第一种是 GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提
交。
- 第二种是 POST 类型的 CSRF 攻击，比如说构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。
- 第三种是链接类型的 CSRF 攻击，比如说在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。

**如何防御**
> CSRF的防御可以从服务端和客户端两方面着手，防御效果是从服务端着手效果比较好，现在一般的 CSRF 防御也都在服务端进行。

CSRF攻击防御现在主要分为3种方法：
- 1、验证 HTTP Referer 字段；
- 2、添加token验证；
- 3、在 HTTP 头中自定义属性并验证。


## 192、什么是 CSP？
CSP指的是内容安全策略(Content security policy)，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。

通常有两种方式来开启CSP：**CSP也是解决 XSS 攻击的一个强力手段**
- 一种是设置 HTTP 首部中的`Content-Security-Policy`
- 一种是设置 meta 标签的方式`<meta http-equiv="Content-Security-Policy">`


## 193、什么是`Samesite Cookie`属性？
`Samesite Cookie`表示同站`cookie`，避免`cookie`被第三方所利用。
- 将`Samesite`设为`strict`，这种称为严格模式，表示这个`cookie`在任何情况下都不可能作为第三方`cookie`。
- 将`Samesite`设为`Lax`，这种模式称为宽松模式，如果这个请求是个`GET`请求，并且这个请求改变了当前页面或者打开了新的页面，那么这个`cookie`可以作为第三方`cookie`，其余情况下都不能作为第三方`cookie`。<br>
  缺点：因为它不支持子域，所以子域没有办法与主域共享登录信息，每次转入子域的网站，都回重新登录。还有一个问题就是它的兼容性不够好。


## 194、什么是点击劫持？如何防范点击劫持？
点击劫持是一种视觉欺骗的攻击手段，攻击者将需要攻击的网站通过`iframe`嵌套的方式嵌入自己的网页中，并将`iframe`设置为透明，在页面中透出一个按钮诱导用户点击。
> 我们可以在 http 相应头中设置`X-FRAME-OPTIONS`来防御用`iframe`嵌套的点击劫持攻击。通过不同的值，可以规定页面在特定的一些情况才能作为`iframe`来使用。


## 195、SQL注入攻击？
SQL注入攻击指的是攻击者在 HTTP 请求中注入恶意的`SQL`代码，服务器使用参数构建数据库`SQL`命令时，恶意`SQL`被一起构造，破坏原有`SQL`结构，并在数据库中执行，达到编写程序时意料之外结果的攻击行为。


## 196、`Object.assign()`
`Object.assign()`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。
```js
var a = {
  name: '张三'
}
var b = {
  age: 23
}
var c = Object.assign(a, b)
console.log(c) // {name: '张三', age: 23}
```


## 197、`Math.ceil()`、`Math.floor()`以及`Math.round()`的区别？
- `Math.ceil()`: 向上取整，函数返回一个大于或等于给定数字的最小整数。
- `Math.floor()`: 向下取整，函数返回一个小于或等于给定数字的最大整数。
- `Math.round()`: 将一个数字四舍五入到一个整数。
```js
Math.ceil(1.35) // 2
Math.floor(1.35) // 1
Math.round(1.5) // 1
```


## 198、js`for`循环注意点
```js
for (var i = 0, j = 0; i < 5, j < 9; i++, j++) {
  console.log(i, j);
}
```
当判断语句含有多个语句时，以最后一个判断语句的值为准，因此上面的代码会执行 10 次。当判断语句为空时，循环会一直进行。


## 199、异步编程的实现方式？
### 回调函数
优点：简单、容易理解<br>
缺点：不利于维护，代码耦合高

### 事件监听
采用时间驱动模式，取决于某个事件是否发生<br>
优点：容易理解，可以绑定多个事件，每个事件可以指定多个回调函数<br>
缺点：事件驱动型，流程不够清晰

### 发布/订阅（观察者模式）
类似于事件监听，但是可以通过‘消息中心’，了解现在有多少发布者，多少订阅者

### Promise 对象
优点：可以利用 then 方法，进行链式写法；可以书写错误时的回调函数；<br>
缺点：编写和理解，相对比较难

### Generator 函数
优点：函数体内外的数据交换、错误处理机制<br>
缺点：流程管理不方便

### async 函数
优点：内置执行器、更好的语义、更广的适用性、返回的是 Promise、结构清晰。<br>
缺点：错误处理机制


## 200、URL 和 URI 的区别？
>资源：可以通过浏览器访问的信息统称为资源。(图片、文本、HTML、CSS等等。。。)
- URI是统一资源标识符。标识资源详细名称。包含资源名。
- URL是统一资源定位器。定位资源的网络位置。包含`http:`。
```js
http://www.baidu.com ==> URL
/a.html ==> URI
http://www.baidu.com/a.html  ==> 既是URL，又是URI
```


## 201、`get`和`post`请求在缓存方面的区别
缓存一般会对不更改数据库的数据进行缓存，对于更改数据的数据一般不进行缓存。
- `get`请求不会对服务器资源进行修改，所以`get`请求会被缓存；
- `post`请求会对服务器资源进行修改，所以`post`请求不会进行缓存。


## 202、图片的懒加载和预加载
**预加载**
> 顾名思义，图片预加载就是在网页全部加载之前，提前加载图片。 当用户需要查看时可直接从本地缓存中渲染，以提供给用户更好的体验，减少等待的时间。

**懒加载**
> 懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。
- 原理: 页面中的`img`元素，如果没有`src`属性，浏览器就不会发出请求去下载图片，只有通过javascript设置了图片路径，浏览器才会发送请求。
  - 懒加载的原理就是先在页面中把所有的图片统一使用一张占位图进行占位，把正真的路径存在元素的`“data-url”`（这个名字起个自己认识好记的就行）属性里，要用的时候就取出来，再设置；

**两种技术的本质区别**
> 两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。


## 203、`mouseover`和`mouseenter`的区别？
- `mouseover`: 当鼠标移入元素或其子元素都会触发事件，所以有一个重复触发，冒泡过程。对应的移除事件是`mouseout`
- `mouseenter`: 当鼠标移除元素本身（不包含元素的子元素）会触发事件，也就是不会冒泡，对应的移除事件是`mouseleave`

`mouseover`和`mouseenter`的异同体现在两个方面：
- 是否支持冒泡
- 事件的触发时机
```html
<div class="father" style="width: 500px;height: 500px;background-color: pink;">
  <div class="son" style="width: 200px;height: 200px;background: purple;"></div>
</div>
<script>
  let father = document.querySelector('.father')
  let son = document.querySelector('.son')
  // 事件捕获
  // mouseenter——不支持事件冒泡
  father.addEventListener('mouseenter', function() {
    console.log('father-mouseenter')
  })

  son.addEventListener('mouseenter', function(e) {
    // e.stopPropagation()
    console.log('son-mouseenter')
  })

  // mouseleave——支持事件冒泡
  // father.addEventListener('mouseleave', function() {
  //   console.log('father-mouseleave')
  // })

  // son.addEventListener('mouseleave', function(e) {
  //   // e.stopPropagation()
  //   console.log('son-mouseleave')
  // })
</script>
```
- `mouseenter`事件的情况：当鼠标从元素的边界之外移入元素的边界之内时，事件被触发。而鼠标本身在元素边界内时，要触发该事件，必须先将鼠标移出元素边界外，再次移入才能触发。
- `mouseover`事件的情况：当鼠标从元素的边界之外移入元素的边界之内时，事件被触发。如果移到父元素里面的子元素，事件也会被触发。
总结: **`mouseenter`和`mouseleave`没有冒泡效果(推荐)**，而`mouseover`和`mouseout`会有冒泡效果


## 205、为什么使用`setTimeout`实现`setInterval`？怎么模拟？
**setInterval的时间误差**
```js
setInterval(fn, 300);
```
`setInterval`执行机制，`300ms`会检测一次任务队列中有无未执行的上一次任务`fn`，如果没有则将`fn`加入任务队列，如果有则跳过。由于js单线程，如果在执行`fn`前还要耗时的任务执行，则会暴露缺点:
- 某些间隔会被跳过
- 可能多个定时器会连续执行

**setTimeout执行机制**
```js
setTimeout(fn, 300);
```
每隔`300ms`会将`fn`加入到任务队列中。

**用setTimeout 模拟 setInterval**
1. 利用`setTimeout`能解决 间隔会被跳过缺点
2. 利用递归调用`setTimeout`能解决多个定时器连续执行的缺点，确保执行`fn`的间隔时间`>=300ms`;由于js单线程，只能保证每隔`300`将`fn`加入到任务队列，`fn`执行的时机与任务队列中的其他任务是否执行完毕有关。
```js
function myInterval (fn, timeout) {
  setTimeout(() => {
    fn()
    myInterval(fn, timeout)
  }, timeout)
}
myInterval(() => {
  console.log(123)
}, 1000)
```

**用setInterval模拟setTimeout**
```js
function myTimeout (fn, timeout) {
  const timer = setInterval(() => {
    fn()
    clearInterval(timer)
  }, timeout)
}
myTimeout(() => {
  console.log(123)
}, 1000)
```


## 206、什么是`rest`参数？
`rest`参数，又称剩余参数（形式为`...变量名`），用于获取函数的多余参数。`rest`参数之后不能再有其他参数(即只能是最后一个参数)
1. `rest`参数是真正意义上的数组，可以使用数组的任何方法
  ```js
  function add (x, y, ...rest) {
    console.log(rest) // [3, 4]
    rest.push(123)
    console.log(rest) // [3, 4, 123]
  }
  add(1, 2, 3, 4)
  ```
2. 函数的`length`属性，不包含`rest`
  ```js
  function add (x, y, ...rest) {
  }
  console.log(add.length) // 2
  ```
3. rest参数只能作为最后一个参数，在它之后不能存在任何其他的参数，否则会报错。
  ```js
  // 报错：A rest parameter must be last in a parameter list.
  function add (x, ...rest, y) {
  }
  ```


## 207、什么是尾调用，使用尾调用有什么好处？
尾调用指的是**在函数执行的最后一步调用另一个函数。**。
```js
function f(x) {
	return g(x)
}
function b(num) {
  return c(num + 2)
}
```
下面的两种情况都不属于尾调用：
```js
function f(x){
	let y = g(x)
	return y
}
```
```js
function f(x){
	return g(x) + 1
}
```

**为什么说尾调用的性能要比没有使用尾调用的性能好呢？**
> 代码执行是基于执行栈的，所以当在一个函数里调用另一个函数时，会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中，这样比较占用内存；<br>
> 而使用尾调用的话，因为已经是函数的最后一步，执行尾调用函数时，就可以不必再保留当前执行的上下文，从而节省了内存，这就是**尾调用优化**（尾调用的重要性在于它可以不在调用栈上面添加一个新的堆栈帧，而是更新它，如同迭代一般）。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。

**尾递归**
> 函数调用自身，叫做递归。如果尾调用自身，则就称为尾递归。

递归非常消耗内存，因为需要同时保存成千上万个调用记录，很容易发生栈溢出的错误。但是对于尾递归来说，由于只存在一个调用记录，所以永远不会发生栈溢出。
- 求阶乘的递归: 容易造成内存的泄露
  ```js
  function factorial(n) {
    if (n === 1) return 1
    return n * factorial(n - 1)
  }
  console.log(factorial(5)) //120
  ```
- 求阶乘的递归，优化成尾递归
  ```js
  function factorial(n, total) {
    if (n === 1) return total
    return factorial(n - 1, total * n)
  }
  console.log(factorial(5, 1))
  ```
  上面代码中使用尾递归，`fatorial(5, 1)`的值也就是`factorial(4, 5)`的值，同时也是`factorial(3, 20)…`这样调用栈中，每一次都只有一个函数，不会导致内存泄露。

**ES6中的尾调用优化只在严格模式下开启，正常模式下无效。**
> 这是因为在正常模式下，函数内部有两个变量，可以跟踪函数的调用栈。严格模式下禁用这两个变量，所以尾调用模式仅在严格模式下生效。


## 208、❓Symbol 类型的注意点？
1. `Symbol`函数前不能使用`new`命令，否则会报错。
2. `Symbol`函数可以接受一个字符串作为参数，表示对`Symbol`实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
3. `Symbol`作为属性名，该属性不会出现在`for...in`、`for...of`循环中，也不会被`Object.keys()`、`Object.getOwnPropertyNames()`、`JSON.stringify()`返回。
4. `Object.getOwnPropertySymbols`方法返回一个数组，成员是当前对象的所有用作属性名的`Symbol`值。
5. `Symbol.for`接受一个字符串作为参数，然后搜索有没有以该参数作为名称的`Symbol`值。如果有，就返回这个`Symbol`值，否则就新建并返回一个以该字符串为名称的`Symbol`值。
6. `Symbol.keyFor`方法返回一个已登记的`Symbol`类型值的`key`。


## 209、Set 和 WeakSet 结构？
1. ES6 提供了新的数据结构`Set`。它类似于数组，但是成员的值都是唯一的，没有重复的值。
2. `WeakSet`结构与`Set`类似，也是不重复的值的集合。但是`WeakSet`的成员只能是对象，而不能是其他类型的值。`WeakSet`中的对象都是弱引用，即垃圾回收机制不考虑`WeakSet`对该对象的引用。
```js
// Set
const set = new Set()
set.add(1).add(2).add(2); // 注意2被加入了两次

set.size // 2

set.has(1) // true
set.has(2) // true
set.has(3) // false

set.delete(2) // true
set.has(2) // false

// WeakSet
const ws = new WeakSet();
ws.add(1)
// TypeError: Invalid value used in weak set
ws.add(Symbol())
// TypeError: invalid value used in weak set
ws.add([1, 2]) // 正确
```


## 210、Map 和 WeakMap 结构？
1. `Map`数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
2. `WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。但是`WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。而且 `WeakMap`的键名所指向的对象，不计入垃圾回收机制。
```js
// Map
const map = new Map([
  ['name', '张三'],
  ['title', 'Author']
]);

map.size // 2
map.has('name') // true
map.get('name') // "张三"
map.has('title') // true
map.get('title') // "Author"

map.set(1, 'aaa').set(1, 'bbb');
map.get(1) // "bbb"

map.delete(1)
map.get(1) // undefined

map.clear()
map.size // 0

// WeakMap
// WeakMap 可以使用 set 方法添加成员
const wm1 = new WeakMap();
const key = {foo: 1};
wm1.set(key, 2);
wm1.get(key) // 2

// WeakMap 也可以接受一个数组，
// 作为构造函数的参数
const k1 = [1, 2, 3];
const k2 = [4, 5, 6];
const wm2 = new WeakMap([[k1, 'foo'], [k2, 'bar']]);
wm2.get(k2) // "bar"

const wm = new WeakMap();
wm.set(1, 2)
// TypeError: 1 is not an object!
wm.set(Symbol(), 2)
// TypeError: Invalid value used as weak map key
wm.set(null, 2)
// TypeError: Invalid value used as weak map key
let key = {};
let obj = {foo: 1};
wm.set(key, obj) // 正确
```


## 211、什么是`Proxy`？
`Proxy`用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。
> `Proxy`可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。`Proxy`这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。


## 212、`Reflect`对象创建目的？
1. 将`Object`对象的一些明显属于语言内部的方法（比如`Object.defineProperty`，放到`Reflect`对象上。
2. 修改某些`Object`方法的返回结果，让其变得更合理。
3. 让`Object`操作都变成函数行为。
4. `Reflect`对象的方法与`Proxy`对象的方法一一对应，只要是`Proxy`对象的方法，就能在`Reflect`对象上找到对应的方法。这就让`Proxy`对象可以方便地调用对应的`Reflect`方法，完成默认行为，作为修改行为的基础。也就是说，不管`Proxy`怎么修改默认行为，你总可以在`Reflect`上获取默认行为。


## 213、什么是`Promise`对象，什么是`Promises/A+`规范？
`Promise`对象是异步编程的一种解决方案，最早由社区提出。`Promises/A+`规范是 JavaScript Promise 的标准，规定了一个`Promise`所必须具有的特性。
> `Promise`是一个构造函数，接收一个函数作为参数，返回一个`Promise`实例。一个`Promise`实例有三种状态，分别是`pending`、`resolved`和`rejected`，分别代表了`进行中`、`已成功`和`已失败`。实例的状态只能由`pending`转变`resolved`或者`rejected`状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过`resolve()`和`reject()`函数来实现的，我们可以在异步操作结束后调用这两个函数改变`Promise`实例的状态，它的原型上定义了一个`then`方法，使用这个`then`方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。


## 214、怎么做 JS 代码 Error 统计？
error 统计使用浏览器的`window.onerror`事件。


## 215、❓==单例模式模式是什么？==
单例模式保证了全局只有一个实例来被访问。比如说常用的如弹框组件的实现和全局状态的实现。
> 如何实现


## 216、❓策略模式是什么？
策略模式主要是用来将方法的实现和方法的调用分离开，外部通过不同的参数可以调用不同的策略。我主要在 MVP 模式解耦的时候用来将视图层的方法定义和方法调用分离。


## 217、❓代理模式是什么？
代理模式是为一个对象提供一个代用品或占位符，以便控制对它的访问。比如说常见的事件代理。


## 218、❓中介者模式是什么？
中介者模式指的是，多个对象通过一个中介者进行交流，而不是直接进行交流，这样能够将通信的各个对象解耦。


## 219、❓适配器模式是什么？
适配器用来解决两个接口不兼容的情况，不需要改变已有的接口，通过包装一层的方式实现两个接口的正常协作。假如我们需要一种新的接口返回方式，但是老的接口由于在太多地方已经使用了，不能随意更改，这个时候就可以使用适配器模式。比如我们需要一种自定义的时间返回格式，但是我们又不能对 js 时间格式化的接口进行修改，这个时候就可以使用适配器模式。


## 220、观察者模式和发布订阅模式有什么不同？
发布订阅模式其实属于广义上的观察者模式。<br>
在观察者模式中，观察者需要直接订阅目标事件。在目标发出内容改变的事件后，直接接收事件并作出响应。<br>
而在发布订阅模式中，发布者和订阅者之间多了一个调度中心。调度中心一方面从发布者接收事件，另一方面向订阅者发布事件，订阅者需要在调度中心中订阅事件。通过调度中心实现了发布者和订阅者关系的解耦。使用发布订阅者模式更利于我们代码的可维护性。


## 221、开发中常用的几种`Content-Type`？
- （1）`application/x-www-form-urlencoded`<br>
  浏览器的原生`form`表单，如果不设置`enctype`属性，那么最终就会以`application/x-www-form-urlencoded`方式提交数据。该种方式提交的数据放在`body`里面，数据按照`key1=val1&key2=val2`的方式进行编码，`key`和`val`都进行了`URL`转码。
- （2）`multipart/form-data`<br>
  该种方式也是一个常见的`POST`提交方式，通常表单上传文件时使用该种方式。
- （3）`application/json`<br>
  告诉服务器消息主体是序列化后的 JSON 字符串。
- （4）`text/xml`<br>
  该种方式主要用来提交 XML 格式的数据。


## 222、如何判断一个对象是否为空对象？
```js
function checkNullObj(obj) {
  return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}
```


## 223、使用闭包实现每隔一秒打印`1, 2, 3, 4`
```js
// 使用闭包实现
for (var i = 0; i < 5; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, i * 1000);
  })(i);
}

// 使用 let 块级作用域
for (let i = 0; i < 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
```


## 224、一道常被人轻视的前端 JS 面试题
```js
function Foo() {
  getName = function() {
    alert(1);
  };
  return this;
}
Foo.getName = function() {
  alert(2);
};
Foo.prototype.getName = function() {
  alert(3);
};
var getName = function() {
  alert(4);
};

function getName() {
  alert(5);
}

//请写出以下输出结果：
Foo.getName(); // 2 ==> 直接调用“函数二”
getName(); // 4 ==> 调用“函数四”，函数声明赋值优先于变量声明赋值
Foo().getName(); // 1 ==> 调用“函数一”，此时里的getName = function() {} 等价于 window.getName = function () {}
getName(); // 1 ==> 调用函数一执行后得到的 window.getName = function () {}，即调用“函数一”
new Foo.getName(); // 2 ==> 调用“函数二”
new Foo().getName(); // 3 ==> 等价于 (new Foo()).getName() ==> 即调用“函数三”
new new Foo().getName(); // 3 ==> 等价于 (new (new Foo())).getName() ==> 调用“函数三”
```


## 225、如何确定页面的可用性时间，什么是 Performance API？
Performance API 用于精确度量、控制、增强浏览器的性能表现。这个 API 为测量网站性能，提供以前没有办法做到的精度。

使用`getTime`来计算脚本耗时的缺点:
- 首先，`getTime`方法（以及 Date 对象的其他方法）都只能精确到毫秒级别（一秒的千分之一），想要得到更小的时间差别就无能为力了
- 其次，这种写法只能获取代码运行过程中的时间进度，无法知道一些后台事件的时间进度，比如浏览器用了多少时间从服务器加载网页。

为了解决这两个不足之处，ECMAScript 5引入“高精度时间戳”这个 API，部署在`performance`对象上。它的精度可以达到1毫秒的千分之一（1秒的百万分之一）。
- `navigationStart`：当前浏览器窗口的前一个网页关闭，发生`unload`事件时的`Unix`毫秒时间戳。如果没有前一个网页，则等于`fetchStart`属性。
- `loadEventEnd`：返回当前网页`load`事件的回调函数运行结束时的`Unix`毫秒时间戳。如果该事件还没有发生，返回`0`。

根据上面这些属性，可以计算出网页加载各个阶段的耗时。比如，网页加载整个过程的耗时的计算方法如下：
```js
var t = performance.timing;
var pageLoadTime = t.loadEventEnd - t.navigationStart;
```


## 226、js 中的命名规则
- （1）第一个字符必须是字母、下划线（_）或美元符号（$）
- （2）余下的字符可以是下划线、美元符号或任何字母或数字字符

一般我们推荐使用驼峰法来对变量名进行命名，因为这样可以与 ECMAScript 内置的函数和对象命名格式保持一致。


## 227、js 中倒计时的纠偏实现？
在前端实现中我们一般通过`setTimeout`和`setInterval`方法来实现一个倒计时效果。
> 但是使用这些方法会存在时间偏差的问题，这是由于 js 的程序执行机制造成的，`setTimeout`和`setInterval`的作用是隔一段时间将回调事件加入到事件队列中，因此事件并不是立即执行的，它会等到当前执行栈为空的时候再取出事件执行，因此事件等待执行的时间就是造成误差的原因。

一般解决倒计时中的误差的有这样两种办法：
- （1）第一种是通过前端定时向服务器发送请求获取最新的时间差，以此来校准倒计时时间。
- （2）第二种方法是前端根据偏差时间来自动调整间隔时间的方式来实现的。这一种方式首先是以 setTimeout 递归的方式来实现倒计时，然后通过一个变量来记录已经倒计时的秒数。每一次函数调用的时候，首先将变量加一，然后根据这个变量和每次的间隔时间，我们就可以计算出此时无偏差时应该显示的时间。然后将当前的真实时间与这个时间相减，这样我们就可以得到时间的偏差大小，因此我们在设置下一个定时器的间隔大小的时候，我们就从间隔时间中减去这个偏差大小，以此来实现由于程序执行所造成的时间误差的纠正。
  ```js
  const interval = 1000
  // 从服务器和活动开始时间计算出的时间差，这里测试用 50000ms
  let ms = 50000
  let count = 0
  // 开始倒计时的时间
  const startTime = new Date().getTime()
  let timer = null
  if (ms >= 0) {
    timer = setTimeout(func, interval)
  }

  function func () {
    count++
    const delaytime = new Date().getTime() - (startTime + count * interval) // A
    if (delaytime < 0) { 
      delaytime = 0 
    }
    let nextTime = interval - delaytime
    ms -= interval
    console.log(`误差：${delaytime} ms，下一次执行：${nextTime} ms 后，离活动开始还有：${ms} ms`)
    if (ms <= 0) {
      clearTimeout(timer)
    } else {
      timer = setTimeout(func, nextTime)
    }
  }
  ```


## 228、进程间通信的方式？
[进程间的六种通信方式](https://blog.csdn.net/GMLGDJ/article/details/124627224)
1. 管道通信
2. 消息队列通信
3. 信号量通信
4. 信号通信
5. 共享内存通信
6. 套接字通信


## 229、微信的JSSDK都有哪些内容？如何接入？
微信JS-SDK：是开发者在网页上通过JavaScript代码使用微信原生功能的工具包，开发者可以使用它在网页上录制和播放微信语音、监听微信分享、上传手机本地图片、拍照等许多能力。

JSSDK使用步骤: [微信JS-SDK说明文档](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/JS-SDK.html)
- 步骤一：绑定域名<br>
  先登录微信公众平台进入“公众号设置”的“功能设置”里填写“JS接口安全域名”。
- 步骤二：引入JS文件
  ```html
  <!-- 在需要调用JS接口的页面引入JS文件 -->
  <script src="http://res.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  <!-- 如需进一步提升服务稳定性，当上述资源不可访问时，可改访问 -->
  <script src="http://res2.wx.qq.com/open/js/jweixin-1.6.0.js"></script>
  ```
- 步骤三：通过`config`接口注入权限验证配置<br>
  所有需要使用JS-SDK的页面必须先注入配置信息，否则将无法调用（同一个url仅需调用一次，对于变化url的SPA的web app可在每次url变化时进行调用）
  ```js
  wx.config({
    debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: '', // 必填，公众号的唯一标识
    timestamp: , // 必填，生成签名的时间戳
    nonceStr: '', // 必填，生成签名的随机串
    signature: '',// 必填，签名
    jsApiList: [] // 必填，需要使用的JS接口列表
  });
  ```
  js-sdk签名算法
    - 1、获取`access_token`
      ```
      GET https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
      参数说明：
        - grant_type：必填，获取access_token填写client_credential
        - appid：必填，第三方用户唯一凭证，即APPID，到“微信公众平台-开发-开发管理-开发设置”页中获得
        - secret：必填，第三方用户唯一凭证密钥，即appsecret，到“微信公众平台-开发-开发管理-开发设置”页中获得
      ```
      获得`jsapi_ticket`之后，就可以生成JS-SDK权限验证的签名了。
    - 2、签名算法
      ```
      签名生成规则：
        参与签名的字段包含：
        - noncestr：随机字符串
        - jsapi_ticket：有效的access_token
        - timestamp：时间戳
        - url：当前网页的URL，不包含#及其后面部分
        对所有待签名参数按照字段名的ASCII码从小到大排序（字典序，即a-z）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1。
        这里需要注意的是所有参数名均为小写字符。对string1作sha1加密，字段名和字段值都采用原始值，不进行URL 转义。
        即signature=sha1(string1)。例如：
          - noncestr=Wm3WZYTPz0wzccnW
          - jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg
          - timestamp=1414587457
          - url=http://mp.weixin.qq.com?params=value
        第一步：对所有待签名参数按照字段名的ASCII 码从小到大排序（字典序）后，使用URL键值对的格式（即key1=value1&key2=value2…）拼接成字符串string1
          jsapi_ticket=sM4AOVdWfPE4DxkXGEs8VMCPGGVi4C3VM0P37wVUCFvkVAy_90u5h9nbSlYy3-Sl-HhTdfl2fzFy1AOcHKP7qg&noncestr=Wm3WZYTPz0wzccnW&timestamp=1414587457&url=http://mp.weixin.qq.com?params=value
        第二步：对string1进行sha1签名，得到signature
          0f9de62fce790f9a083d5c99e95740ceb90c27ed
      ```
- 步骤四：通过`ready`接口处理成功验证
  ```js
  wx.ready(function(){
    // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
  });
  ```
- 步骤五：通过`error`接口处理失败验证
  ```js
  wx.error(function(res){
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  });
  ```


## 230、H5页面在微信中如何禁止分享给好友和朋友圈？
利用JSBridge实现调用微信提供的一些原生功能，可以通过调用隐藏操作菜单来实现禁用分享。
```js
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
  WeixinJSBridge.call('hideOptionMenu');
});
```


## 240、什么是本地存储的有效期？
本地存储的四种方式：`cookie`，`localStorage`, `sessionStorage`, `indexDB`
- **cookie**: 通过`expires/max-age`设置过期时间。如不指定，则为`session cookie`, 即一次会话有效。
- **localStorage**: 持久存储，需主动清除
- **sessionStorage**: 会话存储，会话结束（浏览器，标签页关闭）自动清除。
- **indexDB**: 持久存储，需主动删除。


## 241、ECMAScript 和 JavaScript 的关系
前者是后者的规格，后者是前者的一种实现。在日常场合，这两个词是可以互换的。


## 242、一次js请求一般情况下有哪些地方会有缓存处理？
### DNS缓存
DNS缓存指DNS返回了正确的IP之后，系统就会将这个结果临时储存起来。并且它会为缓存设定一个失效时间 (例如N小时)，在这N小时之内，当你再次访问这个网站时，系统就会直接从你电脑本地的DNS缓存中把结果交还给你，而不必再去询问DNS服务器，变相“加速”了网址的解析。当然，在超过N小时之后，系统会自动再次去询问DNS服务器获得新的结果。 所以，当你修改了 DNS 服务器，并且不希望电脑继续使用之前的DNS缓存时，就需要手动去清除本地的缓存了。<br>
本地DNS迟迟不生效或者本地dns异常等问题，都会导致访问某些网站出现无法访问的情况，这个时候我们就需要手动清除本地dns缓存，而不是等待！

### CDN缓存
和Http类似，客户端请求数据时，先从本地缓存查找，如果被请求数据没有过期，拿过来用，如果过期，就向CDN边缘节点发起请求。CDN便会检测被请求的数据是否过期，如果没有过期，就返回数据给客户端，如果过期，CDN再向源站发送请求获取新数据。和买家买货，卖家没货，卖家再进货一个道理。<br>
CDN边缘节点缓存机制，一般都遵守http标准协议，通过http响应头中的Cache-Control和max-age的字段来设置CDN边缘节点的数据缓存时间。

### 浏览器缓存
浏览器缓存（Browser Caching）是为了节约网络的资源加速浏览，浏览器在用户磁盘上对最近请求过的文档进行存储，当访问者再次请求这个页面时，浏览器就可以从本地磁盘显示文档，这样就可以加速页面的阅览。<br>
浏览器缓存主要有两类：缓存协商：Last-modified ，Etag 和彻底缓存：cache-control，Expires。浏览器都有对应清除缓存的方法。

### 服务器缓存
服务器缓存有助于优化性能和节省宽带，它将需要频繁访问的Web页面和对象保存在离用户更近的系统中，当再次访问这些对象的时候加快了速度。


## 245、ES6 都有什么`Iterator`遍历器
1. 遍历器（`Iterator`）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署`Iterator`接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）
2. `Iterator`的作用有三个：
  - 一是为各种数据结构，提供一个统一的、简便的访问接口；
  - 二是使得数据结构的成员能够按某种次序排列；
  - 三是 ES6 创造了一种新的遍历命令`for... of`循环，`Iterator`接口主要供`for... of`消费。
3. 默认部署了`Iterator`的数据有`Array`、`Map`、`Set`、`String`、`TypedArray`、`arguments`、`NodeList`对象，ES6 中有的是`Set`、`Map`。


## 246、ES6 中类的定义
```js
// 1、类的基本定义
class Parent {
  constructor(name = "小白") {
    this.name = name;
  }
}
```
```js
// 2、生成一个实例
let g_parent = new Parent();
console.log(g_parent); //{name: "小白"}
let v_parent = new Parent("v"); // 'v'就是构造函数name属性 , 覆盖构造函数的name属性值
console.log(v_parent); // {name: "v"}
```
```js
// 3、继承
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }
}
class Child extends Parent {}

console.log("继承", new Child()); // 继承 {name: "小白"}
```
```js
// 4、继承传递参数
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }
}

class Child extends Parent {
  constructor(name = "child") {
    // 子类重写name属性值
    super(name); // 子类向父类修改 super一定放第一行
    this.type = "preson";
  }
}
console.log("继承", new Child("hello")); // 带参数覆盖默认值  继承{name: "hello", type: "preson"}
```
```js
// 5、ES6重新定义的ES5中的访问器属性
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }

  get longName() {
    // 属性
    return "mk" + this.name;
  }

  set longName(value) {
    this.name = value;
  }
}

let v = new Parent();
console.log("getter", v.longName); // getter mk小白

v.longName = "hello";
console.log("setter", v.longName); // setter mkhello
```
```js
// 6、类的静态方法
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }

  static tell() {
    // 静态方法:通过类去调用，而不是实例
    console.log("tell");
  }
}

Parent.tell(); // tell
```
```js
// 7、类的静态属性：
class Parent {
  //定义一个类
  constructor(name = "小白") {
    this.name = name;
  }

  static tell() {
    // 静态方法:通过类去调用，而不是实例
    console.log("tell"); // tell
  }
}

Parent.type = "test"; // 定义静态属性

console.log("静态属性", Parent.type); // 静态属性 test

let v_parent = new Parent();
console.log(v_parent); // {name: "小白"}  没有tell方法和type属性
```


## 247、谈谈你对 ES6 的理解
`es6`是一个新的标准，它包含了许多新的语言特性和库，是 JS 最实质性的一次升级。
> 比如`'箭头函数'`、`'字符串模板'`、`'generators(生成器)'`、`'async/await'`、`'解构赋值'`、`'class'`等等，还有就是引入`module`模块的概念。


## 248、说说你对 promise 的了解
`Promise`是异步编程的一种解决方案，比传统的解决方案——`回调函数`和`事件监听`——更合理和更强大。
> 所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，`Promise`是一个对象，从它可以获取异步操作的消息。`Promise`提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点:
- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。


## 249、解构赋值及其原理
其实就是分解出一个对象的解构，分成两个步骤：
- 变量的声明
- 变量的赋值

原理：ES6 变量的解构赋值本质上是“模式匹配”, 只要等号两边的模式相同，左边的变量就会被赋予匹配的右边的值，如果匹配不成功变量的值就等于 `undefined`。


## 250、`Array.from()`与`Array.reduce()`
- `Array.from()`方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
- `Array.reduce()`方法对累加器和数组中的每个元素 (从左到右)应用一个函数，将其减少为单个值。

**`Array.from()`**
```js
// 1、将类数组对象转换为真正数组：
let arrayLike = {
  0: "tom",
  1: "65",
  2: "男",
  3: ["jane", "john", "Mary"],
  length: 4
};
let arr = Array.from(arrayLike);
console.log(arr); // ['tom','65','男',['jane','john','Mary']]


// 2、改变类数组对象的键值
let arrayLike = {
  name: "tom",
  age: "65",
  sex: "男",
  friends: ["jane", "john", "Mary"],
  length: 4
};
let arr = Array.from(arrayLike);
console.log(arr); // [ undefined, undefined, undefined, undefined ]

// 3、将Set结构的数据转换为真正的数组：
let arr = [12, 45, 97, 9797, 564, 134, 45642];
let set = new Set(arr);
console.log(Array.from(set)); // [ 12, 45, 97, 9797, 564, 134, 45642 ]

// Array.from还可以接受第二个参数，作用类似于数组的map方法，用来对每个元素进行处理，将处理后的值放入返回的数组。如下
let arr = [12, 45, 97, 9797, 564, 134, 45642];
let set = new Set(arr);
console.log(Array.from(set, item => item + 1)); // [ 13, 46, 98, 9798, 565, 135, 45643 ]


// 4、将字符串转换为数组：
let str = "hello world!";
console.log(Array.from(str)); // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d", "!"]

// 5、Array.from参数是一个真正的数组：
console.log(Array.from([12, 45, 47, 56, 213, 4654, 154]));
// 像这种情况，Array.from会返回一个一模一样的新数组
```


## 251、var、let 在 for 循环中的区别
```js
// 使用var声明，得到3个3
var a = [];
for (var i = 0; i < 3; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[0](); //3
a[1](); //3
a[2](); //3

//使用let声明，得到0,1,2
var a = [];
for (let i = 0; i < 3; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[0](); //0
a[1](); //1
a[2](); //2
```
```js
for(var i=0;i<5;i++){
  setTimeout(()=>{
    console.log(i);//5个5
  },100)
}
console.log(i);//5
console.log('=============')

for(let j=0;j<5;j++){
  setTimeout(()=>{
    console.log(j);//0,1,2,3,4
  },100)
}
console.log(j);//报错 j is not defined
```
- var是全局作用域，有变量提升的作用，所以在for中定义一个变量，全局可以使用，循环中的每一次给变量i赋值都是给全局变量i赋值。
- let是块级作用域,只能在代码块中起作用，在js中一个{}中的语句我们也称为叫一个代码块，每次循环会产生一个代码块，每个代码块中的都是一个新的变量i;


## 252、模板字符串
就是这种形式`${varible}`, 在以往的时候我们在连接字符串和变量的时候需要使用这种方式`'string' + varible + 'string'`但是有了模版语言后我们可以使用`string ${varible} string`这种进行连接。基本用途有如下：
1. 基本的字符串格式化，将表达式嵌入字符串中进行拼接，用`${}`来界定。
  ```js
  // es5
  var name = "lux";
  console.log("hello" + name);

  // es6
  const name = "lux";
  console.log(`hello ${name}`); //hello lux
  ```
2. 在 ES5 时我们通过反斜杠来做多行字符串或者字符串一行行拼接，ES6 反引号(<code>``</code>)直接搞定。
  ```js
    // ES5
    var template =
        "hello \
    world";
    console.log(template); //hello world

    // ES6
    const template = `hello
    world`;
    console.log(template); //hello 空行 world
  ```


## 253、箭头函数需要注意的地方
箭头函数有几个使用注意点。
- （1）函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象。
- （2）不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
- （3）不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`rest`参数代替。
- （4）不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数。


## 254、ES6 如何动态加载 import
```js
import("lodash").then(_ => {
  // Do something with lodash (a.k.a '_')...
});
```


## 255、箭头函数和普通函数有什么区别
- 函数体内的`this`对象，就是定义时所在的对象，而不是使用时所在的对象，用`call apply bind`也不能改变`this`指向
- 不可以当作构造函数，也就是说，不可以使用`new`命令，否则会抛出一个错误。
- 不可以使用`arguments`对象，该对象在函数体内不存在。如果要用，可以用`rest`参数代替。
- 不可以使用`yield`命令，因此箭头函数不能用作`Generator`函数。
- 箭头函数没有原型对象`prototype`


## 256、Promise 构造函数是同步执行还是异步执行，那么`then`方法呢？
`promise`构造函数是同步执行的，`then`方法是异步执行的
```js
const promise = new Promise((resolve, reject) => {
  console.log(1)
  resolve()
  console.log(2)
})

promise.then(() => {
  console.log(3)
})

console.log(4)
```
输出结果：1 2 4 3


## 257、Promise. all并发限制
`Promise.all`可以保证，`promises`数组中所有`promise`对象都达到`resolve`状态，才执行`then`回调。
> 场景：如果你的`promises`数组中每个对象都是`http`请求，或者说每个对象包含了复杂的调用处理。而这样的对象有几十万个。那么会出现的情况是，你在瞬间发出几十万 http 请求（tcp 连接数不足可能造成等待），或者堆积了无数调用栈导致内存溢出。这时候，我们就需要考虑**对`Promise.all`做并发限制**。

**`Promise.all`并发限制指的是，每个时刻并发执行的`promise`数量是固定的，最终的执行结果还是保持与原来的`Promise.all`一致。**
> 现在已经有的成熟解决方案：`tiny-async-pool`、`es6-promise-pool`、`p-limit`

**手写实现**: 
```js
function PromiseLimit(funcArray, limit = 5) {
  let i = 0;
  const result = [];
  const executing = [];
  const queue = function() {
    if (i === funcArray.length) return Promise.all(executing);
    const p = funcArray[i++]();
    result.push(p);
    const e = p.then(() => executing.splice(executing.indexOf(e), 1));
    executing.push(e);
    if (executing.length >= limit) {
      return Promise.race(executing).then(
        () => queue(),
        e => Promise.reject(e)
      );
    }
    return Promise.resolve().then(() => queue());
  };
  return queue().then(() => Promise.all(result));
}
```
```js
// 效果演示
// 测试代码
const result = [];
for (let index = 0; index < 10; index++) {
  result.push(function() {
    return new Promise((resolve, reject) => {
      console.log("开始" + index, new Date().toLocaleString());
      setTimeout(() => {
        resolve(index);
        console.log("结束" + index, new Date().toLocaleString());
      }, parseInt(Math.random() * 10000));
    });
  });
}
PromiseLimit(result).then(data => {
  console.log(data);
});
```


首先先看一下要实现的效果，有一个定时器，在`1000,5000,3000,2000s`之后输出时间，每次并发为`2`。也就是先执行`1000`和`5000`，等到`1000`完成后，开始执行`3000`，以此类推直到所有任务完成（先实现这样一个简单的并发控制，并没有对`promise`数组拿到结果，执行`then`）
```js
const timeout = i => new Promise(resolve => {
  console.log(i);
  setTimeout(() => resolve(i), i)
});
asyncPools(2, [1000, 5000, 3000, 2000], timeout)
```
`asyncPools`接受三个参数（`poolLimit`, `array`, `iteratorFn`）
- `poolLimit`：并发限制
- `array`：需要执行的并发数组
- `iteratorFn`：具体执行的`promise`函数
```js
function asyncPools(poolLimit,array,fnInter) {
  let doing = [];
  let i =0;
  function pp(){
    if(i>=array.length) {
      return;
    }
    let e = fnInter(array[i++]); //初始化promise
    e.then(()=>doing.splice(doing.indexOf(e),1))  //完成之后从doing删除
    doing.push(e); //放进doing列表
    if(doing.length>=poolLimit) {  //超出限制的话
      Promise.race(doing).then(pp); //监听每完成一个就再放一个
    }
    else {  //否则直接放进去
      pp();
    }
  }
  pp();
}
```


## 258、介绍下`Promise. all`使用、原理实现及错误处理
### Promise.all如何使用
对于`Promise.all(arr)`来说，在参数数组中所有元素都变为决定态后，然后才返回新的`promise`。
```js
// 以下 demo，请求两个 url，当两个异步请求返还结果后，再请求第三个 url
const p1 = request(`http://some.url.1`)
const p2 = request(`http://some.url.2`)
Promise.all([p1, p2])
  .then((datas) => { // 此处 datas 为调用 p1, p2 后的结果的数组
    return request(`http://some.url.3?a=${datas[0]}&b=${datas[1]}`)
  })
  .then((data) => {
    console.log(msg)
  })
```

### Promise.all原理实现
```js
function promiseAll(promises){
  return new Promise(function(resolve,reject){
    if(!Array.isArray(promises)){
      return reject(new TypeError("argument must be anarray"))
    }
    var countNum = 0;
    var promiseNum = promises.length;
    var resolvedvalue = new Array(promiseNum);
    for(var i = 0; i < promiseNum; i++){
      (function(i){
        Promise.resolve(promises[i]).then(function(value){
          countNum++;
          resolvedvalue[i]=value;
          if(countNum===promiseNum){
            return resolve(resolvedvalue)
          }
      }, function(reason){
        return reject(reason)
      )})(i)
    }
  })
}
var p1 = Promise.resolve(1),
p2 = Promise.resolve(2),
p3 = Promise.resolve(3);
promiseAll([p1,p2,p3]).then(function(value){
  console.log(value)
})
```

### Promise.all错误处理
有时候我们使用`Promise.all()`执行很多个网络请求，可能有一个请求出错，但我们并不希望其他的网络请求也返回`reject`，要错都错，这样显然是不合理的。如何做才能做到`promise.all`中即使一个`promise`程序`reject`，`promise.all`依然能把其他数据正确返回呢?
1. 为每个promise关联一个错误的处理函数
  ```js
  var p1 = Promise.resolve(3).catch(function(err) {
    return err;
  });
  var p2 = Promise.reject(2).catch(function(err) {
    return err;
  });
  var p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  }).catch(function(err) {
    return err;
  }); 
  
  Promise.all([p1, p2, p3]).then(values => { 
    console.log(values); // [3, 2, "foo"]
  }).catch(function(err) {
    console.log(1); //不会走到这里
  });
  ```


## 93、让你自己设计实现一个requireJS，你会怎么做？
首先看看`require.js`的使用
```js
require.config({
  paths: {
    a: 'js/a',
    b: 'js/b',
    home: 'js/home'
  },
  shim: {
    'home': {
      deps: ['a']
    },
    'a': {
      deps: ['b']
    }
  }
});
 
//index.js
require(['home'], function (home) {
 
});
 
//home.js
define(['a'],function(a){
 
});
 
//a.js
define(['b'],function(b){
 
});
 
//b.js
define([],function(){
 
});
```
查看html元素，会在head中看到：
```html
<script src="js/b.js"></script>
<script src="js/a.js"></script>
<script src="js/home.js"></script>
```
很明显程序的执行顺序是`b - > a -> home`，如果我们把`require.config`中的`shim`删除，那么程序就不知道js的依赖关系，于是我们查看head：
```html
<script src="js/home.js"></script>
<script src="js/a.js"></script>
<script src="js/b.js"></script>
```
奇怪的是程序运行后并没有发生错误，奥秘就在于每个js文件都做了amd规范，我们把逻辑都放在了define的回调函数中，当加载了js文件后并不会马上执行我们的逻辑代码。

`define`做了一件重要的事情，生成模块。当确定模块都加载完毕了，利用一个递归函数按顺序执行`define`中的回调函数。最后执行顶层模块对象的回调函数，即`require`方法的第二个参数。

模块之间的通信是利用`args`这个参数，它保存了它的子级模块回调函数的返回值，`callback`顾名思义保存了当前模块的回调函数。

模块对象如下：
```js
{ moduleName: "_@$1", deps: ["a","b"], callback: null, args: null}
```
现在我们明白了，其实head中插入的script标签先后顺序无关紧要了。

自我实现:
首先定义全局变量`context`，由于`require`方法可以多次调用，意味着顶层模块对象也是多个，所以`topModule`是一个数组。
`modules`模块对象上面已经解释过了。`waiting`保存了等待加载完成的模块。它很重要，我们通过判断：`if(!context.waiting.length){  //执行递归函数按顺序执行define中的回调函数  }`
```js
var context = {
  topModule: [], //存储requre函数调用生成的顶层模块对象名。　　
  modules: {}, //存储所有的模块。使用模块名作为key，模块对象作为value　　
  waiting: [], //等待加载完成的模块
  loaded: [] //加载好的模块   (加载好是指模块所在的文件加载成功)
};
```
接着我们看`require`方法：
```js
var require = root.require = function(dep,callback) {
  if (typeof dep == 'function'){
    callback = dep;
    dep = [];
  }else if (typeof callback != 'function'){
    callback = function(){};
    dep = dep || [];
  }

  var name = '_@$' + (requireCounter++);
  context.topModule.push(name);
  //剔除数组重复项
  dep = unique(dep);

  //context.modules._@$1 = {moduleName:"_@$1",deps:["a","b"],callback:null,callbackReturn:null,args:null}
  createModule({
    moduleName: name,
    deps: deps2format(dep),
    callback: callback
  });

  each(dep,function(name){
    req(name);
  });

  //如果dep是空数组直接执行callback
  completeLoad();
};
```
requier方法做了5件事情：
- 1、参数容错处理
- 2、生成顶层模块名并添加到topModule数组中
- 3、剔除数组（依赖）重复项
- 4、创建顶层模块
- 5、遍历数组（依赖）

遍历数组中调用了`req`方法，我们来看一下：
```js
function req(name,callback){
  var deps = config.shim[name];
  deps = deps ? deps.deps : [];

  function notifymess(){
    //检查依赖是否全部加载完成
    if(iscomplete(deps)){
      var element = createScript(name);
      element && (element.onload = element.onreadystatechange = function () {
        onscriptLoaded.call(this,callback);
      });
    }
  };

  //如果存在依赖则把创建script标签的任务交给依赖去完成
  if(deps.length > 0){
    each(deps,function(name){
      req(name, notifymess);
    });
  }else{
    notifymess();
  }
};
```
req方法是一个递归函数，首先判断是否存在依赖，如果存在则遍历依赖，在循环中调用req，传递2个参数，模块名与notifymess方法，由于存在依赖，所以不创建script标签，也就是说不执行notifymess方法，而是把它当成回调函数传递给req，等待下次执行req再执行。否则执行notifymess方法，即创建script标签添加到head中。
大致的思路就是父模块创建script方法交给子模块去完成，当子模块创建了script标签，然后在onload事件中创建父script标签，只有这样才能按照依赖关系在head中按先后顺序插入script标签。

也许有人觉得这样做太过麻烦，不是说插入script标签顺序不重要了吗，他是由define回调统一处理。但是你别忘了，如果加载的js文件不是amd规范的是没有包裹define方法的。req函数之所以这样做正是出于这种情况的考虑。

现在我们根据配置参数完成了首次插入script标签的任务。第二次插入标签的任务将在define中完成。（其实插入标签是交替进行的，这里说的首次和再次是思路上的划分）

接着我们就看一下define方法：
```js
var define = root.define = function(name,dep,callback){
  if(typeof name === 'object'){
    callback = dep;
    dep = name;
    name = 'temp';
  }else if (typeof dep == 'function') {
    callback = dep;
    dep = [];
  }else if (typeof callback != 'function') {
    callback = function () {};
    dep = dep || [];
  }

  //剔除数组重复项
  dep = unique(dep);

  //创建一个临时模块，在onload完成后修改它
  createModule({
    moduleName:name,
    deps:deps2format(dep),
    callback:callback
  });

  //遍历依赖，如果配置文件中不存在则创建script标签
  each(dep,function(name){
    var element = createScript(name);
    element && (element.onload = element.onreadystatechange = onscriptLoaded);
  });
};
```
define方法做了4件事情：
- 1、参数容错处理
- 2、剔除数组（依赖）重复项
- 3、创建一个临时模块，在onload完成后修改它
- 4、遍历数组（依赖），如果配置文件中不存在则创建script标签

模块就是在define方法执行后创建的，这也不难理解只有define需要模块化方便之后的回调函数统一处理，如果程序一上来就创建模块势必造成资源浪费（没有amd规范的js文件当然不需要模块化管理啦）

由于无法得知模块名，我们只能创建一个临时模块，模块名暂时叫temp，然后在该js文件的onload事件中通过this.getAttribute('data-requiremodule') 获得模块名再改回来。

这里的思路是script标签添加到head中，首先执行的是该js文件（define方法），然后再执行onload事件，我们正是利用这个时间差修改了模块名。

接着看一下script标签onload事件做了哪些事情：
```js
function onscriptLoaded(callback){
  if (!this.readyState || /loaded|complete/.test(this.readyState)) {
    this.onload = this.onreadystatechange = null;
    var name = this.getAttribute('data-requiremodule');
    context.waiting.splice(context.waiting.indexOf(name),1);
    context.loaded.push(name);
    typeof callback === 'function' && callback();
    if(context.modules.hasOwnProperty('temp')){
      var tempModule = context.modules['temp'];
      //修改临时模块名
      tempModule.moduleName = name;
      //生成新模块
      createModule(tempModule);
      //删除临时模块
      delete context.modules['temp'];
    }
    //script标签全部加载完成，准备依次执行define的回调函数
    completeLoad();
  }
};
```
它做了4件事情：
- 1、获得模块名
- 2、waiting数组中删除一个当前的模块名，loaded数组中添加一个当前的模块名
- 3、如果有临时模块修改它
- 4、如果script标签全部加载完成，准备依次执行define的回调函数

获得模块名的思路是在创建script时给一个自定义属性：element.setAttribute('data-requiremodule', name);  在onload中获取 this.getAttribute('data-requiremodule');
```js
function createScript(name){
  var element,
      scripts = document.head || document.getElementsByTagName('head')[0] || document.documentElement;

  name = name2format(name);

  if(!iscontain(name)) return false;

  context.waiting.push(name);
  element = document.createElement('script');
  element.setAttribute('type', 'text/javascript');
  element.setAttribute('async', true);
  element.setAttribute('charset', 'utf-8');
  element.setAttribute('src', (config.paths[name] || name) + '.js');
  element.setAttribute('data-requiremodule', name);
  scripts.appendChild(element, scripts.firstChild);
  return element;
};
```
最后依次执行回调：
```js
function exec(module) {　　
  var deps = module.deps;　　//当前模块的依赖数组
  var args = module.args;　　//当前模块的回调函数参数
  for (var i = 0, len = deps.length; i < len; i++) { //遍历 　　　
    var dep = context.modules[deps[i]];
    args[i] = exec(dep); //递归得到依赖模块返回值作为对应参数
  }
  return module.callback.apply(module, args); // 调用回调函数，传递给依赖模块对应的参数。
}
 
function completeLoad(){
  if(!context.waiting.length){
    while(context.topModule.length){
      var name = context.topModule.shift(),
          topModule = context.modules[name]; //找到顶层模块。
      exec(topModule);
    }
  }
};
```
简化版的requireJs源码分析完了.


## 259、❓请介绍Promise，异常捕获


## 260、❓设计并实现`Promise.race()`


## 270、❓模拟实现一个`Promise.finally`


## 271、用Promise对象实现的 Ajax
```js
const getJSON = function(url) {
  const promise = new Promise(function(resolve, reject) {
    const handler = function() {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status === 200) {
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
    };
    const client = new XMLHttpRequest();
    client.open("GET", url);
    client.onreadystatechange = handler;
    client.responseType = "json";
    client.setRequestHeader("Accept", "application/json");
    client.send();
  });
  return promise;
};
getJSON("/posts.json").then(function(json) {
  console.log('Contents: ' + json);
}, function(error) {
  console.error('出错了', error);
});
```
上面代码中，getJSON是对 XMLHttpRequest 对象的封装，用于发出一个针对 JSON 数据的 HTTP 请求，并且返回一个Promise对象。需要注意的是，在getJSON内部，resolve函数和reject函数调用时，都带有参数。


## 271、简单实现async/await中的async函数
async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里
```js
function spawn(genF) {
    return new Promise(function(resolve, reject) {
        const gen = genF();

        function step(nextF) {
            let next;
            try {
                next = nextF();
            } catch (e) {
                return reject(e);
            }
            if (next.done) {
                return resolve(next.value);
            }
            Promise.resolve(next.value).then(
                function(v) {
                    step(function() {
                        return gen.next(v);
                    });
                },
                function(e) {
                    step(function() {
                        return gen.throw(e);
                    });
                }
            );
        }
        step(function() {
            return gen.next(undefined);
        });
    });
}
```

## 手写EventEmitter 实现
```js
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        let callbacks = this.events[event] || [];
        callbacks.push(callback);
        this.events[event] = callbacks;

        return this;
    }

    off(event, callback) {
        let callbacks = this.events[event];
        this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);

        return this;
    }

    emit(event, ...args) {
        let callbacks = this.events[event];
        callbacks.forEach(fn => {
            fn(...args);
        });

        return this;
    }

    once(event, callback) {
        let wrapFun = (...args) => {
            callback(...args);

            this.off(event, wrapFun);
        };
        this.on(event, wrapFun);

        return this;
    }
}
```

## 手写一个观察者模式？
```js
var events = (function() {
    var topics = {};

    return {
        // 注册监听函数
        subscribe: function(topic, handler) {
            if (!topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
            topics[topic].push(handler);
        },

        // 发布事件，触发观察者回调事件
        publish: function(topic, info) {
            if (topics.hasOwnProperty(topic)) {
                topics[topic].forEach(function(handler) {
                    handler(info);
                });
            }
        },

        // 移除主题的一个观察者的回调事件
        remove: function(topic, handler) {
            if (!topics.hasOwnProperty(topic)) return;

            var handlerIndex = -1;
            topics[topic].forEach(function(item, index) {
                if (item === handler) {
                    handlerIndex = index;
                }
            });

            if (handlerIndex >= 0) {
                topics[topic].splice(handlerIndex, 1);
            }
        },

        // 移除主题的所有观察者的回调事件
        removeAll: function(topic) {
            if (topics.hasOwnProperty(topic)) {
                topics[topic] = [];
            }
        }
    };
})();
```


## 手写一个 jsonp
```js
function jsonp(url, params, callback) {
    // 判断是否含有参数
    let queryString = url.indexOf("?") === -1 ? "?" : "&";

    // 添加参数
    for (var k in params) {
        if (params.hasOwnProperty(k)) {
            queryString += k + "=" + params[k] + "&";
        }
    }

    // 处理回调函数名
    let random = Math.random()
        .toString()
        .replace(".", ""),
        callbackName = "myJsonp" + random;

    // 添加回调函数
    queryString += "callback=" + callbackName;

    // 构建请求
    let scriptNode = document.createElement("script");
    scriptNode.src = url + queryString;

    window[callbackName] = function() {
        // 调用回调函数
        callback(...arguments);

        // 删除这个引入的脚本
        document.getElementsByTagName("head")[0].removeChild(scriptNode);
    };

    // 发起请求
    document.getElementsByTagName("head")[0].appendChild(scriptNode);
}
```


## 谈谈你对 webpack 的看法
webpack 的主要原理是，它将所有的资源都看成是一个模块，并且把页面逻辑当作一个整体，通过一个给定的入口文件，webpack 从这个文件开始，找到所有的依赖文件，将各个依赖文件模块通过 loader 和 plugins 处理后，然后打包在一起，最后输出一个浏览器可识别的 JS 文件。

Webpack 具有四个核心的概念，分别是 Entry（入口）、Output（输出）、loader 和 Plugins（插件）。
- Entry 是 webpack 的入口起点，它指示 webpack 应该从哪个模块开始着手，来作为其构建内部依赖图的开始。
- Output 属性告诉 webpack 在哪里输出它所创建的打包文件，也可指定打包文件的名称，默认位置为 ./dist。
- loader 可以理解为 webpack 的编译器，它使得 webpack 可以处理一些非 JavaScript 文件。在对 loader 进行配置的时候，test 属性，标志有哪些后缀的文件应该被处理，是一个正则表达式。use 属性，指定 test 类型的文件应该使用哪个 loader 进行预处理。常用的 loader 有 css-loader、style-loader 等。
- 插件可以用于执行范围更广的任务，包括打包、优化、压缩、搭建服务器等等，要使用一个插件，一般是先使用 npm 包管理器进行安装，然后在配置文件中引入，最后将其实例化后传递给 plugins 数组属性。

使用 webpack 的确能够提供我们对于项目的管理，但是它的缺点就是调试和配置起来太麻烦了。但现在 webpack4.0 的免配置一定程度上解决了这个问题。但是我感觉就是对我来说，就是一个黑盒，很多时候出现了问题，没有办法很好的定位。