# vue面试题汇总
## 1、谈谈你对MVVM的理解？
MVVM模式（Model-View-ViewModel）是一种将数据模型（Model）、视图（View）和ViewModel分离开来的设计模式，旨在使开发者能够更轻松地创建响应式应用程序。它提供了一种把可重用的UI逻辑从业务逻辑中分离出来的方法，并允许开发人员更快地进行增强和修改。MVVM 是一种设计思想。
- Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；
- View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来;
- ViewModel 是一个同步 View 和 Model 的对象（桥梁）;


## 2、谈谈你对Vue中响应式数据的理解？Vue3响应式原理是？Vue2响应式原理？
::: tip 响应式数据的理解
响应式数据就是当数据发生改变时，UI页面做出响应。Vue 的响应式，是指当数据改变后，Vue 会通知到使用该数据的代码；例如: 视图渲染中使用了数据，数据改变后，视图也会自动更新。
:::

::: tip Vue3响应式原理
- 通过`Proxy（代理）`： 拦截对象中任意属性的变化，包括：属性值的读写，属性的增加，属性的删除等。
- 通过`Reffect（反射）`： 对源对象的属性进行操作
```js
new Proxy(data,{
  //拦截读取属性值
  get(target, prop){
    return Reflect.get(target, prop)
  },
  //拦截设置属性值或添加新属性
  set(target, prop, value){
    return Reflect.set(target, prop, value)
  },
  //拦截删除属性
  deleteProperty(target, prop){
    return Reflect.deleteProperty(target, prop)
  }
})
```
:::

::: tip Vue2响应式原理
- 通过`Object.defineProperty`遍历对象的每一个属性，把每一个属性变成一个`getter`和`setter`函数，读取属性的时候调用`getter`，给属性赋值的时候就会调用`setter`.
- 当运行`render`函数的时候，发现用到了响应式数据，这时候就会运行`getter`函数，然后`watcher（发布订阅）`就会记录下来。当响应式数据发生变化的时候，就会调用`setter`函数，`watcher`就会再记录下来这次的变化，然后通知`render`函数，数据发生了变化，然后就会重新运行`render`函数，重新生成虚拟`dom`树。
:::

### ❓Vue3响应式数据实现

### ❓Vue2响应式数据实现
```js

```


## 3、Vue中如何检测数组的变化?
数组可以用`defineProperty`进行监听。但是考虑性能原因，不能数组一百万项每一项都循环监听（那样性能太差了）。所以没有使用`Ojbect.defineProperty`对数组每一项进行拦截，而是选择**劫持数组原型上的个别方法并重写**。

具体重写的有：
> `push`、`pop`、`shift`、`unshift`、`sort`、`reverse`、`splice`

::: warning vue中修改数组的注意事项
- 在Vue中修改数组的索引和长度，是无法被监控到并做响应式视图更新的。需要通过以上7种变异方法修改数组才会触发数组对应`watcher`进行更新。
- 数组中如果是对象数据类型的也会进行递归劫持。 
- 如果情节需要，通过索引来修改数组里的内容。可以通过`Vue.$set()`方法来进行处理，或者使用`splice`方法实现。（其实`$set`内部的核心也是`splice`方法）
:::

::: warning 注意
不是直接粗暴重写了`Array.prototype`上的`push`等方法，而是通过原型链继承与函数劫持进行的移花接木。并且只监听调用了`defineReactive`函数时传进来的数组。
:::
::: tip 实现思路
以`push`为例，而是利用`Object.create(Array.prototype)`生成新的数组对象，该对象的`__proto__`指向`Array.prototype`。并在对象身上创建`push`等函数，利用「函数劫持」，在函数内部`Array.prototype.push.call`调用原有`push`方法，并执行自己劫持的代码(如视图更新)。最后将需要绑定的数组的`__proto__`由指向`Array.prototype`改向指成拥有重写方法的新数组对象。具体看下边源码仿写，真实`Array.prototype`里的祖宗级别`push`等方法没有动。
:::

### 手写实现
```js
const state = [1, 2, 4] // 待监听的数组
const contentEl = document.querySelector('.array-content')
const btnEl = document.querySelector('#btn')

// 渲染函数
function render () {
  contentEl.innerHTML = state
}
render() // 首次需要渲染

// 获取数组的原型对象，即是获取原型链上绑定的push、pop等函数
const originalArray = Array.prototype
// 创建一个对象作为拦截器
let arrayMethods = Object.create(originalArray)

// 劫持数组
function defineReactive (obj) {
  // 函数劫持: 改写这个新对象身上的push、splice等数组方法
  obj.push = function (...args) {
    // 还是调用原生的push方法
    originalArray.push.apply(this, args) // 或者用call(this, ...args)
    // 视图更新
    render()
  }
  // 将需要绑定的数组的原型链 __proto__ 指向重写方法的新数组对象
  obj.__proto__ = arrayMethods
}
defineReactive(state) // 劫持数组对象

// 更改数据，观察dom修改
btnEl.addEventListener('click', () => {
  state.push(Math.round(Math.random() * 10 + 1))
})
```


## 4、❓Vue中如何进行依赖收集的?
所谓依赖就是`Wather`，视图中谁用到了这个响应式数据就更新谁，换句话说: 
> 我们把“谁用到了这个响应式数据”称为“谁依赖了这个响应式数据”，我们给每个数据都建一个依赖数组(因为一个数据可能被多处使用)，谁依赖了这个数据(即谁用到了这个数据)我们就把谁放入这个依赖数组中，那么当这个数据发生变化的时候，我们就去它对应的依赖数组中，把每个依赖都通知一遍，告诉他们："你们依赖的数据变啦，你们该更新啦！"。这个过程就是**依赖收集**。
::: tip 1、何时收集依赖？何时通知依赖更新？
在可观测的数据获取时会触发`getter`属性，那么我们就可以在`getter`收集这个依赖，同样，当这个数据发生变化时会触发`setter`属性，那么我们就可以在`setter`中通知依赖更新视图等操作。

**在getter中收集依赖，在setter中通知依赖更新。先收集依赖，即把用到该数据的地方收集起来，然后等属性发生变化时，把之前收集好的依赖循环触发一遍就行了。**
:::

::: tip 2、把依赖收集到哪里？
在前面我们说到会给每个数据都建一个依赖数组，谁依赖了这个数据我们就把谁放入这个依赖数组中。单单用一个数组来存放依赖的话，功能好像有点欠缺并且代码过于耦合。我们应该将依赖数组的功能扩展一下，更好的做法是我们应该为每一个数据都建立一个依赖管理器，把这个数据所有的依赖都管理起来。即下面代码中的**依赖管理器Dep类**
```js
export default class Dep {
  constructor () {
    // 依赖数组
    this.subs = []
  }
  // 添加一个依赖
  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    const subs = this.subs
    if (subs.length) {
      const index = subs.findIndex(el => el === sub)
      if (index > -1) {
        subs.splice(index, 1)
      }
    }
  }
  // 通知所有依赖更新
  notify () {
    const subs = this.subs
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}
```
:::



## 5、❓如何理解Vue中的模板编译原理?


## 6、❓Vue生命周期钩子是如何实现的?


## 7、Vue组件生命周期有哪些？vue2和vue3的生命周期对比？
### Vue2生命周期
vue生命周期分为8个阶段，即分别:
- 创建前: `beforeCreate`
  > 表示实例完全被创建出来之前，vue实例的挂载元素`$el`和数据对象`data`都为`undefined`，还未初始化。初始化一些默认的声明周期函数和默认的事件，`data`和`methods`中的数据都没初始化。
- 创建后: `created`
  > 数据对象`data`已存在，可以调用`methods`中的方法，操作`data`中的数据，但`dom`未生成，`$el`未存在。
