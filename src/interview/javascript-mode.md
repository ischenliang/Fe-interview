参考：https://www.w3cschool.cn/zobyhd/tqlv9ozt.html
# JavaScript设计模式面试题汇总
## 1、单例模式
单例模式也称为单体模式，规定一个类只有一个实例，并且提供可全局访问点；
> JavaScript中没有类的定义，单例模式的特点是“唯一”和“全局访问”，那么我们可以联想到JavaScript中的全局对象，利用ES6的let不允许重复声明的特性，刚好符合这两个特点；是的，全局对象是最简单的单例模式；
```js
let obj = {
  name: "demo",
  getName: function(){}
}
```
上述代码中可以知道`obj`就是一个单例，因为`obj`刚好就符合单例模式的两大特点："唯一"和"可全局访问"；

但是我们并不建议这么实现单例，因为全局对象/全局变量会有一些弊端：
1. 污染命名空间（容易变量名冲突）
2. 维护时不容易管控 (搞不好就直接覆盖了)

简单版单例模式：
> 只能有一个实例，所以我们需要使用`if`分支来判断，如果已经存在就直接返回，如果不存在就新建一个实例；
```js
let Singleton = function(name){
  this.name = name;
  this.instance = null; 
}

Singleton.prototype.getName = function(){
  console.log(this.name);
}

Singleton.getInstance = function(name){
  if(this.instance){
    return this.instance; 
  }
  return this.instance = new Singleton(name);
}

let winner = Singleton.getInstance("winner");   //winner
console.log(winner.getName());
let sunner = Singleton.getInstance("sunner");   //winner
console.log(sunner.getName())
```
上面代码中我们是通过一个变量`instance`的值来进行判断是否已存在实例，如果存在就直接返回`this.instance`，如果不存在，就新建实例并赋值给 `instance`；但是上面的代码还是存在问题，因为创建对象的操作和判断实例的操作耦合在一起，并不符合”单一职责原则“；

- **改良版**: 通过一个闭包，来实现判断实例的操作；
  ```js
  let CreateSingleton = (function(){
    let instance = null;
    return function(name){
      this.name = name;
      if(instance){
        return instance
      }
      return instance = this;
    }
  })()


  CreateSingleton.prototype.getName = function(){
    console.log(this.name);
  }

  let winner = new CreateSingleton("winner");  //winner
  console.log(winner.getName());
  let sunner = new CreateSingleton("sunner");  //winner
  console.log(sunner.getName())
  ```
- **代理版单例模式**：通过代理的形式，将创建对象的操作和实例判断的操作进行解耦拆分，实现更小粒度的划分，符合”单一职责原则“；
  ```js
  let ProxyCreateSingleton = (function(){
    let instance = null;
    return function(name){
      if(instance){
        return instance
      }
      return instance = new Singlton(name);
    }
  })();
      
  let Singlton = function(name){
    this.name = name;
  } 

  Singlton.prototype.getName = function(){
    console.log(this.name);
  }

  let winner = new ProxyCreateSingleton("winner");
  console.log(winner.getName());
  let sunner = new ProxyCreateSingleton("sunner");
  console.log(sunner.getName());
  ```
  上面的代码中，`ProxyCreateSingleton()`只负责判断实例，`Singlton`只负责创建对象和赋值；
- **惰性单例模式**: 我们经常会有这样的场景：页面多次调用都有弹窗提示，只是提示内容不一样；这个时候我们可以立马想到是单例模式，弹窗就是单例实例，提示内容是参数传递；我们可以用惰性单例模式来实现它；
  ```html
  <body>
    <div id="loginBtn">W3Cschool</div>
  </body>
  <script>
    let getSingleton = function (fn) {
      var result;
      return function () {
        return result || (result = fn.apply(this, arguments)); // 确定this上下文并传递参数
      }
    }
    let createAlertMessage = function (html) {
      var div = document.createElement('div');
      div.innerHTML = html;
      div.style.display = 'none';
      document.body.appendChild(div);
      return div;
    }
    let createSingleAlertMessage = getSingleton(createAlertMessage);
    document.getElementById('loginBtn').onclick = function () {
      let alertMessage = createSingleAlertMessage('<a href="https://www.w3cschool.cn/" style="text-decoration:none;" target="_blank">W3Cschool.cn</a>');
      alertMessage.style.display = 'block';
    }
  </script>
  ```
  惰性单例是指的是页面开始加载的时候我们的实例是没有进行创建的，是当我们点击页面的div之后才开始创建实例（按需创建），这可以提高我们的网页性能，加快我们的页面渲染速度；


