# typescript面试题汇总
TypeScript 是 Microsoft 开发的JavaScript 的开源超集，用于在不破坏现有程序的情况下添加附加功能。
参考：https://www.yiibai.com/interview/1900
## 1、TypeScript 的主要特点是什么？
- 跨平台：TypeScript 编译器可以安装在任何操作系统上，包括 Windows、macOS 和 Linux。
- ES6 特性：TypeScript 包含计划中的 ECMAScript 2015 (ES6) 的大部分特性，例如箭头函数。
- 面向对象的语言：TypeScript 提供所有标准的 OOP 功能，如类、接口和模块。
- 静态类型检查：TypeScript 使用静态类型并帮助在编译时进行类型检查。因此，你可以在编写代码时发现编译时错误，而无需运行脚本。
- 可选的静态类型：如果你习惯了 JavaScript 的动态类型，TypeScript 还允许可选的静态类型。
- DOM 操作：您可以使用 TypeScript 来操作 DOM 以添加或删除客户端网页元素。


## 2、使用 TypeScript 有什么好处？
- TypeScript 更具表现力，这意味着它的语法混乱更少。
- 由于高级调试器专注于在编译时之前捕获逻辑错误，因此调试很容易。
- 静态类型使 TypeScript 比 JavaScript 的动态类型更易于阅读和结构化。
- 由于通用的转译，它可以跨平台使用，在客户端和服务器端项目中。


## 3、TypeScript 的内置数据类型有哪些？
参考：https://www.cnblogs.com/houxianzhou/p/15217418.html
- 数字类型：表示数字，包括整数和浮点数。
  ```ts
  let identifier: number = value;
  ```
- 字符串类型：表示字符串。可以使用单引号或双引号来表示字符串。
  ```ts
  let identifier: string = " ";
  ```
- 布尔类型：表示布尔值，可以是 true 或 false。
  ```ts
  let identifier: bool = Boolean value;
  ```
- void类型：表示没有任何返回值的函数的返回类型。
  ```ts
  let aa: void = undefined;
  ```
- null 和 undefined类型：这两个类型是所有类型的子类型。 symbol：表示独特的值，类似于数字或字符串。
  ```ts
  let aa: null = null;
  ```

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
接口为使用该接口的对象定义契约或结构。它定义了类要遵循的语法，这意味着实现接口的类必须实现其所有成员。它不能被实例化，但可以被实现它的类对象引用。<br>
接口是用关键字定义的`interface`，它可以包含使用函数或箭头函数的属性和方法声明。
```ts
interface IEmployee {
  empCode: number;
  empName: string;
  getSalary: (number) => number; // arrow function
  getManagerName(number): string; 
}
```


## 6、TypeScript 中的模块是什么？
TypeScript 中的模块是相关变量、函数、类和接口的集合。<br>
你可以将模块视为包含执行任务所需的一切的容器。可以导入模块以轻松地在项目之间共享代码。
```ts
module module_name {
  class xyz {
    export sum(x, y){
      return x+y;
    }
  }
}
```


## 7、后端如何使用TypeScript？
你可以将 Node.js 与 TypeScript 结合使用，将 TypeScript 的优势带入后端工作。<br>
只需输入以下命令，即可将 TypeScript 编译器安装到你的 Node.js 中：
```ts
npm i -g typescript
```


## 8、TypeScript 中的类型断言是什么？
TypeScript 中的类型断言的工作方式类似于其他语言中的类型转换，但没有 C# 和 Java 等语言中可能的类型检查或数据重组。类型断言对运行时没有影响，仅由编译器使用。<br><br>
类型断言本质上是类型转换的软版本，它建议编译器将变量视为某种类型，但如果它处于不同的形式，则不会强制它进入该模型。


## 9、如何在 TypeScript 中创建变量？
你可以通过三种方式创建变量：var，let，和const。<br>
var是严格范围变量的旧风格。你应该尽可能避免使用，var因为它会在较大的项目中导致问题。
```ts
var num: number = 1;
```
let是在 TypeScript 中声明变量的默认方式。与var相比，let减少了编译时错误的数量并提高了代码的可读性。
```ts
let num: number = 1;
```
const创建一个其值不能改变的常量变量。它使用相同的范围规则，let并有助于降低整体程序的复杂性。
```ts
const num: number = 100;
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


## 11、解释如何使用 TypeScript mixin。
Mixin 本质上是在相反方向上工作的继承。Mixins 允许你通过组合以前类中更简单的部分类设置来构建新类。<br>
相反，类A继承类B来获得它的功能，类B从类A需要返回一个新类的附加功能。


## 12、TypeScript 中如何检查 null 和 undefined？
你可以使用 juggle-check，它检查 null 和 undefined，或者使用 strict-check，它返回true设置为null的值，并且不会评估true未定义的变量。
```js

