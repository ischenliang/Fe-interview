# 面试经历记录
> 面试官上午好，我叫陈亮，今天来应聘贵公司的web前端开发岗位，我从事前端开发两年多，有两年的Vue开发经验，目前还在现在这家公司办理离职手续中，从2020年4月来到这家公司至今，已有一年半时间，在这家公司主要从事后台管理系统，门户网站等项目开发，我平时也有关注vue生态系统，然后也会逛一些像掘金、csdn、微信公众号之类的技术社区丰富自己的技术，，并且自己也独立开发了个人博客系统和个人信息管理系统，记录自己在工作中的一些工作总结和学习心得。对待工作认真负责，具有较好的抗压能力。学习方面具有较好的学习能力，对新技术会充满好奇心。性格方面还是比较外向，在刚开始不熟悉时可能会必现出内向，但是在熟悉之后就会发现我是一个性格外向的男孩儿。以上就是我的自我介绍，谢谢。


## 1、2021年第一场面试
由于该公司主要是用的react，所以没有问多少实际相关的问题。


## 2、2021年第二场面试
面试询问问题:
1. 微信小程序登录认证过程
> https://blog.csdn.net/weixin_51052779/article/details/119147180
https://www.cnblogs.com/cpy-648412294/p/14949296.html
https://blog.csdn.net/qq_43576866/article/details/113126676
https://www.cnblogs.com/nanyang520/p/12661104.html

2. 什么是闭包，闭包里的变量和普通变量的区别
3. js中的几种继承方式
4. 深拷贝和浅拷贝的区别以及手写深拷贝代码
5. 数组去重的几种方式
6. 输入url后发生了什么
7. 两个客户端一个服务端，如何在连接http协议后将数据返回给指定客户端
8. http和tcp的关系
9. vue组件之间的通信方式
10. 使用TypeScript的好处
11. 同一个父组件，然后孙子组件和孙子组件之间的通信方式
12. 你是如何理解同步和异步的
13. 平时使用的异步操作方式
14. 你还有什么可以展示的，我觉得可以展示echarts大数据平台、地图相关的开发经验、使用vue3来进行游戏开发、XMLHTTPRequest封装ajax以及实现了模仿axios实现了拦截器功能
15. 单例模型
16. 谈谈你对模块化的理解
17. 说说你对原型链的理解
18. 说说浏览器存储的几种方式，并且说明他们之间的区别
19. 如何封装高效的组件
20. `==`和`===`的区别

### 2.1、微信小程序登录认证过程
https://www.cnblogs.com/zwh0910/p/13977278.html
https://www.likecs.com/show-217845.html
https://blog.csdn.net/dwb123456123456/article/details/84251932

### 2.4、深拷贝和浅拷贝的区别以及手写深拷贝代码
如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。
#### 实现深拷贝的代码
1. 使用递归去复制所有层级的属性
```js
function depClone (target) {
  let result = Array.isArray(target) ? [] : {}
  // 这里就不用单独去判断是否为数组了，因为是数组也可以使用for ... in循环
  for (let key in target) {
    if (typeof target[key] === 'object') {
      result[key] = depClone(target[key])
    } else {
      result[key] = target[key]
    }
  }
  return result
}

/**
 * 对象的深拷贝测试
 */
let obj = {
  name: 'zhangsan',
  age: 23
}
let res = depClone(obj)
console.log(res) // { name: 'zhangsan', age: 23 }
obj.gender = '123'
console.log(res) // { name: 'zhangsan', age: 23 }

/**
 * 数组的深拷贝测试
 */
let arr = [1, 2, 3]
let res1 = depClone(arr)
console.log(res1) // [ 1, 2, 3 ]
arr.push(3)
console.log(res1) // [ 1, 2, 3 ]
```
2. 使用`JSON.parse`和`JSON.stringify()`
```js
let obj = { name: '张三', age: 23 }
let target = JSON.parse(JSON.stringify(obj))
```