## 2、构造器模式
在面向对象编程中，构造器是一个当新建对象的内存被分配后，用来初始化该对象的一个特殊函数。在JavaScript中几乎所有的东西都是对象，我们经常会对对象的构造器十分感兴趣。

对象构造器是被用来创建特殊类型的对象的，首先它要准备使用的对象，其次在对象初次被创建时，通过接收参数，构造器要用来对成员的属性和方法进行赋值。

**对象创建**: 创建对象的三种基本方式:
```js
var newObject = {};

// or
var newObject = Object.create(null);

// or
var newObject = new Object();
```
最后一个例子中`"Object"`构造器创建了一个针对特殊值的对象包装，只不过这里没有传值给它，所以它将会返回一个空对象。

有四种方式可以将一个键值对赋给一个对象:
```js
// ECMAScript 3 兼容形式

// 1\. “点号”法

// 设置属性
newObject.someKey = "Hello World";

// 获取属性
var key = newObject.someKey;

// 2\. “方括号”法

// 设置属性
newObject["someKey"] = "Hello World";

// 获取属性
var key = newObject["someKey"];

// ECMAScript 5 仅兼容性形式
// For more information see: http://kangax.github.com/es5-compat-table/

// 3\. Object.defineProperty方式

// 设置属性
Object.defineProperty(newObject, "someKey", {
  value: "for more control of the property's behavior",
  writable: true,
  enumerable: true,
  configurable: true
});

// 如果上面的方式你感到难以阅读，可以简短的写成下面这样：

var defineProp = function (obj, key, value){
  config.value = value;
  Object.defineProperty(obj, key, config);
};

// 为了使用它，我们要创建一个“person”对象
var person = Object.create(null);

// 用属性构造对象
defineProp(person, "car",  "Delorean");
defineProp(person, "dateOfBirth", "1981");
defineProp(person, "hasBeard", false);

// 4\. Object.defineProperties方式

// 设置属性
Object.defineProperties(newObject, {
  "someKey": { 
    value: "Hello World", 
    writable: true 
  },
  "anotherKey": { 
    value: "Foo bar", 
    writable: false 
  } 
});
// 3和4中的读取属行可用1和2中的任意一种
```
这些方法会被用于继承，如下：
```js
/ 使用:

// 创建一个继承与Person的赛车司机
var driver = Object.create(person);

// 设置司机的属性
defineProp(driver, "topSpeed", "100mph");

// 获取继承的属性 (1981)
console.log(driver.dateOfBirth);

// 获取我们设置的属性 (100mph)
console.log(driver.topSpeed);
```

**基础构造器**<br>
Javascript不支持类的概念，但它有一种与对象一起工作的构造器函数。使用`new`关键字来调用该函数，我们可以告诉Javascript把这个函数当做一个构造器来用,它可以用自己所定义的成员来初始化一个对象。<br>
在这个构造器内部，关键字`this`引用到刚被创建的对象。回到对象创建，一个基本的构造函数看起来像这样:
```js
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
  this.toString = function () {
    return this.model + " has done " + this.miles + " miles";
  };
}

// 使用:
// 我们可以示例化一个Car
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);
// 打开浏览器控制台查看这些对象toString()方法的输出值
// output of the toString() method being called on
// these objects
console.log(civic.toString());
console.log(mondeo.toString());
```
上面这是个简单版本的构造器模式，但它还是有些问题。一个是难以继承，另一个是每个`Car`构造函数创建的对象中，`toString()`之类的函数都被重新定义。这不是非常好，理想的情况是所有`Car`类型的对象都应该引用同一个函数。 这要谢谢ECMAScript3和ECMAScript5-兼容版，对于构造对象他们提供了另外一些选择，解决限制小菜一碟。