//juggle
if (x == null) {  
}

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


## 13、TypeScript 中的 getter/setter 是什么？你如何使用它们？
Getter 和 setter 是特殊类型的方法，可帮助你根据程序的需要委派对私有变量的不同级别的访问。

Getters 允许你引用一个值但不能编辑它。Setter 允许你更改变量的值，但不能查看其当前值。这些对于实现封装是必不可少的。

例如，新雇主可能能够了解get公司的员工人数，但无权set了解员工人数。
```ts
const fullNameMaxLength = 10;
class Employee {
  private _fullName: string = "";
  get fullName(): string {
    return this._fullName;
  }
  set fullName(newName: string) {
    if (newName && newName.length > fullNameMaxLength) {
      throw new Error("fullName has a max length of " + fullNameMaxLength);
    }
    this._fullName = newName;
  }
}
let employee = new Employee();
employee.fullName = "Bob Smith";
if (employee.fullName) {
  console.log(employee.fullName);
}
```


## 14、如何允许模块外定义的类可以访问？
你可以使用export关键字打开模块以供在模块外使用。
```ts
module Admin {
  // use the export keyword in TypeScript to access the class outside
  export class Employee {
    constructor(name: string, email: string) { }
  }
  let alex = new Employee('alex', 'alex@gmail.com');
}
// The Admin variable will allow you to access the Employee class outside the module with the help of the export keyword in TypeScript
let nick = new Admin.Employee('nick', 'nick@yahoo.com');
```


## 15、如何使用 Typescript 将字符串转换为数字？
与 JavaScript 类似，你可以使用parseInt或parseFloat函数分别将字符串转换为整数或浮点数。你还可以使用一元运算符+将字符串转换为最合适的数字类型，“3”成为整数，3而“3.14”成为浮点数3.14。
```ts
var x = "32";
var y: number = +x;
```


## 16、什么是 .map 文件，为什么/如何使用它？
甲.map文件是源地图，显示原始打字稿代码是如何解释成可用的JavaScript代码。它们有助于简化调试，因为你可以捕获任何奇怪的编译器行为。

调试工具还可以使用这些文件来允许你编辑底层的 TypeScript 而不是发出的 JavaScript 文件。


## 17、TypeScript 中的类是什么？你如何定义它们？
类表示一组相关对象的共享行为和属性。类是用于创建可重用组件的基本实体。它是一组具有共同属性的对象。

例如，我们的类可能是Student，其所有对象都具有该attendClass方法。另一方面，John是一个单独的 type 实例，Student可能有额外的独特行为，比如attendExtracurricular.

你使用关键字声明类class：
```ts
class Student {    
  studCode: number;    
  studName: string;    
  constructor(code: number, name: string) {    
    this.studName = name;    
    this.studCode = code;    
  }
}
```


## 18、TypeScript 与 JavaScript 有什么关系？
TypeScript 是 JavaScript 的类型的超集，支持ES6语法，支持面向对象编程的概念，如类、接口、继承、泛型等，可编译为 JavaScript。所有原始 JavaScript 库和语法仍然有效，但 TypeScript 增加了 JavaScript 中没有的额外语法选项和编译器功能。

TypeScript 还可以与大多数与 JavaScript 相同的技术接口，例如 Angular 和 jQuery。


## 19、TypeScript 中的 JSX 是什么？
JSX 是一种可嵌入的类似于 XML 的语法，允许你创建 HTML。TypeScript 支持嵌入、类型检查和将 JSX 直接编译为 JavaScript。


## 20、TypeScript 支持哪些 JSX 模式？
TypeScript有内置的支持preserve，react和react-native。
- preserve 保持 JSX 完整以用于后续转换。
- react不经过 JSX 转换，而是react.createElement作为.js文件扩展名发出和输出。
- react-native结合起来preserve，react因为它维护所有 JSX 和输出作为.js扩展。


## 21、如何编译 TypeScript 文件？
你需要调用 TypeScript 编译器tsc来编译文件。你需要安装 TypeScript 编译器，你可以使用npm.
```shell
npm install -g typescript
tsc <TypeScript File Name>
```


