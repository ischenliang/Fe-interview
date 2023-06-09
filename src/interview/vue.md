# vue面试题汇总
## 1、谈谈你对MVVM的理解？
MVVM是一种前端架构设计模式，其名称来源于`Model-View-ViewModel`的缩写。MVVM架构将前端应用程序划分为三个主要组件，分别是数据模型（Model）、用户界面（View）和视图模型（ViewModel）。这三个组件之间的关系如下所示：
- `Model`：数据模型层，用于处理与业务逻辑相关的数据，并提供访问数据的接口。
- `View`：用户界面层，负责将数据模型渲染到页面上，以便用户进行交互操作。
- `ViewModel`：视图模型层，作为中间层将数据模型和用户界面进行连接，负责处理用户界面的逻辑和数据绑定，实现数据的双向绑定，从而将数据模型和用户界面完全解耦合。

MVVM 模式的核心思想是数据驱动，即所有用户界面的变化都会触发视图模型的变化，而视图模型的变化也会反过来修改用户界面。这种双向绑定可以让开发者更加专注于业务逻辑的开发，而不用关注用户界面和数据模型之间的交互，大大提高了开发效率和代码的可维护性。


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

### Vue3响应式数据实现
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

### Vue2响应式数据实现
```js
let car = {};
let price = 3000
Object.defineProperty(car, 'price', {
  enumerable: true,
  configurable: true,
  get () {
    console.log('price属性被读取')
    return price
  },
  set (newVal) {
    console.log('price属性被修改')
    price = newVal
  }
})
car.price // price属性被读取
car.price = 200 // price属性被修改
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


## 4、Vue中如何进行依赖收集的?
依赖收集是通过响应式系统来实现的。当一个响应式对象被访问时，它会触发`getter`函数，并将当前正在计算的计算属性或渲染函数添加到该响应式对象的依赖列表中。在执行`setter`函数更新响应式对象时，它会通知依赖列表中的所有计算属性和渲染函数进行重新计算和更新。
- 在Vue 2.x中，依赖收集是通过`Dep`类和`Watcher`类来实现的。每个响应式对象都有一个关联的`Dep`实例，用于管理与该对象相关的依赖项。在计算属性或渲染函数中访问响应式对象时，会创建一个`Watcher`实例，并将其添加到`Dep`实例的依赖列表中。当响应式对象发生变化时，`Dep`实例会通知其所有的`Watcher`实例进行重新计算和更新。
- 在Vue 3.x中，通过使用`Proxy`代理对象来拦截对响应式对象的读取和写入操作，并在其中进行依赖收集和派发更新。


## 5、如何理解Vue中的模板编译原理?
所谓模板编译过程就是把用户写的模板经过一系列的处理最终生成`render`函数的过程。

**模板编译原理**
- 解析模板：将模板字符串解析成抽象语法树（AST）。
  ```js
  {
    tag: 'template',
    parent: undefined,
    children: [
      {
        tag: 'div',
        children: [],
        parent: {tag: 'div', children: Array(1), parent: {…}}
      }
    ]
  }
  ```
- 静态分析：对抽象语法树进行静态分析，找出其中的静态节点，即不需要响应式更新的节点。
  - 在AST中找出静态节点并打上标记，即`static`属性设为`true`
  - 在AST中找出静态根节点并打上标记，即`staticRoot`属性设为`true`
- 代码生成：根据抽象语法树生成渲染函数代码字符串。
  - 1、递归AST生成可执行的代码字符串
    ```js
    _c('template', null, _c('div', null, [_c('input type="file" @change="handleChange" /', null, [_c('div', null, [_c('el-button @click="handleClick"', null, [])])])]))
    ```
  - 2、当代码字符串拼接好后，会放在`with`中返回给调用者，即`render`函数接收的参数。
    ```js
    const render = new Function(`with(this){ return ${code} }`);
    return { render }; // 返回包含渲染函数的对象
    ```
- 缓存优化：对模板和渲染函数进行缓存优化，以提升性能。


## 6、Vue生命周期钩子是如何实现的?
Vue 的生命周期钩子本质上是一些在不同阶段执行的回调函数。这些钩子函数是通过 Vue 实例的原型链继承而来的，当创建一个 Vue 实例时，会按照特定顺序自动调用这些钩子。
::: tip 原理
具体实现原理如下：
1. 在初始化 Vue 实例时，会将所有的生命周期钩子函数存储到一个数组中。
2. 当组件被挂载到 DOM 上时，会依次调用`beforeCreate、created、beforeMount`钩子。
3. 然后创建真实的 DOM 元素并将其插入到页面中，接着调用`mounted`钩子。
4. 如果组件数据发生变化，会触发`beforeUpdate、updated`钩子。
5. 如果组件被销毁，会依次调用`beforeDestroy、destroyed`钩子并将组件从 DOM 上移除。
:::


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
Vue的组件中，`data`选项为必须是一个函数，而不是一个对象。组件可能被多次使用。
- 如果组件`data`是一个对象，对象属于引用类型，两个组件中设置的`data`都会指向同一个内存地址，会导致不同的实例之间相互影响，导致意想不到的结果。
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


## 10、请说明nextTick的原理？
Vue的`nextTick`是一个异步方法，它的作用是在下次DOM更新循环结束之后执行指定的回调函数。
::: tip 原理
原理是利用了浏览器的事件循环机制。当数据发生变化时，Vue会将需要更新的DOM操作放入一个队列中，在下次事件循环中执行这些DOM更新操作，并通知`nextTick`所传入的回调函数。
> 具体来说，当`nextTick`被调用时，Vue会先检查是否存在微任务队列，如果有，则将回调函数添加到微任务队列中；否则，将回调函数添加到事件循环队列中，并通过`Promise`和`MutationObserver`等方式确保在DOM更新完毕后立即执行回调函数。
:::


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


## 12、Vue.set方法是如何实现的?
::: danger 原理
`Vue.set`方法用于向响应式对象添加新的属性，以确保添加的属性也是响应式的。其实现原理如下：
1. 首先判断传入对象是否为响应式对象，如果不是，直接返回。
2. 判断传入`key`是否已经存在于对象中，如果已经存在，则直接更新其值，否则执行第 3 步。
3. 判断当前对象是否为`Vue`实例或根数据对象，如果是，则无法将新的属性转换为响应式对象，直接赋值；否则使用`Vue.observable`即`defineReactive`方法将新的属性转换为响应式对象，并将它添加到当前对象中。
4. 触发响应式更新，通知相关的组件进行重新渲染。
:::

`Vue.set`方法会传入三个参数，分别是`target`、`key`和`value`。
> target: 对象或者数组，key: 属性名或者数组索引，value: 对应设置的值。返回值为设置的值即`value`。

大致实现原理如下:
- 首先判断传入的`target`是数组，并且`key`是索引，就调用`splice`变异方法，将`val`值添加；
- 如果传入的是一个对象，首先判断`key`是否存在于`target`中
  - 如果存在，则表示不是新增属性，只需要修改值即可
  - 如果不存在，会先会获取并判断`target`上的`__ob__`属性(该属性用于判断`target`是否为响应式对象)是否存在
    - 如果`target`上的`__ob__`属性不存在，则表示`target`不是响应式对象，只需要给他添加新属性即可，不用将新属性转换成响应式
    - 如果`target`上的`__ob__`属性存在，则表示`target`是响应式对象，就会调用`defineReactive`方法将新属性添加到`target`上
    > `defineReactive`方会将新属性添加完之后并将其转化成响应式，最后通知依赖更新。

对应`vue`源码位置`src/core/observer/index.js`
```ts
export function set (target, key, val){
  if (process.env.NODE_ENV !== 'production' && (isUndef(target) || isPrimitive(target))) {
    warn('Cannot set reactive property on undefined, null, or primitive value: ' + target)
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key)
    target.splice(key, 1, val)
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    )
    return val
  }
  if (!ob) {
    target[key] = val
    return val
  }
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```


## 12、vm.$watch实现原理？
`vm.$watch`是用来监听数据变化的方法。其实现原理:
> 在调用`vm.$watch`方法时，Vue会创建一个新的`Watcher`对象，并把需要监听的数据作为`Watcher`的依赖。当被监听的数据发生变化时，`Watcher`会执行回调函数，并把新值和旧值作为参数传递给该函数。


## 12、Vue.delete实现原理
`Vue.delete`用于删除对象的属性或者数组的元素。其实现原理:
1. 首先判断传入的第一个参数是否为数组或对象，如果不是则直接返回。
2. 如果是数组，则使用JavaScript原生的`Array.prototype.splice()`方法来删除指定索引处的元素，并通知Vue响应式系统更新视图。
3. 如果是对象，则使用JavaScript的`delete`操作符删除指定属性，并通知Vue响应式系统更新视图。


## 12、Vue.extend实现原理
`Vue.extend()`是Vue.js提供的一个全局API，用于创建可复用的组件构造器。其实现原理如下：
> `Vue.extend()`的实现原理就是利用JavaScript的原型链和原型继承机制来创建一个集成了父类选项的子类构造函数，并通过该构造函数创建子类实例。
1. 首先通过`Vue.extend()`方法创建一个子类构造函数Sub，并让它继承自父类构造函数Super。
2. 接着使用`Object.create()`方法创建一个新对象`options`，它的原型指向父类的选项对象。这样，子类就能够继承父类的所有选项。
3. 然后将传入`Vue.extend()`方法的选项对象混入到options中，覆盖父类选项的同名属性。
4. 最后通过`new Sub(options)`创建一个子类实例，并返回该实例。


## 12、Vue.directive实现原理
`Vue.directive()`是Vue.js提供的一个全局API，用于注册全局自定义指令。其实现原理如下：
> `Vue.directive()`的实现原理就是在Vue实例的选项对象中注册全局自定义指令，然后在组件中创建并绑定指令实例，利用指令实例对元素进行各种操作并响应元素的生命周期事件。
1. 首先通过`Vue.directive()`静态方法，在Vue的静态属性`Vue.directives`上注册一个全局自定义指令。
2. 在组件渲染时，如果该组件中使用了自定义指令，则会在`directives`选项中找到对应的指令配置对象，并创建一个指令实例。
3. 指令实例包含一些生命周期钩子和一些方法，可以监听元素的生命周期事件，或者直接操作元素的DOM等。
4. 当指令实例被绑定到元素上时，它会根据`bind、inserted、update`等生命周期钩子函数进行初始化。
5. 当元素被插入到文档中或者更新时，指令实例中的相应钩子函数将被调用，执行特定的逻辑，更新元素的状态或者DOM。

```js
// 构造函数
function Vue (options) {
  this.options = options
}
const types = ['component', 'directive', 'filter']

// 初始化: 生成静态属性
function initGlobalApi (Vue) {
  Vue.options = Object(null)
  types.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })
}
initGlobalApi(Vue)

// 判断是否是一个函数
function isFunction (target) {
  return typeof target === 'function'
}
// 判断是否是一个对象
function isPlainObject (target) {
  return Object.prototype.toString.call(target) === '[object Object]'
}

// 动态生成静态方法 Vue.component、Vue.directive和 Vue.filter
types.forEach(type => {
  Vue[type] = function (id, definition) {
    if (type === 'components' && isPlainObject(definition)) {
      definition.name = definition.name || id
      // definition = this.options._base.extend(definition)
    }
    if (type === 'directives' && isFunction(definition)) {
      definition = { bind: definition, update: definition }
    }
    Vue.options[type + 's'][id] = definition
    return definition
  }
})
```
使用测试
```js
/**
 * 全局注册
 */
const vue = new Vue({
  el: '',
  data: () => {
    return {
      name: '张三'
    }
  }
})
// 重复注册的话会被后一个覆盖
Vue.directive('perms', {
  bind: (el, binding, vnode, oldVnode) => {
  }
})
Vue.component('c-button', {
  name: 'cButton',
  template: `<div>测试</div>`
})
Vue.filter('formatTime', (value) => {
  // 返回处理后的之
  return value * 2
})
console.log(Vue.options)

/**
 * 局部注册
 */
const vue1 = new Vue({
  name: 'component1',
  data: () => {
    return {}
  },
  directives: {
    perms: {
      bind: () => {
      }
    }
  },
  components: {
    cButton: {
      name: 'c-button',
      template: `<template><span>cbutton</span></template>`
    }
  },
  filters: {
    formatTime: (value) => {
      // 返回处理后的之
      return value * 2
    }
  }
})
console.log(vue1)
```
可以看到控制栏输出结果如下：
![202303291531218.png](http://img.itchenliang.club/img/202303291531218.png)


## 12、Vue.filter实现原理
`Vue.filter()`是Vue.js提供的一个全局API，用于注册全局过滤器。其实现原理如下：
> `Vue.filter()`的实现原理就是在Vue实例的选项对象中注册全局过滤器，然后在组件中使用过滤器时，调用该过滤器函数对指定的值进行处理并返回处理结果。
1. 首先通过`Vue.filter()`静态方法，在Vue的静态属性`Vue.options.filters`上注册一个全局过滤器。
2. 在组件渲染时，如果该组件中使用了过滤器，则会在`filters`选项中找到对应的过滤器函数，并调用该函数对指定的值进行处理。
3. 过滤器函数接收被处理的值作为第一个参数，可以接收其他参数，并返回处理后的结果。
4. 当组件中使用过滤器时，Vue.js会自动将指令表达式的值和过滤器参数传递给对应的过滤器函数，并获取处理后的结果。


## 12、Vue.component实现原理
`Vue.component()`是Vue.js提供的一个全局API，用于注册全局组件。其实现原理如下：
> `Vue.component()`的实现原理就是在Vue实例的选项对象中注册一个全局组件，然后在组件中创建并渲染组件实例，利用组件实例对组件进行各种操作并响应组件的生命周期事件。
1. 首先通过`Vue.component()`静态方法，在Vue的静态属性`Vue.options.components`上注册一个全局组件。
2. 在组件渲染时，如果该组件中使用了注册的全局组件，则会在`components`选项中找到对应的组件构造函数，并创建一个组件实例。
3. 创建组件实例时，Vue.js会根据组件选项创建一个组件的虚拟DOM，并将其渲染成真实的DOM元素。
4. 组件实例包含一些生命周期钩子和一些方法，可以监听自身的生命周期事件，或者直接操作自身的DOM等。


## 12、Vue.mixin实现原理
`Vue.mixin()`是Vue.js提供的一个全局API，用于混入全局的组件选项。其实现原理如下：
> `Vue.mixin()`的实现原理就是在Vue实例的选项对象中注册一个全局混入对象，并在组件实例化时将混入对象的选项合并到组件的选项中。
1. 首先通过`Vue.mixin()`静态方法，在Vue的静态属性`Vue.options.mixin`上注册一个全局混入对象。
2. 在组件实例化时，如果该组件中使用了混入对象，则会将混入对象中的所有选项合并到组件的选项中。
3. 如果混入对象和组件选项中存在同名的选项，则会进行合并。具体的合并策略由Vue.js内部的`mergeOptions()`函数确定。
4. 组件中的选项将覆盖混入对象中的同名选项，如果需要访问混入对象中的选项，可以通过特殊的方式来获取。
```js
// 构造函数
function Vue (options) {
  this.options = mergeOption(options, Vue.options.mixin)
}

// 初始化
function initGlobalApi (Vue) {
  Vue.options = Object(null)
  Vue.options.mixin = Object.create(null)
  // ...
  initMixin(Vue)
}
initGlobalApi(Vue)

// 合并option
function mergeOption (options, mixin) {
  const merged = {}
  const arr = [options, mixin]
  arr.forEach(item => {
    for (let key in item) {
      if (!merged[key]) {
        merged[key] = item[key]
      } else {
        // 采取旧近原则
        merged[key] = Object.assign({}, item[key], merged[key])
      }
    }
  })
  return merged;
}

function initMixin (Vue) {
  Vue.mixin = function (option) {
    Vue.options.mixin = option
  }
}
```
测试
```js
Vue.mixin({
  data: {
    name: '张三',
    gender: 'male',
    fruits: ['香蕉', '苹果']
  }
})
const vue = new Vue({
  data: {
    name: '李四',
    age: 24,
    fruits: ['栗子', '苹果']
  }
})
console.log(vue)
```
控制台输出结果如下:
![202303291614364.png](http://img.itchenliang.club/img/202303291614364.png)


## 12、Vue.compile实现原理
`Vue.compile()`是Vue.js提供的一个全局API，用于将字符串模板编译为渲染函数。其实现原理如下：
> `Vue.compile()`的实现原理就是利用Vue.js内部的编译工具将字符串模板编译为渲染函数。这样，我们就可以方便地在运行时动态地编译和渲染模板，提高程序的灵活性和可维护性。
1. 首先通过`compileToFunctions()`方法，将字符串模板编译为渲染函数。
2. `compileToFunctions()`方法会先从缓存中查找是否已经编译过该模板，如果已经编译过，则直接返回缓存中的渲染函数。
3. 如果没有缓存，则使用`baseCompile()`方法对模板进行编译。`baseCompile()`方法会将模板解析为抽象语法树，并执行一系列的优化和静态分析。
4. 最后，将抽象语法树转换成渲染函数代码字符串，并使用new Function()构造函数创建渲染函数。


## 12、Vue.version实现原理
`Vue.version`是Vue.js提供的一个全局属性，用于获取当前使用的Vue.js版本号。其实现原理如下:
构建时读取了`package.json`中的`version`字段，然后将其赋值给`Vue.version`。


## 12、Vue3中watch和watchEffect实现原理
Vue 3中使用了基于`Proxy`的响应式系统，并引入了新的API`watchEffect`和`watch`，用于监视数据变化并执行相应的回调函数。
::: tip watchEffect
`watchEffect`的实现原理如下：
1. 创建一个`ReactiveEffect`对象，并将回调函数作为参数传递给该对象。`ReactiveEffect`对象包含一些生命周期钩子和一些方法，可以监听数据变化事件，并响应相应的回调函数。
2. 在回调函数中访问到响应式数据时，`ReactiveEffect`对象会将其依赖收集到一个`Set`中，并记录当前依赖关系。
3. 当依赖发生变化时，`ReactiveEffect`对象会重新运行回调函数，并更新依赖关系。
:::
::: tip watch
`watch`的实现原理如下：
1. 创建一个响应式的`Ref`对象，并将要监视的数据作为参数传递给该对象。
2. 使用`watchEffect`创建一个`ReactiveEffect`对象，并将回调函数作为参数传递给该对象。
3. 在回调函数中访问到响应式数据时，`ReactiveEffect`对象会将其依赖收集到一个`Set`中，并记录当前依赖关系。
4. 当依赖发生变化时，`ReactiveEffect`对象会重新运行回调函数，并更新依赖关系。
:::


## 12、Vue3中createApp实现原理
`createApp`是Vue 3中创建应用程序实例的工厂函数。其实现原理如下：
1. `createApp`函数接收一个根组件作为参数，并返回一个应用实例对象。
2. 该实例对象内部包含了一些API，用于注册组件、设置全局配置、插件安装等操作。
3. 在应用实例上调用`mount`方法，将应用实例挂载到DOM节点上。
4. 当应用状态改变时，应用实例会通过虚拟DOM机制自动触发重新渲染，并将新的DOM树更新到对应的位置上。
5. 应用实例内部通过模板编译器将模板转换成渲染函数，然后通过渲染函数生成虚拟DOM节点树。
6. 渲染器通过diff算法比较前后两次渲染生成的虚拟DOM节点树的差异，并进行最小化更新操作，从而达到高效的性能优化。

总的来说，Vue3的`createApp`函数主要实现依赖于虚拟DOM机制、模板编译器和渲染器等技术，通过这些技术实现了高效的组件化UI开发和性能优化。
```js
function createApp (options) {
  const app = {
    version: 'x.x.x',
    config: {
      // 一些全局配置，例如挂载属性、错误处理等等
      globalProperties: {}
    },
    _context: {
      // 存储全局组件和指令
      components: {},
      directives: {},
      mixins: {}
    },
    // 注册全局组件
    component: function (name, component) {
      this._context.components[name] = component
    },
    // 注册全局指令
    directive: function (name, directive) {
      this._context.directives[name] = directive
    },
    // 安装插件使用
    use (plugin, option) {
      plugin.install(this, option)
    },
    // 挂载应用程序
    mount (rootContainer) {
      // 具体实现查看源码
      // const instance = createComponentInstance(options)
      // instance.mount(rootContainer)
      console.log('挂载应用了', rootContainer)
    }
  }
  return app
}
```
使用测试
```js
const app = createApp({
  setup(props) {
  }
})
app.component('c-button', {
  name: 'cButton'
})
app.directive('perms', {
  created: (el, binding, vnode, oldVnode) => {

  }
})
app.use({
  install: function (app, option) {
    console.log(option)
    // 挂载http请求
    app.config.globalProperties.$http = () => {
    }
  }
}, { maxSize: 10 })
app.mount('#app')
console.log(app)
```
控制台输出结果如下
![202303291646569.png](http://img.itchenliang.club/img/202303291646569.png)


## 12、Vue3中Fragment实现原理
Vue3 中的`Fragment`本质上是一个组件，它可以将多个子节点包裹成一个单独的父节点，并且不会在页面上渲染出任何标签。
> `Fragment`的实现原理其实很简单，它在编译阶段被处理为一个特殊的虚拟节点，这个虚拟节点不会直接渲染到页面中，而是将它的所有子节点都挂载到父节点上，形成一个包裹层级。因此，当我们在使用`Fragment`时，可以把多个子元素放进一个


## 12、Vue3中toRef和toRefs实现原理
::: danger toRef实现原理
当我们调用`toRef`时，它会接收两个参数：一个响应式对象和一个属性名。然后，`toRef`会返回一个`ref`对象，该对象引用了原始对象的指定属性，并且当这个属性发生变化时，`ref`对象的值也会相应地更新。

注意: 这种更新不仅仅是单向的，而是双向的，因此当我们对ref对象进行赋值时，原始对象的对应属性也会被更新。
:::
::: danger toRefs实现原理
当我们调用`toRefs`时，它会接收一个响应式对象作为参数。然后，`toRefs`会遍历该对象的所有属性，对每个属性调用`toRef`函数，从而创建一个`ref`对象。然后，`toRefs`将这些`ref`对象作为属性值，以属性名为键，组合成一个新的对象并返回。
> 在内部实现上，`toRefs`使用了一个`for…in`循环来遍历响应式对象的所有属性，并对每个属性调用`toRef`函数，从而创建`ref`对象。然后，`toRefs`将这些`ref`对象作为属性值，以属性名为键，组合成一个新的对象并返回。由于`toRefs`返回的新对象的属性值是`re`f对象，因此可以使用解构赋值语法将其解构为普通变量和响应式变量（即`ref`对象），从而实现双向绑定和自动更新效果。
:::


## 12、Vue3中provide和inject实现原理
`provide`和`inject`用于在父组件和子孙组件之间共享数据。
::: danger 实现原理
当我们在父组件中使用`provide`提供数据时，Vue3会将这些数据存储在一个特殊的地方，即当前组件实例对象的`_provided`属性中。然后，在子孙组件中使用`inject`获取这些数据时，Vue3会向上遍历组件树，查找最近的祖先组件，如果该祖先组件定义了与我们使用的`inject`相同的键名，则返回该键名对应的值（即`_provided`属性中存储的值），否则返回默认值。
> 在内部实现上，`provide`和`inject`依赖于Vue3的虚拟DOM引擎，它们会通过特定的标记和属性来记录和传递提供的数据。当父组件提供数据时，Vue3会将这些数据保存在当前组件实例对象的`_provided`属性中，并且为每个提供的数据生成一个唯一的标识符。然后，在子孙组件中使用`inject`时，Vue3会向上遍历组件树，查找包含指定标识符的祖先组件，并将其对应的值返回给子孙组件。这样可以确保提供和注入的数据是安全可靠的，不会受到命名冲突等问题的影响。
:::


## 12、Vue中mount的实现原理
`app.mount`用于将Vue应用程序挂载到指定的DOM元素上。
::: danger 实现原理
1. 当我们调用`app.mount`时，Vue会首先检查是否已经创建了根组件实例对象（即通过`createApp`创建的实例对象），如果不存在，则会创建一个根组件实例对象，否则直接使用已经存在的根组件实例对象。
2. 然后，Vue会获取我们传递给`mount`函数的DOM元素，并将根组件实例对象挂载到该DOM元素上。具体实现过程是，Vue会将根组件实例对象的渲染函数包装成一个渲染器函数，并将该渲染器函数保存到一个内部的渲染器实例对象中。然后，Vue会创建一个`Effect`对象（基于Reactivity API），并将渲染器函数作为回调函数传递给`Effect`对象。这样，当依赖于响应式数据的值发生变化时，`Effect`对象就会自动调用渲染器函数重新生成虚拟DOM，并与之前生成的虚拟DOM进行比对，从而更新DOM元素。
:::


## 12、为什么要使用异步组件？实现原理？
**什么是异步组件?**
> 异步组件就是定义的时候什么都不做，只在组件需要渲染（组件第一次显示）的时候进行加载渲染并缓存，缓存是以备下次访问。

**为什么要使用异步组件？**
> 在系统功能比较多时，页面首次加载没有必要一次把所有功能代码都下载到客户端，需要把那些非首页的代码按功能拆分为一个个组件，按照用户操作异步下载和渲染。因此，异步组件主要解决的是按需加载的问题，保证系统首屏加载时间不超过3秒，减少用户等待时间，提高系统的性能。

**异步组件的优点**
- 异步组件可以减少打包的结果。
  > 会将异步组件分开打包，会采用异步的方式加载组件，可以有效的解决一个组件过大的问题。不使用异步组件，如果组件功能比较多打包出来的结果就会变大。
- 异步组件的核心可以给组件定义变成一个函数，函数里面可以用`import`语法，实现文件的分割加载

::: danger 实现原理
在Vue3中，异步组件的实现原理是基于ES模块和浏览器的动态导入(Dynamic Import)功能实现的，与Webpack无关。

具体来说，当我们定义异步组件时，Vue会将该组件定义为一个函数，即异步组件工厂函数。然后，在父组件中使用异步组件时，Vue会触发异步组件工厂函数，并动态加载该组件所需的ES模块。具体实现过程如下：
1. 我们在异步组件工厂函数中，通常使用动态导入语法(`import()`)，从而告诉浏览器需要异步加载哪些模块。例如：
  ```js
  const AsyncComponent = () => import('./AsyncComponent.vue')
  ```
2. 当浏览器执行到该语句时，会向服务器发送一个HTTP请求，获取异步组件对应的ES模块文件。
3. 当ES模块文件被下载并解析完成后，浏览器会自动执行其中的代码，并生成异步组件的实例对象。当ES模块文件被下载并解析完成后，浏览器会自动执行其中的代码，并生成异步组件的实例对象。
4. 然后，Vue会将该组件实例对象传递给异步组件工厂函数的回调函数，并通过resolve函数将其返回给父组件。
5. 父组件接收到异步组件的实例对象后，就可以像普通组件一样渲染和使用该组件了。
:::

## 12、render函数实现原理
Vue 的`render`函数的实现原理可以简单描述为以下几个步骤：
1. 将模板编译成渲染函数：Vue 的模板编译器将模板解析成 AST（抽象语法树），然后生成渲染函数。渲染函数是一个接受`createElement`方法作为参数的函数，它会返回一个虚拟节点树描述组件的输出内容。
2. 执行渲染函数：在每次组件渲染时，Vue 会执行渲染函数，并传入`createElement`方法作为参数。`createElement`方法可以创建虚拟节点，从而构建出虚拟 DOM 树。
3. 比较新旧虚拟节点树：根据新的虚拟节点树和旧的虚拟节点树，执行 diff 算法得到需要更新的部分。
4. 更新视图：将需要更新的部分对应的真实 DOM 元素进行更新。

```js
function createElement(tagName, props, children) {
  var element = document.createElement(tagName);

  for (var attr in props) {
    if (props.hasOwnProperty(attr)) {
      if (attr === 'innerHtml') {
        element.innerHtml = attr
      } else {
        element.setAttribute(attr, props[attr]);
      }
    }
  }

  if (Array.isArray(children)) {
    children.forEach(function(child) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    });
  } else if (typeof children === 'string') {
    element.appendChild(document.createTextNode(children));
  }

  return element;
}

