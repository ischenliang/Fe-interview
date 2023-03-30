# typescript面试题汇总
TypeScript 是 Microsoft 开发的JavaScript 的开源超集，用于在不破坏现有程序的情况下添加附加功能。

## 1、👍Typescript是什么？为什么需要 TypeScript？TypeScript有哪些特性？
TypeScript 是由 Microsoft 开发和维护的免费开源编程语言。**它是 JavaScript 的一个超集，意味着它包含了 JavaScript 的所有功能，并添加了额外的静态类型检查和面向对象编程的特性。**

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
1. 更好的类型检查：TypeScript 提供了静态类型检查功能，可以在编译时检测类型错误，减少运行时错误。
2. 更好的代码提示和自动补全：由于 TypeScript 包含了类型信息，编码过程中可以获得更准确的代码提示和自动补全。
3. 更好的代码维护性：TypeScript 强制进行类型标注，使得代码更易读、易理解，从而增强了代码的可维护性。
4. 更好的协作开发体验：TypeScript 明确了函数和方法的输入和输出类型，因此可以更好地协调团队开发工作。
5. 更高的生产力：使用 TypeScript 可以减少代码中的错误和调试时间，从而提高开发效率。同时，它还提供了一些便利的语言特性，例如接口、枚举等，可以简化开发过程。



## 3、TypeScript 的内置数据类型有哪些？
内置数据类型在 Typescript 中也称为原始数据类型。这些内置类型如下：
- **数字型(number)**：用于表示数字类型值。TypeScript 中的所有数字都存储为浮点值。语法：`let identifier: number = value`;
- **字符串型(string)**：它表示存储为 Unicode UTF-16 代码的字符序列。在脚本中包含字符串文字，方法是用单引号或双引号将它们括起来。语法：`let identifier: string = " "`;
- **布尔型(boolean)**： 用于表示一个逻辑值。当使用布尔类型时，只能得到false或true的输出。布尔值是指定条件是否为true的真值。语法：`let bool = Boolean value`;
- **Null类型**： Null 表示一个值未定义的变量。不能直接引用 null 类型值本身。Null 类型没有用，因为我们只能为它分配一个空值。语法：`let num: number = null`;
- **Undefined类型**：它是未定义文字的类型。Undefined 类型表示所有未初始化的变量。它没有用，因为只能为其分配一个未定义的值。这种内置类型是所有类型的子类型。语法：`let num: number = undefined`;
- **Symbol类型(symbol)**

除此之外，TypeScript 还支持以下复合类型：
- **数组型(array)**：表示一个元素类型为 T 的数组。例如，number[] 表示一个数字数组。
- **元组型(tuple)**：表示已知元素数量和类型的数组。例如，[string, number] 表示一个字符串和数字组成的元组。
- **枚举型(enum)**：表示一个命名的常量枚举。
- **任意类型(any)**：表示任意类型。
- **未知型(unknown)**：与 any 类似，但是在更严格的类型检查下使用。
- **对象型(object)**：表示非原始类型的对象。
- **空类型(void)**：void是不返回任何类型值的函数的返回类型。它用于没有可用数据类型的地方。语法：`let unusable: void = undefined`;

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
在 TypeScript 中，命名空间是一种将代码组织成逻辑模块的方式。可以使用命名空间来避免全局作用域中的名称冲突，并在项目中更好地组织和管理代码。可以使用`namespace`关键字来创建一个命名空间，然后在其中定义变量、函数、类等。命名空间中的成员可以通过导出关键字`export`公开，以便在其他文件或命名空间中使用。命名空间早期也称为内部模块。
> 命名空间的目的就是解决重名问题。
- 1、使用命名空间演示重名问题
    ```ts
    namespace Shapes {
      export interface Shape {
        draw(): void;
      }
      export class Circle implements Shape {
        // ...
      }
      export class Square implements Shape {
        // ...
      }
    }
    let circle = new Shapes.Circle();
    let square = new Shapes.Square();
    ```
    在这个示例中，`Shapes`是一个命名空间，包含了`Shape`接口和`Circle`、`Square`类。通过将这些类型定义在命名空间中，可以避免与全局作用域中的其他命名冲突。同时，可以在外部使用`Shapes.Circle`、`Shapes.Square`等方式访问这些类型。
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
TypeScript 中的类型断言（Type Assertion）是一种告诉编译器某个值的类型的方式。它可以用于在代码中指定一个变量或表达式的类型，从而让 TypeScript 编译器相信该类型是正确的。
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
TypeScript 是 JavaScript 的超集，它在 JavaScript 基础之上扩展了一些新的语言特性和工具，包括静态类型检查、类、接口、枚举等。
> 使得代码更易读、易理解、易维护，同时也提高了开发效率。