## 22、TypeScript 中有哪些范围可用？这与JS相比如何？
- 全局作用域：在任何类之外定义，可以在程序中的任何地方使用。
- 函数/类范围：在函数或类中定义的变量可以在该范围内的任何地方使用。
- 局部作用域/代码块：在局部作用域中定义的变量可以在该块中的任何地方使用。


## 23、TypeScript 中的箭头/lambda 函数是什么？
箭头函数是用于定义匿名函数的函数表达式的速记语法。它类似于其他语言中的 lambda 函数。箭头函数可让你跳过function关键字并编写更简洁的代码。


## 24、解释rest参数和声明rest参数的规则。
其余参数允许你将不同数量的参数（零个或多个）传递给函数。当你不确定函数将接收多少参数时，这很有用。其余符号之后的所有参数...都将存储在一个数组中。<br>
例如：
```ts
function Greet(greeting: string, ...names: string[]) {
  return greeting + " " + names.join(", ") + "!";
}
Greet("Hello", "Steve", "Bill"); // returns "Hello Steve, Bill!"
Greet("Hello");// returns "Hello !"
```
rest 参数必须是参数定义的最后一个，并且每个函数只能有一个 rest 参数。


## 25、什么是三斜线指令？有哪些三斜杠指令？
三斜线指令是单行注释，包含用作编译器指令的 XML 标记。每个指令都表示在编译过程中要加载的内容。三斜杠指令仅在其文件的顶部工作，并且将被视为文件中其他任何地方的普通注释。
- `/// <reference path="..." />` 是最常见的指令，定义文件之间的依赖关系。
- `/// <reference types="..." />`类似于path但定义了包的依赖项。
- `/// <reference lib="..." />`允许您显式包含内置lib文件。


## 26、Omit类型有什么作用？
Omit是实用程序类型的一种形式，它促进了常见的类型转换。Omit允许你通过传递电流Type并选择Keys在新类型中省略来构造类型。
```ts
Omit<Type, Keys>
```
例如：
```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
  createdAt: number;
}
type TodoPreview = Omit<Todo, "description">;
```


## 27、TypeScript中如何实现函数重载？
要在 TypeScript 中重载函数，只需创建两个名称相同但参数/返回类型不同的函数。两个函数必须接受相同数量的参数。这是 TypeScript 中多态性的重要组成部分。

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
你可以使用partial映射类型轻松地将所有属性设为可选。


## 29、什么时候应该使用关键字unknown？
unknown，如果你不知道预先期望哪种类型，但想稍后分配它，则应该使用该any关键字，并且该关键字将不起作用。


## 30、什么是装饰器，它们可以应用于什么？
装饰器是一种特殊的声明，它允许你通过使用`@<name>`注释标记来一次性修改类或类成员。每个装饰器都必须引用一个将在运行时评估的函数。

例如，装饰器@sealed将对应于sealed函数。任何标有 的@sealed都将用于评估sealed函数。
```ts
function sealed(target) {
  // do something with 'target' ...
}
```
它们可以附加到：
- 类声明
- 方法
- 配件
- 特性
- 参数

**注意**：默认情况下不启用装饰器。要启用它们，你必须experimentalDecorators从tsconfig.json文件或命令行编辑编译器选项中的字段。


## 31、如何将多个ts文件合并为一个js文件
```hell
tsc --outFile comman.js file1.ts file2.ts file3.ts
```
这样就将三个ts文件合并到`comman.js`文件中


## 32、如何自动编译ts文件，并且自动修改ts文件
```shell
tsc --watch file1.ts
```


## 33、TypeScript支持哪些面向对象的术语
- 模块
- 类
- 接口
- 继承
- 数据类型
- 成员函数


## 34、TypeScript中的泛型
TypeScript 泛型是一种工具，它提供了一种创建可重用组件的方法。它能够创建可以处理多种数据类型而不是单一数据类型的组件。泛型在不影响性能或生产力的情况下提供类型安全。泛型允许创建泛型类、泛型函数、泛型方法和泛型接口。
在泛型中，类型参数写在开 (`<`) 和闭 (`>`) 括号之间，这使其成为强类型集合。泛型使用一种特殊的类型变量 `<T>` 来表示类型。泛型集合仅包含相似类型的对象。
```ts
function identity<T>(arg: T): T {
  return arg;
}
let output1 = identity<string>("myString");
let output2 = identity<number>( 100 );
console.log(output1);
console.log(output2);
```


