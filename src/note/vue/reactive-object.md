# Object响应式实现原理
## 1、使Object数据变得"可观测"
首先，我们定义一个数据对象`car`：
```js
let car = {
  brand: 'bmw',
  price: 3000
}
```
在上面这种模式下，我们无法知道何时属性被读取或修改，接下来我们使用`Object.defineProperty()`改写上面的例子:
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
从上面代码，我们为`car`定义了一个`price`属性，并且把这个属性的读写分别使用`get()`和`set()`进行拦截，这样每次度该属性进行读写操作时都会触发`get()`和`set()`，这样我们就能知道该属性何时被读写操作，即现在`car`已经是**可观测**的了。

上面例子我们只是对`price`着一个属性进行了可观测，实际使用场景上，一个对象会有很多属性，所以接下来我们就实现如何对一个对象的所有属性都变成可观测。
> 封装一个`Observer`(**观察者**)类，并且在该类中通过递归把一个对象的所有属性都转换成可观测。对应vue源码位置: `src/core/observer/index.js`
```js
// Observer: 用来将一个正常的object转换成可观测的object
class Observer {
  constructor (target) {
    this.value = target
    // 为obj新增一个 __ob__ 属性，值为该value的Observer实例
    // 相当于为 target 打上标记，表示它已经被转化成响应式了，避免重复操作
    // def(target, '__ob__', this) // vue内部源码，等价于下面代码
    Object.defineProperty(target, '__ob__', {
      enumerable: false, // 这里需要设置为false，否则会疯狂执行，导致内存溢出
      configurable: true,
      writable: true,
      value: this
    })

    if (Array.isArray(target)) {
      // 数组响应式实现，看下节
    } else {
      const keys = Object.keys(target)
      for (let i = 0; i < keys.length; i++) {
        defineReactive(target, keys[i])
      }
    }
  }
}
/**
 * 使一个对象转换成可观测对象 ===> 响应式对象
 * @param { Object } target 对象
 * @param { String } key 对象的key
 * @param { Any } val 对象的某个key的值
 */
function defineReactive (target, key, val) {
  // 如果只传了 target 和 key，那么 val = target[key]
  if (arguments.length === 2) {
    val = target[key]
  }

  if (typeof val === 'object') {
    new Observer(val)
  }

  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get () {
      console.log(`${key}属性被获取`)
      return val
    },
    set (newVal) {
      console.log(`${key}属性被修改`)
      val = newVal
    }
  })
}
```
在上面代码中，我们定义了`Observer`类，并且给`target`新增了一个`__ob__`属性，值为该`target`的`Observer`实例。
> 这个操作相当于为`target`打标记，代表它已经是响应式了，避免重复操作。

我们使用`Observer`类来定义`car`
```js
let car = new Observer({
  brand: 'bmw',
  price: 3000
})
car.value.price // price属性被获取
car.value.price = 3400 // price属性被修改
car.value.brand // brand属性被获取
car.value.brand = 'benz' // brand属性被修改
```
这样，`car`的两个属性都变得可观测了。


## 2、依赖收集
### 2.1、什么是依赖收集
在上一步中，我们让`object`变成了可侦测的，知道了数据何时发生了变化，那么我们就只需要数据变化时，去通知更新视图就好了。问题来了，视图那么大，我们到底该通知谁去更新变化？
> 不能将整个视图都更新，开销代价非常大，其实很简单，视图中谁用到了这个数据就通知谁去更新，即视图里谁用到了这个数据就更新谁，换句话说**谁用到了这个数据就是谁依赖了这个数据**，我们为每个数据都建立一个`依赖数组`(数据可能被多处使用)，谁依赖了这个数据，我们就把这个“谁”放进这个`依赖数组`中，那么等数据变化时，将对应的依赖数组全部通知一遍，使其更新视图。这整个过程就叫依赖收集。

### 2.2、何时收集依赖？何时通知依赖更新？
在上面已经说了，谁用到了这个数据，那么当数据变化时就通知谁去更新。其实结合我们将`object`变成`可侦测`过程，就知道谁用到了数据会触发`getter`，那么我们就在`getter`中收集依赖。同样的当数据变化时会触发`setter`属性，那么我们就在`setter`中通知依赖更新。
:::  tip 总结
在`getter`中收集依赖，在`setter`中通知依赖更新。
:::

### 2.3、依赖是什么？到底是谁？
在前面我们总是在说“谁用到了这个数据，谁就是依赖”，对应在代码中如何表述呢？
> 其实在vue中还实现了一个`Watcher`类，而`Watcher`类的实例就是我们前面所说的“谁”。换句话说: 谁用到了数据，谁就是依赖，我们就位谁创建一个`Watcher`实例。在后续数据变化时，我们不直接通知依赖更新，而是通知依赖对应的`watcher`实例，由`Watcher`实例去通知真正的视图。对应vue源码位置
```js
// Watcher类
class Watcher {
  /**
   * @param { Object } vm Vue实例
   * @param { String } vm 要被订阅的属性
   * @param { Function } cb 回调方法
   */
  constructor (vm, exp, cb) {
    this.vm = vm
    this.cb = cb
    this.getter = function () {
      return this[exp]
    }
    this.value = this.get()
  }
  get () {
    window.target = this
    let value = this.getter.call(this.vm)
    window.target = undefined
    return value
  }
  update () {
    // const oldValue = this.value
    // this.value = this.get()
    // this.cb.call(this.vm, this.value, oldValue)
    this.cb()
  }
}
```

### 2.4、把依赖收集到哪里
在2.1小节中也说了，我们为给个侦测数据都建立一个依赖数组，谁依赖了这个数据我们就把谁放进这个依赖数组。
> 我们将依赖数组功能建立一个依赖管理器`Dep`类，对应vue源码位置: `src/core/observer/dep.js`
```js
class Dep {
  constructor () {
    this.subs = []
  }
  addSub (sub) {
    this.subs.push(sub)
  }
  // 删除一个依赖
  removeSub (sub) {
    if (this.subs.length) {
      const index = this.subs.indexOf(sub)
      if (index > -1) {
        return this.subs.splice(index, 1)
      }
    }
  }
  // 添加依赖
  depend () {
    if (window.target) {
      this.addSub(window.target)
    }
  }
  // 通知所有依赖更新
  notify () {
    // 克隆: 为了不改变原数据 
    const subs = this.subs.slice()
    for (let i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
}
```
在上面代码中，我们先初始化了一个`subs`数组，用来存放依赖，并且定义了几个实例方法对依赖进行`添加`、`删除`、`通知`等操作。

有了依赖管理器，我们就可以在`getter`中收集依赖，在`setter`中通知依赖更新了，修改上面的`defineReactive`方法: 
```js
function defineReactive (target, key, val) {
  // 如果只传了 target 和 key，那么 val = target[key]
  if (arguments.length === 2) {
    val = target[key]
  }
  if (typeof val === 'object') {
    new Observer(val)
  }
  const dep = new Dep()
  Object.defineProperty(target, key, {
    configurable: true,
    enumerable: true,
    get () {
      dep.depend() // 在getter中收集依赖
      return val
    },
    set (newVal) {
      if(val === newVal){
        return
      }
      val = newVal
      dep.notify() // 在setter中通知依赖更新
    }
  })
}
```
在上面代码中，我们在`getter`中调用`dep.depend()`方法收集依赖，在`setter`中调用`dep.notify()`方法通知依赖更新。