- 载入前: `beforeMount`
  > vue实例的`$el`和`data`都已初始化，挂载之前为虚拟的`dom`节点，模板已经在内存中编辑完成了，但是尚未把模板渲染到页面中。
- 载入后: `mounted`
  > vue实例挂载完成，`data.message`成功渲染。内存中的模板，已经真实的挂载到了页面中，用户已经可以看到渲染好的页面了。实例创建期间的最后一个生命周期函数，当执行完`mounted`就表示，实例已经被完全创建好了，DOM渲染在`mounted`中就已经完成了。
- 更新前: `beforeUpdate`
  > 当`data`变化时，会触发`beforeUpdate`方法。`data`数据尚未和最新的数据保持同步。
- 更新后: `updated`
  > 当`data`变化时，会触发`updated`方法。页面和`data`数据已经保持同步了。
- 销毁前: `beforeDestroy`
  > 组件销毁之前调用，在这一步，实例仍然完全可用。
- 销毁后: `destroyed`
  > 组件销毁之后调用，对`data`的改变不会再触发周期函数，vue实例已解除事件监听和`dom`绑定，但`dom`结构依然存在。

### Vue3生命周期
vue2中的`beforecreate`和`created`生命周期钩子已经被`setup`方法取代，除此之外vue3还有9个生命周期钩子:
- `onBeforeMount`: 在组件被挂载之前被调用
  > 当这个钩子被调用时，组件已经完成了其响应式状态的设置，但还没有创建 DOM 节点，它即将首次执行 DOM渲染过程(即首次调用`redner`函数)。
- `onMounted`: 在组件挂载完成后执行
  > 这个钩子通常用于执行需要访问组件所渲染的 DOM 树。
- `onBeforeUpdate`: 在组件即将因为响应式状态变更而更新其 DOM 树之前调用
  > 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。
- `onUpdated`: 在组件因为响应式状态变更而更新其 DOM 树之后调用
  > 会在组件的任意 DOM 更新后被调用，这些更新可能是由不同的状态变更导致的。如果你需要在某个特定的状态更改后访问更新后的 DOM，请使用 `nextTick()`作为替代。
- `onBeforeUnmount`: 在组件实例被卸载之前调用
  > 当这个钩子被调用时，组件实例依然还保有全部的功能。
- `onUnmounted`: 在组件实例被卸载之后调用
  > 可以在这个钩子中手动清理一些副作用，例如计时器、DOM 事件监听器或者与服务器的连接。
- `onActivated`: 组件实例是`<KeepAlive>`缓存树的一部分，当组件被插入到 DOM 中时调用
  > 被`keep-alive`缓存的组件激活时调用。
- `onDeactivated`: 若组件实例是`<KeepAlive>`缓存树的一部分，当组件从 DOM 中被移除时调用
  > 被`keep-alive`缓存的组件停用时调用。
- `onErrorCaptured`: 在捕获了后代组件传递的错误时调用
  > 当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回`false`以阻止该错误继续向上传播。

使用示例:
```js
import { onMounted } from 'vue'
export default {
  setup () {
  onMounted(() => {
    console.log('mounted in the composition api!')
  })
  }
}
```



## 8、Vue.mixin的使用场景和原理?
`mixin(混入)`，提供了一种非常灵活的方式，来分发`Vue`组件中的可复用功能。
> 本质其实就是一个js对象，它可以包含我们组件中任意功能选项，如`data、components、methods、created、computed`等等，当组件初始化的时候，会调用`mergeOptions`方法进行合并，采用策略模式针对不同的属性进行合并。如果混入的数据和本身组件的数据有冲突，采用本身的数据为准。

**使用场景**
> 在日常的开发中，我们经常会遇到在不同的组件中经常会需要用到一些相同或者相似的代码，这些代码的功能相对独立。这时，可以通过Vue的`mixin`功能将相同或者相似的代码提出来。例如：两个组件都在使用`websocket`连接。


## 9、Vue的组件data为什么必须是一个函数?
为了保证组件的独立性和可复用性，如果`data`是个函数的话，每复用一次组件就会返回新的`data`，类似于给每个组件实例创建一个私有的数据空间，保护各自的数据互不影响。
- 如果组件`data`是一个对象，对象属于引用类型，两个组件中设置的`data`都会指向同一个内存地址，会造成互相污染，产生副作用。
- 但是组件`data`是一个函数，组件实例化的时候这个函数将会被调用，返回一个对象，计算机会给这个对象分配一个内存地址，实例化几次就分配几个内存地址，他们的地址都不一样，所以每个组件中的数据不会相互干扰，改变其中一个组件的状态，其它组件不变。
```js
var parent = {
  name: '张三',
  age: 40
}
var child = parent
child.name = '涨小三'
child.age = 18
console.log(parent) // {name: "涨小三", age: 18}
console.log(child) // {name: "涨小三", age: 18}
```


## 10、❓请说明nextTick的原理？


## 11、computed、watch和methods的区别是什么?
`watch`是监听数据，`computed`是计算属性，`methods`是方法。
- `computed`属性的结果会被缓存，除非依赖的响应式属性变化才会重新计算。主要当作属性来使用；
- `methods`方法表示一个具体的操作，主要书写业务逻辑；
- `watch`一个对象，键是需要观察的表达式，值是对应回调函数。主要用来监听某些特定数据的变化，从而进行某些具体的业务逻辑操作；可以看作是 `computed`和`methods`的结合体；
  - `watch`适用于：需要在数据变化时执行异步或开销较大的操作时
- `computed`必定要有`return`值；`watch`没有`return`值。

::: tip 区别
- `computed`和`methods`相比，最大区别是`computed`有缓存，只在相关响应式依赖发生改变时它们才会重新求值，意味着`computed`依赖的属性没有变化，那么多次访问`computed`属性就不会重新计算；`methods`则是看到一次计算一次。
- `watch`和`computed`相比，`computed`是计算出一个属性，而`watch`则可能是做别的事情，如上报数据。
:::

## 12、❓Vue.set方法是如何实现的?


## 13、Vue为什么要用虚拟Dom？
::: tip 什么是虚拟 DOM？
Virtual DOM理解为一个简单的JS对象，包含`tag`(标签名)、`props | attrs`(属性)、`children`(子元素对象)三个属性。
:::
起初我们在使用`原生js/jquery`时，不可避免的会大量操作DOM，而DOM的变化又会引发回流和重绘，从而降低页面渲染性能。而虚拟DOM的主要目的就是为了减少频繁操作DOM而引起回流重绘所引发的性能问题。

虚拟DOM(Virtual DOM)，起始本质就是一个js对象，当数据发生变化时，我们不直接操作真实DOM，因为很昂贵，我们去操作这个js对象，就不会触发大量回流重绘操作，再加上diff算法，可以找到两个虚拟DOM之间改变的部分，从而最小量的去一次性更新真实DOM，而不是频繁操作DOM，性能得到了大大的提升。

具备跨平台优势，由于Virtual DOM 是以JavaScript对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node等。


## 14、❓Vue的diff算法原理是什么?如何实现？
::: tip 为什么要用Diff算法
由于在浏览器中操作DOM是很昂贵的，频繁的操作DOM，会产生一定的性能问题，这就是虚拟DOM的产生原因。虚拟DOM本质上是JavaScript对象，是对真实DOM的抽象状态变更时，记录新树与旧树的差异，最后把差异更新到真正的DOM中。

即使使用了Virtual DOM来进行真实DOM的渲染，在页面更新的时候，也不能全量地将整颗Virtual DOM进行渲染，而是去渲染改变的部分，这时候就需要一个计算Virtual DOM树改变部分的算法了，这个算法就是Diff算法。

diff算法的作用：用来修改DOM的一小段，不会引起dom树的重绘
:::