## 35、TypeScript中const和readonly的区别是什么？枚举和常量的区别？
- const用于变量，readonly用于属性
- const在运行时检查，readonly在编译时检查
- 使用const变量保存的数组，可以使用push，pop等方法。但是如果使用Readonly Array声明的数组不能使用push，pop等方法


## 36、枚举和常量枚举的区别？
- 枚举会被编译时会编译成一个对象，可以被当作对象使用
- const 枚举会在 typescript 编译期间被删除，const 枚举成员在使用的地方会被内联进来，避免额外的性能开销


## 37、TS中的接口interface 和 type语句有什么区别
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

| 接口interface | type类型 |
| :-----------: | :-------: |
| 接口声明总是引入指定的对象类型。 | 类型别名声明可以为任何类型(包括基元类型、联合类型和交集类型)引入名称
| 接口可以extends继承。 | 不能继承 |
| 接口创建一个到处使用的新名称。 | 类型别名不会创建一个真正的名字。 |
| 接口重名时会产生合并 | 类型别名重名时编译器会抛出错误 |



## 38、TypeScript中的类型断言？
类型断言可以手动指定一个值的类型
```ts
// 第一种
let employeeCode = <number> code;

//第二种
let employeeCode = code as number
```
用途：
- 类型断言用于实现覆盖编译器推断的类型。也就是说，当我们使用了类型断言，那么就相当于告诉编译器，我们比它更了解这个变量应该是什么类型，编译器不应该再继续报错
- 将一个联合类型推断为其中一个类型
- 将一个父类断言为更加具体的子类
- 将任何一个类型断言为any
- 将any断言为一个具体的类型
```ts
interface FooType{
  a: string,
  b: number,
}
const Foo = {} as FooType
Foo.a = 'a'
Foo.b = 1
```
类型断言不等于类型转换：
- 类型转换发生于运行时。
类型断言发生于编译时。

双重断言：
```ts
function handler(event: Event){
  const element = (event as any) as HTMLElement
}
```


## 39、TypeScript的as语法是什么？
as是TypeScript中类型断言的附加语法，引入as-语法的原因是原始语法()与JSX冲突
```ts
let empCode: any = 111;     
let employeeCode = code as number; 
// 当使用带有JSX的TypeScript时，只允许as风格的断言。
```


## 40、TypeScript的Enum枚举类型？
枚举是一种数据类型，允许我们定义一组命名常量。使用枚举可以更容易地记录意图，或者创建一组不同的案例。它是相关值的集合，可以是数值或字符串值。
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
声明合并是编译器随后合并两个或多个独立声明的过程。将具有相同名称的声明为单个定义。这个合并的定义具有两个原始声明的特性。
- 最简单也是最常见的声明合并类型是接口合并
  ```ts
  interface Cloner {  
    clone(animal: Animal): Animal;  
  }  
  interface Cloner {  
    clone(animal: Sheep): Sheep;  
  }  
  interface Cloner {  
    clone(animal: Dog): Dog;  
    clone(animal: Cat): Cat;  
  } 
  ```
  将这三个接口合并为一个单独声明
  ```ts
  interface Cloner {  
    clone(animal: Dog): Dog;  
    clone(animal: Cat): Cat;  
    clone(animal: Sheep): Sheep;  
    clone(animal: Animal): Animal;  
  } 
  ```
  在TypeScript中不是所有的合并都允许。目前，类不能与其他类或变量合并。


## 42、TypeScript中?. , ?? , !： , _ , ** 等符号的含义？
- `?.` 可选链
- `??` 类似与短路或，??避免了一些意外情况，0，NaN以及"",false被视为false值。只有undefind,null被视为false值。
- `!.` 在变量名后添加!，可以断言排除undefined和null类型
- `_ ,` 声明该函数将被传递一个参数，但您并不关心它
- `!:` 待会分配这个变量，ts不要担心
- `**` 求幂


## 43、什么是 any 类型，何时使用 ？


## 44、什么是void，什么时候使用void类型 ？


## 45、如何在 TypeScript 中指定可选属性 ？
通过添加 ？对象类型可以具有零个或多个可选属性，在属性名称之后
```ts
let pt: { x: number; y?: number } = {
  x: 10
}
```


