参考：❓

# JavaScript基础面试题汇总
## 1、document load 和 document ready 的区别
DOM文档解析：
1. 解析html结构
2. 加载脚本和样式文件
3. 解析并执行脚本
4. 构造html的DOM模型 `ready`
5. 加载图片等外部资源文件
6. 页面加载完毕`load`

页面加载完成有两种事件
- `load`是当页面所有资源全部加载完成后（包括DOM文档树，css文件，js文件，图片资源等），执行一个函数，load方法就是`onload`事件。<br>
    缺点：如果图片资源较多，加载时间较长，onload后等待执行的函数需要等待较长时间，所以一些效果可能受到影响<br>
    代码形式：
    ```js
    //document load
    $(document).load(function(){
      ...code...
    })
    ```
- `$(document).ready()`是当DOM文档树加载完成后执行一个函数 （不包含图片，css等）所以会比load较快执行，在原生的jS中不包括`ready()`这个方法，Jquery才有，jquery中有`$().ready(function)`。
    代码形式：
    ```js
    //document ready
    $(document).ready(function(){
        ...code...
    })
    //document ready 简写
    $(function(){
        ...code...
    })
    ```

**总结**：如果页面中要是没有图片之类的媒体文件的话ready与load是差不多的，但是页面中有文件就不一样了，所以还是推荐大家在工作中用ready。
 


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


## 6、怎样添加、移除、移动、复制、创建和查找节点？
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


## 8、require 与 import 的区别
node编程中最重要的思想就是模块化，import 和 require 都是被模块化所使用。在 ES6 当中，用 export 导出接口，用 import 引入模块。但是在 node 模块中，使用module.exports导出接口，使用 require 引入模块。
### 遵循规范不同
- require 是 CommonJS/AMD 规范；
- import 是 ESMAScript6+ 规范；

### 遵循时间不同
- require 是运行时加载，由于编译时加载，所以import会提升到整个模块的头部；
- import 是编译时加载；

### 本质不同
- require 是赋值过程。module.exports后面的内容是什么，require的结果就是什么，比如对象、数字、字符串、函数等，然后再把require的结果赋值给某个变量，它相当于module.exports的传送门；
- import 是解构过程，但是目前所有的引擎都还没有实现import，我们在node中使用babel支持ES6，也仅仅是将ES6转码为ES5再执行，import语法会被转码为require


## 9、JavaScript 对象的几种创建方式
- 第一种：Object 构造函数创建
  ```js
  var Person = new Object();
  Person.name = "Nike";
  Person.age = 29;
  ```
  这行代码创建了 Object 引用类型的一个新实例，然后把实例保存在变量 Person 中。
- 第二种：使用对象字面量表示法
  ```js
  var Person = {}; // 相当于 var Person = new Object();
  var Person = {
    name: 'Nike';
    age: 29;
  }
  ```
  对象字面量是对象定义的一种简写形式，目的在于简化创建包含大量属性的对象的过程。也就是说，第一种和第二种方式创建对象的方法其实都是一样的，只是写法上的区别不同
- 第三种：使用工厂模式创建对象<br>
  第一种，第二种方法的缺点所在：它们都是用了同一个接口创建很多对象，会产生大量的重复代码，就是如果你有 100 个对象，那你要输入 100 次很多相同的代码。
  ```js
  function createPerson(name, age, job) {
    var o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
      alert(this.name);
    };
    return o;
  }
  var person1 = createPerson("Nike", 29, "teacher");
  var person2 = createPerson("Arvin", 20, "student");
  ```
- 第四种: 使用构造函数创建对象<br>
  在使用工厂模式创建对象的时候，我们都可以注意到，在 createPerson 函数中，返回的是一个对象。那么我们就无法判断返回的对象究竟是一个什么样的类型。
  ```js
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        alert(this.name);
    };
  }
  var person1 = new Person("Nike", 29, "teacher");
  var person2 = new Person("Arvin", 20, "student");
  ```
  对比工厂模式，我们可以发现以下区别：
    - 没有显示地创建对象
    - 直接将属性和方法赋给了 this 对象
    - 没有 return 语句
    - 终于可以识别的对象的类型。对于检测对象类型，我们应该使用 instanceof 操作符，我们来进行自主检测：
      ```js
      alert(person1 instanceof Object); //ture
      alert(person1 instanceof Person); //ture
      alert(person2 instanceof Object); //ture
      alert(person2 instanceof Object); //ture
      ```
      同时我们也应该明白，按照惯例，构造函数始终要应该以一个大写字母开头，而非构造函数则应该以一个小写字母开头。
- 第五种：原型创建对象模式<br>
  第四种构造函数确实挺好用的，但是它也有它的**缺点**：就是每个方法都要在每个实例上重新创建一遍，方法指的就是我们在对象里面定义的函数。如果方法的数量很多，就会占用很多不必要的内存。于是出现了第五种创建对象的方法。
  ```js
  function Person() {}
  Person.prototype.name = "Nike";
  Person.prototype.age = 20;
  Person.prototype.jbo = "teacher";
  Person.prototype.sayName = function() {
      alert(this.name);
  };
  var person1 = new Person();
  person1.sayName();
  ```
  使用原型创建对象的方式，可以让所有对象实例共享它所包含的属性和方法。如果是使用原型创建对象模式，请看下面代码：<br>
  ```js
  function Person() {}
    Person.prototype.name = "Nike";
    Person.prototype.age = 20;
    Person.prototype.jbo = "teacher";
    Person.prototype.sayName = function() {
        alert(this.name);
    };
    var person1 = new Person();
    var person2 = new Person();
    person1.name = "Greg";
    alert(person1.name); //'Greg' --来自实例
    alert(person2.name); //'Nike' --来自原型
  ```
  当为对象实例添加一个属性时，这个属性就会屏蔽原型对象中保存的同名属性。这时候我们就可以使用构造函数模式与原型模式结合的方式，构造函数模式用于定义实例属性，而原型模式用于定义方法和共享的属性
- 第六种：组合使用构造函数模式和原型模式
  ```js
  function Person(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
  }
  Person.prototype = {
    constructor: Person,
    sayName: function() {
      alert(this.name);
    };
  }
  var person1 = new Person('Nike', 20, 'teacher');
  ```


## 10、JavaScript 继承的方式和优缺点
js中的继承与其说是对象的继承，但更像是让函数的功能和用法的复用。首先定义一个父类：
```js
function Father (name) {
  this.name = name || '->father'
  this.sayName = function () {
    console.log(this.name)
  }
}
// 原型属性和方法
Father.prototype.age = 18;
Father.prototype.sayAge = function() {
  console.log(this.age)
}
```

### 原型链继承
将父类的实例作为子类的原型
**优点**
+ 纯粹的继承关系，实例是子类的实例，也是父类的实例
+ 父类新增原型方法、原型属性，子类都能访问到
+ 简单，易于实现

**缺点**
+ 可以在`Son`构造函数中，为`Son`实例增加实例属性。新增的属性和方法必须放在`new Father()`这样的语句之后执行
+ 无法实现多继承，因为原型一次只能被一个实例更改
+ 来自原型对象的所有属性被所有实例共享
+ 创建子类实例时，无法向父构造函数传参
```js
function Son (name) {
  // Father.call(this, name)
  this.name = name || '->son'
}
Son.prototype = new Father()
const son = new Son('son')
console.log(son.name) // son
son.sayAge() // 18
son.sayName() // son
console.log(son.age) // 18
console.log(son instanceof Father) // true
console.log(son instanceof Son) // true
```
缺点第一点测试
```js
function Son (name) {
  this.name = name || '->son'
}
Son.prototype.gender = 'male'
Son.prototype = new Father()
const son = new Son('son')
console.log(son.gender) // undefined

// 正确做法
function Son (name) {
  this.name = name || '->son'
}
Son.prototype = new Father()
Son.prototype.gender = 'male'
const son = new Son('son')
console.log(son.gender) // male
```

### 构造继承
复制父类的实例属性给子类
**优点**
+ 解决了原型链继承中子类实例共享父类引用属性的问题
+ 创建子类实例时，可以向父类传递参数
+ 可以实现多继承（call多个父类对象）

**缺点**
+ 实例并不是父类实例，只是子类的实例
+ 只能继承父类实例的属性和方法，不能继承其原型上的属性和方法
+ 无法实现函数复用，每个子类都有父类实例的副本，影响性能
```js
function Son (name, gender) {
  Father.call(this, name)
  this.gender = gender || 'male'
  this.sayGender = function () {
    console.log(this.gender)
  }
}
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son undefined male
son.sayName() // son
// son.sayAge() 抛出错误：TypeError: son.sayAge is not a function
son.sayGender() // male
console.log(son instanceof Father) // false
console.log(son instanceof Son) // true
```

### 实例继承
为父类实例添加新特征，作为子类实例返回
**优点**
+ 不限制调用方法，不管是new子类()还是子类()，返回的对象具有相同的效果

**缺点**
+ 实例是父类的实例，不是子类的实例
+ 不支持多继承
```js
function Son (name, gender) {
  const f = new Father()
  f.name = name
  f.gender = gender
  return f
}
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son 18 male
son.sayName() // son
son.sayAge() // 18
console.log(son instanceof Father) // true
console.log(son instanceof Son) // false
```

### 拷贝继承
对父类实例中的的方法与属性拷贝给子类的原型
**优点**
+ 支持多继承

**缺点**
+ 效率低，性能差，占用内存高（因为需要拷贝父类属性）
+ 无法获取父类不可枚举的方法（不可枚举的方法，不能使用`for-in`访问到)
```js
function Son (name, gender) {
  const f = new Father()
  for (var key in f) {
    Son.prototype[key] = f[key]
  }
  this.name = name
  this.gender = gender
}
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son 18 male
son.sayName() // son
son.sayAge() // 18
console.log(son instanceof Father) // false
console.log(son instanceof Son) // true
```
无法获取父类不可枚举的方法缺点演示
```js
class Father {
  constructor (name) {
    this.name = name || '->father'
  }
  sayName () {
    console.log(this.name)
  }
}
Father.prototype.age = 18
Father.prototype.sayAge = function () {
  console.log(this.age)
}
function Son (name, gender) {
  const f = new Father()
  for (var key in f) {
    console.log(key) // name age sayAge
    Son.prototype[key] = f[key]
  }
  this.name = name
  this.gender = gender
}
const son = new Son('son', 'male')
```
你会发现我们在class中定义的`sayName`方法并没有输出。

### 组合继承
通过调用父类构造，继承父类的属性并保留传参的优点，然后通过将父类实例作为子类原型，实现函数复用
这里其实就是**原型链继承 + 构造继承**
**优点**
+ 弥补了构造继承的缺点，现在既可以继承实例的属性和方法，也可以继承原型的属性和方法
+ 既是子类的实例，也是父类的实例
+ 不存在引用属性共享问题
+ 可传参
+ 函数可以复用

**缺点**
+ 调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了)
```js
function Son (name, gender) {
  Father.call(this, name)
  this.gender = gender
}
Son.prototype = new Father()
console.log(Son.prototype.constructor) // [Function: Father]
// 修复构造函数指向
Son.prototype.constructor = Son
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son 18 male
son.sayName() // son
son.sayAge() // 18
console.log(son instanceof Father) // true
console.log(son instanceof Son) // true
console.log(Son.prototype.constructor) // [Function: Son]
```

### 寄生组合继承
通过寄生方式，砍掉父类的实例属性，避免了组合继承生成两份实例的缺点
**优点**
+ 堪称完美

**缺点**
+ 实现起来较为复杂
```js
// 方式一
function Son (name, gender) {
  Father.call(this, name)
  this.gender = gender
}
;(function() {
  // 创建一个没有实例方法的类
  var None = function() {}
  None.prototype = Father.prototype
  // 将实例作为子类的原型
  Son.prototype = new None()
  // 修复构造函数指向
  Son.prototype.constructor = Son
})()
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son 18 male
son.sayName() // son
son.sayAge() // 18
console.log(son instanceof Father) // true
console.log(son instanceof Son) // true

// 方式二
function Son (name, gender) {
  Father.call(this, name)
  this.gender = gender
}
Son.prototype = Object.create(Father.prototype)
// 修复constructor的指向
Son.prototype.constructor = Son
Son.prototype.sayGender = function () {
  console.log(this.gender)
}
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son 18 male
son.sayName() // son
son.sayAge() // 18
console.log(son instanceof Father) // true
console.log(son instanceof Son) // true
```

### Class继承
使用`extends`表明继承自哪个父类，并且在子类构造函数中必须调用`super`
```js
class Son extends Father {
  constructor (name, gender) {
    super(name)
    this.gender = gender
  }
}
const son = new Son('son', 'male')
console.log(son.name, son.age, son.gender) // son 18 male
son.sayName() // son
son.sayAge() // 18
console.log(son instanceof Father) // true
console.log(son instanceof Son) // true
```