以下是 TypeScript 和 JavaScript 之间的主要区别：
1. 类型系统：TypeScript 引入了静态类型系统，可以在编码时检测类型错误，减少运行时错误和调试时间。JavaScript 是一种动态类型语言，它不会在编译时进行类型检查，只有在运行时才会检查类型错误。
2. 类和接口：TypeScript 支持类和接口，这使得代码更易读、易理解，从而增强了代码的可维护性。JavaScript 中没有类和接口的概念，代码通常使用原型继承来实现类似的功
3. 枚举类型：TypeScript 提供了枚举类型，可以为一组数值赋予更加友好的名称，使代码更易读、易理解。JavaScript 没有内置的枚举类型，但可以通过对象或常量来模拟。
4. 工具支持：TypeScript 可以使用常见的代码编辑器和 IDE （如 Visual Studio Code、WebStorm 等）提供更好的开发体验，例如自动补全、重构等。同时，TypeScript 还提供了命令行编译工具和库管理器，方便代码的构建和发布。


## 19、TypeScript 中的 JSX 是什么？可以在 TypeScript 中使用 JSX 吗？
JSX是一种JavaScript的语法扩展，全称`JavaScript XML`，它允许在 JavaScript 和 TypeScript 中编写类 XML 代码。它最初是为 React 库设计的，用于描述 UI 组件的结构和样式。

在typescript中使用JSX，必须做两件事:
- 使用`.tsx`(替代`.ts`)扩展名命名文件
- 启用`jsx`选项: `tsconfig.json`配置文件的`compilerOptions`里设置选项`"jsx": "react"`
```ts
interface Props {
  name: string;
}

function Greeting(props: Props) {
  return <h1>Hello, {props.name}!</h1>;
}
```


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
在 TypeScript 中，有以下几种作用域可用：
1. 块级作用域：在块级作用域中声明的变量只在当前块内部可见，并且不会被外部作用域所覆盖。例如，在`if`、`for`、`while`等语句块中声明的变量就属于块级作用域。
2. 函数作用域：在函数作用域中声明的变量只在当前函数体内部可见，并且不会被外部作用域所覆盖。
3. 模块作用域：模块作用域是指在模块内部定义的变量或函数的作用域范围。在模块内部声明的变量和函数不会污染全局命名空间，并且可以通过 export 关键字将其暴露给其他模块使用。

与 JavaScript 相比，TypeScript 支持更加严格的作用域规则。具体来说，TypeScript 引入了块级作用域和模块作用域这两种概念，从而避免了一些常见的 JavaScript 作用域问题，如变量提升、命名冲突等。


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
三斜线指令是一种特殊的注释语法，可以在 TypeScript 文件中向编译器提供一些额外的指令和信息。它们以三个斜杠`///`开头，并且只能出现在文件的顶部或在其它注释之前。
- 1、**引入模块**
  ```ts
  /// <reference path="path/to/other/file.ts" />
  ```
  引入模块指令可以用于声明当前文件依赖于另一个 TypeScript 文件。在编译时，TypeScript 会按照引入模块的顺序对文件进行排序，并将它们合并成一个单独的输出文件。
  ```ts
  // fileA.ts
  /// <reference path="./fileB.ts" />
  function greet(name: string) {
    log(`Hello, ${name}!`);
  }
  greet("TypeScript");

  // fileB.ts
  function log(message: string) {
    console.log(message);
  }
  ```
  在上述示例中，`fileA.ts`文件引入了`fileB.ts`文件，并调用了其内部定义的函数`log()`。在编译时，TypeScript 会按照引入模块的顺序对文件进行排序，并将它们合并成一个单独的输出文件。
- 2、**设置模块选项**
  ```ts
  /// <amd-module name="someModule" />
  ```
  设置模块选项指令可以用于配置 AMD 模块的名称和依赖项。如果在 TypeScript 中使用了 AMD 模块系统，则需要设置该选项以正确地生成代码。
  ```ts
  // app.ts
  /// <amd-module name="myApp" />
  import * as $ from "jquery";
  $("h1").text("Hello, TypeScript!");
  ```
  在上述示例中，`app.ts`文件设置了`AMD`模块的名称为`myApp`，并导入了`jQuery`库。如果不设置该选项，则可能会导致生成的代码出现错误或无法加载模块。