## 46、TypeScript 中控制成员可见性有几种方法 ？
TypeScript 提供了三个关键字来控制类成员的可见性
- `public`：您可以在 class 外的任何地方访问公共成员。默认情况下，所有类成员都是公共的。
- `protected`：受保护的成员仅对包含该成员的类的子类可见。不扩展容器类的外部代码无法访问受保护的成员。
- `private`：私有成员仅在类内部可见，没有外部代码可以访问类的私有成员。


## 47、TypeScript 支持静态类吗 ？为什么 ？
TypeScript 不支持静态类，这与流行的 C# 和 Java 等面向对象的编程语言不同。

这些语言需要静态类，因为所有代码，即数据和函数，都需要在一个类中并且不能独立存在。静态类提供了一种方法来允许这些功能，而无需将它们与任何对象相关联。在 TypeScript 中，您可以将任何数据和函数创建为简单对象，而无需创建包含类。因此 TypeScript 不需要静态类，单例类只是 TypeScript 中的一个简单对象。


## 48、Typescript 的缺点是什么？
- 需要很长时间来编译代码
- 不支持抽象类
- 在浏览器中运行typescript应用程序，需要一个编译步骤将typescript转成JavaScript


## 49、ts 中的 any 和 unknown 有什么区别？
unknown 和 any 的主要区别是 unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。而在对 any 类型的值执行操作之前，我们不必进行任何检查。
```ts
let foo: any = 123;
console.log(foo.msg); // 符合TS的语法
let a_value1: unknown = foo; // OK
let a_value2: any = foo; // OK
let a_value3: string = foo; // OK
let bar: unknown = 222; // OK
console.log(bar.msg); // Error
let k_value1: unknown = bar; // OK
let K_value2: any = bar; // OK
let K_value3: string = bar; // Error
```
因为bar是一个未知类型(任何类型的数据都可以赋给 unknown 类型)，所以不能确定是否有msg属性。不能通过TS语法检测；而 unknown 类型的值也不能将值赋给 any 和 unknown 之外的类型变量<br>
总结：any 和 unknown 都是顶级类型，但是 unknown 更加严格，不像 any 那样不做类型检查，反而 unknown 因为未知性质，不允许访问属性，不允许赋值给其他有明确类型的变量。


## 50、TypeScript 中 never 和 void 的区别
- void 表示没有任何类型（可以被赋值为 null 和 undefined）。
- never 表示一个不包含值的类型，即表示永远不存在的值。
- 拥有 void 返回值类型的函数能正常运行。拥有 never 返回值类型的函数无法正常返回，无法终止，或会抛出异常。


## 51、安装 Typescript 的最低要求是什么？或者如何获得 TypeScript 并安装它？
TypeScript 可以通过 npm(Node.js 包管理器)在 node 的帮助下安装和管理。要安装 TypeScript，首先确保 npm 安装正确，然后运行以下命令在系统上全局安装 TypeScript。 
```shell
npm install -g typescript
```
它安装了一个命令行代码tsc，它将进一步用于编译 Typescript 代码。


## 52、内部模块和外部模块有什么区别？


## 54、Typescript 中的命名空间是什么？ 如何在 Typescript 中声明命名空间？
命名空间是一种用于对功能进行逻辑分组的方式。命名空间用于在内部维护 typescript 的遗留代码。它封装了共享某些关系的特征和对象。命名空间也称为内部模块。命名空间还可以包括接口、类、函数和变量，以支持一组相关功能。 注意：一个命名空间可以在多个文件中定义，并允许保留每个文件，因为它们都在一个地方定义。



## 55、是否可以调试任何 TypeScript 文件？


## 56、TypeScript管理器是什么？为什么需要它？


## 57、TypeScript声明(declare)关键字是什么？


## 58、如何从任何 .ts 文件生成 TypeScript 定义文件？
参考：https://www.yiibai.com/interview/1900


## 59、tsconfig.json文件是什么？
tsconfig.json 文件是 JSON 格式的文件。在 tsconfig.json 文件中，可以指定各种选项来告诉编译器如何编译当前项目。目录中存在 tsconfig.json 文件表明该目录是 TypeScript 项目的根目录。下面是一个示例 tsconfig.json 文件的内容：
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


## 60、TypeScript是否支持所有面向对象的原则？
是的，TypeScript 支持所有面向对象的原则。面向对象编程有四个主要原则：
- 封装
- 继承
- 抽象
- 多态性


## 61、