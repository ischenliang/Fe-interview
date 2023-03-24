# typescript面试题汇总
TypeScript 是 Microsoft 开发的JavaScript 的开源超集，用于在不破坏现有程序的情况下添加附加功能。

## 1、👍Typescript是什么？为什么需要 TypeScript？TypeScript有哪些特性？
TypeScript 是由 Microsoft 开发和维护的免费开源编程语言。它是 JavaScript 的强类型超集，可编译为纯 JavaScript。它是一种用于应用程序级 JavaScript 开发的语言。对于熟悉 C#、Java 和所有强类型语言的开发人员来说，TypeScript 非常容易学习和使用。

基于以下特点/原因需要 TypeScript：
- TypeScript 快速、简单，最重要的是，易于学习。
- TypeScript 支持面向对象的编程特性，例如类、接口、继承、泛型等。
- TypeScript 在编译时提供错误检查功能。它将编译代码，如果发现任何错误，它会在脚本运行之前突出显示错误。
- TypeScript 支持所有 JavaScript 库，因为它是 JavaScript 的超集。
- TypeScript 通过使用继承来支持可重用性。
- TypeScript 使应用程序开发尽可能快速和简单，TypeScript 的工具支持为我们提供了自动完成、类型检查和源文档。
- TypeScript 支持最新的 JavaScript 功能，包括 ECMAScript 2015。
- TypeScript 提供了 ES6 的所有优点以及更高的生产力。
- TypeScript 支持静态类型、强类型、模块、可选参数等。

特性：
- 跨平台：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。
- ES6 特性：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。
- 面向对象的语言：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。
- 静态类型检查：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。
- 可选的静态类型：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。
- DOM 操作：您可以使用 TypeScript 来操作 DOM 以添加或删除客户端网页元素。


## 2、使用 TypeScript 有哪些好处？
- Typescript提供了可选静态类型的好处。在这里，Typescript 提供了可以添加到变量、函数、属性等的类型。
- Typescript 能够编译成可在所有浏览器上运行的 JavaScript 版本。
- TypeScript 总是在开发期间在编译时突出显示错误，而 JavaScript 在运行时指出错误。
- TypeScript 支持强类型或静态类型，而这在 JavaScript 中不支持。
- TypeScript有助于代码结构。
- TypeScript使用基于类的面向对象编程。
- TypeScript通过 IntelliSense 提供出色的工具支持，在添加代码时提供主动提示。
- TypeScript通过定义模块，它具有命名空间概念。


## 3、TypeScript 的内置数据类型有哪些？
内置数据类型在 Typescript 中也称为原始数据类型。这些内置类型如下：
- Number类型：用于表示数字类型值。TypeScript 中的所有数字都存储为浮点值。语法：`let identifier: number = value`;
- String类型：它表示存储为 Unicode UTF-16 代码的字符序列。在脚本中包含字符串文字，方法是用单引号或双引号将它们括起来。语法：`let identifier: string = " "`;
- Boolean类型： 用于表示一个逻辑值。当使用布尔类型时，只能得到false或true的输出。布尔值是指定条件是否为true的真值。语法：`let bool = Boolean value`;
- Null类型： Null 表示一个值未定义的变量。不能直接引用 null 类型值本身。Null 类型没有用，因为我们只能为它分配一个空值。语法：`let num: number = null`;
- Undefined类型：它是未定义文字的类型。Undefined 类型表示所有未初始化的变量。它没有用，因为只能为其分配一个未定义的值。这种内置类型是所有类型的子类型。语法：`let num: number = undefined`;
- void类型：void是不返回任何类型值的函数的返回类型。它用于没有可用数据类型的地方。语法：`let unusable: void = undefined`;

除此之外，TypeScript 还支持以下复合类型：
- array：表示一个元素类型为 T 的数组。例如，number[] 表示一个数字数组。
- tuple：表示已知元素数量和类型的数组。例如，[string, number] 表示一个字符串和数字组成的元组。
- enum：表示一个命名的常量枚举。
- any：表示任意类型。
- unknown：与 any 类似，但是在更严格的类型检查下使用。
- object：表示非原始类型的对象。

还有一些其他的类型，例如 never、union 和 intersection，它们可以用于描述更复杂的类型。


## 4、谁开发了Typescript？TypeScript 目前的稳定版本是什么？
Typescript由 Anders Hejlsberg 开发，他也是 C# 语言开发团队的核心成员之一。TypeScript 4.9现在可用，5.0目前处于测试阶段。


## 5、TypeScript 中的接口是什么？
> 接口是一系列抽象方法的声明，是一些方法特征的集合。，这些方法都应该是抽象的，需要由具体的「类」去实现，然后第三方就可以通过这组抽象方法调用，让具体的类执行具体的方法。**简单来讲，一个接口所描述的是一个对象相关的属性和方法，但并不提供具体创建此对象实例的方法。**

接口是在应用程序中充当合约的结构。它定义了类要遵循的语法，这意味着实现接口的类必须实现其所有成员。它不能被实例化，但可以被实现它的类对象引用。TypeScript 编译器使用接口进行类型检查(也称为“鸭子类型”或“结构子类型”)，无论对象是否具有特定结构。
```ts
interface IEmployee {
  empCode: number;
  empName: string;
  getSalary: (number) => number; // arrow function
  getManagerName(number): string; 
}
```
接口仅声明方法和字段。它不能用于构建任何东西。接口无需转换为 JavaScript 即可执行。它们对运行时 JavaScript 的影响为零。因此，他们的唯一目的是在开发阶段提供帮助。


## 6、TypeScript 中的模块是什么？
**模块是typescript组织代码的一种方法，可以在模块中创建一组相关变量、函数、类和接口等数据。**
> 模块是在其自身的作用域里执行，并不是全局作用域，意味着定义在模块里的变量、函数和类等成员在模块外是不可见的，除非使用明确的`export`导出他们，然后在其他模块中使用`import`导入变量、函数和类等成员。

- 使用方式一: 通过`module`关键字创建
  ```ts
  module IShape {
    export interface IShapeInter {
      draw()
    }
  }
  export class Circle implements IShape.IShapeInter {
    draw() {
      console.log('Circle ....')
    }
  }
  ```
- 使用方式二：单独抽离一个`ts`文件
  ```ts
  // IShape.ts
  export interface IShapeInter {
    draw()
  }
  // Circle.ts
  import { IShapeInter } from './Ishape'
  export class Circle implements IShapeInter {
    draw() {
      console.log('Circle ....')
    }
  }
  ```


## 7、Typescript 中的命名空间是什么？ 如何在 Typescript 中声明命名空间？
命名空间**是一种用于组织和分类代码的特定方式，使你能够将相关代码组合在一起**。命名空间允许将与业务规则相关的变量、函数、接口或类分组到一个命名空间，将安全性分组到另一个命名空间。命名空间早期也称为内部模块。
> 命名空间的目的就是解决重名问题。
- 1、使用命名空间演示重名问题
  - 创建`speak.ts`: 当需要在外部调用命名空间中的类和接口，则需要在类和接口添加`export`关键字
    ```ts
    namespace Speak {
      export interface peopleSpeak {
        speakFun(): any;
      }
    }
    ```
  - 创建`speak1.ts`文件
    > 命名空间在一个单独的 TypeScript 文件中，可使用三斜杠`///`引用它
    ```ts
    /// <reference path = "speak.ts" />
    namespace Speak {
      export class SpeakTs implements peopleSpeak {
        speakFun() {
          console.log("ts")
        }
      }
    }
    ```
  - 创建`speak2.ts`文件
    ```ts
    /// <reference path = "speak.ts" />
    namespace Speak {
      export class SpeakHello implements peopleSpeak {
        speakFun() {
          console.log("hello")
        }
      }
    }
    ```
  - 创建`oneSpeak.ts`文件
    ```ts
    /// <reference path = "speak.ts" />   
    /// <reference path = "speak1.ts" /> 
    /// <reference path = "speak2.ts" /> 
    function speakStr (speak: Speak.peopleSpeak) {
      console.log(speak)
    }
    speakStr(new Speak.SpeakHello) // hello
    speakStr(new Speak.SpeakTs) // ts
    ```