const render = () => {
  return createElement(
    'div',
    {
      class: 'my-component',
      id: 'my-component'
    },
    [
      createElement(
        'p',
        {
          class: 'p',
          innerHtml: '<span>内容</span>'
        }
      ),
      createElement(
        'h1',
        {
          class: 'title'
        },
        'hello render'
      )
    ]
  );
}
const dom = render()
console.log(dom)
```
打开控制台输出结果如下
![202303291725265.png](http://img.itchenliang.club/img/202303291725265.png)


## 13、Vue为什么要用虚拟Dom？
::: danger 为什么使用虚拟DOM
Vue使用虚拟DOM的主要原因是为了优化性能，提高渲染速度和效率。通过将组件结构表示为轻量级、独立于平台的虚拟节点，Vue可以避免在每次数据变更时直接操作真实DOM，从而减少不必要的计算量和浏览器重排/重绘的开销。这样可以大大提升应用的响应速度和用户体验。
> 另外，虚拟DOM还使得Vue可以跨平台运行，如在Web、移动端或桌面端等多种环境中使用相同的代码来构建UI界面。 
:::

::: tip 什么是虚拟 DOM？
Virtual DOM理解为一个简单的JS对象，包含`tag`(标签名)、`props | attrs`(属性)、`children`(子元素对象)三个属性。
:::
起初我们在使用`原生js/jquery`时，不可避免的会大量操作DOM，而DOM的变化又会引发回流和重绘，从而降低页面渲染性能。而虚拟DOM的主要目的就是为了减少频繁操作DOM而引起回流重绘所引发的性能问题。

虚拟DOM(Virtual DOM)，起始本质就是一个js对象，当数据发生变化时，我们不直接操作真实DOM，因为很昂贵，我们去操作这个js对象，就不会触发大量回流重绘操作，再加上diff算法，可以找到两个虚拟DOM之间改变的部分，从而最小量的去一次性更新真实DOM，而不是频繁操作DOM，性能得到了大大的提升。

具备跨平台优势，由于Virtual DOM 是以JavaScript对象为基础而不依赖真实平台环境，所以使它具有了跨平台的能力，比如说浏览器平台、Weex、Node等。


## 14、Vue的diff算法的作用？diff算法原理是什么？
::: danger diff算法的作用
Vue的diff算法的主要作用是在数据发生变化时，高效地更新虚拟DOM树，并尽可能少地操作真实DOM，从而提高应用性能。
> diff算法可以通过比较新旧虚拟DOM树的差异，只更新必要的部分，避免了不必要的重新渲染和重绘操作，从而减少了浏览器的计算量和开销。这种优化方式被称为“局部更新”，相比于全量更新，它可以极大地提高应用的响应速度和用户体验。
:::
::: danger diff算法的实现原理
diff算法原理也是比较两个虚拟DOM树之间的差异。具体来说，当数据发生变化时，Vue会重新渲染组件，并生成新的虚拟DOM树。然后，Vue会将新旧两个虚拟DOM树进行比较，找出其中不同的部分，并尽可能地复用旧的DOM节点，从而最小化真实DOM操作的次数。

**Vue2 diff算法实现原理**: Vue2中采用的是基于虚拟DOM的diff算法，其实现原理主要分为以下几个步骤：
1. 首先将新旧两个虚拟DOM节点进行比较，如果节点类型不同，则直接销毁旧节点，并使用新节点替换它。
2. 如果节点类型相同，则遍历新旧两个节点的属性列表，对比属性值是否相同。如果有不同的属性，则更新该属性值。
3. 对比子节点列表:
  - 如果旧节点没有子节点，而新节点有子节点，则直接将新节点的子节点添加到DOM中。
  - 如果新节点没有子节点，而旧节点有子节点，则直接从DOM中移除旧节点的所有子节点。
  - 如果新旧节点都有子节点，则对子节点列表进行Diff算法的递归操作。

**Vue3 diff算法实现原理**: Vue3中采用的是基于虚拟DOM的diff算法，其实现原理主要分为以下几个步骤：
1. 首先，Vue3将新的vDOM树和旧的vDOM树进行比较，找到它们之间的差异。
2. Vue3使用一个叫做`PatchFlags`的标记来记录差异。这个标记表示需要对节点进行何种类型的更新操作，如创建、删除、替换、移动、更新等。
3. 对于每个需要更新的节点，Vue3会使用相应的更新策略来进行更新。例如，对于文本节点，Vue3会直接更新其textContent属性。对于元素节点，则会更新它的属性列表、子节点及事件监听器等。
4. 如果存在需要移动节点的情况，Vue3则会尝试复用已有的节点，而不是销毁并重新创建它们。这样可以减少DOM操作的开销，提高性能。

**Vue3 diff算法在Vue2基础上优化地方**
1. 响应式系统：使用 Proxy 对象替代了 Vue2 中的 Object.defineProperty，提高了响应式系统的性能。
2. 静态提升和模板嵌套静态提升：通过将静态节点在编译阶段提取出来，减少了不必要的虚拟 DOM 操作，提高了渲染性能。
3. 编译器优化：在编译阶段对模板进行分析，生成更加优化的渲染函数，使得渲染时只需要执行函数，而不用再解析模板，提高了渲染性能。
4. 追踪机制：采用基于数组的追踪机制（Track-by-Array）替代了 Vue2 中的基于对象的追踪机制（Track-by-Reference），减少了不必要的触发更新操作，提高了渲染性能。
5. 异步更新策略：在组件渲染过程中采用异步更新策略，防止出现意外的递归更新情况，提高了渲染性能和稳定性。
:::


## 15、既然vue通过数据劫持可以精准的探测数据变化，为什么还要进行diff检测差异?
::: danger 
虽然Vue可以通过数据劫持来监听数据变化，但是它并不能精确地知道哪些部分的DOM需要更新，因为一个组件可能有很多个视图依赖于不同的数据，而且这些视图之间的关系非常复杂。因此，Vue需要使用diff算法来检测哪些DOM节点需要更新，从而最小化DOM操作的次数，并提高页面渲染的性能。
:::


## 16、请说明key的作用和原理
::: danger 作用
用于标识每个列表项的唯一性。当一个列表发生更新时，Vue会根据新旧列表中的每个项的key值进行比较，并尽可能地复用已有的DOM节点，以减少页面渲染的开销。
:::
::: danger 原理
实现原理可以简单概括为：
1. Vue会在渲染列表时遍历每个列表项，并将其key值存储到一个哈希表中；
2. 在下一次渲染列表时，Vue会再次遍历每个列表项，并根据其key值查找哈希表，判断它是否存在；
3. 如果存在，则尝试复用已有的DOM节点；否则，创建新的DOM节点并插入到合适的位置。
:::


## 17、谈谈对组件的理解
<span style="color: red;">组件是指将页面上的某个功能或模块进行封装，形成一个独立的、可复用的代码单元</span>。通过组件化开发，可以将UI界面的各个部分进行拆分和抽象，从而更好地管理和维护代码，提高开发效率和代码质量。
> 在前端开发中，组件通常由HTML、CSS和JavaScript等代码构成，可以包含一些特定的业务逻辑、样式和交互效果等。组件的设计应该遵循高内聚、低耦合的原则，使得组件本身具有独立性、可扩展性和可维护性。

组件具有如下几个特点:
1. 独立性：每个组件都应该是独立的、完整的代码单元，不依赖于其他组件或模块；
2. 可复用性：组件应该是可复用的，可以在不同的场景中多次使用，提高代码的重用率；
3. 可定制性：组件应该具有一定的可定制性，允许开发者根据自己的需求对其进行修改和扩展；
4. 易维护性：组件应该易于维护，当出现问题时，能够快速地定位和修复。


## 18、请描述vue组件的渲染流程
Vue组件的渲染流程可以简单概括为以下几个步骤：
1. **解析模板**：Vue会先将组件的模板转换成抽象语法树（AST）并进行静态分析，以确定组件的依赖关系、渲染顺序等信息；
2. **创建虚拟DOM**：对于每个组件实例，Vue会创建一个虚拟DOM节点树，用于描述组件的结构和状态；
3. **进行数据响应式处理**：Vue会为组件实例设置一个响应式系统，用于监听组件内部数据的变化，并自动更新组件的视图；
4. **渲染真实DOM**：当组件需要进行渲染时，Vue会通过虚拟DOM树生成相应的HTML代码，并将其插入到真实的DOM树中；
5. **监听数据变化**：当组件内部数据发生变化时，Vue会自动更新虚拟DOM树，并比较新旧虚拟DOM树之间的差异，以最小化DOM操作的次数；
6. **更新视图**：根据上一步的差异，Vue会执行最少的DOM操作，更新组件的视图。

注意: Vue在进行组件渲染时，采用了异步更新机制，即将多个需要更新的组件合并成一个队列，在下一个事件循环周期中统一更新。这样做可以有效地避免不必要的重复渲染，并提高页面渲染的性能和稳定性。


## 19、请描述vue组件的更新流程
Vue组件的更新流程可以简单概括为以下几个步骤：
1. **触发数据变化**：当组件内部的数据发生变化时，Vue会自动触发响应式系统，并向相应的依赖项发送通知，以通知需要更新的组件；
2. **生成新的虚拟DOM树**：根据最新的数据状态，Vue会重新计算组件的虚拟DOM树，并生成一个新的虚拟DOM树；
3. **比较新旧虚拟DOM树**：Vue会将新旧两个虚拟DOM树进行比较，找出它们之间的差异，并记录在一个变更列表中；
4. **更新真实DOM节点**：根据变更列表，Vue会执行最少的DOM操作，更新真实的DOM节点；
5. **执行钩子函数**：在更新完所有的DOM节点后，Vue会依次执行一些特定的钩子函数，如updated、activated等，以便开发者在必要的时候进行一些额外的处理。

注意: Vue在进行组件更新时，采用了异步更新机制，即将多个需要更新的组件合并成一个队列，在下一个事件循环周期中统一更新。这样做可以有效地避免不必要的重复渲染，并提高页面渲染的性能和稳定性。


## 20、Vue异步组件原理
在 Vue 中，异步组件是一种延迟加载的组件，在需要时才会加载和渲染。使用异步组件可以实现按需加载组件，提高应用的性能和加载速度。具体来说，当使用异步组件时，Vue 会将组件的定义封装成一个工厂函数，然后在需要渲染该组件时，执行该工厂函数并返回组件定义对象。

异步组件的主要原理是利用动态导入`import()`方法，该方法可以动态地加载模块并返回一个`Promise`对象。在 Vue 中，我们可以将组件的定义写成一个返回`Promise`对象的函数，然后使用`Vue.component`方法进行注册。在组件被渲染时，Vue 会调用该函数并通过`Promise`的`then`方法获取组件定义对象，从而完成组件的渲染。


## 21、Vue函数组件的优势和原理
Vue函数组件是通过 Vue 3 新增的`createComponent()`工厂函数实现的。`createComponent()`函数接受一个对象作为参数，包含了组件的各种选项和方法，最终返回一个虚拟节点（VNode）作为组件的实例。在`render()`函数中，我们可以将函数组件定义的内容渲染成 HTML/JSX 元素，并向父组件返回这个元素。
> 在底层实现上，Vue 函数组件本质上是一个只包含`render()`函数的对象，它没有实例、生命周期钩子函数等，同样也不支持模板语法和自定义指令等功能。它通过`render()`函数计算组件的输出，返回一个VNode虚拟节点，最终渲染成真实的 DOM 元素。

Vue函数组件的优势包括：
1. 简洁：函数组件的定义方式更加简洁，没有类组件的繁琐结构。
2. 性能高：由于没有实例化过程，渲染速度更快。
3. 可复用性强：函数组件可以像普通函数一样多次调用，方便在各个组件中重复使用。
4. 维护成本低：由于代码量较少，维护起来相对简单。

Vue函数组件的原理是将函数组件转换为一个虚拟节点（Virtual DOM），然后通过`diff`算法与旧的虚拟节点进行比较，最终生成一颗新的虚拟节点树。这个过程中，Vue 会自动检测变化并更新视图。具体实现是通过 Vue 的模板编译器将模板解析成 render 函数，然后再将 render 函数转换成虚拟节点树。


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


## 25、v-model是如何实现的?
1. `v-bind`绑定响应式数据；
2. 通过`oninput`触发事件获取当前`$event.target.value`，然后赋值给当前变量。
```html
<input
  :value="value"
  @input="event => value = event.target.value">
```


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


## 27、Vue.use是干什么的？原理是什么？
`Vue.use()`是Vue.js提供的插件安装方法，用于全局注册Vue.js插件。
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

::: danger `Vue.use()`原理
1. 插件是一个对象或函数，在对象上提供`install`方法或在函数中直接定义`install`方法。
2. 调用`Vue.use(插件)`，会检查插件是否已经安装过，如果安装过则直接返回，否则执行插件的`install`方法。
3. 在执行`install`方法时，会将Vue构造函数作为参数传入，使得插件可以使用Vue的功能，同时也可以在Vue原型链上扩展新的方法或属性，实现对Vue.js的功能增强。
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
  使用<br>
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


## 31、keep-alive平时在哪里使用？原理是什么？
`<keep-alive>`是Vue.js内置组件，用于缓存动态组件或者组件的状态，从而提高应用的性能。
::: danger 使用场景
1. **在路由中缓存路由组件**：可以通过在`<router-view>`中嵌套`<keep-alive>`组件来缓存路由组件的状态，从而避免每次切换路由时都重新渲染路由组件，提升页面加载速度和用户体验。
2. **在动态组件中缓存组件的状态**：有些组件是在运行时才创建并销毁的，例如对话框、折叠面板等。这种情况下，可以将动态组件包裹在一个`<keep-alive>`标签中，以便缓存组件的状态，避免每次打开或关闭组件时都重新渲染组件。
3. **在组件中手动控制缓存**：如果我们需要手动控制一个组件的缓存，可以使用`<keep-alive>`的`include`和`exclude`属性来指定要缓存或排除的组件名称。
:::
::: danger 实现原理
1. `keep-alive`在第一次渲染时会渲染其第一个子组件，同时记录该子组件的 VNode；
2. 当需要再次渲染的时候，`keep-alive`会获取其第一个子组件的`VNode`对象，并根据黑白名单等条件决定是否缓存该组件实例；
3. 如果需要缓存，则根据组件的`CID`和`tag`生成缓存`Key`，将组件实例和其对应的`Key`缓存起来；
4. 在下一次渲染时，如果需要渲染被缓存的组件，则从缓存中获取并复用缓存的组件实例。
:::


## 32、谈谈Vue的性能优化有哪些?
1. **减少不必要的计算和渲染**：使用`computed`属性和`v-if/v-show`指令来避免不必要的计算和渲染，提高组件的更新效率。
2. **合理使用`v-for`指令**：避免在`v-for`循环中使用复杂表达式或者方法，可以通过在`computed`或`methods`中预处理数据来提高性能。
3. **避免频繁操作DOM**：合理使用`key`属性和`v-html/v-text`指令，尽量避免频繁操作DOM，减少页面重渲染次数。
4. **使用异步组件**：将大型组件分割成异步加载的子组件，在需要时再进行加载，提高首屏加载速度和用户体验。
5. **优化网络请求**：使用CDN加速、启用gzip压缩等方式优化静态资源请求，使用懒加载等技术优化动态加载请求。
6. **图片懒加载**：当图片不在可视区域内时不立即加载，只有当滚动到该图片所在位置时才进行加载，减少页面初始加载时间和流量消耗。
7. **开启生产环境编译模式**：在构建过程中开启生产环境编译模式，可以去除一些开发时用于调试的代码和警告，提升运行时性能。


## 33、vue中使用了哪些设计模式?
1. **观察者模式**：Vue的响应式系统基于观察者模式实现，当数据发生变化时，会通知所有关联的观察者进行更新。
2. **发布订阅模式**：Vue的事件系统也是基于发布订阅模式实现的，组件之间可以通过事件来进行通信。
3. **代理模式**：Vue的虚拟DOM采用了代理模式，对真实DOM进行了封装，提供了更加便捷的API操作。
4. **工厂模式**：Vue中组件的创建和销毁都是通过工厂模式实现的，使得组件的创建和管理更加灵活。
5. **MVVM模式**：Vue采用MVVM（Model-View-ViewModel）模式，将视图与数据分离，通过ViewModel实现双向绑定，提高了代码的可维护性和可测试性。


## 34、vue中Watch的 deep:true 是如何实现的？
在Vue中，当使用`watch`监听对象时，可以通过设置`deep:true`选项来深度监听对象的变化。
::: danger 原理
当设置`deep:true`时，`watch`会递归遍历对象的所有属性，并为每个属性创建一个独立的观察者，这些观察者会在对象属性值发生变化时触发更新操作。

具体实现步骤如下:
1. 当使用`watch`监听一个对象时，Vue会为该对象创建一个观察者（Watcher）。
2. 如果设置了`deep:true`选项，则对该对象进行递归遍历。
3. 对于每个属性，创建一个新的观察者，同时将该观察者添加到该属性的依赖列表中。
4. 当对象的某个属性值发生变化时，会通知该属性的所有观察者进行更新。
5. 如果该属性是一个对象，则递归遍历该对象的所有属性，并为每个属性创建独立的观察者。
6. 如果数组中的某个元素发生变化，则会触发数组的依赖更新，但不会递归遍历数组元素的属性。
:::


## 35、Vue3速度快的原因？Vue3 为何比 Vue2 快？
::: tip Vue3为何比Vue2快？
Vue3比Vue2性能快1.2到1.5倍。
- `proxy`响应式
- `PatchFlag`
  > 用于描述VNode节点上的一些特殊属性是否存在或已更改，以便在更新DOM时快速定位和应用变化
- `SSR`优化
  - 当有大量静态的内容时候，这些内容会被当做纯字符串推进一个buffer里面， 即使存在动态的绑定，会通过模板插值嵌入进去。这样会比通过虚拟dmo来渲染的快上很多很多。
  - 当静态内容大到一定量级时候，会用`_createStaticVNode`方法在客户端去生成一个`static node`， 这些静态`node`，会被直接`innerHtml`，就不需要创建对象，然后根据对象渲染。
- `tree-shaking`(摇树优化)
  - `tree-shaking`即在构建工具构建后消除程序中无用的代码，来减少包的体积。
    > 相比Vue2导入整个Vue对象，Vue3支持按需导入，只打包需要的代码。`Tee-shaking`依赖 ES6 模块语法的静态结构(即`import`和`export`)，导入编译阶段的静态分析，找到没有引入的模块并打上标记。像我们在项目中如果没有引入`Transition`、`Keep-alive`等不常用的组件，那么对应的代码就不会打包进去。
- `diff`算法优化
  - Vue2中的虚拟`dom`是进行全量的对比
  - Vue3新增了静态标记（`PatchFlag`），只比对带有 PF 的节点，并且通过 Flag 的信息得知 当前节点要比对的具体内容。
- `hoistStatic`静态提升
  - Vue2中无论元素是否参与更新, 每次都会重新创建, 然后再渲染
  - Vue3中对于不参与更新的元素, 会做静态提升, 只会被创建一次, 在渲染时直接复用即可
- `cacheHandlers`事件侦听器缓存
  - 默认情况下`onClick`会被视为动态绑定, 所以每次都会去追踪它的变化
  - 但是因为是同一个函数，所以没有追踪变化, 直接缓存起来复用即可
:::
::: tip Vue3比Vue2有什么优势
- 性能更好
- 体积更小
- 更好的 TS 支持
- 更好的代码组织
- 更好的逻辑抽离
- 更多新功能
:::
::: tip Vue3升级了哪些功能？
- `createApp`
- `emits`属性
- 生命周期
- 多事件
- `Fragment`
- 移除`.sync`
- 异步组件的写法
- 移除`filter`
- `Teleport`
- `Suspense`
- `Composition API`
:::


## 36、什么是递归组件？举个例子说明下？
在组件中内使用组件本身，简单来说就是组件自己调用自己。
> 所谓递归组件，就是在当前组件内部引用自身，有个前提条件，组件必须声明`name`属性。

在我工作中会出现递归组件的情况有：
- “树”组件：用来展示文件层级的。
- 左侧导航栏：根据路由层级生成的导航菜单。
- 多级表格（嵌套的表格）。
- 评论嵌套回复
```html
<template>
  <div class="myTree">
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <p>{{item.name}}</p>
        <div v-if="item.cList">
          <tree-menus :list="item.cList"></tree-menus>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "treeMenus",
  props: {
    list: Array,
  },
};
</script>
```



## 37、怎样理解 Vue 的单向数据流？
Vue 的单向数据流是指数据在 Vue 组件中的传递是单向的，即父组件可以通过 props 将数据传递给子组件，在子组件中不能直接修改这些数据。
> 如果需要修改，必须通过`$emit`触发事件由子组件向父组件传递数据来实现，若果非要直接修改`prop`会抛出警告。

这种单向数据流的设计使得组件之间的通信更加可预测和可维护，也有利于代码的复用和测试。


## 38、为什么不建议用index作为key？
**首先明白key的作用？**
> `key`的特殊`attribute`主要用在 Vue 的虚拟 DOM 算法，在新旧`nodes`对比时辨识`VNodes`。如果不使用`key`，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。而使用`key`时，它会基于`key`的变化重新排列元素顺序，并且会移除`key`不存在的元素。
- `key`在`diff`算法的作用，就是用来判断是否是同一个节点。
- Vue 中使用`虚拟 dom`且根据`diff`算法进行新旧 DOM 对比，从而更新真实`dom`，`key`是`虚拟 DOM`对象的唯一标识, 在`diff`算法中`key`起着极其重要的作用，`key`可以管理可复用的元素，减少不必要的元素的重新渲染,也要让必要的元素能够重新渲染。

::: tip 总结
- 用`index`作为`key`时，在对数据进行，逆序添加，逆序删除等破坏顺序的操作时，会产生没必要的真实`DOM`更新，从而导致效率低
- 用`index`作为`key`时，如果结构中包含输入类的`DOM`，会产生错误的`DOM`更新
- 在开发中最好每条数据使用唯一标识固定的数据作为`key`，比如后台返回的 ID，手机号，身份证号等唯一值
- 如果不存在对数据逆序添加，逆序删除等破坏顺序的操作时，仅用于渲染展示用时，使用`index`作为`key`也是可以的（但是还是不建议使用，养成良好开发习惯）
:::

**为什么key 值不建议用index？**
> 尤大大在vue2文档中明确支出：建议尽可能在使用`v-for`时提供`key`属性，除非遍历输出的DOM内容非常简单，或者是刻意依赖默认行为以获取性能上的提升。简单来说就是如果使用`index`做`key`，那么直接底层帮你传进去好了，又何必多此一举。
- **1、性能消耗**<br>
  使用`index`做`key`，破坏顺序操作的时候， 因为每一个节点都找不到对应的`key`，导致部分节点不能复用,所有的新`vnode`都需要重新创建。
  - 例子一: 使用`index`做`key`，点击`新增数据`按钮新增一条数据，只需要将新增这一条数据的`dom`渲染即可，我们看看实际效果。
    ```html
    <template>
      <div id="app">
        <button @click="handleClick">添加数据</button>
        <ul>
          <li v-for="(item, index) in list" :key="index">{{ item.id }} - {{ item.name }} - {{ item.age }}</li>
        </ul>
      </div>
    </template>
    <script lang="ts">
    export default {
      data () {
        return {
          list: [
            { id: 1, name: '张三', age: 23 },
            { id: 2, name: '李四', age: 24 }
          ]
        }
      },
      methods: {
        handleClick () {
          const obj = { id: 3, name: '王五', age: 25 }
          this.list = [obj, ...this.list]
        }
      }
    }
    </script>
    ```
    - 打开浏览器的开发工具，修改数据的文本，后面加上`-我没变`，此时数据如下
      ![202303091056495.png](http://img.itchenliang.club/img/202303091056495.png)
    - 点击`添加数据`按钮，可以发现我们的`dom`整体都变了，很奇怪，我们明明只是新增了一条数据，那么只需要将新增这一条数据的dom渲染出来就行了，而实际是所有`dom`都改变了，整体而言性能方面消耗就大了(数据量大的话)。
      ![202303091058074.png](http://img.itchenliang.club/img/202303091058074.png)
    - 我们来看看上面的diff算法整体过程图
      ![202303091102557.png](http://img.itchenliang.club/img/202303091102557.png)
      当我们在前面加了一条数据时`index`顺序就会被打断，导致新节点`key`全部都改变了，所以导致我们页面上的数据都被重新渲染了。
  - 例子二: 在`例子一`的基础上将`key`修改成唯一不重复的值时。
    ```html
    <li v-for="(item, index) in list" :key="item.id">{{ item.id }} - {{ item.name }} - {{ item.age }}</li>
    ```
    同样打开浏览器的开发工具，修改数据的文本，后面加上`-我没变`，然后点击`新增数据`按钮，效果如下:
    ![202303091106468.png](http://img.itchenliang.club/img/202303091106468.png)
    从上图可以看出，我们点击`新增数据`按钮时，只是在添加了新增的一条数据的`dom`，而我们其他的`dom`并没有重新渲染。
  - 例子三: 计算出使用`index`作为`key`渲染数据量较大的开销
    - 使用`index`作为`key`
      ```html
      <template>
        <div id="app">
          <button @click="handleClick">添加数据</button>
          <ul>
            <li v-for="(item, index) in list" :key="index">
              {{ item.id }} - {{ item.name }}
            </li>
          </ul>
        </div>
      </template>
      <script lang="ts">
      export default {
        data () {
          return {
            list: []
          }
        },
        methods: {
          handleClick () {
            const obj = { id: 'student-10000', name: 'student10000' }
            this.list.unshift(obj)
          }
        },
        created () {
          for (let i = 0; i < 10000; i++) {
            this.list.push({
              id: 'student-' + i,
              name: 'student-' + i
            })
          }
        },
        beforeUpdate () {
          console.time('for')
        },
        updated () {
          console.timeEnd('for')
        }
      }
      </script>
      ```
      点击`新增数据`按钮，看到控制台输出时间`for: 44.164794921875 ms`，即代表我们操作一条数据，`dom`渲染更新耗时。
    - 使用`item.id`作为key: 将前一个例子的`:key="index"`改成如下
      ```html
      <li v-for="(item, index) in list" :key="item.id">
        {{ item.id }} - {{ item.name }}
      </li>
      ```
      点击`新增数据`按钮，看到控制台输出时间`for: 36.15087890625 ms`，即代表我们操作一条数据，`dom`渲染更新耗时。从两个结果对比来看，使用`index`为`key`的情况耗时更长。
- **2、数据错位**<br>
  上面例子可能觉得用`index`做`key`只是影响页面加载的效率，认为少量的数据影响不大，那面下面这种情况，可能用`index`就可能出现一些意想不到的问题了，还是上面的场景，这时我先再每个文本内容后面加一个`input`输入框，并且手动在输入框内填写一些内容，然后通过`button`向前追加一位同学看看
  ```html
  <template>
    <div id="app">
      <button @click="handleClick">添加数据</button>
      <ul>
        <li v-for="(item, index) in list" :key="index">
          {{ item.id }} - {{ item.name }}
          <input type="text">
        </li>
      </ul>
    </div>
  </template>
  <script lang="ts">
  export default {
    data () {
      return {
        list: [
          { id: 1, name: '张三', age: 23 },
          { id: 2, name: '李四', age: 24 }
        ]
      }
    },
    methods: {
      handleClick () {
        const obj = { id: 3, name: '王五', age: 25 }
        this.list.unshift(obj)
      }
    }
  }
  </script>
  ```
  手动在每一项后面input中输入对应的名称
  ![202303091127227.png](http://img.itchenliang.club/img/202303091127227.png)
  然后点击`新增数据`按钮，结果如下
  ![202303091128136.png](http://img.itchenliang.club/img/202303091128136.png)
  这时候我们就会发现，在添加之前输入的数据错位了。添加之后王五的输入框残留着张三的信息，这很显然不是我们想要的结果。diff算法更新流程图如下
  ![2023030911285610.png](http://img.itchenliang.club/img/2023030911285610.png)
  从上面比对图可以看出来这时因为采用`index`作为`key`时，当在比较时，发现虽然文本值变了，但是当继续向下比较时发现`DOM`节点还是和原来一摸一样，就复用了，但是没想到`input`输入框残留输入的值，这时候就会出现输入的值出现错位的情况。
  - 将上面的`:key="index"`，改成`:key="item.id"`效果图如下:
    ![202303091133392.png](http://img.itchenliang.club/img/202303091133392.png)
    可以看出我们的数据错位问题也就修复了，此时的diff算法更新流程图如下
    ![202303091135519.png](http://img.itchenliang.club/img/202303091135519.png)

**解决方案**
> 只要保证`key`唯一不变就行，一般在开发中用的比较多就是下面三种情况:
- 在开发中最好每条数据使用唯一标识固定的数据作为`key`，比如后台返回的 ID，手机号，身份证号等唯一值
- 可以采用`Symbol`作为`key`，`Symbol`是 ES6 引入了一种新的原始数据类型`Symbol`，表示独一无二的值，最大的用法是用来定义对象的唯一属性名。 
  ```js
  let a = Symbol('测试')
  let b = Symbol('测试')
  console.log(a === b) // false
  ```
- 可以采用`uuid`作为`key`，`uuid`是 Universally Unique Identifier 的缩写，它是在一定的范围内（从特定的名字空间到全球）唯一的机器生成的标识符。


## 39、怎么缓存当前的组件？缓存后怎么更新？
开发中缓存组件使用`keep-alive`组件。
- `keep-alive`是vue中的内置组件，能在组件切换过程中将状态保留在内存中，防止重复渲染DOM
- `keep-alive`包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们
- `keep-alive`可以设置以下`props`属性：
  - `include`: 字符串或正则表达式。只有名称匹配的组件会被缓存
  - `exclude`: 字符串或正则表达式。任何名称匹配的组件都不会被缓存
  - `max`: 数字。最多可以缓存多少组件实例
```html
<!-- 基本用法 -->
<keep-alive>
  <component :is="view"></component>
</keep-alive>
<!-- 使用includes和exclude： -->
<keep-alive include="a,b">
  <component :is="view"></component>
</keep-alive>
<keep-alive :include="/a|b/">
  <component :is="view"></component>
</keep-alive>
<keep-alive :include="['a', 'b']">
  <component :is="view"></component>
</keep-alive>
```

**更新方式**: 设置了`keep-alive`缓存的组件，会多出两个生命周期钩子（`activated`与`deactivated`）
- `activated`: 被`keep-alive`缓存的组件激活时调用。
- `deactivated`: 被`keep-alive`缓存的组件失活时调用。
  - 首次进入组件时：`beforeRouteEnter` > `beforeCreate` > `created` > `mounted` > `activated` > `... ...` > `beforeRouteLeave` > `deactivated`
  - 再次进入组件时：`beforeRouteEnter` > `activated` > `... ...` > `beforeRouteLeave` > `deactivated`
```html
<!-- App.vue -->
<div id="app" class='wrapper'>
  <keep-alive>
    <!-- 需要缓存的视图组件 --> 
    <router-view v-if="$route.meta.keepAlive"></router-view>
  </keep-alive>
  <!-- 不需要缓存的视图组件 -->
  <router-view v-if="!$route.meta.keepAlive"></router-view>
</div>

<!-- 具体的组件 -->
<template>

</template>
<script>
export default {
  name: 'Demo',
  methods: {
    // 获取数据
    listGet ()
  },
  activated () {
    // 激活时获取数据
    this.listGet()
  }
}
</script>
```


## 40、Vue中组件和插件有什么区别？
Vue中组件和插件都是扩展Vue应用的方式，但它们有不同的作用和使用方式。
::: tip Vue组件是什么？
组件是一些独立的UI元素，用于构建页面布局，例如按钮、输入框等。组件通常是通过.vue文件来定义的，包括`template`、`script`和`style`三个部分。
- 常常用于构建单个页面，用于复用和维护；
- 组件可以采用`Vue.component`方法或`import`方式引入，作为Vue实例的子组件使用。
:::
::: tip Vue插件是什么？
插件则需要创建一个js文件(包含`install`)然后在应用程序中进行引入，并且在Vue实例上注册。插件是用于扩展Vue的一些功能，可以提供一些全局方法、指令、过滤器等。通过`Vue.use()`方法安装插件后，这些功能就可以在整个Vue应用中使用。
:::


## 41、Composition API 与 Options API 有什么不同？
对于vue2中`Options API`开发的项目，普遍会存在以下问题: 
- 代码的可读性随着组件变大而变差
  - 一个功能往往需要在不同的vue配置项中定义属性和方法，比较分散
  - 项目过大后`methods`中可能包含几十个方法，往往分不清哪个方法对应着哪个功能
  - **耦合度相对较高**
- 每一种代码复用的方式，都存在缺点，例如: `data`中定义的变量每个组件都需要重新定义，例如分页数据定义
  ```js
  // Options API：每个组件都需要定义如下结构
  export default {
    data () {
      return {
        list: {
          page: 1,
          size: 10,
          total: 0,
          data: []
        }
      }
    },
    methods: {
      getList () {
        // ...
      }
    }
  }

  // Composition API：则直接封装成hooks，每次直接引入调用即可
  import { reactive } from 'vue'
  function usePage () {
    const list = reactive({
      page: 1,
      size: 10,
      total: 0,
      data: []
    })
    const getList = (url, filters) => {
      axios({
        url: url,
        method: 'post',
        data: filters
      }).then(res => {
        list.data = res.data.data
        list.total = res.data.total
      })
    }
    return {
      list,
      getList
    }
  }
  // 在不同组件都调用该方法即可
  const { list, getList } = usePage()
  ```
- `TypeScript`支持有限
::: tip Options API
Options API，即大家常说的选项API，即以`vue`为后缀的文件，通过定义`methods`，`computed`，`watch`，`data`等属性与方法，共同处理页面逻辑
```js
export default {
  data () {
    return {
      功能A,
      功能B
    }
  },
  methods: {
    功能A,
    功能B
  },
  computed: {
    功能A,
    功能B
  }
}
```
上面代码中当组件变得复杂，导致对应属性的列表也会增长，这可能会导致组件难以阅读和理解。
:::
::: tip Composition API
又称组合式API，组件根据逻辑功能来组织的，一个功能所定义的所有API会放在一起(**更加的高内聚，低耦合**)，即使项目很大，功能很多，我们都能快速定位到这个功能所用到的所有API。

两个优点: **逻辑组织，逻辑复用**
```js
// 功能A
function useA () {
  const aData = reactive({
    count: 0
  })
  const aFunc = () => {

  }
  const aComputed = computed(() => {
    return aData.count * 2
  })
  return {
    aData,
    aFunc,
    aComputed
  }
}
// 功能B
function useB () {
  const bData = reactive({
    count: 0
  })
  const bFunc = () => {

  }
  const bComputed = computed(() => {
    return bData.count * 2
  })
  return {
    bData,
    bFunc,
    bComputed
  }
}
// 使用，可以在多个组件导入使用
const { aData, aFunc, aComputed } = useA()
const { bData, bFunc, bComputed } = useB()
```
上面的代码可以用下图来表示
![202303091441291.png](http://img.itchenliang.club/img/202303091441291.png)
:::

两者区别的对比图: 每一种颜色代表某一个功能的所有API
![2023030914512710.png](http://img.itchenliang.club/img/2023030914512710.png)

**Composition API能与Options API一起使用吗**
> 是可以的
```html
<template>
  <div>
    <p>count: {{ count }}</p>
    <button @click="inrement">自增</button>
  </div>