**使用“原型”的构造器**<br>
在Javascript中函数有一个`prototype`的属性。当我们调用Javascript的构造器创建一个对象时，构造函数`prototype`上的属性对于所创建的对象来说都看见。照这样，就可以创建多个访问相同`prototype`的`Car`对象了。下面，我们来扩展一下原来的例子：
```js
function Car(model, year, miles) {
  this.model = model;
  this.year = year;
  this.miles = miles;
}
// 注意这里我们使用Note here that we are using Object.prototype.newMethod 而不是
// Object.prototype ，以避免我们重新定义原型对象
Car.prototype.toString = function () {
  return this.model + " has done " + this.miles + " miles";
};

// 使用:
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);
console.log(civic.toString());
console.log(mondeo.toString());
```
通过上面代码，单个`toString()`实例被所有的Car对象所共享了。


## 3、模块化模式
**模块**<br>
模块是任何健壮的应用程序体系结构不可或缺的一部分，特点是有助于保持应用项目的代码单元既能清晰地分离又有组织。在JavaScript中，实现模块有几个选项，他们包括：
- 模块化模式
- 对象表示法
- AMD模块
- CommonJS 模块
- ECMAScript Harmony 模块
模块化模式是基于对象的文字部分，所以首先对于更新我们对它们的知识是很有意义的。

**对象字面值**<br>
在对象字面值的标记里，一个对象被描述为一组以逗号分隔的名称/值对括在大括号（`{}`）的集合。对象内部的名称可以是字符串或是标记符后跟着一个冒号`":"`。在对象里最后一个名称/值对不应该以`","`为结束符，因为这样会导致错误。
```js
var myObjectLiteral = {
  variableKey: variableValue,
  functionKey: function () {
    // ...
  };
};
```
对象字面值不要求使用新的操作实例，但是不能够在结构体开始使用，因为打开`"{"`可能被解释为一个块的开始。在对象外新的成员会被加载，使用分配如下：`smyModule.property = "someValue";`下面我们可以看到一个更完整的使用对象字面值定义一个模块的例子：
```js
var myModule = {
  myProperty: "someValue",
  // 对象字面值包含了属性和方法（properties and methods）.
  // 例如，我们可以定义一个模块配置进对象：
  myConfig: {
    useCaching: true,
    language: "en"
  },
  // 非常基本的方法
  myMethod: function () {
    console.log( "Where in the world is Paul Irish today?" );
  },
  // 输出基于当前配置（<span>configuration</span>）的一个值
  myMethod2: function () {
    console.log( "Caching is:" + ( this.myConfig.useCaching ) ? "enabled" : "disabled" );
  },
  // 重写当前的配置（configuration）
  myMethod3: function( newConfig ) {
    if ( typeof newConfig === "object" ) {
      this.myConfig = newConfig;
      console.log( this.myConfig.language );
    }
  }
};

// 输出: Where in the world is Paul Irish today?
myModule.myMethod();

// 输出: enabled
myModule.myMethod2();

// 输出: fr
myModule.myMethod3({
  language: "fr",
  useCaching: false
});
```
使用对象字面值可以协助封装和组织你的代码。

**模块化模式**<br>
模块化模式最初被定义为一种对传统软件工程中的类提供私有和公共封装的方法。<br>
在JavaScript中，模块化模式用来进一步模拟类的概念，通过这样一种方式：我们可以在一个单一的对象中包含公共/私有的方法和变量，从而从全局范围中屏蔽特定的部分。这个结果是可以减少我们的函数名称与在页面中其他脚本区域定义的函数名称冲突的可能性。