### 2.5、数组去重的几种方式
#### 普通数组去重
```js
// ES5
function unique(arr) {
  return arr.filter((current, index, array) => {
    return array.indexOf(current) === index
  })
}
console.log(unique([1, 2, 1, 3, 4, 5, 3])) // [1, 2, 3, 4, 5]

// ES6
const arr = [1, 2, 1, 3, 4, 5, 3]
console.log([...new Set(arr)]) // [1, 2, 3, 4, 5]
console.log(Array.from(new Set(arr))) // [1, 2, 3, 4, 5]
```

#### 对象数组去重
```js
// 方式一
function unique(arr) {
  return arr.reduce((total, item) => {
    if (!(total.find(el => el.key === item.key && el.value === item.value))) {
      total.push(item)
    }
    return total
  }, [])
}

// 方式二：只判断某一个属性来去重，而不是所有属性判断
function unique(arr) {
  var obj = {}
  return arr.reduce((total, item) => {
    if (!obj[item.key]) {
      obj[item.key] = true
      total.push(item)
    }
    return total
  }, [])
}
```

### 2.6、输入url后发生了什么
大致可以分为如下7步：
- 输入网址；
- 发送到DNS服务器，并获取域名对应的web服务器对应的ip地址；
- 与web服务器建立TCP连接；
- 浏览器向web服务器发送http请求；
- web服务器响应请求，并返回指定url的数据（或错误信息，或重定向的新的url地址）；
- 浏览器下载web服务器返回的数据及解析html源文件；
- 生成DOM树，解析css和js，渲染页面，直至显示完成；

### 2.7、http协议中服务端发送response信息到指定客户端
参考：https://blog.csdn.net/huo2007201019/article/details/7589560
https://bbs.csdn.net/topics/390556202


### 2.8、TCP/IP的分为几大层
TCP/IP协议分为4个层次，自上而下依次为应用层、传输层、网络层、网络接口层。
各层的功能如下：
1、应用层的功能为对客户发出的一个请求，服务器作出响应并提供相应的服务。
2、传输层的功能为通信双方的主机提供端到端的服务，传输层对信息流具有调节作用，提供可靠性传输，确保数据到达无误。
3、网络层功能为进行网络互连，根据网间报文IP地址，从一个网络通过路由器传到另一网络。
4、网络接口层负责接收IP数据报，并负责把这些数据报发送到指定网络上。


### 2.9、http和tcp的关系
http协议是应用层协议，主要是解决如何包装数据。而tcp协议是传输层协议，主要解决数据如何在网络中传输。
通俗点说，http的任务是与服务器交换信息，它不管怎么连到服务器和保证数据正确的事情。而tcp的任务是保证连接的可靠，它只管连接，它不管连接后要传什么数据。http协议不一定要建在TCP的连接上的。
参考：https://www.cnblogs.com/baizhanshi/p/8482612.html


### 2.11、使用TypeScript的好处
- typeScript支持es6规范
- 支持类型检查
- 语法智能提示
- 方便重构
- TypeScript 增加了静态类型、类、模块、接口和类型注解，可用于开发大型的应用，TypeScript可以实现类，接口，枚举，泛型，方法重载等，用简洁的语法丰富了JavaScript的使用。
- 模块化，利用TypeScript的关键词module，可以达到类似于命名空间的效果，而export可以控制是否被外部访问


### 2.12、你是如何理解同步和异步的
**同步**
必须按照给定的顺序一件一件事做,等前一件做完了才能做下一件事。

**异步**
可以改变程序正常执行顺序的操作就可以看成是异步操作。
最常见的异步是`setTimeout`和`setInterval`函数。

**总结**
同步在一定程度上可以看做是单线程，这个线程请求一个方法后就待这个方法给他回复，否则他不往下执行（死心眼）。 
异步在一定程度上可以看做是多线程的（废话，一个线程怎么叫异步），请求一个方法后，就不管了，继续执行其他的方法。 
https://www.cnblogs.com/chaoran/p/4790806.html
https://blog.csdn.net/qq_22855325/article/details/72958345


