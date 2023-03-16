# 虚拟DOM实现原理
## 1、Vue中的虚拟DOM
### 1.1、什么是虚拟DOM？
所谓虚拟DOM，就是用一个JS对象来描述一个DOM节点，像如下示例：
```js
<div class="a" id="b">我是内容</div>
{
  tag:'div',        // 元素标签
  attrs:{           // 属性
    class:'a',
    id:'b'
  },
  text:'我是内容',  // 文本内容
  children:[]       // 子元素
}
```
把组成一个DOM节点的必要东西通过一个JS对象表示出来，那么这个JS对象就可以用来描述这个DOM节点，我们把这个JS对象就称为是这个真实DOM节点的虚拟DOM节点。

### 1.2、为什么要有虚拟DOM？
使用vue开发的人都知道，`vue`是数据驱动视图的，数据发生变化视图就要随之更新，在更新视图时难免要操作`DOM`，但操作真实`DOM`是非常消耗性能的，因为浏览器把真实`DOM`设计的非常庞大，复杂，如下所示:
```js
let div = document.createElement('div')
let str = ''
for (const key in div) {
  str += key + ''
}
console.log(str)
```
![202303161509358.png](http://img.itchenliang.club/img/202303161509358.png)
从上面代码中我们只是简单的创建一个`div`元素，然后将`div`上的属性打印输出就这么多东西。一个简单的`div`就有这么多东西，更不用说复杂的、深嵌套的`DOM`了。所以操作真实`DOM`是非常消耗性能的。

我们要更新视图就得操作dom、既然无法避免操作`DOM`这道坎，但是我们可以尽可能的减少操作`DOM`。那如何在更新视图时尽可能少的操作`DOM`呢？
> 我们不能盲目的直接更新整个视图，而是通过对比数据变化前后的状态，计算出视图中哪些地方需要更新，然后只更新需要更新的地方，这样尽可能的去减少`DOM`操作，其实就是使用`js`的计算性能来代替操作`DOM`的性能，`js`的计算性能远大于`dom`操作的性能。

按照上面的想法，所以我们可以使用`js`来模拟出`DOM`节点，称之为虚拟`DOM`节点。当数据发生变化时，去对比变化前后的虚拟`DOM`节点，然后通过一系列的算法计算出需要更新的地方，然后去更新需要更新的视图。
> 这就是虚拟`DOM`产生的原因以及最大的用途。

## 2、Vue中的虚拟DOM
在前面我们知道了为什么要有虚拟`DOM`，那么在vue中虚拟`DOM`是如何实现的呢？接下来我们一步一步的去研究。

### 2.1、虚拟DOM库
- [Snabbdom](https://github.com/snabbdom/snabbdom)
  - Vue.js 2.x 内部使用的虚拟DOM就是改造的`Snabbdom`
  - 大约 200SLOC(single line of code)
  - 通过模块可扩展
  - 源码使用`TypeScript`开发
  - 最快的 Virtual DOM 之一
- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)

### 2.2、VNode类
前面说到，虚拟`DOM`就是一个用`js`对象来描述真实的`DOM`节点。在vue中提供了一个`VNode`类，通过这个类就可以实例化处不同类型的`DOM`节点，对应vue源码位置`src/core/vdom/vnode.js`

**简单演示实现**
```js
class VNode {
  /**
   * @param tag 标签名
   * @param 属性 标签名
   * @param chilren 子节点[VNode, VNode, ...]
   * @param tag 文本节点
   * @param elm 对应的真实dom对象
   */ 
  constructor (tag, attrs, children, text, elm) {
    this.tag = tag
    this.attrs = attrs
    this.children = children
    this.text = text
    this.elm = elm
  }
}
// 为了看这好看，将实例化的构建封装成一个方法
function createNode (tag, attrs, children, text) {
  return new VNode(tag, attrs, children, text, null)
}
```
然后我们想要实现如下的dom结构
```html
<ul class="list">
  <li class="item1">item1</li>
  <li class="item2">item2</li>
  <li class="item3">item3</li>
</ul>
```
对应的创建代码为
```js
const vnode = createNode(
  'ul',
  { class: 'list' },
  [
    createNode('li', { class: 'item1' }, null, 'item1'),
    createNode('li', { class: 'item2' }, null, 'item2'),
    createNode('li', { class: 'item3' }, null, 'item3')
  ],
  ''
)
console.log(vnode)
```
输出结果如下
![202303161602517.png](http://img.itchenliang.club/img/202303161602517.png)

**解读vue源码**
```js
export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
    context?: Component,
    componentOptions?: VNodeComponentOptions,
    asyncFactory?: Function
  ) {
    this.tag = tag                                /*当前节点的标签名*/
    this.data = data        /*当前节点对应的对象，包含了具体的一些数据信息，是一个VNodeData类型，可以参考VNodeData类型中的数据信息*/
    this.children = children  /*当前节点的子节点，是一个数组*/
    this.text = text     /*当前节点的文本*/
    this.elm = elm       /*当前虚拟节点对应的真实dom节点*/
    this.ns = undefined            /*当前节点的名字空间*/
    this.context = context          /*当前组件节点对应的Vue实例*/
    this.fnContext = undefined       /*函数式组件对应的Vue实例*/
    this.fnOptions = undefined
    this.fnScopeId = undefined
    this.key = data && data.key           /*节点的key属性，被当作节点的标志，用以优化*/
    this.componentOptions = componentOptions   /*组件的option选项*/
    this.componentInstance = undefined       /*当前节点对应的组件的实例*/
    this.parent = undefined           /*当前节点的父节点*/
    this.raw = false         /*简而言之就是是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false*/
    this.isStatic = false         /*静态节点标志*/
    this.isRootInsert = true      /*是否作为跟节点插入*/
    this.isComment = false             /*是否为注释节点*/
    this.isCloned = false           /*是否为克隆节点*/
    this.isOnce = false                /*是否有v-once指令*/
    this.asyncFactory = asyncFactory
    this.asyncMeta = undefined
    this.isAsyncPlaceholder = false
  }
  get child (): Component | void {
    return this.componentInstance
  }
}
```
`VNode`类中包含了描述一个真实DOM节点所需要的一系列属性
- `tag`表示节点的标签
- `text`表示节点中包含的文本
- `children`表示该节点包含的子节点等。

通过属性之间不同的搭配，就可以描述出各种类型的真实DOM节点。

### 2.3、VNode的类型
现通过不同属性的搭配，可以描述出以下几种类型的节点:
- 注释节点
- 文本节点
- 元素节点
- 组件节点
- 函数式组件节点
- 克隆节点

#### 2.2.1、注释节点
注释节点描述起来相对就非常简单了，它只需两个属性就够了
```js
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
  const node = new VNode()
  node.text = text
  node.isComment = true
  return node
}
```
`text`属性表示具体的注释信息，`isComment`是一个标志，用来标识一个节点是否是注释节点。

#### 2.2.2、文本节点
文本节点描述起来比注释节点更简单，因为它只需要一个属性，那就是text属性，用来表示具体的文本信息。
```js
// 创建文本节点
export function createTextVNode (val: string | number) {
  return new VNode(undefined, undefined, undefined, String(val))
}
```

#### 2.2.3、克隆节点
克隆节点就是把一个已经存在的节点复制一份出来，它主要是为了做模板编译优化时使用。
```js
// 创建克隆节点
export function cloneVNode (vnode: VNode): VNode {
  const cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  )
  cloned.ns = vnode.ns
  cloned.isStatic = vnode.isStatic
  cloned.key = vnode.key
  cloned.isComment = vnode.isComment
  cloned.fnContext = vnode.fnContext
  cloned.fnOptions = vnode.fnOptions
  cloned.fnScopeId = vnode.fnScopeId
  cloned.asyncMeta = vnode.asyncMeta
  cloned.isCloned = true
  return cloned
}
```
克隆节点就是把已有节点的属性全部复制到新节点中，而现有节点和新克隆得到的节点之间唯一的不同就是克隆得到的节点`isCloned`为`true`。

#### 2.2.4、元素节点
```js
// 真实DOM节点
<div id='a'><span>难凉热血</span></div>

// VNode节点
{
  tag:'div',
  data:{},
  children:[
    {
      tag:'span',
      text:'难凉热血'
    }
  ]
}
```
真实DOM节点中:`div`标签里面包含了一个`span`标签，而`span`标签里面有一段文本。反应到`VNode`节点上就如上所示`tag`表示标签名，`data表`示标签的属性`id`等，`children`表示子节点数组。

#### 2.2.5、组件节点
组件节点除了有元素节点具有的属性之外，它还有两个特有的属性：
- `componentOptions`: 组件的`option`选项，如组件的`props`等
- `componentInstance`: 当前组件节点对应的Vue实例

#### 2.2.6、函数式组件节点
函数式组件节点相较于组件节点，它又有两个特有的属性：
- `fnContext`:函数式组件对应的Vue实例
- `fnOptions`: 组件的`option`选项

### 2.4、节点操作
#### 2.4.1、创建节点
VNode类可以描述6种类型的节点，而实际上只有3种类型的节点能够被创建并插入到DOM中，它们分别是：`元素节点、文本节点、注释节点`。
```js
// 源码位置: /src/core/vdom/patch.js
function createElm (vnode, parentElm, refElm) {
  const data = vnode.data
  const children = vnode.children
  const tag = vnode.tag
  if (isDef(tag)) {
    vnode.elm = nodeOps.createElement(tag, vnode)   // 创建元素节点
    createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
    insert(parentElm, vnode.elm, refElm)       // 插入到DOM中
  } else if (isTrue(vnode.isComment)) {
    vnode.elm = nodeOps.createComment(vnode.text)  // 创建注释节点
    insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
  } else {
    vnode.elm = nodeOps.createTextNode(vnode.text)  // 创建文本节点
    insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
  }
}
```
::: warning 注意
代码中的`nodeOps`是Vue为了跨平台兼容性，对所有节点操作进行了封装。
```js
nodeOps.createTextNode()
// 在浏览器端等同于
document.createTextNode()
```
:::
从上面代码可以看出:
- 是否为元素节点: 只需要判断`tag`标签即可，有`tag`属性即认为是元素节点，然后调用`createElement`方法创建元素节点
  > 元素节点通常还会有子节点，递归遍历创建所有子节点，将所有子节点创建好之后`insert`插入到当前元素节点里面，最后把当前元素节点插入到DOM中。
- 是否为注释节点: 只需判断`isComment`属性即可，若为`true`则为注释节点，则调用`createComment`方法创建注释节点，再插入到DOM中。
- 既不是元素节点，也不是注释节点，那就认为是文本节点，则调用`createTextNode`方法创建文本节点，再插入到DOM中。

### 2.4.2、删除节点
如果某些节点再新的`VNode`中没有而在`oldVNode`中有，那么就需要把这些节点从`oldVNode`中删除。
> 删除节点非常简单，只需在要删除节点的父元素上调用`removeChild`方法即可。
```js
function removeNode (el) {
  const parent = nodeOps.parentNode(el)  // 获取父节点
  if (isDef(parent)) {
    nodeOps.removeChild(parent, el)  // 调用父节点的removeChild方法
  }
}
```

### 2.4.3、更新节点
更新节点就是当某些节点在新的`VNode`和`oldVNode`中都有时，我们就需要细致比较一下，找出不一样的地方进行更新。
::: tip 静态节点
```html
<p>我是不会变化的文字</p>
```
上面这个节点里面只包含了纯文字，没有任何可变的变量，也就是说，不管数据再怎么变化，只要这个节点第一次渲染了，那么它以后就永远不会发生变化，这是因为它不包含任何变量，所以数据发生任何变化都与它无关。我们把这种节点称之为**静态节点**。
:::
更新节点的时候我们需要对以下3种情况进行判断并分别处理：
- 如果`VNode`和`oldVNode`均为静态节点
  > 静态节点无论数据发生任何变化都与它无关，所以都为静态节点的话则直接跳过，无需处理。
- 如果`VNode`是文本节点
  - 如果`VNode`是文本节点即表示这个节点内只包含纯文本，那么只需看`oldVNode`是否也是文本节点
    - 如果是，那就比较两个文本是否不同，如果不同则把`oldVNode`里的文本改成跟`VNode`的文本一样
    - 如果不是，那么不论它是什么，直接调用`setTextNode`方法把它改成文本节点，并且文本内容跟`VNode`相同。
- 如果`VNode`是元素节点
  - 如果`VNode`是元素节点，则又细分以下两种情况：
    - 该节点包含子节点
      - 如果新的节点内包含了子节点，那么此时要看旧的节点是否包含子节点，如果旧的节点里也包含了子节点，那就需要递归对比更新子节点；
      - 如果旧的节点里不包含子节点，那么这个旧节点有可能是空节点或者是文本节点，如果旧的节点是空节点就把新的节点里的子节点创建一份然后插入到旧的节点里面，如果旧的节点是文本节点，则把文本清空，然后把新的节点里的子节点创建一份然后插入到旧的节点里面。
    - 该节点不包含子节点
      - 如果该节点不包含子节点，同时它又不是文本节点，那就说明该节点是个空节点，那就好办了，不管旧节点之前里面都有啥，直接清空即可。

代码中实现上述理论
```js
// 更新节点
function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
  // vnode与oldVnode是否完全一样？若是，退出程序
  if (oldVnode === vnode) {
    return
  }
  const elm = vnode.elm = oldVnode.elm

  // vnode与oldVnode是否都是静态节点？若是，退出程序
  if (isTrue(vnode.isStatic) &&
    isTrue(oldVnode.isStatic) &&
    vnode.key === oldVnode.key &&
    (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
  ) {
    return
  }

  const oldCh = oldVnode.children
  const ch = vnode.children
  // vnode有text属性？若没有：
  if (isUndef(vnode.text)) {
    // vnode的子节点与oldVnode的子节点是否都存在？
    if (isDef(oldCh) && isDef(ch)) {
      // 若都存在，判断子节点是否相同，不同则更新子节点
      if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
    }
    // 若只有vnode的子节点存在
    else if (isDef(ch)) {
      /**
       * 判断oldVnode是否有文本？
       * 若没有，则把vnode的子节点添加到真实DOM中
       * 若有，则清空Dom中的文本，再把vnode的子节点添加到真实DOM中
       */
      if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
      addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)
    }
    // 若只有oldnode的子节点存在
    else if (isDef(oldCh)) {
      // 清空DOM中的子节点
      removeVnodes(elm, oldCh, 0, oldCh.length - 1)
    }
    // 若vnode和oldnode都没有子节点，但是oldnode中有文本
    else if (isDef(oldVnode.text)) {
      // 清空oldnode文本
      nodeOps.setTextContent(elm, '')
    }
    // 上面两个判断一句话概括就是，如果vnode中既没有text，也没有子节点，那么对应的oldnode中有什么就清空什么
  }
  // 若有，vnode的text属性与oldVnode的text属性是否相同？
  else if (oldVnode.text !== vnode.text) {
    // 若不相同：则用vnode的text替换真实DOM的文本
    nodeOps.setTextContent(elm, vnode.text)
  }
}
```

## 3、Vue中的DOM-diff
对比新旧两份`VNode`并找出差异的过程就是所谓的`DOM-Diff`过程。`DOM-Diff`算法是整个虚拟DOM的核心所在。

### 3.1、patch
Vue中，把`DOM-Diff`过程叫做`patch`过程。`patch`意为`“补丁”`，即指对旧的`VNode`修补，打补丁从而得到新的`VNode`。
- `oldVNode`: 旧的`VNode`是数据变化之前视图所对应的虚拟DOM节点
- `VNode`: 新的`VNode`是数据变化之后将要渲染的新的视图所对应的虚拟DOM节点

整个过程: 我们以新的`VNode`为基准，去对比`oldVNode`
- 如果新的`VNode`上有的节点而`oldVNode`上没有，那么就在`oldVNode`上加上去；
- 如果新的`VNode`上没有的节点而`oldVNode`上有，那么就在`oldVNode`上去掉；
- 如果某些节点在新的`VNode`和`oldVNode`上都有，那么就以新的`VNode`为准，更新`oldVNode`，从而让新旧VNode相同。

**以新的`VNode`为基准，改造`oldVNode`使之成为跟新的`VNode`一样，这就是`patch`过程要干的事**。换个角度想，整个`patch`其实就干三件事儿:
- 创建节点: 新的`VNode`中有而`oldVNode`中没有，就在`oldVNode`中创建。
- 删除节点: 新的`VNode`中没有而`oldVNode`中有，就从`oldVNode`中删除。
- 更新节点: 新的`VNode`和`oldVNode`中都有，就以新的`VNode`为准，更新`oldVNode`。

### 3.2、patch函数
diff的过程就是调用`patch`函数，像打补丁一样修改真实`DOM`
```js
function patch (oldVnode, vnode) {
  if (sameVnode(oldVnode, vnode)) {
    patchVnode(oldVnode, vnode)
  } else {
    const oEl = oldVnode.el
    let parentEle = api.parentNode(oEl)
    createEle(vnode)
    if (parentEle !== null) {
      api.insertBefore(parentEle, vnode.el, api.nextSibling(oEl))
      api.removeChild(parentEle, oldVnode.el)
      oldVnode = null
    }
  }
  return vnode
}
```
在上面代码中，当`oldVnode`和`vnode`为同一节点(即`sameVnode`)时才会进行`patchVnode`过程，否则就直接创建新的`DOM`，移除旧的`DOM`。

###  3.3、patchVnode函数
```js
function patchVnode (oldVnode, vnode) {
  const el = vnode.el = oldVnode.el
  let i, oldCh = oldVnode.children, ch = vnode.children
  if (oldVnode === vnode) return
  if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
    api.setTextContent(el, vnode.text)
  }else {
    updateEle(el, vnode, oldVnode)
    if (oldCh && ch && oldCh !== ch) {
      updateChildren(el, oldCh, ch)
    }else if (ch){
      createEle(vnode) //create el's children dom
    }else if (oldCh){
      api.removeChildren(el)
    }
  }
}
```
节点的比较有5种情况:
- `if (oldVnode === vnode)`两个VNode节点相同则直接返回。
- `if(oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text)`，文本节点的比较，需要修改，则会调用`Node.textContent = vnode.text`。
- `if( oldCh && ch && oldCh !== ch )`, 两个节点都有子节点，而且它们不一样，这样我们会调用`updateChildren`函数比较子节点，这是diff的核心。
- `else if (ch)`，只有新的节点有子节点，调用`createEle(vnode)`，`vnode.el`已经引用了老的dom节点，`createEle`函数会在老`dom`节点上添加子节点。
- `else if (oldCh)`，新节点没有子节点，老节点有子节点，直接删除老节点。

### 3.4、updateChildren函数
```js
function updateChildren (parentElm, oldCh, newCh) {
  let oldStartIdx = 0, newStartIdx = 0
  let oldEndIdx = oldCh.length - 1
  let oldStartVnode = oldCh[0]
  let oldEndVnode = oldCh[oldEndIdx]
  let newEndIdx = newCh.length - 1
  let newStartVnode = newCh[0]
  let newEndVnode = newCh[newEndIdx]
  let oldKeyToIdx
  let idxInOld
  let elmToMove
  let before
  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    if (oldStartVnode == null) {   //对于vnode.key的比较，会把oldVnode = null
        oldStartVnode = oldCh[++oldStartIdx] 
    }else if (oldEndVnode == null) {
        oldEndVnode = oldCh[--oldEndIdx]
    }else if (newStartVnode == null) {
        newStartVnode = newCh[++newStartIdx]
    }else if (newEndVnode == null) {
        newEndVnode = newCh[--newEndIdx]
    }else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode)
        oldStartVnode = oldCh[++oldStartIdx]
        newStartVnode = newCh[++newStartIdx]
    }else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
    }else if (sameVnode(oldStartVnode, newEndVnode)) {
        patchVnode(oldStartVnode, newEndVnode)
        api.insertBefore(parentElm, oldStartVnode.el, api.nextSibling(oldEndVnode.el))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
    }else if (sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode)
        api.insertBefore(parentElm, oldEndVnode.el, oldStartVnode.el)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
    }else {
        // 使用key时的比较
        if (oldKeyToIdx === undefined) {
            oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx) // 有key生成index表
        }
        idxInOld = oldKeyToIdx[newStartVnode.key]
        if (!idxInOld) {
            api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
            newStartVnode = newCh[++newStartIdx]
        }
        else {
            elmToMove = oldCh[idxInOld]
            if (elmToMove.sel !== newStartVnode.sel) {
                api.insertBefore(parentElm, createEle(newStartVnode).el, oldStartVnode.el)
            }else {
                patchVnode(elmToMove, newStartVnode)
                oldCh[idxInOld] = null
                api.insertBefore(parentElm, elmToMove.el, oldStartVnode.el)
            }
            newStartVnode = newCh[++newStartIdx]
        }
    }
  }
  if (oldStartIdx > oldEndIdx) {
      before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].el
      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx)
  }else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx)
  }
}
```