**私有信息**
- 模块模式使用闭包的方式来将"私有信息",状态和组织结构封装起来。提供了一种将公有和私有方法，变量封装混合在一起的方式，这种方式防止内部信息泄露到全局中，从而避免了和其它开发者接口发生冲图的可能性。在这种模式下只有公有的API 会返回，其它将全部保留在闭包的私有空间中。
- 这种方法提供了一个比较清晰的解决方案，在只暴露一个接口供其它部分使用的情况下，将执行繁重任务的逻辑保护起来。这个模式非常类似于立即调用函数式表达式(IIFE-查看命名空间相关章节获取更多信息)，但是这种模式返回的是对象，而立即调用函数表达式返回的是一个函数。
- 需要注意的是，在javascript事实上没有一个显式的真正意义上的"私有性"概念，因为与传统语言不同，javascript没有访问修饰符。从技术上讲，变量不能被声明为公有的或者私有的，因此我们使用函数域的方式去模拟这个概念。在模块模式中，因为闭包的缘故，声明的变量或者方法只在模块内部有效。在返回对象中定义的变量或者方法可以供任何人使用。

下面这个例子通过创建一个自包含的模块实现了模块模式。
```js
var testModule = (function () {
  var counter = 0;
  return {
    incrementCounter: function () {
      return counter++;
    },
    resetCounter: function () {
      console.log( "counter value prior to reset: " + counter );
      counter = 0;
    }
  };
})();

// Usage:
// Increment our counter
testModule.incrementCounter();
// Check the counter value and reset
// Outputs: 1
testModule.resetCounter();
```
在这里我们看到，其它部分的代码不能直接访问我们的`incrementCounter()`或者`resetCounter()`的值。`counter`变量被完全从全局域中隔离起来了，因此其表现的就像一个私有变量一样，它的存在只局限于模块的闭包内部，因此只有两个函数可以访问`counter`。我们的方法是有名字空间限制的，因此在我们代码的测试部分，我们需要给所有函数调用前面加上模块的名字(例如`"testModule"`)。

当使用模块模式时，我们会发现通过使用简单的模板，对于开始使用模块模式非常有用。下面是一个模板包含了命名空间，公共变量和私有变量。
```js
var myNamespace = (function () {
  var myPrivateVar, myPrivateMethod;
  // A private counter variable
  myPrivateVar = 0;
  // A private function which logs any arguments
  myPrivateMethod = function( foo ) {
      console.log( foo );
  };
  return {
    // A public variable
    myPublicVar: "foo",
    // A public function utilizing privates
    myPublicFunction: function( bar ) {

      // Increment our private counter
      myPrivateVar++;
      // Call our private method using bar
      myPrivateMethod( bar );
    }
  };
})();
```
看一下另外一个例子，下面我们看到一个使用这种模式实现的购物车。这个模块完全自包含在一个叫做`basketModule`全局变量中。模块中的购物车数组是私有的，应用的其它部分不能直接读取。只存在与模块的闭包中，因此只有可以访问其域的方法可以访问这个变量。
```js
var basketModule = (function () {
  // privates
  var basket = [];
  function doSomethingPrivate() {
    //...
  }
  function doSomethingElsePrivate() {
    //...
  }
  // Return an object exposed to the public
  return {
    // Add items to our basket
    addItem: function( values ) {
      basket.push(values);
    },
    // Get the count of items in the basket
    getItemCount: function () {
      return basket.length;
    },
    // Public alias to a  private function
    doSomething: doSomethingPrivate,
    // Get the total value of items in the basket
    getTotal: function () {
      var q = this.getItemCount(), p = 0;
      while (q--) {
        p += basket[q].price;
      }
      return p;
    }
  };
}());
```
在模块内部，你可能注意到我们返回了应外一个对象。这个自动赋值给了`basketModule`因此我们可以这样和这个对象交互。
```js
// basketModule returns an object with a public API we can use
basketModule.addItem({
  item: "bread",
  price: 0.5
});
basketModule.addItem({
  item: "butter",
  price: 0.3
});
// Outputs: 2
console.log( basketModule.getItemCount() );
// Outputs: 0.8
console.log( basketModule.getTotal() );
// However, the following will not work:
// Outputs: undefined
// This is because the basket itself is not exposed as a part of our
// the public API
console.log( basketModule.basket );
// This also won't work as it only exists within the scope of our
// basketModule closure, but not the returned public object
console.log( basket );
```
上面的方法都处于`basketModule`的名字空间中。