- 2、嵌套命名空间的简单使用
  > 命名空间支持嵌套，可以将命名空间定义在另外一个命名空间里面，使用`export`导出命名空间
  - 创建`oneNest.ts`文件
    ```ts
    namespace XiaoGuai {
      export namespace Sam {
        export class Speak {
          public speakTs(oneStr: string) {
            return oneStr;
          }
        }
      }
    }
    ```
  - 创建`oneSpeak.ts`文件: 成员的访问使用点号`.`来实现
    ```ts
    /// <reference path = "oneNest.ts" />
    let oneStr = new XiaoGuai.Sam.Speak(); 
    console.log(oneStr.speakTs("hello ts")); //hello ts
    ```


## 8、TypeScript 中的类是什么？你如何定义它们？
**类描述了所创建的对象共同的属性和方法**。可以认为是为描述某种抽象而自定义的一种类型。
> 该类型通常会包含三种成员: 通过关键字`class`定义类
- 字段: 字段是类里面声明的变量。字段表示对象的有关数据。
- 构造函数: 类实例化时调用，可以为类的对象分配内存。
- 方法: 方法为对象要执行的操作。
```ts
class Student {
  // 字段
  studCode: number;    
  studName: string;
  // 构造函数
  constructor(code: number, name: string) {    
    this.studName = name;    
    this.studCode = code;    
  }
  // 方法
  getGrade() {    
    return "A+";    
  }    
}
```
使用`new`关键字来实例化类的对象
```ts
var student = new Student(1, '张三')
```
类中的字段属性和方法可以使用`.`号来访问
```ts
// 访问属性
student.studName

// 访问方法
student.getGrade()
```
类的特点是:
- 继承
- 封装
- 多态性
- 抽象


## 9、如何在TypeScript中实现继承？
继承是一种从另一个类获取一个类的属性和行为的机制。它是 OOP 语言的一个重要方面，具有从现有类创建新类的能力。其成员被继承的类称为基类，继承这些成员的类称为派生类。
> 可以使用 `extend` 关键字来实现继承。
```ts
class Shape {     
  Area:number     
  constructor(area:number) {     
    this.Area = area    
  }     
}     
class Circle extends Shape {     
  display():void {     
    console.log("Area of the circle: "+this.Area)     
  }     
}    
var obj = new Circle(320);     
obj.display()  //Output: Area of the circle: 320
```


## 10、在TypeScript中如何从子类调用基类构造函数？
你可以使用该`super()`函数来调用基类的构造函数。
```ts
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}
class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}
```


## 11、TypeScript 中的类型断言是什么？
TypeScript允许你覆盖它的推断，并且能以你任何你想要的方式分析它，这种机制被称为**类型断言**。
> **类型断言用来告诉编译器你比它更了解这个类型，并且它不应该再发出错误**。**类型断言的常用两种方式: `as`和`尖括号`**。

类型断言的一个常见用例是当你从 JavaScript 迁移到 TypeScript 时：
```js
const foo = {};
foo.bar = 123; // Error: 'bar' 属性不存在于 ‘{}’
foo.bas = 'hello'; // Error: 'bas' 属性不存在于 '{}'
```
这里的代码发出了错误警告，因为`foo`的类型推断为`{}`，即没有属性的对象。因此，你不能在它的属性上添加`bar`或`bas`，你可以通过类型断言来避免此问题：
```ts
interface Foo {
  bar: number;
  bas: string;
}
const foo = {} as Foo;
foo.bar = 123;
foo.bas = 'hello';
```
除了上面的`as`写法以外还有一种`尖括号`写法
```ts
const foo = <Foo>{};
foo.bar = 123;
foo.bas = 'hello';
```


## 12、Typescript中的变量是什么？如何在 Typescript 中创建变量？
变量是存储位置，用于存储程序要引用和使用的值/信息。它充当程序中价值的容器。可以使用`var`关键字声明它，应在使用前声明。在 Typescript 中声明变量时，应遵循某些规则
- 变量名称必须是字母或数字。
- 变量名不能以数字开头。
- 变量名不能包含空格和特殊字符，下划线 (`_`) 和美元 (`$`) 符号除外。

可以通过以下四种方式之一声明变量：
- 在单个语句中声明类型和值。语法：`var [identifier] : [type-annotation] = value;`。
- 声明没有值的类型。语法：`var [identifier] : [type-annotation]`;
- 不带类型声明其值。语法：`var [identifier] = value`;
- 不带值和类型的声明。语法：`var [identifier]`;


## 13、Mixin是什么？解释如何使用 TypeScript mixin。
所谓Mixin模式，就是对象继承的一种替代方案，中文译为`"混入(mix in)"`，意为在一个对象之中混入另外一个对象的方法。
::: tip Typescript mixin
1. 对象混入
  > 可以使用es6的`Object.assign`合并多个对象；
  ```ts
  interface Name {
    name: string
  }
  interface Age {
    age: number
  }
  interface Sex {
    sex: number
  }
  let people1: Name = { name: "小剑" }
  let people2: Age = { age: 20 }
  let people3: Sex = { sex: 1 }
  const people = Object.assign(people1,people2,people3)
  ```
2. 类的混入
  ```ts
  class A {
    type: boolean = false;
    changeType() {
      this.type = !this.type
    }
  }
  class B {
    name: string = '张三';
    getName(): string {
      return this.name;
    }
  }
  ```
  下面创建一个类，结合了这两个`mixins`
  > 注意: 没使用`extends`而是使用`implements`。把类当成了接口
  ```ts
  class C implements A,B{
    type: boolean
    changeType: () => void;
    name: string;
    getName: () => string
  }
  ```
  最后，创建这个帮助函数，帮我们做混入操作。它会遍历`mixins`上的所有属性，并复制到目标上去，把之前的占位属性替换成真正的实现代码`Object.getOwnPropertyNames()`可以获取对象自身的属性，除去他继承来的属性，对它所有的属性遍历，它是一个数组，遍历一下它所有的属性名。
  ```ts
  Mixins(C, [A, B])
  function Mixins(curCls: any, itemCls: any[]) {
    itemCls.forEach(item => {
      Object.getOwnPropertyNames(item.prototype).forEach(name => {
        curCls.prototype[name] = item.prototype[name]
      })
    })
  }
  ```
:::


## 14、TypeScript 中如何检查 null 和 undefined？
- 1、使用Nullish Coalescing检查`null`和`undefined`
  > Nullish Coalescing(`??`)是另一种识别`null`和`undefined`值的方法。当与`null`和`undefined`相对时，它将返回默认值。在某些情况下，零或空字符串是应该使用的实际值，但是当`||`被使用，它不会返回那些值。因此，使用 Nullish Coalescing (`??`) 运算符，可以返回这些值。因此`||`可以换成`??`当使用默认值时。
  ```ts
  null ?? "Value"; // "Value"
  undefined ?? "Value"; // "Value"
  false ?? true; // false
  0 ?? 100; // 0
  "" ?? "n/a"; // ""
  NaN ?? 0; // NaN
  ```
- 2、使用`==`和`===`运算符检查`null`和`undefined`
  ```js
  var a: number;  
  var b: number = null;  
  function check(x, name) {  
    if (x == null) {  
      console.log(name + ' == null');  
    }  
    if (x === null) {  
      console.log(name + ' === null');  
    }  
    if (typeof x === 'undefined') {  
      console.log(name + ' is undefined');  
    }  
  }  
  check(a, 'a');  
  check(b, 'b');
  ```
  输出结果如下：
  ```js
  "a == null"
  "a is undefined"
  "b == null"
  "b === null"
  ```


## 15、TypeScript 中的 getter/setter 是什么？你如何使用它们？
`Getter`和`setter`是特殊类型的方法，存取器可以让我们可以有效的控制对"对象"中的中的成员的访问。
> 在获取值的时候会执行`get`，在修改或者说重新设置值的时候会执行`set`
```ts
class Person{
  firstName: string //姓氏
  lastName: string  //名字
  constructor(firstName: string, lastName: string) {
    console.log('在实例化对象的时候, 构造器被执行')
    this.firstName = firstName
    this.lastName = lastName
  }
  // 对数据进行读取
  get fullName() {
    console.log('get方法被执行了')
    return this.firstName+"-"+this.lastName
  }
  // 对数据进行修改
  set fullName(str: string) {
    console.log('set方法被执行了')
    this.firstName = str.split('-')[0]
    this.lastName = str.split('-')[1]
  }
}

const per = new Person('张', '无忌');
// 会去执行get方法,因为获取值吗
console.log(per.fullName)
// 会去执行set方法；因为你修改了值
per.fullName = '李-四'
```