</template>
<script lang="ts">
import { getCurrentInstance, onMounted } from 'vue'
export default {
  data () {
    return {
      count: 0
    }
  },
  setup(props) {
    const instance = getCurrentInstance()
    onMounted(() => {
      console.log(instance.proxy.count)
    })
  },
  methods: {
    inrement () {
      this.count++
    }
  }
}
</script>
```


## 43、子组件可以直接改变父组件的数据么，说明原因？
子组件不可以直接改变父组件的数据。这样做主要是为了维护父子组件的单向数据流。每次父级组件发生更新时，子组件中所有的`prop`都将会刷新为最新的值。如果强行这样做了，Vue会在浏览器的控制台中发出警告。
> Vue提倡单向数据流，即父级`props`的更新会流向子组件，但是反过来则不行。这是为了防止意外的改变父组件状态，使得应用的数据流变得难以理解，导致数据流混乱。如果破坏了单向数据流，当应用复杂时，`debug`的成本会非常高。<br>
> 只能通过`$emit`派发一个自定义事件，父组件接收到后，由父组件修改。


## 44、怎么监听vuex数据的变化？
::: tip Vue2-vuex
基础数据定义
```js
// vuex
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    updateCount (state, payload) {
      state.count += 1
    }
  }
})
```
- **方案一**: 在组件中通过组件的`watch`方法来做
  ```html
  <template>
    <div>
      <p>{{ count }}</p>
      <button @click="updateCount">添加数据</button>
    </div>
  </template>
  <script lang="ts">
  import { count } from 'console';
  import { mapMutations, mapState } from 'vuex'
  export default {
    computed: {
      ...mapState({
        count: state => state.count
      })
    },
    methods: {
      ...mapMutations(['updateCount'])
    },
    watch: {
      count: {
        handler(val, old) {
          console.log(val, old)
        }
      }
    }
  }
  </script>
  ```
- **方案二**: vuex中`store`对象本身提供了`watch`函数 ,可以利用该函数进行监听
  ```js
  <template>
    <div id="app">
      <p>{{ count }}</p>
      <button @click="monitorCount">添加数据</button>
    </div>
  </template>
  <script lang="ts">
  import { mapMutations, mapState } from 'vuex'
  export default {
    data () {
      return {
        fn: null
      }
    },
    computed: {
      ...mapState({
        count: state => state.count
      })
    },
    methods: {
      ...mapMutations(['updateCount']),
      monitorCount () {
        this.updateCount()
        if (this.count >= 5) {
          // 停止监听
          this.fn()
        }
      }
    },
    created () {
      this.fn = this.$store.watch((state, getter) => {
        return state.count
      }, (val, old) => {
        console.log(val, old)
      })
    }
  }
  </script>
  ```
- **方案三**: vuex中`store`对象本身提供了`subscribe`函数用于订阅`store`的`mutation`
  ```html
  <template>
    <div>
      <p>{{ count }}</p>
      <button @click="monitorCount">添加数据</button>
    </div>
  </template>
  <script lang="ts">
  import { mapMutations, mapState } from 'vuex'
  export default {
    data () {
      return {
        fn: null
      }
    },
    computed: {
      ...mapState({
        count: state => state.count
      })
    },
    methods: {
      ...mapMutations(['updateCount']),
      monitorCount () {
        this.updateCount()
        if (this.count >= 5) {
          // 停止监听
          this.fn()
        }
      }
    },
    created () {
      this.fn = this.$store.subscribe((mutation, state) => {
        if (mutation.type === 'updateCount') {
          console.log(state.count)
        }
      })
    }
  }
  </script>
  ```
:::
::: tip Vue3-pinia
基础数据定义
- 注册pinia，main.ts
  ```js
  import { createApp } from 'vue'
  import { createPinia } from 'pinia'
  import App from './App.vue'

  const pinia = createPinia()

  const app = createApp(App)
  app.use(pinia)
  app.mount('#app')
  ```
- 定义store
  ```js
  import { defineStore } from 'pinia'
  export const useCounterStore = defineStore('counter', () => {
    const count = ref(0)
    function increment() {
      count.value++
    }
    return { count, increment }
  })
  ```

- **方案一**: 在组件中使用Composition API`watch`方法
  ```html
  <template>
    <div>
      <p>{{ counterStore.counter }}</p>
      <button @click="counterStore.increment">新增</button>
    </div>
  </template>
  <script lang="ts" setup>
  import useCounterStore from '@/stores/counter';
  import { watch } from 'vue'

  const counterStore = useCounterStore()

  watch(() => counterStore.counter, (val, old) => {
    console.log(val, old)
  })
  </script>
  ```
- **方案二**: 类似于 Vuex 的`subscribe`方法，你可以通过`store`的`$subscribe()`方法侦听`state`及其变化
  ```ts
  import useCounterStore from '@/stores/counter';
  const counterStore = useCounterStore()
  counterStore.$subscribe((mutation, state) => {
    if (mutation.type === 'direct' && mutation.storeId === 'counter') {
      console.log(state.counter)
    }
  })
  ```
:::


## 45、vue3自定义全局指令、局部指令？
::: tip 全局指令
```js
const app = createApp({})
// 使 v-focus 在所有组件中都可用
app.directive('focus', {
  // 在绑定元素的 attribute 前
  // 或事件监听器应用前调用
  created(el, binding, vnode, prevVnode) {
  },
  // 在元素被插入到 DOM 前调用
  beforeMount(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都挂载完成后调用
  mounted(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件更新前调用
  beforeUpdate(el, binding, vnode, prevVnode) {},
  // 在绑定元素的父组件
  // 及他自己的所有子节点都更新后调用
  updated(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载前调用
  beforeUnmount(el, binding, vnode, prevVnode) {},
  // 绑定元素的父组件卸载后调用
  unmounted(el, binding, vnode, prevVnode) {}
})

// 简化形式
app.directive('color', (el, binding) => {
  // 这会在 `mounted` 和 `updated` 时都调用
  el.style.color = binding.value
})
```
:::
::: tip 局部指令
任何以`v`开头的驼峰式命名的变量都可以被用作一个自定义指令。
```html
<input type="text" v-focus>
<script setup>
  // 在模板中启用 v-focus
  const vFocus = {
    mounted: (el) => el.focus()
  }
</script>
```
上面名称`vFocus`即可以在模板中以`v-focus`的形式使用。在没有使用`<script setup>`的情况下，自定义指令需要通过`directives`选项注册：
```js
export default {
  setup() {
    /*...*/
  },
  directives: {
    // 在模板中启用 v-focus
    focus: {
      /* ... */
    }
  }
}
```
:::
指令使用
```html
<div v-color="color"></div>
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
<!-- 动态指令参数 -->
<div v-example:[arg]="value"></div>
<!-- 指令修饰符 -->
<div v-example:foo.bar="baz">
binding 参数会是一个这样的对象：
{
  arg: 'foo',
  modifiers: { bar: true },
  value: /* `baz` 的值 */,
  oldValue: /* 上一次更新时 `baz` 的值 */
}
<!-- 组件上使用：不推荐 -->
<MyComponent v-demo="test" />
```


## 46、Vue computed实现原理？
当我们定义一个`computed`属性时，Vue 会在内部生成一个`Watcher`实例，并将其添加到响应式数据的依赖中。当该属性所依赖的数据发生修改时，`Watcher`实例会通知`computed`进行重新计算。为了提高计算效率，Vue 会缓存`computed`的计算结果，只有当相关数据发生变化时，才会重新计算。

当`computed`属性被访问时，如果该属性尚未被缓存，则会触发之前生成的`Watcher`实例进行计算，并将计算结果缓存，同时返回给访问`computed`属性的用户。在计算完成后，`Watcher`实例会通知订阅该`computed`属性的其他`Watcher`实例进行更新。


## 48、动态给vue的data添加一个新的属性时会发生什么？怎样解决？
会发现新的属性已经添加成功，但是视图并未刷新。
> 在于在Vue实例创建时，`obj.b`并未声明，因此就没有被Vue转换为响应式的属性(即没有通过`Object.defineProperty`拦截)，自然就不会触发视图的更新。

**解决方案**
- 使⽤Vue的`$set()`方法给对象添加新属性
- 定义一个全局的`key`在元素上绑定`key`，通过更新`key`来实现视图的更新。

**总结数据更新了视图未更新的两种情况**：
- 该属性不是在创建Vue对象时添加的，而是在创建Vue对象之后添加的，创建Vue对象时未声明该属性，没有被Vue转换为响应式属性，也就不会触发视图更新。
- Vue对象的属性太多，管理的变量太多，管理不过来，没有及时刷新到视图。这种情况可能会随机出现在不同的属性上，随着属性的增加，出现频率也会增加，最好的方式是重构，尽量减少Vue管理的变量。


## 49、v-if和v-show区别？
- `v-if`是根据判断条件来动态的增删`DOM`元素；
- `v-show`是根据判断条件来动态的进行显示和隐藏`DOM`元素，就是修改`display`属性在`block`和`none`切换；
- `v-if`的切换开销高，会触发回流重绘；
- `v-show`的初始渲染开销高；
  > 初始都会渲染，并且会执行具体的生命周期，如`created`，案例:在`el-tabs`中的就是使用`v-show`实现，如果在`el-tab-pane`中使用组件，并且在组件中分别输出`component1`和`component2`，可以看到初次渲染时两个数据都输出了。
- `v-show`的性能比`v-if`高；
- 如果需要频繁切换某个元素的显示/隐藏时，使用`v-show`会更加节省性能上的开销；
- 如果在运行时条件很少改变，使用`v-if`更好；


## 50、从0到1自己构架一个vue项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织？
可以选择vuejs官方提供的`create-vue`脚手架创建，或者使用vitejs提供的`create-vite`脚手架创建，或者使用`vue-cli`脚手架安装。
1. 安装node.js
2. 创建空项目并初始化`npm init -y`
3. 安装`vite`: `npm install vite`
4. 安装`vue`和`@vitejs/plugin-vue`: `npm install vue @vitejs/plugin-vue`
5. 创建`main.js`
6. 创建`App.vue`
7. 安装路由`vue-router`和状态管理`pinia`并配置
8. 安装组件库`element-plus`并配置

目录结构
```sh
- node_modules         项目依赖包的保存目录
- public               静态资源目录
  - index.html         首页入口.html文件
- src                  源码目录
  - api                接口目录
  - components         公共组件目录
  - assets             资源目录，会被编译
  - routes             路由目录
  - store              状态管理目录
  - styles             样式文件目录
  - utils              工具目录
  - views              页面视图目录
  - App.vue            根组件
  - main.js            入口js文件
- vite.config.js       vite项目配置文件
- package.json         npm包配置文件，定义项目的npm脚本、依赖包等信息
- .gitignore           用来配置那些文件不归git管理
- README.md            项目的说明文档，markdown格式
```


## 51、Vue2 的 Vue3 区别？
1. vue2和vue3双向数据绑定原理发生了改变
  - vue2: 利用了es5的一个API`Object.definepropert()`对数据进行劫持 结合发布订阅模式来实现的。
  - vue3: 使用了es6的`proxy`API对数据进行处理
2. Vue3支持碎片（`Fragments`）
  - 就是说vue3可以拥有多个根节点
3. Composition API
  - Vue2 与vue3 最大的区别: vue2使用`Options API`(选项式API)，对比vue3`Composition API`(组合式API)。选项式API在代码里分割了不同得属性：`data`,`computed`,`methods`等；组合式API能让我们使用方法来分割，相比于旧的API使用属性来分组，这样代码会更加简便和整洁。
4. 创建响应式数据的方式不同
  - vue2: 采用在`options`的`data`属性中定义
  - vue3: 则是使用`ref`、`reactive`等响应式API定义
5. 生命周期不同
6. vue3更好地支持typescript


## 52、Vue3带来了什么改变？Vue3带来了什么新特性？
改变:
- 性能的提升，打包大小减少41%，初次渲染快55%, 更新渲染快133%，内存减少54%
- 使用Proxy代替defineProperty实现响应式，重写虚拟DOM的实现和Tree-Shaking
- diff算法优化
- 移除`.sync`改为`v-model`参数
- 移除`filter`过滤器

新特性:
- Composition API(组合式API)，`setup`作为组合函数的入口函数
- 单文件组件中的组合式 API 语法糖 (`<script setup>`): vue3.2新增
- `Teleport`组件: 传送门，之前都是放在APP里，用这个可随意放置
- `Emits`组件选项: 
- `Fragments`片段: template下可以有多个根节点
- 单文件组件中的状态驱动的 CSS 变量 (`<style> 中的 v-bind`)
- `Suspense`: 可以嵌套层级中等待嵌套的异步依赖项


## 53、Vue3响应式数据的判断？
- `isRef`: 检查一个值是否为一个`ref`对象
- `isReactive`: 检查一个对象是否是由`reactive`创建的响应式代理
- `isReadonly`: 检查一个对象是否是由`readonly`创建的只读代理
- `isProxy`: 检查一个对象是否是由`reactive`、`readonly`、`shallowReactive`或`shallowReadonly`方法创建的代理
```ts
const foo = ref('foo')
const bar = reactive({ count: 0 })
const copyBar = readonly(bar)
console.log(isRef(foo)) // true
console.log(isReactive(bar)) // true
console.log(isReadonly(copyBar)) // true
console.log(isProxy(foo)) // false
```


## 54、Vue3的常用 Composition API有哪些？
- `setup()`: 组件中使用组合式 API 的入口
- `ref()`
- `reactive()`
- `readonly()`
- `computed()`
- `watch()`
- `watchEffect()`
- `isRef()`
- `unref()`
- `toRef()`
- `toRefs()`
- `isProxy()`
- `isReactive()`
- `isReadonly()`
- `markRow()`
- `toRaw()`
- `provide()`、`inject()`
- `onMounted()`
- `onActivated()`


## 55、Composition API 实现代码逻辑复用？
封装成一个个的`hooks`函数，例如:
```ts
import { reactive } from 'vue'
function usePage () {
  const list = reactive({
    page: 1,
    size: 10,
    total: 0,
    data: []
  })
  const getList = (url, filters) => {
    axios({
      url: url,
      method: 'post',
      data: filters
    }).then(res => {
      list.data = res.data.data
      list.total = res.data.total
    })
  }
  return {
    list,
    getList
  }
}
```
在组件中使用只需要
```ts
import { usePage } from '@/hooks'
const { list, getList } = usePage()
```


## 56、Vue3 如何实现响应式？
通过调用`ref`、`reactive`等组合式函数API创建响应式数据
```ts
const count = ref(0)
const user = reactive({
  name: '张三',
  age: 23
})
```


## 57、Vue3的v-model参数用法？
默认情况下，`v-model`在组件上都是使用`modelValue`作为`prop`，并以`update:modelValue`作为对应的事件。我们可以通过给`v-model`指定一个参数来更改这些名字：
```html
<template>
  <div>
    <input type="text" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <input type="text" :value="title" @input="$emit('update:title', $event.target.value)" />
  </div>
</template>
<script setup>
defineProps({
  modelValue: string
  title: string
})
defineEmits(['update:title', 'update:modelValue'])
</script>
```
组件使用
```html
<my-component v-model:title="bookTitle" v-model="username"></my-component>
```


## 58、watch 和 watchEffect 的区别？
**watch**
- `watch`显示指定依赖数据，依赖数据更新时执行回调函数
- 具有一定的惰性`lazy`第一次页面展示的时候不会执行，只有数据变化的时候才会执行(设置`immediate: true`时可以变为非惰性，页面首次加载就会执行)
- 监视`ref`定义的响应式数据时可以获取到原值
- 既要指明监视的属性，也要指明监视的回调
```html
<template>
  <div style="padding: 10px;">
    <div>
      <p>count: {{ count }}</p>
      <button @click="count++">自增</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const count = ref(0)
// 方式一
// watch(() => count.value, (val, old) => {
//   console.log('watch', val)
// })
// 方式二
watch(count, (val, old) => {
  console.log('watch', val)
})
</script>
```

**watchEffect**
- `watchEffect`自动收集依赖数据，依赖数据更新时重新执行自身
- 立即执行，没有惰性，页面的首次加载就会执行
- 无法获取到原值，只能得到变化后的值
- 不用指明监视哪个属性，监视的回调中用到哪个属性就监视哪个属性
```html
<template>
  <div style="padding: 10px;">
    <div>
      <p>count1: {{ count1 }}</p>
      <button @click="count1++">自增</button>
    </div>

    <div>
      <p>count2: {{ count2 }}</p>
      <button @click="count2++">自增</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, watchEffect } from 'vue';

const count1 = ref(0)
const count2 = ref(0)
watchEffect(() => {
  console.log('watch effect', count1.value, count2.value)
})
</script>
```
上面代码无论点击`count1自增`按钮还是`count2自增按钮`，控制台都会输出结果，并且初次时会立即执行。


## 59、setup 中如何获取组件实例？
由于`setup`是`Composition API`没有`this`，所以我们需要使用`getCurrentInstance`方法来获取当前组件实例。
```ts
import { onMounted, getCurrentInstance } from 'vue'
const ctx = getCurrentInstance().proxy
```


## 60、如何理解ref、toRef和toRefs？
在 Vue 中，`ref`、`toRef`和`toRefs`都是用来处理响应式数据的API。
- `ref`: 用来创建一个响应式对象，并将其封装在一个对象中。可以通过`.value`访问和修改这个响应式对象的值。
  ```js
  import { ref } from 'vue'
  const count = ref(0)
  console.log(count.value) // 输出 0
  count.value++ // 修改值
  console.log(count.value) // 输出 1
  ```
  初次之外，`ref`还可用于获取`Dom`
  ```html
  <template>
    <div ref="eleDom">ref-dom-test</div>
  </template>
  <script setup>
    import { ref, onMounted } from 'vue'
    const eleDom = ref(null)
    onMounted(() => {
			console.log(eleDom.value.innerHTML) // ref-dom-test
		})
  </script>
  ```
- `toRef`: 用来创建一个响应式引用，它接受两个参数：第一个参数是一个响应式对象，第二个参数是这个对象中的一个属性名。调用`toRef`后会返回一个仅包含该属性的响应式对象引用。
  ```js
  import { reactive, toRef, ref } from 'vue'
  const state = reactive({
    count: 0,
  })
  const countRef = toRef(state, 'count')
  console.log(countRef.value) // 输出 0
  state.count++
  console.log(countRef.value) // 输出 1


  const state = ref({
    name: '张三',
    age: 23
  })
  const res = toRef(state.value, 'name')
  console.log(res.value) // 张三
  state.value.name = '李四'
  console.log(res.value) // 李四
  res.value = '王五'
  console.log(state.value.name) // 王五
  ```
- `toRefs`: 用来将一个响应式对象转化为普通对象，但是每个属性都会变成一个响应式对象引用。
  ```js
  import { reactive, toRefs } from 'vue'

  const state = reactive({
    count: 0,
    name: 'Vue',
  })
  const refs = toRefs(state)
  console.log(refs.count.value) // 输出 0
  console.log(refs.name.value) // 输出 'Vue'
  state.count = 1
  state.name = 'Vue3'
  console.log(refs.count.value) // 输出 1
  console.log(refs.name.value) // 输出 'Vue3'
  ```

总结: 
- `ref`创建一个响应式对象
- `toRef`创建一个响应式对象引用
- `toRefs`将整个响应式对象转化为普通对象，但每个属性都会变成一个响应式对象引用。


## 61、Proxy 相比于 defineProperty 的优势
`Object.defineProperty()`的问题主要有三个：
- 能监听数组的变化，但是设置值时会触发读取所有的数据，会非常影响性能的，再加上大部分时间数组长度我们并不确定，无法提请打上getter/setter，而且如果数组长度很大也会造成性能问题。
- 必须深层遍历嵌套的对象
- 必须遍历对象的每个属性

Proxy 还拥有以下优势：
- `proxy`有多达13种拦截方法，不限于`apply`、`ownKeys`、`deleteProperty`、`has`等是`object.defineProperty`不具备的。
- `proxy`可以直接监听数组的变化，`proxy`可以直接监听对象而非属性。
- `proxy`返回的是一个新对象，我们可以只操作新对象达到目的，不需要深度遍历监听，性能高于`Object.defineProperty`而`Object.defineProperty`只能遍历对象属性直接修改。
- `Proxy`作为新标准受到浏览器厂商的重点关注和性能优化，相比之下`Object.defineProperty()`是一个已有的老方法。

`Object.defineProperty`的优势如下:
- 兼容性好，支持IE9


## 62、vue2为什么不使用proxy？
主要`Proxy`是 es6 提供的新特性，兼容性不好，最主要的是这个属性无法用`polyfill`来兼容
> Polyfill 指的是用于实现浏览器并不支持的原生 API 的代码。


## 63、vue3性能比vue2好的原因？
1. **更快的渲染速度**：Vue3 借鉴了 React 的思路，使用了虚拟DOM中的静态提升和基于树的组件缓存等技术，可以减少不必要的渲染操作，从而提高渲染速度。
  > 静态提升: 将静态的DOM节点提升为常量，在每次渲染时避免重复地创建相同的节点。这样可以减少运行时的开销，提高渲染性能。
2. **更小的包体积**：Vue3 底层核心库使用了 Tree-shaking 技术，可以更好地优化依赖模块，从而减小打包后的文件体积。
3. **更好的响应式性能**：Vue3 使用了`Proxy`来代替`Object.defineProperty`实现响应式数据绑定，从而减少了一些重复的监听操作，提高了响应式性能。
4. **更好的TypeScript支持**：Vue3 为了支持 TypeScript，在代码设计上进行了改进，例如使用新的 ComponentOptions 类型来描述组件选项，使得类型检查更加准确、友好。
5. **更强的扩展性**：Vue3 引入了 Composition API，可以让开发者更方便地组织和复用代码逻辑，从而提高代码的可维护性和复用性。同时，Composition API 可以与 Options API 混合使用，提供了更灵活的编程方式。



## 64、Proxy响应式绑定
Vue2内部是通过`Object.defineProperty`这个API去劫持数据的`getter`和`setter`来实现响应式的。因为这个API必须预先知道要拦截的`key`是什么，所以它并不能检测到对象属性的添加和删除。直接造成了数组元素的直接修改不会触发响应式机制。

例如：对象`obj`的`text`属性进行劫持
```js
const obj = {}
Object.defineProperty(obj, 'text', {
  get: () => {
    console.log('get val')
  },
  set: (val) => {
    console.log('setValue', val)
    // 更新视图
    renderView()
  }
})
const input = document.querySelector('#input')
input.addEventListener('keyup', (e) => {
  obj.text = e.target.value
})
```
Vue3使用了`Proxy`API做数据劫持，它劫持的是整个对象，自然对于对象的属性的增加和删除都能检测到，自然也不会再存在上述的问题。改写上面的例子：
```html
<input type="text" id="input">
<p id="p"></p>
<script>
  const input = document.querySelector('#input')
  const p = document.querySelector('#p')
  const obj = {}
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
  input.addEventListener('keyup', (e) => {
    objProxy.text = e.target.value
  })
</script>
```
通过`Proxy`实现双向响应式绑定，相比`Object.defineProperty`的遍历属性的方式效率更高，性能更好，另外`Virtual DOM`只更新`diff`动态部分、时间缓存等，也带来了性能上的提升。


## 65、ref响应式设计实现原理？
ref是通过使用ES6的`Proxy`对象来实现的。当调用`ref`函数时，会创建一个值为`{value: initialValue}`的响应式对象，并将其封装到一个代理对象中。
> 当我们使用`ref`对象读取或修改它的值时，实际上是在操作这个代理对象。这个代理对象会拦截我们对`value`属性的访问和修改，并通过Vue 3提供的`reactive`函数使得这些操作具有响应性。


## 66、reactive响应式设计实现原理？
Vue3 的响应式机制采用了名为 "Reactive" 的新 API，将`Object.defineProperty`改为了使用 ES6 中的`Proxy`对象来监听数据变化。这个新的 API 相较于 Vue2.x，具有更好的性能、更简单的实现方式以及更好的类型推导支持等优点。

具体实现原理如下：
1. 响应式数据转换：在首次对数据进行`reactive`化时，Reactive 函数会先将所有的嵌套数据类型都进行递归地转换，保证所有的嵌套数据类型都是`reactive`的。
2. 代理数据对象：通过`Proxy`对象来代理原始数据对象，拦截对数据对象的`set`和`get`操作。当原始数据对象发生变化时，Proxy 对象会触发`set`操作，并通知相关的依赖进行更新。
3. 建立依赖追踪：在`Reactive`函数内部维护一个依赖`map`，将每个数据对象与其相关依赖关联起来。当数据对象发生改变时，`Reactive`函数会遍历相关依赖，触发它们的更新。
4. 进行依赖收集：在模板编译阶段，对模板中使用到的所有数据进行依赖收集。在更新时，只更新模板中使用到的数据所对应的依赖。


## 67、什么是组合式API？
组合式 API（Composition API）是 Vue.js 3.x 中引入的一种新的组件编写方式。它通过将逻辑代码逻辑分离并封装到复用、可组合的函数里，取代了 Vue 2.x 中常用的 Options API。组合式API提供了一些基础函数：
- 响应式 API：例如`ref()`和`reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。
- 生命周期钩子：例如`onMounted()`和`onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。
- 依赖注入：例如`provide()`和`inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

组合式 API 是 Vue3 及 Vue2.7 的内置功能。


## 68、hook代码写在哪里？
`hooks`代码一般存放于`src/hooks`目录下，并使用`useXxxx`命名方式命名
```js
import {ref} from 'vue'
export default function(){
  const cout = ref(0);
  const increment = () => {
    cout.value++;
  }
  const decrement = () => {
    cout.value--;   
  }
  return{
    cout,
    increment,
    decrement
  }
}
```
然后在对应需要使用的组件引入hook，需要在Vue的`setup`函数内部
```js
import useCout from '@/hooks/useCout'
```


## 69、Vue3中的setup函数的理解？
- `setup`是组合式api的入口；
- `setup`函数中定义的变量和方法都是需要return出去的，不然没有办法在模板中使用；
- 可以在`script`标签上使用`setup`语法糖，使整个标签环境都为`setup`环境
- `setup`是处于`beforecreate`和`created`生命周期间的函数；
- `setup()`自身并不含对组件实例的访问权，即在`setup()`中访问`this`会是`undefined`。你可以在`选项式API`中访问`组合式API`暴露的值，但反过来则不行；
- `setup()`应该同步地返回一个对象。唯一可以使用`async setup()`的情况是，该组件是`Suspense`组件的后裔。


## 70、Vue全家桶包含哪些？
Vue框架本身、路由管理器vue-router、状态管理工具vuex|pinia、构建工具vue-cli|vite、vue调试工具vue-devtools、网络请求库axios、UI组件库(element-ui、iview、vant等)、CSS预处理器(less、sass、stylus等)。


## 71、v-model是什么？怎么使用？vue中标签怎么绑定事件？
`v-model`用于表单数据的双向绑定的指令，其实它就是一个语法糖。
```html
<input type="text" v-model="value">
<!-- 等价于 -->
<input
  :value="value"
  @input="event => value = event.target.value">
```
Vue中标签绑定事件：
> 使用`v-on`指令(简写为`@`)来监听 DOM 事件，并在事件触发时执行对应的JavaScript。用法：`v-on:click="methodName"`或`@click="handler"`。
```html
<button @click="count2++">自增</button>
<button @click="handleClick">自增</button>
```


## 72、v-model的实现原理？
1. `v-bind`绑定响应式数据；
2. 通过`oninput`触发事件获取当前`$event.target.value`，然后赋值给当前变量。
```html
<input
  :value="value"
  @input="event => value = event.target.value">
```


## 73、请说出至少4种vue当中的指令和它的用法？
- `v-text`: 更新元素的文本内容。
  > 通过设置元素的`textContent`属性来工作，因此它将覆盖元素中所有现有的内容。
  ```html
  <span v-text="msg"></span>
  <!-- 等同于 -->
  <span>{{msg}}</span>
  ```
- `v-html`: 更新元素的`innerHTML`。
  ```html
  <div v-html="html"></div>
  ```
- `v-show`: 改变元素的可见性，通过设置内联样式的`display`css属性。
  ```html
  <h1 v-show="ok">Hello!</h1>
  ```
- `v-if`: 条件性地渲染元素或者模板片段，控制元素是否销毁或创建。
  ```html
  <h1 v-if="awesome">Vue is awesome!</h1>
  ```
- `v-else`: 表示`v-if`或`v-if / v-else-if`链式调用的`“else 块”`。
  > 上一个兄弟元素必须有`v-if`或`v-else-if。
  ```html
  <div v-if="Math.random() > 0.5">
    Now you see me
  </div>
  <div v-else>
    Now you don't
  </div>
  ```
- `v-else-if`: 表示`v-if`的`“else if 块”`。可以进行链式调用。
  > 上一个兄弟元素必须有`v-if`或`v-else-if`。
  ```html
  <div v-if="type === 'A'">
    A
  </div>
  <div v-else-if="type === 'B'">
    B
  </div>
  <div v-else-if="type === 'C'">
    C
  </div>
  <div v-else>
    Not A/B/C
  </div>
  ```
- `v-for`: 基于原始数据循环渲染元素或模板块。
  > 指令值必须使用特殊语法`alias in expression为正在迭代的元素提供一个别名
  ```html
  <div v-for="(item, index) in items"></div>
  <div v-for="(value, key) in object"></div>
  ```
- `v-on`: 给元素绑定事件监听器。
  > 缩写：`@`
  ```html
  <button v-on:click="doThis"></button>
  <!-- 缩写 -->
  <button @click="doThis"></button>
  ```
- `v-bind`: 动态的绑定一个或多个`attribute`，也可以是组件的`prop`。
  > 缩写`:`或者`.`
  ```html
  <!-- 绑定 attribute -->
  <img v-bind:src="imageSrc" />
  <!-- 缩写 -->
  <img :src="imageSrc" />
  ```
- `v-model`: 在表单输入元素或组件上创建双向绑定。
  ```html
  <input v-model="text">
  ```
- `v-slot`: 用于声明具名插槽或是期望接收`props`的作用域插槽。
  ```html
  <!-- 接收 prop 的默认插槽，并解构 -->
  <Mouse v-slot="{ x, y }">
    Mouse position: {{ x }}, {{ y }}
  </Mouse>
  ```
- `v-pre`: 跳过该元素及其所有子元素的编译。
  ```html
  <span v-pre>{{ this will not be compiled }}</span>
  ```
- `v-once`: 仅渲染元素和组件一次，并跳过之后的更新。
  > 只渲染元素和组件一次。随后的重新渲染，元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。
  ```html
  <template>
    <div id="app">
      <p v-once>once: {{ msg }}</p>
      <p>{{ msg }}</p>
      <button @click="msg = 'hey'">更新数据</button>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        msg: 'hello'
      }
    }
  }
  </script>
  ```
  当我们点击`更新数据`时会发现`v-once`绑定的元素并没有更新。
- `v-memo`: 缓存一个模板的子树。
  ```html
  <div v-memo="[valueA, valueB]">
    ...
  </div>
  ```
- `v-cloak`: 用于隐藏尚未完成编译的 DOM 模板。
  ```html
  <template>
    <div v-cloak>
      {{ message }}
    </div>
  </template>
  <style>
    [v-cloak] {
      display: none;
    }
  </style>
  ```
  直到编译完成前，`<div>`将不可见。



## 74、active-class是哪个组件的属性？
`active-class`是`vue-router`模块中`router-link`组件中的属性，主要作用是用来实现选中样式的切换。

**active-class的使用方式**
1. 在`router-link`中写入`active-class`
  > `active-class`选择样式时根据路由中的路径（`to=“/home”`）去匹配，然后显示
  ```html
  <router-link to="/home" class="menu-home" active-class="active">首页</router-link>
  ```
2. 直接在路由 js 文件中配置`linkActiveClass`
  ```js
  export default new Router({
    linkActiveClass: 'active',
  })
  ```
  ```html
  <div class="menu-btn">
    <router-link to="/" class="menu-home" active-class="active">首页</router-link>
  </div>
  <div class="menu-btn">
    <router-link to="/my" class="menu-my" active-class="active">我的</router-link>
  </div>
  ```

存在问题：
> 因为`to="/"`引起的，`active-class`选择样式时根据路由中的路径去匹配，然后显示。
> - 例如在`my`页面中，路由为`localhost:8081/#/my`，那么`to="/”`和`to="/my"`都可以匹配到，所以都会激活选中样式。

对于上述问题的解决办法
1. 在`router-link`中写入`exact`
  ```html
  <router-link to="/" class="menu-home" active-class="active" exact>首页</router-link>
  ```
2. 在路由中加入重定向
  ```html
  <router-link to="/" class="menu-home" active-class="active" exact>首页</router-link>
  { path: '/', redirect: '/home' }
  ```


## 75、自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？
**自定义指令定义方式**
- Vue2
  - 全局定义指令：在`vue`对象的`directive`方法。
    ```js
    // 注册一个全局自定义指令 `v-perms`
    Vue.directive('perms', {

    })
    ```
  - 组件内定义指令：`directives`
    ```js
    export default {
      directives: {
        focus: {
          ...
        }
      }
    }
    ```
- Vue3
  - 全局自定义指令: 在`createApp`创建的对象上使用`directive`方法
    ```js
    const app = createApp({})
    // 使 v-focus 在所有组件中都可用
    app.directive('focus', {
      /* ... */
    })
    ```
  - 局部自定义指令: 由一个包含类似组件生命周期钩子的对象来定义。钩子函数会接收到指令所绑定元素作为其参数。
    ```html
    <script setup>
    // 在模板中启用 v-focus
    const vFocus = {
      mounted: (el) => el.focus()
    }
    </script>

    <template>
      <input v-focus />
    </template>
    ```

**钩子函数**
- Vue2
  - `bind`: 只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
  - `inserted`: 被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
  - `update`: 所在组件的 VNode 更新时调用，但是可能发生在其子 VNode 更新之前。指令的值可能发生了改变，也可能没有。
  - `componentUpdated`: 指令所在组件的 VNode 及其子 VNode 全部更新后调用。
  - `unbind`: 只调用一次，指令与元素解绑时调用。
- Vue3
  - `created`: 在绑定元素的attribute前或事件监听器应用前调用
  - `beforeMount`: 在元素被插入到 DOM 前调用
  - `mounted`: 在绑定元素的父组件及他自己的所有子节点都挂载完成后调用
  - `beforeUpdate`: 绑定元素的父组件更新前调用
  - `updated`: 在绑定元素的父组件及他自己的所有子节点都更新后调用
  - `beforeUnmount`: 绑定元素的父组件卸载前调用
  - `unmounted`: 绑定元素的父组件卸载后调用

**钩子函数参数**
- Vue2
  - `el`: 指令所绑定的元素，可以用来直接操作 DOM。
  - `binding`: 一个对象，包含以下属性。
    - `name`: 指令名，不包括`v-`前缀。
    - `value`: 指令的绑定值，例如：`v-my-directive="1 + 1"`中，绑定值为 2。
    - `oldValue`: 指令绑定的前一个值，仅在`update`和`componentUpdated`钩子中可用。无论值是否改变都可用。
    - `expression`: 字符串形式的指令表达式。例如`v-my-directive="1 + 1"`中，表达式为`"1 + 1"`。
    - `arg`: 传给指令的参数，可选。例如`v-my-directive:foo`中，参数为`"foo"`。
    - `modifiers`: 一个包含修饰符的对象。例如：`v-my-directive.foo.bar`中，修饰符对象为`{ foo: true, bar: true }`。
  - `vnode`: Vue 编译生成的虚拟节点。
  - `oldVnode`: 上一个虚拟节点，仅在`update`和`componentUpdated`钩子中可用。
- Vue3
  - `el`: 指令所绑定的元素，可以用来直接操作 DOM。
  - `binding`: 一个对象，包含以下属性。
    - `value`: 传递给指令的值。例如在`v-my-directive="1 + 1"`中，值是 2。
    - `oldValue`: 之前的值，仅在`beforeUpdate`和`updated`中可用。无论值是否更改，它都可用。
    - `expression`: 字符串形式的指令表达式。例如`v-my-directive="1 + 1"`中，表达式为`"1 + 1"`。
    - `arg`: 传递给指令的参数 (如果有的话)。例如在`v-my-directive:foo`中，参数是`"foo"`。
    - `modifiers`: 一个包含修饰符的对象。例如：`v-my-directive.foo.bar`中，修饰符对象为`{ foo: true, bar: true }`。
    - `instance`: 使用该指令的组件实例。
    - `dir`: 指令的定义对象。
  - `vnode`: 代表绑定元素的底层 VNode。
  - `oldVnode`: 之前的渲染中代表指令所绑定元素的 VNode。仅在`beforeUpdate`和`updated`钩子中可用。


## 76、vue-loader是什么？使用它的用途有哪些？
`vue-loader`是一个`webpack`的加载器(loader)，主要用于将Vue单文件组件(`.vue`文件)转换为JavaScript模块。使得这些组件可以在浏览器中正常运行。

使用`vue-loader`可以实现以下功能：
1. 允许你用 Single-File Components 单文件组件的格式来写Vue组件。
2. 提取`.vue`文件中的`template，script，style`等部分，再通过`vue-template-compiler`、`style-loader`等插件，最终形成一个可以在浏览器中运行的 JavaScript 文件。
3. 修改`.vue`文件后不需要手动刷新浏览器即可在开发过程中实现热重载来保持状态，提升开发效率。
4. 允许为 Vue 组件的每个部分使用其它的 webpack loader，例如在`<style>`的部分使用 Sass 和在`<template>`的部分使用`Pug`。


## 77、请说出vue-cli项目中src目录每个文件夹和文件的用法？
- `assets`: 存放静态资源，如图片、图标文件;
- `components`: 存放公共组件;
- `router`: 路由相关的配置;
- `store`: 状态管理器相关的配置;
- `view`: 页面视图;
- `app.vue`: 根组件;
- `main.js`: 程序入口文件;


## 79、dom是在哪一个生命周期完成渲染的？
在`mounted`中就已经完成了。


## 80、第一次页面加载会触发哪几个生命周期？
第一次页面加载时会触发`beforeCreate`, `created`, `beforeMount`, `mounted`这几个生命周期。


## 81、vue生命周期的作用是什么？
**什么是生命周期**
- Vue生命周期是指vue实例对象从创建之初到销毁的过程，vue所有功能的实现都是围绕其生命周期进行的，在生命周期的不同阶段调用对应的钩子函数可以实现组件数据管理和DOM渲染两大重要功能。
- Vue实例有一个完整的生命周期，也就是从`开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载`等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

**生命周期的作用**
>   在Vue的整个生命周期中，它提供了一系列的事件，可以让我们在事件触发时注册js方法，可以让我们用自己注册的js方法控制整个大局，在这些事件响应方法中的this直接指向的是vue的实例。


## 82、如何解决vue修改数据不刷新页面这个问题？
1. `this.$forceUpdate()`
  > 数据改变后使用，强制刷新视图，但是性能损耗，不推荐使用。
2. `vm.$set`
  > vue无法检测对象property的添加或移除
  ```js
  <div>
    <p>{{ obj }}</p>
    <p>{{ arr }}</p>
  </div>
  export default {
    data () {
      return {
        obj: {
          name: '张三'
        },
        arr: [1, 2, 3]
      }
    },
    methods: {
      updateData () {
        this.obj.age = 23 // 视图不会更新
        this.arr[1] = 3 // 视图不会更新
        // 使用 vm.$set 替换上面代码
        this.$set(this.obj, 'age', 23)
        this.$set(this.arr, 1, 3) // 或者使用编译方法 this.arr.splice(1, 1, 3)
      }
    }
  }
  ```
3. `key`
  > 声明一个全局`key`，每次操作数据后使`key`自增
  ```js
  <div :key="key">
    <p>{{ obj }}</p>
    <p>{{ arr }}</p>
  </div>
  export default {
    data () {
      return {
        obj: {
          name: '张三'
        },
        arr: [1, 2, 3],
        key: 0
      }
    },
    methods: {
      updateData () {
        this.obj.age = 23 // 视图不会更新
        this.arr[1] = 3 // 视图不会更新
        this.key++
      }
    }
  }
  ```


## 83、为什么会出现vue修改数据后页面没有刷新这个问题？
受ES5`Object.defineProperty`的限制，每次需要事先知道`property`名称，才能劫持其`getter/setter`。
> Vue.js不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。


## 84、v-if 与 v-for 一起使用
- 当`v-if`与`v-for`一起使用时，`v-for`具有比`v-if`更高的优先级。（注意这里是 2.x 的版本，3.x 反之）
- 不推荐同时使用`v-if`和`v-for`。

**Vue2**
```html
<template>
  <div>
    <div v-for="(item, index) in students" :key="item.id" v-if="flags[index]">
      {{ item.name }} - {{ item.age }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  data () {
    return {
      students: [
        { id: 1, name: '张三', age: 23 },
        { id: 2, name: '李四', age: 24 },
        { id: 3, name: '王五', age: 25 }
      ],
      flags: [false, true, false]
    }
  }
}
</script>
```
效果如下图所示，可以看出`v-for`的优先级高于`v-if`
![202303101623326.png](http://img.itchenliang.club/img/202303101623326.png)

**Vue3**
```html
<template>
  <div style="padding: 10px;">
    <div v-for="(item, index) in students" :key="item.id" v-if="flags[index]">
      {{ item.name }} - {{ item.age }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const flags = ref([
  false, true, false
])
const students = ref([
  { id: 1, name: '张三', age: 23 },
  { id: 2, name: '李四', age: 24 },
  { id: 3, name: '王五', age: 25 }
])
</script>
```
可以看到无论是编辑器还是浏览器控制台都在报错，提示`Property "index" was accessed during render but is not defined on instance. `意思就是`index`没有定义，即`v-if`在`v-for`之前执行了。


## 85、Vue的两个核心是什么？
数据驱动、组件系统


## 87、MVC和MVVM的区别
- MVC表示“模型-视图-控制器”，MVVM表示“模型-视图-视图模型”；
- MVVM是由MVC衍生出来的。.
  - MVC中，`View`会直接从`Model`中读取数据；
  - MVVM实现了`View`和`Model`的自动同步，也就是当`Model`的属性改变时，我们不用再自己手动操作Dom元素，来改变`View`的显示，而是改变属性后该属性对应`View`层显示会自动改变。
- MVVM各部分的通信是双向的，而MVC各部分通信是单向的；
- MVVM是真正将页面与数据逻辑分离放到js里去实现，而MVC里面未分离。


## 88、params和query的区别？
`query`和`params`是vue-router中两个传参的方式，整体上很像，在一些细节上有一定的区别
1. 参数传递方式不同: `query`参数可以通过`name`和`path`方式传递，而`params`只能通过`name`传递，如果这里写成了`path`，接收参数页面会是`undefined`
  ```js
  // query
  router.push({ name: 'Demo', query: { id: 1 } })
  router.push({ path: '/demo', query: { id: 1 } })
  // params
  router.push({ name: 'Demo', params: { id: 1 } })
  ```
2. `query`方式是在`?`后面添加参数`/demo?id=1`，而`params`则是在路由上拼接`/demo/1`


## 89、v-bind和v-model的区别？
1. `v-bind`是单向绑定，用来绑定数据和属性以及表达式，数据只能从`data`流向页面。
2. `v-model`是双向绑定，数据能从`data`流向页面，也能从页面流向`data`。
3. `v-bind`可以给任何属性赋值，`v-model`只能给表单类，也就是具有`value`属性的元素进行数据双向绑定，如`text、radio、checkbox、selected`。


## 90、Vue和React的区别是什么？
Vue 和 React 都是用于构建 UI 界面的流行框架。
1. 监听数据变化的实现原理不同
  - Vue: Vue通过`getter/setter`以及一些函数的劫持，能精确知道数据变化 ，不需要特别的优化就能达到很好的性能
  - React: React默认是通过`比较引用`的方式进行的，如果不优化( pureComponent/shouldComponentUpdate )可能导致大量不必要的VDOM得重新渲染
2. 数据流向的不同
  - Vue: 双向数据绑定
  - React: 单向数据流
3. 渲染模版的不同
  - Vue: 采用了template
  - React: 采用了jsx 
4. 虚拟DOM更新模式不同
  - Vue: 采用diff算法计算Virtual DOM的差异，只需要重新渲染更新的部分，而不是重新渲染整个组件数。
  - React: 每当应用的状态被改变时，全部子组件都会重新渲染。
5. 事件机制不同
  - Vue: Vue原生事件使用 标准Web事件
  - React: React原生事件被包装，所有事件都冒泡到顶层document监听，然后在这里合成事件下发 。


## 91、说说你对 SPA 单页面的理解，它的优缺点分别是什么？
SPA(单页面程序)的英文是`single-page application`，整个项目中只有一个页面。

单页面的实现思路：就是在Web页面初始化时加载所有的HTML、JavaScript和 CSS，页面的内容的变化，靠动态创建dom。
> 也就是一旦页面加载完成，SPA 不会因为用户的操作而进行页面的重新请求(加载)或跳转;取而代之的是利用路由机制实现 HTML 内容的动态变换，UI 与用户的交互，避免页面的重新加载。

**优点**
- 用户体验好、快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染;
- 基于上面一点，SPA 对服务器的压力小;
- 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理;

**缺点**
- 首次加载耗时长: 初次加载耗时多，为实现单页 Web 应用功能及显示效果，需要在加载页面的时候将 JavaScript、CSS 统一加载，部分页面按需加载;
- 无法使用浏览器的前进和后退: 前进后退路由管理，由于单页应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换需要自己建立堆栈管理;
- SEO难度较大: 由于所有的内容都在一个页面中动态替换显示，所以在 SEO 上其有着天然的弱势。




## 92、Class 与 Style 如何动态绑定？
Class动态绑定
```html
const isActive = ref(true)
const hasError = ref(false)
<div class="static" :class="{ active: isActive, 'text-danger': hasError }"></div>
渲染的结果会是：
<div class="static active"></div>

const activeClass = ref('active')
const errorClass = ref('text-danger')
<div :class="[activeClass, errorClass]"></div>
渲染的结果是：
<div class="active text-danger"></div>
```

Style动态绑定
```html
const activeColor = ref('red')
const fontSize = ref(30)
<div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
<div :style="[baseStyles, overridingStyles]"></div>
<!-- 样式多值 -->
<div :style="{ display: ['-webkit-box', '-ms-flexbox', 'flex'] }"></div>
在这个示例中，在支持不需要特别前缀的浏览器中都会渲染为 display: flex。
```


## 93、直接给一个数组项赋值，Vue 能检测到变化吗？
不能，用索引直接设置一个数组项时或者当你修改数组的长度时，Vue不能检测到数组的变动。
```js
vm.items[indexOfItem] = newValue
vm.items.length = newLength
```
这是由于JavaScript的限制，Vue则是重写了`pop`、`push`、`splice`等变异方法，如果需要更新数据则使用`变异方法`或者`vm.$set`。


## 94、Vue的父组件和子组件生命周期钩子函数执行顺序？
**加载渲染过程**
> `父 beforeCreate` -> `父 created` -> `父 beforeMount` -> `子 beforeCreate` -> `子 created` -> `子 beforeMount` -> `子 mounted` -> `父 mounted`

**子组件更新过程**
> `父 beforeUpdate` -> `子 beforeUpdate` -> `子 updated` -> `父 updated`

**父组件更新过程**
> `父 beforeUpdate` -> `父 updated`

**销毁过程**
> `父 beforeDestroy` -> `子 beforeDestroy` -> `子 destroyed` -> `父 destroyed`

总结: **从创建到挂载，是从外到内，再从内到外，且mixins的钩子函数总是在当前组件之前执行**


## 95、父组件可以监听到子组件的生命周期吗？
1. **方式一: `$emit`**
  > 其实就是在父组件上封装了一个`v-on`的自定义事件用来监听子组件的事件，只不过事件名和钩子函数同名，当子组件发布时，即执行`this.$emit('钩子函数created/mounted',参数)`时，在父组件则可以监听到，然后执行回调
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <child-component @mounted="handleMounted"></child-component>
    </div>
  </template>
  <script>
  export default  {
    methods:{
      handleMounted(data){
        console.log('子组件mounted触发', data)
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <script>
  export default {
    mounted(){
      this.$emit('mounted','mounted触发了')
    },
  }
  </script>
  ```
2. **方式二: `@hook`**
  > `@hook`方法可以监听子组件的任何的生命周期。子组件不需要发布。直接在父组件中，插入子组件的地方，使用`@hook.声明周期函数名="函数名"`即可
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <child-component @hook:mounted="handleMounted"></child-component>
    </div>
  </template>
  <script>
  export default {
    methods:{
      handleMounted(data){
        console.log('子组件mounted触发', data)
      }
    }
  }
  </script>
  ```


## 96、使用过 Vue SSR 吗？说说 SSR？
`ssr`的全称是`server side render`，服务端渲染，vue ssr的意思就是在服务端进行 vue 的渲染，直接对前端返回带有数据，并且是渲染好的HTML页面；而不是返回一个空的HTML页面，再由vue 通过异步请求来获取数据，再重新补充到页面中。

**为什么要用 SSR？**
- 更快的首屏加载: 这一点在慢网速或者运行缓慢的设备上尤为重要。服务端渲染的 HTML 无需等到所有的 JavaScript 都下载并执行完成之后才显示，所以你的用户将会更快地看到完整渲染的页面。除此之外，数据获取过程在首次访问时在服务端完成，相比于从客户端获取，可能有更快的数据库连接。这通常可以带来更高的核心 Web 指标评分、更好的用户体验，而对于那些“首屏加载速度与转化率直接相关”的应用来说，这点可能至关重要。
- 统一的心智模型: 你可以使用相同的语言以及相同的声明式、面向组件的心智模型来开发整个应用，而不需要在后端模板系统和前端框架之间来回切换。
- 更好的SEO：搜索引擎优化，也就是SEO，搜索引擎爬虫可以直接看到完全渲染的页面。


## 97、Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？
```js
export default {
  data () {
    return {
      obj: { name: '张三' },
      arr: [1, 2, 3]
    }
  },
  methods: {
    updateData () {
      this.$set(this.obj, 'age', 23) // { name: '张三', age: 23 }
      this.$set(this.arr, 1, 5) // [1, 5, 3 ]
    }
  }
}
```
`vm.$set`的实现原理是：
- 如果目标是数组，直接使用数组的`splice`方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用`defineReactive`方法进行响应式处理（ defineReactive 方法就是 Vue 在初始化对象时，给对象属性采用`Object.defineProperty`动态添加`getter`和`setter`的功能所调用的方法）


## 98、虚拟 DOM 的优缺点？
虚拟DOM是什么？
> 由于在浏览器中操作 DOM 是很昂贵的。频繁的操作 DOM，会产生一定的性能问题。这就是虚拟 Dom 的产生原因。Vue2的Virtual DOM借鉴了开源库 `snabbdom`的实现。Virtual DOM本质就是用一个原生的 JS 对象去描述一个 DOM节点，是对真实 DOM 的一层抽象。

**优点**
- 保证性能下限: 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
- 无需手动操作DOM: 我们不再需要手动去操作DOM，只需要写好`View-Model`的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- 跨平台: 虚拟 DOM 本质上是 JavaScript 对象，而DOM与平台强相关，相比之下虚拟DOM可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

**缺点**
- 无法进行极致优化: 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。
- 首次渲染大量DOM时，由于多了一层虚拟DOM的计算，会比innerHTML插入慢。


## 99、虚拟 DOM 实现原理？
虚拟 DOM 的实现原理主要包括以下 3 部分：
- 用 JavaScript 对象模拟真实 DOM 树，对真实 DOM 进行抽象；
- diff算法: 比较两棵虚拟 DOM 树的差异；
- pach算法: 将两个虚拟 DOM 对象的差异应用到真正的 DOM 树。


## 100、vue在组件中引入插件的方法有哪些？
插件通常用来为 Vue 添加全局功能。插件的功能范围没有严格的限制——一般有下面几种：
1. 添加全局方法或者`property`。如：`vue-custom-element`
2. 添加全局资源：指令/过滤器/过渡等。如`vue-touch`
3. 通过全局混入来添加一些组件选项。如 `vue-router`
4. 添加Vue实例方法，通过把它们添加到`Vue.prototype`上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能。如`vue-router`


## 101、什么是 Proxy？
`Proxy`对象用于创建一个对象的代理，从而实现基本操作的拦截和自定义（如属性查找、赋值、枚举、函数调用等）。

语法如下:
```js
const p = new Proxy(target, handler)
```
参数说明：
  - target: 要使用`Proxy`包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
  - handler: 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时，代理 p 的行为。
```js
//声明一个名为obj的对象
var obj = {
  name: "张三",
  age: 23
}
//示例化一个代理p，代理的对象是obj
var p = new Proxy(obj, {
  // get 属性读取时的操作
  get(target, prop) {
    //target 就是 obj 这个对象
    //prop 是 obj 的属性名
    if (prop in target) {
      //如果该属性名存在与该对象中，则返回该属性值
      return target[prop];
    } else {
      //否则返回字符串 "该对象没有该属性"
      return "该对象没有该属性";
    }
  },
  //set 属性设置时的操作
  set(target, prop, value) {
    //target 就是 obj 这个对象
    //prop 是 obj 的属性名
    //value 是 要设置的值
    if (prop === "age") {
      //如果该属性名是age，则返回修改后的值
      target[prop] = value;
    } else {
      //否则弹出异常内容
      throw "除年龄外，其它属性不可以更改";
    }
  }
})
console.log(p.name) // 张三
console.log(p.age) // 23
console.log(p.gender) // 该对象没有该属性
p.age = 18 // 成功
p.name = '李四' // Uncaught Error: 除年龄外，其它属性不可以更改
console.log(p.name) // 张三
```

## 102、vue实例挂载的过程是什么？
Vue实例的挂载过程主要分为以下几个步骤：
1. **创建Vue实例**：通过`new`关键字创建Vue实例，并传入配置对象。
2. **初始化生命周期**：在初始化阶段，Vue会为实例设置一些属性和生命周期钩子函数，如`data、methods、created`等。
3. **编译模板**：如果使用了`template`选项或者`el`选项中指定的元素存在，Vue会将模板编译成`render`函数。
4. **挂载实例**：如果`el`选项存在，则调用`$mount`方法将Vue实例挂载到指定的DOM元素上。如果没有指定el选项，则需要手动调用`$mount`方法进行挂载。
5. **创建渲染Watcher实例**：Vue会创建一个Watcher实例来监测数据变化，当数据发生变化时触发更新视图的操作。
6. 编译完成并插入到DOM：当Watcher实例被创建后，Vue会根据`render`函数生成虚拟DOM，并将其渲染到页面上。


## 103、Vue组件的设计原则
Vue组件的设计原则包括以下几点：
1. **单一职责原则**：每个组件只负责一个特定的功能或模块，避免将多个功能耦合在同一个组件中。
2. **可复用性原则**：组件应该具有高度的可复用性，可以在不同的场景中使用，并且不受环境和数据的影响。
3. **清晰简洁原则**：组件应该尽量保持简洁、清晰，易于阅读和理解。可以通过props来接收参数，通过事件来传递数据和通知父组件进行操作。
4. **可测试性原则**：组件应该具有良好的可测试性，便于单元测试和集成测试。可以使用mock数据等技术来模拟组件的运行环境。
5. **可维护性原则**：组件的代码应该易于维护和修改，避免过于复杂的逻辑和过深的嵌套。


## 104、Vue slot是做什么的?
`slot`是vue的插槽，`<slot>`元素是一个插槽出口 (slot outlet)，标示了父元素提供的插槽内容 (slot content) 将在哪里被渲染。


## 105、对于Vue是一套渐进式框架的理解？
Vue是一套渐进式框架，这意味着它可以逐步应用到现有项目中，并且具有可定制性和灵活性。开发者可以根据具体需求选择使用Vue的部分功能，例如只使用Vue的模板语法或只使用Vue的状态管理库Vuex。此外，Vue还提供了许多插件和第三方库以满足不同场景下的需求。

**那么Vue分为哪几层呢？**
- declarative rendering（声明式渲染）
- component system（组件系统）
- client-side routing（前端路由）
- state management（状态管理）
- build system（构建系统）



## 106、Vue中v-on可以监听多个方法吗？
肯定可以的。
```html
<!-- 例子一 -->
<input type="text" :value="name" @input="onInput" @focus="onFocus" @blur="onBlur" />

<!-- 例子二 -->
<template>
  <button v-on:click.stop.prevent="doThis, doThat">Click me!</button>
</template>
<script>
export default {
  methods: {
    doThis() {
      console.log('do this');
    },
    doThat() {
      console.log('do that');
    }
  }
};
</script>
```


## 107、vue-cli 工程升级 vue 版本
在项目目录里运行`npm upgrade`，不出意外的话，可以正常运行和 build。如果有任何问题，删除`node_modules`文件夹然后重新运行`npm i`即可。（简单的说就是升级`vue`和`vue-template-compiler`两个插件）。


## 108、Vue事件中如何使用 event 对象？
有时我们需要在内联事件处理器中访问`原生DOM事件`。你可以向该处理器方法传入一个特殊的`$event`变量，或者使用内联箭头函数：
```html
<template>
  <div>
    <!-- 使用特殊的 $event 变量 -->
    <button data-id="12" @click="handleClick('Form cannot be submitted yet.', $event)">
      Submit
    </button>

    <!-- 使用内联箭头函数 -->
    <button data-id="12" @click="(event) => handleClick('Form cannot be submitted yet.', event)">
      Submit
    </button>
  </div>
</template>
<script setup>
  const handleClick = (msg, event) => {
    //获取自定义data-id
    console.log(event.target.dataset.id)
    //阻止事件冒泡
    event.stopPropagation(); 
    //阻止默认
    event.preventDefault()
  }
</script>
```


## 109、$nextTick 的使用
`nextTick()`可以在状态改变后立即使用，以等待DOM更新完成。
```html
<template>
  <div>
    <p id="msg">{{ msg }}</p>
    <button @click="updateData">更新数据</button>
  </div>
</template>
<script>
export default {
  data () {
    return {
      msg: '123'
    }
  },
  methods: {
    updateData () {
      this.msg = '哈哈'
      const mEl = document.querySelector('#msg')
      console.log(mEl.textContent) // 123
      this.$nextTick(() => {
        // 可以获取更新后的dom了
        console.log(mEl.textContent) // 哈哈
      })
    }
  }
}
</script>
```


## 110、Vue中子组件调用父组件的方法
- **方式一**: 在子组件中通过`$parent`来获取父组件实例，并调用其方法
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <com-a></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  export default {
    components: {
      ComA
    },
    methods: {
      faterMethod (msg) {
        console.log('father', msg)
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleClick () {
        this.$parent.faterMethod('我是child')
      }
    }
  }
  </script>
  ```
- **方式二**: 在子组件里用`$emit`向父组件触发一个事件，父组件监听这个事件
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <com-a @faterMethod="faterMethod"></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  export default {
    components: {
      ComA
    },
    methods: {
      faterMethod (msg) {
        console.log('father', msg)
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleClick () {
        this.$emit('faterMethod', '我是子组件')
      }
    }
  }
  </script>
  ```
- **方式三**: 父组件直接将该方法传入子组件，在子组件里直接调用这个方法
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <com-a :faterMethod="faterMethod"></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  export default {
    components: {
      ComA
    },
    methods: {
      faterMethod (msg) {
        console.log('father', msg)
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  export default {
    props: ['faterMethod'],
    methods: {
      handleClick () {
        this.faterMethod('我是子组件')
      }
    }
  }
  </script>
  ```
- **方式四:** 在子组件中用`$parent`访问父组件实例，并调用其方法
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <com-a></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  export default {
    components: {
      ComA
    },
    methods: {
      faterMethod (msg) {
        console.log('father', msg)
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleClick () {
        this.$parent.faterMethod('我是子组件')
      }
    }
  }
  </script>
  ```
- **方式五**: 使用`eventBus`事件总线派发事件
  bus文件
  ```js
  import Vue from 'vue'
  const vue = new Vue()
  export default vue
  ```
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <com-a></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  import bus from '@/views/bus'
  export default {
    components: {
      ComA
    },
    methods: {
      faterMethod (msg) {
        console.log('father', msg)
      }
    },
    created () {
      bus.$on('faterMethod', (msg) => {
        this.faterMethod(msg)
      })
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  import bus from '@/views/bus'
  export default {
    methods: {
      handleClick () {
        bus.$emit('faterMethod', '我是子组件')
      }
    }
  }
  </script>
  ```
- **方式六**: 使用`provide/inject`
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <com-a></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  export default {
    components: {
      ComA
    },
    methods: {
      faterMethod (msg) {
        console.log('father', msg)
      }
    },
    provide () {
      return {
        faterMethod: this.faterMethod
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleClick () {
        this.faterMethod('我是子组件')
      }
    },
    inject: ['faterMethod']
  }
  </script>
  ```


## 111、Vue中父组件调用子组件的方法
- **方式一**: 通过`ref`直接调用子组件的方法；
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
      <com-a ref="child"></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  export default {
    components: {
      ComA
    },
    methods: {
      handleClick () {
        this.$refs.child.childMethod('我是父组件')
      }
    }
  }
  </script>

  <!-- 子组件 -->
  <template>
    <div></div>
  </template>

  <script lang="ts">
  export default {
    methods: {
      childMethod (msg) {
        console.log('childMethod', msg)
      }
    }
  }
  </script>
  ```
- **方式二**: 使用`eventBus`事件总线派发事件
  bus文件
  ```js
  import Vue from 'vue'
  const vue = new Vue()
  export default vue
  ```
  ```html
  <!-- 父组件 -->
  <template>
    <div>
      <button @click="handleClick">点击</button>
      <com-a></com-a>
    </div>
  </template>
  <script lang="ts">
  import ComA from '@/views/ComA.vue'
  import bus from '@/views/bus'
  export default {
    components: {
      ComA
    },
    methods: {
      handleClick () {
        bus.$emit('childMethod', '我是父组件')
      }
    },
  }
  </script>
  <!-- 子组件 -->
  <template>
    <div></div>
  </template>
  <script lang="ts">
  import bus from './bus'
  export default {
    methods: {
      childMethod (msg) {
        console.log('childMethod', msg)
      }
    },
    created () {
      bus.$on('childMethod', (msg) => {
        this.childMethod(msg)
      })
    }
  }
  </script>
  ```


## 112、Vue如何监听键盘事件中的按键？
- **方式一**: 使用Vue的按键修饰符
  在监听键盘事件时，我们经常需要检查常见的键值。Vue允许为`v-on`在监听键盘事件时添加按键修饰符：
  ```html
  <!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
  <input v-on:keyup.13="submit">
  ```
  记住所有的`keyCode`比较困难，所以 Vue 为最常用的按键提供了别名：
  ```html
  <input v-on:keyup.enter="submit">
  <!-- 缩写语法 -->
  <input @keyup.enter="submit">
  ```
- **方式二**: 使用原生DOM事件
  ```html
  <template>
    <div id="app">
      <input type="text" @keyup="handleKeyup($event)">
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleKeyup (event) {
        console.log(event.keyCode, event.code)
      }
    }
  }
  </script>
  ```


## 113、Vue更新数组时触发视图更新的方法
数组可以用`defineProperty`进行监听。但是考虑性能原因，不能数组一百万项每一项都循环监听（那样性能太差了）。所以没有使用`Ojbect.defineProperty`对数组每一项进行拦截，故Vue2中采用劫持数组原型上的个别方法并重写。
> `pop`、`push`、`splice`、`shift`、`unshift`、`sort`、`reverse`


## 114、v-for产生的列表，实现 active 的切换
该例子使用了事件委托的方式实现，而不需要动态在每个`li`上绑定点击事件。
```html
<template>
  <div>
    <ul @click="handleClick($event)">
      <li
        v-for="(item, index) in students"
        :key="item.id"
        :data-id="item.id"
        :class="{ active: item.id === active }">
        {{ item.name }} - {{ item.age }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
export default {
  data () {
    return {
      active: 0,
      students: [
        { id: 1, name: '张三', age: 23 },
        { id: 2, name: '李四', age: 24 },
        { id: 3, name: '王五', age: 25 }
      ]
    }
  },
  methods: {
    handleClick (event) {
      const el = event.target
      if (el.nodeName.toLowerCase() === 'li') {
        this.active = parseInt(el.dataset.id)
      }
    }
  },
}
</script>
<style lang="scss">
ul {
  li {
    cursor: pointer;
    &.active {
      color: red;
    }
  }
}
</style>
```


## 115、Vue中十个常用的自定义过滤器
- 去除空格
  ```js
  // type 1-所有空格 2-前后空格 3-前空格 4-后空格
  function trim(value, trim) {
    switch (trim) {
      case 1:
        return value.replace(/\s+/g, "");
      case 2:
        return value.replace(/(^\s*)|(\s*$)/g, "");
      case 3:
        return value.replace(/(^\s*)/g, "");
      case 4:
        return value.replace(/(\s*$)/g, "");
      default:
        return value;
    }
  }
  ```
- 任意格式日期处理
  ```js
  //使用格式：
  // {{ '2018-09-14 01:05' | formaDate(yyyy-MM-dd hh:mm:ss) }} 
  // {{ '2018-09-14 01:05' | formaDate(yyyy-MM-dd) }} 
  // {{ '2018-09-14 01:05' | formaDate(MM/dd) }} 等
  function formaDate(value, fmt) {
    var date = new Date(value);
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "w+": date.getDay(), //星期
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      "S": date.getMilliseconds() //毫秒
      };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) {
      if(k === 'w+') {
        if(o[k] === 0) {
          fmt = fmt.replace('w', '周日');
        }else if(o[k] === 1) {
          fmt = fmt.replace('w', '周一');
        }else if(o[k] === 2) {
          fmt = fmt.replace('w', '周二');
        }else if(o[k] === 3) {
          fmt = fmt.replace('w', '周三');
        }else if(o[k] === 4) {
          fmt = fmt.replace('w', '周四');
        }else if(o[k] === 5) {
          fmt = fmt.replace('w', '周五');
        }else if(o[k] === 6) {
          fmt = fmt.replace('w', '周六');
        }
      }else if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
      }
    }
    return fmt;
  }
  ```
- 字母大小写切换
  ```js
  /*type
  1:首字母大写
  2：首页母小写
  3：大小写转换
  4：全部大写
  5：全部小写
  * */
  function changeCase(str, type) {
    function ToggleCase(str) {
      var itemText = ""
      str.split("").forEach((item) => {
        if (/^([a-z]+)/.test(item)) {
          itemText += item.toUpperCase();
        } else if (/^([A-Z]+)/.test(item)) {
          itemText += item.toLowerCase();
        } else {
          itemText += item;
        }
      });
      return itemText;
    }
    switch (type) {
      case 1:
      return str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase();
      });
      case 2:
        return str.replace(/\b\w+\b/g, function (word) {
          return word.substring(0, 1).toLowerCase() + word.substring(1).toUpperCase();
        });
      case 3:
        return ToggleCase(str);
      case 4:
        return str.toUpperCase();
      case 5:
        return str.toLowerCase();
      default:
        return str;
    }
  }
  ```
- 字符串循环复制,count->次数
  ```js
  function repeatStr(str, count) {
    var text = '';
    for (var i = 0; i < count; i++) {
      text += str;
    }
    return text;
  }
  ```
- 字符串替换
  ```js
  function replaceAll(str, AFindText, ARepText) {
    raRegExp = new RegExp(AFindText, "g");
    return str.replace(raRegExp, ARepText);
  }
  ```
- 字符替换，隐藏手机号或者身份证号等*
  ```js
  //replaceStr(字符串,字符格式, 替换方式,替换的字符（默认*）)
  //ecDo.replaceStr('18819322663',[3,5,3],0)
  //result：188*****663
  //ecDo.replaceStr('asdasdasdaa',[3,5,3],1)
  //result：***asdas***
  //ecDo.replaceStr('1asd88465asdwqe3',[5],0)
  //result：*****8465asdwqe3
  //ecDo.replaceStr('1asd88465asdwqe3',[5],1,'+')
  //result："1asd88465as+++++"
  function replaceStr(str, regArr, type, ARepText) {
    var regtext = '',
    Reg = null,
    replaceText = ARepText || '*';
    //repeatStr是在上面定义过的（字符串循环复制），大家注意哦
    if (regArr.length === 3 && type === 0) {
      regtext = '(\\w{' + regArr[0] + '})\\w{' + regArr[1] + '}(\\w{' + regArr[2] + '})'
      Reg = new RegExp(regtext);
      var replaceCount = this.repeatStr(replaceText, regArr[1]);
      return str.replace(Reg, '$1' + replaceCount + '$2')
    }
    else if (regArr.length === 3 && type === 1) {
      regtext = '\\w{' + regArr[0] + '}(\\w{' + regArr[1] + '})\\w{' + regArr[2] + '}'
      Reg = new RegExp(regtext);
      var replaceCount1 = this.repeatStr(replaceText, regArr[0]);
      var replaceCount2 = this.repeatStr(replaceText, regArr[2]);
      return str.replace(Reg, replaceCount1 + '$1' + replaceCount2)
    }
    else if (regArr.length === 1 && type === 0) {
      regtext = '(^\\w{' + regArr[0] + '})'
      Reg = new RegExp(regtext);
      var replaceCount = this.repeatStr(replaceText, regArr[0]);
      return str.replace(Reg, replaceCount)
    }
    else if (regArr.length === 1 && type === 1) {
      regtext = '(\\w{' + regArr[0] + '}$)'
      Reg = new RegExp(regtext);
      var replaceCount = this.repeatStr(replaceText, regArr[0]);
      return str.replace(Reg, replaceCount)
    }
  }
  ```
- 格式化处理字符串
  ```js
  //ecDo.formatText('1234asda567asd890')
  //result："12,34a,sda,567,asd,890"
  //ecDo.formatText('1234asda567asd890',4,' ')
  //result："1 234a sda5 67as d890"
  //ecDo.formatText('1234asda567asd890',4,'-')
  //result："1-234a-sda5-67as-d890"
  function formatText(str, size, delimiter) {
    var _size = size || 3, _delimiter = delimiter || ',';
    var regText = '\\B(?=(\\w{' + _size + '})+(?!\\w))';
    var reg = new RegExp(regText, 'g');
    return str.replace(reg, _delimiter);
  }
  ```
- 现金额大写转换函数
  ```js
  //ecDo.upDigit(168752632)
  //result："人民币壹亿陆仟捌佰柒拾伍万贰仟陆佰叁拾贰元整"
  //ecDo.upDigit(1682)
  //result："人民币壹仟陆佰捌拾贰元整"
  //ecDo.upDigit(-1693)
  //result："欠人民币壹仟陆佰玖拾叁元整"
  function upDigit(n) {
    var fraction = ['角', '分', '厘'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [
      ['元', '万', '亿'],
      ['', '拾', '佰', '仟']
    ];
    var head = n < 0 ? '欠人民币' : '人民币';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
      s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
      var p = '';
      for (var j = 0; j < unit[1].length && n > 0; j++) {
      p = digit[n % 10] + unit[1][j] + p;
      n = Math.floor(n / 10);
      }
      s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
      //s = p + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
  } 

  ```
- 保留2位小数
  ```js
  function toDecimal2(x){
    var f = parseFloat(x);
    if (isNaN(f)) {
      return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
  }
  ```


## 116、Vue弹窗后如何禁止滚动条滚动？
在有弹出框的页面中，弹出框出现时调用禁止滚动方法`stopScroll()`。
```js
//禁止滚动
stopScroll(){
  var mo = function(e){ e.preventDefault(); };
  document.body.style.overflow = 'hidden';
  document.addEventListener("touchmove",mo,false);//禁止页面滑动
}
```
弹出框取消时调取允许滚动方法`canScroll()`即可恢复滚动。
```js
/***允许滚动***/
canScroll(){
  var mo = function(e){ e.preventDefault(); };
  document.body.style.overflow='';//出现滚动条
  document.removeEventListener("touchmove",mo,false);
}
```


## 117、vue怎么实现页面的权限控制
利用`vue-router`的`beforeEach`事件，可以在跳转页面前判断用户的权限（利用`cookie`或`token`），是否能够进入此页面，如果不能则提示错误或重定向到其他页面，在后台管理系统中这种场景经常能遇到。


## 118、Vue如何优化首屏加载速度？
1. **使用路由懒加载(异步组件)**：将页面拆分为多个模块，按需加载，避免一次性加载过多的资源。
2. **使用keep-alive缓存组件**：使用keep-alive缓存组件可以避免重复渲染和重复请求数据，提高页面的响应速度。
3. **静态资源压缩和CDN加速**：对静态资源进行压缩和使用CDN加速，可以减少网络请求时间，提高页面的加载速度。
4. **减少HTTP请求个数**：使用webpack打包工具合并和压缩代码、样式等文件，减少HTTP请求的数量。
5. **服务端渲染(SSR)**：通过服务端渲染可以在服务器端将页面内容渲染出来，减少客户端的请求时间，提高首屏加载速度。
6. **开启gzip压缩**：开启服务器端的gzip压缩功能可以减小传输体积，提高页面加载速度。
7. **前端性能监控**：使用前端性能监控工具对页面进行分析，找到影响页面性能的瓶颈，并做出相应的优化措施。

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


## 119、Vue打包命令是什么？
打包命令其实是自己在`package.json`中配置的命令

**Vue-cli**
```shell
vue-cli-service build
```
**Vite**
```shell
vite build
```


## 120、Vue打包后会生成哪些文件？
Vue打包后会在当前工作目录下生成一个`dist`文件夹，文件夹中会有`static`静态文件以及`index.html`初始页面。然后`static`又会包含一些静态文件的文件夹
```
dist
  - static
    - css
    - js
    - png
    - ttf
  - index.html
```


## 121、如何配置 vue 打包生成文件的路径？
**vue-cli**
```js
// vue.config.js
module.exports = {
  outputDir: 'dist'
}
```
**vite**
```js
import { defineConfig } from 'vite'
export default defineConfig({
  build: {
    outDir: 'dist',
  }
})
```


## 122、Vue开发命令 npm run dev 输入后的执行过程
`npm run XXX`是执行配置在`package.json`中的脚本，比如：
```json
"scripts": {
  "dev": "vite", // 启动开发服务器，别名：`vite dev`，`vite serve`
  "build": "vite build", // 为生产环境构建产物
  "preview": "vite preview" // 本地预览生产构建产物
},
```
这里就是执行了`vite`开发与构建工具自带的`vite`命令。


## 123、Vue.js全局运行机制
全局运行机制主要分为以下几个方面：
1. **创建Vue实例**：通过实例化Vue构造函数创建一个 Vue 实例，可以在实例化时传入一些配置参数。
2. **数据响应式**：Vue通过`Object.defineProperty()`方法对数据进行劫持，从而实现数据响应式更新。
3. **模板解析**：Vue将模板转换为虚拟DOM，并通过`diff算法`对比新旧虚拟 DOM 的差异，最终只对需要更新的部分进行实际 DOM 操作。
4. **组件注册和使用**：Vue 允许将应用划分为多个组件，每个组件都有自己的数据、逻辑和模板。通过注册组件并在父组件中使用子组件来实现应用的复用和可维护性。
5. **生命周期**：Vue组件有生命周期钩子函数，在组件不同的阶段执行特定的代码，如`created、mounted`等等。
6. **全局API**：Vue定义了许多全局 API，如`Vue.extend、Vue.directive、Vue.filter`等等，用于扩展 Vue 的功能或修改全局配置。


## 124、Vue如何编译 template 模板？
我们知道`<template></template>`这个是模板，不是真实的`HTML`，浏览器是不认识模板的，所以我们需要把它编译成浏览器认识的原生的HTML。

主要流程：
- 提取出模板中的原生 HTML 和非原生 HTML，比如绑定的属性、事件、指令等等
- 经过一些处理生成`render`函数
- `render`函数再将模板内容生成对应的`vnode`
- 再经过`patch`过程( Diff )得到要渲染到视图中的`vnode`
- 最后根据`vnode`创建真实的 DOM 节点，也就是原生 HTML 插入到视图中，完成渲染


## 125、批量异步更新策略及nextTick原理？
在Vue.js中，当多次修改数据时，Vue.js会将这些修改操作放入一个队列中，并在下一个"事件循环(event loop)"周期中批量异步更新视图。这个策略被称为"批量异步更新(Batched Asynchronous Updates)"，它可以避免不必要的DOM操作，提高性能和效率。
> 具体来说，在每次修改数据时，Vue.js会将该修改操作包装成一个"Watcher"对象，并将其推入一个队列中。然后，Vue.js会调用"nextTick"方法，在下一个"事件循环(event loop)"周期中异步地执行队列中的所有Watcher对象，从而更新视图。

"nextTick"方法的实现原理基于两种机制：微任务(microtask)和宏任务(macrotask)。在浏览器中，"Promise"对象和"MutationObserver"对象都属于微任务，而"setTimeout"和"setImmediate"等对象则属于宏任务。Vue.js会首先尝试使用微任务执行队列中的Watcher对象，如果当前环境不支持微任务，则会使用宏任务。


## 126、Vue中如何实现proxy代理？
在vue日常开发中，会遇到跨域的问题，通常会在项目下配置`proxy`代理。
::: tip Proxy实现原理
vue中的`proxy`就是利用了`Node`代理，原理还是因为服务器端没有跨域这一说法，也是用了这么一个插件地址。
:::
- **vue-cli**: 配置代理
  ```js
  // vue.config.js
  module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://e.dxy.net',  // 后台接口域名
          ws: true,        //如果要代理 websockets，配置这个参数
          secure: false,  // 如果是https接口，需要配置这个参数
          changeOrigin: true,  //是否跨域
          pathRewrite: { // 将 '/api' 替换成 ''
            '^/api': ''
          }
        }
      }
    }
  }
  ```
- **vite**: 配置代理
  ```js
  // vite.config.js
  export default defineConfig({
    server: {
      // 开发服务器配置自定义代理规则
      proxy: {
        '/api': {
          target: `http://e.dxy.net`,
          changeOrigin: true,
          ws: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
  })
  ```
  这里理解成用`/api`代替`target`里面的地址，后面组件中我们掉接口时直接用`api`代替，比如我要调用`'http://e.dxy.net/xxx/duty?time=2017-07-07 14:57:22'`，直接写`/api/xxx/duty?time=2017-07-07 14:57:22`即可.


## 127、vue 中如何实现 tab 切换功能？
- **方式一**: 使用`v-if`和`v-else`切换
  ```html
  <template>
    <div id="app">
      <div class="c-tabs">
        <div class="c-tabs-header">
          <div
            v-for="(item, index) in tabs"
            :key="item.name"
            :class="['c-tabs-item', { active: active === item.name }]"
            @click="handleClick(item)">
            {{ item.label }}
          </div>
        </div>
        <div class="c-tabs-content">
          <div class="c-tabs-pane"
            v-for="(item, index) in tabs"
            :key="'pane-' + item.name">
            <template v-if="active === item.name">
              {{ item.label }}
            </template>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  export default {
    data () {
      return {
        active: 'first',
        tabs: [
          { name: 'first', label: '用户管理' },
          { name: 'second', label: '角色管理' },
          { name: 'third', label: '配置管理' }
        ]
      }
    },
    methods: {
      handleClick (item) {
        this.active = item.name
      }
    },
  }
  </script>
  <style lang="scss">
  .c-tabs {
    border: 1px solid #ddd;
    display: flex;
    flex-direction: column;
    &-header {
      display: flex;
      border-bottom: 1px solid #ddd;
      .c-tabs-item {
        padding: 8px 10px;
        border: 1px solid #ddd;
        margin-left: -1px;
        margin-top: -1px;
        margin-bottom: -1px;
        cursor: pointer;
        &.active {
          color: red;
          border-bottom: none;
        }
      }
    }
    &-content {
      padding: 20px;
    }
  }
  </style>
  ```
- **方式二**: 使用`is`动态组件
  ```html
  <template>
    <div id="app">
      <div class="c-tabs">
        <div class="c-tabs-header">
          <div
            v-for="(item, index) in tabs"
            :key="item.name"
            :class="['c-tabs-item', { active: active === item.name }]"
            @click="handleClick(item)">
            {{ item.label }}
          </div>
        </div>
        <div class="c-tabs-content">
          <component :is="'com-' + active"></component>
        </div>
      </div>
    </div>
  </template>
  <script lang="ts">
  ....
  export default {
    components: {
      ...
    },
    data () {
      return {
        active: 'first',
        tabs: [
          { name: 'first', label: '用户管理' },
          { name: 'second', label: '角色管理' },
          { name: 'third', label: '配置管理' }
        ]
      }
    },
    methods: {
      handleClick (item) {
        this.active = item.name
      }
    },
  }
  </script>
  <style lang="scss">
    ...
  </style>
  ```
- **方式三**: 使用路由`router`实现`tab`切换
  ```html
  <template>
    <div>
      <router-link :to="'/home'">首页</router-link> | <router-link :to="'/about'">关于</router-link>
      <router-view></router-view>
    </div>
  </template>
  ```
  路由定义
  ```js
  // router/index.js
  //创建router实例，并定义导航和组件的映射关系
  const router = new VueRouter({
    //配置routes
    routes: [
      {
        path: '/home',
        component:  HomeComponent
      },
      {
        path: '/about',
        component: AboutComponent
      }
    ]
  })
  ```


## 129、vue 中如何利用 keep-alive 标签实现某个组件缓存功能？
`<keep-alive>`是Vue的一个内置组件，它的功能是在多个组件间动态切换时缓存被移除的组件实例。
> `<KeepAlive>`默认会缓存内部的所有组件实例，我们可以通过`include`和`exclude`属性来定制该行为。这两个`prop`的值都可以是一个以英文逗号分隔的字符串、一个正则表达式，或是包含这两种类型的一个数组<br>
::: tip 注意
`<keep-alive>`会根据组件的`name`选项进行匹配，所以组件如果想要条件性地被`KeepAlive`缓存，就必须显式声明一个`name`选项。
:::
```html
<!-- Home.vue -->
<template>
  <div>
    <p>不缓存组件</p>
    <input type="text" v-model="value">
  </div>
</template>
<script lang="ts">
export default {
  name: 'Home',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<!-- About.vue -->
<template>
  <div>
    <p>缓存组件</p>
    <input type="text" v-model="value">
  </div>
</template>

<script lang="ts">
export default {
  name: 'About',
  data () {
    return {
      value: ''
    }
  }
}
</script>

<!-- App.vue -->
<template>
  <div id="app">
    <button :class="{ active: active === 'home' }" @click="active = 'home'">首页</button>
    <button :class="{ active: active === 'about' }" @click="active = 'about'">关于</button>
    <keep-alive :include="['About']">
      <component :is="active + '-component'"></component>
    </keep-alive>
  </div>
</template>
<script lang="ts">
import HomeComponent from './views/Home.vue'
import AboutComponent from './views/About.vue'
export default {
  components: {
    HomeComponent,
    AboutComponent
  },
  data () {
    return {
      active: 'home'
    }
  },
}
</script>
<style lang="scss">
.active {
  color: red;
}
</style>
```
上面例子中，我们分别在`首页`的输入框中输入`123`，然后在`关于`的输入框中输入`234`，然后来回切换按钮，可以发现`首页`的`123`被清除了，而`关于`的`234`却依然存在。


## 130、vue 中实现切换页面时为左滑出效果
在 Vue 中实现页面左滑出效果，可以使用 Vue 的过渡效果配合 CSS3 动画来实现。具体步骤如下：
1. 在需要实现动画的组件中添加`<transition>`标签，并设置`name`属性为动画名称，如下所示：
  ```html
  <transition name="slide-left">
    <!-- 页面内容 -->
  </transition>
  ```
2. 在 CSS 样式表中定义动画效果，这里以从右向左滑出为例，CSS 代码如下：
  ```css
  /* 定义进入动画 */
  .slide-left-enter-active {
    animation: slide-in-left 0.3s ease-out;
  }
  /* 定义离开动画 */
  .slide-left-leave-active {
    animation: slide-out-left 0.3s ease-out;
  }
  /* 定义进入时的初始状态和离开时的最终状态 */
  .slide-left-enter,
  .slide-left-leave-to {
    transform: translateX(100%);
  }
  /* 定义进入时的最终状态和离开时的初始状态 */
  .slide-left-enter-to,
  .slide-left-leave {
    transform: translateX(0);
  }
  /* 定义动画关键帧 */
  @keyframes slide-in-left {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
  @keyframes slide-out-left {
    from { transform: translateX(0); }
    to { transform: translateX(-100%); }
  }
  ```
3. 最后，当路由进行跳转时，在路由配置中添加`meta`属性，用于标记当前页面是否要应用动画效果，如下所示：
  ```js
  const routes = [
    {
      path: '/foo',
      component: Foo,
      meta: {
        transition: 'slide-left'
      }
    },
    {
      path: '/bar',
      component: Bar,
      meta: {
        transition: 'slide-left'
      }
    }
  ]
  ```
4. 在根组件中监听`$route`的变化，根据当前路由的`meta.transition`属性来判断是否需要应用动画效果，并将动画名称传递给`<transition>`组件，如下所示：
  ```html
  <template>
    <div id="app">
      <transition :name="currentTransitionName">
        <router-view></router-view>
      </transition>
    </div>
  </template>

  <script>
  export default {
    computed: {
      currentTransitionName() {
        const to = this.$route.meta.transition
        const from = this.$route.meta.transition
        return to || from || 'fade'
      }
    }
  }
  </script>
  ```
通过以上步骤，就可以在 Vue 中实现页面左滑出效果了。


## 131、vue中央事件总线的使用
什么是事件总线?
> 通过创建一个新的`vm`对象，专门统一注册事件，供所有组件共同操作，达到所有组件随意隔代传值的效果。也就是：各个组件内部要传输的数据或者要执行的命令信息，靠bus来通信。

Vue2中是采用创建新的`vm`对象，Vue3中使用`mitt`库（`app.config.globalProperties.$bus = new mitt()`）
::: tip 事件总线原理
`eventBus`其实就是一个发布订阅模式，利用 Vue 的自定义事件机制，在触发的地方通过`$emit`向外发布一个事件，在需要监听的页面，通过`$on`监听事件。

bus.ts
```ts
class EventBus {
  events: any
  constructor () {
    // 事件中心
    // 存储格式: warTask: [], routeTask: []
    // 每种事件(任务)下存放其订阅者的回调函数
    this.events = {}
  }
  // 订阅
  on (type, cb) {
    if (!this.events[type]) {
      this.events[type] = []
    }
    this.events[type].push(cb)
  }
  // 发布
  emit (type, ...args) {
    if (this.events[type]) {
      this.events[type].forEach(el => el(...args))
    }
  }
}
export default EventBus
```
main.ts
```ts
import Vue from 'vue'
import EventBus from './bus'
Vue.prototype.$bus = new EventBus()
```
App.vue
```html
<template>
  <div id="app">
    <home-component></home-component>
  </div>
</template>
<script lang="ts">
import HomeComponent from '@/views/Home.vue'
export default {
  components: {
    HomeComponent
  },
  created () {
    this.$bus.on('custom', (msg) => {
      console.log(msg)
    })
  }
}
</script>
```
Home.vue
```html
<template>
  <div>
    <button @click="handleClick">点击</button>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    handleClick () {
      this.$bus.emit('custom', '哈哈哈')
    }
  }
}
</script>
```
:::

事件总线定义
```js
// bus.js
import Vue from 'vue'
const vue = new Vue()
export default vue
// main.js中绑定到vue原型上
import bus from './bus.js'
Vue.prototype.$bus = bus
```
A组件中监听事件
```html
<!-- A.vue -->
<script>
export default {
  created () {
    this.$bus.on('custom', (msg) => {
      console.log(msg)
    })
  }
}
</script>
```
B组件中触发事件
```html
<!-- B.vue -->
<script>
export default {
  methods: {
    handleClick  () {
      this.$bus.emit('custom', '点击触发')
    }
  }
}
</script>
```



## 132、vue 的渲染机制
在Vue.js中，DOM渲染的过程是基于虚拟DOM(Virtual DOM)的。当数据发生变化时，Vue.js会首先生成新的虚拟DOM树，然后将其与旧的虚拟DOM树进行比较，并仅更新差异部分，从而避免不必要的DOM操作，提高性能和效率。这个过程涉及两个重要的算法：diff算法和patch算法。
- **diff算法**
  - diff算法用于比较两棵虚拟DOM树的差异，并生成一组最小的DOM操作指令。具体来说，diff算法会按照深度优先的顺序遍历新的虚拟DOM树，同时对比旧的虚拟DOM树，找出不同之处。在比较过程中，diff算法会尽可能地复用旧的DOM节点，以减少创建和销毁DOM节点的开销。diff算法的核心思想是“相同则不更新”，即如果两个节点的标签名、属性和子元素都相同，则认为它们是相同的，不需要更新；否则需要进行相应的更新操作。
- **patch算法**
  - patch算法用于执行生成的DOM操作指令，将变更应用到真实的DOM树上。具体来说，patch算法会按照指令列表中的顺序执行增加、更新和删除操作，从而将DOM树更新到与虚拟DOM树相同的状态。在执行更新操作时，patch算法会尽可能地复用旧的DOM节点，以减少创建和销毁DOM节点的开销。patch算法的核心思想是“最小化变更”，即尽可能地减少对DOM树的操作次数，从而提高性能和效率。


## 133、如何让 CSS 只在当前组件中起作用
将当前组件的 `<style>`修改为`<style scoped>`


## 135、你们vue项目是打包了一个js文件，一个css文件，还是有多个文件？
多个文件。Vite 默认会将你的应用程序打包为单个 JavaScript 文件，但你可以通过在`vite.config.js`中配置`build.rollupOptions.output`来控制如何生成输出文件。
```js
// 要将输出文件拆分为多个文件，可以像下面这样配置
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        // 将代码拆分成多个 chunk
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // 指定输出文件名格式
        format: 'es',
        chunkFileNames: '[name]-[hash].js'
      }
    }
  }
}
```
上述配置中，我们通过`manualChunks`方法指定了一个自定义的拆分规则，当模块路径中包含`node_modules`字符串时，将其拆分到一个名为`vendor.js`的`chunk`中。然后，我们使用`chunkFileNames`指定了输出文件的命名格式，其中`[name]`表示`chunk`的名称，`[hash]`则是根据文件内容生成的`hash`值。
> 如果需要进一步控制打包结果，还可以使用其他配置项来定制`rollup`的行为，例如`input、external、plugins`等。具体请参考 Vite 官方文档。


## 136、vue遇到的坑，如何解决的？
1. 使用element-ui的全局loading时，当我们的调用接口后会发现滚动条置顶
  - 解决办法: 最新解决方案：在`starLoading`时添加`fullscreen:false`属性，解决上传后滚动条重置到最顶部
2. vue滚动行为用法，进入路由需要滚动到浏览器底部、头部等等
  - 解决办法: 使用`vue-router`提供的`scrollBehavior`在页面之间导航时控制滚动的函数。
    ```js
    const router = newVueRouter({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) { //如果savedPosition存在，滚动条会自动跳到记录的值的地方
        return savedPosition
      } else {
        return { x: 0, y: 0 }//savedPosition也是一个记录x轴和y轴位置的对象
        }
      },
      routes: [...]
    })
    ```
3. 在`App.vue`中获取数据，然后所有资源采用获取的基地址访问出现加载失败
  > 在开发中由于数据库里的存的都是相对路径，所以需要拼接基地址，而基地址也是存于数据库中，在`App.vue`中获取数据，然后在对应的地方拼接地址，发现加载失败。
  - 解决办法: 在路由前置守卫中获取数据。
4. 在路由前置守卫中获取数据，然后动态加载路由，发现访问失败
  - 解决办法: 采用`next({ ...to, replace: true })`再走一遍守卫。
5. 数据改变，而视图未更新
  > 当在data中定义了一个`obj`对象`{ name: '张三' }`，然后后续需要使用`age`，则直接通过`this.obj.age = 23`添加数据，发现数据改变了视图未更新
  - 解决方案: 使用`vm.$set`、全局声明`key`。
6. `vue-router`使用`hash`模式时，使用锚点无效。
  - 解决办法: 
    - 使用`el.scroolTo({ top: 100, left: 100,  behavior: 'smooth' })`
    - 使用`Element.scrollIntoView`方法
    ```js
    element.scrollTo(100, 100)
    element.scrollTo({
      top: 100,
      left: 100,
      behavior: 'smooth'
    });

    element.scrollIntoView(true)  // 元素的顶部将与可滚动祖先的可见区域的顶部对齐  默认值
    element.scrollIntoView(false) // 元素的底部将与可滚动祖先的可见区域的底部对齐。
    element.scrollIntoView({
      behavior: "smooth",//定义过渡动画。其中一个auto或smooth。默认为auto.
      block: "end", //定义垂直对齐。一start，center，end，或 nearest。默认为start.
      inline: "nearest",//定义水平对齐方式。一start，center，end，或 nearest。默认为nearest.
    });
    ```
7. 样式污染：在vue日常开发中，由于多人开发，习惯的将样式写在但文件中，并且不使用`scoped`属性，就导致样式污染
  - 解决办法: 
    - 给`style`标签添加`scoped`属性
    - 每个人样式名添加独有前缀，如`c-container`。
8. 样式覆盖问题: 在使用第三方组件库时，需要修改样式覆盖，但又不能使全局样式覆盖，只在当前使用地方使用独有样式，直接设置覆盖样式未生效
  - 解决办法: 
    - 未使用`scoped`: 在当前组件中使用
      ```html
      <style lang="scss">
        .c-page1 {
          .el-tabs {
            .el-tab-item {
              color: red !important;
            }
          } 
        }
      </style>
      ```
    - 使用`scoped`: 在当前组件中使用深度作用选择器
      ```html
      <style lang="scss" scoped>
        .c-page1 {
          <!-- :deep(.el-tab-item) || /deep/ .el-tab-item || >>> .el-tab-item || .image-uploader::v-deep .el-upload-dragger -->
          .el-tabs :deep(.el-tab-item) {
            color: red;
          }
        }
      </style>
      ```
9. 本地开发跨域
  - 解决方案: 使用构建工具提供的`proxy`代理。
10. 在`v-for`时，为每个子元素绑定的`key`为`index`时发生错乱
  - 解决办法: 为每个子元素绑定不重复的唯一值


## 137、如何引入scss？引入后如何使用？
安装scss依赖包
```shell
npm install sass-loader --save-dev
npm install node-sass --save-dev
```
在vue文件中应用scss时，需要在style样式标签上添加`lang="scss"`，即`<style lang="scss">`，或者直接使用`@import './style.scss'`即可。


## 138、vue-cli 工程常用的 npm 命令有哪些？
```shell
npm install # 安装依赖包
vue create my-project # 创建新的项目
npm run dev # 启动 vue-cli 开发环境
npm run serve # 启动 vue-cli 开发环境
npm run build # vue-cli 生成 生产环境部署资源
npm run lint # 代码运行检查工具ESlint
vue ui # 启动一个可视化界面来管理项目和插件
```


## 139、config 文件夹 下 index.js 的对于工程 开发环境 和 生产环境 的配置
![2023031120425610.png](http://img.itchenliang.club/img/2023031120425610.png)
build对象下对于`生产环境`的配置：
- index：配置打包后入口.html文件的名称以及文件夹名称
- assetsRoot：配置打包后生成的文件名称和路径
- assetsPublicPath：配置 打包后 .html 引用静态资源的路径，一般要设置成 "./"
- productionGzip：是否开发 gzip 压缩，以提升加载速度

![2023031120434310.png](http://img.itchenliang.club/img/2023031120434310.png)
dev对象下对于`开发环境`的配置：
- port：设置端口号
- autoOpenBrowser：启动工程时，自动打开浏览器
- proxyTable：vue设置的代理，用以解决 跨域 问题


## 140、请你详细介绍一些 package.json 里面的配置
```json
{
  "name": "moment",
  "version": "1.0.0",
  "description": "描述信息",
  "main": "index.js",
  "dependencies": {
    "moment": "^1.0.0",
    "axios": "^1.2.6"
  },
  "devDependencies": {},
  "scripts": {
    "test": "node ./index.js"
  },
  "repository": {
    "type": "git",
    "url": "github地址"
  },
  "keywords": [
    "vue"
  ],
  "author": "作者",
  "license": "ISC"
}
```
- **必须属性**
  - name: 项目的名称。在`npm`官网搜索到的包名就是该字段的值。
  - version: 项目包的版本号。每次项目改动后，即将发布时，都要同步的去更改项目的版本号。版本号的使用规范如下：`X.Y.Z`
    - X 为主版本号major： 通常在涉及重大功能更新,产生了破坏性变更时会更新此版本号;
    - Y 为次版本号Minor：在引入了新功能,但并未产生破坏性变更,依然向下兼容时更新此版本号;
    - Z 为修订号Patch： 在修复了一些问题,但未产生破坏性变更时会更新此版本号;
      ```shell
      # 查看最新版本
      npm view react version
      # 查看所有版本
      npm view react versions
      ```
- **描述信息**
  - description: 用来描述这个项目包，可以让其他开发者在`npm`的搜索中发现我们的项目包。
    ![202303121009047.png](http://img.itchenliang.club/img/202303121009047.png)
  - keywords: 表示项目包的关键词，是一个字符串数组。和`description`一样，都是用来增加项目包的曝光率的。
  - author: 表示该项目包的作者。它有两种形式；
    - 一种是字符串格式
      ```json
      "author": "YX<xxxxx@xx.com> (https://yx.cn/user/123456)"
      ```
    - 另一种是对象形式
      ```json
      "author": {
        "name" : "YX",
        "email" : "xxxxx@xx.com",
        "url" : "https://yx.cn/user/123456"
      }
      ```
  - homepage: 项目主页的链接,通常是项目 github 链接,项目官网或者文档首页,如果是 npm 包,会在这里显示:
    ![202303121009512.png](http://img.itchenliang.club/img/202303121009512.png)
  - repository: 用于指定代码所在的位置,通常是 github,如果是 npm 包,则会在包的首页中显示:
    ![202303121011229.png](http://img.itchenliang.club/img/202303121011229.png)
    通常有两种写法:
    - 写法一
      ```json
      "repository": "https://github.com/facebook/react.git"
      ```
    - 写法二
      ```json
      "repository": {
        "type": "git",
        "url": "https://github.com/facebook/react.git"
      }
      ```
  - contributors: 表示该项目包的贡献者，和 author 不同的是，该字段是一个数组，包含所有的贡献者，它同样有两种写法：
    - 写法一
      ```json
      "contributors": [
        "YX1<xxxxx@xx.com> (https://juejin.cn/user/123456)",
        "YX2<xxxxx@xx.com> (https://juejin.cn/user/123456)"
      ]
      ```
    - 写法二
      ```json
      "contributors": [
        {
          "name" : "YX1",
          "email" : "xxxxx@xx.com",
          "url" : "https://juejin.cn/user/123456"
        },
          {
          "name" : "YX2",
          "email" : "xxxxx@xx.com",
          "url" : "https://juejin.cn/user/123456"
        }
      ]
      ```
  - bugs: 表示项目提交问题的地址,该字段是一个字符串也可以是一个对象,最常见的 bugs 是 github 的issue,例如 react 中的 bugs 是这样的:
  ```json
  "bugs": "https://github.com/facebook/react/issues"
  // 或者
  "bugs": { 
    "url" : "https://github.com/facebook/react/issues",
    "email" : "xxxxx@xx.com"
  }
  ```
- **依赖配置**
  - type: 表示在 Node 环境中可以使用的模块化方式,默认是 CommonJs,另外还可以选择 EsModule。
  - dependencies: 代表项目的生产环境中所必须的依赖包。使用命令`--save`或者说不写命令`--save`,都会把信息记录到`dependencies`中
  - devDependencies: 声明的是开发阶段需要的依赖包，如 Webpack、Eslint、Babel 等，用于辅助开发。
    > 它们不同于 dependencies，因为它们只需安装在开发设备上，而无需在生产环境中运行代码。当打包上线时并不需要这些包，所以可以把这些依赖添加到 devDependencies中，这些依赖依然会在本地指定 npm install 时被安装和管理，但是不会被安装到生产环境中。
  - engines: 当我们维护一些旧项目时，可能对`npm`包的版本或者`Node`版本有特殊要求，如果不满足条件就可能无法将项目跑起来。为了让项目开箱即用，可以在 `engines`字段中说明具体的版本号
    ```json
    "engines": {
      "node": ">=8.10.3 <12.13.0",
      "npm": ">=6.9.0"
    }
    ```
    需要注意，`engines`只是起一个说明的作用，即使用户安装的版本不符合要求，也不影响依赖包的安装。
- **脚本配置**
  - scripts: `scripts`是`package.json`中内置的脚本入口，是`key-value`键值对配置，`key`为可运行的命令，可以通过`npm run`来执行命令。除了运行基本的 `scripts`命令，还可以结合`pre`和`post`完成前置和后续操作。先来看一组`scripts`：
    ```json
    "scripts": {
      "dev": "node index.js",
      "predev": "node beforeIndex.js",
      "postdev": "node afterIndex.js"
    }
    ```
    这三个 js 文件中都有一句`console`：
    ```js
    // index.js
    console.log("scripts: index.js")
    // beforeIndex.js
    console.log("scripts: before index.js")
    // afterIndex.js
    console.log("scripts: after index.js")
    ```
    当我们执行`npm run dev`命令时，输出结果如下：
    ```
    scripts: before index.js
    scripts: index.js
    scripts: after index.js
    ```
    可以看到，三个命令都执行了，执行顺序是`predev→dev→postdev`。如果`scripts`命令存在一定的先后关系，则可以使用这三个配置项，分别配置执行命令。
    通过配置`scripts`属性，可以定义一些常见的操作命令：
    ```json
    "scripts": {
      "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
      "start": "npm run dev",
      "unit": "jest --config test/unit/jest.conf.js --coverage",
      "test": "npm run unit",
      "lint": "eslint --ext .js,.vue src test/unit",
      "build": "node build/build.js"
    }
    ```
    这些脚本是命令行应用程序。可以通过调用`npm run XXX`或`yarn XXX`来运行它们，其中`XXX`是命令的名称。例如：`npm run dev`。我们可以为命令使用任何的名称，脚本也可以是任何操作。
  - config: `config`字段用来配置`scripts`运行时的配置参数，如下所示：
    ```json
    "config": {
      "port": 3000
    }
    ```
    如果运行`npm run start`，则`port`字段会映射到`npm_package_config_port`环境变量中：
    ```js
    console.log(process.env.npm_package_config_port) // 3000
    ```
    用户可以通过`npm config set foo:port 3001`命令来重写`port`的值。
- **文件&目录**
  - main: `main`字段用来指定加载的入口文件，在`browser`和`Node`环境中都可以使用。如果我们将项目发布为`npm`包，那么当使用`require`导入`npm`包时，返回的就是`main`字段所列出的文件的`module.exports`属性。如果不指定该字段，默认是项目根目录下的`index.js`。如果没找到，就会报错。
    ```json
    "main": "./src/index.js",
    ```
  - browser: `browser`字段可以定义`npm`包在`browser`环境下的入口文件。如果`npm`包只在`web`端使用，并且严禁在`server`端使用，使用`browser`来定义入口文件。
    ```json
    "browser": "./src/index.js" 
    ```
  - module: `module`字段可以定义`npm`包的`ESM`规范的入口文件，`browser`环境和`node`环境均可使用。如果`npm`包导出的是`ESM`规范的包，使用`module`来定义入口文件。
    ```json
    "module": "./src/index.mjs",
    ```
    需要注意，`.js`文件是使用`commonJS`规范的语法(`require(‘xxx’)`)，`.mjs`是用`ESM`规范的语法(`import ‘xxx’`)。
  上面三个的入口入口文件相关的配置是有差别的，特别是在不同的使用场景下。在`Web`环境中，如果使用`loader`加载`ESM（ES module）`，那么这三个配置的加载顺序是`browser→module→main`，如果使用`require`加载`CommonJS`模块，则加载的顺序为`main→module→browser`。
  - bin: `bin`字段用来指定各个内部命令对应的可执行文件的位置
    ```json
    "bin": {
      "someTool": "./bin/someTool.js"
    }
    ```
    这里，`someTool`命令对应的可执行文件为`bin`目录下的`someTool.js`，`someTool.js`会建立符号链接`node_modules/.bin/someTool`。由于 `node_modules/.bin/`目录会在运行时加入系统的`PATH`变量，因此在运行`npm`时，就可以不带路径，直接通过命令来调用这些脚本。因此，下面的写法可以简写：
    ```json
      scripts: {  
      start: './node_modules/bin/someTool.js build'
    }
    // 简写
    scripts: {  
      start: 'someTool build'
    }
    ```
    所有`node_modules/.bin/`目录下的命令，都可以用`npm run [命令]`的格式运行。
  - files: `files`配置是一个数组，用来描述当把`npm`包作为依赖包安装时需要说明的文件列表。当`npm`包发布时，`files`指定的文件会被推送到`npm`服务器中，如果指定的是文件夹，那么该文件夹下面所有的文件都会被提交。
    ```json
    "files": [
      "LICENSE",
      "README.md",
      "index.js",
      "cjs/",
      "umd/",
      "jsx-runtime.js",
      "jsx-dev-runtime.js",
      "react.shared-subset.js"
    ]
    ```
  - man: `man`命令是`Linux`中的帮助指令，通过该指令可以查看`Linux`中的指令帮助、配置文件帮助和编程帮助等信息。如果`node.js`模块是一个全局的命令行工具，在`package.json`通过`man`属性可以指定`man`命令查找的文档地址：
    ```json
    "man": [
      "./man/npm-access.1",
      "./man/npm-audit.1"
    ]
    ```
    `man`字段可以指定一个或多个文件, 当执行`man {包名}`时, 会展现给用户文档内容。
- **发布配置**: 
  - license: 项目的开源许可证,你应该为你的包指定一个许可证,方便其他开发者知道如何允许他们使用它,以及你对他施加的任何限制,例如:
    ```json
    "license": "ISC"
    ```
    - MIT：只要用户在项目副本中包含了版权声明和许可声明，他们就可以拿你的代码做任何想做的事情，你也无需承担任何责任。
    - Apache：类似于 MIT ，同时还包含了贡献者向用户提供专利授权相关的条款。
    - GPL：修改项目代码的用户再次分发源码或二进制代码时，必须公布他的相关修改。
  - private: `private`字段可以防止我们意外地将私有库发布到`npm`服务器。只需要将该字段设置为`true`：
    ```json
    "private": true
    ```
  - publishConfig: `publishConfig`配置会在模块发布时生效，用于设置发布时一些配置项的集合。如果不想模块被默认标记为最新，或者不想发布到公共仓库，可以在这里配置`tag`或仓库地址。
    ```json
    // 通常情况下，publishConfig 会配合 private 来使用，如果只想让模块发布到特定 npm 仓库，就可以这样来配置：
    "private": true,
    "publishConfig": {
      "tag": "1.1.0",
      "registry": "https://registry.npmjs.org/",
      "access": "public"
    }
    ```
- **第三方配置**
  - typings: `typings`字段用来指定`TypeScript`的入口文件：
    ```json
    "typings": "types/index.d.ts",
    ```
    该字段的作用和`main`配置相同。
  - eslintConfig: `eslint`的配置可以写在单独的配置文件`.eslintrc.json`中，也可以写在`package.json`文件的`eslintConfig`配置项中。
    ```json
    "eslintConfig": {
      "root": true,
      "env": {
        "node": true
      },
      "extends": [
        "plugin:vue/essential",
        "eslint:recommended"
      ],
      "rules": {},
      "parserOptions": {
        "parser": "babel-eslint"
      },
    }
    ```
  - babel: `babel`用来指定`Babel`的编译配置，代码如下：
    ```json
    "babel": {
      "presets": ["@babel/preset-env"],
      "plugins": [...]
    }
    ```
  - unpkg: 使用该字段可以让`npm`上所有的文件都开启`cdn`服务，该`CND`服务由`unpkg`提供：
    ```json
    "unpkg": "dist/vue.js"
    ```
  - lint-staged: `lint-staged`是一个在`Git`暂存文件上运行`linters`的工具，配置后每次修改一个文件即可给所有文件执行一次`lint`检查，通常配合 `gitHooks`一起使用。
    ```json
    "lint-staged": {
      "*.js": [
        "eslint --fix",
        "git add"
      ]
    }
    ```
    使用`lint-staged`时，每次提交代码只会检查当前改动的文件。
  - gitHooks: `gitHooks`用来定义一个钩子，在提交（`commit`）之前执行`ESlint`检查。在执行`lint`命令后，会自动修复暂存区的文件。修复之后的文件并不会存储在暂存区，所以需要用`git add`命令将修复后的文件重新加入暂存区。在执行`pre-commit`命令之后，如果没有错误，就会执行`git commit`命令：
    ```json
    "gitHooks": {
      "pre-commit": "lint-staged"
    }
    ```
    这里就是配合上面的`lint-staged`来进行代码的检查操作。
  - browserslist: `browserslist`字段用来告知支持哪些浏览器及版本。`Babel、Autoprefixer`和其他工具会用到它，以将所需的`polyfill`和`fallback`添加到目标浏览器。比如最上面的例子中的该字段值：
    ```json
    "browserslist": {
      "production": [
        ">0.2%",
        "not dead",
        "not op_mini all"
      ],
      "development": [
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ]
    }
    ```
    这里指定了一个对象，里面定义了生产环境和开发环境的浏览器要求。上面的`development`就是指定开发环境中支持最后一个版本的 chrome、Firefox、safari 浏览器。这个属性是不同的前端工具之间共用目标浏览器和`node`版本的配置工具，被很多前端工具使用，比如`Babel、Autoprefixer`等。

## 141、vue-cli 中常用到的加载器
其实就是询问webpack中常用的loader，配置如下，在`rules`中配置
```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.(jpg|png|gif)$/, use: ['url-loader'] }
    ]
  }
}
```
- **css-loader**:  用于识别`.css`文件, 处理css必须配合`style-loader`共同使用，只安装`css-loader`样式不会生效。
  - 安装: `npm i style-loader -D`
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css/,
            use: ["style-loader"]
          }
        ]
      }
    }
    ```