请注意在上面的`basket`模块中 域函数是如何在我们所有的函数中被封装起来的，以及我们如何立即调用这个域函数，并且将返回值保存下来。这种方式有以下的优势：
- 可以创建只能被我们模块访问的私有函数。这些函数没有暴露出来（只有一些API是暴露出来的），它们被认为是完全私有的。
- 当我们在一个调试器中，需要发现哪个函数抛出异常的时候，可以很容易的看到调用栈，因为这些函数是正常声明的并且是命名的函数。
- 正如过去 T.J Crowder 指出的，这种模式同样可以让我们在不同的情况下返回不同的函数。我见过有开发者使用这种技巧用于执行UA（尿检，抽样检查）测试，目的是为了在他们的模块里面针对IE专门提供一条代码路径，但是现在我们也可以简单的使用特征检测达到相同的目的。

**模块模式的变体**
- Import mixins(导入混合)<br>
  这个变体展示了如何将全局（例如`jQuery`, `Underscore`）作为一个参数传入模块的匿名函数。这种方式允许我们导入全局，并且按照我们的想法在本地为这些全局起一个别名。
  ```js
  // Global module
  var myModule = (function (jQ, _) {
    function privateMethod1(){
      jQ(".container").html("test");
    }
    function privateMethod2(){
    console.log(_.min([10, 5, 100, 2, 1000]));
    }
    return{
      publicMethod: function(){
        privateMethod1();               
      }           
    };
    // Pull in jQuery and Underscore
  }(jQuery, _ ));
  myModule.publicMethod();
  ```
- Exports（导出）<br>
  这个变体允许我们声明全局对象而不用使用它们，同样也支持在下一个例子中我们将会看到的全局导入的概念。
  ```js
  // Global module
  var myModule = (function () {
      // Module object
    var module = {}, privateVariable = "Hello World";
    function privateMethod() {
      // ...
    }
    module.publicProperty = "Foobar";
    module.publicMethod = function () {
      console.log( privateVariable );
    };
    return module;
  }());
  ```
  工具箱和框架特定的模块模式实现。

**优缺点**:
- 优点:
  - 从javascript语言上来讲，模块模式相对于真正的封装概念更清晰。
  - 模块模式支持私有数据-因此，在模块模式中，公共部分代码可以访问私有数据，但是在模块外部，不能访问类的私有部分。
- 缺点:
  - 我们采用不同的方式访问公有和私有成员，因此当我们想要改变这些成员的可见性的时候，我们不得不在所有使用这些成员的地方修改代码。
  - 我们也不能在对象之后添加的方法里面访问这些私有变量。也就是说，很多情况下，模块模式很有用，并且当使用正确的时候，潜在地可以改善我们代码的结构。
  - 不能为私有成员创建自动化的单元测试，以及在紧急修复bug时所带来的额外的复杂性。根本没有可能可以对私有成员打补丁。相反地，我们必须覆盖所有的使用存在bug私有成员的公共方法。开发者不能简单的扩展私有成员，因此我们需要记得，私有成员并非它们表面上看上去那么具有扩展性。

**jQuery**<br>
因为jQuery编码规范没有规定插件如何实现模块模式，因此有很多种方式可以实现模块模式。Ben Cherry 之间提供一种方案，因为模块之间可能存在大量的共性，因此通过使用函数包装器封装模块的定义。<br>
在下面的例子中，定义了一个library 函数，这个函数声明了一个新的库，并且在新的库（例如 模块）创建的时候，自动将初始化函数绑定到document的ready上。
```js
function library( module ) {
  $( function() {
    if ( module.init ) {
      module.init();
    }
  });
  return module;
}

var myLibrary = library(function () {
  return {
    init: function () {
      // module implementation
    }
  };
}());
```