## 16、如何允许模块外能够访问模块内定义的类？
你可以使用`export`关键字打开模块以供在模块外使用。
```ts
module Admin {
  export class Employee {
    constructor(name: string, email: string) { }
  }
  let alex = new Employee('alex', 'alex@gmail.com');
}
let nick = new Admin.Employee('nick', 'nick@yahoo.com');
```


## 17、如何使用 Typescript 将字符串转换为数字？
- 1、使用`parseInt`或`parseFloat`函数分别将字符串转换为整数或浮点数
  ```ts
  var x = '32'
  var y: number = parseInt(x)
  ```
- 2、还可以使用`一元运算符+`将字符串转换为最合适的数字类型
  - `“3”`成为整数`3`
  - 而`“3.14”`成为浮点数`3.14`
  ```ts
  var x = "32";
  var y: number = +x;
  ```


## 18、TypeScript 和 JavaScript 有什么区别？
TypeScript 在以下方面与 JavaScript 不同：

| 编号 | JavaScript | TypeScript |
| :---: | :-------: | :--------: |
| 1 | 它由 Netscape 于 1995 年开发 | 它由 Anders Hejlsberg 于 2012 年开发 |
| 2 | JavaScript 源文件的扩展名为`.js`。TypeScript 源文件的扩展名为`.ts` | TypeScript 支持 ES6 |
| 3 | JavaScript 不支持 ES6 | TypeScript 支持 ES6 |
| 4 | 它不支持强类型或静态类型 | 它支持强类型或静态类型功能 |
| 5 | 它只是一种脚本语言 | 它支持面向对象的编程概念，如类、接口、继承、泛型等 |
| 6 | JavaScript 没有可选参数功能 | TypeScript 具有可选参数功能 |
| 7 | 它是解释性语言，这就是它在运行时突出显示错误的原因 | 它在开发期间编译代码并突出显示错误 |
| 8 | JavaScript 不支持模块 | TypeScript 支持模块 |
| 9 | 数字、字符串是对象 | 数字、字符串是接口 |
| 10 | JavaScript 不支持泛型 | TypeScript 支持泛型 |



## 19、TypeScript 中的 JSX 是什么？可以在 TypeScript 中使用 JSX 吗？
JSX是一种JavaScript的语法扩展，全称`JavaScript XML`，运用于React架构中，其格式比较像是模版语言，但事实上完全是在JavaScript内部实现的。

在typescript中使用JSX，必须做两件事:
- 使用`.tsx`(替代`.ts`)扩展名命名文件
- 启用`jsx`选项: `tsconfig.json`配置文件的`compilerOptions`里设置选项`"jsx": "react"`


## 20、TypeScript 支持哪些 JSX 模式？
TypeScript有内置的支持`preserve`，`react`和`react-native`，不同的模式会输出不同的结果，具体如下：
- `preserve`保持JSX完整以用于后续转换。
  - 输入：`<div />`
  - 输出：`<div />`
  - 输出文件扩展名：`.jsx`
- `react`不经过JSX转换，而是`react.createElement`作为`.js`文件扩展名发出和输出。
  - 输入：`<div />`
  - 输出：`React.createElement("div")`
  - 输出文件扩展名：`.js`
- `react-native`结合起来`preserve`，`react`因为它维护所有JSX和输出作为`.js`扩展。
  - 输入：`<div />`
  - 输出：`<div />`
  - 输出文件扩展名：`.js`


## 21、如何编译 TypeScript 文件？
你需要调用TypeScript编译器`tsc`来编译文件。你需要安装TypeScript编译器，可以使用`npm`安装
```sh
npm install -g typescript
tsc hello.ts
```


## 22、TypeScript 中有哪些作用域可用？这与JS相比如何？
- 全局作用域：在任何类之外定义，可以在程序中的任何地方使用。
- 函数/类范围：在函数或类中定义的变量可以在该范围内的任何地方使用。
- 局部作用域/代码块：在局部作用域中定义的变量可以在该块中的任何地方使用。


## 23、TypeScript 中的箭头/lambda 函数是什么？
ES6版本的TypeScript提供了用于定义匿名函数的简写语法，即函数表达式。这些箭头函数也称为**Lambda函数**。**lambda函数是没有名称的函数**。箭头函数省略了 `function` 关键字。
```js
let sum = (a: number, b: number): number => {    
  return a + b;    
}    
console.log(sum(20, 30)); //returns 50
```
在上面，`?=>?` 是一个 lambda 运算符， `(a + b)` 是函数体， `(a: number, b: number)`是内联参数。


## 24、解释rest参数和声明rest参数的规则。
ES6 引入`rest参数`(形式为`...变量名`)，用于获取函数的多余参数，这样就不需要使用`arguments`对象了。`rest参数`搭配的变量是一个数组，该变量将多余的参数放入数组中。

rest参数要遵循的规则：
- 一个函数中只允许有一个剩余参数。
- 它必须是数组类型。
- 它必须是参数列表中的最后一个参数。
```ts
function sum(a: number, ...b: number[]) {
  console.log(b);
}
let result1 = sum(3, 5); // [5] 
let result2 = sum(3, 5, 7, 9); // [5, 7, 9]

// arguments演示
function add () {
  console.log(arguments)
}
add(1, 2, 3) // [1, 2, 3]
```
注意: **`rest`参数必须是参数定义的最后一个，并且每个函数只能有一个`rest`参数**。


## 25、什么是三斜线指令？有哪些三斜杠指令？
三斜线指令是单行注释，包含用作编译器指令的 XML 标记。每个指令都表示在编译过程中要加载的内容。三斜杠指令仅在其文件的顶部工作，并且将被视为文件中其他任何地方的普通注释。
- `/// <reference path="..." />` 是最常见的指令，定义文件之间的依赖关系。
- `/// <reference types="..." />`类似于path但定义了包的依赖项。
- `/// <reference lib="..." />`允许您显式包含内置lib文件。