- **style-loader**: 用于将css编译完成的样式，挂载到页面`style`标签上。需要注意`loader`执行顺序，`style-loader`放到第一位，因为`loader`都是从下往上执行，最后全部编译完成挂载到`style`上。
  - 安装: `npm i css-loader style-loader -D`
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css/,
            use: [
              "style-loader",
              "css-loader"
            ]
          }
        ]
      }
    }
    ```
- **sass-loader**: css预处理器，我们在项目开发中经常会使用到的，编写css非常便捷，一个字 “棒”。
  - 安装: `npm i sass-loader@5.0.0 node-sass -D`
  - 使用: `import "index.scss"`
  - 配置
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              "style-loader",
              "css-loader",
              "sass-loader"
            ],
            include: /src/, 
          },
        ]
      }
    }
    ```
- **postcss-loader**: 用于补充`css`样式各种浏览器内核前缀，太方便了，不用我们手动写啦。
  - 安装: `npm i postcss-loader autoprefixer -D`
  - 配置: 
    - postcss.config.js: 如果不写在该文件呢，也可以写在`postcss-loader`的`options`里面，写在该文件跟写在那里是同等的
      ```js
      module.exports = {
        plugins: [
          require("autoprefixer")({
            overrideBrowserslist: ["> 1%", "last 3 versions", "ie 8"]
          })
        ]
      }
      ```
    - webpack.config.js
      ```js
      module.exports = {
        module: {
          rules: [
            {
              test: /\.scss$/,
              use: [
                "style-loader",
                "css-loader",
                "sass-loader",
                "postcss-loader"
              ],
              include: /src/, 
            },
          ]
        }
      }
      ```