### 2.14、平时使用的异步操作方式
https://www.ruanyifeng.com/blog/2012/12/asynchronous%EF%BC%BFjavascript.html
https://www.cnblogs.com/goloving/p/9393541.html
**回调函数**
是异步编程最基本的方法。

**事件监听**
是采用事件驱动模式。任务的执行不取决于代码的顺序，而取决于某个事件是否发生。

**发布/订阅**
存在一个"信号中心"，某个任务执行完成，就向信号中心"发布"（publish）一个信号，其他任务可以向信号中心"订阅"（subscribe）这个信号，从而知道什么时候自己可以开始执行。这就叫做"发布/订阅模式"（publish-subscribe pattern），又称"观察者模式"（observer pattern）。

**Promise对象或者 async await**
思想是，每一个异步任务返回一个Promise对象，该对象有一个then方法，允许指定回调函数。


### 2.15、你还有什么可以展示的吗
我觉得可以展示echarts大数据平台、地图相关的开发经验、使用vue3来进行游戏开发、XMLHTTPRequest封装ajax以及实现了模仿axios实现了拦截器功能


### 2.16、单例模式
单例模式就是在系统中保存一个实例，就是一个全局变量，在团队开发中，为了实现一些相似的功能，比如不同页面之间的表单验证，可能需求是不一样的，但是呢命名可能一样，这时就会产生冲突，这时候单例模式就能很好的解决这个问题。
- 一个实例只生产一次
- 保证一个类仅有一个实例，并提供一个访问它的全局访问点

https://www.jb51.net/article/212634.htm
https://www.cnblogs.com/xiaoxu-xmy/p/13641547.html
https://www.cnblogs.com/zhanglongke/p/10603185.html
https://blog.csdn.net/zhangjing0320/article/details/112472548



### 2.17、谈谈你对模块化的理解
**题目点评**
主要考察你是否有做过比较复杂、庞大的项目，是否具备一定的编程思想。随着前端技术的发展，前端编写的代码量也越来越大，就需要对代码有很好的管理。目前比较好的开发语言就是OOP（面向对象语言）编程语言，例如java语言，C#语言。从JavaScript新的版本来看，要求JavaScript具有封装、继承、多态这样的优点需求越来越明显。这道题属于编程思想上范畴。

#### 什么是模块化
所谓的模块化开发就是封装细节，提供使用接口，彼此之间互不影响，每个模块都是实现某一特定的功能。模块化开发的基础就是函数
**第一种：使用函数封装**
```js
function func1(){
     //...
}
function func2(){
     //...
}
```
上面的函数func1()和func2()，组成一个模块。使用的时候，直接调用就行了。这种做法的缺点很明显：”污染”了全局变量，无法保证不与其他模块发生变量名冲突，而且模块成员之间看不出直接关系。

**第二种：使用对象封装**
为了解决上面的缺点，可以把模块写成一个对象，所有的模块成员都放到这个对象里面。
```js
var obj={
    age:0,
    func1:function(){
        //...
    },
    func2:function(){
        //...
    }
}
```
上面的函数func1()和func2(),都封装在obj对象里。使用的时候，就是调用这个对象的属性。
```js
obj.func1();
```
这样做也是有问题的，变量可以被外面随意改变而导致不安全。比如，年龄被修改成负数。
```js
obj.age=-100;
```
如何保证对象的属性不被访问了？

**第三种：立即执行函数**
使用”立即执行函数”，可以达到不暴露私有成员的目的。这个也是闭包处理的一种方式。
```js
var obj=(function(){
    var _age=0;
    var func1=function(){
       //...
    };
    var func2=funciton(){
      //...
    };
    return {
         m1:func1,
         m2:func2
    }
})();
```
使用上面的写法，外部代码无法读取内部的age变量。
```js
console.log(obj.age);//undefined
```
https://blog.csdn.net/water_v/article/details/78314672


