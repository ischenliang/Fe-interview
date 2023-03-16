# Array响应式实现原理
为什么vue会对数组做特别处理，为什么不能像处理对象一样用`Object.defineProperty`处理数组呢？

问题一: 难道是因为`Object.defineProperty`不支持数组吗？
> 首先我们做个测试，看看`Object.defineProperty`是否支持数组

首先还是定义`defineReactive`方法
```js
function defineReactive (obj, key, val) {
  Object.defineProperty(arr, key, {
    configurable: true,
    enumerable: true,
    get () {
      console.log('--读取--', val)
      return val
    },
    set (newVal) {
      if (newVal === val) return
      val = newVal
      console.log('--修改--', val, obj)
    }
  })
}
```
我们通过遍历数组的方法，将数组的缩影作为`key`传入`defineReactive`，来给每一项打上`getter/setter`
```js
let arr = [1, 2, 3, 4]
arr.forEach((el, index) => {
  defineReactive(arr, index, el)
})
```
我们在控制台分别执行`arr[0]`和`arr[1] = 31`看到输出结果如下图所示: 
![2023031614081710.png](http://img.itchenliang.club/img/2023031614081710.png)
从上图结果来看，数组的每一项都被打上了`getter/setter`，说明`Object.defineProperty`是支持数组的。

问题二：**Vue为什么没有使用`Object.defineProperty`对数组进行监听呢？**<br>
从上面测试结果来看，`Object.defineProperty`是支持数组的，那为啥不用它来对数组属性监听？
> 从上面测试的第二步`arr[1] = 31`结果来看，当给数组某一项赋值时，触发了`setter`，`setter`执行时，控制台输出了`新数组`并且又一次读取了数组中所有的值，这样会非常影响性能的。再加上大部分时间数组长度我们并不确定，无法提请打上`getter/setter`，而且如果数组长度很大也会造成性能问题，用尤大的原话来说就是**性能代价和获得的用户体验收益不成正比**。

最后贴上尤大在[github](https://github.com/vuejs/vue/issues/8562)上的回答
![202303161418186.png](http://img.itchenliang.club/img/202303161418186.png)

总之就是一句话，**vue处于性能的考虑没有使用`Object.defineProperty`来对数组检测，而是用了一种数组变异方法来触发视图更新。**

## 1、使Array型数据可观测
### 1.1、思路探索分析
我们都知道，要想让`Array`型数据发生变化，那必然是操作了`Array`，而在JavaScript中的操作数组的方式就那么几种，我们可以把这些方法重写一遍
> 在不改变原有功能的前提下，为这些方法拓展一些新功能
```js
let arr = [1, 2, 3]
arr.push(4)
Array.prototype.newPush = function (val) {
  console.log('arr被修改了')
  this.push(val)
}
arr.newPush(5)
```
在上面例子中，我们针对数组的`push`原生方法定义了一个新的`newPush`方法，这个`newPush`方法内调还是调用的原生`push`方法，这样就保障了在不修改原有功能的情况下，又实现了拓展一些新功能。
> 其实vue内部也是这么干的。

### 1.2、数组方法拦截器
在`Vue`中创建了一个数组方法拦截器，它拦截在数组实例与`Array.prototype`之间，在拦截器内重写了操作数组的一些方法，当数组实例使用操作数组方法时，其实使用的是拦截器中重写的方法，而不再使用`Array.prototype`上的原生方法。
![202303161435227.png](http://img.itchenliang.club/img/202303161435227.png)

经过对数组的方法探索，发现`Array`原型中可以改变数组自身的方法有7个: `pop`、`push`、`shift`、`unshift`、`splice`、`sort`、`reverse`，对应`vue`源码所在位置`/src/core/observer/array.js`:
```js
const arrayProto = Array.prototype
// 创建一个对象作为拦截器
const arrayMethods = Object.create(arrayProto)
// 改变数组自身的7个方法
const methods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse']

// 劫持数组7个变异方法
function defineReactive (obj) {
  // 函数劫持: 改写新对象上的7个方法
  methods.forEach(method => {
    obj[method] = function (...args) {
      // 通过调用原生方法
      arrayProto[method].apply(this, args) // 或者 .call(this, ...args)
      console.log('数据改变了')
    }
    // 然后将绑定对象的原型链 __proto__ 指向我们的变异方法
    obj.__proto__ = arrayMethods
  })
}
```
测试是否能监测到数据变化
```js
const arr = [1, 2, 3, 4]
defineReactive(arr)
```
![202303161451361.png](http://img.itchenliang.club/img/202303161451361.png)
其实上面的总结起来就一句话: **只需要把待观测的数据的`__proto__`指向我们的变异方法`arrayMethods`即可**。