- **babel-loader**: 将Es6+ 语法转换为Es5语法。
  - 安装: `npm i babel-loader @babel/core @babel/preset-env -D`
    - babel-loader 这是使babel和webpack协同工作的模块
    - @bable/core 这是babel编译器核心模块
    - @babel/preset-env 这是babel官方推荐的预置器，可根据用户的环境自动添加所需的插件和补丁来编译Es6代码
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.js$/,
            use: {
              loader: "babel-loader",
              options: {
                presets: [
                    ['@babel/preset-env', { targets: "defaults"}]
                ]
              }
            }
          },
        ]
      }
    }
    ```
- **ts-loader**: 用于配置项目typescript
  - 安装: `npm i ts-loader typescript -D`
  - 配置: 当前配置`ts-loader`不会生效，只是会编译识别`.ts`文件, 主要配置文件在`tsconfig.json`里
    - webpack.config.js
      ```js
      module.exports = {
        entry: "./src/index.ts",
        output: {
          path: __dirname + "/dist",
          filename: "index.js",
        },
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: "ts-loader"
            },
          ]
        }
      }
      ```
    - tsconfig.json
      ```js
      {
        "compilerOptions": {
          "declaration": true,
          "declarationMap": true, // 开启map文件调试使用
          "sourceMap": true,
          "target": "es5", // 转换为Es5语法
        }
      }  
      ```
- **html-loader**: 我们有时候想引入一个html页面代码片段赋值给DOM元素内容使用，这时就用到`html-loader`
  - 安装: `npm i html-loader@0.5.5 -D`
  - 使用: index.js
    ```js
    import Content from "../template.html"
    document.body.innerHTML = Content
    ```
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.html$/,
            use: "html-loader"
          }
        ]
      }
    }
    ```