### 2.18、说说你对原型链的理解
- js里所有的对象都有proto属性(对象，函数)，指向构造该对象的构造函数的原型。
- 只有函数function才具有prototype属性。这个属性是一个指针，指向一个对象，这个对象的用途就是包含所有实例共享的属性和方法（我们把这个对象叫做原型对象）。原型对象也有一个属性，叫做constructor，这个属性包含了一个指针，指回原构造函数。

三句话总结原型和原型链：
> 1.prototype是函数的原型对象，即prototype是一个对象，它会被对应的__proto__引用。
2.要知道自己的__proto__引用了哪个prototype，只需要看看是哪个构造函数构造了你，那你的__proto__就是那个构造函数的prototype。
3.所有的构造函数的原型链最后都会引用Object构造函数的原型，即可以理解Object构造函数的原型是所有原型链的最底层，即Object.prototype.__proto===null

https://blog.csdn.net/z591102/article/details/106078907


## 3、2021年第三场面试
面试询问问题:
1. 对vue生命周期的理解
2. 堆和栈的理解
3. 是否能开发一款小型的vue框架或者脚手架
4. 对业务的理解
5. 开发模式是怎么样的
6. 工作上的一些技术难点，比如动态路由和路由重置，ajax的拦截器，arcgis地图展示，拖拽式仪表盘布局，el-tree的局部刷新，tags标签页，elementui换肤，元数据jsonschema的使用,keep-alive对三级路由无缓存
7. 对未来的规划或者说来到咱们公司后如何提升自己？
8. Javascript中的数据类型
9. undefined、null的区别，以及他们的值分别是什么？

### 3.1、对vue生命周期的理解
在Vue中实例从创建到销毁的过程就是生命周期，即指从创建、初始化数据、编译模板、挂载Dom→渲染、更新→渲染、卸载等一系列过程。
**生命周期有哪些**
Vue生命周期总共可以分为8个阶段：创建前后, 载入前后,更新前后,销毁前销毁后，以及一些特殊场景的生命周期：
- beforeCreate：组件实例被创建之初
- created：组件实例已经完全创建
- beforeMount：组件挂载之前
- mounted：组件挂载到实例上去之后
- beforeUpdate：组件数据发生变化，更新之前
- updated：数据数据更新之后
- beforeDestroy：组件实例销毁之前
- destroyed：组件实例销毁之后
- activated：keep-alive 缓存的组件激活时
- deactivated：keep-alive 缓存的组件停用时调用
- errorCaptured：捕获一个来自子孙组件的错误时被调用

