# 模板编译实现原理
参考:
- https://blog.csdn.net/qq_36259513/article/details/103794779
- https://blog.csdn.net/wsq_bsdn/article/details/114300958?spm=1001.2014.3001.5502
- https://zhuanlan.zhihu.com/p/362128744
- https://blog.csdn.net/qq_41370833/article/details/125467581

## 1、模板编译
### 1.1、什么是模板编译？
我们把写在`<template></template>`标签中的内容称之为**模板**。

**模板编译指的是模板将编译成渲染函数(`render`)的过程**。渲染函数会生成`vnode`，最终以`vnode`渲染视图。
> [Vue Template Explore](https://template-explorer.vuejs.org/)是一个在线模板转换成`render`函数的工具。

![202303161654376.png](http://img.itchenliang.club/img/202303161654376.png)

渲染流程如下:
> 所谓渲染流程，就是把用户在`<template></template>`标签中写的模板经过一系列处理最终反映到视图中的过程。
![202303161719045.png](http://img.itchenliang.club/img/202303161719045.png)
从上图可以看到，**模板编译过程就是把用户写的模板经过一系列的处理最终生成`render`函数的过程**。

### 1.2、模板编译流程
模板编译可分为三个步骤：
- 1、将html模板转换化成AST(**解析器**)
  - AST即抽象语法树(AbstractSyntaxTree): 是一个用来表示html的js对象
  - 抽象语法树和虚拟DOM的区别
  > 虚拟dom是将真实dom以对象的方式进行抽象表示，而ast则是对语法结构的抽象表示。
  - 抽象语法树在线转换: [astexplorer](https://astexplorer.net/)
    > 将一个简单的`<div>`转换成语法树
    ![2023031617271710.png](http://img.itchenliang.club/img/2023031617271710.png)
- 2、将AST中的静态节点打上标签(**优化器**)
- 3、用AST生成`render`函数代码字符串(**代码生成器**)

**这三个阶段分别对应三个模块**
- 模板解析阶段——解析器——源码路径：`src/compiler/parser/index.js`;
- 优化阶段——优化器——源码路径：`src/compiler/optimizer.js`;
- 代码生成阶段——代码生成器——源码路径：`src/compiler/codegen/index.js`; 

#### 1.2.1、解析器
解析器的作用就是将html模板转化为AST。例如：
```html
<div>
  <p>{{name}}</p>
</div>
```
上面这样一个简单的模板转换成AST后是这样的：
```js
{
  tag: "div", // 标签
  type: 1, // 1 元素节点，2 带变量的文本，3 静态文本
  staticRoot: false, // 静态根节点标识
  static: false, // 静态节点标识
  plain: true, // 是否没有属性
  parent: undefined, // 父节点
  attrsList: [], // 节点属性
  attrsMap: {}, // 节点属性
  children: [{ // 子节点
    tag: "p",
    type: 1,
    staticRoot: false,
    static: false,
    plain: true,
    parent: {tag: "div"...},
    attrsList: [],
    attrsMap: {},
    children: [{
        type: 2,
        text: "text",
        static: false,
        expression: "_s(name)"
    }]
  }]
}
```
解析器内部原理是一小段一小段地截取模板字符串，每截取一小段字符串就会根据截取的出的字符串，利用正则匹配判断出它的类型触发相应的钩子函数生成相应的AST节点，直到模板字符串截空为止。

解析器分为`HTML解析器`和`文本解析器`
- HTML解析器
  > 在源码中，`HTML解析器`就是`parseHTML`函数，在模板解析主线函数`parse`中调用了该函数，并传入两个参数，代码如下：
    ```js
    // 代码位置：/src/complier/parser/index.js
    /**
    * Convert HTML string to AST.
    * 将HTML模板字符串转化为AST
    */
    export function parse(template, options) {
      // ...
      parseHTML(template, {
        warn,
        expectHTML: options.expectHTML,
        isUnaryTag: options.isUnaryTag,
        canBeLeftOpenTag: options.canBeLeftOpenTag,
        shouldDecodeNewlines: options.shouldDecodeNewlines,
        shouldDecodeNewlinesForHref: options.shouldDecodeNewlinesForHref,
        shouldKeepComment: options.comments,
        // 当解析到开始标签时，调用该函数
        start (tag, attrs, unary) {

        },
        // 当解析到结束标签时，调用该函数
        end () {

        },
        // 当解析到文本时，调用该函数
        chars (text) {

        },
        // 当解析到注释时，调用该函数
        comment (text) {

        }
      })
      return root
    }
    ```
  从代码中我们可以看到，调用parseHTML函数时为其传入的两个参数分别是：
    - `template`: 待转换的模板字符串；
    - `options`: 转换时所需的选项；
- 文本解析器
  > 创建含有变量的AST节点时节点的type属性为2，并且相较于不包含变量的AST节点多了两个属性：`expression`和`tokens`。
  ```js
  // 当解析到标签的文本时，触发chars
  chars (text) {
    if(res = parseText(text)){
      let element = {
        type: 2,
        expression: res.expression,
        tokens: res.tokens,
        text
      }
    } else {
      let element = {
        type: 3,
        text
      }
    }
  }
  ```
另外，解析器用栈来维护节点间的层级关系，所有被处理的节点依次压入栈中，处理完的节点弹出栈。按照这样的逻辑，栈的最顶层节点就是当前正在处理的节点的父节点。
```html
<div>
  <p>{{name}}</p>
</div>
```
例如，现在有一个模板字符串，解析步骤如下：
1. 截取`<div>`，识别为开始标签，触发`start方`法，将`div`标签压入栈内，`currentParent`设为`div`。
2. 截取`<p>`，识别为开始标签，触发`start`方法，将`div`标签压入栈内，`currentParent`设为`p`。
3. 截取`{{name}}`,识别为文本，触发`chars`方法，此时`currentParent`为`p`，生成的文本节点设为`p`标签的子节点。
4. 截取`</p>`，识别为结束标签，将p从栈中弹出，`currentParent`设为弹出后最顶层的节点，即`div`，调用`closeElement`绑定`p`与`div`的父子关系。
5. 截取`</div>`，识别为结束标签, 将`div`从栈中弹出。
6. 模板为空，解析完毕。

#### 1.2.2、优化器
优化器的作用是在AST中找出静态根节点并打上标记，即`staticRoot`属性设为`true`，这样做有两个好处：
- 每次重新渲染时，不需要渲染静态节点树，直接复用原来的静态节点树
- 在虚拟DOM进行diff的过程可以直接跳过

静态节点概述: 静态节点不依赖于变量，不管变量如何变化，都不会影响它的渲染。
```html
// 静态节点
<p>my name is gavin</p>
 
// 动态节点
<p>my name is {{name}}</p>
```

优化器的内部实现主要分两个步骤：
- 找出AST所有静态节点并打上标记，`static`属性设为`true`
- 找出AST中所有静态根节点，`staticRoot`属性设为`true`

#### 1.2.3、代码生成器
代码生成器的作用是递归AST生成可执行的代码字符串，当代码字符串拼接好后，会放在`with`中返回给调用者。例如：
```js
// 模板
<div id="el">Hello {{name}}</div>
 
// 转为AST
{
  type: 1,
  div: 'div',
  attrsList: [{
    name: 'id',
    value: ''el
  }],
  attrs: [{
    name: 'id',
    value: ''el
  }],
  attrsMap: {
    id: 'el'
  },
  plain: false,
  static: false,
  staticRoot: false,
  children: [
    type: 2,
    expression: '"hello "+ _s(name)',
    text: 'Hello {{name}}',
    static: false
  ]
}
 
// 生成代码字符串
// _c对应元素节点、_v对应文本节点、_s对应动态文本
with (this) {
  return _c(
    "div",
    {
      attrs: {id: 'el'}
    },
    [
      _v("Hello "+_s(name))
    ]
  )
}
```
代码字符串中`_c`其实就是`render`函数，三个参数分别为：标签名、属性对象、子节点数组。
![202303161649569.png](http://img.itchenliang.club/img/202303161649569.png)