- **file-loader**: 用于处理文件类型资源，如jpg，png等图片。返回值为publicPath为准。
  - 安装: `npm i file-loader -D`
  - 使用: index.js
    ```js
    import img from "./pic.png"
    console.log(img) // https://www.baidu.com/pic_600eca23.png
    ```
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(png|jpg|jpeg)$/,
            use: [
              {
                loader: "file-loader",
                options: {
                  name: "[name]_[hash:8].[ext]",
                  publicPath: "https://www.baidu.com" 
                }
              }
            ]
          }
        ]
      }
    }
    ```
- **url-loader**: `url-loader`也是处理图片类型资源，只不过它与`file-loader`有一点不同，`url-loader`可以设置一个根据图片大小进行不同的操作，如果该图片大小大于指定的大小，则将图片进行打包资源，否则将图片转换为`base64`字符串合并到js文件里
  - 安装: `npm i url-loader -D`
  - 使用: index.js
    ```js
    import img from "./pic.png"
    ```
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(png|jpg|jpeg)$/,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[name]_[hash:8].[ext]",
                  limit: 10240, // 这里单位为(b) 10240 => 10kb
                  // 这里如果小于10kb则转换为base64打包进js文件，如果大于10kb则打包到dist目录
                }
              }
            ]
          }
        ]
      }
    }
    ```
- **html-withimg-loader**: 我们在编译图片时，都是使用`file-loader`和`url-loader`，这两个`loader`都是查找js文件里的相关图片资源，但是html里面的文件不会查找所以我们html里的图片也想打包进去，这时使用`html-withimg-loader`
  - 安装: `npm i html-withimg-loader -D`
  - 使用: index.html
    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>首页</title>
    </head>
    <body>
        <h4>我蛙人</h4>
        <img src="./src/img/pic.jpg" alt="">
    </body>
    </html>
    ```
  - 配置: 
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.(png|jpg|jpeg)$/,
            use: {
              loader: "file-loader",
              options: {
                name: "[name]_[hash:8].[ext]",
                publicPath: "http://www.baidu.com",
                esModule: false
              }
            }
          },
          {
            test: /\.(png|jpeg|jpg)/,
            use: "html-withimg-loader"
          }
        ]
      }
    }
    ```
- **eslint-loader**: 用于检查代码是否符合规范，是否存在语法错误。
  - 安装: `npm i eslint-loader eslint -D`
  - 使用: index.js
    ```js
    var abc: any = 123;
    console.log(abc)
    ```
  - 配置: 
    - .eslintrc.js
      ```js
      module.exports = {
        root: true,   
        env: {
          browser: true,
        },
        rules: {
          "no-alert": 0, // 禁止使用alert
          "indent": [2, 4], // 缩进风格
          "no-unused-vars": "error" // 变量声明必须使用
        }
      }
      ```
    - webpack.config.js
      ```js
      module.exports = {
        module: {
          rules: [
            {
              test: /\.ts$/,
              use: ["eslint-loader", "ts-loader"],
              enforce: "pre",
              exclude: /node_modules/
            },
            {
              test: /\.ts$/,
              use: "ts-loader",
              exclude: /node_modules/
            }
          ]
        }
      }

      ```
- **vue-loader**: 用于编译`.vue`文件，如我们自己搭建vue项目就可以使用`vue-loader`, 以下简单了解一下，这里就不多赘述啦。
  - 安装: `npm i vue-loader@15.7.0 vue vue-template-compiler -D`
    - vue-loader 用于识别.vue文件
    - vue 不用多说，识别支持vue语法
    - vue-template-compiler 语法模板渲染引擎 {{}} template、 script、 style
  - 使用: 
    - main.js
      ```js
      import App from "./index.vue"
      import Vue from 'Vue'
      new Vue({
          el: "#app",
          render: h => h(App) 
      })
      ```
    - index.vue
      ```html
      <template>
        <div class="index">
          {{ msg }}
        </div>
      </template>
      <script>
      export default {
      name: 'index',
        data() {
          return {
              msg: "hello 蛙人"
          }
        },
        created() {},
        components: {},
        watch: {},
        methods: {}
      }
      </script>
      <style scoped>
      </style>
      ```
  - 配置: 
    ```js
    const VueLoaderPlugin = require('vue-loader/lib/plugin')
    module.exports = {
      entry: "./src/main.js",
      output: {
          path: __dirname + "/dist",
          filename: "index.js",
      },
      module: {
          rules: [
              {
                  test: /\.vue$/,
                  use: "vue-loader"
              }
          ]
      },
      plugins: [
          new VueLoaderPlugin()
      ]
    }
    ```



## 142、vue-cli 提供的几种脚手架模板
Vue CLI 提供了多种脚手架模板，可以根据不同的项目需求选择不同的模板：
1. default：默认模板，包含了 Vue.js 的基础功能和设置。
2. webpack：基于 Webpack 构建工具的模板，集成了一些常用的插件与配置。
3. webpack-simple：一个简单的 Webpack 模板，适合快速原型开发。
4. browserify：基于 Browserify 构建工具的模板，类似于 webpack 模板。
5. browserify-simple：一个简单的 Browserify 模板，适合快速原型开发。
6. pwa：一个 Progressive Web App（渐进式 Web 应用）模板，用于创建可离线访问的 Web 应用。
7. simple：一个简单的 Hello World 模板，适合学习 Vue.js 和构建简单的应用程序。
8. typescript：使用 TypeScript 语言的模板，用于创建类型安全的 Vue.js 应用程序。


## 143、vue-cli 开发环境和生产环境使用全局常量
- 开发环境的全局常量定义在`.env`文件里
- 生产环境的全局常量定义在`.env.production`文件里
```js
process.env.NODE_ENV
```


## 144、说说你对选项el,template,render的理解
- **el**: 提供一个在页面上已存在的DOM元素作为Vue实例的挂载目标。可以是CSS选择器，也可以是一个HTMLElement实例。
  - 因为所有的挂载元素会被Vue生成的DOM替换。因此不推荐挂载Vue实例到html或者body上。
  - 如果在`const vm = new Vue({})`中存在这个选项，实例将立即进入编译过程，否则，需要显式调用`vm.$mount()`手动开启编译。
  ```html
  <!-- 指定el -->
  <body>
    <div id="app">我是el挂载的内容:小明今年{{age}}岁了</div>
  </body>
  <script>
    const vm= new Vue({
      el:'#app',
      data:{
        age:17
      },
    })
  </script>

  <!-- 调用$mount -->
  <script>
    const vm= new Vue({
      data:{
        age:17
      },
    })
    vm.$mount('#app')
  </script>
  ```
- **template**: 一个字符串模板作为Vue实例的标识使用。如果`el`存在，模板将会替换挂载的元素。挂载元素的内容都将被忽略，除非模板的内容有分发插槽。
  ```html
  <script>
    const vm= new Vue({
      el:'#app',
      data:{
        age:17
      },
      template:'<div>我是template的内容:小明今年{{age}}岁了</div>',
    })
  </script>
  ```
  如果值以`#`开始，则它将被用作选择符，并使用匹配元素的`innerHTML`作为模板。
  ```html
  <script type="x-template" id="mb">
    <div>我是template的内容:小明今年{{age}}岁了</div>
  </script>
  <script>
    const vm= new Vue({
      el:'#app',
      data:{
          age:17
      },
      template:'#mb',
    })
  </script>
  ```
  ```html
  <body>
    <div id="app">
        我是el挂载的内容:小明今年{{age}}岁了
    </div>
    <template id="mb">
        <div>我是template的内容:小明今年{{age}}岁了</div>
    </template>
  </body>
  <script>
    const vm= new Vue({
      el:'#app',
      data:{
        age:17
      },
      template:'#mb',
    })
  </script>
  ```
- **render**: Vue 选项中的`render`函数若存在，则 Vue 构造函数不会从`template`选项或通过`el`选项指定的挂载元素中提取出的 HTML 模板编译渲染函数。
  ```html
  <body>
    <div id="app">
      我是el挂载的内容:小明今年{{age}}岁了
    </div>
  </body>
  <script>
    const vm= new Vue({
      el:'#app',
      data:{
        age:17
      },
      template: '<div>我是template的内容:小明今年{{age}}岁了</div>',
      render(h){
        return h('div',`我是render的内容:小明今年${this.age}岁了`)
      }
    })
  </script>
  ```


## 145、删除数组用delete和Vue.delete有什么区别？
- **delete**: 只是被删除数组成员变为`empty/undefined`，其他元素键值不变
- **Vue.delete**: 直接删了数组成员，并改变了数组的键值（对象是响应式的，确保删除能触发更新视图，这个方法主要用于避开`Vue`不能检测到属性被删除的限制）


## 146、vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法
在Vue现有阶段中，对响应式处理利用的是`Object.defineProperty`对数据进行拦截，而这个方法并不能监听到数组内部变化，数组长度变化，数组的截取变化等，所以我们需要对这些操作进行`hack`，让vue能监听到其中的变化。
> 变异的本质就在这些方法内部加上自定义的逻辑，其实就是想监听这些方法的调用。

怎么对数组进行处理?
```js
methodsToPatch.forEach(function(method) {
  // cache original method
  // 获取原方法
  var original = arrayProto[method];
  // def方法重新定义arrayMethods的method方法，然后将新的取值方法赋值
  def(arrayMethods, method, function mutator() {
    var args = [],
      len = arguments.length;
    while (len--) args[len] = arguments[len];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        // [].push(1),[].unshift(1)
        // arg = [1]
        inserted = args;
        break
      case 'splice':
        // [1,2,3].splice(0,1,1)
        // 第三个参数为插入的值
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // 监听变化，如果不是插入操作直接循环响应
    // 如果是去除数组参数方法，触发一次notify将会重新计算
    // 如果仅仅是数字数据，任何操作只需要再次执行一次notify则可以
    // 但是如果新增的是一个对象类型，就需要重新监听
    // 为什么用角标和length属性不能监听的原因是因为无法触发obj的get方法，所以没法动态监听
    // notify change
    ob.dep.notify();
    return result
  });
});
```


## 148、在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的。
在组件进行`initProps`方法的时候，会执行`defineReactive`方法，这个方法就是运行`Object.defineProperty`对传入的`object`绑定`get/set`，传入的第四个参数是触发`set`的回调。具体来说，Vue 会在子组件中使用`Object.defineProperty()`定义一个自定义的`setter`函数，用来监测`Prop`值的修改。当你试图修改 `Prop`的值时，Vue就会检测到这个变化，并给出警告信息，告诉你不应该在子组件内部改变`Prop`。


## 149、说说Vue的MVVM实现原理
> Vue的MVVM实现通过数据劫持、模板解析、编译器、渲染以及双向绑定等技术手段来实现数据与视图的自动同步。

Vue的MVVM实现原理主要包括以下几个方面：
1. **数据劫持**：Vue通过`Object.defineProperty()`方法来劫持数据的`getter`和`setter`，在数据发生变化时通知订阅者进行更新。
2. **模板解析**：Vue将模板解析成AST（Abstract Syntax Tree）语法树，用于后续的渲染。
3. **编译器**：Vue的编译器将模板转换为渲染函数，其中包含了对模板中指令、事件等的处理。
4. **渲染**：Vue通过渲染函数生成虚拟DOM，并通过diff算法比较新旧虚拟DOM的差异，从而最小化DOM操作，提高渲染效率。
5. **双向绑定**：Vue通过`v-model`指令实现双向绑定，即数据的改变会自动更新到视图上，同时视图上的改变也会同步到数据中。


## 150、使用vue开发过程你是怎么做接口管理的？
1. 首先在项目中使用的网络请求库是axios
2. 统一封装axios，即axios实例封装http请求以及请求拦截器和响应拦截的封装
  - 请求拦截器: 在此主要是做一些全局处理、包括数据格式化、添加统一请求头等
  - 响应拦截器: 在此对接口返回的数据做处理，例如获取token并存储、指定状态码处理
3. 同一类功能的封装成class，在class中封装对应的方法，并且调用第二步封装的http方法
4. 在使用地方通过引入`class`并通过`new`关键字实例化，然后通过`.`属性调用对应的功能方法


## 151、new Vue() 发生了什么？
执行以下步骤：
1. 创建一个空的 Vue 实例对象。
2. 初始化实例的生命周期、事件、数据观测等属性。
3. 如果存在`el`选项，则调用`$mount(el)`方法，挂载实例到 DOM 上。
4. 如果存在`data`选项，则将其响应式地添加到实例上。
5. 如果存在`created`钩子函数，则在实例创建完成后立即调用该钩子函数。

最终返回一个 Vue 实例对象。


## 152、vue3.x中Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？
判断当前`Reflect.get`的返回值是否为`Object`，如果是就递归通过`reactive`方法做代理， 这样就实现了深度观测。


## 153、vue3.x中监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？
在Vue 3.x中，可以使用`watchEffect`来监测响应式数据的变化。如果你想要监控数组的变化，可以使用`reactive`方法将数组转换为响应式对象，然后再使用`watchEffect`进行监测。

如果使用`watch`监测数组的变化，会出现多次触发的问题，因为数组中的每个元素都是一个独立的响应式对象，当某个元素发生变化时，它也会触发数组的变化。

若需要防止多次触发，可以使用`watchEffect`的第二个参数，即`{ flush: 'sync' }`选项来实现同步更新。这样，在数组发生变化时，会立即执行回调函数，而不会等到下一个事件循环周期。例如：
```js
import { reactive, watchEffect } from 'vue'
const arr = reactive([1, 2, 3])
watchEffect(() => {
  console.log(arr)
}, { flush: 'sync' })
arr.push(4) // 这里只会触发一次回调
```


## 155、vue 中 mixin 和 mixins 区别？
- **mixin**: 是 Vue.js 中的一个选项，用于向组件注入可复用的功能。它可以是一个对象或函数，其中包含组件选项，并且可以在组件中通过 mixins 选项来使用。**不推荐在应用代码中使用**。
  ```js
  Vue.mixin({
    beforeCreate() {
      // ...逻辑
      // 这种方式会影响到每个组件的 beforeCreate 钩子函数
    }
  })
  ```
- **mixins**: 是一个数组，用于将多个`mixin`混合到组件中。当多个`mixin`具有相同的选项时，其值将被合并为一个数组以保留所有`mixin`的值。
> 另外需要注意的是`mixins`混入的**钩子函数会先于组件内的钩子函数**执行，并且在遇到同名选项的时候也会有选择性的进行合并。
```js
var mixin = {
  created: function () { console.log(1) }
}
export default {
  mixins: [mixin]
}
```


## 156、使用Object.defineProperty()来进行数据劫持有什么缺点？
有一些对属性的操作，使用这种方法无法拦截，比如说通过下标方式修改数组数据或者给对象新增属性，vue内部通过重写函数解决了这个问题。在 Vue3.0 中已经不使用这种方式了，而是通过使用`Proxy`对对象进行代理，从而实现数据劫持。使用`Proxy`的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为这是 ES6 的语法。


## 157、什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？
我对 Virtual DOM 的理解是，首先对我们将要插入到文档中的DOM树结构进行分析，使用js对象将其表示出来，比如一个元素对象，包含`TagName`、`props`和 `Children`这些属性。然后我们将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。

当页面的状态发生改变，我们需要对页面的DOM的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。

我认为 Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少 DOM 操作带来的重流和重绘的影响。其实 Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。


## 158、如何比较两个 DOM 树的差异？
两个树的完全 diff 算法的时间复杂度为 O(n^3) ，但是在前端中，我们很少会跨层级的移动元素，所以我们只需要比较同一层级的元素进行比较，这样就可以将算法的时间复杂度降低为 O(n)。

算法首先会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个序号。在深度遍历的时候，每遍历到一个节点，我们就将这个节点和新的树中的节点进行比较，如果有差异，则将这个差异记录到一个对象中。

在对列表元素进行对比的时候，由于 TagName 是重复的，所以我们不能使用这个来对比。我们需要给每一个子节点加上一个 key，列表对比的时候使用 key 来进行比较，这样我们才能够复用老的 DOM 树上的节点。


## 159、说下vue 中的h函数
`h`函数就是vue中的`createElement`方法，这个函数作用就是创建虚拟dom，追踪dom变化的，在讲h函数之前，我们先来了解下虚拟dom：
> 虚拟dom简单来说就是一个普通的JavaScript对象，包含`tag`，`props`，`children`三个属性。。。
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
所以`h`函数就是vue中的`createElement`方法，这个函数作用就是创建虚拟dom，追踪dom变化的。


## 160、Vue.prototype、Vue.component和Vue.use的区别
1. **Vue.prototype**
  - 在很多组件里用到数据/实用工具，但是不想污染全局作用域。这种情况下，你可以通过在原型上定义它们使其在每个 Vue 的实例中可用
  - $ 是在 Vue 所有实例中都可用的 property 的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突
  - 常用于方法与变量
  ```js
  import pinyin from 'js-pinyin';
  Vue.prototype.$pinyin = pinyin;
  ```
2. **Vue.component**
  - 注册全局组件
  - 第一个参数是调用组件时写的组件名
  - 第二个参数是引入组件时写的标签名称
  - 常用于注册自定义组件
  ```js
  import JsTree from '@/components/JsTree';
  Vue.component('JsTree', JsTree);
  ```
3. **Vue.use**
  - 注册全局插件
  - 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件
  - 插件应该暴露一个`install`方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
  - 常用于注册第三方插件
  ```js
  import VueContextMenu from 'vue-contextmenu';
  Vue.use(VueContextMenu);
  ```


## 161、vue组件里的定时器要怎么销毁？
- **方式一**: 在`beforeDestroy`钩子函数里销毁
  ```js
  export defualt {
    data() {                   
      return {                                          
      timer: null  // 定时器名称                 
      }         
    },
    mounted () {
      this.timer= setInterval(() => {
        // 操作
        method();
      }, 60000);
    },
    beforeDestroy () {
      if (this.timer) {
        clearInterval(this.timer);
      }
    }
  }
  ```
- **方式二**: 通过`$once`这个事件侦听器在定义完定时器之后的位置来清除定时器。
  ```js
  export default {
    mounted () {
    const timer = setInterval(() =>{
      // 某些定时器操作
    }, 500);

    // 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
    this.$once('hook:beforeDestroy', () => {
      clearInterval(timer);
    })
    }
  }
  ```
- **方式三**: 使用路由的`beforeRouteLeave`守卫，在当前位置的组件将要离开时触发
  ```js
  export default {
    beforeRouteLeave(to, from, next){
      next();
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    },
  }
  ```


## 162、`<template></template>`有什么用？
`template`标签是Vue中的模板标签，它用于描述我们的应用程序的用户界面，它允许我们创建定制的HTML结构，用于构建可以在我们组件的实例中复用的用户界面组件。
> `template`的作用是一种模板占位符，可帮助我们包裹元素，但在循环过程当中，`template`不会被渲染到页面上，自身具有三个特点：
- **隐藏性**：不会显示在页面中
- **任意性**：可以写在页面的任意地方
- **无效性**：没有一个根元素包裹，任何HTML内容都是无效的


