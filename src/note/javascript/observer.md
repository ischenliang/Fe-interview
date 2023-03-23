# Observer
## 浏览器的5种Observer
网页开发中我们经常要处理用户交互，我们会用`addEventListener`添加事件监听器来监听各种用户操作，比如`click`、`mousedown`、`mousemove`、`input`等，这些都是由用户直接触发的事件。

那么对于一些不是由用户直接触发的事件呢？
> 比如元素从不可见到可见、元素大小的改变、元素的属性和子节点的修改等，这类事件如何监听呢？

浏览器提供了5种Observer来监听这些变动：
- **`IntersectionObserver`**：监听元素可见性变化，常用来做元素显示的数据采集、图片的懒加载
- **`MutationObserver`**：监听元素属性和子节点变化，比如可以用来做去不掉的水印
- **`ResizeObserver`**：监听元素大小变化

还有两个与元素无关的：
- **`PerformanceObserver`**：监听`performance`记录的行为，来上报数据
- **`ReportingObserver`**：监听过时的api、浏览器的一些干预行为的报告，可以让我们更全面的了解网页 app 的运行情况

## MutationObserver
监听一个普通JS对象的变化，我们会用`Object.defineProperty`或者`Proxy`：
```js
let obj = {}
const objProxy = new Proxy(obj, {
  get: (target, key, receiver) => {
    console.log('get ' + key)
    return Reflect.get(target, key, receiver)
  },
  set: (target, key, value, receiver) => {
    console.log('set', key)
    if (key === 'text') {
      input.value = value
      p.innerHTML = value
    }
    return Reflect.set(target, key, value, receiver)
  }
})
objProxy.name = '张三' // set name
objProxy.name // get name
```
而监听元素的属性和子节点的变化，我们可以用`MutationObserver`
> **`MutationObserver`可以监听对元素的属性的修改、对它的子节点的增删改。**

### 构造函数
创建并返回一个新的观察器，它会在触发指定 DOM 事件时，调用指定的回调函数。
> 监视一个节点及其全部子节点树的添加、移除元素，以及任何属性变化的事件。

**语法如下**: 
```js
var observer = new MutationObserver(callback);
```
**参数解析**: 
- `callback`: 一个回调函数，每当被指定的节点或子树以及配置项有 DOM 变动时会被调用。
  - 回调函数拥有两个参数:
    - 一个是描述所有被触发改动的`MutationRecord`对象数组
    - 另一个是调用该函数的`MutationObserver`对象

### 方法
#### observe()
方法配置了`MutationObserver`对象的回调方法以开始接收与给定选项匹配的 DOM 变化的通知。

**语法如下**:
```js
mutationObserver.observe(target[, options])
```
**参数解析**:
- `target`: DOM 树中的一个要观察变化的`DOM Node`(可能是一个`Element`)，或者是被观察的子节点树的根节点。
- `options`: 此对象的配置项描述了DOM的哪些变化应该报告给`MutationObserver`的`callback`。
  > 当调用`observe()`时，`childList、attributes 和 characterData`中，必须有一个参数为`true`。否则会抛出`TypeError`异常。
  - `subtree`: 当为`true`时，将会监听以`target`为根节点的整个子树。包括子树中所有节点的属性，而不仅仅是针对`target`。默认值为`false`。
  - `childList`: 当为`true`时，监听`target`节点中发生的节点的新增与删除（同时，如果`subtree`为`true`，会针对整个子树生效）。默认值为`false`。
  - `attributes`: 当为`true`时观察所有监听的节点属性值的变化。默认值为`true`，当声明了`attributeFilter`或`attributeOldValue`，默认值则为`false`。
  - `attributeFilter`: 一个用于声明哪些属性名会被监听的数组。如果不声明该属性，所有属性的变化都将触发通知。
  - `attributeOldValue`: 当为`true`时，记录上一次被监听的节点的属性变化；默认值为`false`。
  - `characterData`: 当为`true`时，监听声明的`target`节点上所有字符的变化。默认值为`true`，如果声明了`characterDataOldValue`，默认值则为`false`
  - `characterDataOldValue`: 当为`true`时，记录前一个被监听的节点中发生的文本变化。默认值为`false`

#### disconnect()
该告诉观察者停止观察变动。可以通过调用其`observe()`方法来重用观察者。

**语法如下**:
```js
mutationObserver.disconnect()
```

#### takeRecords()
方法返回已检测到但尚未由观察者的回调函数处理的所有匹配 DOM 更改的列表，使变更队列保持为空。
> 最常见的使用场景是在断开观察者之前立即获取所有未处理的更改记录，以便在停止观察者时可以处理任何未处理的更改。

**语法如下**:
```js
mutationRecords = mutationObserver.takeRecords()
```

### 示例
```html
<article>默认内容</article>
<button id="btn1">修改内容</button>
<button id="btn2">修改样式</button>
<script>
  const observer = new MutationObserver(() => {
    console.log('dom更新了')
  })
  const article = document.querySelector('article')
  // observer.observe childList、attributes和characterData中
  observer.observe(article, {
    // childList、attributes和characterData三个配置中必须有一个为true，否则会报TypeError异常
    childList: true
  })

  const btn1 = document.querySelector('#btn1')
  const btn2 = document.querySelector('#btn2')
  btn1.addEventListener('click', () => {
    article.innerHTML = '修改后的内容'
  })
  btn2.addEventListener('click', () => {
    article.style.color = 'red'
  })
</script>
```
- 点击上面`修改内容`按钮将`article`的内容更新，会发现此时浏览器控制栏输出了`dom更新了`，说明我们能检测到`DOM`已经更新了。
- 但是我们点击`修改样式`按钮将`article`的字体颜色改成红色，修改成功了，但是并没有调回调，这是由于我们在`observer.observe`时设置的`options`只是`childList`，只监听节点中发生的节点的新增与删除，如果想要监听颜色变化，只需要加上`attributes`属性即可。