## 11、什么是原型链？
通过一个对象的`__proto__`可以找到它的原型对象，原型对象也是一个对象，就可以通过原型对象的`__proto__`，最后找到了我们的 `Object.prototype`, 从实例的原型对象开始一直到 `Object.prototype` 就是我们的原型链。
![2023021413594110.png](https://imgs.itchenliang.club/img/2023021413594110.png)
![202302141359533.png](https://imgs.itchenliang.club/img/202302141359533.png)


## 12、复杂数据类型如何转变为字符串
- 首先，会调用 valueOf 方法，如果方法的返回值是一个基本数据类型，就返回这个值，
- 如果调用 valueOf 方法之后的返回值仍旧是一个复杂数据类型，就会调用该对象的 toString 方法，
- 如果 toString 方法调用之后的返回值是一个基本数据类型，就返回这个值，
- 如果 toString 方法调用之后的返回值是一个复杂数据类型，就报一个错误。
```js
// 1;
var obj = {
  valueOf: function() {
    return 1;
  }
};
console.log(obj + ""); //'1'
// 2;
var obj = {
  valueOf: function() {
    return [1, 2];
  }
};
console.log(obj + ""); //'[object Object]';
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
// 4;
var obj = {
  valueOf: function() {
    return [1, 2];
  },
  toString: function() {
    return [1, 2, 3];
  }
};
console.log(obj + ""); // 报错 Uncaught TypeError: Cannot convert object to primitive value
```
拓展：
```js
var arr = [new Object(), new Date(), new RegExp(), new String(), new Number(), new Boolean(), new Function(), new Array(), Math] console.log(arr.length) // 9
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
1. 若 return [1, 2, 3]处为 return "valueof"，得到的返回值是 valueof toString 7valueof 说明：其他八种复杂数据类型是先调用 valueOf 方法，时间对象是先调用 toString 方法
2. 改成 return [1, 2, 3]，得到的返回值是 9toString 说明：执行 valueof 后都来执行 toString


## 13、javascript 的 typeof 返回哪些数据类型
7 种分别为 string、boolean、number、Object、Function、undefined、symbol(ES6)。

示例：
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


## 14、一次js请求一般情况下有哪些地方会有缓存处理？
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


## 15、❓列举 3 种强制类型转换和 2 种隐式类型转换
> http://c.biancheng.net/view/9378.html

强制: `parseInt()`, `parseFloat()`, `Number()`, `Boolean()`, `String()`<br>
隐式: `+`, `-`
```js
// 1.parseInt() 把值转换成整数
parseInt("1234blue"); // 1234
parseInt("0xA"); // 10
parseInt("22.5"); // 22
parseInt("blue"); // NaN
// parseInt()方法还有基模式，可以把二进制、八进制、十六进制或其他任何进制的字符串转换成整数。基是由parseInt()方法的第二个参数指定的，示例如下：
parseInt("AF", 16); // 175
parseInt("10", 2); // 2
parseInt("10", 8); // 8
parseInt("10", 10); // 10
// 如果十进制数包含前导0，那么最好采用基数10，这样才不会意外地得到八进制的值。例如：
parseInt("010"); // 8
parseInt("010", 8); // 8
parseInt("010", 10); // 10

// 2.parseFloat() 把值转换成浮点数,没有基模式
parseFloat("1234blue"); // 1234.0
parseFloat("0xA"); // NaN
parseFloat("22.5"); // 22.5
parseFloat("22.34.5"); // 22.34
parseFloat("0908"); // 908
parseFloat("blue"); // NaN

// 3.Number() 把给定的值转换成数字（可以是整数或浮点数）,Number()的强制类型转换与parseInt()和parseFloat()方法的处理方式相似，只是它转换的是整个值，而不是部分值。示例如下：
Number(false) // 0
Number(true) // 1
Number(undefined) // NaN
Number(null) // 0
Number("5.5") // 5.5
Number("56") // 56
Number("5.6.7") // NaN
Number(new Object()) // NaN
Number(100) // 100

// 4.Boolean() 把给定的值转换成Boolean型
Boolean(""); // false 
Boolean("hi"); // true
Boolean(100); // true
Boolean(null); // false
Boolean(0); // false
Boolean(new Object()); // true

// 5.String() 把给定的值转换成字符串
String(123) // "123"

// 6.+ -
console.log(0 + '1') // "01"
console.log(2 - '1') // 1
```


## 16、你对闭包的理解？优缺点？
概念：闭包就是能够读取其他函数内部变量的函数。<br>
三大特性：
- 函数嵌套函数。
- 函数内部可以引用外部的参数和变量。
- 参数和变量不会被垃圾回收机制回收。

例如在javascript中，只有函数内部的子函数才能读取局部变量，所以闭包可以理解成“**定义在一个函数内部的函数**”，在本质上，闭包是将函数内部和函数外部连接起来的桥梁。

**所谓闭包，要拆成闭和包，闭指代不想暴露给外部的数据，包指代将数据打包出去暴露给外部**<br>

在于JS的函数作用域，**函数内部的变量函数外部无法访问，这形成了闭**；**函数外部想得到函数内部的变量，可以通过某些方法譬如通过return等语句将内部的变量暴露出去，这形成了包**；

### 16.1、闭包理解
要理解闭包，首先必须理解Javascript特殊的变量作用域。变量的作用域无非就是两种：**全局变量和局部变量**。
```js
// 全局变量
var n = 999
function f1 () {
  console.log(n)
}
f1() // 999

// 局部变量
function f2 () {
  var n = 123
  console.log(n)
}
f2() // 123
```
注意：在函数内部声明变量一定要加上关键字，否则实际上声明了一个全局变量。<br>
**如何从外部读取局部变量？**
出于种种原因，我们有时候需要得到函数内的局部变量。但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现(在函数的内部，再定义一个函数)
```js
function f1 () {
  var n = 123
  function f2 () {
    console.log(n)
  }
}
```
在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了
```js
function f1 () {
  var n = 123
  function f2 () {
    console.log(n)
  }
  return f2
}
var result = f1()
result() // 123
```
我们来看下最简单的闭包：
```js
var local = '变量'
function foo () {
  console.log(local)
}
foo() // 变量
```
其实这就是一个闭包：**「函数」和「函数内部能访问到的变量」的总和，就是一个闭包**<br>
有的同学就疑惑了，闭包这么简单么？听说**闭包是需要函数套函数，然后 return 一个函数的呀**，比如：
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
+ 一个是前面提到的可以读取函数内部的变量；
+ 另一个就是让这些变量的值始终保持在内存中；

上面两句话可以使用下面的例子来体现：
```js
function f1 () {
  var n = 123
  increment = function () {
    n += 1
  }
  function f2 () {
    console.log(n)
  }
  return f2
}
var result = f1()
result() // 123
increment()
result() // 124
```
上面代码中`result`实际上就是**闭包f2函数**。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。
变量的值始终保存在内存中的演示：
```js
function f1 () {
  var num = 3
  return function () {
    var n = 0
    console.log(++n)
    console.log(++num)
  }
}
var result = f1()
result() // 1 4
result() // 1 5
```

### 16.3、使用闭包的注意点
+ 由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。
+ 闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

### 16.4、思考题
**思考题一**
```html
<script>
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
</script>
```
上面输出`The Window`，为什么呢？
因为`object.getNameFunc()()`其实等价于下面两行代码
```js
var result = object.getNameFunc() // 全局定义的变量其实就挂载在window对象上
console.log(result()) // 谁调用this就指向谁
```

**思考题二**
```html
<sctipt>
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
</script>
```
上面代码输出`My Object`，为什么呢？
因为这里的`var that = this`，此时的`this`就是我们的`object`，所以`that`也就指向`object`，然后由于闭包会使得这些变量的值始终保持在内存中，所以当再次访问的时候`that`还是指向`object`，所以就输出`My Object`了。

### 16.5、优缺点
优点：
- 希望一个变量长期存储在内存中。
- 避免全局变量的污染。
- 私有成员的存在。

缺点：
- 常驻内存，增加内存使用量。
- 使用不当会很容易造成内存泄露。

示例：
```js
function outer() {
  var name = "jack";

  function inner() {
    console.log(name);
  }
  return inner;
}
outer()(); // jack
```
```js
function sayHi(name) {
  return () => {
    console.log(`Hi! ${name}`);
  };
}
const test = sayHi("xiaoming");
test(); // Hi! xiaoming
```
虽然 sayHi 函数已经执行完毕，但是其活动对象也不会被销毁，因为 test 函数仍然引用着 sayHi 函数中的变量 name，这就是闭包。<br>
但也因为闭包引用着另一个函数的变量，导致另一个函数已经不使用了也无法销毁，所以闭包使用过多，会占用较多的内存，这也是一个副作用。

解析：
> 由于在 ECMA2015 中，只有函数才能分割作用域，函数内部可以访问当前作用域的变量，但是外部无法访问函数内部的变量，所以闭包可以理解成“定义在一个函数内部的函数，外部可以通过内部返回的函数访问内部函数的变量“。在本质上，闭包是将函数内部和函数外部连接起来的桥梁。


## 17、如何判断 NaN
**方式一：`isNaN(NaN)`方法**
```js
isNaN(NaN) // true

let a = 1
let b = NaN
console.log('数字a:', typeof a, isNaN(a)) // 数字a: number false
console.log('数字b:', typeof(b), isNaN(b)) // 数字b: number true
```
使用`isNaN()`函数只能判断变量是否非数字，而无法判断变量值是否为`NaN`，于是可以使用方式二。

**方式二：`NaN`的非自反特性**<br>
应用`NaN`的性质(非自反: `NaN`与谁都不相等，包括它本身):
```js
NaN === NaN // false，永远返回false

let a = NaN
a === a // false
a !== a // true
```
所以想要判断变量值是否为`NaN`，就能使用`===`判断变量是否为`NaN`。只需判断**变量是否与自身相等，若不等的情况，该变量的值即为`NaN`**。



## 18、new 一个对象的过程中发生了什么
```js
function Person(name) {
  this.name = name;
}
var person = new Person("qilei");
```
new一个对象的四个过程：
```js
// 1.创建空对象；
var obj = {};
// 2.设置原型链: 设置新对象的 constructor 属性为构造函数的名称，设置新对象的__proto__属性指向构造函数的 prototype 对象；
obj.constructor = Person;
obj.__proto__ = Person.prototype;
// 3.改变this指向：使用新对象调用函数，函数中的 this 指向新实例对象obj：
var result = Person.call(obj); //{}.构造函数();
// 4.返回值：如果无返回值或者返回一个非对象值，则将新对象返回；如果返回值是一个新对象的话那么直接返回该对象。
if (typeof(result) == "object") {
  person = result;
} else {
  person = obj;
}
```


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


## 20、如何判断 JS 变量的一个类型（至少三种方式）
### typeof
typeof 返回一个表示数据类型的字符串，返回结果包括：number、boolean、string、object、undefined、function等6种数据类型。如果是判断一个基本的类型用typeof就是可以的。
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

### instanceof
instanceof 是用来判断 A 是否为 B 的实例对，表达式为：A instanceof B，如果A是B的实例，则返回true, 否则返回false。 在这里需要特别注意的是：instanceof检测的是原型
```js
[] instanceof Array; //true
{} instanceof Object; //true
new Date() instanceof Date; //true
```
**优点**：instanceof 可以弥补 Object.prototype.toString.call()不能判断自定义实例化对象的缺点<br>
**缺点**：instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true，且不同于其他两种方法的是它不能检测出 iframes。

### constructor
每一个对象实例都可以通过 constrcutor 对象来访问它的构造函数 。JS 中内置了一些构造函数：Object、Array、Function、Date、RegExp、String等。我们可以通过数据的 constrcutor 是否与其构造函数相等来判断数据的类型。
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

### Object.prototype.toString.call()
toString是Object原型对象上的一个方法，该方法默认返回其调用者的具体类型，更严格的讲，是 toString运行时this指向的对象类型, 返回的类型格式为[object, xxx], xxx是具体的数据类型，其中包括：String, Number, Boolean, Undefined, Null, Function, Date, Array, RegExp, Error, HTMLDocument, ...基本上所有对象的类型都可以通过这个方法获取到。常用于判断浏览器内置对象。
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
**优点**：对于所有基本的数据类型都能进行判断，即使是 null 和 undefined<br>
**缺点**：不能精准判断自定义对象，对于自定义对象只会返回[object Object]

### Array.isArray()
Array.isArray()方法用于确定对象是否为数组，如果对象是数组，则次函数返回true，否则返回false。
```js
Array.isArray([1, 2, 3, 4])  // true
Array.isArray('1234')  // false
```
**优点**：当检测 Array 实例时，`Array.isArray`优于`instanceof`，因为`Array.isArray`可以检测出`iframes`<br>
**缺点**：只能判别数组


## 21、for ... in、Object.keys 和 Object.getOwnPropertyNames 对属性遍历有什么区别？
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


## 22、iframe 跨域通信和不跨域通信
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


## 23、❓H5 与 Native 如何交互
jsBridge
> https://zhuanlan.zhihu.com/p/438763800


## 24、如何判断一个对象是否为数组
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


## 25、`<script>`标签的 defer 和 asnyc 属性的作用以及二者的区别？
a.js文件内容
```js
console.log(123)
```
b.js文件内容
```js
console.log(234)
```
### 只有一个脚本的情况
```html
<script>
  console.log('aaa')
</script>
<script src="./a.js"></script>
<script>
  console.log('bbb')
</script>
```
没有 defer 或 async 属性，浏览器会立即下载并执行相应的脚本，并且在下载和执行时页面的处理会停止，即输出结果如下: `aaa 123 bbb`
```html
<script>
  console.log('aaa')
</script>
<script defer src="./a.js"></script>
<script>
  console.log('bbb')
</script>
```
有了 defer 属性，浏览器会立即下载相应的脚本，在下载的过程中页面的处理不会停止，等到文档解析完成脚本才会执行，即输出结果如下：`aaa bbb 123`
```html
<script>
  console.log('aaa')
</script>
<script async src="./a.js"></script>
<script>
  console.log('bbb')
</script>
```
有了 async 属性，浏览器会立即下载相应的脚本，在下载的过程中页面的处理不会停止，下载完成后立即执行，执行过程中页面处理会停止，即输出结果如下：`aaa bbb 123`
```html
<script>
  console.log('aaa')
</script>
<script defer async src="./a.js"></script>
<script>
  console.log('bbb')
</script>
```
如果同时指定了两个属性, 则会**遵从 async 属性而忽略 defer 属性**。

下图可以直观的看出三者之间的区别:
![2023021415000410.png](https://imgs.itchenliang.club/img/2023021415000410.png)
其中蓝色代表 js 脚本网络下载时间，红色代表 js 脚本执行，绿色代表 html 解析。

### 多个脚本的情况
```html
<script>
  console.log('aaa')
</script>
<script src="./a.js"></script>
<script src="./b.js"></script>
<script>
  console.log('bbb')
</script>
```
没有 defer 或 async 属性，浏览器会立即下载并执行脚本 a.js，在 a.js 脚本执行完成后才会下载并执行脚本 b.js，在脚本下载和执行时页面的处理会停止，即输出结果如下：`aaa 123 234 bbb`
```html
<script>
  console.log('aaa')
</script>
<script defer src="./a.js"></script>
<script defer src="./b.js"></script>
<script>
  console.log('bbb')
</script>
```
有了 defer 属性，浏览器会立即下载相应的脚本 a.js 和 b.js，在下载的过程中页面的处理不会停止，等到文档解析完成才会执行这两个脚本。即输出结果如下：`aaa bbb 123 234`
```html
<script>
  console.log('aaa')
</script>
<script async src="./a.js"></script>
<script async src="./b.js"></script>
<script>
  console.log('bbb')
</script>
```
有了 async 属性，浏览器会立即下载相应的脚本 a.js 和 b.js，在下载的过程中页面的处理不会停止，a.js 和 b.js 哪个先下载完成哪个就立即执行，执行过程中页面处理会停止，但是其他脚本的下载不会停止，输出结果如下：`aaa 123 234 bbb`
```html
<script>
  console.log('aaa')
</script>
<script defer src="./a.js"></script>
<script async src="./b.js"></script>
<script defer src="./a.js"></script>
<script>
  console.log('bbb')
</script>
```
有了 async 或 defer 属性，浏览器会立即下载相应的脚本 a.js 和 b.js，在下载过程中页面的处理不会停止，在 a.js 和 b.js 中有 defer 属性的会先被执行，即输出结果如下：`aaa bbb 123 123 234`


## 26、==什么是面向对象OOP？==
面向对象（`Object-Oriented Programming`）是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。<br>
面向对象就是一种思想，任何事务都可以看作对象，所以才有了”万物皆对象“这一说，面向对象又称OOP(Object Oriented Programming) 分开来看就是：
- Object：对象
- Oriented： 面向的
- Programming:程序设计

**面向对象和面向过程的异同**
- 面向过程就是分析出解决问题所需要的步骤，然后用函数把这些步骤一步一步实现，使用的时候一个一个依次调用就可以了。
- 面向对象是把构成问题事务分解成各个对象，建立对象的目的不是为了完成一个步骤，而是为了描叙某个事物在整个解决问题的步骤中的行为。


## 27、你对松散类型的理解
松散类型就是指当一个变量被申明出来就可以保存任意类型的值，就是不像 SQL 一样申明某个键值为 int 就只能保存整型数值，申明 varchar 只能保存字符串。一个变量所保存值的类型也可以改变，这在 JavaScript 中是完全有效的，只是不推荐。相比较于将变量理解为“盒子“，它不保存值，而是抓取值。这一点在当变量保存引用类型值时更加明显。

JavaScript 中变量可能包含两种不同的数据类型的值：基本类型和引用类型。
- 基本类型是指简单的数据段；
- 引用类型指那些可能包含多个值的对象；


## 28、JavaScript 严格模式和正常模式的区别
严格模式使用"use strict"，老版本的浏览器会把它当作一行普通字符串，加以忽略。
### 作用
- 消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 消除代码运行的一些不安全之处，保证代码运行的安全；
- 提高编译器效率，增加运行速度；
- 为未来新版本的 Javascript 做好铺垫。

### 表现
- 严格模式下, delete 运算符后跟随非法标识符(即 delete 不存在的标识符)，会抛出语法错误； 非严格模式下，会静默失败并返回 false
- 严格模式中，对象直接量中定义同名属性会抛出语法错误； 非严格模式不会报错
- 严格模式中，函数形参存在同名的，抛出错误； 非严格模式不会
- 严格模式不允许八进制整数直接量（如：023）
- 严格模式中，arguments 对象是传入函数内实参列表的静态副本；非严格模式下，arguments 对象里的元素和对应的实参是指向同一个值的引用
- 严格模式中 eval 和 arguments 当做关键字，它们不能被赋值和用作变量声明
- 严格模式会限制对调用栈的检测能力，访问 arguments.callee.caller 会抛出异常
- 严格模式 变量必须先声明，直接给变量赋值，不会隐式创建全局变量，不能用 with,
- 严格模式中 call apply 传入 null undefined 保持原样不被转换为 window

### 严格模式调用方式
- **针对整个脚本文件**<br>
  将"use strict"放在脚本文件的第一行，则整个脚本都将以"严格模式"运行。如果这行语句不在第一行，则无效，整个脚本以"正常模式"运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意。
  ```html
  <script>
    "use strict";
    console.log("这是严格模式。")
  </script>
  <script>
    console.log("这是正常模式。")
  </script>
  ```
- **针对单个函数**<br>
  将"use strict"放在函数体的第一行，则整个函数以"严格模式"运行。
  ```js
  function strict() {
    "use strict";
    return "这是严格模式。"
  }

  function notStrict() {
    return "这是正常模式。"
  }
  ```
- **脚本文件的变通写法**<br>
  因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中。
  ```js
  (function() {
    "use strict"; // some code here
  })();
  ```

### 语法和行为改变
严格模式对 Javascript 的语法和行为，都做了一些改变。
- **全局变量显式声明**<br>
  在正常模式中，如果一个变量没有声明就赋值，默认是全局变量。严格模式禁止这种用法，全局变量必须显式声明。
  ```js
  "use strict";
  v = 1 // 报错，v未声明
  for (i = 0; i < 2; i++) {
    // 报错，i未声明
  }
  ```
  因此，严格模式下，变量都必须先用 var 命令声明，然后再使用。
- **静态绑定**<br>
  Javascript 语言的一个特点，就是允许"动态绑定"，即某些属性和方法到底属于哪一个对象，不是在编译时确定的，而是在运行时（runtime）确定的。<br>
  严格模式对动态绑定做了一些限制。某些情况下，只允许静态绑定。也就是说，属性和方法到底归属哪个对象，在编译阶段就确定。这样做有利于编译效率的提高，也使得代码更容易阅读，更少出现意外。<br>
  具体来说，涉及以下几个方面。
  - 禁止使用 with 语句
    因为 with 语句无法在编译时就确定，属性到底归属哪个对象。
    ```js
    "use strict";
    var v = 1;
    with(o) { // 语法错误
      v = 2;
    }
    ```
  - 创设 eval 作用域
    正常模式下，Javascript 语言有两种变量作用域（scope）：全局作用域和函数作用域。严格模式创设了第三种作用域：eval 作用域。<br>
    正常模式下，eval 语句的作用域，取决于它处于全局作用域，还是处于函数作用域。严格模式下，eval 语句本身就是一个作用域，不再能够生成全局变量了，它所生成的变量只能用于 eval 内部。
    ```js
    "use strict";
    var x = 2;
    console.info(eval("var x = 5; x")); // 5
    console.info(x); // 2
    ```
- **增强的安全措施**<br>
  - 禁止 this 关键字指向全局对象<br>
    ```js
    function f() {
      return !this;
    } // 返回false，因为"this"指向全局对象，"!this"就是false
    function f() {
      "use strict";
      return !this;
    } // 返回true，因为严格模式下，this的值为undefined，所以"!this"为true。
    ```
    因此，使用构造函数时，如果忘了加 new，this 不再指向全局对象，而是报错。<br>
    ```js
    function f() {
      "use strict";
      this.a = 1;
    }
    f(); // 报错，this未定义
    ```
  - 禁止在函数内部遍历调用栈<br>
    ```js
    function f1() {
    "use strict";
      f1.caller; // 报错
      f1.arguments; // 报错
    }
    f1();
    ```
- **禁止删除变量**<br>
  严格模式下无法删除变量。只有 configurable 设置为 true 的对象属性，才能被删除。<br>
  ```js
  "use strict";
  var x;
  delete x; // 语法错误
  var o = Object.create(null, {
    'x': {
      value: 1,
      configurable: true
    }
  });
  delete o.x; // 删除成功
  ```
- **显式报错**<br>
  正常模式下，对一个对象的只读属性进行赋值，不会报错，只会默默地失败。严格模式下，将报错。<br>
  ```js
  "use strict";
  var o = {};
  Object.defineProperty(o, "v", {
    value: 1,
    writable: false
  });
  o.v = 2; // 报错
  ```
  严格模式下，对一个使用 getter 方法读取的属性进行赋值，会报错。<br>
  ```js
  "use strict";
  var o = {
    get v() {
      return 1;
    }
  };
  o.v = 2; // 报错
  ```
  严格模式下，对禁止扩展的对象添加新属性，会报错。<br>
  ```js
  "use strict";
  var o = {};
  Object.preventExtensions(o);
  o.v = 1; // 报错
  ```
  严格模式下，删除一个不可删除的属性，会报错。<br>
  ```js
  "use strict";
  delete Object.prototype; // 报错
  ```
- **重名错误**<br>
  严格模式新增了一些语法错误。
  - 对象不能有重名的属性：正常模式下，如果对象有多个重名属性，最后赋值的那个属性会覆盖前面的值。严格模式下，这属于语法错误。
    ```js
    "use strict";
    var o = {
      p: 1,
      p: 2
    }; // 语法错误
    ```
  - 函数不能有重名的参数：正常模式下，如果函数有多个重名的参数，可以用 arguments[i]读取。严格模式下，这属于语法错误。
    ```js
    "use strict";
    function f(a, a, b) { // 语法错误
      return;
    }
    ```
- **禁止八进制表示法**<br>
  正常模式下，整数的第一位如果是 0，表示这是八进制数，比如 0100 等于十进制的 64。严格模式禁止这种表示法，整数第一位为 0，将报错。
  ```js
  "use strict";
  var n = 0100; // 语法错误
  ```
- **arguments 对象的限制**
  arguments 是函数的参数对象，严格模式对它的使用做了限制。
  - 不允许对 arguments 赋值
    ```js
    "use strict";
    arguments++; // 语法错误
    var obj = {
      set p(arguments) {}
    }; // 语法错误
    try {} catch (arguments) {} // 语法错误
    function arguments() {} // 语法错误
    var f = new Function("arguments", "'use strict'; return 17;"); // 语法错误
    ```
  - arguments 不再追踪参数的变化
    ```js
    function f(a) {
      a = 2;
      return [a, arguments[0]];
    }
    f(1); // 正常模式为[2,2]
    function f(a) {
      "use strict";
      a = 2;
      return [a, arguments[0]];
    }
    f(1); // 严格模式为[2,1]
    ```
  - 禁止使用 arguments.callee<br>
    这意味着，你无法在匿名函数内部调用自身了。
    ```js
    "use strict";
    var f = function() {
      return arguments.callee;
    };
    f(); // 报错
    ```
- **函数必须声明在顶层**<br>
  将来 Javascript 的新版本会引入"块级作用域"。为了与新版本接轨，严格模式只允许在全局作用域或函数作用域的顶层声明函数。也就是说，不允许在非函数的代码块内声明函数。
  ```js
  "use strict";
  if (true) {
    function f() {} // 语法错误
  }
  for (var i = 0; i < 5; i++) {
    function f2() {} // 语法错误
  }
  ```
- **保留字**<br>
  为了向将来 Javascript 的新版本过渡，严格模式新增了一些保留字：implements, interface, let, package, private, protected, public, static, yield。<br>
  使用这些词作为变量名将会报错。
  ```js
  function package(protected) { // 语法错误
    "use strict";
    var implements; // 语法错误
  }
  ```
  此外，ECMAscript 第五版本身还规定了另一些保留字（class, enum, export, extends, import, super），以及各大浏览器自行增加的 const 保留字，也是不能作为变量名的。


## 29、移动端 click 事件、touch 事件、tap 事件的区别
1. click 事件在移动端会有 200-300ms 的延迟，主要原因是苹果手机在设计时，考虑到用户在浏览网页时需要放大，所以，在用户点击的 200-300ms 之后，才触发 click，如果 200-300ms 之内还有 click，就会进行放大缩小。
2. touch 事件是针对触屏手机上的触摸事件。现今大多数触屏手机 webkit 内核提供了 touch 事件的监听，让开发者可以获取用户触摸屏幕时的一些信息。其中包括：touchstart, touchmove, touchend, touchcancel 这四个事件，touchstart touchmove touchend 事件可以类比于 mousedown mouseover mouseup 的触发
3. tap 事件在移动端，代替 click 作为点击事件，tap 事件被很多框架（如 zepto）封装，来减少这延迟问题， tap 事件不是原生的，所以是封装的，那么具体是如何实现的呢？
```html
<script>
  function tap(ele, callback) {
      // 记录开始时间
      var startTime = 0,
          // 控制允许延迟的时间
          delayTime = 200,
          // 记录是否移动，如果移动，则不触发tap事件
          isMove = false;

      // 在touchstart时记录开始的时间
      ele.addEventListener('touchstart', function(e) {
          startTime = Date.now();
      });

      // 如果touchmove事件被触发，则isMove为true
      ele.addEventListener('touchmove', function(e) {
          isMove = true;
      });

      // 如果touchmove事件触发或者中间时间超过了延迟时间，则返回，否则，调用回调函数。
      ele.addEventListener('touchend', function(e) {
          if (isMove || (Date.now() - startTime > delayTime)) {
              return;
          } else {
              callback(e);
          }
      })
  }

  var btn = document.getElementById('btn');
  tap(btn, function() {
      alert('taped');
  }); 
</script>
```


## 30、JS 单线程还是多线程，如何显示异步操作
JS 本身是单线程的，他是依靠浏览器完成的异步操作。

具体步骤：
1. 主线程 执行 js 中所有的代码
2. 主线程 在执行过程中发现了需要异步的任务任务后扔给浏览器（浏览器创建多个线程执行），并在  callback queue  中创建对应的回调函数（回调函数是一个对象，包含该函数是否执行完毕等）
3. 主线程 已经执行完毕所有同步代码。开始监听  callback queue 一旦 浏览器 中某个线程任务完成将会改变回调函数的状态。主线程查看到某个函数的状态为已完成，就会执行该函数

![202302141550108.png](https://imgs.itchenliang.club/img/202302141550108.png)


## 31、JavaScript 数组常用方法
参考：https://www.runoob.com/jsref/jsref-obj-array.html
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


## 32、JS 块级作用域、变量提升、let const var 的区别
### 块级作用域
JS 中作用域有：全局作用域、函数作用域。没有块作用域的概念。ECMAScript 6(简称 ES6)中新增了块级作用域。块作用域由 { } 包括，if 语句和 for 语句里面的{ }也属于块作用域。

### 变量提升
- 如果变量声明在函数里面，则将变量声明提升到函数的开头
- 如果变量声明是一个全局变量，则将变量声明提升到全局作用域的开头

```html
<script type = "text/javascript"> 
{
  var a = 1;
  console.log(a); // 1
}
console.log(a); // 1
// 可见，通过var定义的变量可以跨块作用域访问到。

(function A() {
  var b = 2;
  console.log(b); // 2
})();
// console.log(b); // 报错，
// 可见，通过var定义的变量不能跨函数作用域访问到

if (true) {
  var c = 3;
}
console.log(c); // 3
for (var i = 0; i < 4; i++) {
  var d = 5;
};
console.log(i); // 4  (循环结束i已经是4，所以此处i为4)
console.log(d); // 5
// if语句和for语句中用var定义的变量可以在外面访问到，
// 可见，if语句和for语句属于块作用域，不属于函数作用域。

{
  var a = 1;
  let b = 2;
  const c = 3;
  {
    console.log(a); // 1	子作用域可以访问到父作用域的变量
    console.log(b); // 2	子作用域可以访问到父作用域的变量
    console.log(c); // 3	子作用域可以访问到父作用域的变量

    var aa = 11;
    let bb = 22;
    const cc = 33;
  }

  console.log(aa); // 11	// 可以跨块访问到子 块作用域 的变量
  console.log(bb); // 报错	bb is not defined
  console.log(cc); // 报错	cc is not defined
} 
</script>
```

### var、let、const 的区别
- var 定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。
- let 定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。
- const 用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。
- 同一个变量只能使用一种方式声明，不然会报错

1. var在js中是支持预解析的，而let不支持预解析，也就是变量提升的区别
  ```js
  console.log(a) // undefined
  var a = 22

  console.log(b) // ReferenceError: Cannot access 'b' before initialization
  let b = 22
  ```
2. var可以重复定义同一个变量，但是let不可以
  ```js
  var a = 1
  var a = 2
  console.log(a)

  let b = 1
  let b = 2 // SyntaxError: Identifier 'b' has already been declared
  console.log(b)
  ```
3. const是用来定义常量的，常量定义之后是不允许改变的，而且必须初始化
  ```js
  const b = 2
  b = 3 // TypeError: Assignment to constant variable.
  const a // SyntaxError: Missing initializer in const declaration
  ```
  **注意**：引用变量与普通变量的区别，所以用const定义的常量只要是引用类型数据，改变这个引用类型数据的结构或属性，都是允许的
  ```js
  const obj = {}
  obj.name = '123'
  ```
4. let具有块级作用域，函数内部使用let定义后，对函数外部无影响<br>
  在es6之前实现块级作用域使用立即执行函数
  ```js
  // Es6之前
  (function () {
    var a = 200
  })()
  console.log(a) // ReferenceError: a is not defined

  // ES6的块级作用域
  {
    let a = 1
  }
  console.log(a) // ReferenceError: a is not defined
  ```
  块级作用域常见使用场景
  ```js
  for (let i = 0; i < 10; i++) {
    // ...
  }
  console.log(i) // ReferenceError: i is not defined

  for (var i = 0; i < 10; i++) {
    // ...
  }
  console.log(i) // ReferenceError: i is not defined

  // 函数中的变量污染了全局环境
  function run() {
    web = 'houlaizhe' // 等价于 window.web = 'houlaizhe'
  }
  run()
  console.log(web) // houlaizhe 等价于 console.log(window.web)
  ```
5. var定义的全局变量会挂载到window对象上，使用window可以访问，let定义的全局变量则不会挂载到window对象上
  ```js
  var a = 1
  console.log(window.a)
  ```

```html
<script type = "text/javascript">
// 块作用域
{
  var a = 1;
  let b = 2;
  const c = 3;
  // c = 4; // 报错
  // let a = 'a';	// 报错  注：是上面 var a = 1; 那行报错
  // var b = 'b';	// 报错：本行报错
  // const a = 'a1';	// 报错  注：是上面 var a = 1; 那行报错
  // let c = 'c';	// 报错：本行报错
  var aa;
  let bb;
  // const cc; // 报错
  console.log(a); // 1
  console.log(b); // 2
  console.log(c); // 3
  console.log(aa); // undefined
  console.log(bb); // undefined
}
console.log(a); // 1
// console.log(b); // 报错
// console.log(c); // 报错

// 函数作用域
(function A() {
  var d = 5;
  let e = 6;
  const f = 7;
  console.log(d); // 5
  console.log(e); // 6  (在同一个{ }中,也属于同一个块，可以正常访问到)
  console.log(f); // 7  (在同一个{ }中,也属于同一个块，可以正常访问到)
})();
// console.log(d); // 报错
// console.log(e); // 报错
// console.log(f); // 报错
</script>
```


## 33、null/undefined 的区别
- **null**：Null类型，代表“空值"，代表一个空对象指针，使用 typeof 运算得到 “object"，所以你可以认为它是一个特殊的对象值。
- **undefined**：Undefined 类型，当一个声明了一个变量未初始化时，得到的就是 undefined。


## 34、JS 哪些操作会造成内存泄露/内存泄漏
内存泄露是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。C#和Java等语言采用了自动垃圾回收方法管理内存，几乎不会发生内存泄露。我们知道，浏览器中也是采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有bug，会产生内存泄露。
1. 意外的全局变量引起的内存泄露
  ```js
  function leak() {
    leak = "xxx"; //leak成为一个全局变量，不会被回收
  }
  ```
2. 闭包引起的内存泄露
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
3. 没有清理的 DOM 元素引用
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
4. 被遗忘的定时器或者回调
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
5. 子元素存在引起的内存泄露
  ![202302141601126.png](https://imgs.itchenliang.club/img/202302141601126.png)
  黄色是指直接被 js 变量所引用，在内存里，红色是指间接被 js 变量所引用，如上图，refB 被 refA 间接引用，导致即使 refB 变量被清空，也是不会被回收的子元素 refB 由于 parentNode 的间接引用，只要它不被删除，它所有的父元素（图中红色部分）都不会被删除。

### JS 的回收机制
JavaScript 垃圾回收的机制很简单：找出不再使用的变量，然后释放掉其占用的内存，但是这个过程不是实时的，因为其开销比较大，所以垃圾回收系统（GC）会按照固定的时间间隔, 周期性的执行。

到底哪个变量是没有用的？所以垃圾收集器必须跟踪到底哪个变量没用，对于不再有用的变量打上标记，以备将来收回其内存。用于标记的无用变量的策略可能因实现而有所区别，通常情况下有两种实现方式：标记清除和引用计数。引用计数不太常用，标记清除较为常用。

### 标记清除（mark and sweep）
js 中最常用的垃圾回收方式就是标记清除。当变量进入环境时，例如，在函数中声明一个变量，就将这个变量标记为“进入环境”。从逻辑上讲，永远不能释放进入环境的变量所占用的内存，因为只要执行流进入相应的环境，就可能会用到它们。而当变量离开环境时，则将其标记为“离开环境”。
```js
function test() {
  var a = 10; //被标记，进入环境
  var b = 20; //被标记，进入环境
}
test(); //执行完毕之后a、b又被标记离开环境，被回收
```

### 引用计数(reference counting)
引用计数的含义是跟踪记录每个值被引用的次数。当声明了一个变量并将一个引用类型值（function object array）赋给该变量时，则这个值的引用次数就是 1。如果同一个值又被赋给另一个变量，则该值的引用次数加 1。相反，如果包含对这个值引用的变量又取得了另外一个值，则这个值的引用次数减 1。当这个值的引用次数变成 0 时，则说明没有办法再访问这个值了，因而就可以将其占用的内存空间回收回来。这样，当垃圾回收器下次再运行时，它就会释放那些引用次数为 0 的值所占用的内存。
```js
function test() {
  var a = {}; //a的引用次数为0
  var b = a; //a的引用次数加1，为1
  var c = a; //a的引用次数加1，为2
  var b = {}; //a的引用次数减1，为1
}
```

### 如何分析内存的使用情况
Google Chrome 浏览器提供了非常强大的 JS 调试工具，Memory 视图 profiles 视图让你可以对 JavaScript 代码运行时的内存进行快照，并且可以比较这些内存快照。它还让你可以记录一段时间内的内存分配情况。在每一个结果视图中都可以展示不同类型的列表，但是对我们最有用的是 summary 列表和 comparison 列表。 summary 视图提供了不同类型的分配对象以及它们的合计大小：shallow size （一个特定类型的所有对象的总和）和 retained size （shallow size 加上保留此对象的其它对象的大小）。distance 显示了对象到达 GC 根（校者注：最初引用的那块内存，具体内容可自行搜索该术语）的最短距离。 comparison 视图提供了同样的信息但是允许对比不同的快照。这对于找到泄漏很有帮助。

### 怎样避免内存泄露
- 减少不必要的全局变量，或者生命周期较长的对象，及时对无用的数据进行垃圾回收；
- 注意程序逻辑，避免“死循环”之类的 ；
- 避免创建过多的对象 原则：不用了的东西要及时归还。


## 35、观察者模式和发布订阅者模式
- 观察者模式：观察者（Observer）直接订阅（Subscribe）主题（Subject），而当主题被激活的时候，会触发（Fire Event）观察者里的事件。
- 发布订阅模式：订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publish topic）到调度中心，也就是该事件触发时，由调度中心统一调度（Fire Event）订阅者注册到调度中心的处理代码。

![202302141606478.png](https://imgs.itchenliang.club/img/202302141606478.png)


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


## 37、typescript 遇到过什么坑
main.ts 报错（ Cannot find module './App.vue'.）<br>
原因： typescript 不能识别.vue 文件<br>
解决办法： 引入 vue 的 typescript declare 库


## 38、this 和 apply 的应用
比如求数组的最大值 Math.max.apply(this, 数组)
```js
var numbers = [5, 458, 120, -215];
var maxInNumbers = Math.max.apply(this, numbers); //第一个参数也可以填Math或null
console.log(maxInNumbers); // 458
var maxInNumbers = Math.max.call(this, 5, 458, 120, -215);
console.log(maxInNumbers); // 458
```


## 39、split() join()的区别
- join()：用于把数组中的所有元素通过指定的分隔符进行分隔放入一个字符串
- split()：用于把一个字符串通过指定的分隔符进行分隔成数组


## 40、JavaScript 的数据类型
js数据类型分为基本数据类型和引用类型，其中基本数据类型：
- String：字符串
- Number：数值
- Boolean：布尔值
- Null：空值
- Undefined：未定义

引用类型包括：
- Object

另外，ES6 新增了
- Symbol类型：代表创建后独一无二且不可变的数据类型

ES10 中新增的：
- BigInt类型：一种数字类型的数据，它可以表示任意精度格式的整数


## 41、如何判断一个对象是否属于某个类？
```js
class Person {}
var p = new Person()
if (p instanceof Person) {
  console.log("yes");
}
```


## 42、new 操作符具体干了什么呢?
new 共经过了 4 几个阶段
- 创建一个空对象
- 设置原型链
- 让 Func 中的 this 指向 obj，并执行 Func 的函数体
- 判断 Func 的返回值类型


## 43、❓bind()、call()与apply()的作用与区别？
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




## 44、❓sort 排序原理
sort排序使用的是冒泡排序法，其原理如下：
- 比较相邻的元素。如果第一个比第二个大，就交换他们两个。
- 对每一对相邻元素做同样的工作，从开始第一对到结尾的最后一对。在这一点，最后的元素应该会是最大的数。
- 针对所有的元素重复以上的步骤，除了最后一个。
- 持续每次对越来越少的元素重复上面的步骤，直到没有任何一对数字需要比较。

**示例**：
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


## 45、❓如何判断当前脚本运行在浏览器还是 node 环境中？
通过判断 Global 对象是否为 window，如果不为 window，当前脚本没有运行在浏览器中


## 46、❓移动端最小触控区域是多大？
苹果推荐是 44pt x 44pt


## 47、移动端的点击事件的有延迟，时间是多久，为什么会有？ 怎么解决这个延时？
1. 300 毫秒
2. 因为浏览器捕获第一次单击后，会先等待一段时间，如果在这段时间区间里用户未进行下一次点击，则浏览器会做单击事件的处理。如果这段时间里用户进行了第二次单击操作，则浏览器会做双击事件处理。
3. 推荐 fastclick.js


## 48、Node.js 的适用场景？
比如：RESTFUL API、实时聊天、客户端逻辑强大的单页 APP，具体的例子比如说：本地化的在线音乐应用，本地化的在线搜索应用，本地化的在线 APP 等。


## 49、使用构造函数的注意点
1. 一般情况下构造函数的首字母需要大写，因为我们在看到一个函数首字母大写的情况，就认定这是一个构造函数，需要跟new关键字进行搭配使用，创建一个新的实例（对象）
2. 构造函数在被调用的时候需要跟new关键字搭配使用。
3. 在构造函数内部通过this+属性名的形式为实例添加一些属性和方法。
4. 构造函数一般不需要返回值，如果有返回值
  - 如果返回值是一个基本数据类型，那么调用构造函数，返回值仍旧是那么创建出来的对象。
  - 如果返回值是一个复杂数据类型，那么调用构造函数的时候，返回值就是这个return之后的那个复杂数据类型。


## 50、如何获取浏览器版本信息
```js
window.navigator.userAgent
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
自执行函数: 
1. 声明一个匿名函数
2. 马上调用这个匿名函数。

作用：创建一个独立的作用域。<br>
好处：防止变量弥散到全局，以免各种 js 库冲突。隔离作用域避免污染，或者截断作用域链，避免闭包造成引用变量无法释放。利用立即执行特性，返回需要的业务函数或对象，避免每次通过条件判断来处理。<br>
场景：一般用于框架、插件等场景


## 54、多个页面之间如何进行通信
- cookie
- web worker
- localeStorage 和 sessionStorage


## 55、css 动画和 js 动画的差异
1. 代码复杂度，js 动画代码相对复杂一些
2. 动画运行时，对动画的控制程度上，js 能够让动画，暂停，取消，终止，css 动画不能添加事件
3. 动画性能看，js 动画多了一个 js 解析的过程，性能不如 css 动画好


## 56、如何做到修改 url 参数页面不刷新
HTML5 引入了 `history.pushState()` 和 `history.replaceState()` 方法，它们分别可以添加和修改历史记录条目。
```js
let stateObj = {
  foo: "bar"
};
history.pushState(stateObj, "page 2", "bar.html");
```
假设当前页面为 foo.html ，执行上述代码后会变为 bar.html ，点击浏览器后退，会变为 foo.html ，但浏览器并不会刷新。 pushState() 需要三个参数: 一个状态对象, 一个标题 (目前被忽略), 和 (可选的) 一个 URL.让我们来解释下这三个参数详细内容：
- 状态对象 — 状态对象 state 是一个 JavaScript 对象，通过 pushState () 创建新的历史记录条目。无论什么时候用户导航到新的状态， popstate 事件就会被触发，且该事件的 state 属性包含该历史记录条目状态对象的副本。<br>
  状态对象可以是能被序列化的任何东西。原因在于 Firefox 将状态对象保存在用户的磁盘上，以便在用户重启浏览器时使用，我们规定了状态对象在序列化表示后有 640k 的大小限制。如果你给 pushState() 方法传了一个序列化后大于 640k 的状态对象，该方法会抛出异常。如果你需要更大的空间，建议使用 sessionStorage 以及 localStorage .
- 标题 — Firefox 目前忽略这个参数，但未来可能会用到。传递一个空字符串在这里是安全的，而在将来这是不安全的。二选一的话，你可以为跳转的 state 传递一个短标题。
- URL — 该参数定义了新的历史 URL 记录。注意，调用 pushState() 后浏览器并不会立即加载这个 URL，但可能会在稍后某些情况下加载这个 URL，比如在用户重新打开浏览器时。新 URL 不必须为绝对路径。如果新 URL 是相对路径，那么它将被作为相对于当前 URL 处理。新 URL 必须与当前 URL 同源，否则 pushState() 会抛出一个异常。该参数是可选的，缺省为当前 URL。


## 57、事件绑定与普通事件有什么区别
- 用普通事件添加相同事件，下面会覆盖上面的，而事件绑定不会
- 普通事件是针对非 dom 元素，事件绑定是针对 dom 元素的事件


## 58、IE 和 DOM 事件流的区别
**事件流的区别**：
- IE 采用冒泡型事件 Netscape 使用捕获型事件
- DOM 使用先捕获后冒泡型事件

示例：
```html
<body>
  <div>
    <button>点击这里</button>
  </div>
</body>
```
冒泡型事件模型： button->div->body (IE 事件流) <br>
捕获型事件模型： body->div->button (Netscape 事件流)<br>
DOM 事件模型： body->div->button->button->div->body (先捕获后冒泡)

**事件侦听函数的区别**：
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
bCapture 参数用于设置事件绑定的阶段，true 为捕获阶段，false 为冒泡阶段。


## 59、IE 和标准下有哪些兼容性的写法
```js
var ev = ev || window.event;
document.documentElement.clientWidth || document.body.clientWidth;
var target = ev.srcElement || ev.target;
```


## 60、如何阻止冒泡与默认行为
- 阻止冒泡行为：非 IE 浏览器 stopPropagation()，IE 浏览器 window.event.cancelBubble = true
- 阻止默认行为：非 IE 浏览器 preventDefault()，IE 浏览器 window.event.returnValue = false

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


## 61、❓javascript 的本地对象，内置对象和宿主对象
### 本地对象
ECMA-262 把本地对象（native object）定义为“独立于宿主环境的 ECMAScript 实现提供的对象"。简单来说，本地对象就是 ECMA-262 定义的类（引用类型）。它们包括：Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError

### 内置对象
JS中内置了17个对象，常用的是Array对象、Date对象、正则表达式对象、string对象、Global对象

### 宿主对象
由ECMAScript实现的宿主环境提供的对象，可以理解为：浏览器提供的对象。所有的BOM和DOM都是宿主对象。


## 62、❓javascript 的同源策略
一段脚本只能读取来自于同一来源的窗口和文档的属性<br>
同源策略：限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互。这是一个用于隔离潜在恶意文件的关键的安全机制。（来自 MDN 官方的解释）。

简单来说就是：一段脚本只能读取来自于同一来源的窗口和文档的属性，这里的同一来源指的是主机名、协议和端口号的组合。<br>
具体解释：
- 源包括三个部分：协议、域名、端口（http 协议的默认端口是 80）。如果有任何一个部分不同，则源不同，那就是跨域了。
- 限制：这个源的文档没有权利去操作另一个源的文档。这个限制体现在：
  - Cookie、LocalStorage 和 IndexDB 无法获取。
  - 无法获取和操作 DOM。
  - 不能发送 Ajax 请求。我们要注意，Ajax 只适合同源的通信
  - 同源策略带来的麻烦：ajax 在不同域名下的请求无法实现，需要进行跨域操作


## 63、事件捕获、事件冒泡、事件委托
DOM事件流（event  flow ）存在三个阶段：**事件捕获阶段**、**处于目标阶段**、**事件冒泡阶段**。
- 事件捕获: window将事件派发到目标的这一过程
- 目标阶段: 事件派发到目标元素的阶段，如果事件被处理成不进行冒泡，那么后续的冒泡将终止
- 冒泡阶段: 从目标元素开始，逐层向上传递事件，直到document
![202302272001442.png](https://imgs.itchenliang.club/img/202302272001442.png)

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
![202302272024251.png](https://imgs.itchenliang.club/img/202302272024251.png)

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


## 64、❓JavaScript全局函数有哪些?
> https://blog.csdn.net/weixin_45735355/article/details/119953872


## 65、❓javascript 中 this 的指向问题
- 全局环境、普通函数（非严格模式）指向 window
- 普通函数（严格模式）指向 undefined
- 函数作为对象方法及原型链指向的就是上一级的对象
- 构造函数指向构造的对象
- DOM 事件中指向触发事件的元素
- 箭头函数...

### 全局环境
全局环境下，this 始终指向全局对象（window），无论是否严格模式；
```js
// 在浏览器中，全局对象为 window 对象：
console.log(this === window); // true

this.a = 37;
console.log(window.a); // 37
```

### 函数上下文调用
#### 普通函数
普通函数内部的 this 分两种情况，严格模式和非严格模式。<br>
（1）非严格模式下，没有被上一级的对象所调用, this 默认指向全局对象 window。
```js
function f1() {
  return this;
}
f1() === window; // true
```
（2）严格模式下，this 指向 undefined。
```js
function f2() {
  "use strict"; // 这里是严格模式
  return this;
}
f2() === undefined; // true
```

#### 函数作为对象的方法
（1）函数有被上一级的对象所调用，那么 this 指向的就是上一级的对象。<br>
（2）多层嵌套的对象，内部方法的 this 指向离被调用函数最近的对象（window 也是对象，其内部对象调用方法的 this 指向内部对象， 而非 window）。
```js
//方式1
var o = {
  prop: 37,
  f: function() {
    return this.prop;
  }
};
//当 o.f()被调用时，函数内的this将绑定到o对象。
console.log(o.f()); // logs 37

//方式2
var o = {
  prop: 37
};

function independent() {
  return this.prop;
}
//函数f作为o的成员方法调用
o.f = independent;
console.log(o.f()); // logs 37

//方式3
//this 的绑定只受最靠近的成员引用的影响
o.b = {
  g: independent,
  prop: 42
};
console.log(o.b.g()); // 42
```
特殊例子
```js
// 例子1
var o = {
  a: 10,
  b: {
    // a:12,
    fn: function() {
      console.log(this.a); //undefined
      console.log(this); //{fn: ƒ}
    }
  }
};
o.b.fn();
// 例子2
var o = {
  a: 10,
  b: {
    a: 12,
    fn: function() {
      console.log(this.a); //undefined
      console.log(this); //window
    }
  }
};
var j = o.b.fn;
j();
// this永远指向的是最后调用它的对象，也就是看它执行的时候是谁调用的，例子2中虽然函数fn是被对象b所引用，但是在将fn赋值给变量j的时候并没有执行所以最终指向的是window，这和例子1是不一样的，例子1是直接执行了fn
```

#### 原型链中的 this
（1）如果该方法存在于一个对象的原型链上，那么 this 指向的是调用这个方法的对象，就像该方法在对象上一样。
```js
var o = {
  f: function() {
    return this.a + this.b;
  }
};
var p = Object.create(o);
p.a = 1;
p.b = 4;

console.log(p.f()); // 5
```
上述例子中，对象 p 没有属于它自己的 f 属性，它的 f 属性继承自它的原型。当执行 p.f()时，会查找 p 的原型链，找到 f 函数并执行。因为 f 是作为 p 的方法调用的，所以函数中的 this 指向 p。

（2）相同的概念也适用于当函数在一个 getter 或者 setter 中被调用。用作 getter 或 setter 的函数都会把 this 绑定到设置或获取属性的对象。<br>
（3）call()和 apply()方法：当函数通过 Function 对象的原型中继承的方法 call() 和 apply() 方法调用时， 其函数内部的 this 值可绑定到 call() & apply() 方法指定的第一个对象上， 如果第一个参数不是对象，JavaScript 内部会尝试将其转换成对象然后指向它。
```js
function add(c, d) {
  return this.a + this.b + c + d;
}
var o = {
  a: 1,
  b: 3
};

add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34

function tt() {
  console.log(this);
}
// 第一个参数不是对象，JavaScript内部会尝试将其转换成对象然后指向它。
tt.call(5); // 内部转成 Number {[[PrimitiveValue]]: 5}
tt.call("asd"); // 内部转成 String {0: "a", 1: "s", 2: "d", length: 3, [[PrimitiveValue]]: "asd"}
```
（4）bind()方法：由 ES5 引入， 在 Function 的原型链上， Function.prototype.bind。通过 bind 方法绑定后， 函数将被永远绑定在其第一个参数对象上， 而无论其在什么情况下被调用。
```js
function f() {
  return this.a;
}

var g = f.bind({
  a: "azerty"
});
console.log(g()); // azerty

var o = {
  a: 37,
  f: f,
  g: g
};
console.log(o.f(), o.g()); // 37, azerty
```

#### 构造函数中的 this
当一个函数用作构造函数时（使用 new 关键字），它的 this 被绑定到正在构造的新对象。构造器返回的默认值是 this 所指的那个对象，也可以手动返回其他的对象。
```js
function C() {
  this.a = 37;
}

var o = new C();
console.log(o.a); // 37
// 为什么this会指向o？首先new关键字会创建一个空的对象，然后会自动调用一个函数apply方法，将this指向这个空对象，这样的话函数内部的this就会被这个空的对象替代。

function C2() {
  this.a = 37;
  return {
    a: 38
  }; // 手动设置返回{a:38}对象
}

o = new C2();
console.log(o.a); // 38
```
特殊例子：当 this 碰到 return 时
```js
// 例子1
function fn() {
  this.user = "追梦子";
  return {};
}
var a = new fn();
console.log(a.user); //undefined
// 例子2
function fn() {
  this.user = "追梦子";
  return function() {};
}
var a = new fn();
console.log(a.user); //undefined
// 例子3
function fn() {
  this.user = "追梦子";
  return 1;
}
var a = new fn();
console.log(a.user); //追梦子
// 例子4
function fn() {
  this.user = "追梦子";
  return undefined;
}
var a = new fn();
console.log(a.user); //追梦子
// 例子5
function fn() {
  this.user = "追梦子";
  return undefined;
}
var a = new fn();
console.log(a); //fn {user: "追梦子"}
// 例子6
// 虽然null也是对象，但是在这里this还是指向那个函数的实例，因为null比较特殊
function fn() {
  this.user = "追梦子";
  return null;
}
var a = new fn();
console.log(a.user); //追梦子

// 总结：如果返回值是一个对象，那么this指向的就是那个返回的对象，如果返回值不是一个对象那么this还是指向函数的实例。
```

#### setTimeout & setInterval
（1）对于延时函数内部的回调函数的 this 指向全局对象 window；<br>
（2）可以通过 bind()方法改变内部函数 this 指向。
```js
//默认情况下代码
function Person() {
  this.age = 0;
  setTimeout(function() {
    console.log(this);
  }, 3000);
}

var p = new Person(); //3秒后返回 window 对象
//通过bind绑定
function Person() {
  this.age = 0;
  setTimeout(
    function() {
      console.log(this);
    }.bind(this),
    3000
  );
}
var p = new Person(); //3秒后返回构造函数新生成的对象 Person{...}
```

### 在 DOM 事件中
#### 作为一个 DOM 事件处理函数
当函数被用作事件处理函数时，它的 this 指向触发事件的元素（针对 addEventListener 事件）。
```js
// 被调用时，将关联的元素变成蓝色
function bluify(e) {
  //this指向所点击元素
  console.log("this === e.currentTarget", this === e.currentTarget); // 总是 true
  // 当 currentTarget 和 target 是同一个对象时为 true
  console.log("this === e.target", this === e.target);
  this.style.backgroundColor = "#A5D9F3";
}

// 获取文档中的所有元素的列表
var elements = document.getElementsByTagName("*");

// 将bluify作为元素的点击监听函数，当元素被点击时，就会变成蓝色
for (var i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", bluify, false);
}
```

#### 作为一个内联事件处理函数
（1）当代码被内联处理函数调用时，它的 this 指向监听器所在的 DOM 元素；<br>
（2）当代码被包括在函数内部执行时，其 this 指向等同于 普通函数直接调用的情况，即在非严格模式指向全局对象 window，在严格模式指向 undefined：
```js
<button onclick="console.log(this)">show me</button>
<button onclick="(function () {console.log(this)})()">show inner this</button>
<button onclick="(function () {'use strict'; console.log(this)})()">
  use strict
</button>
```
```
// 控制台打印
<button onclick="console.log(this)">show me</button>
Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, parent: Window, …}
undefined
```

### 箭头函数
#### 全局环境中
在全局代码中，箭头函数被设置为全局对象：
```js
var globalObject = this;
var foo = () => this;
console.log(foo() === globalObject); // true
```

#### this 捕获上下文
箭头函数没有自己的 this，而是使用箭头函数所在的作用域的 this，即指向箭头函数定义时（而不是运行时）所在的作用域。
```js
//1、箭头函数在函数内部，以非方法的方法使用
function Person() {
  this.age = 0;
  setInterval(() => {
    this.age++;
  }, 3000);
}
var p = new Person(); //Person{age: 0}

//普通函数作为内部函数
function Person() {
  this.age = 0;
  setInterval(function() {
    console.log(this);
    this.age++;
  }, 3000);
}
var p = new Person(); //Window{...}
```

#### this 捕获上下文
箭头函数没有自己的 this，而是使用箭头函数所在的作用域的 this，即指向箭头函数定义时（而不是运行时）所在的作用域。
```js
//1、箭头函数在函数内部，以非方法的方法使用
function Person() {
  this.age = 0;
  setInterval(() => {
    console.log(this);
    this.age++;
  }, 3000);
}
var p = new Person(); //Person{age: 0}

//普通函数作为内部函数
function Person() {
  this.age = 0;
  setInterval(function() {
    console.log(this);
    this.age++;
  }, 3000);
}
var p = new Person(); //Window{...}
```
在 setTimeout 中的 this 指向了构造函数新生成的对象，而普通函数指向了全局 window 对象。

#### 箭头函数作为对象的方法使用
箭头函数作为对象的方法使用，指向全局 window 对象；而普通函数作为对象的方法使用，则指向调用的对象。
```js
var obj = {
  i: 10,
  b: () => console.log(this.i, this),
  c: function() {
    console.log(this.i, this);
  }
};
obj.b(); // undefined window{...}
obj.c(); // 10 Object {...}
```

#### 箭头函数中，call()、apply()、bind()方法无效
```js
var adder = {
  base: 1,
  //对象的方法内部定义箭头函数，this是箭头函数所在的作用域的this，
  //而方法add的this指向adder对象，所以箭头函数的this也指向adder对象。
  add: function(a) {
    var f = v => v + this.base;
    return f(a);
  },
  //普通函数f1的this指向window
  add1: function() {
    var f1 = function() {
      console.log(this);
    };
    return f1();
  },
  addThruCall: function inFun(a) {
    var f = v => v + this.base;
    var b = {
      base: 2
    };

    return f.call(b, a);
  }
};

console.log(adder.add(1)); // 输出 2
adder.add1(); //输出全局对象 window{...}
console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3，其内部的this并没有因为call() 而改变，其this值仍然为函数inFun的this值，指向对象adder
```

#### this 指向固定化
箭头函数可以让 this 指向固定化，这种特性很有利于封装回调函数
```js
var handler = {
  id: "123456",
  init: function() {
    document.addEventListener(
      "click",
      event => this.doSomething(event.type),
      false
    );
  },

  doSomething: function(type) {
    console.log("Handling " + type + " for " + this.id);
  }
};
```
上面代码的 init 方法中，使用了箭头函数，这导致这个箭头函数里面的 this，总是指向 handler 对象。如果不使用箭头函数则指向全局 document 对象。

#### 箭头函是不适用场景
（1）箭头函数不适合定义对象的方法（方法内有 this），因为此时指向 window；<br>
（2）需要动态 this 的时候，也不应使用箭头函数。
```js
//例1，this指向定义箭头函数所在的作用域，它位于对象cat内，但cat不能构成一个作用域，所以指向全局window，改成普通函数后this指向cat对象。
const cat = {
  lives: 9,
  jumps: () => {
    this.lives--;
  }
};

//例2，此时this也是指向window，不能动态监听button，改成普通函数后this指向按钮对象。
var button = document.getElementById("press");
button.addEventListener("click", () => {
  this.classList.toggle("on");
});
```

## 66、正则表达式构造函数 var reg = new RegExp('xxx')与正则表达字面量 var reg = // 有什么不同？
使用正则表达字面量的效率更高。

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
其次，在当使用构造函数的时候，在这里要使用四个反斜杠才能匹配单个反斜杠。这使得正则表达式模式显得更长，更加难以阅读和修改。正确来说，当使用 RegExp() 构造函数的时候，不仅需要转义引号（即"表示"），并且通常还需要双反斜杠（即\表示一个\）。<br>
使用 new RegExp() 的原因之一在于，某些场景中无法事先确定模式，而只能在运行时以字符串方式创建。


## 67、js 中 callee 与 caller 的作用
### caller
返回一个调用当前函数的引用 如果是由顶层调用的话 则返回 null。举个栗子哈 caller 给你打电话的人 谁给你打电话了 谁调用了你 很显然是下面 a 函数的执行 只有在打电话的时候你才能知道打电话的人是谁 所以对于函数来说 只有 caller 在函数执行的时候才存在）
```js
var callerTest = function() {
  console.log(callerTest.caller);
};

function a() {
  callerTest();
}
a(); //输出function a() {callerTest();}
callerTest(); //输出null
```

### callee
返回一个正在被执行函数的引用。（这里常用来递归匿名函数本身 但是在严格模式下不可行）<br>
callee 是 arguments 对象的一个成员 表示对函数对象本身的引用 它有个 length 属性（代表形参的长度）
```js
var c = function(x, y) {
  console.log(arguments.length, arguments.callee.length, arguments.callee);
};
c(1, 2, 3); //输出3 2 function(x,y) {console.log(arguments.length,arguments.callee.length,arguments.callee)}
```


## 68、异步加载 js 的方法
**<p>方案一</p>**
`<script>`标签的 async="async" 属性（详细参见：script 标签的 async 属性）<br>
点评：HTML5 中新增的属性，Chrome、FF、IE9&IE9+均支持（IE6~8 不支持）。此外，这种方法不能保证脚本按顺序执行。

**<p>方案二</p>**
`<script>`标签的 defer="defer" 属性<br>
点评：兼容所有浏览器。此外，这种方法可以确保所有设置 defer 属性的脚本按顺序执行。

**<p>方案三</p>**
动态创建 `<script>` 标签
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
  </script>
</head>

<body>
  <img src="http://xybtv.com/uploads/allimg/100601/48-100601162913.jpg" />
</body>

</html>
```
点评：兼容所有浏览器。

**<p>方案四</p>**
AJAX eval（使用 AJAX 得到脚本内容，然后通过 eval_r(xmlhttp.responseText)来运行脚本）<br>
点评：兼容所有浏览器。

**<p>方案五</p>**
iframe 方式（这里可以参照：iframe 异步加载技术及性能 中关于 Meboo 的部分）<br>
点评：兼容所有浏览器。


## 69、❓去除数组重复成员的方法（数组去重）
**扩展运算符和 Set 结构相结合**
```js
// 去除数组的重复成员
[...new Set([1, 2, 2, 3, 4, 5, 5])];
// [1, 2, 3, 4, 5]
```

**Array.from和 Set 结构结合**
```js
function dedupe(array) {
  return Array.from(new Set(array));
}
dedupe([1, 1, 2, 3]); // [1, 2, 3]
```

**使用循环**
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


## 70、❓去除字符串里面的重复字符
```js
[...new Set("ababbc")].join(""); // "abc"
```


## 71、❓求数组的最大值
Math.max.apply(null, 数组)
```js
var a = [1, 2, 3, 5];
alert(Math.max.apply(null, a)); //最大值
alert(Math.min.apply(null, a)); //最小值
```


## 72、❓JS 中 文档碎片的理解和使用
**什么是文档碎片？**
```js
document.createDocumentFragment(); // 一个容器，用于暂时存放创建的dom元素
```

**文档碎片有什么用？**<br>
将需要添加的大量元素,先添加到文档碎片中，再将文档碎片添加到需要插入的位置，大大 减少dom操作，提高性能（IE和火狐比较明显）
```js
// 普通方式：（操作了100次dom）
for (var i = 100; i > 0; i--) {
  var elem = document.createElement("div");
  document.body.appendChild(elem); //放到body中
}

//  文档碎片：(操作1次dom)
var df = document.createDocumentFragment();
for (var i = 100; i > 0; i--) {
  var elem = document.createElement("div");
  df.appendChild(elem);
}
//最后放入到页面上
document.body.appendChild(df);
```


## 73、❓说说你对作用域链的理解
作用域链的作用是保证执行环境里有权访问的变量和函数是有序的，作用域链的变量只能向上访问，变量访问到 window 对象即被终止，作用域链向下访问变量是不被允许的。


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


## 75、❓谈谈你对 AMD、CMD 的理解


## 76、❓web 开发中会话跟踪的方法有哪些


## 77、❓说几条写 JavaScript 的基本规范？
在平常项目开发中，我们遵守一些这样的基本规范，比如说：
1. 一个函数作用域中所有的变量声明应该尽量提到函数首部，用一个 var 声明，不允许出现两个连续的 var 声明，声明时如果变量没有值，应该给该变量赋值对应类型的初始值，便于他人阅读代码时，能够一目了然的知道变量对应的类型值。
2. 代码中出现地址、时间等字符串时需要使用常量代替。
3. 在进行比较的时候吧，尽量使用'===', '!=='代替'==', '!='。
4. 不要在内置对象的原型上添加方法，如 Array, Date。
5. switch 语句必须带有 default 分支。
6. for 循环必须使用大括号。
7. if 语句必须使用大括号。


## 78、❓JavaScript 有几种类型的值？你能画一下他们的内存图吗？


## 79、❓eval 是做什么的？
它的功能是把对应的字符串解析成 JS 代码并运行 2.应该避免使用 eval，不安全，非常耗性能（2 次，一次解析成 js 语句，一次执行）


## 80、❓attribute 和 property 的区别是什么？


## 81、❓谈一谈你理解的函数式编程？
函数式编程是种编程方式，它将电脑运算视为函数的计算。函数编程语言最重要的基础是λ演算（lambda calculus），而且λ演算的函数可以接受函数当作输入（参数）和输出（返回值）。

优势特点：代码简洁、开发快速、命令式实现、函数式实现、易于理解，抽象度高、没有副作用，变量无状态


## 82、❓UIWebView 和 JavaScript 之间是怎么交互的?


## 83、❓在 js 中哪些会被隐式转换为 false
Undefined、null、关键字 false、NaN、零、空字符串


## 84、列举浏览器对象模型 BOM 里常用的至少 4 个对象，并列举 window 对象的常用方法至少 5 个？
- 对象：Window，document，location，screen，history，navigator。
- 方法：alert()，confirm()，prompt()，open()，close()。


## 85、外部 JS 文件出现中文字符，会出现什么问题，怎么解决？
会出现乱码，加 charset="GB2312";


## 86、定时器 setInterval 有一个有名函数 fn1，setInterval（fn1, 500）与 setInterval（fn1(), 500）有什么区别？
第一个是重复执行每 500 毫秒执行一次，后面一个只执行一次。


## 87、自动分号
有时 JavaScript 会自动为代码行补上缺失的分号，即自动分号插入（Automatic SemicolonInsertion，ASI）。<br>
因为如果缺失了必要的`;`，代码将无法运行，语言的容错性也会降低。ASI 能让我们忽略那些不必要的。<br>
请注意，ASI 只在换行符处起作用，而不会在代码行的中间插入分号。<br>
如果 JavaScript 解析器发现代码行可能因为缺失分号而导致错误，那么它就会自动补上分号。并且，只有在代码行末尾与换行符之间除了空格和注释之外没有别的内容时，它才会这样做。


## 88、❓你用过 require.js吗？它有什么特性？
（1）实现 js 文件的异步加载，避免网页失去响应；
（2）管理模块之间的依赖性，便于代码的编写和维护


## 89、内置函数(原生函数)
- String
- Number
- Boolean
- Object
- Function
- Array
- Date
- RegExp
- Error
- Symbol


## 90、❓对象浅拷贝和深拷贝有什么区别
**浅拷贝**指的是将一个对象的属性值复制到另一个对象，如果有的属性的值为引用类型的话，那么会将这个引用的地址复制给对象，因此两个对象会有同一个引用类型的引用。浅拷贝可以使用  Object.assign 和展开运算符来实现。

**深拷贝**相对浅拷贝而言，如果遇到属性值为引用类型的时候，它新建一个引用类型并将对应的值复制给它，因此对象获得的一个新的引用类型而不是一个原有类型的引用。深拷贝对于一些对象可以使用 JSON 的两个函数来实现，但是由于 JSON 的对象格式比 js 的对象格式更加严格，所以如果属性值里边出现函数或者 Symbol 类型的值时，会转换失败。


## 91、如何编写高性能的 Javascript？
- 使用 DocumentFragment 优化多次 append
- 通过模板元素 clone ，替代 createElement
- 使用一次 innerHTML 赋值代替构建 dom 元素
- 使用 firstChild 和 nextSibling 代替 childNodes 遍历 dom 元素
- 使用 Array 做为 StringBuffer ，代替字符串拼接的操作
- 将循环控制量保存到局部变量
- 顺序无关的遍历时，用 while 替代 for
- 将条件分支，按可能性顺序从高到低排列
- 在同一条件子的多（ >2 ）条件分支时，使用 switch 优于 if
- 使用三目运算符替代条件分支
- 需要不断执行的时候，优先考虑使用 setInterval


## 92、documen.write 和 innerHTML 的区别?
1. document.write 是重写整个 document, 写入内容是字符串的 html
2. innerHTML 是 HTMLElement 的属性，是一个元素的内部 html 内容


## 93、❓让你自己设计实现一个 requireJS，你会怎么做？


## 94、❓requireJS 的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何缓存的？）
核心是 js 的加载模块，通过正则匹配模块以及模块的依赖关系，保证文件加载的先后顺序，根据文件的路径对加载过的文件做了缓存。


## 95、Javascript中，执行时对象查找时，永远不会去查找原型的函数?
Object.hasOwnProperty(proName)：是用来判断一个对象是否有你给出名称的属性。不过需要注意的是，此方法无法检查该对象的原型链中是否具有该属性，该属性必须是对象本身的一个成员。


## 96、❓用原生 JavaScript 的实现过什么功能吗？
轮播图、手风琴、放大镜、3D动画效果等，切记，所答的一定要知道实现原理！，不知道还不如不说！


## 97、简述创建函数的几种方式
```js
第一种（函数声明）：
function sum1(num1,num2){
  return num1+num2;
}
第二种（函数表达式）：
var sum2 = function(num1,num2){
  return num1+num2;
}
第三种（函数对象方式）：
var sum3 = new Function("num1","num2","return num1+num2");
```


## 98、window.location.search() 返回的是什么？
查询(参数)部分。除了给动态语言赋值以外，我们同样可以给静态页面, 并使用 javascript 来获得相信应的参数值 返回值：?ver=1.0&id=timlq 也就是问号后面的


## 99、window.location.hash  返回的是什么？
锚点，返回值：#love ；


## 100、window.location.reload() 作用？
刷新当前页面


## 101、BOM 对象有哪些，列举 window 对象？
- window对象 ，是JS的最顶层对象，其他的BOM对象都是window对象的属性；
- document对象，文档对象；
- location对象，浏览器当前URL信息；
- navigator对象，浏览器本身信息；
- screen对象，客户端屏幕信息；
- history对象，浏览器访问历史信息；


## 102、❓简述 readonly 与 disabled 的区别


## 103、❓为什么扩展 javascript 内置对象不是好的做法？


## 104、什么是三元表达式？“三元”表示什么意思？
三元如名字表示的三元运算符需要三个操作数。<br>
语法是`条件 ? 结果1 : 结果2;` 这里你把条件写在问号(?)的前面后面跟着用冒号(:)分隔的结果1和结果2。满足条件时结果1否则结果2。


## 105、简述一下 Handlebars 的基本用法？
> 参考：https://blog.csdn.net/henryhu712/article/details/125755611

Web 模板引擎是为了使用户界面与业务数据（内容）分离而产生的，Handlebars 是 JavaScript 一个语义模板库，通过对 view 和 data 的分离来快速构建 Web 模板。
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
![202302150946079.png](https://imgs.itchenliang.club/img/202302150946079.png)


## 106、❓知道什么是 webkit 么? 知道怎么用浏览器的各种工具来调试和 debug 代码么?
Webkit 是浏览器引擎，包括 html 渲染和 js 解析功能，手机浏览器的主流内核，与之相对应的引擎有 Gecko（Mozilla Firefox 等使用）和 Trident（也称 MSHTML，IE 使用）。 对于浏览器的调试工具要熟练使用，主要是页面结构分析，后台请求信息查看，js 调试工具使用，熟练使用这些工具可以快速提高解决问题的效率。


## 107、❓如何测试前端代码? 知道 BDD, TDD, Unit Test 么? 知道怎么测试你的前端工程么(mocha, sinon, jasmin, qUnit..)?


## 108、如何添加 html 元素的事件，有几种方法？请列举
方法一：在HTML元素当中绑定事件
```html
<div class="wrap" onclick="show()">绑定事件一</div>
<script type="text/javascript">
  function show() {
    alert('绑定事件一');
  }
</script>
```
方法二：使用js给元素绑定事件
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
方法三：使用事件注册函数
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


## 109、❓如何自定义事件？
原生提供了 3 个方法实现自定义事件
1. createEvent，设置事件类型，是 html 事件还是 鼠标事件
2. initEvent 初始化事件，事件名称，是否允许冒泡，是否阻止自定义事件
3. dispatchEvent 触发事件


## 110、target 和 currentTarget 区别？
- event.target：返回触发事件的元素
- event.currentTarget：返回绑定事件的元素


## 111、❓什么是原型属性？
从构造函数的prototype属性出发找到原型，这时候就把原型称之为构造函数的原型属性。


## 112、❓什么是原型对象？
从实例的__proto__出发，找到原型，这时候就把原型称之为实例的原型对象。


## 113、❓JSON 的了解
JSON(JavaScript Object Notation) 是一种基于文本的轻量级的数据交换格式。它可以被任何的编程语言读取和作为数据格式来传递。

在项目开发中，我们使用 JSON 作为前后端数据交换的方式。在前端我们通过将一个符合 JSON 格式的数据结构序列化为 JSON 字符串，然后将它传递到后端，后端通过 JSON 格式的字符串解析后生成对应的数据结构，以此来实现前后端数据的一个传递。


## 114、事件代理怎么实现？
在元素的父节点注册事件，通过事件冒泡，在父节点捕获事件。


## 115、❓什么是属性搜索原则？
1. 首先会去查找对象本身上面有没有这个属性，有的话，就返回这个属性
2. 如果对象本身上面没有这个属性，就到它的原型上面去查找，如果有，就返回
3. 然后又在原型的原型上面去查找有没有这个属性，如果查找到最后一直没有找到，就返回一个undefined


## 116、❓如何避免重绘或者重排？
1. 分离读写操作
  ```js
  var curLeft = div.offsetLeft;
  var curTop = div.offsetTop;
  div.style.left = curLeft + 1 + 'px';
  div.style.top = curTop + 1 + 'px';
  ```
2. 样式集中改变
  ```js
  可以添加一个类，样式都在类中改变
  ```
3. 可以使用absolute脱离文档流
4. 使用 display:none ，不使用 visibility，也不要改变 它的 z-index
5. 能用css3实现的就用css3实现


## 117、delete 数组的 item，数组的 length 是否会 -1
**delete Array[index]**
```js
const arr = ['a', 'b', 'c', 'd', 'e'];
let result = delete arr[1];
console.log(result); // true;
console.log(arr); // ['a', undefined, 'c', 'd', 'e']
console.log(arr.length); // 5
console.log(arr[1]); // undefined
```
使用delete删除元素，返回true和false, true表示删除成功，false表示删除失败。使用delete删除数组元素并不会改变原数组的长度，只是把被删除元素的值变为undefined。


## 118、给出 ['1', '3', '10'].map(parseInt) 执行结果
```js
[1, NaN, 2]
```
因为map的参数是
```js
function(current, index, arr) { // 当前元素值，当前元素索引值，数组本身
}
```
parseInt的参数是：
```js
parseInt(str, radix) // 解析的字符串，⼏进制（若省略或为0，则以10进⾏解析，若⼩于2或者⼤于36，则返回NaN）
```
所以该题展开来写：
```js
const result = ['1', '3', '10'].map(function(cur, index, arr) {
return parseInt(cur, index);
});
// 执⾏过程：
// parseInt('1', 0) -> 1
// parseInt('3', 1) -> NaN
// parseInt('10', 2) -> 2
```


## 119、❓执行上下文


## 120、❓怎样理解setTimeout 执行误差
定时器是属于 宏任务(macrotask) 。如果当前 执行栈 所花费的时间大于 定时器 时间，那么定时器的回调在 宏任务(macrotask) 里，来不及去调用，所有这个时间会有误差。


## 121、数组降维
1. 数组字符串化
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
2. 利用apply和concat转换
  ```js
  function reduceDimension(arr) {
    return Array.prototype.concat.apply([], arr);
  }

  console.log(reduceDimension([
    [123], 4, [7, 8],
    [9, [111]]
  ])); // [123, 4, 7, 8, 9, Array(1)]
  ```
3. 递归
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
4. Array​.prototype​.flat()
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
5. 使用 reduce、concat 和递归无限反嵌套多层嵌套的数组
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


## 123、❓轮播图实现原理
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


## 124、❓如何设计一个轮播图组件
1. 轮播图功能实现
2. 抽出需要传入的变量，如：背景图，文案描述等


## 125、❓微任务和宏任务
事件循环是一个宏观的表述，其实异步任务之间并不完全相同，其执行时机有所区别。细分来说的话异步任务分为两种：microtask 与 macrotask

- 宏任务macrotask 主要有：script(整体代码)、setTimeout、setInterval、I/O、UI交互事件、postMessage、MessageChannel、setImmediate(Node.js 环境)
- 微任务microtask 主要有：process.nextTick,Promises【new Promise().then(回调)】,MutationObserver(html5 新特性)

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
// start 0 1 2 3 4 end 都是同步代码。同步任务执行完，开始判断微任务是否为空。显然现在还有一个微任务Promise，那么开始执行Promise，输出6；执行完Promise，微任务清空，微任务队列也为空了，然后重新渲染，再次判断任务队列中是否有任务。此时任务队列中有setTimeout宏任务，开始执行，于是最后输出setTimeout
```


## 126、JavaScript 中 undefined 和 not defined 的区别
undefined是没有初始化，not defined是没有声明


## 127、在JavaScript中创建一个真正的private方法有什么缺点？
每一个对象都会创建一个private方法的方法，这样很耗费内存
```js
var Employee = function(name, company, salary) {
  this.name = name || "";
  this.company = company || "";
  this.salary = salary || 5000;

  // Private method
  var increaseSalary = function() {
    this.salary = this.salary + 1000;
  };

  // Public method
  this.dispalyIncreasedSalary = function() {
    increaseSlary();
    console.log(this.salary);
  };
};

// Create Employee class object
var emp1 = new Employee("John", "Pluto", 3000);
// Create Employee class object
var emp2 = new Employee("Merry", "Pluto", 2000);
// Create Employee class object
var emp3 = new Employee("Ren", "Pluto", 2500);
```
在这里 emp1, emp2, emp3都有一个increaseSalary私有方法的副本。所以我们除非必要，非常不推荐使用私有方法。


## 128、❓JavaScript怎么清空数组？
**方法1**
```js
arrayList = [];
```
直接改变arrayList所指向的对象，原对象并不改变。

**方法2**
```js
arrayList.length = 0;
```
这种方法通过设置length=0 使原数组清除元素。

**方法3**
```js
arrayList.splice(0, arrayList.length);
```


## 129、❓怎么判断一个object是否是数组(array)？
**方法1**：使用 Object.prototype.toString 来判断是否是数组
```js
Object.prototype.toString.call({}) === '[object Object]';
Object.prototype.toString.call([]) === '[object Array]';
```
这里使用call来使 toString 中 this 指向 obj。进而完成判断

**方法二**：使用 原型链 来完成判断
```js
obj.__proto__ === Array.prototype
```
基本思想是利用 实例如果是某个构造函数构造出来的那么 它的 `__proto__`是指向构造函数的 `prototype` 属性。

**方法3**：使用`Array.isArray`判断
```js
Array.isArray(obj)
```


## 130、两种函数声明有什么区别？
```js
var foo = function() {
  // Some code
};

function bar() {
  // Some code
};
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
```
undefined
function bar(){ 
  // Some code
}; 
```
为什么那？为什么 foo 打印出来是 undefined，而 bar打印出来却是函数？

JavaScript在执行时，会将变量提升。所以上面代码JavaScript 引擎在实际执行时按这个顺序执行。
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


## 131、❓什么是跨域？跨域请求资源的方法有哪些？

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
3. jsonp<br>
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


## 134、❓怎么判断两个json对象的内容相等？
```js
obj = { a: 1, b: 2 }
obj2 = { a: 1, b: 2 }
obj3 = { a: 1, b: 2 }
JSON.stringify(obj) == JSON.stringify(obj2); //true
JSON.stringify(obj) == JSON.stringify(obj3); //false
```


## 135、关于函数的 length 属性
```js
(() => 1).length === 0; // 输出true
```
函数是有 length 属性的，函数的 length 属性就是函数参数的个数，函数的参数就是 arguments，而 arguments 也是一个类数组对象所以他是有 length 属性的


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
链表是一种物理存储单元上非连续、非顺序的存储结构。链表由一系列结点组成，结点可以在运行时动态生成。每个结点包括两个部分：一个是存储数据元素的数据域，另一个是存储下一个结点地址的指针域。


## 138、链表的基本特征
- 每个元素除了存储数据，需要有额外的内存存储一个引用（地址），来指向下一个元素；
- 每个元素占用的内存空间并不要求是连续的；
- 往往使用链表的第一个节点（根节点）来代表整个链表；
- 长度是可变的，随时可以增加和删除元素；
- 插入和删除元素的效率极高；
- 由于要存储下一个元素的地址，会增加额外的内存开销；
- 通过下标查询链表中的某个节点，效率很低，因此链表的下标遍历效率低。


## 139、如何查找一篇英文文章中出现频率最高的单词？
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


## 140、❓什么是堆？什么是栈？它们之间有什么区别和联系？
堆和栈的概念存在于数据结构中和操作系统内存中。在数据结构中，栈中数据的存取方式为先进后出。而堆是一个优先队列，是按优先级来进行排序的，优先级可以按照大小来规定。完全二叉树是堆的一种实现方式。在操作系统中，内存被分为栈区和堆区。

栈区内存由编译器自动分配释放，存放函数的参数值，局部变量的值等。其操作方式类似于数据结构中的栈。

堆区内存一般由程序员分配释放，若程序员不释放，程序结束时可能由垃圾回收机制回收。


## 141、❓undefined 与 undeclared 的区别？
已在作用域中声明但还没有赋值的变量，是 undefined 的。相反，还没有在作用域中声明过的变量，是 undeclared 的。

对于 undeclared 变量的引用，浏览器会报引用错误，如 ReferenceError: b is not defined 。但是我们可以使用 typ
eof 的安全防范机制来避免报错，因为对于 undeclared（或者 not defined ）变量，typeof 会返回 "undefined"。


## 142、❓如何获取安全的 undefined 值？
因为 undefined 是一个标识符，所以可以被当作变量来使用和赋值，但是这样会影响 undefined 的正常判断。<br>
表达式 `void ___` 没有返回值，因此返回结果是 `undefined`。void 并不改变表达式的结果，只是让表达式不返回值。<br>
按惯例我们用 void 0 来获得 undefined。


## 143、js 获取原型的方法？
- `p.__proto__`
- `p.constructor.prototype`
- `Object.getPrototypeOf(p)`


## 144、在 js 中不同进制数字的表示方式
- 以 `0X、0x` 开头的表示为十六进制。
- 以 `0、0O、0o` 开头的表示为八进制。
- 以 `0B、0b` 开头的表示为二进制格式。


## 145、js 中整数的安全范围是多少
安全整数指的是，在这个范围内的整数转化为二进制存储的时候不会出现精度丢失，能够被“安全”呈现的最大整数是 2^53 - 1，即9007199254740991，在 ES6 中被定义为 `Number.MAX_SAFE_INTEGER`。最小整数是-9007199254740991，在 ES6 中被定义为 `Number.MIN_SAFE_INTEGER`。

如果某次计算的结果得到了一个超过 JavaScript 数值范围的值，那么这个值会被自动转换为特殊的 Infinity 值。如果某次计算返回了正或负的Infinity 值，那么该值将无法参与下一次的计算。判断一个数是不是有穷的，可以使用 isFinite 函数来判断。


## 146、typeof NaN 的结果是什么？
NaN 意指“不是一个数字”（not a number），NaN 是一个“警戒值”（sentinel value，有特殊用途的常规值），用于指出数字类型中的错误情况，即“执行数学运算没有成功，这是失败后返回的结果”。
```js
typeof NaN; // "number"
```
NaN 是一个特殊值，它和自身不相等，是唯一一个非自反（自反，reflexive，即 x === x 不成立）的值。而 NaN != NaN 为 true。


## 147、isNaN 和 Number.isNaN 函数的区别？
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


## 148、Array 构造函数只有一个参数值时的表现？
Array 构造函数只带一个数字参数的时候，该参数会被作为数组的预设长度（`length`），而非只充当数组中的一个元素。这样创建出来的只是一个空数组，只不过它的 `length` 属性被设置成了指定的值。
```js
// 常规方式
var arr1 = new Array(3) // new Array()
arr1[0] = 'a'
arr1[1] = 'b'
arr1[2] = 'c'

// 简洁方式
var arr2 = new Array('a', 'b', 'c')

// 字面方式
var arr3 = ['a', 'b', 'c']
```

构造函数 Array(..) 不要求必须带 new 关键字。不带时，它会被自动补上。
```js
Array(4) // [empty x 4]
new Array(4) // [empty x 4]
```


## 149、❓其他值到字符串的转换规则？


## 150、❓其他值到数字值的转换规则？


## 151、❓其他值到布尔类型的值的转换规则？


## 152、{} 和 [] 的 valueOf 和 toString 的结果是什么？
- {} 的 valueOf 结果为 {} ，toString 的结果为 "[object Object]"
- [] 的 valueOf 结果为 [] ，toString 的结果为 ""
```js
let a = {}
a.valueOf() // {}
a.toString() // "[object Object]"

let b = []
b.valueOf() // []
b.toString() // ""
```

## 153、什么是假值对象？
浏览器在某些特定情况下，在常规 JavaScript 语法基础上自己创建了一些外来值，这些就是“假值对象”。假值对象看起来和普通对象并无二致（都有属性，等等），但将它们强制类型转换为布尔值时结果为 false 最常见的例子是 `document.all`，它是一个类数组对象，包含了页面上的所有元素，由 DOM（而不是 JavaScript 引擎）提供给 JavaScript 程序使用。


## 154、❓~ 操作符的作用？
~ 返回 2 的补码，并且 ~ 会将数字转换为 32 位整数，因此我们可以使用 ~ 来进行取整操作。<br>
~x 大致等同于 -(x+1)。


## 155、解析字符串中的数字和将字符串强制类型转换为数字的返回结果都是数字，它们之间的区别是什么？
解析允许字符串（如 `parseInt()` ）中含有非数字字符，解析按从左到右的顺序，如果遇到非数字字符就停止。而转换（如 `Number()`）不允许出现非数字字符，否则会失败并返回 NaN。


## 156、+ 操作符什么时候用于字符串的拼接？
简单来说就是，如果 + 的其中一个操作数是字符串（或者通过以上步骤最终得到字符串），则执行字符串拼接，否则执行数字加法。<br>
对于除了加法的运算符来说，只要其中一方是数字，那么另一方就会被转为数字。
```js
'4' / 2 = 2
```


## 157、什么情况下会发生布尔值的隐式强制类型转换？
- （1） `if (..)` 语句中的条件判断表达式。
- （2） `for ( ..; ..; ..)` 语句中的条件判断表达式（第二个）。
- （3） `while (..)` 和 `do..while(..)` 循环中的条件判断表达式。
- （4） `? : `中的条件判断表达式。
- （5） `逻辑运算符 ||（逻辑或）和 &&（逻辑与）` 左边的操作数（作为条件判断表达式）。


## 158、|| 和 && 操作符的返回值？
`||` 和 `&&` 首先会对第一个操作数执行条件判断，如果其不是布尔值就先进行 ToBoolean 强制类型转换，然后再执行条件判断。<br>
对于 `||` 来说，如果条件判断结果为 true 就返回第一个操作数的值，如果为 false 就返回第二个操作数的值。<br>
`&&` 则相反，如果条件判断结果为 true 就返回第二个操作数的值，如果为 false 就返回第一个操作数的值。<br>
`||` 和 `&&` 返回它们其中一个操作数的值，而非条件判断的结果


## 159、Symbol 值的强制类型转换？
ES6 允许从符号到字符串的显式强制类型转换，然而隐式强制类型转换会产生错误。<br>
Symbol 值不能够被强制类型转换为数字（显式和隐式都会产生错误），但可以被强制类型转换为布尔值（显式和隐式结果都是 true ）。


## 160、== 操作符的强制类型转换规则？
- （1）字符串和数字之间的相等比较，将字符串转换为数字之后再进行比较。
- （2）其他类型和布尔类型之间的相等比较，先将布尔值转换为数字后，再应用其他规则进行比较。
- （3）null 和 undefined 之间的相等比较，结果为真。其他值和它们进行比较都返回假值。
- （4）对象和非对象之间的相等比较，对象先调用 ToPrimitive 抽象操作后，再进行比较。
- （5）如果一个操作值为 NaN ，则相等比较返回 false（ NaN 本身也不等于 NaN ）。
- （6）如果两个操作值都是对象，则比较它们是不是指向同一个对象。如果两个操作数都指向同一个对象，则相等操作符返回 true，否则，返回 false。


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
  return number && number.replace(/(?!^)(?=(\d{3})+\.)/g, ",");
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


## 164、❓什么是 DOM 和 BOM？
DOM 指的是文档对象模型，它指的是把文档当做一个对象来对待，这个对象主要定义了处理网页内容的方法和接口。

BOM 指的是浏览器对象模型，它指的是把浏览器当做一个对象来对待，这个对象主要定义了与浏览器进行交互的法和接口。BOM的核心是 window，而 window 对象具有双重角色，它既是通过 js 访问浏览器窗口的一个接口，又是一个 Global（全局）对象。这意味着在网页中定义的任何对象，变量和函数，都作为全局对象的一个属性或者方法存在。window 对象含有 location 对象、navigator 对象、screen 对象等子对象，并且 DOM 的最根本的对象 document 对象也是 BOM 的 window 对象的子对象。


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


## 168、❓谈一谈浏览器的缓存机制？


## 169、Ajax 解决浏览器缓存问题？
1. 在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("If-Modified-Since", "0")`。
2. 在 ajax 发送请求前加上 `anyAjaxObj.setRequestHeader("Cache-Control", "no-cache")`。
3. 在 URL 后面加上一个随机数：`"fresh=" + Math.random();`。
4. 在 URL 后面加上时间戳：`"nowtime=" + new Date().getTime();`。
5. 如果是使用 jQuery，直接这样就可以了`$.ajaxSetup({cache:false})`。这样页面的所有 ajax 都会执行这条语句就是不需要保存缓存记录。


## 170、同步和异步的区别？
- **同步**：指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，那么这个进程会一直等待下去，直到消息返回为止再继续向下执行。
- **异步**：指的是当一个进程在执行某个请求的时候，如果这个请求需要等待一段时间才能返回，这个时候进程会继续往下执行，不会阻塞等待消息的返回，当消息返回时系统再通知进程进行处理。


## 171、如何解决跨域问题？
1. 通过 jsonp 跨域
2. document.domain + iframe 跨域
3. location.hash + iframe
4. window.name + iframe 跨域
5. postMessage 跨域
6. nginx 代理跨域
7. nodejs 中间件代理跨域
8. WebSocket 协议跨
9. 跨域资源共享（CORS)

解决跨域的方法我们可以根据我们想要实现的目的来划分。

首先我们如果只是想要实现主域名下的不同子域名的跨域操作，我们可以使用设置 document.domain 来解决。
- （1）将 document.domain 设置为主域名，来实现相同子域名的跨域操作，这个时候主域名下的 cookie 就能够被子域名所访问。同时如果文档中含有主域名相同，子域名不同的 iframe 的话，我们也可以对这个 iframe 进行操作。如果是想要解决不同跨域窗口间的通信问题，比如说一个页面想要和页面的中的不同源的 iframe 进行通信的问题，我们可以使用 location.hash 或者 window.name 或者 postMessage 来解决。
- （2）使用 location.hash 的方法，我们可以在主页面动态的修改 iframe 窗口的 hash 值，然后在 iframe 窗口里实现监听函数来实现这样一个单向的通信。因为在 iframe 是没有办法访问到不同源的父级窗口的，所以我们不能直接修改父级窗口的 hash 值来实现通信，我们可以在 iframe 中再加入一个iframe ，这个 iframe 的内容是和父级页面同源的，所以我们可以 window.parent.parent 来修改最顶级页面的 src，以此来实现双向通信。
- （3）使用 window.name 的方法，主要是基于同一个窗口中设置了 window.name 后不同源的页面也可以访问，所以不同源的子页面可以首先在 window.name 中写入数据，然后跳转到一个和父级同源的页面。这个时候级页面就可以访问同源的子页面中 window.name 中的数据了，这种方式的好处是可以传输的数据量大。
- （4）使用 postMessage 来解决的方法，这是一个 h5 中新增的一个 api。通过它我们可以实现多窗口间的信息传递，通过获取到指定窗口的引用，然后调用 postMessage 来发送信息，在窗口中我们通过对 message 信息的监听来接收信息，以此来实现不同源间的信息交换。如果是像解决 ajax 无法提交跨域请求的问题，我们可以使用 jsonp、cors、websocket 协议、服务器代理来解决问题。
- （5）使用 jsonp 来实现跨域请求，它的主要原理是通过动态构建 script  标签来实现跨域请求，因为浏览器对 script 标签的引入没有跨域的访问限制 。通过在请求的 url 后指定一个回调函数，然后服务器在返回数据的时候，构建一个 json 数据的包装，这个包装就是回调函数，然后返回给前端，前端接收到数据后，因为请求的是脚本文件，所以会直接执行，这样我们先前定义好的回调函数就可以被调用，从而实现了跨域请求的处理。这种方式只能用于get 请求。
- （6）使用 CORS 的方式，CORS 是一个 W3C 标准，全称是"跨域资源共享"。CORS 需要浏览器和服务器同时支持。目前，所有浏览器都支持该功能，因此我们只需要在服务器端配置就行。浏览器将 CORS 请求分成两类：简单请求和非简单请求。对于简单请求，浏览器直接发出 CORS 请求。具体来说，就是会在头信息之中，增加一个 Origin 字段。Origin 字段用来说明本次请求来自哪个源。服务器根据这个值，决定是否同意这次请求。对于如果 Origin 指定的源，不在许可范围内，服务器会返回一个正常的 HTTP 回应。浏览器发现，这个回应的头信息没有包含 Access-Control-Allow-Origin 字段，就知道出错了，从而抛出一个错误，ajax 不会收到响应信息。如果成功的话会包含一些以 Access-Control- 开头的字段。非简单请求，浏览器会先发出一次预检请求，来判断该域名是否在服务器的白名单中，如果收到肯定回复后才会发起请求。
- （7）使用 websocket 协议，这个协议没有同源限制。
- （8）使用服务器来代理跨域的访问请求，就是有跨域的请求操作时发送请求给后端，让后端代为请求，然后最后将获取的结果发返回。


## 172、简单谈一下 cookie ？
cookie 是服务器提供的一种用于维护会话状态信息的数据，通过服务器发送到浏览器，浏览器保存在本地，当下一次有同源的请求时，将保存的 cookie 值添加到请求头部，发送给服务端。这可以用来实现记录用户登录状态等功能。cookie 一般可以存储 4k 大小的数据，并且只能够被同源的网页所共享访问。

在发生 xhr 的跨域请求的时候，即使是同源下的 cookie，也不会被自动添加到请求头部，除非显示地规定。


## 173、❓模块化开发怎么做？
我对模块的理解是，一个模块是实现一个特定功能的一组方法。在最开始的时候，js 只实现一些简单的功能，所以并没有模块的概念，但随着程序越来越复杂，代码的模块化开发变得越来越重要。<br>
由于函数具有独立作用域的特点，最原始的写法是使用函数来作为模块，几个函数作为一个模块，但是这种方式容易造成全局变量的污染，并且模块间没有联系。<br>
后面提出了对象写法，通过将函数作为一个对象的方法来实现，这样解决了直接使用函数作为模块的一些缺点，但是这种办法会暴露所有的所有的模块成员，外部代码可以修改内部属性的值。<br>
现在最常用的是立即执行函数的写法，通过利用闭包来实现模块私有作用域的建立，同时不会对全局作用域造成污染。


## 174、js 的几种模块规范？
### CommonJS
它通过 require 来引入模块，通过 module.exports 定义模块的输出接口。这种模块加载方案是服务器端的解决方案，它是以同步的方式来引入模块的，因为在服务端文件都存储在本地磁盘，所以读取非常快，所以以同步的方式加载没有问题。但如果是在浏览器端，由于模块的加载是使用网络请求，因此使用异步加载的方式更加合适。

### AMD
采用异步加载的方式来加载模块，模块的加载不影响后面语句的执行，所有依赖这个模块的语句都定义在一个回调函数里，等到加载完成后再执行回调函数。require.js 实现了 AMD 规范。

### CMD
和 AMD 方案都是为了解决异步模块加载的问题，sea.js 实现了 CMD 规范。它和 require.js的区别在于模块定义时对依赖的处理不同和对依赖模块的执行时机的处理不同。

### ES方案
使用 import 和 export 的形式来导入导出模块。这种方案和上面三种方案都不同。


## 175、requireJS 的核心原理是什么？（如何动态加载的？如何避免多次加载的？如何 缓存的？）
require.js 的核心原理是通过动态创建 script 脚本来异步引入模块，然后对每个脚本的 load 事件进行监听，如果每个脚本都加载完成了，再调用回调函数。


## 176、❓JS 模块加载器的轮子怎么造，也就是如何实现一个模块加载器？
https://www.zhihu.com/question/21157540


## 177、ECMAScript6 怎么写 class，为什么会出现 class 这种东西?
ES6 新添加的 class 只是为了补充 js 中缺少的一些面向对象语言的特性，但本质上来说它只是一种语法糖，不是一个新的东西，其背后还是原型继承的思想。通过加入 class 可以有利于我们更好的组织代码。在 class 中添加的方法，其实是添加在类的原型上的。


## 178、innerHTML 与 outerHTML 的区别？
对于这样一个 HTML 元素：
```html
<div>content<br/></div>
```
- innerHTML：内部 HTML，`content<br/>`；
- outerHTML：外部 HTML，`<div>content<br/></div>`；
- innerText：内部文本，`content`；
- outerText：内部文本，`content`；


## 179、❓JavaScript 类数组对象的定义？


## 180、❓实现一个页面操作不会整页刷新的网站，并且能在浏览器前进、后退时正确响应。


## 181、❓什么是“前端路由”？什么时候适合使用“前端路由”？“前端路由”有哪些优点和缺点？
前端路由就是把不同路由对应不同的内容或页面的任务交给前端来做，之前是通过服务端根据 url 的不同返回不同的页面实现的。

前端路由使用场景：<br>
在单页面应用，大部分页面结构不变，只改变部分内容的使用。

优点：用户体验好，不需要每次都从服务器全部获取，快速展现给用户<br>
缺点：单页面无法记住之前滚动的位置，无法在前进，后退的时候记住滚动的位置

前端路由一共有两种实现方式，一种是通过 hash 的方式，一种是通过使用 pushState 的方式。


## 182、什么是 Polyfill ？
Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。比如说`querySelectorAll`是很多现代浏览器都支持的原生 Web API，但是有些古老的浏览器并不支持，那么假设有人写了一段代码来实现这个功能使这些浏览器也支持了这个功能，那么这就可以成为一个 Polyfill。

一个 `shim` 是一个库，有自己的 API，而不是单纯实现原生不支持的 API。


## 183、❓介绍一下 js 的节流与防抖？
函数防抖：在事件被触发 n 秒后再执行回调，如果在这 n 秒内事件又被触发，则重新计时。
函数节流：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。


## 184、Object.is() 与原来的比较操作符 “===”、“==” 的区别？
- 使用`==`进行相等判断时，如果两边的类型不一致，则会进行强制类型转化后再进行比较。
- 使用`===`号进行相等判断时，如果两边的类型不一致时，不会做强制类型准换，直接返回 false。
- 使用`Object.is`来进行相等判断时，一般情况下和`===`的判断相同，它处理了一些特殊的情况，比如 -0 和 +0 不再相等，两个 NaN 认定为是相等的。


## 185、❓escape, encodeURI, encodeURIComponent 有什么区别？
- encodeURI 是对整个 URI 进行转义，将 URI 中的非法字符转换为合法字符，所以对于一些在 URI 中有特殊意义的字符不会进行转义。
- encodeURIComponent 是对 URI 的组成部分进行转义，所以一些特殊字符也会得到转义。
- escape 和 encodeURI 的作用相同，不过它们对于 unicode 编码为 0xff 之外字符的时候会有区别，escape 是直接在字符的 unicode 编码前加上 %u，而 encodeURI 首先会将字符转换为 UTF-8 的格式，再在每个字节前加上 %。

给出具体的案例


## 186、Unicode 和 UTF-8 之间的关系？
**Unicode**是一种字符集合，现在可容纳 100 多万个字符。每个字符对应一个不同的 Unicode 编码，它只规定了符号的二进制代码，却没有规定这个二进制代码在计算机中如何编码传输。<br>
**UTF-8**是一种对 Unicode 的编码方式，它是一种变长的编码方式，可以用 1~4 个字节来表示一个字符。


## 187、为什么 0.1 + 0.2 != 0.3？如何解决这个问题？
当计算机计算 0.1+0.2 的时候，实际上计算的是这两个数字在计算机里所存储的二进制，0.1 和 0.2 在转换为二进制表示的时候会出现位数无限循环的情况。js 中是以 64 位双精度格式来存储数字的，只有 53 位的有效数字，超过这个长度的位数会被截取掉这样就造成了精度丢失的问题。这是第一个会造成精度丢失的地方。在对两个以 64 位双精度格式的数据进行计算的时候，首先会进行对阶的处理，对阶指的是将阶码对齐，也就是将小数点的位置对齐后，再进行计算，一般是小阶向大阶对齐，因此小阶的数在对齐的过程中，有效数字会向右移动，移动后超过有效位数的位会被截取掉，这是第二个可能会出现精度丢失的地方。当两个数据阶码对齐后，进行相加运算后，得到的结果可能会超过 53 位有效数字，因此超过的位数也会被截取掉，这是可能发生精度丢失的第三个地方。

对于这样的情况，我们可以将其转换为整数后再进行运算，运算后再转换为对应的小数，以这种方式来解决这个问题。

我们还可以将两个数相加的结果和右边相减，如果相减的结果小于一个极小数，那么我们就可以认定结果是相等的，这个极小数可以
使用 es6 的 Number.EPSILON


## 188、❓原码、反码和补码的介绍


## 189、toPrecision 和 toFixed 和 Math.round 的区别？
- `toPrecision` 用于处理精度，精度是从左至右第一个不为 0 的数开始数起。
- `toFixed` 是对小数点后指定位数取整，从小数点开始数起。
- `Math.round` 是将一个数字四舍五入到一个整数。


## 190、❓什么是 XSS 攻击？如何防范 XSS 攻击？
XSS 攻击指的是跨站脚本攻击，是一种代码注入攻击。攻击者通过在网站注入恶意脚本，使之在用户的浏览器上运行，从而盗取用户的信息如 cookie 等。

XSS 的本质是因为网站没有对恶意代码进行过滤，与正常的代码混合在一起了，浏览器没有办法分辨哪些脚本是可信的，从而导致了恶意代码的执行。

XSS 一般分为存储型、反射型和 DOM 型。
- 存储型指的是恶意代码提交到了网站的数据库中，当用户请求数据的时候，服务器将其拼接为 HTML 后返回给了用户，从而导致了恶意代码的执行。
- 反射型指的是攻击者构建了特殊的 URL，当服务器接收到请求后，从 URL 中获取数据，拼接到 HTML 后返回，从而导致了恶意代码的执行。
- DOM 型指的是攻击者构建了特殊的 URL，用户打开网站后，js 脚本从 URL 中获取数据，从而导致了恶意代码的执行。

XSS 攻击的预防可以从两个方面入手，一个是恶意代码提交的时候，一个是浏览器执行恶意代码的时候。
- 对于第一个方面，如果我们对存入数据库的数据都进行的转义处理，但是一个数据可能在多个地方使用，有的地方可能不需要转义，由于我们没有办法判断数据最后的使用场景，所以直接在输入端进行恶意代码的处理，其实是不太可靠的。

因此我们可以从浏览器的执行来进行预防，一种是使用纯前端的方式，不用服务器端拼接后返回。另一种是对需要插入到 HTML 中的代码做好充分的转义。对于 DOM 型的攻击，主要是前端脚本的不可靠而造成的，我们对于数据获取渲染和字符串拼接的时候应该对可能出现的恶意代码情况进行判断。

还有一些方式，比如使用 CSP ，CSP 的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行，从而防止恶意代码的注入攻击。

还可以对一些敏感信息进行保护，比如 cookie 使用 http-only ，使得脚本无法获取。也可以使用验证码，避免脚本伪装成用户执行一些操作。


## 191、❓什么是 CSRF 攻击？如何防范 CSRF 攻击？
CSRF 攻击指的是跨站请求伪造攻击，攻击者诱导用户进入一个第三方网站，然后该网站向被攻击网站发送跨站请求。如果用户在被攻击网站中保存了登录状态，那么攻击者就可以利用这个登录状态，绕过后台的用户验证，冒充用户向服务器执行一些操作。

CSRF 攻击的本质是利用了 cookie 会在同源请求中携带发送给服务器的特点，以此来实现用户的冒充。

一般的 CSRF 攻击类型有三种：
- 第一种是 GET 类型的 CSRF 攻击，比如在网站中的一个 img 标签里构建一个请求，当用户打开这个网站的时候就会自动发起提
交。
- 第二种是 POST 类型的 CSRF 攻击，比如说构建一个表单，然后隐藏它，当用户进入页面时，自动提交这个表单。
- 第三种是链接类型的 CSRF 攻击，比如说在 a 标签的 href 属性里构建一个请求，然后诱导用户去点击。

CSRF 可以用下面几种方法来防护：
- 第一种是同源检测的方法，服务器根据 http 请求头中 origin 或者 referer 信息来判断请求是否为允许访问的站点，从而对请求进行过滤。当 origin 或者 referer 信息都不存在的时候，直接阻止。这种方式的缺点是有些情况下 referer 可以被伪造。还有就是我们这种方法同时把搜索引擎的链接也给屏蔽了，所以一般网站会允许搜索引擎的页面请求，但是相应的页面请求这种请求方式也可能被攻击者给利用。
- 第二种方法是使用 CSRF Token 来进行验证，服务器向用户返回一个随机数 Token ，当网站再次发起请求时，在请求参数中加入服务器端返回的 token ，然后服务器对这个 token 进行验证。这种方法解决了使用 cookie 单一验证方式时，可能会被冒用的问题，但是这种方法存在一个缺点就是，我们需要给网站中的所有请求都添加上这个 token，操作比较繁琐。还有一个问题是一般不会只有一台网站服务器，如果我们的请求经过负载平衡转移到了其他的服务器，但是这个服务器的 session 中没有保留这个 token 的话，就没有办法验证了。这种情况我们可以通过改变 token 的构建方式来解决。
- 第三种方式使用双重 Cookie 验证的办法，服务器在用户访问网站页面时，向请求域名注入一个Cookie，内容为随机字符串，然后当用户再次向服务器发送请求的时候，从 cookie 中取出这个字符串，添加到 URL 参数中，然后服务器通过对 cookie 中的数据和参数中的数据进行比较，来进行验证。使用这种方式是利用了攻击者只能利用 cookie，但是不能访问获取 cookie 的特点。并且这种方法比 CSRF Token 的方法更加方便，并且不涉及到分布式访问的问题。这种方法的缺点是如果网站存在 XSS 漏洞的，那么这种方式会失效。同时这种方式不能做到子域名的隔离。
- 第四种方式是使用在设置 cookie 属性的时候设置 Samesite ，限制 cookie 不能作为被第三方使用，从而可以避免被攻击者利用。Samesite 一共有两种模式，一种是严格模式，在严格模式下 cookie 在任何情况下都不可能作为第三方 Cookie 使用，在宽松模式下，cookie 可以被请求是 GET 请求，且会发生页面跳转的请求所使用。


## 192、什么是 CSP？
CSP指的是内容安全策略(Content security policy)，它的本质是建立一个白名单，告诉浏览器哪些外部资源可以加载和执行。我们只需要配置规则，如何拦截由浏览器自己来实现。

通常有两种方式来开启 CSP
- 一种是设置 HTTP 首部中的`Content-Security-Policy`
- 一种是设置 meta 标签的方式`<meta http-equiv="Content-Security-Policy">`


## 193、什么是 Samesite Cookie 属性？
Samesite Cookie 表示同站 cookie，避免 cookie 被第三方所利用。
- 将 Samesite 设为 strict ，这种称为严格模式，表示这个 cookie 在任何情况下都不可能作为第三方 cookie。
- 将 Samesite 设为 Lax ，这种模式称为宽松模式，如果这个请求是个 GET 请求，并且这个请求改变了当前页面或者打开了新的页面，那么这个 cookie 可以作为第三方 cookie，其余情况下都不能作为第三方 cookie。<br>
  缺点：因为它不支持子域，所以子域没有办法与主域共享登录信息，每次转入子域的网站，都回重新登录。还有一个问题就是它的兼容性不够好。


## 194、什么是点击劫持？如何防范点击劫持？
点击劫持是一种视觉欺骗的攻击手段，攻击者将需要攻击的网站通过 iframe 嵌套的方式嵌入自己的网页中，并将 iframe 设置为透明，在页面中透出一个按钮诱导用户点击。

我们可以在 http 相应头中设置 X-FRAME-OPTIONS 来防御用 iframe 嵌套的点击劫持攻击。通过不同的值，可以规定页面在特定的一些情况才能作为 iframe 来使用。


## 195、SQL 注入攻击？
SQL 注入攻击指的是攻击者在 HTTP 请求中注入恶意的 SQL 代码，服务器使用参数构建数据库 SQL 命令时，恶意 SQL 被一起构造，破坏原有 SQL 结构，并在数据库中执行，达到编写程序时意料之外结果的攻击行为。


## 196、Object.assign()
`Object.assign()`方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。


## 197、Math.ceil 和 Math.floor
- `Math.ceil()` === 向上取整，函数返回一个大于或等于给定数字的最小整数。
- `Math.floor()` === 向下取整，函数返回一个小于或等于给定数字的最大整数。


## 198、js for 循环注意点
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
- URI: Uniform Resource Identifier 指的是统一资源标识符
- URL: Uniform Resource Location 指的是统一资源定位符
- URN: Universal Resource Name 指的是统一资源名称

URI 指的是统一资源标识符，用唯一的标识来确定一个资源，它是一种抽象的定义，也就是说，不管使用什么方法来定义，只要能唯一的标识一个资源，就可以称为 URI。<br>
URL 指的是统一资源定位符，URN 指的是统一资源名称。URL 和 URN 是 URI 的子集，URL 可以理解为使用地址来标识资源，URN 可以理解为使用名称来标识资源。


## 201、get 和 post 请求在缓存方面的区别
- get 请求类似于查找的过程，用户获取数据，可以不用每次都与数据库连接，所以可以使用缓存。
- post 不同，post 做的一般是修改和删除的工作，所以必须与数据库交互，所以不能使用缓存。因此 get 请求适合于请求缓存。

缓存一般只适用于那些不会更新服务端数据的请求。一般 get 请求都是查找请求，不会对服务器资源数据造成修改，而 post 请求一般都会对服务器数据造成修改，所以，一般会对 get 请求进行缓存，很少会对 post 请求进行缓存。


## 202、图片的懒加载和预加载
- 预加载：提前加载图片，当用户需要查看时可直接从本地缓存中渲染。<br>
- 懒加载：懒加载的主要目的是作为服务器前端的优化，减少请求数或延迟请求数。

两种技术的本质：两者的行为是相反的，一个是提前加载，一个是迟缓甚至不加载。 懒加载对服务器前端有一定的缓解压力作用，预加载则会增加服务器前端压力。


## 203、mouseover 和 mouseenter 的区别？
当鼠标移动到元素上时就会触发 `mouseenter` 事件，类似 `mouseover`，它们两者之间的差别是 `mouseenter` 不会冒泡。<br>
由于 `mouseenter` 不支持事件冒泡，导致在一个元素的子元素上进入或离开的时候会触发其 `mouseover` 和 `mouseout` 事件，但是却不会触发 `mouseenter` 和 `mouseleave` 事件。


## 204、❓js 拖拽功能的实现


## 205、❓为什么使用 setTimeout 实现 setInterval？怎么模拟？


## 206、什么是 rest 参数？
rest参数，又称剩余参数（形式为`...`变量名），用于获取函数的多余参数。


## 207、什么是尾调用，使用尾调用有什么好处？
尾调用指的是函数的最后一步调用另一个函数。我们代码执行是基于执行栈的，所以当我们在一个函数里调用另一个函数时，我们会保留当前的执行上下文，然后再新建另外一个执行上下文加入栈中。使用尾调用的话，因为已经是函数的最后一步，所以这个时候我们可以不必再保留当前的执行上下文，从而节省了内存，这就是尾调用优化。但是 ES6 的尾调用优化只在严格模式下开启，正常模式是无效的。


## 208、Symbol 类型的注意点？
1. Symbol 函数前不能使用 new 命令，否则会报错。
2. Symbol 函数可以接受一个字符串作为参数，表示对 Symbol 实例的描述，主要是为了在控制台显示，或者转为字符串时，比较容易区分。
3. Symbol 作为属性名，该属性不会出现在 for...in、for...of 循环中，也不会被 Object.keys()、Object.getOwnPropertyNames()、JSON.stringify() 返回。
4. Object.getOwnPropertySymbols 方法返回一个数组，成员是当前对象的所有用作属性名的 Symbol 值。
5. Symbol.for 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的 Symbol 值。如果有，就返回这个 Symbol 值，否则就新建并返回一个以该字符串为名称的 Symbol 值。
6. Symbol.keyFor 方法返回一个已登记的 Symbol 类型值的 key。


## 209、Set 和 WeakSet 结构？
1. ES6 提供了新的数据结构 Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。
2. WeakSet 结构与 Set 类似，也是不重复的值的集合。但是 WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，


## 210、Map 和 WeakMap 结构？
1. Map 数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
2. WeakMap 结构与 Map 结构类似，也是用于生成键值对的集合。但是 WeakMap 只接受对象作为键名（ null 除外），不接受其他类型的值作为键名。而且 WeakMap 的键名所指向的对象，不计入垃圾回收机制。


## 211、什么是 Proxy ？
Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”，即对编程语言进行编程。

Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。


## 212、Reflect 对象创建目的？
1. 将 Object 对象的一些明显属于语言内部的方法（比如 Object.defineProperty，放到 Reflect 对象上。
2. 修改某些 Object 方法的返回结果，让其变得更合理。
3. 让 Object 操作都变成函数行为。
4. Reflect 对象的方法与 Proxy 对象的方法一一对应，只要是 Proxy 对象的方法，就能在 Reflect 对象上找到对应的方法。这就让 Proxy 对象可以方便地调用对应的 Reflect 方法，完成默认行为，作为修改行为的基础。也就是说，不管 Proxy 怎么修改默认行为，你总可以在 Reflect 上获取默认行为。


## 213、什么是 Promise 对象，什么是 Promises/A+ 规范？
Promise 对象是异步编程的一种解决方案，最早由社区提出。Promises/A+ 规范是 JavaScript Promise 的标准，规定了一个 Promise 所必须具有的特性。

Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变，就凝固了，无法再被改变了。状态的改变是通过 resolve() 和 reject() 函数来实现的，我们
可以在异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的末尾执行。


## 214、❓怎么做 JS 代码 Error 统计？
error 统计使用浏览器的 window.error 事件。


## 215、❓单例模式模式是什么？
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


## 221、开发中常用的几种 Content-Type ？
- （1）application/x-www-form-urlencoded<br>
浏览器的原生 form 表单，如果不设置 enctype 属性，那么最终就会以 application/x-www-form-urlencoded 方式提交数据。该种方式提交的数据放在 body 里面，数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL
转码。
- （2）multipart/form-data<br>
该种方式也是一个常见的 POST 提交方式，通常表单上传文件时使用该种方式。
- （3）application/json<br>
告诉服务器消息主体是序列化后的 JSON 字符串。
- （4）text/xml<br>
该种方式主要用来提交 XML 格式的数据。


## 222、如何判断一个对象是否为空对象？
```js
function checkNullObj(obj) {
  return Object.keys(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0;
}
```


## 223、使用闭包实现每隔一秒打印 1, 2, 3, 4
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
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3
```


## 225、如何确定页面的可用性时间，什么是 Performance API？
Performance API 用于精确度量、控制、增强浏览器的性能表现。这个 API 为测量网站性能，提供以前没有办法做到的精度。

使用 getTime 来计算脚本耗时的缺点，首先，getTime方法（以及 Date 对象的其他方法）都只能精确到毫秒级别（一秒的千分之一），想要得到更小的时间差别就无能为力了。其次，这种写法只能获取代码运行过程中的时间进度，无法知道一些后台事件的时间进度，比如浏览器用了多少时间从服务器加载网页。

为了解决这两个不足之处，ECMAScript 5引入“高精度时间戳”这个 API，部署在 performance 对象上。它的精度可以达到1毫秒的千分之一（1秒的百万分之一）。
- navigationStart：当前浏览器窗口的前一个网页关闭，发生 unload 事件时的 Unix 毫秒时间戳。如果没有前一个网页，则等于 fetchStart 属性。
- loadEventEnd：返回当前网页 load 事件的回调函数运行结束时的 Unix 毫秒时间戳。如果该事件还没有发生，返回 0。

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
在前端实现中我们一般通过 setTimeout 和 setInterval 方法来实现一个倒计时效果。但是使用这些方法会存在时间偏差的问题，这是由于 js 的程序执行机制造成的，setTimeout 和 setInterval 的作用是隔一段时间将回调事件加入到事件队列中，因此事件并不是立即执行的，它会等到当前执行栈为空的时候再取出事件执行，因此事件等待执行的时间就是造成误差的原因。

一般解决倒计时中的误差的有这样两种办法：
- （1）第一种是通过前端定时向服务器发送请求获取最新的时间差，以此来校准倒计时时间。
- （2）第二种方法是前端根据偏差时间来自动调整间隔时间的方式来实现的。这一种方式首先是以 setTimeout 递归的方式来实现倒计时，然后通过一个变量来记录已经倒计时的秒数。每一次函数调用的时候，首先将变量加一，然后根据这个变量和每次的间隔时间，我们就可以计算出此时无偏差时应该显示的时间。然后将当前的真实时间与这个时间相减，这样我们就可以得到时间的偏差大小，因此我们在设置下一个定时器的间隔大小的时候，我们就从间隔时间中减去这个偏差大小，以此来实现由于程序执行所造成的时间误差的纠正。


## 228、❓进程间通信的方式？
1. 管道通信
2. 消息队列通信
3. 信号量通信
4. 信号通信
5. 共享内存通信
6. 套接字通信


## 229、微信的JSSDK都有哪些内容？如何接入？
微信JS-SDK：是开发者在网页上通过JavaScript代码使用微信原生功能的工具包，开发者可以使用它在网页上录制和播放微信语音、监听微信分享、上传手机本地图片、拍照等许多能力。

JSSDK使用步骤
- 步骤一：绑定域名
- 步骤二：引入JS文件
- 步骤三：通过config接口注入权限验证配置
- 步骤四：通过ready接口处理成功验证
- 步骤五：通过error接口处理失败验证


## 230、H5页面在微信中如何禁止分享给好友和朋友圈？
利用JSBridge实现调用微信提供的一些原生功能，可以通过调用隐藏操作菜单来实现禁用分享。
```js
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
  WeixinJSBridge.call('hideOptionMenu');
});
```


## 240、什么是本地存储的有效期？
本地存储的四种方式：cookie，localStorage, sessionStorage, indexDB
- cookie: 通过 expires/max-age 设置过期时间。如不指定，则为 session cookie, 即一次会话有效。
- localStorage: 持久存储，需主动清除
- sessionStorage: 会话存储，会话结束（浏览器，标签页关闭）自动清除。
- indexDB: 持久存储，需主动删除。


## 241、❓ECMAScript 和 JavaScript 的关系
前者是后者的规格，后者是前者的一种实现


## 242、prototype、__proto__与constructor的关系
**`__proto__`被称为隐式原型，`prototype`被称为显式原型。**<br>
### 牢记两点
-  ①`__proto__`和`constructor`属性是对象所独有的，`prototype`属性是函数所独有的，万物皆对象，方法/函数`Function`是对象(`Function instanceof Object ==> true`)，方法的原型`Function.prototype`是对象(`Function.prototype instanceof Object ==> true`)，因此，它们都会具有对象共有的特点。所以函数也拥有`__proto__`和`constructor`属性;
-  ②`__proto__`指向创建这个对象的函数的显式原型，构造函数除了是函数也是对象，所以它也有`__proto__`属性，它指向它的构造函数的原型对象(函数的构造函数是`Function`)，所以此时的`__proto__`指向`Function.prototype`。`prototype`指向该方法的原型对象，在原型对象上有所有实例**共享的一些属性和方法**，原型对象上有一个属性 constructor 指向其构造函数；
```js
// _proto__指向
function Animal (name, age) {
  this.name = name
  this.age = age
}
const animal = new Animal('小灰', 2)
console.log(animal.__proto__ === Animal.prototype) // true
console.log(Animal.__proto__ === Function.prototype) // true

// prototype指向
// ES5：需要先定义构造函数，然后通过prototype的方式来添加方法
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

// ES6：方法直接定义在class里面即可
class Dog {
  type = '小狗'
  constructor (name, age) {
    this.name = name
    this.age = age
  }
  getX () { // 直接定义在这里就行
    return '234'
  }
}
console.log(Dog.prototype) // {}，输出能看到是一个空对象，但是实际上，上面有方法，下面一行代码能够表示
console.log(Dog.prototype.getX()) // 234
const dog = new Dog('小灰', 5)
console.log(dog.type) // 小狗
```

### `__proto__`隐式原型
JavaScript中任意对象都有一个内置属性`[[prototype]]`，在ES5之前没有标准的方法访问这个内置属性，但是大多数浏览器都支持通过`__proto__`来访问。ES5中有了对于这个内置属性标准的Get方法`Object.getPrototypeOf()`。**一个对象的隐式原型指向构造该对象的构造函数的原型(一个对象的隐式原型指向创建这个对象的函数的显式原型)**，这也保证了实例能够访问在构造函数原型中定义的属性和方法。
作用：构成原型链，同样用于实现基于原型的继承。例子：当我们访问obj这个对象中的x属性时，如果在obj中找不到，那么就会沿着`__proto__`依次查找，直到最顶层，如果最顶层还未查找到则返回`undefined`
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
作用：用来实现基于原型的继承与属性的共享。
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

**`__proto__`隐式原型和`prototype`显式原型两者的关系**
> 隐式原型指向创建这个对象的函数(`constructor`)的`prototype`
```js
function Animal (name, age) {
  this.name = name
  this.age = age
}
const animal = new Animal('小灰', 2)
console.log(animal.__proto__ === Animal.prototype) // true
```

### 总结
- ① `__proto__` 和 `constructor`属性是**对象**所独有的；
- ② `prototype`属性是函数所独有的，因为函数也是一种对象，所以函数也拥有`__proto__`和`constructor`属性。

- `__proto__`属性的作用就是当访问一个对象的属性时，如果该对象内部不存在这个属性，那么就会去它的`__proto__`属性所指向的那个对象（父对象）里找，一直找，直到`__proto__`属性的终点null，再往上找就相当于在null上取值，会报错。通过`__proto__`属性将对象连接起来的这条链路即我们所谓的原型链。
- `prototype`属性的作用就是让该函数所实例化的对象们都可以找到公用的属性和方法，即`f1.proto === Foo.prototype`。
- `constructor`属性的含义就是指向该对象的构造函数，所有函数（此时看成对象了）最终的构造函数都指向`Function`。



## 243、❓setTimeout和setImmediate以及process.nextTick的区别
https://www.cnblogs.com/cdwp8/p/4065846.html


## 244、JS运行机制（Event Loop）
JS执行是单线程的，它是基于事件循环的。
1. 所有同步任务都在主线程上执行，形成一个执行栈。
2. 主线程之外，会存在一个任务队列，只要异步任务有了结果，就在任务队列中放置一个事件。
3. 当执行栈中的所有同步任务执行完后，就会读取任务队列。那些对应的异步任务，会结束等待状态，进入执行栈。
4. 主线程不断重复第三步。


## 245、ES6 都有什么 Iterator 遍历器
1. 遍历器（Iterator）是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）
2. Iterator 的作用有三个：
  - 一是为各种数据结构，提供一个统一的、简便的访问接口；
  - 二是使得数据结构的成员能够按某种次序排列；
  - 三是 ES6 创造了一种新的遍历命令 for... of 循环，Iterator 接口主要供 for... of 消费。
3. 默认部署了 Iterator 的数据有 Array、Map、Set、String、TypedArray、arguments、NodeList 对象，ES6 中有的是 Set、Map、


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
es6 是一个新的标准，它包含了许多新的语言特性和库，是 JS 最实质性的一次升级。 比如'箭头函数'、'字符串模板'、'generators(生成器)'、'async/await'、'解构赋值'、'class'等等，还有就是引入 module 模块的概念。


## 248、说说你对 promise 的了解
Promise 是异步编程的一种解决方案，比传统的解决方案——回调函数和事件监听——更合理和更强大。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束的事件（通常是一个异步操作）的结果。从语法上说，Promise 是一个对象，从它可以获取异步操作的消息。Promise 提供统一的 API，各种异步操作都可以用同样的方法进行处理。

Promise 对象有以下两个特点:
- 对象的状态不受外界影响。Promise 对象代表一个异步操作，有三种状态：pending（进行中）、fulfilled（已成功）和rejected（已失败）。只有异步操作的结果，可以决定当前是哪一种状态，任何其他操作都无法改变这个状态。这也是Promise这个名字的由来，它的英语意思就是“承诺”，表示其他手段无法改变。
- 一旦状态改变，就不会再变，任何时候都可以得到这个结果。Promise对象的状态改变，只有两种可能：从pending变为fulfilled和从pending变为rejected。只要这两种情况发生，状态就凝固了，不会再变了，会一直保持这个结果，这时就称为 resolved（已定型）。如果改变已经发生了，你再对Promise对象添加回调函数，也会立即得到这个结果。这与事件（Event）完全不同，事件的特点是，如果你错过了它，再去监听，是得不到结果的。


## 249、解构赋值及其原理
其实就是分解出一个对象的解构，分成两个步骤：
- 变量的声明
- 变量的赋值

原理：ES6 变量的解构赋值本质上是“模式匹配”, 只要等号两边的模式相同，左边的变量就会被赋予匹配的右边的值，如果匹配不成功变量的值就等于 undefined


## 250、Array.from() 与 Array.reduce()
- `Array.from()`方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
- `Array.reduce()`方法对累加器和数组中的每个元素 (从左到右)应用一个函数，将其减少为单个值。

Array.from()
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


## 251、var let 在 for 循环中的区别
```js
//使用var声明，得到3个3
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
1. 基本的字符串格式化，将表达式嵌入字符串中进行拼接，用${}来界定。
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
- （1）函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象。
- （2）不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
- （3）不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- （4）不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。


## 254、ES6 如何动态加载 import
```js
import("lodash").then(_ => {
  // Do something with lodash (a.k.a '_')...
});
```


## 255、箭头函数和普通函数有什么区别
- 函数体内的 this 对象，就是定义时所在的对象，而不是使用时所在的对象，用 call apply bind 也不能改变 this 指向
- 不可以当作构造函数，也就是说，不可以使用 new 命令，否则会抛出一个错误。
- 不可以使用 arguments 对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。
- 不可以使用 yield 命令，因此箭头函数不能用作 Generator 函数。
- 箭头函数没有原型对象 prototype


## 256、Promise 构造函数是同步执行还是异步执行，那么 then 方法呢？
promise构造函数是同步执行的，then方法是异步执行的
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


## 257、❓Promise. all并发限制


## 258、❓介绍下 Promise. all 使用、原理实现及错误处理


## 259、❓请介绍Promise，异常捕获


## 260、❓设计并实现 Promise. race()


## 270、❓模拟实现一个 Promise. finally


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


## 272、setTimeout、Promise、Async/Await 的区别
主要是考察这三者在事件循环中的区别，事件循环中分为宏任务队列和微任务队列。
- 其中`setTimeout`的回调函数放到宏任务队列里，等到执行栈清空以后执行；
- `promise.then`里的回调函数会放到相应宏任务的微任务队列里，等宏任务里面的同步代码执行完再执行；
- `async`函数表示函数里面可能会有异步方法，`await`后面跟一个表达式，`async`方法执行时，遇到`await`会立即执行表达式，然后把表达式后面的代码放到微任务队列里，让出执行栈让同步代码先执行。

1. setTimeout
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

2. Promise<br>
  Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。
  ```js
  console.log('script start')
  let promise1 = new Promise(function(resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
  }).then(function() {
    console.log('promise2')
  })
  setTimeout(function() {
    console.log('settimeout')
  })
  console.log('script end')

  // 输出顺序: 
  // ->script start
  // ->promise1
  // ->promise1 end
  // ->script end
  // ->promise2
  // ->settimeout
  ```
  当JS主线程执行到Promise对象时，
    - `promise1. then()`的回调就是一个 task
    - `promise1` 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue
    - `promise1` 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中
    - `setTimeout` 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况
3. async/await
  ```js
  async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end')
  }
  async function async2() {
    console.log('async2')
  }

  console.log('script start');
  async1();
  console.log('script end')

  // 输出顺序：
  // ->script start
  // ->async1 start
  // ->async2
  // ->script end
  // ->async1 end
  async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。
  举个例子：
  async function func1() {
    return 1
  }
  console.log(func1())
  ```
  控制台查看打印，很显然，func1的运行结果其实就是一个Promise对象。因此我们也可以使用then来处理后续逻辑。
  ```js
  func1().then(res => {
    console.log(res); // 30
  })
  ```
  await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。


## 273、什么是Generator 函数
如果某个方法之前加上星号（`*`），就表示该方法是一个 Generator 函数。Generator 函数是 ES6 提供的一种异步编程解决方案，语法行为与传统函数完全不同。

Generator 函数有多种理解角度。语法上，首先可以把它理解成，Generator 函数是一个状态机，封装了多个内部状态。执行 Generator 函数会返回一个遍历器对象，也就是说，Generator 函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历 Generator 函数内部的每一个状态。形式上，Generator 函数是一个普通函数，但是有两个特征：
- function关键字与函数名之间有一个星号；
- 函数体内部使用yield表达式，定义不同的内部状态（yield在英语里的意思就是“产出”）。

ES6 没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。
```js
function * foo(x, y) { ··· }
function *foo(x, y) { ··· }
function* foo(x, y) { ··· }
function*foo(x, y) { ··· }
```
由于 Generator 函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。


## 274、什么是yield 表达式
由于 Generator 函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield表达式就是暂停标志。


## 275、ES6 引入Symbol的原因
ES5 的对象属性名都是字符串，这容易造成属性名的冲突。

比如，你使用了一个他人提供的对象，但又想为这个对象添加新的方法（mixin 模式），新方法的名字就有可能与现有方法产生冲突。如果有一种机制，保证每个属性的名字都是独一无二的就好了，这样就从根本上防止属性名的冲突。

ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。它是 JavaScript 语言的第七种数据类型，前六种是：undefined、null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。


## 276、栈和队列的区别?
> https://blog.csdn.net/weixin_50757957/article/details/124616956
https://blog.csdn.net/qq_19446965/article/details/102982047

- 栈的插入和删除操作都是在一端进行的，而队列的操作却是在两端进行的。
- 队列先进先出，栈先进后出。
- 栈只允许在表尾一端进行插入和删除，而队列只允许在表尾一端进行插入，在表头一端进行删除

栈和堆的区别？
- 栈区（stack）：由编译器自动分配释放，存放函数的参数值，局部变量的值等。
- 堆区（heap）：一般由程序员分配释放，若程序员不释放，程序结束时可能由 OS 回收。
- 堆（数据结构）：堆可以被看成是一棵树，如：堆排序；
- 栈（数据结构）：一种先进后出的数据结构。


## 277、eval 是做什么的？
`eval`功能是把对应的字符串解析成JS代码并运行;但不安全,非常耗性能。原因在于：该过程会执行两次：
- 一次解析成 js 语句
- 一次执行 js 语句


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


## 什么是 MVVM？比之 MVC 有什么区别？什么又是 MVP ？
MVC、MVP 和 MVVM 是三种常见的软件架构设计模式，主要通过分离关注点的方式来组织代码结构，优化我们的开发效率。

比如说我们实验室在以前项目开发的时候，使用单页应用时，往往一个路由页面对应了一个脚本文件，所有的页面逻辑都在一个脚本文件里。页面的渲染、数据的获取，对用户事件的响应所有的应用逻辑都混合在一起，这样在开发简单项目时，可能看不出什么问题，当时一旦项目变得复杂，那么整个文件就会变得冗长，混乱，这样对我们的项目开发和后期的项目维护是非常不利的。

MVC 通过分离 Model、View 和 Controller 的方式来组织代码结构。其中 View 负责页面的显示逻辑，Model 负责存储页面的业务数据，以及对相应数据的操作。并且 View 和 Model 应用了观察者模式，当 Model 层发生改变的时候它会通知有关 View 层更新页面。Controller 层是 View 层和 Model 层的纽带，它主要负责用户与应用的响应操作，当用户与页面产生交互的时候，Co
ntroller 中的事件触发器就开始工作了，通过调用 Model 层，来完成对 Model 的修改，然后 Model 层再去通知 View 层更新。

MVP 模式与 MVC 唯一不同的在于 Presenter 和 Controller。在 MVC 模式中我们使用观察者模式，来实现当 Model 层数据发生变化的时候，通知 View 层的更新。这样 View 层和 Model 层耦合在一起，当项目逻辑变得复杂的时候，可能会造成代码的混乱，并且可能会对代码的复用性造成一些问题。MVP 的模式通过使用 Presenter 来实现对 View 层和 Model 层的解耦。MVC 中的
Controller 只知道 Model 的接口，因此它没有办法控制 View 层的更新，MVP 模式中，View 层的接口暴露给了 Presenter 因此我们可以在 Presenter 中将 Model 的变化和 View 的变化绑定在一起，以此来实现 View 和 Model 的同步更新。这样就实现了对 View 和 Model 的解耦，Presenter 还包含了其他的响应逻辑。

MVVM 模式中的 VM，指的是 ViewModel，它和 MVP 的思想其实是相同的，不过它通过双向的数据绑定，将 View 和 Model 的同步更新给自动化了。当 Model 发生变化的时候，ViewModel 就会自动更新；ViewModel 变化了，View 也会更新。这样就将 Presenter 中的工作给自动化了。我了解过一点双向数据绑定的原理，比如 vue 是通过使用数据劫持和发布订阅者模式来实现的这一功
能。