## 163、vue组件会在什么时候下被销毁？
- 页面关闭
- 路由跳转
- v-if
- 改变key值


## 164、vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
最好手动销毁，毕竟大应用来说性能是很重要的。
> 原生DOM事件必须要手动销毁，否则会造成内存泄漏，进而造成性能上的问题。


## 165、在组件中怎么访问到根实例？
`this.$root`


## 166、组件进来请求接口时你是放在哪个生命周期？为什么？
一般在`created`，因为在这个生命周期我们常用到的都已经初始化好了
> 涉及到需要页面加载完成之后的话就用`mounted`，可以操作`dom`


## 167、在compositionAPI中如何使用生命周期函数？
需要用到哪个生命周期函数，就将对应函数的`import`进来，接着在`setup`中调用即可
```html
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  console.log('mounted 生命周期')
})
</script>
```


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
Vue在渲染组件视图时，会将组件数据中出现的所有变量都转换成getter/setter形式，并跟踪所有对这些变量的修改，在变量被修改时自动更新视图。当数据频繁变化时，引起的视图更新可能导致性能问题，但是Vue通过合并异步更新队列来优化性能。
> 具体地，Vue会将同一事件循环中所有的数据变化都缓存起来，然后在下一个事件循环中批量进行更新，从而避免了频繁的DOM操作和重复渲染。这个过程被称为“异步批量更新”。

Vue在监听到数据有变化的时候分为四步:
- 检测到数据变化
- 开启一个队列
- 在同一事件循环中缓冲所有数据改变
- 如果同一个`watcher`(watcherId相同)被多次触发，只会被推入到队列中一次(队列去重重复的id，使其只更新一次)

数据变化执行过程
- 不优化: 每一个数据变化都会执行: `setter -> Dep -> Watcher -> update -> run`
- 优化后: 执行顺序`update -> queueWatcher -> 维护观察者队列（重复id的Watcher处理） -> waiting标志位处理 -> 处理$nextTick（在为微任务或者宏任务中异步更新DOM）`


## 170、你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解
vue前期使用的是`mustache`。后期则是使用的自己内部的模板语法。

模板引擎的理解: 
> 模板引擎是将数据要变为视图最优雅的解决方案。双花括号(`{{}}`)语法，负责组装数据，以另外一种形式或外观展示数据。

Vue使用的是自己独有的模板语法，并不是基于任何已知的Web模板引擎。Vue的模板语法基于HTML，但是添加了一些特殊的指令和表达式，例如`v-bind、v-html、v-if `等等，这些指令都是Vue所提供的。

与常见的Web模板引擎相比，Vue的模板语法更为简单易懂，并且非常灵活，可以方便地应对各种场景的需求。通过在模板中使用Vue提供的指令和表达式，我们可以轻松地实现数据绑定、条件渲染、列表循环、事件处理等功能。

此外，Vue还提供了`template`标签，可以用来定义组件的模板，也可以作为一个可复用的模板片段，使用时只需传入相应的数据即可生成相应的DOM元素，使得组件的设计和复用更加方便。



## 171、你有使用过vue开发多语言项目吗？说说你的做法？
这里的多语言实则就是**国际化**的意思。
> 开发过，采用的是`vue-i18n`进行多语言开发。


## 172、在使用计算属性的时，函数名和data数据源中的数据可以同名吗？
可以，在Vue中计算属性的函数名和`data`数据源中的数据可以同名，但是不推荐这么做。因为初始化`vm`的过程，会先把`data`绑定到`vm`，再把`computed`的值绑定到`vm`，会把`data`覆盖了。

在组件实例创建过程中，props、computed、data和methods的初次执行顺序可以概括为以下步骤：
1. `props`：父组件传递给子组件的属性，在组件实例化时被解析和验证，因此是最先被初始化的选项。
2. `data`：组件内部的数据对象，在组件实例化时被初始化。
3. `computed`：计算属性，会在组件实例化时被初始化，并且在依赖的响应式数据发生变化时自动更新。
4. `methods`：方法选项，也会在组件实例化时被初始化，用于定义组件的行为。
5. `watch`：观察选项，用于监听指定的数据变化，当被监听的数据发生变化时，执行相应的回调函数。

```html
<template>
  <div>
    <p>{{ showMsg }}</p>
  </div>
</template>
<script lang="ts">
export default {
  data () {
    return {
      showMsg: '哈哈',
      count: 1
    }
  },
  computed: {
    showMsg () {
      return 'haha' + this.count
    }
  }
}
</script>
```
可以看到页面上输出的内容是`haha1`，而不是`哈哈`，是因为被覆盖。


## 173、vue中data的属性可以和methods中的方法同名吗？为什么？
不可以，如果在`data`和`methods`选项中都定义了同名的属性或方法，那么在模板中调用该方法时，会优先调用`data`中的同名属性，而不是`methods`中的方法。因此，当你尝试调用一个在`data`中定义的同名属性时，就会报错，提示该属性不是一个方法。


## 174、怎么给vue定义全局的方法？
- Vue2
  - 方法一: `Vue.prototype`
    ```js
    // main.js挂载
    Vue.prototype.getToken = function (){
      ...
    }

    // 组件中使用
    this.getToken()
    ```
  - 方法二: 以编写插件的形式，然后通过`Vue.use()`注册插件
    ```js
    // plugin.js
    export default function (Vue, options) {
      Vue.prototype.getToken = function (){
        ...
      };
    }
    // 注册插件
    import plugin from './plugin.js'
    Vue.use(plugin);

    // 组件中使用
    this.getToken()
    ```
  - 方式三: 写在对应的js文件，然后将方法抛出
    ```js
    // utils.js
    export const getToken = () => {

    }
    // 组件中使用
    import { getToken } from '@/utils/utils.js'
    getToken()
    ```
  - 方式四: 使用全局的`Vue.mxin`
    ```js
    // main.js
    Vue.mixin({
      methods: {
        getToken () {
          console.log('get token')
        }
      }
    })
    // 组件中使用
    export default {
      created () {
        this.getToken()
      }
    }
    ```
- Vue3
  - 方式一: 使用`app.config.globalProperties`
    ```js
    // main.js
    const app = createApp(App)
    app.config.globalProperties.getToken = () => {

    }
    app.mount('#app')
    ```
  - 方式二: 使用封装`hooks`方法
    ```js
    // hooks/token.js
    export function useGetToken () {}
    // 组件中使用
    import { useGetToken } from '@/hooks/token.js'
    useGetToken()
    ```
  - 方式三: 使用插件的形式
    > 参考Vue2的方式二


## 175、vue2.0不再支持v-html中使用过滤器了怎么办？
在method中定义方法
```js
export default {
  methods: {
    htmlFilter(htmlString){
      return htmlString.replace(/+s/g,’’)
    }
  }
}
```
在组件中使用`v-html="htmlFilter(htmlString)"`即可。


## 176、怎么解决vue打包后静态资源图片失效的问题？
Vue 项目打包后静态文件图片失效的常见问题有以下几种可能:
- 图片文件路径问题: 打包后图片文件路径与开发时不同，需要在打包后的文件中修改图片路径。
- 缺少`loader`: 在`webpack`配置文件中缺少图片`loader`，导致无法识别图片文件。
- `baseUrl`配置问题: 在`vue.config.js`文件中配置了`publicPath`属性，导致图片文件路径错误。
  > vite中则是配置`publicDir`
- 图片文件缺失: 打包时图片文件缺失或者没有被正确处理。

解决方案:
- 检查并修改图片文件路径
- 在`webpack`配置文件中添加图片`loader`
- 检查并修改`vue.config.js`文件中的`publicPath`配置
- 检查项目中图片文件是否存在并被正确处理

如果问题仍未解决,可以尝试使用路径别名来解决问题。


## 177、怎么解决vue动态设置img的src不生效的问题？
造成原因: 由于`src`被当做静态资源处理了，并没有进行编译。

**解决办法**
- 1、使用`require`引入图片
  ```html
  <template>
    <div>
      <div v-for="(item,index) in banners" :key="index">
        <!-- 或者直接在src中添加require -->
        <img :src="item" alt="">
      </div>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          banners: [
            require('../../assets/images/banner1.jpg'),
            require('../../assets/images/banner2.jpg'),
            require('../../assets/images/banner3.jpg')
          ]
        }
      }
    }
  </script>
  ```
- 2、将图片先引入文件中
  ```html
  <template>
    <div>
      <div v-for="(item, index) in banners" :key="index">
        <img :src="item" alt="">
      </div>
    </div>
  </template>
  <script>
    import img1 from "../../assets/images/banner1.jpg"
    import img2 from "../../assets/images/banner2.jpg"
    import img3 from "../../assets/images/banner3.jpg"
    export default {
      data () {
        return {
          banners: [img1, img2, img3]
        }
      }
    }
  </script>
  ```
- 3、将图片放入vue项目的public文件夹中，在根目录调用
  ```html
  <template>
    <div>
      <div v-for="(item, index) in banners" :key="index">
        <img :src="item" alt="">
      </div>
    </div>
  </template>
  <script>
    export default {
      data () {
        return {
          banners: ['/banner1.jpg','/banner2.jpg','/banner3.jpg']
        }
      }
    }
  </script>
  ```


## 178、使用vue后怎么针对搜索引擎做SEO优化？
**什么是SEO**
> 搜索引擎优化（Search engine optimization，简称SEO），指为了提升网页在搜索引擎自然搜索结果中（非商业性推广结果）的收录数量以及排序位置而做的优化行为，是为了从搜索引擎中获得更多的免费流量，以及更好的展现形象。

使用 Vue 开发的单页应用通常使用 AJAX 技术，通过 JavaScript 动态生成 DOM 元素来展示内容，这样会导致搜索引擎不能正确爬取页面内容。为了让搜索引擎能够正确地识别和索引你的应用程序，需要做一些 SEO 优化。
1. 使用服务端渲染（SSR）：将 Vue 应用程序进行服务端渲染，可以让搜索引擎能够正确地读取和索引应用程序中的内容，提高网站的 SEO 性能。
2. 添加 meta 标签：为每个页面添加合适的 meta 标签，包括 title、description、keywords 等，以便搜索引擎正确解析页面内容，并显示正确的搜索结果。
3. 添加静态页面：对于一些重要的页面或信息，可以添加静态页面，以便搜索引擎能够正确地识别和索引它们。例如，可以单独为某些关键字或分类建立页面，以便让用户更容易找到它们。
4. 提供 sitemap.xml 文件：创建一个 sitemap 文件，列出应用程序中的所有页面，并提交给搜索引擎，以便让搜索引擎更好地了解应用程序中的内容结构。
5. 避免使用 iframe 和 JavaScript 跳转：搜索引擎无法正确解析 iframe 中的内容和 JavaScript 跳转，因此应该尽量避免使用这些技术。
6. 合理使用 H 标签：使用合适的 H 标签来标记页面中不同级别的标题，可以让搜索引擎更好地了解和索引页面结构。
7. 添加 alt 属性：为所有图片添加 alt 属性，以便让搜索引擎正确识别和索引图片内容。

如果你已经采用了前后分离的单页项目，而你的网站内容不需要AJAX去获取内容和展示内容，那么可以试试`prerender-spa-plugin`这个插件，这个插件是一个`webpack`插件，可以帮助你在打包过程中通过无头浏览器去渲染你的页面，并生成对应的HTML。当然这个方案适合你的路由是静态的，并且路由数量非海量。

如果你的内容是AJAX动态获取的，那么vue单页项目可以试试`prerender`,这个是一个预渲染服务，可以帮你通过无头浏览器渲染页面，并返回HTML。这个方案和`prerender-spa-plugin`很相似，都是通过无头浏览器去渲染页面，不同的是渲染的时机: 
- `prerender-spa-plugin`是在打包过程中渲染，注定了其只能渲染静态路由
- `prerender`是在请求时渲染，所以可以渲染动态的路由。

**prerender 的使用**
1. 安装
  ```shell
  npm install prerender
  ```
2. 启动服务`server.js`
  ```js
  const prerender = require('prerender');
  const server = prerender();
  server.start();
  ```
3. 测试: `http://localhost:3000/render?url=https://www.example.com/`

经过上面三个步骤，你就已经启动一个预渲染服务，并且会返回"www.example.com/"的内容，整个过程还是比较简单的。

**prerender方案的原理**
首先服务端接收到一个页面的请求，然后判断这个请求是否来自搜索引擎的爬虫，如果不是，则直接返回单页项目的HTML，按照普通单页项目的工作模式（客户端渲染），如果是，则把请求转发给`prerender`服务，`prerender`服务会通过无头浏览器进行预渲染，渲染完成把内容返回，这样爬虫就可以拿到有内容的HTML了。`prerender`中间件就是用来判断请求是否来自搜索引擎爬虫和转发请求的。

注意: `prerender`服务是不包含无头浏览器的，所以需要自行安装chrome浏览器。因此，整个方案运行需要三部分：
- chrome浏览器
- prerender服务
- prerender中间件
:::


## 179、跟keep-alive有关的生命周期是哪些？描述下这些生命周期
- onActivated(): 当组件被插入到 DOM 中时调用。
- onDeactivated(): 当组件从 DOM 中被移除时调用。


## 180、你知道vue2.0兼容IE哪个版本以上吗？
在Vue2.0中完全兼容IE10以上,部分兼容IE9,不支持IE8及一下版本,因为Vue的响应式原理是基于es5的`Object.defineProperty`的，而这个方法不支持ie8及以下的版本。


## 181、使用vue开发一个todo小应用，谈下你的思路
- 结构: 输入部分(`input`)和输出部分(`ul`)
- 逻辑: 用户输入之后,通过事件触发拿到用户输入的数据存起来，将用户数据集合通过`v-for`渲染到页面上，当用户点击清单项，通过事件触发移出对应事件项。


## 182、你有看过vue推荐的风格指南吗？列举出你知道的几条
[官方风格指南](https://cn.vuejs.org/v2/style-guide/)
- 组件名为多个单词，最好加特殊前缀，如：`el-Button`、`el-row`等
- 组件数据：组件的`data`必须是一个函数。 
- 细致的`Prop`定义
- 总是用`:key`配合`v-for`
- 避免`v-if`和`v-for`用在一起
- 为组件样式设置作用域`scoped`
![202303121534098.png](http://img.itchenliang.club/img/202303121534098.png)


## 183、你是从vue哪个版本开始用的？你知道1.x和2.x有什么区别吗？
- `vue1.0`的数据绑定完全依赖于数据侦测，使用`Object.defineProperty`方法使数据去通知相应`watch`，改变`dom`结构。
- `vue2.0`引入了`虚拟dom`，只通知到组件，提升了颗粒度。


## 184、vue中怎么重置data？
```js
export default {
  data () {
    return {
      msg: 'abc'
    }
  },
  methods: {
    updateData () {
      this.msg = 'cba'
      Object.assign(this.$data, this.$options.data())
      console.log(this.$data)
    }
  }
}
```


## 185、vue渲染模板时怎么保留模板中的HTML注释呢？
- **Vue2**: 在组件中将`comments`选项设置为`true`
  ```html
  <template comments>
    ...
  </template>
  ```
- **Vue3**: 默认情况下，Vue 会在生产环境移除所有注释，设置该项为`true`会强制 Vue 在生产环境也保留注释。在开发过程中，注释是始终被保留的。
  ```js
  app.config.compilerOptions.comments = true
  ```


## 186、Vue.observable你有了解过吗？说说看？原理分析？
`Vue.observable`是 Vue.js 提供的一个函数，用于将一个普通的 JavaScript 对象转换成响应式对象。

返回的对象可以直接用于渲染函数和计算属性内，并且会在发生变更时触发相应的更新。也可以作为最小化的跨组件状态存储器
```js
Vue.observable({ count : 1})
```
其作用等同于
```js
new vue({ count : 1})
```
- 在 Vue 2.x 中，被传入的对象会直接被`Vue.observable`变更，它和被返回的对象是同一个对象
- 在 Vue 3.x 中，则会返回一个可响应的代理，而对源对象直接进行变更仍然是不可响应的

**使用场景**
> 在非父子组件通信时，可以使用通常的`bus`或者使用`vuex`，但是实现的功能不是太复杂，而使用上面两个又有点繁琐。这时，`observable`就是一个很好的选择
```js
// 创建一个js文件
// 引入vue
import Vue from 'vue
// 创建state对象，使用observable让state对象可响应
export let state = Vue.observable({
  name: '张三',
  'age': 38
})
// 创建对应的方法
export let mutations = {
  changeName(name) {
    state.name = name
  },
  setAge(age) {
    state.age = age
  }
}
```
在`.vue`文件中直接使用即可
```html
<template>
  <div>
    姓名：{{ name }}
    年龄：{{ age }}
    <button @click="changeName('李四')">改变姓名</button>
    <button @click="setAge(18)">改变年龄</button>
  </div>
</template>
<script>
import { state, mutations } from '@/store'
export default {
  // 在计算属性中拿到值
  computed: {
    name() {
      return state.name
    },
    age() {
      return state.age
    }
  },
  // 调用mutations里面的方法，更新数据
  methods: {
    changeName: mutations.changeName,
    setAge: mutations.setAge
  }
}
</script>
```


## 187、你知道style加scoped属性的用途和原理吗？
**作用**
> 当`style`标签里面有`scoped`属性时，它的`css`只作用于当前组建的元素。在单页面项目中可以使组件之间互不污染，实现模块化（实现组件的私有化，不对全局造成样式污染，表示当前`style`属性只属于当前模块）。
::: tip 原理
`style`标签中添加`scoped`属性后，vue就会为当前组件中的DOM元素添加唯一的一个自定义属性（唯一性的标记【`data-v-xxx`】），即CSS带属性选择器，以此完成类似作用域的选择方式，从而达到样式私有化，不污染全局的作用。
- vue2效果演示
  ```html
  <template>
    <div class="home-container">
      <button @click="handleClick">点击</button>
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleClick () {
        this.$bus.emit('custom', '哈哈哈')
      }
    }
  }
  </script>
  <style lang="scss" scoped>
  .home-container {
    button {
      color: red;
    }
  }
  </style>
  ```
  ![202303121555521.png](http://img.itchenliang.club/img/202303121555521.png)
- Vue3效果演示: 由于Vue3添加了Fragments(支持碎片)，即一个组件可以拥有多个根节点
  ```html
  <template>
    <div class="test1-container1">
      <button>更新数据</button>
    </div>
    <div class="test1-container2">
      <button>更新数据</button>
    </div>
  </template>
  <script lang="ts" setup>
  </script>
  <style lang="scss" scoped>
  .test1-container1 {
    button {
      color: red;
    }
  }
  .test1-container2 {
    button {
      color: blue;
    }
  }
  </style>
  ```
  ![202303121600212.png](http://img.itchenliang.club/img/202303121600212.png)
:::


## 188、Vue中watch的属性用箭头函数定义结果会怎么样？
> 因为箭头函数默绑定父级作用域的上下文，所以不会绑定vue实例, 在严格模式下`this`是`undefined`，在非严格模式下指向`window`。
`this`是`undefined`，要更改的属性会报`TypeError错误, Cannot read property 'xxx' of undefined`。


## 189、vue中如果methods的方法用箭头函数定义结果会怎么样？
> 因为箭头函数默绑定父级作用域的上下文，所以不会绑定vue实例, 在严格模式下`this`是`undefined`，在非严格模式下指向`window`。


## 190、在vue项目中如何配置favicon？
- 静态favicon
  > 只需要将`favicon.ico`文件放在`vue`配置的静态文件目录`public`下即可，然后在`index.html`中通过`<link rel="icon" href="/favicon.ico" />`即可。
- 动态favicon
  > 有这么个场景，做的sass平台，不同的用户登录看法不同的`favicon`，则需要动态配置`favicon`，然后进入时调用接口获取`favicon.ico`，然后动态操作DOM设置`<link rel="icon" href="/favicon.ico" />`即可。


## 191、你有使用过babel-polyfill模块吗？主要是用来做什么的？
babel默认只转换语法，而不转换新的API，如需使用新的API，还需要使用对应的转换插件或者polyfill去模拟这些新特性。


## 192、说说你对vue的错误处理/错误捕获的了解？
分为`errorCaptured`与`errorHandler`
- errorCaptured: 是组件内部钩子，**捕获一个来自后代组件的错误时被调用**。接收`error、vm、info`三个参数，`return false`后可以阻止错误继续向上抛出。
- errorHandler: 为全局钩子，使用`Vue.config.errorHandler`配置，接收参数与`errorCaptured`一致，2.6后可捕捉`v-on`与`promise`链的错误，可用于统一错误处理与错误兜底。
```html
<!-- errorCaptured演示：在vue3中和onMounted生命周期一样使用 -->
<!-- App.vue -->
<template>
  <div id="app">
    <com-home></com-home>
  </div>
</template>
<script lang="ts">
import ComHome from './views/Home.vue'
export default {
  components: {
    ComHome
  },
  errorCaptured (err, vm, info) {
    console.log(err, vm, info)
    return false
  }
}
</script>
<style lang="scss">
</style>
<!-- Home.vue -->
<template>
  <div class="home-container">
    {{ doubbleMsg }}
  </div>
</template>
<script lang="ts">
export default {
  data () {
    return {
      msg: '123'
    }
  },
  computed: {
    doubbleMsg: () => {
      console.log(this)
      return this.msg + this.msg
    }
  }
}
</script>
```
上面例子中，由于我们在`computed`中使用`箭头函数`，而在严格模式下，`this`指向`undefined`，故不存在`msg`，所以报错，在`App.vue`捕获输出错误
![202303121626144.png](http://img.itchenliang.club/img/202303121626144.png)
若想演示`errorHandler`只需将上面`App.vue`中的`errorCaptured`的`return false`改成`return true`，然后在`main.ts`文件中使用如下代码捕获错误:
```ts
// errorHandler演示：在vue3中使用app.config.errorHandler
Vue.config.errorHandler = (error, vm, info) => {
  console.log(error, vm, info)
}
```
则能看到错误输出信息。


## 193、在.vue文件中style是必须的吗？那script是必须的吗？为什么？
在 Vue 单文件组件中，`<style>`、`<script>`和`<template>`标签都是可选的，但它们分别对应了单文件组件的不同部分。
1. `<style>`标签用于定义组件的样式，如果不需要定义样式，则可以省略该标签。
2. `<script>`标签用于定义组件的逻辑和行为，如果不需要定义逻辑和行为，则可以省略该标签。
3. `<template>`标签用于定义组件的模板，如果不需要显示任何内容，则可以省略该标签。如果省略了`<template>`还可以使用`render`函数替代。


## 194、vue怎么实现强制刷新组件？
1. 刷新整个页面（最low的，可以借助route机制）
2. 使用`v-if`标记（比较low的）
3. 使用内置的`forceUpdate`方法（较好的）
4. 使用`key-changing`优化组件（最好的）


## 195、vue自定义事件中父组件怎么接收子组件的多个参数？
子组件传递多个参数，父组件用展开运算符获取，或者在子组件中直接传递json格式的数据
```html
<!-- App.vue -->
<template>
  <div id="app">
    <com-home @custom="handleCustom"></com-home>
  </div>
</template>
<script lang="ts">
import ComHome from './views/Home.vue'
export default {
  components: {
    ComHome
  },
  methods: {
    handleCustom (...args) {
      console.log(args) // ['1', '2']
    }
  }
}
</script>
<!-- Home.vue -->
<template>
  <div class="home-container">
    <button @click="handleClick">提交</button>
  </div>
</template>
<script lang="ts">
export default {
  methods: {
    handleClick () {
      this.$emit('custom', '1', '2')
    }
  }
}
</script>
```

## 196、实际工作中，你总结的vue最佳实践有哪些？
1. `data`应始终返回一个函数
2. 始终在`v-for`中使用`:key`
3. 使用驼峰式声明`props`，并在模板中使用短横线命名来访问`props`
  ```html
  <PopupWindow title-text='hello world' /> 
  props: { titleText: String }  
  ```
4. 在事件中使用短横线命名
  ```html
  this.$emit('close-window')
  // 在父组件中
  <popup-window @close-window='handleEvent()' />
  ```
5. 不要在同个元素上同时使用`v-if`和`v-for`指令
6. 用正确的定义验证我们的`props`
  ```js
  props: {
    status: {
      type: String,
      required: true,
      validator: function (value) {
        return [
          'syncing',
          'synced',
          'version-conflict',
          'error'
        ].indexOf(value) !== -1
      }
    }
  }
  ```
6. 组件全名使用驼峰或或者短横线
  ```html
  MyComponent.vue
  ```
7. 基本组件应该相应地加上前缀
  ```html
  BaseButton.vue
  BaseIcon.vue
  BaseHeading.vue
  ```
8. 保持指令简写的一致性
  ```js
  @是v-on的简写
  : 是 v-bind 的简写
  # 是 v-slot 的简写
  ```
9. 模板表达式应该只有基本的 JS 表达式
  ```js
  //不好的做法
  {{
    fullName.split(' ').map(function (word) {
      return word[0].toUpperCase() + word.slice(1)
    }).join(' ')
  }}

  // 好的做法
  {{ normalizedFullName }}
  // The complex expression has been moved to a computed property
  computed: {
    normalizedFullName: function () {
      return this.fullName.split(' ').map(function (word) {
        return word[0].toUpperCase() + word.slice(1)
      }).join(' ')
    }
  }
  ```


## 197、vue给组件绑定自定义事件无效怎么解决？
- 方法1：在`@click`后加上`.native`（监听根元素的原生事件，使用`.native`修饰符）
  ```html
  <my-component @click.native="..."></my-component>
  ```
- 方法2：向外发送`click`事件
  ```html
  <!-- App.vue -->
  <template>
    <div id="app">
      <com-home @click="handleClick"></com-home>
    </div>
  </template>
  <script lang="ts">
  import ComHome from './views/Home.vue'
  export default {
    components: {
      ComHome
    },
    methods: {
      handleClick () {
        console.log(123)
      }
    }
  }
  </script>
  <!-- Home.vue -->
  <template>
    <div style="background: blue;" @click="handleClick($event)">
      <p>asdjasdasd</p>
    </div>
  </template>
  <script lang="ts">
  export default {
    methods: {
      handleClick (event) {
        this.$emit('click', event)
      }
    }
  }
  </script>
  ```


## 198、vue使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？
在使用`v-for`遍历对象时，Vue.js 会使用 JavaScript 对象的`Object.keys()`方法获取对象中所有属性名，并按照它们在对象中出现的顺序进行遍历。但是，请注意，JavaScript 对象本身就不保证属性的顺序，因此在某些情况下，对象属性的遍历顺序可能并不是您期望的顺序。


## 199、vue如果想扩展某个现有的组件时，怎么做呢？
**什么是组件的扩展？**
> 通常我们封装一个组件是希望这个组件的功能是越小越好，这个组件的功能大概率是单一的，这个组件只用来做一件事。现在我们想给这个组件添加一个功能，这就叫扩展一个组件。

**扩展一个组件有那些方法？**
> 可以按照逻辑扩展和内容扩展来列举
> - 逻辑扩展：`mixins`、`extends`、`composition api`
> - 内容扩展：`slots`

使用方法和区别以及差异?
- `mixins`：当用得比较多的时候，可能会出现多个`mixins`变量名一样时的冲突。而且溯源麻烦，不好维护。
  > `mixins`使用时组件里`data、methods`优先级高于`mixins`里的`data、methods`。生命周期函数，是先执行`mixins`里面的，再执行组件里面的。
  ```js
  // 复用代码：它是一个配置对象，选项和组件里面一样
  const mymixin = {
    methods: {
      dosomething(){}
    }
  }
  // 全局混入：将混入对象传入
  Vue.mixin(mymixin)
  
  // 局部混入：做数组项设置到mixins选项，仅作用于当前组件
  const Comp = {
    mixins: [mymixin]
  }
  ```
- `slots`：当一个容器型组件，需要外部传显示内容用到，比如子组件被调用父组件可以通过`slots`来控制子组件的内容。
  ```html
  <div id="itany">
    <my-hello>180812</my-hello>
  </div>
  <template id="hello">
    <div>
      <h3>welcome to xiamen</h3>
      <slot>如果没有原内容，则显示该内容</slot>// 默认插槽
    </div>
  </template>
  <script>
  var vm=new Vue({
    el: '#itany',
    components:{
      'my-hello':{
        template:'#hello'
      }
    }
  });  
  </script>
  ```
- `composition api`：在`composition api`外实现一个方法，直接引入到`composition api`，来源明了方便维护。
  ```js
  //原有功能
  function useA(){}
  
  //扩展功能
  function useB(){}
  
  //组合
  setup(){
    const {a} = useA();
    const {b} = useB();
    return{a,b}
  }
  ```
- `Vue.extend`: 使用基础Vue构造器，创建一个"子类"。参数是一个包含组件选项的对象。`data`选项是特例，需要注意，在`Vue.extend()`中它必须是函数。
  ```html
  <div id="mount-point"></div>
  <script>
    // 创建构造器
    var Profile = Vue.extend({
      template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
      data: function () {
        return {
          firstName: 'Walter',
          lastName: 'White',
          alias: 'Heisenberg'
        }
      }
    })
    // 创建 Profile 实例，并挂载到一个元素上。
    new Profile().$mount('#mount-point')
  </script>
  ```

## 200、SPA单页面的实现方式有哪些？
1. 监听地址栏中`hash`变化驱动界面变化
2. 用`pushsate`记录浏览器的历史，驱动界面发送变化
3. 直接在界面用普通事件驱动界面变化
它们都是遵循同一种原则：`div`的显示与隐藏


## 201、分析下vue项目本地开发完成后部署到服务器后报404是什么原因呢？
我们在vue项目中，使用`history`模式时，部署后刷新会出现404问题，原因是，刷新时。浏览器会通过`url`去请求对应路径的资源文件，找不到时就会出现这种问题。那如何解决呢？
> 通过修改服务器的配置文件，让其刷新时找不到对应文件时，都指向`index.html`,这时`index.html`就会根据对应路径显示对应路由（配置`nginx`）。


## 202、vue在开发过程中要同时跟N个不同的后端人员联调接口（请求的url不一样）时你该怎么办？
`server.proxy`中把所有的服务人员的地址代理都写进去，然后动态更改接口的`baseUrl`，这样切换不同后端人员的时候不用重启。


## 203、写出多种定义组件模板的方法
- **方法一**: 单文件组件
  ```html
  <template>
    <div class="title">{{this.title}}</div>
  </template>
  <script>
  export default { 
    data() {
      return {title: '单文件组件' }
    }
  }
  </script>
  ```
- **方式二**: x-template
  > 在一个`<script>`元素上，并为其带上`text/x-template`的类型，然后通过一个`id`将模板引用过去。
  ```html
  <script type="text/x-template" id="hello">
    <div class="title">{{ title }}</div>
  </script>
  Vue.component('custom-component03',{
    template: '#hello',
    data () {
      return {
        title: 'x-template'
      }
    }
  });
  ```
- **方式三**: 字符串
  > 默认情况下，模板会被定义为一个字符串
  ```js
  Vue.component('custom-component01', {
    template: `<div>{{title}}</div>`,
    data() { return {title: 'Check me' } }
  });
  ```
- **方式四**: 模板字面量
  > ES6 模板字面量允许你使用多行定义模板，这在常规 JavaScript 字符串中是不被允许的。
  ```js
  Vue.component('custom-component02', {
    template: `
      <div>
          <div class="title">{{this.title}}</div>
        <div :class="{ checkbox: checkbox}"></div>
      </div>`,
    data() {
      return {
        title: '模板字面量' ,
        checkbox: true
      }
    }
  });
  ```
- **方式五**: 内联模板inline-template
  > 当`inline-template`这个特殊的特性出现在一个子组件上时，这个组件将会使用其里面的内容作为模板，而不是将其作为被分发的内容
  ```html
  <script>
    Vue.component('custom-component04', { 
      data(){ return {title:'内联模板!'} } 
    })
  </script>
  <custom-component04 inline-template>
    <div class="title">{{title}}</div>
  </custom-component04>
  ```
  不过，`inline-template`会让你模板的作用域变得更加难以理解
- **方式六**: 渲染函数(Render)
  > 渲染函数需要你把模板当作一个JavaScript对象来进行定义，它们是一些复杂并且抽象的模板选项。然而，它的优点是你定义的模板更接近编译器，你可以使用所有JavaScript方法，而不是指令提供的那些功能。
  ```html
  <script>
  Vue.component('custom-component05', {
    data(){
      return { 'title':'渲染函数'}
    },
    render(createElement) {
      return createElement( 'div', { attrs: { 'class': 'title' } }, [ this.title ] );
    }
  })
  </script>
  ```
- **方式七**: JSX语法
  ```html
  <script>
  Vue.component('custom-component05', {
    data(){
      return { title:'我是jsx模板'}
    },
    render() {
      return <div>
        {this.title}
      </div>
    }
  })
  </script>
  ```


## 204、vue为什么要求组件模板只能有一个根元素？
Vue要求组件模板只能有一个根元素，这是因为Vue的渲染机制是基于虚拟DOM实现的，每个组件都需要转化为一个虚拟DOM节点进行管理和渲染。而且在HTML中，每个节点都必须有一个父节点，多个根元素会导致无法通过单个父节点来包含所有子节点，从而破坏了虚拟DOM的结构性和合理性。因此，Vue限制组件模板只能有一个根元素，以保证虚拟DOM能够正确地表示组件的结构和内容。

Vue3中支持多个根节点的原因:
> Vue 3 之所以可以支持多个根元素，是因为 Vue 3 中采用了`Fragments`（片段）的概念。`Fragments`可以让开发者在组件模板中使用多个根元素而不会出现渲染错误。**`Fragments`是一种虚拟 DOM 的节点，它不会被渲染成真正的 DOM 节点，只是作为一个占位符存在，让多个子元素可以被渲染到同一个父级节点下**。


## 205、EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？
简单例子演示: 
```html
<!-- App.vue -->
<template>
  <div id="app">
    <p><router-link to="/a">A</router-link> | <router-link to="/b">B</router-link></p>
    <router-view></router-view>
  </div>
</template>

<!-- A组件 -->
<template>
  <div>
    <p>A组件</p>
  </div>
</template>
<script>
export default {
  mounted () {
    this.bus.$on('winformEvent', (msg) => {
      console.log(msg)
    })
  },
}
</script>

<!-- B组件 -->
<template>
  <div>
    <p>B组件</p>
  </div>
</template>
<script>
export default {
  mounted () {
    this.bus.$emit("winformEvent", '哈哈哈');
  }  
}
</script>
```
上面例子我们在`a`路由里监听`winformEvent`事件，在`b`路由里触发`winformEvent`，你会发现，当你在`a`和`b`路由来回切换时，会发现我们控制台重复输出`哈哈哈`。

**解决办法**
> 建议在`created`里注册，在`beforeDestory`移出
```js
beforeDestroy() {
    //组件销毁前需要解绑事件。否则会出现重复触发事件的问题
    this.bus.$off('winformEvent');
},
```


## 206、为什么vue要使用异步更新组件？
在Vue中，异步组件是指在需要的时候才会被加载的组件。使用异步组件可以有效地减少初始加载时间和提高应用程序的性能。

异步组件的作用是延迟加载，只有当组件或者路由被访问时才会加载所需的资源，避免了一次性加载所有的组件的情况，减少了初次渲染所需的时间和资源消耗。
> 在系统功能比较多时，页面首次加载没有必要一次把所有功能代码都下载到客户端，需要把那些非首页的代码按功能拆分为一个个组件，按照用户操作异步下载和渲染。因此，异步组件主要解决的是按需加载的问题，保证系统首屏加载时间不超过3秒，减少用户等待时间，提高系统的用户留存率。

在Vue中可以通过异步组件来提高应用程序的性能和首屏加载速度。通常情况下，异步组件适用于那些很少使用或者用于低优先级任务的组件。例如，某些弹窗组件或者在某些页面内使用频率很小的组件等。

异步组件可以通过以下两种方式来创建：
1. 使用异步组件工厂函数：
```js
Vue.component('my-component', function (resolve, reject) {
  setTimeout(function () {
    resolve({ /* 组件定义对象 */ })
  }, 1000)
})
```
2. 使用动态 import：
```js
Vue.component('my-component', () => import('../views/MyComponent.vue'))
```
以上两种方式的本质相同，即返回一个函数，函数内部的逻辑可以是从服务器异步加载组件资源，或者是基于 `import()` 实现的动态加载。

在使用异步组件时，通过在组件渲染时动态加载组件资源的方式来提高应用程序性能和响应速度。在Vue中，通常在路由中使用异步组件：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/about',
      component: () => import('../views/About.vue')
    }
  ]
})
```
以上代码中，路由路径为 `/home` 的页面将会使用异步组件加载 `Home.vue` 组件，而路由路径为 `/about` 的页面将会使用异步组件加载 `About.vue` 组件。


## 207、你有使用做过vue与原生app交互吗？说说vue与app交互的方法
用`WebViewJavascriptBridge`
```js
export const connectWebViewJavascriptBridge = callback => {
  if (window.WebViewJavascriptBridge) {
    callback(WebViewJavascriptBridge)
  } else {
    document.addEventListener('WebViewJavascriptBridgeReady', function() {
      callback(WebViewJavascriptBridge)
    }, false )
  }
}
```


## 208、使用vue渲染大量数据时应该怎么优化？说下你的思路！
1. 数据量大的时候，可以做分页处理。翻页一次请求10-20条数据；
2. 如果需要响应式，考虑使用虚拟列表（只渲染要显示的数据）；
3. 如果不考虑响应式，变量在`beforeCreated`或`created`中声明（`Object.freeze`会导致列表无法增加数据）


## 209、webpack打包vue速度太慢怎么办？
1. 使用`webpack-bundle-analyzer`对项目进行模块分析生成`report`，查看`report`后看看哪些模块体积过大，然后针对性优化，比如我项目中引用了常用的UI库`element-ui`和`v-charts`等
2. 配置`webpack`的`externals`，官方文档的解释：防止将某些`import`的包(`package`)打包到`bundle`中，而是在运行时(`runtime`)再去从外部获取这些扩展依赖。 所以，可以将体积大的库分离出来：
  ```js
  // ...
  externals: {
      'element-ui': 'Element',
      'v-charts': 'VCharts'
  }
  ```
3. 然后在`main.js`中移除相关库的`import`
4. 在`index.html`模板文件中，添加相关库的`cdn`引用，如：
  ```html
  <script src="https://unpkg.com/element-ui@2.10.0/lib/index.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/echarts/dist/echarts.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/v-charts/lib/index.min.js"></script>
  ```


## 210、你有使用过JSX吗？说说你对JSX的理解
jsx不是一门新的语言，是一种新的语法糖。让我们在js中可以编写像html一样的代码。允许XML语法直接加入到JavaScript代码中，让你能够高效的通过代码而不是模板来定义界面


## 211、说说组件的命名规范
1. kebab-case(短横线分隔命名)，引用时必须也采用`kebab-case`；
2. PascalCase(首字母大写命名)，引用时既可以采用`PascalCase`也可以使用`kebab-case`；
但在DOM中使用只有`kebab-case`是有效的


## 212、怎么配置使vue2.0+支持TypeScript写法？
1. 安装必要依赖：
  ```bash
  npm install --save-dev typescript ts-loader @types/vue
  ```
2. 创建`tsconfig.json`文件：在项目根目录下创建`tsconfig.json`文件，并添加以下内容：
  ```json
  {
    "compilerOptions": {
      "target": "es5",
      "module": "es2015",
      "strict": true,
      "esModuleInterop": true,
      "experimentalDecorators": true,
      "sourceMap": true,
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "noImplicitAny": false,
      "allowSyntheticDefaultImports": true,
      "lib": ["esnext", "dom"]
    },
    "include": ["src/**/*.ts", "src/**/*.tsx"],
    "exclude": ["node_modules"]
  }
  ```
3. 配置webpack：在Webpack配置文件中，添加以下规则来加载`.ts`和`.tsx`文件，并将`vue-loader`设置为允许 TypeScript 组件：
  ```js
  module.exports = {
    //...
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] },
          exclude: /node_modules/,
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: {
            loaders: {
              ts: 'ts-loader!eslint-loader',
              tsx: 'ts-loader!eslint-loader',
            },
          },
        },
      ],
    },
  };
  ```
4. 编写Vue组件：在 Vue 单文件组件`<script>`标签中，添加`lang="ts"`属性以指定 TypeScript：
  ```html
  <template>
    <div>
      <!-- ... -->
    </div>
  </template>

  <script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    // ...
  });
  </script>
  ```
5. 编写TypeScript模块：创建`.ts`或`.tsx`文件，并按常规方式编写 TypeScript 模块。


## 213、vue的is这个特性你有用过吗？主要用在哪些方面？
1. **动态组件**
  ```html
  <component :is="componentName"></component>
  ```
  `componentName`可以是在本页面已经注册的局部组件名和全局组件名,也可以是一个组件的选项对象。当控制`componentName`改变时就可以动态切换选择组件。
2. is的用法
  > vue中is的属性引入是为了解决dom结构中对放入html的元素有限制的问题.。
  - 有些 HTML 元素，诸如`<ul>、<ol>、<table>和<select>`，对于哪些元素可以出现在其内部是有严格限制的。
    > 而有些 HTML 元素，诸如`<li>、<tr> 和 <option>`，只能出现在其它某些特定的元素内部。
    ```html
    <ul>
      <my-component></my-component>
    </ul>
    ```
    上面的`<my-component />`是自定义的已声明注册组件，由于ul内无法识别，所以上面`<my-component></my-component>`会被作为无效的内容提升到外部，并导致最终渲染结果出错。应该这么写：
    ```html
    <ul>
      <li is="my-component"></li>
    </ul>
    ```


## 214、如何解决vue打包vendor过大的问题？
1. 路由懒加载【使用es6提案的`import()`方式】
2. CDN引入
  ```html
  <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <!-- 在引入 ElementUI 之前引入 Vue，会注入全局变量 Vue  -->
  <script src="https://unpkg.com/vue@2.6.10/dist/vue.js"></script>
  <!-- 引入 ElementUI 组件库，会注入全局变量 -->
  <script src="https://unpkg.com/element-ui@2.15.6/lib/index.js"></script>
  ```
  在`vue.config.js`中配置
  ```js
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = '医联体标化绩效管理平台'
        return args
      }),
      config.externals({
        'echarts': 'echarts',
        'element-ui': 'ElementUI',
        'vue': 'Vue',
      });
  },
  ```
  去除之前的引用
  ```js
  // import Vue from 'vue'
  // 引入echarts
  // import * as echarts from "echarts";
  // Vue.prototype.$echarts = echarts
  // 引入element组件
  // import ElementUI from 'element-ui'
  // import 'element-ui/lib/theme-chalk/index.css'
  ```
3. 安装`compression-webpack-plugin`并配置`vue.config.js`的`plugin`选项



## 215、你了解什么是函数式组件吗？
Vue 提供了一种称为函数式组件的组件类型，用来定义那些没有响应数据，也不需要有任何生命周期的场景，它只接受一些props来显示组件。
> 函数组件(不要与 Vue 的 render 函数混淆)是一个不包含状态和实例的组件。简单的说，就是组件不支持响应式，并且不能通过`this`关键字引用自己。
```html
<template functional>
  <div>{{ props.someProp }}</div>