## 15、既然vue通过数据劫持可以精准的探测数据变化，为什么还要进行diff检测差异?
响应式数据变化，Vue确实可以在数据发生变化时，响应式系统可以立刻得知。但是如果给每个属性都添加`watcher`用于更新的话，绑定细粒度过高，会产生大量的`watcher`，则会造成过大的内存和依赖追踪的开销，从而降低性能。而细粒度过低会造成无法侦测到变化，则导致更新不精准的问题。

所以vue采用了中等细粒度的方案(`watcher` + `diff`)来检测差异，只针对组件级别的进行响应式监听，这样知道哪个组件发生了变化，再对组件进行`diff`算法找到具体变化的位置。这里可以在讲一下`diff`的原理。


## 16、❓请说明key的作用和原理
::: tip 作用
key就是一个标识，主要是被用在虚拟DOM算法中，在新旧`nodes`对比时辨识`VNodes`，相当于唯一标识ID，不会出现在真实DOM中。
:::
::: tip 原理
https://blog.csdn.net/cun_king/article/details/120714227
:::


## 17、谈谈对组件的理解
组件系统是Vue的另一个重要概念，因为它是一个抽象，允许我们使用小型、独立和通常可复用的组件构建大型应用。几乎任何类型的应用界面都可以抽象为一个组件树。

组件就是对局部视图的封装，每个组件包含了
- HTML结构`template`
- CSS样式`style`
- JavaScript行为（`script`，`data数据`、`methods行为`）
  - 常用组件技术：属性prop、自定义事件、插槽，它们主要用于组件通信、扩展等。

组件化开发能大幅提高了开发效率、代码的复用性、增强可维护性，更好的去解决软件上的高耦合、低内聚、无重用的三大代码问题。

特点：
- 可重用性: 每个组件都是具有独立功能的，它可以被使用在多个ui场景
- 可维护性: 每个小的组件仅仅包含自己的逻辑，更容易被理解和维护
- 可测试性: 每个组件都是独立的，那么可以对各个组件单独进行测试
- 降低更新范围，值重新渲染变化的组件
- 高内聚、低耦合、单向数据流


## 18、❓请描述vue组件的渲染流程
渲染组件时，会通过`Vue.extend`方法创建子组件的构造函数，并且进行实例化。最后手动调用了`$mount()`进行挂载，更新组件时会进行`patchVnode`流程，核心就是`diff`算法。


## 19、❓请描述vue组件的更新流程


## 20、❓异步组件原理


## 21、❓函数组件的优势和原理


## 22、组件的传值方式有哪些？Vue组件之间通信方式有哪些？
组件之间的通信种类: 
- `props/$emit`
- `vuex/pinia`
- `ref && $refs`
- `eventBus`(事件总线)
- `$attrs/$listeners`
- `provide/inject`
- `$parent/$children`
- `localStorage、sessionStorage、Cookies`
- `slot`插槽

常见使用场景可以分为三类：
- **父子通信**
  - 父向子传递数据是通过`props`，子向父是通过`events（$emit）`；
  - 通过父链/子链也可以通信（`$parent/$children`）；
  - `ref和$refs`也可以访问组件实例；
  - `provide/inject`API；
  - `$attrs/$listeners`；
  - `slot`插槽；
  ```html
  Child.vue:
  <template>
    <div>
      <slot :user="user"></slot>
    </div>
  </template>
  <script>
  export default{
    data(){
      return {
      user:{ name:"oldCode" }
      }
    }
  }
  </script>
  
  Parent.vue:
  <template>
    <div>
      <child v-slot="slotProps">
        {{ slotProps.user.name }}
      </child>
    </div>
  </template>
  ```
- **兄弟通信**
  - `eventBus`；
  - `Vuex`；
- **跨级通信**
  - `eventBus`；
  - `Vuex`；
  - `provide/inject`API；
  - `$attrs/$listeners`；


## 23、$attrs/$listeners是为了解决什么问题出现的?
- `$attrs`是一个内置属性，指父组件传递的、除了自己定义的`props`属性、`class`和`style`之外的所有属性，一般用在子组件的子元素上。
- `$listeners`是一个内置属性，它是一个对象，里面包含了作用在这个组件上的所有监听器，你就可以配合`v-on="$listeners"`将所有的事件监听器指向这个组件的某个特定的子元素。（相当于子组件继承父组件的事件）。
- `inheritAttrs`，默认值`true`，默认情况下父作用域的不被认作`props`的`attribute`绑定，将会“回退”且作为普通的`HTML attribute`应用在子组件的根元素上。简单来说默认情况下，父组件通过`props`传递给子组件的属性，如果在子组件中没有使用`props`绑定，那么默认会绑定在`HTML`元素上。

::: tip `$attrs`演示
例子：A 组件引用`B`组件，并为其绑定了三个属性`foo`、`bar`、`baz`
```html
<template>
  <div>
    <h1>A组件</h1>
    <com-b :foo="foo" :bar="bar" :baz="baz"></com-b>
  </div>
</template>
<script lang="ts">
import ComB from './ComB.vue'
export default {
  components: {
    ComB
  },
  data () {
    return {
      foo: 'foo',
      bar: 'bar',
      baz: 'baz'
    }
  }
}
</script>
```
B组件中定义的属性为`props: ['foo', 'bar']`那么在`B`组件中打印`$attrs`，就是除了`props`之外的属性`baz`。此时，`B`又引用了组件`C`并向其传递了一个属性`qux`：
```html
<template>
  <div>
    <h2>B组件</h2>
    <div>foo: {{ foo }}</div>
    <div>bar: {{ bar }}</div>
    <com-c :qux="'qux'" v-bind="$attrs"></com-c>
  </div>
</template>
<script lang="ts">
import ComC from './ComC.vue'
export default {
  components: {
    ComC
  },
  props: {
    foo: String,
    bar: String
  },
  created () {
    console.log(this.$attrs) // {baz: 'baz'}
  }
}
</script>
```
而`C`组件中定义了`props: ['baz', 'qux']`，此时在 C 组件中打印的`$attrs`是空的。
```html
<template>
  <div>
    <h3>C组件</h3>
    <div>qux: {{ qux }}</div>
    <div>baz: {{ baz }}</div>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    qux: String,
    baz: String
  },
  created () {
    console.log(this.$attrs) // {}
  }
}
</script>
```
:::