## 26、Omit、Pick、Partial类型有什么作用？
::: tip Omit
`Omit`是TypeScript3.5新增的一个辅助类型。
> 作用: 以一个类型为基础支持**剔除**某些属性，然后返回一个新类型。
```ts
type Todo = {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type newTodo = Omit<Todo, 'title' | 'description'>;
```
应用于`interface`接口
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type newTodo = Omit<Todo, "description">;
```
我们使用返回的新类型创建一个变量
```ts
const todo: newTodo = {
  title: '代办1',
  completed: false,
  createdAt: Date.now()
}
console.log(todo.description)
```
会发现，我们在访问`todo.description`时编译器会报错: `类型“newTodo”上不存在属性“description”`。
注意: `Omit`的第二个参数也接受键的并集。
```ts
type newTodo = Omit<Todo, 'description' | 'completed' | ...>;
```
:::

::: tip Pick
`Pick`也是TypeScript的一个辅助类型。只能用来生成`类型`而不是`接口`。
> 作用: 以一个类型为基础支持**挑选**一些属性，然后返回一个新类型，与`Omit`恰好相反。
```ts
type Todo = {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type newTodo = Pick<Todo, 'title' | 'description'>;
```
与`Omit`一样，应用于`interface`接口
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type newTodo = Pick<Todo, 'title' | 'description'>;
```
我们使用返回的新类型创建一个变量
```ts
const todo: newTodo = {
  title: '代办1',
  description: '代办1的描述'
}
console.log(todo.createdAt)
```
会发现，我们在访问`todo.createdAt`时编译器会报错: `类型“newTodo”上不存在属性“createdAt”`。
```ts
interface newTodo = Pick<Todo, 'title' | 'description'>;
```
上面的代码会报错: `“Pick”仅表示类型，但在此处却作为值使用`，即`Pick`只能用来定义类型而不是接口。
:::

::: tip Partial
`Partial`也是TypeScript的一个辅助类型。
> 作用: 将返回类型的所有属性设置为可选的。
```ts
type Todo = {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type newTodo = Partial<Todo>;
```
应用于`interface`
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type newTodo = Partial<Todo>;
```
我们使用返回的新类型创建一个变量
```ts
const todo: newTodo = {
  title: '123'
}
```
可以发现上面的所有的属性都是可选的，从下图可以看出
![202303191448552.png](http://img.itchenliang.club/img/202303191448552.png)
:::


## 27、TypeScript中如何实现函数重载？
要在 TypeScript 中重载函数，只需创建两个函数名称相同、参数数量相同但类型不同、返回值类型不同的函数。这是 TypeScript 中多态性的重要组成部分。

例如，你可以创建一个add函数，如果它们是数字，则将两个参数相加，如果它们是字符串，则将它们连接起来。
```ts
function add(a:string, b:string):string;
function add(a:number, b:number): number;
function add(a: any, b:any): any {
  return a + b;
}
add("Hello ", "Steve"); // returns "Hello Steve" 
add(10, 20); // returns 30
```


## 28、如何让接口的所有属性都可选？
使用`Partial`实用程序类型使一个类中的所有属性都是可选的，例如`const emp: Partial<Employee> = {};`。 `Partial`实用程序类型构造一个新类型，其中提供的类型的所有属性都设置为可选。
```ts
interface Employee {
  id: number;
  name: string;
  salary: number;
}

const emp: Partial<Employee> = {};
emp.name = 'James';
```
使用`Partial`实用程序类型来构造一个新类型，其中提供的类型的所有属性都设置为可选。
```ts
const obj = {
  id: 1,
  name: 'James',
  salary: 100,
};

// type T = {
//     id?: number | undefined;
//     name?: string | undefined;
//     salary?: number | undefined;
// }
type T = Partial<typeof obj>;
```
**注意**: 我们必须使用`typeof`类型运算符，因为`Partial`需要一个类型。我们可以在 TypeScript 的 Github 存储库中看到内置的`Partial`类型是如何实现的。
```ts
/**
 * Make all properties in T optional
 */
type Partial<T> = {
    [P in keyof T]?: T[P];
};
```
`?: `语法称为映射修饰符，用于影响可选性。我们还可以看到`+?:`正在使用，它达到了相同的结果。 如果不添加前缀，则假定为`+`。
::: tip 提示
实用程序类型基本上采用所提供类型的所有属性并将它们标记为可选。
:::
映射修饰符可以以两种方式影响可选性，例如 我们还可以使用它们来制作接口所需的所有属性，方法是在`?:`前加上减号`-?:`。
::: tip 提示
如果我们不添加前缀，则假定为`+`，就像在`Partial`实用程序类型中一样。
:::
```ts
/**
 * Make all properties in T required
 */
type Required<T> = {
  [P in keyof T]-?: T[P];
};
```
这是`Required`实用程序类型的代码，它使得所提供类型的所有属性都是必需的。
> 请注意，唯一更改的字符是问号前面的减号，以使用删除可选性的映射修饰符。


## 29、什么时候应该使用关键字unknown？
`unknown`是一种类似于`any`的特殊类型。示例如下：
```ts
let x: unknown;
```
**推荐使用`unknown`而不是`any`，因为它提供了更安全的类型--如果想对`unknown`进行操作，必须使用类型断言或缩小到一个特定的类型。**

### unknown和any的区别
我们知道`any`类型的变量可以被赋给任何值。
```ts
let myVar: any = 0;
myVar = '1';
myVar = false;
```
我们也可以为`unknown`类型变量分配任何值：
```ts
let myVar: unknown = 0;
myVar = '1';
myVar = false;
```
从上面例子还无法看出两者的区别，接下来我们看另外的例子。

为了更好地理解`unknown`和`any`之间的区别，我们先从编写一个想要调用其唯一参数的函数开始。
- any类型
  ```ts
  function demo (callback: any) {
    callback() // Uncaught (in promise) TypeError: callback is not a function
  }
  demo(1)
  ```
  上面代码中`callback`参数是任何类型的，所以语句`callback()`不会触发类型错误。我们可以用`any`类型的变量做任何事情。但是运行会抛出一个运行时错误:`TypeError: callback is not a function`。`1`是一个数字，不能作为函数调用，TypeScript并没有保护代码避免这个错误。
  > 既允许`demo()`函数接受任何类型的参数，又要强制对该参数进行类型检查防止上面这种报错，接下来看`unknown`类型。
- unknown类型
  ```ts
  function demo (callback: unknown) {
    callback()
  }
  demo(1)
  ```
  此时可以看到，我们的编译器在报错，提示`此表达式不可调用。类型 "{}" 没有调用签名。`，与`any`相反，对于`unknown`类型，TypeScript会保护我们不调用可能不是函数的东西。但是还是会报错，如何解决呢？
  - 在使用一个`unknown`类型的变量之前，你需要进行类型检查: 所以我们只需要检查`callback`是否是一个函数类型即可。
    ```ts
    function demo (callback: unknown) {
      if (typeof callback === 'function') {
        callback()
      }
    }
    demo(1)
    ```

### unknown和any的心智模式
理解两者区别的规则:
- 可以将任何东西赋给`unknown`类型，但在进行类型检查或类型断言之前，不能对`unknown`进行操作
- 可以把任何东西分配给`any`类型，也可以对`any`类型进行任何操作
  - `unknown`示例：
    ```ts
    function demo(callback: unknown) {
      // 可以将任何东西赋给 `unknown` 类型，
      // 但在进行类型检查或类型断言之前，不能对 `unknown` 进行操作
      if (typeof callback === 'function') {
        callback();
      }
    }
    demo(1); // You can assign anything to `unknown` type
    ```
    类型检查`typeof callback === 'function'`，检查`callback`是否为函数，如果是，则可以调用。
  - `any`示例：
    ```ts
    function demo(callback: any) {
      // 可以对 `any` 类型执行任何操作
      callback();
    }
    demo(1); // 可以把任何东西分配给`any`类型
    ```
    如果`callback`是`any`, TypeScript就不会强制`callback()`语句进行任何类型检查。

对于Typescript对`unknown`类型的防御性，但我们要对未知类型执行某些操作时如何处理:
- **方法一:使用类型断言缩小未知范围**
  ```ts
  let notSure:unknown = "sisterAn"
  console.log((notSure as string).toLowerCase());
  ```
- **使用类型守卫进行类型收缩**
  ```ts
  let notSure:unknown = "sisterAn"
  if(typeof notSure === "string"){
    console.log((notSure as string).toLowerCase());
  }
  ```


## 30、什么是装饰器，它们可以应用于什么？
在TypeScript中，装饰器（Decorators）是一种特殊的声明，它可以用来为类、方法、属性或参数等添加元数据并修改它们的行为。
> 装饰器通过`@`符号后跟一个函数来定义，并可以被应用于类、方法、属性或参数等。以下是一个简单的装饰器示例：
```ts
function log(target: any, key: string, descriptor: PropertyDescriptor) {
  // 在控制台输出日志
  console.log(`Calling "${key}" method`);
  // 返回修改后的PropertyDescriptor对象
  return descriptor;
}

class MyClass {
  @log
  greet(name: string) {
    console.log(`Hello, ${name}!`);
  }
}

let obj = new MyClass();
obj.greet("John");  // 输出："Calling "greet" method" 和 "Hello, John!"
```
在上面的示例中，我们定义了一个装饰器函数`log`，它接受三个参数：目标对象、属性名称和属性描述符。然后，我们将该装饰器应用于`MyClass`类中的`greet`方法上。当我们调用`obj.greet`时，装饰器函数将自动执行，并在控制台输出日志，同时仍然按预期执行`greet`方法。

除了自定义装饰器之外，TypeScript还提供了许多内置的装饰器，例如`@deprecated`、`@sealed`和`@observable`等，可用于标记和修改类中的各种属性和方法。


## 31、如何将多个ts文件合并为一个js文件
```ts
// file1.ts
function file1 () {
  console.log('file1')
}
// file2.ts
function file2 () {
  console.log('file2')
}
```
```shell
tsc --outFile merge.js file1.ts file2.ts
```
这样就将三个ts文件合并到`merge.js`文件中，`merge.js`文件内容如下
```js
function file1() {
  console.log('file1');
}
function file2() {
  console.log('file2');
}
```

**特殊情况**
> 首先我们在上面示例的基础上新建`file3.ts`，其内容如下
```ts
function file3() {
  console.log('file3');
}
```
然后使用下面的命令
```shell
tsc --outFile file3.ts file1.ts file1.ts
```
最终得到的结果是，`file2.ts`和`file3.ts`会被编译，并且输出会放在`file3.ts`中。
> 所以现在的 `file3.ts` 包含 JavaScript 代码。
```js
function file1() {
  console.log('file1');
}
function file2() {
  console.log('file2');
}
```


## 32、如何自动编译ts文件，并且自动修改ts文件
可以通过 `.ts` 文件中的实时更改自动编译`.ts`。这可以通过使用 `--watch` 编译器选项来实现。
```shell
tsc --watch file1.ts
```
上面的命令首先编译 `file1.js` 中的 `file1.ts` 并观察文件的变化。如果检测到任何更改，它将再次编译该文件。在这里，需要确保在使用 `--watch` 选项运行时不能关闭命令提示符。


## 33、TypeScript支持哪些面向对象的术语
TypeScript 支持以下面向对象的术语：
- 模块
- 类
- 接口
- 继承
- 数据类型
- 成员函数


## 34、TypeScript中的泛型
在TypeScript中，泛型（Generics）是一种将类型参数化以在多个地方重复使用的方式。

使用泛型可以写出更灵活、可重用的代码，并且可以增加类型安全性。例如，以下是一个简单的泛型函数示例：
```ts
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("hello");  // 类型推断为 string
let output2 = identity<number>(42);       // 类型推断为 number
```
在上面的示例中，`identity`函数接受一个类型参数`T`并返回该类型的值。通过使用`<T>`语法来指定泛型类型，我们可以在不同的调用中传递不同的类型，并让TypeScript进行类型推断。

**注意**: 除了函数之外，还可以使用泛型类和泛型接口，它们具有与泛型函数相似的语法和目的，使您可以编写通用的代码，同时保持类型安全和灵活性。


## 35、TypeScript中const和readonly的区别是什么？枚举和常量的区别？
在TypeScript中，`const`和`readonly`都用于创建不可变的变量或属性，但它们有着不同的作用和使用场景。
::: tip `const`和`readonly`的区别
- `const`用于定义常量，常量的值在编译时就必须已知，并且不能被重新赋值。
- `readonly`用于定义只读属性或变量，只能在声明时或构造函数中初始化，并且不能被重新赋值。
```ts
const PI = 3.14;
PI = 3; // Error: Cannot assign to 'PI' because it is a constant.

class MyClass {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  setName(name: string) {
    this.name = name;  // Error: Cannot assign to 'name' because it is a read-only property.
  }
}
```
:::
::: tip 枚举和常量的区别
- `枚举`是一组具有命名值的相关常量的集合，与常量不同，枚举成员可以包含其他值（例如字符串或数字）。
- `常量`是指在编译时已知并且不会改变的值，而枚举则是一组相关的常量。
```ts
enum Color {
  Red = "#FF0000",
  Green = "#00FF00",
  Blue = "#0000FF"
}
const PI = 3.14;
```
在上面的示例中，我们定义了一个`Color`枚举，其中包含三个成员，并将其用作颜色代码的映射。另外我们还定义了一个常量`PI`，它的值为`3.14`。
:::


## 36、TypeScript中的枚举是什么？
枚举或枚举是一种 TypeScipt 数据类型，它允许我们定义一组命名常量。使用枚举可以更轻松地记录意图，或创建一组不同的案例。它是相关值的集合，可以是数字或字符串值。
```ts
enum Gender {  
  Male,  
  Female  
  Other  
}  
console.log(Gender.Female); // Output: 1  
//We can also access an enum value by it's number value.  
console.log(Gender[1]); // Output: Female
```


## 37、TS中的接口interface 和 type 语句有什么区别
```ts
interface X {  
  a: number  
  b: string  
}  
type X = {  
  a: number  
  b: string  
}
```
type（类别名的） 和 interface （接口）的区别？
1. 类型别名可以为任何类型引入名称。例如基本类型，联合类型等
2. 类型别名不支持继承
3. 类型别名不会创建一个真正的名字
4. 类型别名无法被实现(implements)，而接口可以被派生类实现
5. 类型别名重名时编译器会抛出错误，接口重名时会产生合并

| 接口interface | type类型 |
| :-----------: | :-------: |
| 接口声明总是引入指定的对象类型。 | 类型别名声明可以为任何类型(包括基元类型、联合类型和交集类型)引入名称
| 接口可以extends继承。 | 不能继承 |
| 接口创建一个到处使用的新名称。 | 类型别名不会创建一个真正的名字。 |
| 接口重名时会产生合并 | 类型别名重名时编译器会抛出错误 |


## 39、TypeScript的as语法是什么？
`as` 是 TypeScript 中类型断言的附加语法。引入 `as-syntax` 的原因是原始语法 (`<type>`) 与 JSX 冲突。
```ts
let empCode: any = 111;     
let employeeCode = code as number;
```
将 TypeScript 与 JSX 一起使用时，只允许使用 as 样式的断言。


## 40、TypeScript的Enum枚举类型？
参考：https://www.jianshu.com/p/b924c9d12bfb
TypeScript 在 ES 原有类型基础上加入枚举类型，使得在 TypeScript 中也可以给一组数值赋予名字，这样对开发者比较友好，可以理解枚举就是一个字典。枚举类型使用enum来定义：
```ts
enum Gender {  
  Male,  
  Female  
  Other  
}  
console.log(Gender.Female); // : 1  
// 我们还可以通过enum值的number值来访问它
console.log(Gender[1]); // : Female 
```


## 41、TS中的声明合并
在TypeScript中，当具有相同名称的函数、类或命名空间等多个声明出现时，它们会自动合并为一个声明。这称为声明合并。

声明合并适用于以下情况：
1. 函数声明和函数表达式
2. 同名接口
  ```ts
  // 同名接口合并
  interface Person {
    name: string;
  }
  interface Person {
    age: number;
  }
  let person: Person = { name: "John", age: 30 };
  ```
3. 类型别名
  ```ts
  // 类型别名合并
  type Point = [number, number];
  type Point = {
    x: number;
    y: number;
  };
  let point: Point = { x: 0, y: 0 };
  ```
4. 命名空间
  ```ts
  // 命名空间合并
  namespace MyNamespace {
    export const name = "MyNamespace";
  }
  namespace MyNamespace {
    export function greet() {
      console.log(`Hello from ${name}!`);
    }
  }
  MyNamespace.greet(); // 输出：Hello from MyNamespace!
  ```

注意: **声明合并仅限于类型和命名空间，不适用于变量、函数等其他实体**。


## 42、TypeScript中?. , ?? , !： , _ , ** 等符号的含义？
- `?.` 可选链，通常我们的写法是直接上if判断啥的，然后再取data中的属性，但是有了问号点(`?.`)写法就简单很多了
  ```ts
  // 1.data可能为null,undefined , row也可能为null,undefined
  // 2.假设data完整结构 {row:{name:'aaa'}}
  function getData(data: any){
    let name = data?.row?.name
  }

  // 普通写法
  // 1.data可能为null,undefined , row也可能为null,undefined
  // 2.假设data完整结构 {row:{name:'aaa'}}
  function getData(data: any){
    let name;
    if (data && data.row) {
      name = data.row.name
    }
  }
  ```
- `??` 类似与`||`，??避免了一些意外情况，0，NaN以及"",false被视为false值。只有undefind,null被视为false值。
  ```ts
  console.log(null || 5)   //5
  console.log(null ?? 5)     //5

  console.log(undefined || 5)      //5
  console.log(undefined ?? 5)      //5

  console.log(0 || 5)       //5
  console.log(0 ?? 5)      //0
  ```
- `!.` 在变量名后添加`!.`，可以断言排除undefined和null类型
  ```ts
  let a: string | null | undefined
  a.length // error
  a!.length // ok
  ```
- `_ ,` 声明该函数将被传递一个参数，但您并不关心它
- `!:` 待会分配这个变量，ts不要担心
- `**` 求幂
- `?:` 指可选参数，可以理解为参数自动加上undefined
  ```ts
  function echo(x: number, y?: number) { // 可选参数
    return x + (y || 0);
  }
  ```

## 43、TypeScript中什么是 any 类型，何时使用？
任意数据类型：any
- 如果是不同变量的话，可以是任意的数据类型
- 如果是对象的话，any不能够提示原有的属性和方法
- 未给初始值的变量类型为any


## 44、什么是void，什么时候使用void类型？
`void`表示变量没有类型，它充当与任何相反的类型，它在不返回值的函数中特别有用

如果变量是 `void` 类型，则只能将 `null` 或 `undefined` 值分配给该变量。
```ts
function notify(): void {
  alert('Hello World!')
}
```


## 45、如何在 TypeScript 中指定可选属性？
通过添加 `?` 对象类型可以具有零个或多个可选属性，在属性名称之后
```ts
let pt: { x: number; y?: number } = {
  x: 10
}
```


## 46、TypeScript 中控制成员可见性有几种方法？ ts中的访问修饰符？
TypeScript 提供了三个关键字来控制类成员的可见性
- `public`：您可以在 class 外的任何地方访问公共成员。默认情况下，所有类成员都是公共的。
- `protected`：受保护的成员仅对包含该成员的类的子类可见。不扩展容器类的外部代码无法访问受保护的成员。
- `private`：私有成员仅在类内部可见，没有外部代码可以访问类的私有成员。
- `readonly`：属性设置为只读


## 47、TypeScript 支持静态类吗？为什么？
TypeScript 不支持静态类，这与流行的 C# 和 Java 等面向对象的编程语言不同。这些语言需要静态类，因为所有代码，即数据和函数，都需要在一个类中并且不能独立存在。静态类提供了一种方法来允许这些功能，而无需将它们与任何对象相关联。在 TypeScript 中，您可以将任何数据和函数创建为简单对象，而无需创建包含类。因此 TypeScript 不需要静态类，单例类只是 TypeScript 中的一个简单对象。


## 48、Typescript 的缺点是什么？
TypeScript 有以下缺点：
- TypeScript 需要很长时间来编译代码。
- TypeScript 不支持抽象类。
- 如果在浏览器中运行 TypeScript 应用程序，则需要一个编译步骤将 TypeScript 转换为 JavaScript。
- 几十年来，Web 开发人员一直在使用 JavaScript，而 TypeScript 并没有带来任何新东西。
- 要使用任何第三方库，定义文件是必须的。并不是所有的第三方库都有可用的定义文件。
- 类型定义文件的质量是一个问题，如何确定定义是正确的？


## 49、TypeScript中any,never,unknown和viod有什么区别？
1. `unknown`类型和`any`类型类似。与`any`类型不同的是`unknown`类型可以接受任意类型赋值，但是`unknown`类型赋值给其他类型前，必须进行断言或守卫。
2. `never`，`never`表示永远不存在的类型。比如一个函数总是抛出错误，而没有返回值。或者一个函数内部有死循环，永远不会有返回值。函数的返回值就是`never`类型。
  ```ts
  //抛出异常
  function error(msg:string):never{
      throw new Error(msg)
  }//抛出异常会直接中断程序运行，这样程序就运行不到返回值那一步了，即具有不可到达的终点，也就永不存在返回了

  //死循环
  function loopForever():never{
      while(true){}
  } //同样程序永远无法运行到函数返回值那一步  即永不存在返回
  ```
  变量也可以声明为`never`类型，因为它是永不存在的值的类型，所以任何类型都不能赋值给`never`类型(除了`never`本身之外, 即使`any`也不可以赋值给`never`)。
  ```ts
  let never1:never
  // any 也不能分配给never
  let any1: any = "sisterAn"
  never1 = any1 // error


  // 作为函数返回值的never
  let never2: never = (()=>{
    throw new Error("Throw error")
  })()
  never1 = never2
  ```
3. `void`, 没有显示的返回值的函数返回值为`void`类型。如果一个变量为`void`类型，只能赋予`undefined`或者`null`(注意,`“strickNullChecks”:true`时会报错)和`void`本身。
  ```ts
  function hello(): void{
    console.log("hello sisterAn");
  }

  let void1:void
  let null1:null = null
  let nud1:undefined = undefined
  let void2:void

  void1 = void2
  void1 = und1
  void1 = null1 //type "null" is not assignable to type 'void'
  ```

## 50、TypeScript 中 never 和 void 的区别
- `void`表示没有任何类型（可以被赋值为`null`和`undefined`）。
- `never`表示一个不包含值的类型，即表示永远不存在的值。

拥有`void`返回值类型的函数能正常运行。拥有`never`返回值类型的函数无法正常返回，无法终止，或会抛出异常。
- 用于函数时`never`表示函数用于执行不步(抛出异常或死到返回值那一循环)的返回值类型，即永不存在值的类型。
- 用于函数时`void`则表示没有返回值，不返回或返回`undefined`


## 51、安装 Typescript 的最低要求是什么？或者如何获得 TypeScript 并安装它？
TypeScript 可以通过 npm(Node.js 包管理器)在 node 的帮助下安装和管理。要安装 TypeScript，首先确保 npm 安装正确，然后运行以下命令在系统上全局安装 TypeScript。 
```shell
npm install -g typescript
```
它安装了一个命令行代码tsc，它将进一步用于编译 Typescript 代码。

安装 TypeScript 涉及以下步骤：
- 下载并运行节点的 `.msi` 安装程序。
- 输入命令`node -v`检查是否安装成功。
- 在终端窗口中输入以下命令来安装 Typescript： `npm install -g typescript`


## 52、内部模块和外部模块有什么区别？
内部模块主要用于封装一些相关的功能或对象，并避免与其他代码发生命名冲突。它们可以使用`namespace`关键字来定义，通过点运算符进行访问。例如：
```ts
namespace MyNamespace {
  export function myFunction() {
    // ...
  }
  export class MyClass {
    // ...
  }
}
```
外部模块主要用于分离和组织代码，以便更好地管理和重用代码。它们可以使用`import`和`export`关键字进行导入和导出，以便在不同文件或模块之间共享代码。例如：
```ts
// 在 module1.ts 文件中
export function myFunction() {
  // ...
}
// 在 module2.ts 文件中
import { myFunction } from './module1';
myFunction();
```


## 53、👍可以在后端使用 TypeScript 吗？ 如果是可以，那么应该如何使用？
> 拓展说明：如何在koa中使用ts。

是的，可以在后端使用 TypeScript。可以通过下面的例子来理解它。在这里，选择 Node.js 并具有一些额外的类型安全性和该语言带来的其他抽象。
1. 第1步：安装 Typescript 编译器：
  ```shell
  npm i -g typescript
  ```
2. 第2步：TypeScript 编译器采用`tsconfig.json`文件中的选项。此文件确定将构建文件放在何处。
  ```json
  {  
    "compilerOptions": {  
      "target": "es5",  
      "module": "commonjs",  
      "declaration": true,  
      "outDir": "build"  
    }  
  }
  ```
3. 第3步：编译ts文件
  ```shell
  tsc
  ```
4. 第4步：运行
  ```shell
  node build/index.js
  ```



## 55、是否可以调试任何 TypeScript 文件？
TypeScript 文件可以像 JavaScript 文件一样进行调试。以下是在 VS Code 编辑器中调试 TypeScript 文件的步骤：
1. 确保您已经在项目中安装了`ts-node`和`source-map-support`。
2. 在 VS Code 中打开 TypeScript 文件，并设置断点。
3. 按`F5`或点击`Debug`工具栏中的“启动调试”按钮，选择`Node.js`环境。
4. 在弹出的`launch.json`配置文件中添加以下配置：
  ```json
  {
    "type": "node",
    "request": "launch",
    "name": "Debug TypeScript",
    "program": "${workspaceFolder}/path/to/your/typescript/file.ts",
    "runtimeArgs": ["-r", "ts-node/register", "-r", "source-map-support/register"],
    "sourceMaps": true,
    "cwd": "${workspaceFolder}"
  }
  ```
5. 保存`launch.json`配置文件并重新启动调试会话。
6. 当应用程序停止在设置的断点时，即可开始调试 TypeScript 文件。

注意: 以上步骤仅适用于使用 Node.js 运行时的情况。如果您使用其他运行时，请相应地修改`runtimeArgs`和`program`属性。


## 56、TypeScript管理器是什么？为什么需要它？
TypeScript管理器是指用于管理TypeScript依赖项的工具，最常见的例子是npm。它们让开发人员可以轻松地安装、升级和删除TypeScript库及其依赖项。

TypeScript的一些简单步骤：
1. 确保已安装`Node.js`和`npm`。
2. 打开命令行界面并输入以下命令：`npm install -g typescript`
3. 等待安装完成，可以通过输入以下命令检查TypeScript是否正确安装：`tsc -v`
4. 在项目中使用TypeScript时，需要在项目根目录下创建一个名为`package.json`的文件，并在其中添加依赖项：`"dependencies": { "typescript": "^4.4.4" }`
5. 在命令行界面中切换到项目目录，并输入以下命令安装依赖项：`npm install`
6. 现在就可以开始编写TypeScript代码并在命令行中使用`tsc`命令将其编译成JavaScript了。

需要TypeScript管理器的原因有以下几点：
1. TypeScript应用程序通常会使用第三方库，而这些库又可能依赖于其他库。使用TypeScript管理器可以方便地管理这些复杂的依赖关系。
2. TypeScript管理器可以自动下载和安装库及其依赖项，使得应用程序的安装和更新变得简单快捷。
3. TypeScript管理器提供了一个中央仓库，使得开发者可以更容易地发现、共享和重用其他人编写的代码。



## 57、TypeScript声明(declare)关键字是什么？
TypeScript中的`declare`关键字用于定义类型或绑定到外部代码的类型声明。
- 例如，以下示例展示如何使用`declare`关键字声明全局变量：
  ```ts
  declare const myGlobal: string;
  ```
- 还可以使用`declare`来描述外部模块或命名空间，以便TypeScript在编译时能够正确地处理它们。例如：
  ```ts
  declare module "myModule" {
    export function myFunction(): void;
  }
  ```
  这将告诉TypeScript存在一个名为`"myModule"`的模块，其中包含一个名为`"myFunction"`的导出函数。



## 58、如何从任何 .ts 文件生成 TypeScript 定义文件？
要从TypeScript文件生成定义文件，可以使用TypeScript编译器(`tsc`)的`--declaration(或-d)`选项。该选项会告诉编译器在编译过程中生成相应的`.d.ts`文件。
```shell
tsc --declaration file1.ts
```
以下是一些简单的步骤：
1. 确保已安装TypeScript。如果未安装，请使用以下命令全局安装：`npm install -g typescript`
2. 创建一个包含TypeScript源代码的目录，并创建一个名为`tsconfig.json`的文件来配置编译器选项。
3. 在`tsconfig.json`文件中添加`"declaration": true`配置选项，以启用生成定义文件功能。
4. 执行`tsc`命令，编译器将会生成`.js`和`.d.ts`两个文件，其中`.d.ts`文件就是定义文件。
```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "declaration": true
  },
  "include": [
    "./src/**/*"
  ]
}
```
运行`tsc`命令：
```shell
tsc -p tsconfig.json
```
这将会在`./dist`目录下生成编译后的`.js`和`.d.ts`文件。


## 59、tsconfig.json文件是什么？
`tsconfig.json` 文件是 JSON 格式的文件。在 `tsconfig.json` 文件中，可以指定各种选项来告诉编译器如何编译当前项目。目录中存在 `tsconfig.json` 文件表明该目录是 TypeScript 项目的根目录。下面是一个示例 `tsconfig.json` 文件的内容：
```json
{  
  "compilerOptions": {  
    "declaration": true,      
    "emitDecoratorMetadata": false,      
    "experimentalDecorators": false,      
    "module": "none",      
    "moduleResolution": "node"  
    "removeComments": true,  
    "sourceMap": true  
  },  
  "files": [  
    "main.ts",  
    "othermodule.ts"  
  ]  
}
```


## 60、TypeScript 中的环境是什么？何时使用它们？
在TypeScript中，环境（Environment）是指一组类型定义或库定义的集合，用于描述特定的运行环境或目标平台。这些环境可以包括常见的JavaScript运行时，例如浏览器、Node.js和Web Workers，也可以是其他第三方库或框架。

TypeScript中预定义了许多环境，如`dom、es5、es6、node`等，它们都是通过在类型定义文件中声明类型来实现的。例如，当使用`dom`环境时，编译器会自动加载一个名为`lib.dom.d.ts`的类型定义文件，其中包含了与DOM元素相关的所有类型信息。

可以通过在`tsconfig.json`文件中的`"compilerOptions"`选项中的`"lib"`属性中设置所需的环境来选择要使用的环境。例如：
```json
{
  "compilerOptions": {
    "lib": ["es6", "dom"]
  }
}
```
使用环境可以使代码更加可靠和健壮，并且能够减少类型错误和运行时错误。可以根据项目需要选择所需的环境，例如浏览器应用程序可能需要`dom`环境，而服务器应用程序可能需要`node`环境。


## 61、相对与非相对模块导入有什么区别？
非相对模块导入：可以相对于 baseUrl 或通过路径映射来解析非相对导入。换句话说，在导入任何外部依赖项时使用非相对路径。
```ts
import * as $ from "jquery";
import { Component } from "@angular/core";
```
相对模块导入：相对导入可以用于我们自己的模块，这些模块保证在运行时保持它们的相对位置。相对导入以 `/`、`./` 或 `../` 开头。
```ts
import Entry from "./components/Entry";
import {DefaultHeaders} from "../constants/http";
```


## 62、匿名函数是什么？
匿名函数是在没有任何命名标识符的情况下声明的函数。这些函数在运行时动态声明。就像标准函数一样，匿名函数可以接受输入并返回输出。匿名函数在初始创建后通常无法访问。
```ts
let myAdd = function(x: number, y: number): number {   
  return x + y;   
};  
console.log(myAdd())
```


## 63、TypeScript中的方法覆盖是什么？
如果子类(子类)与父类中声明的方法相同，则称为方法覆盖。也就是说，在派生类或子类中重新定义了基类方法。

方法覆盖规则：
- 方法必须与父类中的方法同名
- 方法必须具有与父类中相同的参数。
- 必须存在 IS-A 关系(继承)。
```ts
class NewPrinter extends Printer {  
  doPrint(): any {  
    super.doPrint();  
    console.log("Called Child class.");  
  }  
  doInkJetPrint(): any {  
    console.log("Called doInkJetPrint().");  
  }  
}  
let printer: new () => NewPrinter;  
printer.doPrint();  
printer.doInkJetPrint();
```


## 64、TypeScript 类中属性/方法的默认可见性是什么？
`public` 是 TypeScript 类中属性/方法的默认可见性。


## 65、什么是 .map 文件，为什么/如何使用它？
TypeScript Map 文件是一个源映射文件，其中包含有关原始文件的信息。`.map`文件是源映射文件，它允许工具在发出的 JavaScript 代码和创建它的 TypeScript 源文件之间进行映射。许多调试器可以使用这些文件，因此可以调试 TypeScript 文件而不是 JavaScript 文件。


## 66、原生 Javascript 是否支持模块？
不支持。目前，原生 JavaScript 不支持模块。要在 Javascript 中创建和使用模块，需要像 CommonJS 这样的外部模块。


## 67、TypeScript有哪些组件？
TypeScript主要包含三个组件。这些组件有：
- 语言：该语言包含新语法、关键字、类型注释等元素，并允许我们编写 TypeScript。
- 编译器：TypeScript 编译器是开源的、跨平台的，并且是用 TypeScript 编写的。它将用 TypeScript 编写的代码转换为与其 JavaScript 代码等效的代码。它执行我们的 TypeScript 代码到 JavaScript 代码的解析、类型检查。它还可以帮助将不同的文件连接到单个输出文件并生成源映射。
- 语言服务：语言服务提供的信息可帮助编辑器和其他工具提供更好的辅助功能，例如：自动重构和 IntelliSense。


## 68、TypeScript中interface可以给Function/Array/Class做声明吗？
```ts
// 函数类型
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
}