</template>
<script>
  export default {
    props: {
      someProp: String
    }
  }
</script>
```
在`template`中访问组件的`context`
```html
<script>
export default {
  functional: true,
  props: {
    someProp: String
  },
  render (h, ctx) {
    const someProp = ctx.props.someProp
    // other code
  }
}
</script>
```


## 216、vue怎么改变插入模板的分隔符？
本题的愿意就是如何修改在`<template></template>`中使用的插值表达式`{{  }}`的分割符，在[vue2-delimiters](https://v2.cn.vuejs.org/v2/api/#delimiters)文档中有说明如何修改纯文本插入分隔符。默认值是`["{{", "}}"]`
> **注意**: 这个选项只在完整构建版本中的浏览器内编译时可用。
```js
new Vue({
  delimiters: ['${', '}'] // 分隔符变成了 ES6 模板字符串的风格
})
```


## 217、说说你对provide和inject的理解
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。
```js
// 父级组件提供 'foo'
var Provider = {
  provide: {
    foo: 'bar'
  },
  // ...
}

// 子组件注入 'foo'
var Child = {
  inject: ['foo'],
  created () {
    console.log(this.foo) // => "bar"
  }
  // ...
}
```


## 218、开发过程中有使用过devtools吗？
有，`devtools`确实是个好东西，大力协助`vue`项目开发，传参，数据展示，用于调试`vue`应用，这可以极大地提高我们的调试效率。


## 219、vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？
权限管理一般需求是两个：页面权限和按钮权限

**按钮权限的控制**: 通常会实现一个指令，例如`v-permission`，将按钮要求角色通过值传给`v-permission`指令，在指令的`moutned`钩子中可以判断当前用户角色和按钮是否存在交集，有则保留按钮，无则移除按钮（是DOM操作）。


## 220、你有使用过动态组件吗？说说你对它的理解
`component`是vue的内置组件，通过给元素添加一个特殊的`is`特性来实现。

例子: 三个按钮，每个按钮对应不同的组件，有如下两种方式实现
- 分别使用三个组件，然后通过`v-if`来控制是否显示
  ```html
  <template>
    <div>
      <div class="btns">
        <button @click="handleClick('1')">按钮一</button>
        <button @click="handleClick('2')">按钮二</button>
        <button @click="handleClick('3')">按钮三</button>
      </div>
      <div class="content">
        <com-a v-if="active === '1'"></com-a>
        <com-b v-if="active === '2'"></com-b>
        <com-c v-if="active === '3'"></com-c>
      </div>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        active: '1'
      }
    },
    methods: {
      handleClick (type) {
        this.active = type
      }
    }
  }
  </script>
  ```
  很明显这种方式比较复杂
- 使用动态组件的方式实现
  ```html
  <template>
    <div>
      <div class="btns">
        <button @click="handleClick('1')">按钮一</button>
        <button @click="handleClick('2')">按钮二</button>
        <button @click="handleClick('3')">按钮三</button>
      </div>
      <div class="content">
        <component :is="'com-' + active"></component>
      </div>
    </div>
  </template>
  <script>
  export default {
    data () {
      return {
        active: '1'
      }
    },
    methods: {
      handleClick (type) {
        this.active = type
      }
    }
  }
  </script>
  ```


## 221、prop验证的type类型有哪几种？
八种: `String`、`Number`、`Boolean`、`Array`、`Object`、`Function`、`Symbol`、`Date`
```js
export default {
  props:{
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    // contactsPromise: Promise,
    time: Date,
    key: Symbol
  } 
}
```


## 222、prop是怎么做验证的？可以设置默认值吗？
```js
Vue.component('my-component', {
  props: {
    // 基础的类型检查 (`null` 和 `undefined` 会通过任何类型验证)
    propA: Number,
    // 多个可能的类型
    propB: [String, Number],
    // 必填的字符串
    propC: {
      type: String,
      required: true
    },
    // 带有默认值的数字
    propD: {
      type: Number,
      default: 100
    },
    // 带有默认值的对象
    propE: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: function () {
        return { message: 'hello' }
      }
    },
    // 自定义验证函数
    propF: {
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个
        return ['success', 'warning', 'danger'].includes(value)
      }
    }
  }
})
```


## 223、vue开发过程中你有使用什么辅助工具吗？
> vue-devtools、


## 224、你了解什么是高阶组件吗？可否举个例子说明下？
参考: https://blog.csdn.net/weixin_43392489/article/details/114180179

高阶组件（Higher-Order Component，HOC）是一种函数或装饰器，用于接收一个组件作为参数并返回一个新的组件。这个新组件具有与原始组件相同的渲染逻辑和功能，但可能会增加一些额外的功能或数据。

举个例子，假设我们有一个名为`BaseComponent`的基本组件，它只显示传递给它的text属性的值。下面是一个简单的示例：
```html
<template>
  <div>{{ text }}</div>
</template>

<script>
export default {
  props: ['text']
}
</script>
```
现在我们想要添加一些功能（例如记录组件加载时间、处理错误等），但不想修改原始组件。我们可以编写一个HOC来实现这个目的：
```js
function withExtraFunctionality(BaseComponent) {
  return {
    mounted() {
      console.log('Component loaded at:', new Date())
    },

    errorCaptured(err, vm, info) {
      console.error('An error occurred:', err, vm, info)
    },

    render() {
      return <BaseComponent {...this.$props} />
    }
  }
}
export default withExtraFunctionality(BaseComponent)
```
现在我们可以使用`withExtraFunctionality`函数将`BaseComponent`包装起来，并获得一个新的具有额外功能的组件：
```html
<template>
  <div>
    <h1>Hello world!</h1>
    <EnhancedComponent :text="message" />
  </div>
</template>

<script>
import BaseComponent from './BaseComponent.vue'
import EnhancedComponent from './EnhancedComponent.vue'

export default {
  components: {
    EnhancedComponent: withExtraFunctionality(BaseComponent)
  },

  data() {
    return {
      message: 'This is a message.'
    }
  }
}
</script>
```
现在，`EnhancedComponent`具有与`BaseComponent`相同的渲染逻辑和功能，但还具有记录组件加载时间和处理错误的额外功能。


## 225、为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？
配合相应的`loader`，也可以写为`js`,`jsx`,`ts`,`tsx`这种。


## 226、说说你对vue的extend（构造器）的理解，它主要是用来做什么的？
`extend`的作用是继承当前的Vue类，传入一个`extendOption`生成一个新的构造函数。在`extend`的时候会进行`mergeOption`，融合Vue原型上的`baseOption`，所以`extend`出来的子类也能使用`v-model`、`keep-alive`等全局性的组件。
> 作用是生成组件类。在挂载全局组件和设置了`components`属性的时候会使用到。在生成DOM的时候会`new 实例化挂载`。
```html
<div id="mount-point"></div>
<script>
  // 创建构造器
  var Profile = Vue.extend({
    template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
    data: function () {
      return {
        firstName: 'Walter',
        lastName: 'White',
        alias: 'Heisenberg'
      }
    }
  })
  // 创建 Profile 实例，并挂载到一个元素上。
  new Profile().$mount('#mount-point')
</script>
```


## 227、用vue怎么实现一个换肤的功能？
1. **方式一**: 定义全局的CSS变量
  ```html
  <!-- App.vue -->
  <style>
  /* 定义全局的css变量 */
  :root {
    /* 背景色 */
    --theme_bg_color: red;
    /* 按钮颜色 */
    --theme_button_color: yellowgreen;
  }
  </style>

  <!-- demo.vue -->
  <template>
    <div>
      <h3>换肤 / 切换样式主题 方式1：</h3>
      <button @click="changeTheme('Moccasin')">换肤为Moccasin</button>
      <button @click="changeTheme('#1E90FF')">换肤为#1E90FF</button>
      <button @click="changeTheme('#00FF7F')">换肤为#00FF7F</button>
      <button @click="changeTheme('DeepPink')">换肤为DeepPink</button>
      <button class="myButton">我是一个可以换肤的按钮</button>
      <div class="myDiv">我是一个可以换肤的div</div>
    </div>
  </template>
  <script>
  export default {
    setup() {
      // 切换主题方式1：修改全局CSS变量
      let changeTheme = (color) => {
        document.documentElement.style.setProperty("--theme_bg_color", color);
        document.documentElement.style.setProperty("--theme_button_color", color);
      };
      return { changeTheme  };
    },
  };
  </script>
  <style scoped>
  /* 使用全局的css变量设置颜色 */
  .myButton {
    background: var(--theme_bg_color);
  }
  .myDiv {
    background: var(--theme_button_color);
    width: 200px;
    height: 200px;
  }
  </style>
  ```
2. **方式二**: 切换已定义好的css文件
  ```css
  // theme_1.css：
  .myButton2{
    background: red;
  }
  .myDiv2 {
    background: red;
  }

  // theme_2.css
  .myButton2{
    background: blue;
  }
  .myDiv2 {
    background: blue;
  }
  ```
  使用
  ```html
  <!-- App.vue： -->
  <script>
  import { onMounted } from "vue";
  export default {
    name: "App",
    components: {},
    setup() {
      onMounted(() => {
        console.log("App.vue ---- onMounted");
        // 方式2（创建link标签默认引入 ./css/theme_1.css 主题样式文件）
        let link = document.createElement("link");
        link.type = "text/css";
        link.id = "theme";
        link.rel = "stylesheet";
        link.href = "./css/theme_1.css";
        document.getElementsByTagName("head")[0].appendChild(link);
      });
      return {};
    },
  };
  </script>

  <!-- demo.vue -->
  <template>
    <div>
      <h3>换肤 / 切换样式主题 方式2：</h3>
      <button @click="changeTheme2(1)">换肤为red</button>
      <button @click="changeTheme2(2)">换肤为blue</button>
      <button class="myButton2">我是一个可以换肤的按钮</button>
      <div class="myDiv2">我是一个可以换肤的div</div>
    </div>
  </template>
  <script>
  export default {
    setup() {
      // 切换主题方式2：切换已定义好的css文件
      let changeTheme2 = (type) => {
        document.getElementById("theme").href = `./css/theme_${type}.css`;
      };
      return { changeTheme2  };
    },
  };
  </script>
  ```
3. **方式三**: 切换顶级CSS类名 (需使用css处理器,如sass、less等)
  ```css
  // theme.less
  /* 预设四种主题 */
  .theme_1 {
    .myButton3 {
      background: #00ff7f;
    }
    .myDiv3 {
      background: #00ff7f;
    }
  }

  .theme_2 {
    .myButton3 {
      background: #00ff7f;
    }
    .myDiv3 {
      background: #00ff7f;
    }
  }

  .theme_3 {
    .myButton3 {
      background: #00ff7f;
    }
    .myDiv3 {
      background: #00ff7f;
    }
  }

  .theme_4 {
    .myButton3 {
      background: #00ff7f;
    }
    .myDiv3 {
      background: #00ff7f;
    }
  }
  ```
  main.js：
  ```js
  // 方式3：需要先引入全局主题样式文件 
  import "./assets/css/theme.less";
  ```
  ```html
  <!-- App.vue -->
  <script>
  import { onMounted } from "vue";
  export default {
    name: "App",
    components: {},
    setup() {
      onMounted(() => {
        console.log("App.vue ---- onMounted");
        // 方式3（设置顶层div的class类名）
        document.getElementById("app").setAttribute("class", "theme_1");
      });
      return {};
    },
  };
  </script>

  <!-- demo.vue -->
  <template>
    <div>
      <h3>换肤 / 切换样式主题 方式3：</h3>
      <button @click="changeTheme3(1)">换肤为Moccasin</button>
      <button @click="changeTheme3(2)">换肤为#1E90FF</button>
      <button @click="changeTheme3(3)">换肤为#00FF7F</button>
      <button @click="changeTheme3(4)">换肤为DeepPink</button>
      <button class="myButton3">我是一个可以换肤的按钮</button>
      <div class="myDiv3">我是一个可以换肤的div</div>
    </div>
  </template>
  <script>
  export default {
    setup() {
    // 切换主题方式3：切换顶级CSS类名 (需使用处理器)
      let changeTheme3 = (type) => {
        document.getElementById("app").setAttribute("class", `theme_${type}`);
      };

      return { changeTheme3  };
    },
  };
  </script>
  ```
4. **方式四**: 动态换肤
  > 这也是element-ui的一种换肤方式
  ```html
  <template>
    <div>
      <div>
        <el-tag effec="dark" type="primary">标签颜色</el-tag>
      </div>
      <el-color-picker
        v-model="theme"
        :predefine="['#409EFF', '#1890ff', '#304156','#212121','#11a983', '#13c2c2', '#6959CD', '#f5222d', ]"
      />
    </div>
  </template>

  <script>
  let version = ''
  import('element-ui/package.json').then(res => {
    version = res.version
  })
  const ORIGINAL_THEME = '#409EFF' // 默认主题色

  export default {
    data() {
      return {
        chalk: '', // content of theme-chalk css
        theme: ''
      }
    },
    
    mounted() {
      if(localStorage.getItem('colorPicker')){
        this.theme = localStorage.getItem('colorPicker')
      }
    },
    
    watch: {
    //  监听主题变更并编译主题
      async theme(val) {
        const oldVal = this.chalk ? this.theme : ORIGINAL_THEME

        if (typeof val !== 'string') return
        
        localStorage.setItem('colorPicker',val)
        //  获取新老主题色的色值集合
        const themeCluster = this.getThemeCluster(val.replace('#', ''))
        const originalCluster = this.getThemeCluster(oldVal.replace('#', ''))
        
        const $message = this.$message({
          message: '正在编译主题',
          type: 'success',
          duration: 0,
          iconClass: 'el-icon-loading'
        })
        // 将style渲染到DOM中
        const getHandler = (variable, id) => {
          return () => {
            const originalCluster = this.getThemeCluster(ORIGINAL_THEME.replace('#', ''))
            const newStyle = this.updateStyle(this[variable], originalCluster, themeCluster)
            let styleTag = document.getElementById(id)
            if (!styleTag) {
              styleTag = document.createElement('style')
              styleTag.setAttribute('id', id)
              document.head.appendChild(styleTag)
            }
            styleTag.innerText = newStyle
          }
        }
        //  初次进入或刷新时动态加载CSS文件
        if (!this.chalk) {
          const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`
          await this.getCSSString(url, 'chalk')
        }
        const chalkHandler = getHandler('chalk', 'chalk-style')
        chalkHandler()
        
        const styles = [].slice.call(document.querySelectorAll('style')).filter(style => {
            const text = style.innerText
            return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text)
        })
        styles.forEach(style => {
          const { innerText } = style
          if (typeof innerText !== 'string') return
          style.innerText = this.updateStyle(innerText, originalCluster, themeCluster)
        })
        
        $message.close()
      }
    },
  
    methods: {
    //  更新主题色
      updateStyle(style, oldCluster, newCluster) {
        let newStyle = style
        oldCluster.forEach((color, index) => {
          newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index])
        })
        return newStyle
      },
      // 获取样式文件内容
      getCSSString(url, variable) {
        return new Promise(resolve => {
          const xhr = new XMLHttpRequest()
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
              this[variable] = xhr.responseText.replace(/@font-face{[^}]+}/, '')
              resolve()
            }
          }
          xhr.open('GET', url)
          xhr.send()
        })
      },
      // 获取主题同类色的集合
      getThemeCluster(theme) {
        const tintColor = (color, tint) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)
          if (tint === 0) { // when primary color is in its rgb space
            return [red, green, blue].join(',')
          } else {
            red += Math.round(tint * (255 - red))
            green += Math.round(tint * (255 - green))
            blue += Math.round(tint * (255 - blue))
            red = red.toString(16)
            green = green.toString(16)
            blue = blue.toString(16)
            return `#${red}${green}${blue}`
          }
        }
        const shadeColor = (color, shade) => {
          let red = parseInt(color.slice(0, 2), 16)
          let green = parseInt(color.slice(2, 4), 16)
          let blue = parseInt(color.slice(4, 6), 16)
          red = Math.round((1 - shade) * red)
          green = Math.round((1 - shade) * green)
          blue = Math.round((1 - shade) * blue)
          red = red.toString(16)
          green = green.toString(16)
          blue = blue.toString(16)
          return `#${red}${green}${blue}`
        }
        const clusters = [theme]
        for (let i = 0; i <= 9; i++) {
          console.log(Number((i / 10).toFixed(2)))
          clusters.push(tintColor(theme, Number((i / 10).toFixed(2))))
        }
        clusters.push(shadeColor(theme, 0.1))
        return clusters
      }
    }
  }
  </script>

  <style lang="scss">

  </style>
  ```


## 228、有在vue中使用过echarts吗？踩过哪些坑？如何解决的？
1. 数据为空时图表不清空和屏幕大小发生变化不重绘
  - 数据为空之后需要清空数据使用`echartDom.clear()`
    ```js
    if (dataY.length) {
      this.chartsDom.setOption(option);
    } else {
      this.chartsDom.clear();
    }
    ```
  - `mounted`中添加浏览器宽高变化`resize`事件监听
    ```js
    mounted() {
      // 不建议使用普通事件 因为普通事件有且只能生效一个 所以会被改写覆盖 请使用事件监听
      // window.onresize = () => this.chartsDom ? this.chartsDom.resize() : '';
      // 使用事件监听
      window.addEventListener('resize', () =>
        this.chartsDom ? this.chartsDom.resize() : ''
      );
    }
    ```
2. `echarts`不能通过`Vue.use()`全局调用，使用有两种方法
  - 在需要使用图标的`.vue`文件中直接引入
    ```js
    import echarts from 'echarts'
    let myChart = echarts.init(document.getElementById('myChart'))
    ```
  - 全局引入: 在main.js文件引入并挂载
    ```js
    import echarts from 'echarts'
    Vue.prototype.$echarts = echarts 
    ```
    组件中使用
    ```js
    let myChart = this.$echarts.init(document.getElementById('myChart'))
    ```
3. echarts出现100x100的大小尺寸
  > 我们在vue中使用echarts图表的时候，在一个页面使用多个图标会发现其中一个的图标大小总是100x100，常见于element的 tab，tab刚开始的时候是display: none,所以导致宽高100x100
  ```js
  // 解决办法
  this.myChart.resize()
  ```


## 229、vue部署上线前需要做哪些准备工作？
1. 修改后台接口地址
2. 服务器相关配置: 开放端口或者Nginx配置等
3. 执行打包命令`npm run build`
4. 将dist目录下的文件复制到服务器上


## 230、vue过渡动画实现的方式有哪些？
1. 使用vue的`transition`标签结合css样式完成动画
-   隐藏：加入类名:
    - v-leave：定义离开过渡的开始状态。
    - v-leave-active：定义离开过渡生效时的状态。
    - v-leave-to：定义离开过渡的结束状态。
  - 显示：加入类名:
    - v-enter：准备进行运动的状态(起始状态)
    - v-enter-active：整个运动状态
    - v-enter-to：整个运动状态(强调运动的结果，结束状态)
  ```html
  <style>
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
      }
    .fade-enter, .fade-leave-to{
        opacity: 0;
      }
  </style>
  <div id="demo">
      <button v-on:click="show = !show">
        Toggle
      </button>
      <transition name="fade">
        <p v-if="show">hello</p>
      </transition>
  </div>
  <script>
      new Vue({
          el: '#demo',
          data: {
              show: true
          }
      })
  </script>
  ```
  ![202303141639183.png](http://img.itchenliang.club/img/202303141639183.png)
2. 利用`animate.css`结合`transition`实现动画
  可以通过以下`attribute`来自定义过渡类名：
  - enter-class
  - enter-active-class
  - enter-to-class (2.1.8+)
  - leave-class
  - leave-active-class
  - leave-to-class (2.1.8+)
  它们的优先级高于普通的类名，这对于 Vue 的过渡系统和其他第三方 CSS 动画库，如 Animate.css 结合使用十分有用。
  ```html
  <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
  <div id="example-3">
    <button @click="show = !show">
      Toggle render
    </button>
    <transition
      name="custom-classes-transition"
      enter-active-class="animated tada"
      leave-active-class="animated bounceOutRight">
        <p v-if="show">
        明月几时有,把酒问青天。
        </p>
    </transition>
  </div>
  <script>
      new Vue({
          el: '#example-3',
          data: {
              show: true
          }
      })
  </script>
  ```
3. 利用`vue`中的钩子函数实现动画
  ```html
  <style>
  .show {
    transition: all 0.5s;
  }
  </style>
  <div id="app">
    <button @click="toggle">显示/隐藏</button><br>
    <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
      <div class="show"  v-show="isshow">
        明月几时有?把酒问青天
      </div>
    </transition>
  </div>
  <script>
    new Vue({
      el: '#app',
      data: {
        isshow: false
      },
      methods: {
        toggle: function () {
          this.isshow = !this.isshow;
        },
        beforeEnter: function (el) {
          console.log("beforeEnter");
          // 当入场之前会执行 v-enter
          el.style = "padding-left:100px";
        },
        enter: function (el, done) {
          // 当进行的过程中每执行 v-enter-active
          console.log("enter");
          // 为了能让代码正常进行，在设置了结束状态后必须调用一下这个元素的
          // offsetHeight / offsetWeight  只是为了让动画执行
          el.offsetHeight;
          // 结束的状态最后写在enter中
          el.style = "padding-left:0px";
          // 执行done继续向下执行
          done();
        },
        afterEnter: function (el) {
        // 当执行完毕以后会执行
        console.log("afterEnter");
          //this.isshow = false;
        }
      }
    }) 
  </script>
  ```


## 231、vue在created和mounted这两个生命周期中请求数据有什么区别呢？
- 若涉及页面加载，在`created`的时候，视图中的html并没有渲染出来，所以这个时候如果直接去操作dom节点，一定找不到相关元素。
- 而在`mounted`中，由于此时html已经渲染出来了，所以可以直接操作dom节点。


## 232、vue父子组件双向绑定的方法有哪些？
- `props`和`$emit`
- 组件`v-model`
- `.sync`修饰符


## 233、vue项目有使用过npm run build --report吗？
给`process.env`对象添加了一个属性`npm_config_report: "true"`，表示开启编译完成后的报告。