- 3、**预处理文件**
  ```ts
  /// <reference lib="es6" />
  ```
  预处理文件指令可以用于引入 TypeScript 标准库中的某个文件或库。例如，上述示例中的指令会将`es6`库引入到当前文件中，从而使得当前文件可以使用 ES6 中定义的类、接口、变量等功能。
  ```ts
  // app.ts
  /// <reference lib="es6" />
  const greeting: string = "Hello, TypeScript!";
  ```
  在上述示例中，`app.ts`文件预处理了 TypeScript 标准库中的 ES6 文件，从而使得当前文件可以使用 ES6 中定义的类、接口、变量等功能。如果不预处理该文件，则可能会导致某些功能无法使用或出现错误。

注意: 三斜线指令应该尽可能避免使用，并且只在必要时才使用。如果可能的话，应该采用更好的模块化方案，以提高代码的可移植性和测试性。


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
要在 TypeScript 中重载函数，只需创建两个函数名称相同、参数数量相同但类型不同、返回值类型不同的函数。
> TypeScript 编译器会根据传递的参数类型和数量确定要调用哪个函数。
```ts
function add(a:string, b:string): string;
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
`unknown`是 TypeScript 中的一种类型，表示某个值可能具有任意类型。与`any`类型不同的是，`unknown`类型会强制进行类型检查，而不能随意访问或调用其属性或方法。

使用`unknown`类型的主要场景包括：
1. 在编写通用函数或库时，当无法确定函数的输入参数类型时，可以使用`unknown`来保证类型安全。例如：
  ```ts
  function parseData(data: unknown): MyData[] {
    // ...
  }
  ```
2. 当处理来自外部或未知来源的数据时，可以使用`unknown`来避免类型错误。例如：
  ```ts
  const input: unknown = getUserInput();
  if (typeof input === "string") {
    // ...
  } else {
    // ...
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
# 正规命令写法
tsc file1.ts file2.ts --outFile merge.js
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
- 多态
  > 指不同类型的对象可以以相同的方式进行访问和操作，即具有相同的接口或行为。它可以通过两种方式实现：
  - 子类重写父类方法
    ```ts
    class Car {
      drive() {
        console.log('Driving a car...');
      }
    }
    class Sedan extends Car {
      override drive() {
        console.log('Driving a sedan...');
      }
    }
    let car: Car = new Sedan();
    car.drive(); // 输出 "Driving a sedan..."
    ```
  - 接口实现多态
    > 通过实现接口，不同类型的对象可以具有相同的行为，并以相同的方式进行访问和操作。
    ```ts
    interface Vehicle {
      drive(): void;
    }
    class Car implements Vehicle {
      drive() {
        console.log('Driving a car...');
      }
    }
    class Sedan implements Vehicle {
      drive() {
        console.log('Driving a sedan...');
      }
    }

    let vehicle1: Vehicle = new Car();
    let vehicle2: Vehicle = new Sedan();
    vehicle1.drive(); // 输出 "Driving a car..."
    vehicle2.drive(); // 输出 "Driving a sedan...
    ```


## 34、TypeScript中的泛型
在TypeScript中，泛型是指一种将类型参数化的机制，可以在函数、类、接口等地方使用。
> 通过使用泛型，可以让代码更加灵活和通用，减少重复代码的编写。
```ts
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("hello");  // 类型推断为 string
let output2 = identity<number>(42);       // 类型推断为 number
```
在上面的示例中，`identity`函数接受一个类型参数`T`并返回该类型的值。通过使用`<T>`语法来指定泛型类型，我们可以在不同的调用中传递不同的类型，并让TypeScript进行类型推断。

**注意**: 除了函数之外，还可以使用泛型类和泛型接口，它们具有与泛型函数相似的语法和目的，使您可以编写通用的代码，同时保持类型安全和灵活性。
```ts
interface Pair<T, U> {
  first: T;
  second: U;
}

class Point implements Pair<number, number> {
  constructor(public first: number, public second: number) {}
}

let point = new Point(10, 20);
console.log(point.first); // 输出 10
console.log(point.second); // 输出 20
```


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

// 字符串枚举
enum Direction {
  Up = "UP",
  Down = "DOWN",
  Left = "LEFT",
  Right = "RIGHT"
}
let upDirection = Direction.Up;
console.log(upDirection); // 输出 "UP"
// 反向映射允许根据枚举成员名获取其对应的枚举值
let directionName = Direction[upDirection];
console.log(directionName); // 输出 "Up"
```


## 37、TS中的接口interface 和 type 语句有什么区别
1. **语法差异**
  ```ts
  // 接口语法形式
  interface InterfaceName {
    // ...
  }
  // 类型别名语法形式
  type TypeName = TypeExpression;
  // TypeExpression 可以是任何有效的类型表达式，包括原始类型、联合类型、交叉类型、函数类型等。
  ```
2. **功能差异**
  - 接口的主要功能是用于描述对象的形状，即定义对象应该具有的属性和方法，并可以通过`implements`关键字进行实现。
    ```ts
    interface Person {
      name: string;
      age: number;
      sayHello(): void;
    }
    class Student implements Person {
      constructor(public name: string, public age: number) {}
      sayHello() {
        console.log(`Hello, my name is ${this.name}, I am ${this.age} years old.`);
      }
    }
    let student = new Student("Tom", 18);
    student.sayHello(); // 输出 "Hello, my name is Tom, I am 18 years old."
    ```
  - 类型别名的主要功能是用于定义复杂或重复类型，以提高代码的可读性和可维护性。类型别名在某些情况下比接口更加灵活和简洁，可以使用泛型、联合类型、交叉类型等特性，支持更多的类型转换和操作。
    ```ts
    type Person = {
      name: string;
      age: number;
      sayHello(): void;
    };
    type Student = Person & {
      grade: number;
    };
    function printName(person: Person) {
      console.log(`My name is ${person.name}.`);
    }
    let student: Student = {
      name: "Tom",
      age: 18,
      grade: 90,
      sayHello() {
        console.log(`Hello, my name is ${this.name}, I am ${this.age} years old.`);
      }
    };
    printName(student); // 输出 "My name is Tom."
    student.sayHello(); // 输出 "Hello, my name is Tom, I am 18 years old."
    ```


## 39、TypeScript的as语法是什么？
`as` 是 TypeScript 中类型断言的附加语法。引入 `as-syntax` 的原因是原始语法 (`<type>`) 与 JSX 冲突。
```ts
let empCode: any = 111;     
let employeeCode = code as number;
```
将 TypeScript 与 JSX 一起使用时，只允许使用 as 样式的断言。


## 40、TypeScript的Enum枚举类型？
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
  > TypeScript中的函数声明合并允许我们为同名的函数提供多个函数类型定义，从而实现函数重载。
  ```ts
  function add(x: number, y: number): number;
  function add(x: string, y: string): string;
  function add(x: number | string, y: number | string): number | string {
    if (typeof x === "number" && typeof y === "number") {
      return x + y;
    }
    if (typeof x === "string" && typeof y === "string") {
      return x.concat(y);
    }
    throw new Error("Parameters must be of the same type.");
  }

  const result1 = add(3, 4); // 返回数字 7
  const result2 = add("hello", "world"); // 返回字符串 "helloworld"
  const result3 = add("hello", 4); // 抛出异常 "Parameters must be of the same type."
  ```
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


## 42、TypeScript中?. , ?? , !: , _ , ** 等符号的含义？
- `?.`: 可选链操作符
  > 可选链操作符是一种用于简化访问深层嵌套对象或数组的语法。它使用`?.`符号表示，在访问对象属性或方法时可以避免因为空值或未定义而导致的错误。
  ```ts
  let user = {
    name: "Tom",
    address: {
      city: "Beijing"
    }
  };
  let cityName = user.address?.city;
  console.log(cityName); // 输出 "Beijing"
  let notExist = user.address?.notExist;
  console.log(notExist); // 输出 undefined
  ```
- `??`: 空值合并操作符
  > 空值合并操作符是一种用于简化变量为空值或未定义时的默认值赋值操作的语法。它使用`??`符号表示，当左侧表达式的值为`null`或`undefined`时，会返回右侧的默认值。
  ```ts
  let username = '';
  let result = username ?? 'Unknown';
  console.log(result); // 输出 ''
  ```
- `!.`: 非空断言运算符
  > 非空断言运算符是一种用于告诉 TypeScript 编译器某个变量不会为空值或未定义的语法。它使用`!.`符号表示，可以在变量名称后面加上一个感叹号来标记。
  ```ts
  let name: string | undefined;
  let message = `Hello, ${name!.toUpperCase()}`;
  console.log(message); // 抛出异常：Cannot read property 'toUpperCase' of undefined
  ```
- `!:` 非空断言操作符
  > 在TypeScript 中，`!:`符号被称为非空断言操作符，它可以用来告诉编译器一个变量一定不为`null`或`undefined`。这个操作符在 TypeScript 2.0 中被引入，它的语法是在变量名后面添加`!:`符号。例如：
  ```ts
  let myString!: string;
  ```
  在这个例子中，我们声明了一个字符串类型的变量`myString`，但是并没有对它进行初始化。如果直接使用`myString`变量，TypeScript编译器会提示错误，因为它并不知道`myString`是否已经被正确地赋值。此时就可以使用`!`符号来告诉编译器，我保证这个变量不为`null`或`undefined`，可以安全地使用它。例如：
  ```ts
  console.log(myString.toUpperCase()); // 不会报错
  ```
- `_`: 占位符
  > 下划线符号`_`可以作为占位符使用，表示暂时不需要使用的变量或参数。
  ```ts
  function sum(a: number, b: number, _c?: number) {
    return a + b;
  }
  let result = sum(1, 2);
  console.log(result); // 输出 3
  ```
- `**`: 指数运算符
  > 指数运算符是一种用于计算指数幂的语法。它使用`**`符号表示，可以替代传统的`Math.pow()`方法。
- `?:`: 指可选参数，可以理解为参数自动加上`undefined`
  ```ts
  function echo(x: number, y?: number) { // 可选参数
    return x + (y || 0);
  }
  ```


## 43、TypeScript中什么是 any 类型，何时使用？
`any`类型表示任意类型。使用`any`类型可以在声明变量或函数参数时不指定其具体类型，从而让它们可以接受任何类型的值。
```ts
let value: any = 123;
value = 'Hello';
value = { name: 'Tom' };
```


## 44、什么是void，什么时候使用void类型？
`void`类型表示没有返回值的函数。通常用于声明函数时，指定函数不会返回任何值。
```ts
function hello(): void {
  console.log('Hello, world!');
}
```
- 如果在函数中使用`return`关键字，则必须返回`undefined`或没有返回值，否则会编译错误。
  ```ts
  function getAge (age: number): void {
    if (age > 10 && age < 12) {
      return null
    }
    if (age > 12) {
      return undefined
    }
    if (age <= 10 && age > 0) {
      return
    }
    if (age === 0) {
      return
    }
    return 12 // 不能将类型“number”分配给类型“void”
  }
  ```
- 如果变量是 `void` 类型，则只能将`null`或`undefined`值分配给该变量。
  ```ts
  let age: void
  age = null
  age = undefined
  age = 'aaa' // 不能将类型“string”分配给类型“void”
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
在 TypeScript 中，不支持静态类的概念。因为类本身就是一种静态结构，它的定义和类型在编译时就已经确定了，无法在运行时动态添加或修改。

相比之下，静态成员是指属于类而非实例的成员，可以在类中声明并通过类名直接访问。例如：
```ts
class Person {
  static species = 'Homo sapiens';
  constructor(public name: string) {}
  static getSpecies() {
    return this.species;
  }
}
console.log(Person.species); // 输出 "Homo sapiens"
console.log(Person.getSpecies()); // 输出 "Homo sapiens"
```


## 48、Typescript 的缺点是什么？
TypeScript 有以下缺点：
1. 学习成本高：如果您没有接触过 JavaScript 或面向对象编程，那么学习 TypeScript 可能会耗费大量时间和精力。此外，TypeScript 还在不断更新和发展，需要及时了解新特性和语法。
2. 开发环境配置麻烦：要使用 TypeScript，开发环境需要进行相应的配置，比如安装 TypeScript 编译器、设置项目配置文件等等。这可能对一些初学者来说有一定的难度。
3. 工具支持不够完善：虽然越来越多的编辑器和 IDE 支持 TypeScript，但仍然有一些工具支持不够完善，导致使用起来不太方便。
4. 静态类型限制：TypeScript 的静态类型系统可以帮助减少错误，但有时也可能成为限制。一些动态类型的代码需要进行额外的注释或类型标记，才能在 TypeScript 中正常运行。
5. 项目结构复杂：为了充分利用 TypeScript 的所有功能，需要使用模块化和命名空间等概念，使得项目结构变得更加复杂，需要花费额外的时间和精力进行设计和维护。


## 49、TypeScript中any，never，unknown和viod有什么区别？
1. `any`类型表示任意类型，在声明变量或函数参数时不指定其具体类型，从而让它们可以接受任何类型的值。
  ```ts
  let value: any = 123;
  value = 'Hello';
  value = { name: 'Tom' };
  ```
2. `never`类型表示永远不会发生的类型，通常用于类似抛出异常或进程终止等场景。
  - 一个函数总是抛出错误，而没有返回值
  - 一个函数内部有死循环，永远不会有返回值
  ```ts
  function throwError(message: string): never {
    throw new Error(message);
  }
  throwError('Something went wrong.');
  ```
3. `unknown`类型表示未知类型，用于编译时不确定变量类型的情况。与`any`不同的是，使用`unknown`类型时需要进行类型检测和类型转换才能安全地使用变量。
  ```ts
  function greet(name: unknown): void {
    if (typeof name === 'string') {
      console.log(`Hello, ${name}!`);
    } else {
      console.log("I don't know who you are.");
    }
  }
  greet('Tom'); // 输出 "Hello, Tom!"
  greet(123);   // 输出 "I don't know who you are."
  ```
4. `void`类型表示没有返回值的函数，通常用于声明函数时，指定函数不会返回任何值。
  ```ts
  function hello(): void {
    console.log('Hello, world!');
  }
  hello(); // 输出 "Hello, world!"
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
  > 可以配置`tsconfig.json`文件中的`declaration`和`outDir`
  1. `declaration: true`, 将会自动生成声明文件
  2. `outDir: ''`, 指定目录
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
`public` 是TypeScript类中属性/方法的默认可见性。如果没有显式指定属性或方法的可见性修饰符，那么它们将被视为公共的，可以在类的实例以及子类中访问。


## 65、什么是 .map 文件，为什么/如何使用它？
在TypeScript编译时，会生成一个与每个 TypeScript 文件对应的 JavaScript 文件，同时也会生成一个`.map`文件。该文件包含了源代码和编译后代码之间的映射关系。

`.map`文件是一种调试工具，它可以帮助开发人员在调试 TypeScript 应用时，直接在浏览器中查看 TypeScript 代码而不是编译后的 JavaScript 代码。这样可以方便地进行断点调试、查看变量值等操作。

使用`.map`文件需要将 TypeScript 编译选项中的`sourceMap`设置为`true`，例如：
```bash
tsc --sourceMap app.ts
```
或者在`tsconfig.json`中设置：
```json
{
  "compilerOptions": {
    "sourceMap": true
  }
}
```
如果开启了源映射，当浏览器加载编译后的 JavaScript 代码时，会自动下载和解析相应的`.map`文件，并且在调试器中显示出 TypeScript 代码。

`.map`文件通常包含以下内容：
- `version`字段：表示源映射版本。当前最新的版本是 3。
- `sources`字段：表示源文件路径，通常对应 TypeScript 文件。
- `names`字段：表示编译后代码中使用的变量名等标识符。
- `mappings`字段：表示源代码和编译后代码之间的映射关系。
```json
{
  "version": 3,
  "sources": ["app.ts"],
  "names": ["a", "b", "c"],
  "mappings": "AAAA,EAAE,IAAI,GAAI,MAAM,EAAE,IAAI;AACN,cAGA,CAAC,GAAG,EAAE,CAAC",
}
```


## 66、原生 Javascript 是否支持模块？
在ES6（ECMAScript 2015）中，JavaScript原生支持模块化。它提供了一种标准化的方式来定义和导出模块，使得 JavaScript 开发人员能够更加方便地创建、组织和重用代码。

在ES6模块系统中，每个模块都是一个独立的文件，可以通过`export`关键字将函数、类、变量等声明导出，使其可以被其他模块使用。同时，模块也可以通过`import`关键字引入其他模块导出的功能。
```js
// data.js
export default {
  name: 'oss plugin',
  version: '1.0.0'
}
```
```html
<script type="module">
  import plugin from './data.js'
  console.log(plugin)
</script>
```

然而，在ES6之前的JavaScript版本中，并没有原生支持模块化，开发人员通常使用命名空间和立即执行函数等技术来实现模块化。这些方法虽然可以达到一定的模块化效果，但仍然存在各种问题，如全局命名冲突、依赖管理等。


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
在 TypeScript 中，可以使用`String、Number、Boolean、Symbol 和 Object`等类型来进行声明，这些类型是 TypeScript 的预定义类型。例如，下面的代码展示了如何使用这些类型来声明变量和函数参数：
> 在实践中，通常更推荐使用 JavaScript 的原始类型（如`string、number、boolean`）而不是对应的包装类型（如`String、Number、Boolean`）。因为原始类型更符合 JavaScript 的语法和习惯用法，并且性能更好。
```ts
const str: String = "hello"; // 声明一个字符串类型的变量
const num: Number = 42; // 声明一个数字类型的变量
const bool: Boolean = true; // 声明一个布尔类型的变量
const sym: Symbol = Symbol("key"); // 声明一个符号类型的变量
const obj: Object = { prop: "value" }; // 声明一个对象类型的变量

function concatStrings(str1: String, str2: String): String { // 函数参数和返回值都是字符串类型
  return str1 + str2;
}
```


## 71、TypeScript什么是Unions Types？
TypeScript中的`Unions Types`，即联合类型可以用`|`符号将多个类型合并成一个联合类型。以下是一些 TypeScript 联合类型的示例：
1. 数字或字符串类型的联合类型：
  ```ts
  let id: number | string;
  id = 123; // 合法
  id = "abc"; // 合法
  id = true; // 不合法，因为布尔类型不在联合类型内
  ```
2. 具有不同字段的对象类型的联合类型:
  ```ts
  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Square {
    kind: "square";
    size: number;
  }
  type Shape = Circle | Square;

  function getArea(shape: Shape): number {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.size ** 2;
    }
  }

  const circle: Circle = { kind: "circle", radius: 3 };
  const square: Square = { kind: "square", size: 4 };
  console.log(getArea(circle)); // 输出 28.274333882308138
  console.log(getArea(square)); // 输出 16
  ```
3. 函数类型的联合类型：
  ```ts
  type Func = () => string | (() => number);

  const func1: Func = () => "hello";
  const func2: Func = () => 42;

  console.log(func1()); // 输出 "hello"
  console.log(func2()); // 输出 42
  ```


## 73、TypeScript中如何联合枚举/联合类型类型Key?
可以使用联合类型操作符`"|"`来组合多个枚举/类型的 Key，创建一个新的联合类型。
```ts
enum Fruit {
  APPLE = "apple",
  ORANGE = "orange"
}