::: tip `inheritAttrs`演示
例子: `A`组件中引入`B`组件并传入`foo`、`bar`、`demo`属性
```html
<template>
  <div>
    <h1>A组件</h1>
    <com-b :foo="'foo'" :bar="'bar'" :demo="'demo'"></com-b>
  </div>
</template>
<script lang="ts">
import ComB from './ComB.vue'
export default {
  components: {
    ComB
  }
}
</script>
```
在`B`组件在`props`中只绑定了`foo`、`bar`两个prop，并且使用默认的`inheritAttrs: true`
```html
<template>
  <div>
    <h2>B组件</h2>
  </div>
</template>
<script lang="ts">
export default {
  inheritAttrs: true,
  props: {
    foo: String,
    bar: String
  }
}
</script>
```
运行程序看`html`资源树结构如下:
![202303081530484.png](http://img.itchenliang.club/img/202303081530484.png)
将`B`组件中的`inheritAttrs: true`，改成`inheritAttrs: false`，重新查看`HTML`资源目录树结构如下:
![202303081532074.png](http://img.itchenliang.club/img/202303081532074.png)
:::

::: tip `$listeners`演示
例子：`A`组件引用`B`组件，并为其绑定了两个事件`method1`、`method1`
```html
<template>
  <div>
    <h1>A组件</h1>
    <com-b @method1="handleMethod1" @method2="handleMethod2"></com-b>
  </div>
</template>
<script lang="ts">
import ComB from './ComB.vue'
export default {
  components: {
    ComB
  },
  methods: {
    handleMethod1 (target) {
      console.log('method1 running: ', target)
    },
    handleMethod2 (target) {
      console.log('method2 running: ', target)
    }
  }
}
</script>
```
`B`中定义了一个`button`并绑定点击事件触发`this.$emit('method1', 'b组件')`，同时`B`组件又引用了组件`C`并向其传递了`v-on="$listeners"`：
```html
<template>
  <div>
    <h2>B组件</h2>
    <button @click="handleClick">点击触发method1</button>
    <com-c v-on="$listeners"></com-c>
  </div>
</template>
<script lang="ts">
import ComC from './ComC.vue'
export default {
  components: {
    ComC
  },
  created () {
    console.log('B: ', this.$listeners) // {method1: ƒ, method2: ƒ}
  },
  methods: {
    handleClick () {
      this.$emit('method1', 'b组件')
    }
  }
}
</script>
```
而`C`组件中也定义了`button`并绑定点击事件触发`this.$emit('method2', 'c组件')`。
```html
<template>
  <div>
    <h3>C组件</h3>
    <button @click="handleClick">点击触发method2</button>
  </div>
</template>
<script lang="ts">
export default {
  created () {
    console.log('C: ', this.$listeners) // {method1: ƒ, method2: ƒ}
  },
  methods: {
    handleClick () {
      this.$emit('method2', 'c组件')
    }
  }
}
</script>
```
运行程序可以看到控制台输出结果如下:
```
B:  {method1: ƒ, method2: ƒ}
C:  {method1: ƒ, method2: ƒ}

点击B组件中的 "点击触发method1" 按钮，控制台输出: 
method1 running:  b组件

然后再点击C组件中的 "点击触发method2" 按钮，控制台输出:
method2 running:  c组件
```
:::

## 24、v-for和v-if哪个优先级更高?
- Vue2中，`v-for`的优先级高于`v-if`；
- Vue3中，`v-if`的优先级高于`v-for`；
注意: **永远不要把`v-if`和`v-for`同时用在同一个元素上**。


## 25、❓v-model是如何实现的?


## 26、Vue的普通Slot以及作用域Slot的区别
- **普通插槽**: 就是放在子组件的一个占位
  ```html
  <!-- 子组件 -->
  <template>
    <div>
      <p>子组件</p>
      <!-- 普通插槽占位 -->
      <slot></slot>
    </div>
  </template>
  <!-- 父组件 -->
  <template>
    <div>
      <p>父组件</p>
      <com-child>我是插槽占位填充内容</com-child>
    </div>
  </template>
  ```
  ![202303081614585.png](http://img.itchenliang.club/img/202303081614585.png)
- **作用域插槽**: 作用域插槽可以拿到子组件里面的属性。在子组件中传入属性然后渲染。简单来说在父组件能够在插槽中访问到子组件的数据。
  ```html
  <!-- 子组件 -->
  <template>
    <div>
      <p>子组件</p>
      <slot v-bind:user="{ name: '张三', age: 23 }"></slot>
    </div>
  </template>

  <!-- 父组件 -->
  <template>
    <div>
      <p>父组件</p>
      <com-b>
        <template v-slot="slotProps">
          我是叫{{ slotProps.user.name }}，今年{{ slotProps.user.age }}岁
        </template>
      </com-b>
    </div>
  </template>
  ```
  ![202303081619388.png](http://img.itchenliang.club/img/202303081619388.png)
- **具名插槽**: 有时我们需要多个插槽，对于这样的情况，`<slot>`元素有一个特殊的`attribute：name`，不带`name`的`<slot>`出口带有隐含的名字`default`。
  ```html
  <!-- 子组件 -->
  <template>
    <div>
      <p>子组件</p>
      <slot name="title"></slot>
      <slot name="author" v-bind="{ name: '张三' }"></slot>
      <slot></slot>
      <slot></slot>
      <slot name="content"></slot>
      <slot :name="slotName"></slot>
      <slot name="meta" v-bind="{ tags: ['vue', 'vite'], type: 'web前端学习' }"></slot>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        slotName: 'time'
      }
    }  
  }
  </script>

  <!-- 父组件 -->
  <template>
    <div>
      <p>父组件</p>
      <com-b>
        <!-- 具名插槽 -->
        <template v-slot:title>
          <h1>标题</h1>
        </template>

        <!-- 具名插槽 + 作用域插槽 -->
        <template v-slot:author="data">
          <p>作者：{{ data.name }}</p>
        </template>

        <!-- 具名插槽的缩写 -->
        <template #content>
          <article>我是内容...</article>
        </template>

        <!-- 独占插槽的简写: default插槽可以省略名称 -->
        <template v-slot>
          <p>我是默认区域</p>
        </template>

        <!-- 动态插槽名 -->
        <template v-slot:[slotName]>
          <p>时间: 2022-08-19</p>
        </template>

        <!-- 插槽解构 -->
        <template v-slot:meta="{ tags, type }">
          <p>分类: {{ type }}, 标签: {{ tags }}</p>
        </template>
      </com-b>
    </div>
  </template>
  <script lang="ts">
  import ComB from './ComB.vue'
  export default {
    components: {
      ComB
    },
    data () {
      return {
        slotName: 'time'
      }
    }
  }
  </script>
  ```
  ![2023030816341910.png](http://img.itchenliang.club/img/2023030816341910.png)


## 27、❓Vue.use是干什么的？原理是什么？
`Vue.use()`用于安装`Vue.js`插件。
> 注意: **当`install`方法被同一个插件多次调用，插件将只会被安装一次**。
::: tip 开发插件
插件有如下两个方式开发。
- 如果插件是一个对象，必须提供`install`方法。
  ```js
  /**
   * 开发插件
    */
  export default {
    install: function (Vue, options) {
      Vue.prototype.$plugin1 = 'plugin1'
      console.log(options) // {name: '张三', age: 23}
    }
  }
  /**
   * 使用插件
    */
  import plugin1 from './plugin'
  Vue.use(plugin1, {
    name: '张三',
    age: 23
  })
  Vue.use(plugin1, {
    name: '张三',
    age: 23
  })
  console.log(Vue.prototype.$plugin1) // plugin1
  ```
  从上面代码中可以看到，我们注册了两次plugin1插件，但是控制台只有一次输出`{name: '张三', age: 23}`
- 如果插件是一个函数，它会被作为`install`方法。`install`方法调用时，会将 Vue 作为参数传入。
  ```js
  /**
   * 开发插件
    */
  function install (Vue, options) {
    Vue.prototype.$plugin2 = 'plugin2'
  }
  export default install

  /**
   * 使用插件
    */
  import plugin2 from './plugin'
  Vue.use(plugin2)
  console.log(Vue.prototype.$plugin2) // plugin2
  ```
:::

::: tip `Vue.use()`原理
:::


## 28、组件写name有啥好处？路由name的作用？
::: tip 组件name作用
1. 可以通过`name`找到对应的组件，在组件做自身递归调用时使用，如 tree-item；
2. 可以通过`name`属性实现缓存功能，`keep-alive`依赖`name`做缓存；
3. 可以通过`name`来识别组件（跨级组件通信时非常重要）;
4. 可以通过`name`在vue-devtools调试工具里显示组件名称，方便快速找到对应组件；
:::
::: tip 路由name作用
```js

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/text',
      name: 'text',
      component: text
    }, {
      path: '/text/:id',
      name: 'textDetail',
      component: param
    }
  ]
})
```
1. 路由的`name`是路由对象中的一个配置选项
2. 通过`name`属性，为一个页面中不同的`router-view`渲染不同的组件,如：将`Hello`渲染在`name`为`Hello`的`router-view`中，将`text`渲染在`name`为`text`的`router-view`中。不设置`name`的将为默认的渲染组件。
  ```html
  <template>
    <div id="app">
      <!-- 默认的渲染组件 -->
      <router-view></router-view>
      <!-- 将渲染Hello组件 -->
      <router-view  name="Hello"></router-view>
      <!-- 将渲染text组件 -->
      <router-view  name="text"></router-view>
    </div>
  </template>
  ```
3. 路由跳转时，通过`params`形式传参时，必须传入`name`
  ```js
  router.push({
    name: 'textDetail',
    params: {
      id: 1
    }
  })
  ```
4. 在组件中可以使用`this.$router.name`获取组件在`routes`中定义的名称，方便做一些逻辑判断: 例如 是否显示footer栏
  ```js
  export default {
    watch: {
      '$router': {
        immediate: true,
        handler: (val, old) => {
          this.showFooter = val.name === 'Home'
        }
      }
    }
  }
  ```
:::


## 29、vue的修饰符有哪些?
**事件修饰符**
- `.stop`: 阻止事件冒泡
- `.prevent`: 阻止事件默认行为
- `.once`: 点击事件只会触发一次
- `.native`: 在自定义组件上使用，使其当做原生HTML标签看待
- `.self`: 只当在`event.target`是当前元素自身时触发处理函数，即事件不是从内部元素触发的
- `.capture`: 添加事件监听器时使用事件捕获模式，即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
- `.exact`:  修饰符允许你控制由精确的系统修饰符组合触发的事件。
```html
<a v-on:click.stop="doThis"></a>

<!-- 随便按那个键 + 鼠标点击都会触发 -->
<button v-on:click.ctrl="onClick">A</button>
<!-- 只有按ctrl键 + 鼠标点击才会触发 -->
<button v-on:click.ctrl.exact="onClick">A</button>
```

**按键修饰符**
> 在监听键盘事件时，添加按键修饰符，通常用于`keydown`和`keyup`事件
- 按键码: 在键盘事件后面添加`.xxx`，用于监听按了哪个键。常用按键码如下: 
  - `.enter`
  - `.tab`
  - `.delete`( (捕获“删除”和“退格”键))
  - `.esc`
  - `.up`
  - `.down`
  - `.space`等。
```html
<!-- 按enter键调用submit方法 -->
<input @keyup.enter="submit" />

<!-- 组合使用: Ctrl + C -->
<input v-on:keyup.alt.67="clear">
```

**表单修饰符|v-model修饰符**
- `.lazy`: 在表单输入时不会马上显示在页面，而是等输入完成失去焦点时才会显示；
- `.trim`: 过滤表单输入时首尾的空格；
- `.number`: 限制输入数字或将输入的数据转为数字

**鼠标按键修饰符**
> 限制处理函数仅响应特定的鼠标按钮。
- `.left`: 鼠标左键被点击；
- `.right`: 鼠标右键被点击；
- `.middle`: 鼠标中键被点击；
```html
<!-- 表示只有点击鼠标右键时才处理 onClick 函数，同时阻止浏览器右键的默认行为 -->
<button @click.right.prevent="onClick">点击我</button>
```


## 30、如何理解自定义指令?
我们日常使用的`v-for`、`v-if`、`v-model`等等都称为指令，这些是vue的内置指令，这些指定都是我们可以直接使用的。
::: tip 自定义指令
为了更好地满足开发需求，最大化的让开发者个性化开发，Vue暴露了自定义指令的API，让我们除了使用内置至另外，还可以开发自定义指令，定义好后和内置指令方式类似，例如我们开发一个`v-perms`指令，用于判断该用户是否有该按钮的操作权限。

注册自定义指令方式主要有两种:
- 全局自定义指令
  ```js
  // 注册一个全局自定义指令 `v-perms`
  Vue.directive('perms', {
    // 指令第一次绑定到元素时调用，只调用一次，可以进行一次性的初始化设置
    // el: 指令所绑定的元素，可以用来直接操作 DOM
    // binding: 一个对象，包含以下 property
    //   name：指令名，不包括 v- 前缀。
    //   value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
    //   oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
    //   arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
    //   expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
    //   modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
    // vnode：Vue 编译生成的虚拟节点
    // oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。
    bind: (el, binding, vnode, oldVnode) => {

    },
    // 被绑定元素插入父节点时调用
    inserted: (el, binding, vnode) => {
      // 表示拥有 字典新增、字典更新、资源查看 权限
      const perms = ['dict:add', 'dict:update', 'resource:detail']
      console.log(binding.arg)

      // 不在此权限中则不显示按钮
      if (!perms.includes(binding.value)) {
        el.parentNode.removeChild(el)
      }
    },
    // 所在组件的 VNode 更新时调用
    update: () => {

    },
    // 指令所在组件的 VNode 及其子 VNode 全部更新后调用
    componentUpdated: () => {

    },
    // 指令与元素解绑时调用，只调用一次
    unbind: () => {

    }
  })
  ```
  使用自定义指令
  ```html
  <button v-perms:dict="'dict:add'">字典新增</button>
  <button v-perms:dict="'dict:delete'">字典删除</button>
  <button v-perms:resource="'resource:detail'">资源查看</button>
  ```
  可以看到浏览器控制栏输出了`dict dict resource`，以及页面效果如下
  ![202303081756489.png](http://img.itchenliang.club/img/202303081756489.png)
  由于我们没有`dict:delete`权限，所以此时`字典删除`按钮就没有显示。
- 注册局部指令
  ```js
  directives: {
    perms: {
      // 指令的定义
      inserted: function (el) {
        // other code
      }
    }
  }
  ```
  - 动态指令参数: `v-mydirective:[argument]="value"`，`argument`参数可以根据组件实例数据进行更新！
  ```js
  Vue.directive('pin', {
    bind: function (el, binding, vnode) {
      el.style.position = 'fixed'
      var s = (binding.arg === 'left' ? 'left' : 'top')
      el.style[s] = binding.value + 'px'
    }
  })
  ```
  使用
  ```html
  <template>
    <div v-pin:[direction]="200"></div>
  </template>
  <script>
    export default {
      data () {
        return {
          direction: 'left'
        }
      }
    }
  </script>
  ```
:::


## 31、==keep-alive平时在哪里使用？原理是什么？==


## 32、谈谈Vue的性能优化有哪些?


## 33、vue中使用了哪些设计模式?
参考：https://baijiahao.baidu.com/s?id=1719835163199162055&wfr=spider&for=pc


## 34、Watch中的deep:true是如何实现的？


## 35、Vue3速度快的原因？Vue3 为何比 Vue2 快？
参考：https://blog.csdn.net/qq_38689395/article/details/122260297


## 36、什么是递归组件？举个例子说明下？


## 37、怎样理解 Vue 的单向数据流？


## 38、为什么不建议用index作为key?


## 39、怎么缓存当前的组件？缓存后怎么更新


## 40、Vue中组件和插件有什么区别？


## 41、Composition API 与 Options API 有什么不同？


## 42、为什么要使用异步组件？


## 43、子组件可以直接改变父组件的数据么，说明原因？


## 44、怎么监听vuex数据的变化？


## 45、vue3 自定义全局指令、局部指令？


## 46、Vue computed 实现？


## 47、Vue中diff算法原理？


## 48、动态给vue的data添加一个新的属性时会发生什么？怎样解决？


## 49、v-if和v-show区别？


## 50、从0到1自己构架一个vue项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织？


## 51、Vue2 的 Vue3 区别？
参考：https://www.cnblogs.com/guopeng27/p/16767478.html


## 52、Vue3带来了什么改变？Vue3带来了什么新特性？
参考：https://zhuanlan.zhihu.com/p/352910102
参考：https://developer.aliyun.com/article/921386


## 53、vue3响应式数据的判断？


## 54、vue3的常用 Composition API有哪些？


## 55、Composition API 实现代码逻辑复用？
https://blog.csdn.net/qq_38689395/article/details/122260297


## 56、Vue3 如何实现响应式？


## 57、v-model 参数用法？


## 58、watch 和 watchEffect 的区别？


## 59、setup 中如何获取组件实例？


## 60、如何理解ref、toRef和toRefs？
参考：https://wenku.baidu.com/aggs/0f64aceb19e8b8f67c1cb9e7.html?_wkts_=1676625074702&bdQuery=vue3%E9%9D%A2%E8%AF%95%E9%A2%98


## 61、Proxy 相比于 defineProperty 的优势
Object.defineProperty() 的问题主要有三个：
- 不能监听数组的变化
- 必须深层遍历嵌套的对象
- 必须遍历对象的每个属性

Proxy 在 ES2015 规范中被正式加入，它有以下几个特点：
- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势：
- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。


## 62、vue2为什么不使用proxy？
兼容性


## 63、vue3性能比vue2好的原因？
1. diff算法优化
2. 静态提升hoistStatic
3. 事件侦听器缓存 cacheHandles


## 64、Proxy响应式绑定
参考：https://wenku.baidu.com/view/af7334842b4ac850ad02de80d4d8d15abe230088.html?_wkts_=1676625340205&bdQuery=vue3%E9%9D%A2%E8%AF%95%E9%A2%98


## 65、ref响应式是怎样设计的？
监听了value 的改变 劫持value属性的setter gatter, 因此ref一般用在基本数据，或者引用数据的嵌套层级不深得数据上


## 66、relative也是响应式的设计 怎么设计的？
跟ref一样 但是底层采用的是ES6的Proxy代理了整个引用数据


## 67、什么是组合式API？
组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：
- 响应式 API：例如`ref()`和`reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。
- 生命周期钩子：例如`onMounted()`和`onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。
- 依赖注入：例如`provide()`和`inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

组合式 API 是 Vue 3 及 Vue 2.7 的内置功能。


## 68、hook代码写在哪里？
写在vue3.0的setup函数内部


## 69、vue3中的setup函数的理解？
- 1、setup语法返回的对象的成员可以在模板中使用，也可以在组件的api中使用，但是这个函数中不能使用组件api中的东西
- 2、setup函数中可以声明一些变量、函数 然后return出去给组件使用
- 3、setup函数内部的变量可以屈设计为响应式的变量 那么可以使用官方的hook
- 4、setup函数可以设计成scipt标签中写这个同名单词的属性，然后使整个标签环境都为setup标签环境


## 70、vue全家桶包含哪些？


## 71、v-model是什么？怎么使用？vue中标签怎么绑定事件？


## 72、v-model的实现原理？


## 73、请说出至少4种vue当中的指令和它的用法？


## 74、active-class是哪个组件的属性？
vue-router模块的router-link组件。


## 75、自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？
全局定义指令：在vue对象的directive方法里面有两个参数，一个是指令名称，另外一个是函数。组件内定义指令：directives<br>
钩子函数：bind（绑定事件触发）、inserted(节点插入的时候触发)、update（组件内相关更新）<br>
钩子函数参数：el、binding


## 76、vue-loader是什么？使用它的用途有哪些？
解析`.vue`文件的一个加载器，跟`template/js/style`转换成js模块。<br>
用途：js可以写`es6`、`style`样式可以`scss`或`less`、`template`可以加jade等


## 77、请说出vue.cli项目中src目录每个文件夹和文件的用法？
```
assets文件夹是放静态资源；
components是放组件；
router是定义路由相关的配置;
view视图；
app.vue是一个应用主组件；
main.js是入口文件
```


## 78、聊聊你对Vue.js的template编译的理解？ 
简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）


## 79、dom是在哪一个生命周期完成渲染的？
在 mounted 中就已经完成了


## 80、第一次页面加载会触发哪几个生命周期？
第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个生命周期。


## 81、vue生命周期的作用是什么？
它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。


## 82、如何解决vue修改数据不刷新页面这个问题？
第一种：this.set
第二种：给数组、对象赋新值 第三种：使用this.forceupdate强制刷新


## 83、为什么会出现vue修改数据后页面没有刷新这个问题？
受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。



## 84、v-if 与 v-for 一起使用
- 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。（注意这里是 2.x 的版本，3.x 反之）
- 不推荐同时使用 v-if 和 v-for。


## 85、vue.js 的两个核心是什么？
数据驱动、组件系统


## 86、Vue.js 双向绑定的原理


## 87、MVC和MVVM的区别
- MVC表示“模型-视图-控制器”，MVVM表示“模型-视图-视图模型”；
- MVVM是由MVC衍生出来的。MVC中，View会直接从Model中读取数据；
- MVVM各部分的通信是双向的，而MVC各部分通信是单向的；
- MVVM是真正将页面与数据逻辑分离放到js里去实现，而MVC里面未分离。


## 88、params和query的区别？


## 89、v-bind和v-model的区别， v-model原理知道吗？


## 90、Vue和React的区别是什么？


## 91、说说你对 SPA 单页面的理解，它的优缺点分别是什么？


## 92、Class 与 Style 如何动态绑定？


## 93、直接给一个数组项赋值，Vue 能检测到变化吗？


## 94、Vue 的父组件和子组件生命周期钩子函数执行顺序？


## 95、父组件可以监听到子组件的生命周期吗？


## 96、使用过 Vue SSR 吗？说说 SSR？


## 97、Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？


## 98、虚拟 DOM 的优缺点？


## 99、虚拟 DOM 实现原理？


## 100、vue 中的性能优化


## 101、什么是 Proxy？


## 102、为什么避免 v-if 和 v-for 用在一起


## 103、组件的设计原则


## 104、vue slot是做什么的?


## 105、对于 Vue 是一套渐进式框架的理解


## 106、v-on 可以监听多个方法吗？
肯定可以的。
```html
<input type="text" :value="name" @input="onInput" @focus="onFocus" @blur="onBlur" />
```


## 107、vue-cli 工程升级 vue 版本
在项目目录里运行 npm upgrade vue vue-template-compiler，不出意外的话，可以正常运行和 build。如果有任何问题，删除 node_modules 文件夹然后重新运行 npm i 即可。（简单的说就是升级 vue 和 vue-template-compiler 两个插件）


## 108、vue 事件中如何使用 event 对象？


## 109、$nextTick 的使用


## 110、vue 中子组件调用父组件的方法


## 111、vue 中父组件调用子组件的方法



## 112、如何监听键盘事件中的按键？


## 113、vue 更新数组时触发视图更新的方法


## 114、v-for 产生的列表，实现 active 的切换


## 115、十个常用的自定义过滤器


## 116、vue 弹窗后如何禁止滚动条滚动？


## 117、vue怎么实现页面的权限控制
利用 vue-router 的 beforeEach 事件，可以在跳转页面前判断用户的权限（利用 cookie 或 token），是否能够进入此页面，如果不能则提示错误或重定向到其他页面，在后台管理系统中这种场景经常能遇到。


## 118、vue 如何优化首屏加载速度？


## 119、vue 打包命令是什么？


## 120、vue 打包后会生成哪些文件？


## 121、如何配置 vue 打包生成文件的路径？


## 122、vue 开发命令 npm run dev 输入后的执行过程


## 123、vue.js 全局运行机制


## 124、如何编译 template 模板？


### 125、批量异步更新策略及 nextTick 原理？


## 126、vue 中如何实现 proxy 代理？


## 127、vue 中如何实现 tab 切换功能？


## 129、vue 中如何利用 keep-alive 标签实现某个组件缓存功能？


## 130、vue 中实现切换页面时为左滑出效果


## 131、vue 中央事件总线的使用


## 132、vue 的渲染机制


## 133、如何让 CSS 只在当前组件中起作用
将当前组件的 `<style>` 修改为 `<style scoped>`


## 134、指令 v-el 的作用是什么?
提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标, 可以是 CSS 选择器，也可以是一个 HTMLElement 实例


## 135、你们vue项目是打包了一个js文件，一个css文件，还是有多个文件？


## 136、vue遇到的坑，如何解决的？


## 137、递归组件的使用


## 138、vue-cli 工程常用的 npm 命令有哪些？


## 139、config 文件夹 下 index.js 的对于工程 开发环境 和 生产环境 的配置


## 140、请你详细介绍一些 package.json 里面的配置


## 141、vue-cli 中常用到的加载器


## 142、vue-cli 提供的几种脚手架模板
1. webpack-simple模板
2. webpack模板


## 143、vue-cli 开发环境使用全局常量


## 144、vue-cli 生产环境使用全局常量


## 145、vue-cli 中自定义指令的使用


## 146、vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法


## 147、vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？
vue 如何优化首页的加载速度？
- 路由懒加载
- ui框架按需加载
- gzip压缩

vue 首页白屏是什么问题引起的？
- 第一种，打包后文件引用路径不对，导致找不到文件报错白屏<br>
  解决办法：修改一下config下面的index.js中bulid模块导出的路径。因为index.html里边的内容都是通过script标签引入的，而你的路径不对，打开肯定是空白的。先看一下默认的路径。
- 第二种，由于把路由模式mode设置影响<br>
  解决方法：路由里边router/index.js路由配置里边默认模式是hash，如果你改成了history模式的话，打开也会是一片空白。所以改为hash或者直接把模式配置删除，让它默认的就行 。如果非要使用history模式的话，需要你在服务端加一个覆盖所有的情况的候选资源：如果URL匹配不到任何静态资源，则应该返回一个index.html，这个页面就是你app依赖页面。<br>
  所以只要删除mode或者把mode改成hash就OK了。
- 第三种，项目中使用了es6的语法，一些浏览器不支持es6，造成编译错误不能解析而造成白屏<br>
  安装`npm install --save-dev babel-preset-es2015`<br>
  安装`npm install --save-dev babel-preset-stage-3`<br>
  在项目根目录创建一个.babelrc文件 里面内容 最基本配置是：
  ```js
  {
    // 此项指明，转码的规则
    "presets": [
        // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
        ["env", {
            "modules": false
        }],
        // 下面这个是不同阶段出现的es语法，包含不同的转码插件
        "stage-2"
    ],
    // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
    // 下面指的是在生成的文件中，不产生注释
    "comments": false,
    // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
    "env": {
        // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
        "test": {
            "presets": ["env", "stage-2"],
            // instanbul是一个用来测试转码后代码的工具
            "plugins": ["istanbul"]
        }
    }
  }
  ```


## 148、在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的。


## 149、说说Vue的MVVM实现原理
1. Vue作为MVVM模式的实现库的2种技术
  - 模板解析
  - 数据绑定
2. 模板解析: 实现初始化显示
  - 解析大括号表达式
  - 解析指令
3. 数据绑定: 实现更新显示
  - 通过数据劫持实现

原理结构图
![202302201243274.png](http://img.itchenliang.club/img/202302201243274.png)


## 150、vue.use是干什么的？原理是什么？
`vue.use`是用来使用插件的，我们可以在插件中扩展全局组件、指令、原型方法等。
1. 检查插件是否注册，若已注册，则直接跳出；
2. 处理入参，将第一个参数之后的参数归集，并在首部塞入 this 上下文；
3. 执行注册方法，调用定义好的 install 方法，传入处理的参数，若没有 install 方法并且插件本身为 function 则直接进行注册；
  1. 插件不能重复的加载<br>
    install 方法的第一个参数是vue的构造函数，其他参数是Vue.set中除了第一个参数的其他参数； 代码：`args.unshift(this)`
  2. 调用插件的install 方法 代码：`typeof plugin.install === 'function'`
  3. 插件本身是一个函数，直接让函数执行。 代码：`plugin.apply(null, args)`
  4. 缓存插件。 代码：`installedPlugins.push(plugin)`


## 151、new Vue() 发生了什么？


## 152、vue3.x中Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？
判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。


## 153、vue3.x中监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？
我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。


## 154、vue2.x和Vue3.x渲染器的diff算法分别说一下


## 155、vue 中 mixin 和 mixins 区别？
- mixin: 用于全局混入，会影响到每个组件实例。
- mixins: 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并


## 156、使用 Object.defineProperty() 来进行数据劫持有什么缺点？
有一些对属性的操作，使用这种方法无法拦截，比如说通过下标方式修改数组数据或者给对象新增属性，vue 内部通过重写函数解决了这个问题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为这是 ES6 的语法。


## 157、什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？
我对 Virtual DOM 的理解是，首先对我们将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后我们将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。

当页面的状态发生改变，我们需要对页面的 DOM 的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。

最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。

我认为 Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少 DOM 操作带来的重流和重绘的影响。其实 Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。


## 158、如何比较两个 DOM 树的差异？
两个树的完全 diff 算法的时间复杂度为 O(n^3) ，但是在前端中，我们很少会跨层级的移动元素，所以我们只需要比较同一层级的元素进行比较，这样就可以将算法的时间复杂度降低为 O(n)。

算法首先会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个序号。在深度遍历的时候，每遍历到一个节点，我们就将这个节点和新的树中的节点进行比较，如果有差异，则将这个差异记录到一个对象中。

在对列表元素进行对比的时候，由于 TagName 是重复的，所以我们不能使用这个来对比。我们需要给每一个子节点加上一个 key，列表对比的时候使用 key 来进行比较，这样我们才能够复用老的 DOM 树上的节点。


## 159、说下vue 中的h函数
h函数就是vue中的`createElement`方法，这个函数作用就是创建虚拟dom，追踪dom变化的，在讲h函数之前，我们先来了解下虚拟dom：虚拟dom简单来说就是一个普通的JavaScript对象，包含tag，props，children三个属性。。。
```html
<div id="app">
  <p className="text">lxc</p>
</div>
```
上边的HTML代码转为虚拟DOM如下：
```js
{
  tag:"div",
  props:{
    id:"app"
  },
  children:[
    {
      tag:"p",
      props:{
        className:"text"
      },
      children:[
        "lxc"
      ]
    }
  ]
}
```
该对象就是所谓的虚拟dom，因为dom对象是属性结构，所以使用JavaScript对象就可以简单表示。而原生dom有许多属性、事件，即使创建一个空div也要付出昂贵的代价。而虚拟dom提升性能的点在于DOM发生变化的时候，通过diff算法对比，计算出需要更改的DOM，只对变化的DOM进行操作，而不是更新整个视图。。。在vue脚手架中，我们经常会看到这样一段代码：
```js
const app = new Vue({
  ··· ···
  render: h => h(App)
})
```
这个render方法也可以写成这样：
```js
 const app = new Vue({
  ··· ···
  render:function(createElement){
      return createElement(App)
  }
})
```
所以h函数就是vue中的createElement方法，这个函数作用就是创建虚拟dom，追踪dom变化的。


## 160、Vue.prototype、Vue.component和Vue.use的区别
1. Vue.prototype
  - 在很多组件里用到数据/实用工具，但是不想污染全局作用域。这种情况下，你可以通过在原型上定义它们使其在每个 Vue 的实例中可用
  - $ 是在 Vue 所有实例中都可用的 property 的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突
  - 常用于方法与变量
  ```js
  import pinyin from 'js-pinyin';
  Vue.prototype.$pinyin = pinyin;
  ```
2. Vue.component
  - 注册全局组件
  - 第一个参数是调用组件时写的组件名
  - 第二个参数是引入组件时写的标签名称
  - 常用于注册自定义组件
  ```js
  import JsTree from '@/components/JsTree';
  Vue.component('JsTree', JsTree);
  ```
3. Vue.use
  - 注册全局插件
  - 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件
  - 插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
  - 常用于注册第三方插件
  ```js
  import VueContextMenu from 'vue-contextmenu';
  Vue.use(VueContextMenu);
  ```


## 161、vue组件里的定时器要怎么销毁？
```js
const timer = setInterval(() =>{
  // 某些定时器操作
}, 500);

// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {
  clearInterval(timer);
})
```


## 162、`<template></template>`有什么用？
包裹嵌套其它元素，使元素具有区域性，自身具有三个特点：
- **隐藏性**：不会显示在页面中
- **任意性**：可以写在页面的任意地方
- **无效性**：没有一个根元素包裹，任何HTML内容都是无效的


## 163、vue组件会在什么时候下被销毁？
页面关闭、路由跳转、v-if和改变key值


## 164、vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
需要，原生DOM事件必须要手动销毁，否则会造成内存泄漏


## 165、在组件中怎么访问到根实例？
`this.$root`


## 166、vue中什么是递归组件？举个例子说明下？
组件自己调用自己，场景有用于生成树形结构菜单


## 167、在compositionAPI中如何使用生命周期函数？
需要用到哪个生命周期函数，就将对应函数的import进来，接着在setup中调用即可


## 168、vue3如何通过ref属性获取界面上的元素?
在vue2.x中，可以通过给元素添加`ref='xxx'`属性，然后在代码中通过`this.$refs.xxx`获取到对应的元素;

在vue3中：
- 在template中的写法跟vue2一样，给元素添加个`ref='xxx'`
- 在setup中，先创建一个响应式数据，并且要把响应式数据暴露出去
- 当元素被创建出来的时候，就会给对应的响应数据赋值
- 当响应式数据被赋值之后，就可以利用生命周期方法onMounted中获取对应的响应式数据，即DOM元素
- 这样做原因很简单，在setup执行时，template中的元素还没挂载到页面上，所以必须在mounted之后才能获取到元素。
```html
<template>
  <div ref='box'>I am DIV</div>
</template>
<script>
import { onMounted, ref } from 'vue';
export default{
  setup(){
    let box = ref(null);
    onMounted(()=>{
      console.log(box.value)
    });
    return {box}
  }
}
</script>
```


## 169、Vue的数据为什么频繁变化但只会更新一次
或者这样问：Vue在一个tick中多次更新数据页面只会更新一次（主线程的执行过程就是一个tick）
- 检测到数据变化
- 开启一个队列
- 在同一事件循环中缓冲所有数据改变
- 如果同一个 watcher (watcherId相同)被多次触发，只会被推入到队列中一次


## 170、你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解



## 171、你有使用过vue开发多语言项目吗？说说你的做法？


## 172、在使用计算属性的时，函数名和data数据源中的数据可以同名吗？


## 173、vue中data的属性可以和methods中的方法同名吗？为什么？


## 174、怎么给vue定义全局的方法？


## 175、vue2.0不再支持v-html中使用过滤器了怎么办？


## 176、怎么解决vue打包后静态资源图片失效的问题？


## 177、怎么解决vue动态设置img的src不生效的问题？


## 178、使用vue后怎么针对搜索引擎做SEO优化？


## 179、跟keep-alive有关的生命周期是哪些？描述下这些生命周期


## 180、你知道vue2.0兼容IE哪个版本以上吗？


## 181、使用vue开发一个todo小应用，谈下你的思路


## 182、你有看过vue推荐的风格指南吗？列举出你知道的几条


## 183、你是从vue哪个版本开始用的？你知道1.x和2.x有什么区别吗？


## 184、vue中怎么重置data？


## 185、vue渲染模板时怎么保留模板中的HTML注释呢？


## 186、Vue.observable你有了解过吗？说说看


## 187、你知道style加scoped属性的用途和原理吗？


## 188、watch的属性用箭头函数定义结果会怎么样？


## 189、在vue项目中如果methods的方法用箭头函数定义结果会怎么样？


## 190、在vue项目中如何配置favicon？


## 191、你有使用过babel-polyfill模块吗？主要是用来做什么的？


## 192、说说你对vue的错误处理的了解？


## 193、在.vue文件中style是必须的吗？那script是必须的吗？为什么？


## 194、vue怎么实现强制刷新组件？


## 195、vue自定义事件中父组件怎么接收子组件的多个参数？


## 196、实际工作中，你总结的vue最佳实践有哪些？


## 197、vue给组件绑定自定义事件无效怎么解决？


## 198、vue使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？


## 199、vue如果想扩展某个现有的组件时，怎么做呢？


## 200、说下$attrs和$listeners的使用场景


## 201、分析下vue项目本地开发完成后部署到服务器后报404是什么原因呢？


## 202、v-once的使用场景有哪些？


## 203、说说你对vue的表单修饰符.lazy的理解


## 204、vue为什么要求组件模板只能有一个根元素？


## 205、EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？


## 206、怎么修改vue打包后生成文件路径？


## 207、你有使用做过vue与原生app交互吗？说说vue与ap交互的方法


## 208、使用vue渲染大量数据时应该怎么优化？说下你的思路！


## 209、在vue中使用this应该注意哪些问题？


## 210、你有使用过JSX吗？说说你对JSX的理解


## 211、说说组件的命名规范


## 212、怎么配置使vue2.0+支持TypeScript写法？


## 213、vue的is这个特性你有用过吗？主要用在哪些方面？


## 214、vue的:class和:style有几种表示方式？


## 215、你了解什么是函数式组件吗？


## 216、vue怎么改变插入模板的分隔符？


## 217、说说你对provide和inject的理解


## 218、开发过程中有使用过devtools吗？


## 219、说说你对slot的理解有多少？slot使用场景有哪些？


## 220、你有使用过动态组件吗？说说你对它的理解


## 221、prop验证的type类型有哪几种？


## 222、prop是怎么做验证的？可以设置默认值吗？


## 223、说说你对vue组件的设计原则的理解


## 224、vue打包成最终的文件有哪些？


## 225、说说你对v-clock和v-pre指令的理解


## 226、写出你知道的表单修饰符和事件修饰符


## 227、用vue怎么实现一个换肤的功能？


## 228、有在vue中使用过echarts吗？踩过哪些坑？如何解决的？


## 229、vue部署上线前需要做哪些准备工作？


## 230、vue过渡动画实现的方式有哪些？


## 231、vue在created和mounted这两个生命周期中请求数据有什么区别呢？


## 232、vue父子组件双向绑定的方法有哪些？


## 233、vue怎么获取DOM节点？


## 234、vue项目有使用过npm run build --report吗？


## 235、如何解决vue打包vendor过大的问题？


## 236、webpack打包vue速度太慢怎么办？


## 237、vue在开发过程中要同时跟N个不同的后端人员联调接口（请求的url不一样）时你该怎么办？


## 238、vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？


## 239、vue开发过程中你有使用什么辅助工具吗？


## 240、你了解什么是高阶组件吗？可否举个例子说明下？


## 241、为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？


## 242、说说你对vue的extend（构造器）的理解，它主要是用来做什么的？


## 243、怎么捕获组件vue的错误信息？


## 244、为什么vue使用异步更新组件？


## 245、写出多种定义组件模板的方法


## 246、SPA单页面的实现方式有哪些？


## 247、组件进来请求接口时你是放在哪个生命周期？为什么？


## 248、如何引入scss？引入后如何使用？


## 249、使用vue开发过程你是怎么做接口管理的？


## 250、删除数组用delete和Vue.delete有什么区别？


## 251、组件和插件有什么区别？


## 252、说说你对选项el,template,render的理解


## 253、vue实例挂载的过程是什么？


## 254、vue在组件中引入插件的方法有哪些？


## 255、你有看过vue的源码吗？如果有那就说说看


## 256、你有写过自定义指令吗？自定义指令的生命周期（钩子函数）有哪些？