**Dojo**<br>
Dojo提供了一个方便的方法`dojo.setObject()`来设置对象。这需要将以`"."`符号为第一个参数的分隔符，如：`myObj.parent.child`是指定义在`"myOjb"`内部的一个对象`“parent”`，它的一个属性为`"child"`。使用`setObject()`方法允许我们设置`children`的值，可以创建路径传递过程中的任何对象即使这些它们根本不存在。<br>
例如，如果我们声明商店命名空间的对象`basket.coreas`，可以实现使用传统的方式如下：
```js
var store = window.store || {};
if ( !store["basket"] ) {
  store.basket = {};
}
if ( !store.basket["core"] ) {
  store.basket.core = {};
}
store.basket.core = {
  // ...rest of our logic
};
```
或使用`Dojo1.7`（AMD兼容的版本）及以上如下：
```js
require(["dojo/_base/customStore"], function( store ){
  // using dojo.setObject()
  store.setObject( "basket.core", (function() {
    var basket = [];
    function privateMethod() {
        console.log(basket);
    }
    return {
      publicMethod: function(){
        privateMethod();
      }
    };
  }()));
});
```

**ExtJS**<br>
下面我们可以看到一个例子关于如何定义一个名字空间，然后填入一个包含有私有和公有API的模块。除了一些语义上的不同之外，这个例子和使用vanilla javascript 实现的模块模式非常相似。
```js
// create namespace
Ext.namespace("myNameSpace");
// create application
myNameSpace.app = function () {
  // do NOT access DOM from here; elements don't exist yet
  // private variables
  var btn1, privVar1 = 11;
  // private functions
  var btn1Handler = function ( button, event ) {
    console.log( "privVar1=" + privVar1 );
    console.log( "this.btn1Text=" + this.btn1Text );
  };
  // public space
  return {
    // public properties, e.g. strings to translate
    btn1Text: "Button 1",
    // public methods
    init: function () {
      if ( Ext.Ext2 ) {
        btn1 = new Ext.Button({
          renderTo: "btn1-ct",
          text: this.btn1Text,
          handler: btn1Handler
        });
      } else {
        btn1 = new Ext.Button( "btn1-ct", {
          text: this.btn1Text,
          handler: btn1Handler
        });
      }
    }
  };
}();
```

**YUI**<br>
类似地，我们也可以使用YUI3来实现模块模式。下面的例子很大程度上是基于原始由Eric Miraglia实现的YUI本身的模块模式，但是和vanillla Javascript 实现的版本比较起来差异不是很大。
```js
Y.namespace( "store.basket" ) = (function () {
  var myPrivateVar, myPrivateMethod;
  // private variables:
  myPrivateVar = "I can be accessed only within Y.store.basket.";
  // private method:
  myPrivateMethod = function () {
    Y.log( "I can be accessed only from within YAHOO.store.basket" );
  }
  return {
    myPublicProperty: "I'm a public property.",
    myPublicMethod: function () {
      Y.log( "I'm a public method." );
      // Within basket, I can access "private" vars and methods:
      Y.log( myPrivateVar );
      Y.log( myPrivateMethod() );
      // The native scope of myPublicMethod is store so we can
      // access public members using "this":
      Y.log( this.myPublicProperty );
    }
  };
})();
```


## 4、原型模式


## 5、工厂模式


## 6、mixin模式


## 7、装饰模式


## 8、观察者模式


## 9、中介者模式


## 10、命令模式


## 11、外观模式


## 12、暴露模块模式


## 13、享元（Flyweight）模式


## 14、策略模式


## 15、代理模式


## 16、适配器模式


## 17、发布订阅者模式