enum Color {
  RED = "red",
  GREEN = "green"
}

type FruitOrColor = Fruit | Color;

function getColorOrFruit(key: FruitOrColor): string {
  return key === Fruit.APPLE || key === Fruit.ORANGE ? "fruit" : "color";
}
```

**keyof**关键字
> `keyof`是 TypeScript 中的一个关键字，用于获取一个类型的所有属性名作为联合类型。
```ts
type Keys = keyof T;
```
使用`keyof`可以方便地进行类型检查和类型推导。例如，可以使用`keyof`来编写类型安全的函数操作对象的属性：
```ts
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person = { name: "Alice", age: 30 };
getProperty(person, "name"); // 返回 "Alice"
getProperty(person, "age"); // 返回 30
getProperty(person, "gender"); // 编译时会产生一个错误：Argument of type '"gender"' is not assignable to parameter of type 'keyof typeof person'.
```
除此之外，还可以使用`keyof`来实现一些高级的类型操作，例如从一个对象类型中排除某些属性：
```ts
type ExcludeKeys<T, U> = Exclude<keyof T, keyof U>;
```


## 74、TypeScript中预定义的有条件类型有哪些？
1. `Exclude<T, U>`：从类型T中排除可以赋值给类型U的部分。
2. `Extract<T, U>`：从类型T中提取可以赋值给类型U的部分。
  ```ts
  type MyType = string | number | boolean;
  type MyStringType = Exclude<MyType, number | boolean>; // MyStringType 的值为 string。
  type MyNumberType = Extract<MyType, number | Object>; // MyNumberType 的值为 number。
  ```
3. `NonNullable<T>`：从类型T中排除null和undefined类型。
  ```ts
  type MyNullableType = string | null | undefined;
  type MyNonNullType = NonNullable<MyNullableType>; // MyNonNullType 的值为 string。
  ```
4. `ReturnType<T>`：获取函数类型T的返回类型。
  ```ts
  function myFunction(arg: string): number {
    return arg.length;
  }
  type MyReturnType = ReturnType<typeof myFunction>; // MyReturnType 的值为 number。
  ```
5. `InstanceType<T>`：获取构造函数类型T的实例类型。
  ```ts
  class MyClass {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
  type MyInstanceType = InstanceType<typeof MyClass>; // MyInstanceType 的值为 MyClass 类型本身。
  const myInstance: MyInstanceType = new MyClass("foo"); // 此时 myInstance 是一个 MyClass 的实例。
  ```
6. `Parameters<T>`：获取函数类型T的参数类型的元组。
  ```ts
  function myFunction(arg1: string, arg2: number) {
    // ...
  }
  type MyParameters = Parameters<typeof myFunction>; // MyParameters 的值为元组 [string, number]。
  ```
7. `Required<T>`：将类型T中所有属性设为必需属性，即去除所有可选修饰符(?)。
8. `Partial<T>`：将类型T中所有属性设为可选属性，即加上所有可选修饰符(?)。
9. `Readonly<T>`：将类型T中所有属性设为只读属性，即加上所有只读修饰符(readonly)。
  ```ts
  interface MyObject {
    name?: string;
    age?: number;
  }

  type MyRequiredObject = Required<MyObject>; // 所有属性都变成必选属性，即 { name: string; age: number; }。
  type MyPartialObject = Partial<MyObject>; // 所有属性都变成可选属性，即 { name?: string; age?: number; }。
  type MyReadonlyObject = Readonly<MyObject>; // 所有属性都变成只读属性，即 { readonly name?: string; readonly age?: number; }。
  ```
10. `Record<K, T>`：生成一个键为K类型，值为T类型的对象类型。
  ```ts
  type MyRecordType = Record<string, number>; // 表示键为字符串类型，值为数字类型的对象。
  const myRecord: MyRecordType = {
    foo: 123,
    bar: 456,
  };
  ```
11. `Pick<T, K>`：从类型T中挑选出属性K的类型。
12. `Omit<T, K>`：从类型T中删除属性K的类型。
  ```ts
  interface MyObject {
    name: string;
    age: number;
    gender: string;
  }
  type MyPickedObject = Pick<MyObject, "name" | "age">; // 只保留 name 和 age 属性，即 { name: string; age: number; }。
  type MyOmittedObject = Omit<MyObject, "gender">; // 删除 gender 属性，即 { name: string; age: number; }。
  ```


## 75、简单介绍TypeScript类型兼容的理解？抗变，双变，协作，和逆变的简单理解？
- Covariant 协变，TS对象兼容性是协变，父类 <= 子类，是可以的。子类 <= 父类，错误。
- Contravariant 逆变，禁用`strictFunctionTypes`编译，函数参数类型是逆变的，父类 <= 子类，是错误。子类 <= 父类，是可以的。
- Bivariant 双向协变，函数参数的类型默认是双向协变的。父类 <= 子类，是可以的。子类 <= 父类，是可以的。


## 76、简单介绍一下TypeScript模块的加载机制？
TypeScript模块的加载机制是指如何在TypeScript代码中引入和使用其他模块。
1. 模块定义：模块可以被定义为一个或多个文件，其中每个文件都包含一个`export`声明。这些文件可以按照需要组合成一个模块。
2. 导出声明：在模块内部，可以使用关键字`export`标记任何声明（函数、类、接口、变量等），使其能够从模块外访问。
3. 导入声明：在模块外部，可以使用关键字`import`来导入另一个模块里导出的声明。导入的声明可以是命名导入、默认导入，也可以是混合导入。
4. 解析策略：当编译器解析模块导入时，将根据以下几种模块解析策略来确定模块的位置： 
  - 相对导入：相对导入是相对于导入文件所在的目录来解析的。
  - 非相对导入：非相对导入是根据`“baseUrl”、“paths”`等配置来解析的。
  - Node.js 模块导入：这是一种特殊的导入方式，用于加载 Node.js 模块。
5. 发布模块：如果要发布 TypeScript 模块，应该在`package.json`文件中设置`"module"`属性为`"esnext"`或`"commonjs"`（取决于你的目标平台），并使用 npm 发布你的模块。


## 77、如何使用TypeScript项目引入并编译为JavaScript的npm库包？
1. 安装相关类型库包
```ts
npm install @types/xxxx
```
2. 自己添加描述文件
```ts
declare module xxx
```


## 79、TypeScript中如何设置模块导入的路径别名？
在 TypeScript 中，可以通过设置路径别名来简化模块导入的路径。路径别名是一种映射关系，它将某个较长的路径映射为一个短的别名。
1. 在`tsconfig.json`文件中配置`paths`属性，该属性包含一个对象，每个键值对表示一个路径别名的映射关系，例如：
  ```json
  {
    "compilerOptions": {
      // ...
      "baseUrl": "./src",
      "paths": {
        "@utils/*": ["utils/*"]
      }
    }
  }
  ```
  上述配置指定了`@utils/*`别名表示`utils/*`相对于项目根目录下的`./src`目录。
2. 在代码中使用路径别名导入模块：
  ```ts
  import { myFunction } from '@utils/my-utils';
  ```
  上述代码中，`@utils`是路径别名，`my-utils`是实际的相对路径，TypeScript编译器会自动将`@utils`替换为相应的路径。


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