// Array
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];


// Class, constructor存在于类的静态部分，所以不会检查
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date);
}

class Clock implements ClockInterface {
  currentTime: Date;
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) { }
}
```


## 69、TypeScript可以使用String,Number,Boolean,Symbol,Object等类型做声明吗？


## 70、TypeScript中this和JavaScript中的this有什么差异？
参考：https://zhuanlan.zhihu.com/p/104565681


## 71、TypeScript中使用Unions时有哪些注意事项？
https://blog.csdn.net/Her_smile/article/details/111503754


## 72、TypeScript中如何设计Class的声明？
https://www.cnblogs.com/zjh-study/p/10650648.html


## 73、TypeScript中如何联合枚举/联合类型类型Key?
https://www.cnblogs.com/wjaaron/p/11672764.html
```ts
type Name = { name: string }
type Age = { age: number }
type Union = Name | Age

type UnionKey<P> = P extends infer P ? keyof P : never

type T = UnionKey<Union>
```


## 74、TypeScript中预定义的有条件类型有哪些？
https://www.jianshu.com/p/612b9e25e427


## 75、简单介绍TypeScript类型兼容的理解？抗变，双变，协作，和逆变的简单理解？
- Covariant 协变，TS对象兼容性是协变，父类 <= 子类，是可以的。子类 <= 父类，错误。
- Contravariant 逆变，禁用`strictFunctionTypes`编译，函数参数类型是逆变的，父类 <= 子类，是错误。子类 <= 父类，是可以的。
- Bivariant 双向协变，函数参数的类型默认是双向协变的。父类 <= 子类，是可以的。子类 <= 父类，是可以的。


## 76、简单介绍一下TypeScript模块的加载机制？
https://zhuanlan.zhihu.com/p/133344957<br>
http://www.ayqy.net/blog/%E6%A8%A1%E5%9D%97%E8%A7%A3%E6%9E%90%E6%9C%BA%E5%88%B6_typescript%E7%AC%94%E8%AE%B014/<br>
https://www.tslang.cn/docs/handbook/module-resolution.html


## 77、如何使用TypeScript项目引入并编译为JavaScript的npm库包？
https://www.jianshu.com/p/8fa2c50720e4
1. 安装相关类型库包
```ts
npm install @types/xxxx
```
2. 自己添加描述文件
```ts
declare module xxx
```

## 78、ts如何自动生成库包的声明文件？
可以配置`tsconfig.json`文件中的`declaration`和`outDir`
1. `declaration: true`, 将会自动生成声明文件
2. `outDir: ''`, 指定目录


## 79、TypeScript中如何设置模块导入的路径别名？
https://www.javaroad.cn/questions/24922


## 80、const断言
const断言，typescript会为变量添加一个自身的字面量类型
1. 对象字面量的属性，获得readonly的属性，成为只读属性
2. 数组字面量成为readonly tuple只读元组
3. 字面量类型不能被扩展（比如从hello类型到string类型）
```ts
// type '"hello"'
let x = "hello" as const
// type 'readonly [10, 20]'
let y = [10, 20] as const
// type '{ readonly text: "hello" }'
let z = { text: "hello" } as const
```


## 81、implements 与 extends 的区别
- extends：子类会继承父类的所有属性和方法。
- implements：使用implements关键字的类将需要实现需要实现的类的所有属性和方法。


## 82、枚举和 object 的区别
1. 枚举可以通过枚举的名称，获取枚举的值。也可以通过枚举的值获取枚举的名称。
2. object只能通过key获取value
3. 数字枚举在不指定初始值的情况下，枚举值会从0开始递增。
4. 虽然在运行时，枚举是一个真实存在的对象。但是使用keyof时的行为却和普通对象不一致。必须使用keyof typeof才可以获取枚举所有属性名。


## 83、如何在 window 扩展类型
```ts
declare global {
  interface Window {
    myCustomFn: () => void;
  }
}
```


## 84、复杂的类型推导题目
参考：https://segmentfault.com/a/1190000040403067?sort=votes


## 85、.d.ts和.ts文件的区别
`TypeScript`是`JavaScript`类型的超集，它的扩展名是`.ts`，`TypeScript`可以将大量变量的类型声明统一提取到单独的文件，此类文件被称为**类型定义文件/描述文件**，它的文件扩展名是`.d.ts`，它可以被`TypeScript`解释器读取，并且能直观地表示出各种变量的使用方式。
`npm`仓库里有一个`@types`组织，专门用来存放库的声明文件，引用时只需要安装`npm install --save-dev @types/库名`即可，比如在使用`jquery`的时候，最好同时安装`npm install @types/jquery`来实现代码的智能提示。

### 用法
注意这种方式是在`es6` + `ts`下使用
```ts
// types.d.ts
export type TitleInfo = {
  value: string
  color: string
}
export type ContentInfo = {
  value: string
  color: string
}
export type Todo = {
  id: number
  name: string
  completed: boolean
}
```
```ts
// index.ts
import type { Todo } from './types'
const todo: Todo = {
  id: 1,
  name: 'vue3学习',
  completed: false
}
```
效果如下：
![](https://gitee.com/itchenliang/img/raw/master/img/20210902160122.png)

### 如何定义自己的类型定义文件
#### 全局类型
**变量**
```js
declare var aaa: number
declare const max:200
declare var aaa: number|string //注意这里用的是一个竖线表示"或"的意思
```
其中关键字`declare`表示声明的意思。全局变量是aaa,类型是数字类型（number）

**函数**
由上面的全局变量的写法我们很自然的推断出一个全局函数的写法如下：
```js
/** id是用户的id，可以是number或者string */
decalre function getName(id:number|string):string
```
最后的那个`string`表示的是函数的返回值的类型。如果函数没有返回值可以用`void`表示。
在js中调用就会有如下的提示（上面写的注释，写js的时候还可以提示）：
![](https://gitee.com/itchenliang/img/raw/master/img/20210902153750.png)

有时候同一个函数有若干种写法：
```js
get(1234)
get("zhangsan",18)
```
对应的`d.ts`文件的写法：
```js
declare function get(id: string | number): string
declare function get(name:string,age:number): string
```
如果有些参数可有可无，可以加个`?`表示非必须。
```js
declare function render(callback?:() => void): string
```
在调用时不传都可以：
```js
render()
render(function () {
 alert('finish.')
})
```

**class**
除了变量和函数外，我们还有类（class）
```js
declare class Person {
 static maxAge: number //静态变量
 static getMaxAge(): number //静态方法
 constructor(name: string, age: number) //构造函数
 getName(id: number): string 
}
```

**对象**
```js
declare namespace OOO{
 var aaa: number | string
 function getName(id: number | string): string
 class Person {
   static maxAge: number //静态变量
   static getMaxAge(): number //静态方法
   constructor(name: string, age: number) //构造函数
   getName(id: number): string //实例方法
 }
}
```
其实就是把上面的那些写法放到这个`namespace`包起来的大括号里面，注意括号里面就不需要`declare`关键字了。
对象里面套对象也是可以的：
```js
declare namespace OOO{
 var aaa: number | string
 // ...
 namespace O2{
 let b:number
 }
}
```

**混合类型**
有时候有些值既是`函数`又是`class`又是`对象`的复杂对象。比如我们常用的jquery有各种用法：
```js
new $()
$.ajax()
$()
```
既是函数又是对象
```js
declare function $2(s:string): void
declare namespace $2{
 let aaa:number
}
```
既是函数，又是类（可以new出来）
```js
// 实例方法 
interface People{
 name: string
 age: number
 getName(): string
 getAge():number
}
interface People_Static{
 new (name: string, age: number): People
 /** 静态方法 */
 staticA():number
 