[Vue生命周期解释图](https://gitee.com/itchenliang/img/raw/master/img/20210912170129.webp)
具体分析：
**beforeCreate -> created**
- 初始化vue实例，进行数据观测

**created**
- 完成数据观测，属性与方法的运算，watch、event事件回调的配置
- 可调用methods中的方法，访问和修改data数据触发响应式渲染dom，可通过computed和watch完成数据计算
- 此时vm.$el 并没有被创建

**created -> beforeMount**
- 判断是否存在el选项，若不存在则停止编译，直到调用vm.$mount(el)才会继续编译
- 优先级： render > template > outerHTML
- vm.el获取到的是挂载DOM的

**beforeMount**
- 在此阶段可获取到vm.el
- 此阶段vm.el虽已完成DOM初始化，但并未挂载在el选项上

**beforeMount -> mounted**
- 此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM

**mounted**
- vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM

**beforeUpdate**
- 更新的数据必须是被渲染在模板上的（el、template、render之一）
- 此时view层还未更新
- 若在beforeUpdate中再次修改数据，不会再次触发更新方法

**updated**
- 完成view层的更新
- 若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）

**beforeDestroy**
- 实例被销毁前调用，此时实例属性与方法仍可访问

**destroyed**
- 完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器
- 并不能清除DOM，仅仅销毁实例

**题外话：数据请求在created和mouted的区别**
created是在组件实例一旦创建完成的时候立刻调用，这时候页面dom节点并未生成
mounted是在页面dom节点渲染完毕之后就立刻执行的
触发时机上created是比mounted要更早的
两者相同点：都能拿到实例对象的属性和方法
讨论这个问题本质就是触发的时机，放在mounted请求有可能导致页面闪动（页面dom结构已经生成），但如果在页面加载前完成则不会出现此情况
建议：放在create生命周期当中



### 3.2、对Javascript的堆和栈的理解
**栈(stack)**：是栈内存的简称，栈是自动分配内存，内存大小相对固定，并由系统自动释放；栈内存，线性结构，后进先出，便于管理。
**堆(heap)**：是堆内存的简称，堆是动态分配内存，内存大小不定，也不会自动释放；堆内存，混沌结构，杂乱无章，方便存储和开辟内存空间。
- 栈（stack）中主要存放一些基本类型（Undefined、Null、Boolean、Number 和 String）的变量和对象的引用（基本类型值在内存中占据固定大小的空间，因此被保存在栈内存中），其优势是存取速度比堆要快，并且栈内的数据可以共享，但缺点是存在栈中的数据大小与生存期必须是确定的，缺乏灵活性；
- 堆（heap）用于复杂数据类型（引用类型）分配空间，例如数组对象、object对象（引用类型的值通常大小不固定，所以被存储在堆内存中）；它是运行时动态分配内存的，因此存取速度较慢；

**栈的使用规则**
栈有一个很重要的特殊性，就是存在栈中的数据可以共享。
例如：下面的代码定义两个变量，变量的值都是数字类型
```js
var a = 3
var b = 3
```
JavaScript解析器先处理 var a=3;,首先会在栈中创建一个变量为a引用，然后查找栈中是否有3这个值，如果没有找到，就将3存放进来，然后将a指向3。接着处理 var b=3;,在创建为b的引用变量后，查找栈中是否有3这个值，因为此时栈中已经存在了3，便将b直接指向3。这样，就出现了a与b同时指向3的情况。此时，如果再令a=4，那么JavaScript解释引擎会重新搜查栈中是否有4这个值，如果没有，则将4存放进来，并令a指向4；如果已经有了，则直接将a指向这个地址。因此a值的改变不会影响到b的值。

**堆的使用规则**
通过Array来看一下堆的行为，例如：下面的代码：
```js
var name = "jack"
var age = 18
var gender = "男"
var arr =[name,age,gender]
var newArr = arr
```
当创建数组时，就会在堆内存创建一个数组对象，并且在栈内存中创建一个对数组的引用（即引用类型在栈内存中存放的只是该对象的访问地址，而在堆内存中为这个值分配空间存储）。变量name、age、gender为基本数据类型，它们的值直接存放在栈中；newArr、arr为复合数据类型（引用类型），他们的引用变量存放在栈中，指向于存放在堆中的实际对象。
注意，newArr的值等于变量引用arr，所以它也是复合数据类型（引用类型）。此时，如果更改变量name、age、gender的值，那么其实是更改栈中的值；如果更改newArr或arr的值，那么其实是更该堆中的实际对象，因此，对两个变量引用都会发生作用（因为从一个变量向另一个变量复制引用类型的值，复制的其实是指针，因此两个变量最终都指向同一个对象）。例如，首先更改newArr的值，然后看arr的值，代码如下：
```js
console.log(arr[1])// 返回 18
newArr[1] = 22
console.log(arr[1])// 返回 22
```
同样，首现更改arr的值，然后看newArr的值，代码如下：
```js
console.log(newArr[0])// 返回 "jack"
arr[0] = 'rose'
console.log(newArr[0])// 返回 "rose"
```
JavaScript堆不需要程序代码来显示地释放，因为堆是由自动的垃圾回收来负责的，每种浏览器中的JavaScript解释引擎有不同的自动回收方式，但一个最基本的原则是：如果栈中不存在对堆中某个对象的引用，那么就认为该对象已经不再需要，在垃圾回收时就会清除该对象占用的内存空间。因此，在不需要时应该将对对象的引用释放掉（解除引用），以利于垃圾回收，这样就可以提高程序的性能。释放对对象的引用最常用的方法就是为其赋值为null，这种做法适用于大多数全局变量和全局对象的属性。局部变量会在他们离开执行环境时自动被解除引用，例如下面代码将newArray赋值为null：
```js
newArray = null
```
**注意**：解除一个值的引用并不意味着自动回收该值所占用的内存。解除引用的真正作用是让值脱离执行环境，以便垃圾收集器下次运行时将其回收。

参考：
https://blog.csdn.net/weixin_43236850/article/details/103670990
https://www.cnblogs.com/zhengpan/p/9406607.html


### 3.8、Javascript中的数据类型
ECMAScript包括两个不同类型的值：**基本数据类型**和**引用数据类型**。
**基本数据类型**指的是简单的数据段，引用数据类型指的是有多个值构成的对象。
当我们把变量赋值给一个变量时，解析器首先要确认的就是这个值是基本类型值还是引用类型值。

**基本数据类型**
Number、String 、Boolean、Null和Undefined。基本数据类型是按值访问的，因为可以直接操作保存在变量中的实际值。
```js
var a = 10
var b = a
b = 20
console.log(a) // 10值
```
上面，b获取的是a值的一份拷贝，虽然，两个变量的值相等，但是两个变量保存了两个不同的基本数据类型值。
b只是保存了a复制的一个副本。所以，b的改变，对a没有影响。
基本数据类型赋值的过程：
![](https://gitee.com/itchenliang/img/raw/master/img/20210912170920.jpg)

**引用数据类型**
对象类型Object type，比如：Object 、Array 、Function 、Data等
javascript的引用数据类型是保存在堆内存中的对象。
引用类型数据在栈内存中保存的实际上是对象在堆内存中的引用地址。通过这个引用地址可以快速查找到保存中堆内存中的对象。
```js
var obj1 = new Object()
var obj2 = obj1
obj2.name = "我有名字了"
console.log(obj1.name) // 我有名字了
```
说明这两个引用数据类型指向了同一个堆内存对象。obj1赋值给onj2，实际上这个堆内存对象在栈内存的引用地址复制了一份给了obj2，但是实际上他们共同指向了同一个堆内存对象。**实际上改变的是堆内存对象**。
引用数据类型赋值过程：
![](https://gitee.com/itchenliang/img/raw/master/img/20210912171408.png)

参考：
https://www.cnblogs.com/cxying93/p/6106469.html


### 3.9、undefined、null的区别，以及他们的值分别是什么？
#### Undefined
Undefined 类型只有一个值，即 undefined。
undefined：未定义的值。在声明一个变量后，未初始化的变量会自动被赋予undefined的值。
它一般会在4中场景中出现：
**1.声明一个变量，但是没有赋值**
```js
var foo;
console.log(foo); // undefined
```
**2.访问对象上不存在的属性或者未定义的变量**
```js
var obj = {}
console.log(obj.name)  // undefined
```
**3.函数定义了形参，但没有传递实参**
```js
//函数定义了形参 a
function fn(a) {
    console.log(a); // undefined
}
fn(); //未传递实参
```
**4.typeof未初始化和未声明的值**
```js
var message;                // 这个变量声明之后默认取得了 undefined 值   
console.log(typeof message) // undefined
console.log(typeof age)     // undefined
```

#### null
Null 类型是第二个只有一个值的数据类型，即 null
从逻辑角度来看，**null值表示一个空对象指针**，要意在保存对象的变量还没有真正保存对象。而这也正是使用 typeof 操作符检测 null 值时会返回"object"的原因。
```js
var data = null;
console.log(typeof data); // "object"
```
1、手动设置变量的值或者对象某一个属性值为null （在作用域中不再需要使用某个对象时，把null赋值给那个变量解除引用，以释放内存）
2、在DOM元素获取中，如果没有获取到指定的元素对象，结果一般是null。
```js
var d = document.getElementById("d");
console.log(d); // 当没有id为"d"的标签时返回null
```

#### 区别
1. 数据类型不一样
```js
console.log(typeof null) // object
console.log(typeof undefined) // undefined
```
2. null和undefined 两者相等，但是当两者做全等比较时，两者又不等。（因为它们的数据类型不一样）
```js
console.log(null == undefined) // true
console.log(null === undefined) // false
```
3. 转化成数字不同
```js
console.log(Number(null)) // 0
console.log(Number(undefined)) // NaN

console.log(22+null) // 22
console.log(22+undefined) // NaN
```
4. null代表"空"，代表空指针；undefined是定义了没有赋值
```js
var a;
console.log(a); // undefined

var b=null;
console.log(b) // null
```


## 4、2021年第四场面试
### 4.1、第一面
1. 个人介绍
2. 堆、栈、队列和哈希表的区别
3. 三下乡的一个经历，参考：https://www.xuexila.com/fwn/xindetihuifwn/c627042.html
4. 数据结构相关的面试题
5. 计算机网络相关的面试题

### 4.2、第二面
1. npm、cnpm、yarn的区别
https://blog.csdn.net/rolinabc/article/details/115719635
https://blog.csdn.net/weixin_53430951/article/details/111132595
2. uniapp中的`package.json`文件的作用
3. uniapp中应用生命周期、页面生命周期、组件生命周期的区别，其实就是需要对[uniapp框架](https://uniapp.dcloud.io/collocation/pages)了解
4. js中的事件流，从事件触发做了什么
https://www.cnblogs.com/birdy-silhouette/p/14984043.html
https://www.cnblogs.com/biben/p/13652628.html

5. generator的使用
6. 正则的贪婪模式
7. 数组常用的过滤方法
8. ES中常用的异步操作方式
9. node中和路径相关的api
10. koa和express
11. node中获取文件的绝对路径
12. css中的伪类和伪元素
13. 使用伪类实现给除了最后一个元素以外的元素设置边框
14. 如何在uniapp中内嵌h5页面
15. grid布局和flex布局
16. 说下this的指向常见的几种场景，箭头函数的this指向
17. bind、call、apply的区别
18. 常见性能优化方式
19. vue组件的通信方式
20. vue跨级通信方式
21. vue中mixin的理解
22. vue中父子组件的生命周期执行顺序
23. vue中created钩子函数中做了什么操作
24. vue中$refs需要在哪个钩子函数中才能获取
25. 正则中`()`和`[]`以及`{}`的区别
26. 通用事件处理
27. vue中数据改变了，单页面没有改变，可能出现的问题是什么
28. 常用的数据库有哪些
29. 对数据库的管道的使用方式
30. Java中的集合有哪些
31. Java中ArrayList的底层实现
32. .....


总结，下次电话面试时，可以说明自己的个人实力，当讨论到实际经验的话，可以说清楚这边的前端开发是自己一个人，展现个人独立开发的能力。

### 4.2.1、堆、栈、队列和哈希表的区别
#### 栈
又名堆栈，它是一种运算受限的线性表。限定仅在表位进行插入和删除操作的线性表。
特点：**先进后出，后进先出**

#### 队列
只允许在表的一端进行入队，在另一端进行出队操作。在队列中，允许插入的一端叫队尾，允许删除的一端叫对头，即入队只能从队尾入，出队只能从对头出。
特点：**先进先出**

#### 哈希表
又称散列表，哈希表存储的基本思想：以数据的每个记录的关键字k为自变量，通过一种函数H(k)计算出函数值，把这个值解释为一块连续存储空间(即数组空间)的单元地址(即下标)，将该记录存储到这个单元中。在此称该函数H为哈希函数或者散列函数。按这种方法建立的表称为哈希表。
哈希实现步骤：
1. 通过使用哈希函数将元素转换为整数，此元素可用作存储原始元素的索引，该元素属于哈希表。
2. 元素存储在哈希表中，可以使用哈希键快速检索它。

#### 堆
堆是一种经过排序的树形数据结构。，每个节点都有一个值。通常我们所说的堆的数据结构，是指**二叉堆**。堆的特点是根结点的值最小（或最大），且根结点的两个子树也是一个堆。由于堆的这个特性，常用来实现优先队列，堆的存取是随意，这就如同我们在图书馆的书架上取书，虽然书的摆放是有顺序的，但是我们想取任意一本时不必像栈一样，先取出前面所有的书，书架这种机制不同于箱子，我们可以直接取出我们想要的数。


### 4.2.2、npm、cnpm、yarn的区别
npm是按照队列执行每一个包，也就是必须等到当前包安装完成之后才能继续后面的安装。而yarn是并行执行所有任务，提高了性能；
yarn使用本地缓存,与npm不同的是，yarn无需互联网连接就能安装本地缓存的依赖项，它提供了离线模式.；
离线模式：如果之前已经安装过一个软件包，用yarn再次安装时会从缓存中获取，就不用像npm那样再从网络下载了；
输出比较简洁,不像npm那样冗余；
多注册来源处理：所有的依赖包，不管他被不同的库间接关联引用多少次，安装这个包时，只会从一个注册来源去装；

### 4.2.3、uniapp中的`package.json`文件的作用
通过在package.json文件中增加`uni-app`扩展节点，可实现自定义条件编译平台。


### 4.2.4、uniapp中应用生命周期、页面生命周期、组件生命周期的区别
**应用生命周期**
- onLaunch：当uni-app 初始化完成时触发（全局只触发一次）
- onShow：当 uni-app 启动，或从后台进入前台显示
- onHide：当 uni-app 从前台进入后台
- onError：当 uni-app 报错时触发
- onUniNViewMessage：对 nvue 页面发送的数据进行监听
- onPageNotFound：页面不存在监听函数

应用生命周期仅可在`App.vue`中监听，在其它页面监听无效。

**页面生命周期**
- onInit：监听页面初始化，其参数同 onLoad 参数，为上个页面传递的数据，参数类型为 Object（用于页面传参），触发时机早于 onLoad
- onLoad：监听页面加载，其参数为上个页面传递的数据，参数类型为 Object（用于页面传参）
- onShow：监听页面显示。页面每次出现在屏幕上都触发，包括从下级页面点返回露出当前页面
- onReady：监听页面初次渲染完成。注意如果渲染速度快，会在页面进入动画完成前触发
- onHide：监听页面隐藏
- onUnload：监听页面卸载
- onResize：监听窗口尺寸变化
- onPullDownRefresh：监听用户下拉动作，一般用于下拉刷新
- onReachBottom：页面滚动到底部的事件（不是scroll-view滚到底），常用于下拉下一页数据。具体见下方注意事项

**组件生命周期**
uni-app组件支持的生命周期，与vue标准组件的生命周期相同。


### 4.2.5、js中的事件流，从事件触发做了什么
每个事件发生时，都会有一个触发并执行的过程，也就是事件的传播过程，我们称为事件流；简单来说，事件流就是事件从发生到执行结束的流程。
DOM 事件流分为3个阶段：
- 捕获阶段：事件开始由顶层元素触发，然后逐级向下传播，直到目标元素，依次执行其身上邦定的事件；
- 目标阶段：触发当前自身的事件
- 冒泡阶段：事件由目标元素先接收，然后逐级向上传播，达到最顶层元素，依次执行其身上绑定的事件。