 (w:number):number
}
declare var People:People_Static
```

#### 模块化
除了上面的全局的方式，我们有时候还是通过`require`的方式引入模块化的代码。
![](https://gitee.com/itchenliang/img/raw/master/img/20210902154838.png)
对应的`d.ts`写法是这样的：
```js
declare module 'jquery' {
  export let a: number
  export function b(): number
  export namespace c{
    let cd: string
  }
}
```

有时候我们导出去的是一个函数本身，比如这样的：
![](https://gitee.com/itchenliang/img/raw/master/img/20210902155047.png)
对应的`d.ts`写法是这样的：
```js
declare module 'jquery' {
  function aaa(some:number):number
  export = aaa
}
```
导出一个变量或常量的话这么写：
```js
declare module "ccc" {
 const c:400
 export=c
}
```

#### UMD
有一种代码，既可以通过全局变量访问到，也可以通过`require`的方式访问到。比如我们最常见的`jquery`：
![](https://gitee.com/itchenliang/img/raw/master/img/20210902155219.png)
![](https://gitee.com/itchenliang/img/raw/master/img/20210902155220.png)
其实就是按照全局的方式写`d.ts`，写完后在最后加上declare namespace "xxx"的描述：
```js
declare namespace UUU{
 let a:number
}
 
declare module "UUU" {
 export = UUU
}
```
效果这样：
![](https://gitee.com/itchenliang/img/raw/master/img/20210902155400.png)
![](https://gitee.com/itchenliang/img/raw/master/img/20210902155401.png)

#### 其他
有时候我们扩展了一些内置对象。比如我们给`Date`增加了一个`format`的实例方法：
![](https://gitee.com/itchenliang/img/raw/master/img/20210902155501.png)
对应的`d.ts`写法是这样的：
```js
interface Date {
  format(f: string): string
}
```


## 86、typescript 遇到过什么坑
main.ts 报错（ Cannot find module './App.vue'.）<br>
原因： typescript 不能识别.vue 文件<br>
解决办法： 引入 vue 的 typescript declare 库


