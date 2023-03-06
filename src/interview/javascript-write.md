# JavaScript手写面试题汇总
> JS手写题简单来说就是实现在js中常用的函数/工具/关键字等，如`Object.create()`、`new`关键字的实现。


参考：
- https://www.w3cschool.cn/web_interview/web_interview-9au63pv1.html
- https://mp.weixin.qq.com/s/gpZmJ2ZljlW83Pb-TCnm3A
- https://juejin.cn/post/6963167124881670152
- https://mp.weixin.qq.com/s/7KwM6fNM5MICHiIwoRDm-w
- https://juejin.cn/post/6895967637580070925
- https://juejin.cn/post/6844904052237713422
- https://juejin.cn/post/6844903911686406158

## new关键字手写实现
```js
function objectFactory() {
  let newObject = null,
    constructor = Array.prototype.shift.call(arguments), // 取出第一个参数--构造函数
    result = null;

  // 参数判断
  if (typeof constructor !== "function") {
    console.error("type error");
    return;
  }

  // 新建一个空对象，对象的原型为构造函数的 prototype 对象
  newObject = Object.create(constructor.prototype);

  // 将 this 指向新建对象，并执行函数
  result = constructor.apply(newObject, arguments);

  // 判断返回对象
  let flag = result && (typeof result === "object" || typeof result === "function");

  // 判断返回结果
  return flag ? result : newObject;
}

// 使用方法
// objectFactory(构造函数, 初始化参数);
```

## 1、apply的实现
+ 前部分与call一样
+ 第二个参数可以不传，但类型必须为数组或者类数组
```js
Function.prototype.myApply = function (context, args = []) {
  let ctx = context || window
  ctx.fn = this // 此处this是指当前调用myCall这个方法的调用者即fn，简单来说就是将fn挂载到传入的obj上
  const res = ctx.fn(...args) // 在调用obj上的fn方法并且传入参数
  delete ctx.fn // 调用完成后，删除obj上的方法，不然然会对传入对象造成污染(会添加这个fn方法)
  return res
}
```
`myApply`的使用:
```js
function fn (...args) {
  console.log(this)
  console.log(args)
}
const obj = {
  name: '张三'
}
fn.myApply(obj, ['小黑', 5]) // { name: '张三' } ['小黑', 5]
```

## 2、call的实现
+ 第一个参数为`null`或者`undefined`时，`this`指向全局对象`window`，值为原始值的指向该原始值的自动包装对象，如`String`、`Number`、`Boolean`
+ 为了避免函数名与上下文(`context`)的属性发生冲突，使用`Symbol`类型作为唯一值
+ 将函数作为传入的上下文(`context`)属性执行
+ 函数执行完成后删除该属性
+ 返回执行结果

编码实现：因为call就是在函数上使用，所以我们这里直接在`Function`的`prototype`属性上定义
```js
Function.prototype.myCall = function (context, ...args) {
  let ctx = context || window
  ctx.fn = this // 此处this是指当前调用myCall这个方法的调用者即fn，简单来说就是将fn挂载到传入的obj上
  args = args ? args : [] // 处理参数
  const res = args.length > 0 ? ctx.fn(...args) : ctx.fn() // 在调用obj上的fn方法并且传入参数
  delete ctx.fn // 调用完成后，删除obj上的方法，不然然会对传入对象造成污染(会添加这个fn方法)
  return res
}
```
`myCall`的使用:
```js
function fn (...args) {
  console.log(this)
  console.log(args)
}
const obj = {
  name: '张三'
}
fn.myCall(obj, '小黑', 5) // { name: '张三' } ['小黑', 5]
console.log(obj) // 如果myCall中没有加 delete ctx.fn 这行代码，这行代码会输出{ name: '张三', fn: [Function: fn] }
```

## 3、bind的实现
需要考虑：
+ `bind()`除了`this`外，还可传入多个参数；
+ `bind`创建的新函数可能多次传入参数；
+ 新函数可能被当做构造函数调用；
+ 函数可能有返回值；

实现方法：
+ `bind`方法不会立即执行，需要返回一个待执行的函数；（闭包）
+ 实现作用域绑定（apply）
+ 参数传递（apply 的数组传参）
+ 多次传参（闭包来实现）
+ 当作为构造函数的时候，进行原型继承
```js
Function.prototype.myBind = function(context, ...args) {
  var _this = this // 表示当前的调用者这个function
  return function (...newArgs) { // 这里newArgs就是第一次之后的几次传参
    return _this.apply(context, [...args, ...newArgs]) // 将第一次传递的参数和第二次传递参数组合起来就是最终的参数
  }
}
```
使用：
```js
function fn (...args) {
  console.log(this)
  console.log(args)
}
const obj = {
  name: '张三'
}
const result = fn.myBind(obj, '小黑', '小白')
result('小红') // { name: '张三' }  ['小黑', '小白', '小红']

// 构造函数中使用
function Father (name) {
  this.name = name
}
function Son (name) {
  const result = Father.myBind(this, name)
  result()
}
const son = new Son('小三')
console.log(son) // Son { name: '小三' }
```

## 4、new的实现
+ 一个继承自`Foo.prototype`的新对象被创建
+ 使用指定的参数调用构造函数`Foo`，并将`this`绑定到新创建的对象
+ 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象
+ 一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤
```js
function myNew (ctor, ...args) {
  if (typeof ctor !== 'function') {
    throw '第一个参数必须是构造函数'
  }
  var ctx = Object.create(ctor.prototype) // 先拿到构造函数的原型对象
  const result = ctor.apply(ctx, args) // 在通过apply的方法将this指向ctx并传入参数,这里需要考虑传入的构造函数是否显式返回数据
  // 有返回数据
  if (typeof result === 'object' || typeof result === 'function') {
    return result
  }
  // 没有返回数据就返回我们的新对象
  return ctx
}
````
调用方式：
```js
// 方式一：构造函数没有显式返回数据
function Father (name) {
  this.name = name
}
Father.prototype.age = 28
const father = myNew(Father, '张三')
console.log(father.name, father.age) // 张三 28

// 方式二：构造函数显式返回数据
function Father (name) {
  this.name = name
  return Object.create({
    name: '张小三',
    age: 24
  })
}
Father.prototype.age = 28
const father = myNew(Father, '张三')
console.log(father.name, father.age) // 张小三 24
```

## 5、instanceof和typeof的实现
### instanceof的实现
+ instanceof是用来判断A是否为B的实例，表达式为：`A instanceof B`，如果A是B的实例，则返回true,否则返回false
+ instanceof运算符用来测试一个对象在其原型链中是否存在一个构造函数的`prototype`属性
+ 不能检测基本数据类型，在原型链上的结果未必准确，不能检测`null`,`undefined`
+ 实现：遍历左边变量的原型链，直到找到右边变量的`prototype`，如果没有找到，返回`false`
```js
// 方式一：使用__proto__和prototype实现
function myInstanceOf (a, b) {
  let left = a.__proto__
  let right = b.prototype
  while(true) {
    if (left === null) {
      return false
    }
    if (left === right) {
      return true
    }
    left = left.__proto__
  }
}

// 方式二：使用Object.getPrototypeOf(a)和prototype实现
function myInstanceOf (a, b) {
  let left = Object.getPrototypeOf(a) // 从a上获取父类
  let right = b.prototype // 获取构造函数的 prototype 对象
  while(true) {
    if (!left) return false
    if (left === right) return true
    left = Object.getPrototypeOf(left)
  }
}
```
调用：
```js
class Father {
  constructor (name) {
    this.name = name
  }
}
class Son extends Father {
  constructor (name, age) {
    super(name)
    this.age = age
  }
}
const son = new Son('小三', 8)
console.log(myInstanceOf(son, Son)) // true
console.log(myInstanceOf(son, Father)) // true
console.log(myInstanceOf(son, Object)) // true
```

### typeof的实现
由于万物皆对象，所以我们就在`Object.prototype.toString`上来实现。
我们先来看下下面的代码：可以看到的是，返回的字符串中实际上已经带有类型了，即`Array||Object等等`的，所以我们只需要从这个返回的字符串中取出我们想要的数据即可。
```js
Object.prototype.toString.call([])  // [object Array]
Object.prototype.toString.call({})  // [object Object]
Object.prototype.toString.call(new Date)  // [object Date]
Object.prototype.toString.call('123')  // [object String]
Object.prototype.toString.call(123)  // [object Number]
Object.prototype.toString.call(fasle) // [object Boolean]
```
实现自己的`typeOf`:
+ typeof返回的是数据类型
+ typeof返回的数据类型是字符串，并且是小写的
```js
function typeOf(obj) {
  let result = Object.prototype.toString.call(obj)
  // 从[object Array]分隔出想要的数据
  result = result.substring(1, result.length - 1) // object Array
  return result.split(' ')[1].toLowerCase()
}
console.log(typeOf([])) // array
console.log(typeOf({})) // object
console.log(typeOf(new Date())) // date
console.log(typeOf('123')) // string
console.log(typeOf(123)) // number
console.log(typeOf(false)) // boolean
console.log(typeOf(undefined)) // undefined
```

## 6、Object.create实现
`Object.create()`会将参数对象作为一个新创建的空对象的原型, 并返回这个空对象
```js
function myCreate (obj) {
  // 声明一个函数
  function C () {}
  // 将函数的原型指向obj
  C.prototype = obj
  // 返回这个函数的实例化对象
  return new C()
}
```
使用：
```js
const obj = myCreate({
  name: '张小三',
  age: 24
})
console.log(obj) // {}
console.log(obj.name, obj.age) // 张小三 24
```

## 7、Object.assign实现
```js
Object.myAssign = function (target, ...source) {
  if (target === null) {
    throw new Error('Cannot convert undefined or null to object')
  }
  let result = Object(target)
  source.forEach(item => {
    if (item !== null) {
      // 循环遍历key，将key添加到target上
      for (let key in item) {
        result[key] = item[key]
      }
    }
  })
  return result
}
```
使用：
```js
console.log(Object.myAssign({ name: '小三' }, { age: 23 })) // { name: '小三', age: 23 }
console.log(Object.myAssign({ name: '小三' }, { name: '小灰', age: 23 })) // { name: '小灰', age: 23 }
```

## 8、Ajax的实现
```js
function ajax(url,method,body,headers){
  return new Promise((resolve,reject)=>{
    let req = new XMLHttpRequest()
    req.open(methods,url)
    for(let key in headers){
      req.setRequestHeader(key,headers[key])
    }
    req.onreadystatechange(()=>{
      if(req.readystate == 4){
        if(req.status >= '200' && req.status <= 300){
          resolve(req.responeText)
        }else{
          reject(req)
        }
      }
    })
    req.send(body)
  })
}
```

## 9、实现防抖函数（debounce）
防抖函数，其实就是在我们做一些操作不需要立马给出反应，而是等待一小会来给出反应，比如在搜索框输入搜索内容时，我们不希望用户连续输入`a`给出反应，`ab`给出反应，`abc`给出反应，而是需要等待用户输入`abc`完成后指定时间内未输入才给出反应。
连续触发在最后一次执行方法，场景：输入框匹配
```js
let debounce = (fn, time = 1000) => {
  let timeId = null
  return function (...args) {
    clearTimeout(timeId)
    timeId = setTimeout(() => {
      // 自己的操作
      fn(...args)
    }, time)
  }
}
```
使用：
```js
debounce(function(value, age) {
  console.log(value, age)
}, 1000)('小三', 24)
```
在vue中防抖的使用场景：
```html
<input @input="input" v-model="value" />
<script>
export default {
  data () {
    return { value: '', timer: null }
  },
  methods: {
    input (value) {
      clearTimeout(this.timer)
      setTimeOut(() => {
        this.value = value
        this.getList() // 获取数据
      }, 1000)
    }
  }
}
</script>
```

## 10、实现节流函数（throttle）
在一定时间内只触发一次，场景：长列表滚动节流
```js
let throttle = (fn, time = 1000) => {
  let flag = true
  return function (...args) {
    if (flag) {
      flag = false
      setTimeout(() => {
        flag = true
        fn(...args)
      }, time)
    }
  }
}
```
使用：
```js
throttle((name, age) => {
  console.log(name, age)
}, 1000)('张小三', 24)
```

## 11、深拷贝（deepclone）
+ 判断类型，正则和日期直接返回新对象
+ 空或者非对象类型，直接返回原值
+ 考虑循环引用，判断如果hash中含有直接返回hash中的值
+ 新建一个相应的`new obj.constructor`加入hash
+ 遍历对象递归（普通`key`和`key`是`symbol`情况）
```js
function deepClone(obj, hash = new WeakMap()) {
  // 正则：直接返回新对象
  if (obj instanceof RegExp) return new RegExp(obj)
  // 日期：直接返回新对象
  if (obj instanceof Date) return new Date(obj)
  // 空或者非对象类型：直接返回原值
  if (obj === null || typeof obj !== 'object') return obj
  // 循环引用的情况
  if (hash.has(obj)) {
    return hash.get(obj)
  }
  // new一个相应的对象
  // obj为Array，相当于new Array()
  // obj为Object，相当于new Object()
  let constr = new obj.constructor()
  hash.set(obj, constr)
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      constr[key] = deepClone(obj[key], hash)
    }
  }
  // 考虑symbol的情况
  let symbolObj = Object.getOwnPropertySymbols(obj)
  for (let i = 0; i < symbolObj.length; i++) {
    if (obj.hasOwnProperty(symbolObj[i])) {
      constr[symbolObj[i]] = deepClone(obj[symbolObj[i]], hash)
    }
  }
  return constr
}
```

**简单版本**
```js
const obj = {
  name: '张三',
  age: 23,
  hobbits: {
    eat: ['鸡肉', '猪肉', '牛肉'],
    sleep: '23:00 - 07:30'
  },
  action: function () {
    console.log(`My name is ${this.name}`)
  }
}

function deepClone (target) {
  let tmp = {}
  for(let key in target) {
    if (target && typeof target[key] === 'object') {
      tmp[key] = deepClone(target[key])
    } else {
      tmp[key] = target[key]
    }
  }
  return tmp
}
const res = deepClone(obj)
res.hobbits.sleep = '22:30 - 08:00'
console.log(res, obj)
res.action()
```

## 12、数组扁平化的实现(flat)
参考：[数组扁平化的6种实现方式](https://blog.csdn.net/qq_44704740/article/details/107302452)
实现的效果如下：
```js
let arr = [1,2,[3,4,[5,[6]]]]
console.log(arr.flat(Infinity)) // [1, 2, 3, 4, 5, 6]
```
自己来实现这个方法：
**方法一：无视数据层级**
```js
//用reduce实现
function fn(arr){
   return arr.reduce((prev,cur)=>{
      return prev.concat(Array.isArray(cur)?fn(cur):cur)
   },[])
}
console.log(fn([1,2,[3,4,[5,[6]]]])) // [1, 2, 3, 4, 5, 6]
```
**方法二：有层级(这种方式就是`Array.prototype.flat`的代码实现)**
```js
Array.prototype.myFlat = function (depth = 1) {
  // 处理传入的参数不是number类型的，抛出异常
  if (typeof depth !== 'number') {
    throw new Error('level must be number')
  }

  // 处理有展开层级的，包括Infinity
  let result = []
  return function flat (arr, depth) {
    // forEach会自动去除数组空位，即：[1, , 3, 4] ==> [1, 3, 4]
    arr.forEach((item) => {
      // 控制递归深度
      if (Array.isArray(item) && depth > 0) {
        // 递归数组
        flat(item, depth - 1)
      } else {
        // 缓存元素
        result.push(item)
      }
    })
    // 返回递归结果
    return result
  }(this, depth)
}

const arr = [1, 2, , , [3, 4, [5, [6]]]]
console.log(arr.myFlat(Infinity)) // [1, 2, 3, 4, 5, 6]
console.log(arr.myFlat()) // [1, 2, 3, 4, [5, [6]]]
console.log(arr.myFlat(1)) // [1, 2, 3, 4, [5, [6]]]
console.log(arr.myFlat(2)) // [1, 2, 3, 4, 5, [6]]
```

## 13、函数柯里化
柯里化，即Currying，可以使函数变得更加灵活。我们可以一次性传入多个参数调用它；也可以只传入一部分参数来调用它，让它返回一个函数去处理剩下的参数。
JavaScript的`call`方法就是**函数柯里化**的典型例子。
```js
function curry(fn, ...args){
  // fn.length：获取函数参数长度: function sumFn(a, b, c){ return a+ b + c } console.log(sumFn.length) ==> 3
  // 对比函数的参数长度和当前传入参数长度
  // 若当前传入的参数长度小于函数的参数长度，即传入的参数不够，则还需要多次传入，即返回一个闭包
  if(fn.length > args.length) return function(...args2){
    return curry(fn, ...args, ...args2)
  }
  // 参数长度足够则调用函数返回对应的值
  return fn(...args)
}

console.log(curry((a, b, c) => a + b + c, 1, 2, 3)) // 6
const result = curry((a, b, c) => a + b + c, 1)
console.log(result(2, 3)) // 6
```

## 14、使用闭包实现每隔一秒打印1,2,3,4
```js
for (var i = 1; i < 5; i++) {
  // 这样是全局作用域，最终输出的全是5 5 5 5
  // setTimeout(() => {
  //   console.log(i)
  // }, 1000)

  // 形成一个函数的作用域：其实就是将i使用闭包来进行缓存，这样就输出1 2 3 4
  ((i) => {
    setTimeout(() => {
      console.log(i)
    }, 1000 * i)
  })(i)
}


 for (let i = 1; i < 5; i++) {
  setTimeout(() => {
    console.log(i)
  }, 1000)
}
```
参考: [https://blog.csdn.net/Sunshine0508/article/details/99588435](https://blog.csdn.net/Sunshine0508/article/details/99588435)

## 15、手写一个jsonp
```js
const jsonp = function (url, data) {
    return new Promise((resolve, reject) => {
        // 初始化url
        let dataString = url.indexOf('?') === -1 ? '?' : ''
        let callbackName = `jsonpCB_${Date.now()}`
        url += `${dataString}callback=${callbackName}`
        if (data) {
            // 有请求参数，依次添加到url
            for (let k in data) {
                url += `${k}=${data[k]}`
            }
        }
        let jsNode = document.createElement('script')
        jsNode.src = url
        // 触发callback，触发后删除js标签和绑定在window上的callback
        window[callbackName] = result => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            if (result) {
                resolve(result)
            } else {
                reject('没有返回数据')
            }
        }
        // js加载异常的情况
        jsNode.addEventListener('error', () => {
            delete window[callbackName]
            document.body.removeChild(jsNode)
            reject('JavaScript资源加载失败')
        }, false)
        // 添加js节点到document上时，开始请求
        document.body.appendChild(jsNode)
    })
}
jsonp('http://192.168.0.103:8081/jsonp', {
    a: 1,
    b: 'heiheihei'
})
.then(result => {
    console.log(result)
})
.catch(err => {
    console.error(err)
})
```

## 16、手写一个观察者模式
```js
class Subject{
  constructor(name){
    this.name = name
    this.observers = []
    this.state = 'XXXX'
  }
  // 被观察者要提供一个接受观察者的方法
  attach(observer){
    this.observers.push(observer)
  }

  // 改变被观察着的状态
  setState(newState){
    this.state = newState
    this.observers.forEach(o=>{
      o.update(newState)
    })
  }
}

class Observer{
  constructor(name){
    this.name = name
  }

  update(newState){
    console.log(`${this.name}say:${newState}`)
  }
}

// 被观察者 灯
let sub = new Subject('灯')
let mm = new Observer('小明')
let jj = new Observer('小健')
 
// 订阅 观察者
sub.attach(mm)
sub.attach(jj)
 
sub.setState('灯亮了来电了')
```

## 17、EventEmitter实现（发布订阅模式）
```js
class EventEmitter {
    constructor() {
        this.events = {};
    }
    on(event, callback) {
        let callbacks = this.events[event] || [];
        callbacks.push(callback);
        this.events[event] = callbacks;
        return this;
    }
    off(event, callback) {
        let callbacks = this.events[event];
        this.events[event] = callbacks && callbacks.filter(fn => fn !== callback);
        return this;
    }
    emit(event, ...args) {
        let callbacks = this.events[event];
        callbacks.forEach(fn => {
            fn(...args);
        });
        return this;
    }
    once(event, callback) {
        let wrapFun = function (...args) {
            callback(...args);
            this.off(event, wrapFun);
        };
        this.on(event, wrapFun);
        return this;
    }
}

class Event {
  // 首先定义一个事件容器，用来装事件数组（因为订阅者可以是多个）
  #handlers = {}

  // 事件添加方法，参数有事件名和事件方法
  addEventListener(type, handler) {
    // 首先判断handlers内有没有type事件容器，没有则创建一个新数组容器
    if (!(type in this.#handlers)) {
      this.#handlers[type] = []
    }
    // 将事件存入
    this.#handlers[type].push(handler)
  }

  // 触发事件两个参数（事件名，参数）
  dispatchEvent(type, ...params) {
    // 若没有注册该事件则抛出错误
    if (!(type in this.#handlers)) {
      return new Error('未注册该事件')
    }
    // 便利触发
    this.#handlers[type].forEach(handler => {
      handler(...params)
    })
  }

  // 事件移除参数（事件名，删除的事件，若无第二个参数则删除该事件的订阅和发布）
  removeEventListener(type, handler) {
    // 无效事件抛出
    if (!(type in this.#handlers)) {
      return new Error('无效事件')
    }
    if (!handler) {
      // 直接移除事件
      delete this.#handlers[type]
    } else {
      const idx = this.#handlers[type].findIndex(ele => ele === handler)
      // 抛出异常事件
      if (idx === -1) {
        return new Error('无该绑定事件')
      }
      // 移除事件
      this.#handlers[type].splice(idx, 1)
      if (this.#handlers[type].length === 0) {
        delete this.#handlers[type]
      }
    }
  }
}
```

## 18、生成随机数的各种方法？
```js
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min)) + min   
}
```

## 19、如何实现数组的随机排序？
```js
let arr = [2,3,454,34,324,32]
arr.sort(randomSort)
function randomSort(a, b) {
  return Math.random() > 0.5 ? -1 : 1;
}
```

## 20、写一个通用的事件侦听器函数
```js
const EventUtils = {
  // 视能力分别使用dom0||dom2||IE方式 来绑定事件
  // 添加事件
  addEvent: function(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  // 移除事件
  removeEvent: function(element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + type, handler);
    } else {
      element["on" + type] = null;
    }
  },
 // 获取事件目标
  getTarget: function(event) {
    return event.target || event.srcElement;
  },
  // 获取 event 对象的引用，取到事件的所有信息，确保随时能使用 event
  getEvent: function(event) {
    return event || window.event;
  },
 // 阻止事件（主要是事件冒泡，因为 IE 不支持事件捕获）
  stopPropagation: function(event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  // 取消事件的默认行为
  preventDefault: function(event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  }
};
```

## 21、使用迭代的方式实现flatten函数
```js
var arr = [1, 2, 3, [4, 5], [6, [7, [8]]]]
/** * 使用递归的方式处理 * wrap 内保
存结果 ret * 返回一个递归函数 **/
function wrap() {
    var ret = [];
    return function flat(a) {
        for (var item of a) {
                if (item.constructor === Array) {
                    ret.concat(flat(item))
                } else {
                    ret.push(item)
                }
        }
        return ret
    }
} 
console.log(wrap()(arr))
```


## 22、怎么实现一个sleep
**sleep函数**作用是让线程休眠，等到指定时间在重新唤起。
```js
function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
    continue;
  }
}

function test() {
  console.log('111');
  sleep(2000);
  console.log('222');
}

test()
```

## 23、实现正则切分千分位（10000 => 10,000）
```js
//无小数点
let num1 = '1321434322222'
num1.replace(/(\d)(?=(\d{3})+$)/g,'$1,')
//有小数点
let num2 = '342243242322.3432423'
num2.replace(/(\d)(?=(\d{3})+\.)/g,'$1,')
```

## 24、对象数组去重
### 普通数组去重
参考：https://mp.weixin.qq.com/s/7KwM6fNM5MICHiIwoRDm-w
```js
// ES5
function unique(arr) {
  return arr.filter((current, index, array) => {
    return array.indexOf(current) === index
  })
}
console.log(unique([1, 2, 1, 3, 4, 5, 3])) // [1, 2, 3, 4, 5]

// ES6
const arr = [1, 2, 1, 3, 4, 5, 3]
console.log([...new Set(arr)]) // [1, 2, 3, 4, 5]
console.log(Array.from(new Set(arr))) // [1, 2, 3, 4, 5]
```

### 对象数组去重
```text
输入: [{a:1,b:2,c:3},{b:2,c:3,a:1},{d:2,c:2}]
输出: [{a:1,b:2,c:3},{d:2,c:2}]
```
+ 首先写一个函数把对象中的key排序，然后再转成字符串
+ 遍历数组利用Set将转为字符串后的对象去重
```js
// 方式一
function unique(arr) {
  return arr.reduce((total, item) => {
    if (!(total.find(el => el.key === item.key && el.value === item.value))) {
      total.push(item)
    }
    return total
  }, [])
}

// 方式二：缺点==>对于key属性相同的，但是value不同的无法去重
function objSort(obj){
    let newObj = {}
    //遍历对象，并将key进行排序
    Object.keys(obj).sort().map(key => {
        newObj[key] = obj[key]
    })
    //将排序好的数组转成字符串
    return JSON.stringify(newObj)
}

function unique(arr){
    let set = new Set();
    for(let i=0;i<arr.length;i++){
        let str = objSort(arr[i])
        set.add(str)
    }
    //将数组中的字符串转回对象
    arr = [...set].map(item => {
        return JSON.parse(item)
    })
    return arr
}

// 使用
const arr = [{
  key: '01',
  value: '乐乐'
}, {
  key: '02',
  value: '博博'
}, {
  key: '03',
  value: '淘淘'
},{
  key: '04',
  value: '哈哈'
},{
  key: '01',
  value: '哈哈'
}]
console.log(unique(arr))
// 输出
[
  { key: '01', value: '乐乐' },
  { key: '02', value: '博博' },
  { key: '03', value: '淘淘' },
  { key: '04', value: '哈哈' },
  { key: '01', value: '哈哈' }
]

// 方式三：只判断某一个属性来去重，而不是所有属性判断
function unique(arr) {
  var obj = {}
  return arr.reduce((total, item) => {
    if (!obj[item.key]) {
      obj[item.key] = true
      total.push(item)
    }
    return total
  }, [])
}
console.log(unique(arr))
// 输出
[
  { key: '01', value: '乐乐' },
  { key: '02', value: '博博' },
  { key: '03', value: '淘淘' },
  { key: '04', value: '哈哈' }
]
```

## 25、.解析URL Params为对象
```js
let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled'
parseParam(url)
/* 结果
{ user: 'anonymous',
  id: [ 123, 456 ], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京', // 中文需解码
  enabled: true, // 未指定值的key约定为 true
}
*/
```
+ 重复出现的key要组装成数组
+ 对中文进行解码
+ 对没有值的key约定为true
```js
function parseParam (url) {
  if (url.split('?').length <= 1) {
    throw new Error('url must take paramaters')
  }
  const paramsStr = url.split('?')[1] // 将?后面的字符串取出来
  const paramsArr = paramsStr.split('&') // 根据&去切割
  let paramObj = {} // 最后保存的参数对象
  // 循环paramsArr
  paramsArr.forEach(item => {
    // 判断是否有 = (有：有值，没有：赋值为true)
    if (item.indexOf('=') !== -1) {
      let [key, value] = item.split('=') // 根据=切割然后解构赋值出key-value
      value = decodeURIComponent(value) // 解码
      value = /^\d+$/.test(value) ? parseFloat(value) : value // 判断是否转为数字

      // 判断paramObj中是否存在当前key
      if (paramObj[key]) {
        paramObj[key] = [].concat(paramObj[key], value)
      } else {
        paramObj[key] = value
      }
    } else {
      paramObj[item] = true
    }
  })
  return paramObj
}


let url = 'http://www.domain.com/?age=24&name=张三&enable&name=%E7%BE%8E%E5%9B%BD'
console.log(parseParam(url)) // { age: 24, name: [ '张三', '美国' ], enable: true }
```

## 26、模板引擎实现
```js
let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
  name: '姓名',
  age: 18
}
render(template, data) // 我是姓名，年龄18，性别undefined
```
```js
function render(template, data) {
  const reg = /\{\{(\w+)\}\}/; // 模板字符串正则
  if (reg.test(template)) { // 判断模板里是否有模板字符串
    const name = reg.exec(template)[1]; // 查找当前模板里第一个模板字符串的字段
    template = template.replace(reg, data[name]); // 将第一个模板字符串渲染
    return render(template, data); // 递归的渲染并返回渲染后的结构
  }
  return template; // 如果模板没有模板字符串直接返回
}
```

## 27、转化为驼峰命名
```js
var s1 = "get-element-by-id" // 转化为 getElementById
```
```js
var f = function(s) {
    return s.replace(/-\w/g, function(x) {
        return x.slice(1).toUpperCase();
    })
}
```

## 28、查找字符串中出现最多的字符和个数
+ 例: abbcccddddd -> 字符最多的是d，出现了5次
```js
let str = "abcabcabcbbccccc";
let num = 0;
let char = '';

 // 使其按照一定的次序排列
str = str.split('').sort().join('');
// "aaabbbbbcccccccc"

// 定义正则表达式
let re = /(\w)\1+/g;
str.replace(re,($0,$1) => {
    if(num < $0.length){
        num = $0.length;
        char = $1;        
    }
});
console.log(`字符最多的是${char}，出现了${num}次`);
```

## 29、查找字符串中每个字符出现的次数
### 方式一：简单的for循环
```js
const str = 'jshdjsihh'
const arr = str.split('').sort()
let obj = {}
for (let i in arr) {
  if (!obj[arr[i]]) {
    obj[arr[i]] = 0
  }
  obj[arr[i]]++
}
console.log('arr', arr)
console.log('obj', obj)
```
### 方式二：reduce循环
```js
const str = 'jshdjsihh'
const obj = str.split('').reduce((pre, item) => {
  pre[item] ? pre[item] ++ : pre[item] = 1
  return pre
}, {})
console.log(obj)
```

## 30、查找特定字符在字符串中出现的次数
### 方式一：采用29中的方式
先统计出所有的字符出现的次数，然后再来判断指定字符出现
```js
function getCharCount (str, target) {
  const obj = str.split('').reduce((pre, item) => {
    pre[item] ? pre[item] ++ : pre[item] = 1
    return pre
  }, {})
  if (obj[target]) {
    return { char: target, num: obj[target] }
  }
  return { char: target, num: 0 }
}
console.log(getCharCount('abcabcabcbbccccc', 'c')) // { char: 'c', num: 8 }
console.log(getCharCount('abcabcabcbbccccc', 'd')) // { char: 'd', num: 0 }
```

### 方式二：通过正则表达式 + `str.replace`方法
`/(\w)\1+/g`的解释参考：
https://segmentfault.com/q/1010000012552849
```js
function getCharCount (str, target) {
  str = str.split('').sort().join('')
  let num = 0
  let char = ''
  // 定义正则表达式
  let re = /(\w)\1+/g
  // replace的参数replacement可以是一个函数：
  //    参数一(匹配到的字符串)、参数二(当前的匹配规则)、参数三(出现的位置)、参数四(当前这个字符串)
  str.replace(re, (...args) => {
    if (args[1] === target) {
      char = args[1]
      num = args[0].length
    }
  })
  return {
    char,
    num
  }
}
console.log(getCharCount('abcabcabcbbccccc', 'c')) // { char: 'c', num: 8 }
```


## 31、图片懒加载
与普通的图片懒加载不同，如下这个多做了 2 个精心处理：
+ 图片全部加载完成后移除事件监听；
+ 加载完的图片，从 imgList 移除；
```js
let imgList = [...document.querySelectorAll('img')]
let length = imgList.length

const imgLazyLoad = function() {
    let count = 0
    return (function() {
        let deleteIndexList = []
        imgList.forEach((img, index) => {
            let rect = img.getBoundingClientRect()
            if (rect.top < window.innerHeight) {
                img.src = img.dataset.src
                deleteIndexList.push(index)
                count++
                if (count === length) {
                    document.removeEventListener('scroll', imgLazyLoad)
                }
            }
        })
        imgList = imgList.filter((img, index) => !deleteIndexList.includes(index))
    })()
}

// 这里最好加上防抖处理
document.addEventListener('scroll', imgLazyLoad)
```

## 32、Promise的实现
实现 Promise 需要完全读懂 Promise A+ 规范，不过从总体的实现上看，有如下几个点需要考虑到：
+ Promise本质是一个状态机，且状态只能为以下三种：Pending（等待态）、Fulfilled（执行态）、Rejected（拒绝态），状态的变更是单向的，只能从Pending -> Fulfilled 或 Pending -> Rejected，状态变更不可逆
+ [then需要支持链式调用](https://juejin.cn/post/6960980530242256926)


## 33、偏函数
什么是偏函数？偏函数就是将一个 n 参的函数转换成固定 x 参的函数，剩余参数（n - x）将在下次调用全部传入(就和bind的使用方式一样，使用闭包实现)。
```js
function partial(fn, ...args) {
  return (...arg) => {
    return fn(...args, ...arg)
  }
}
let partialAdd = partial((a, b, c) => a + b + c, 1)
console.log(partialAdd(2, 3)) // 6
```

## 34、实现数组原型方法
参考：https://mp.weixin.qq.com/s/7KwM6fNM5MICHiIwoRDm-w
定义一个全局数组：
```js
const arr = [
  { name: '小黑', age: 24 },
  { name: '张三', age: 18 }
]
```
### forEach
```js
Array.prototype.myForEach = function(callback) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}

arr.myForEach((item, index, arr) => {
  // console.log(item, index, arr)
})
```

### map
```js
Array.prototype.myMap = function (callback) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  for (let i = 0; i < this.length; i++) {
    callback(this[i], i, this)
  }
}
arr.myMap((item, index) => {
  // console.log(item, index)
})
```

### some
```js
Array.prototype.mySome = function (callback) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) return true
    return false
  }
}
console.log(arr.mySome(item => item.age > 23))
```

### filter
```js
Array.prototype.myFilter = function (callback) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  let res = []
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      res.push(this[i])
    }
  }
  return res
}
console.log(arr.myFilter(item => item.age > 23))
```

### reduce
```js
Array.prototype.myReduce = function (callback, total) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  // 应该还需要判断参数个数
  let i = 0
  let tmp
  // 传入了初始值
  if (arguments.length > 1) {
    tmp = total
  } else {
    // 没有传入初始值，那么 total = 数组的第一项
    tmp = JSON.parse(JSON.stringify(this[0])) // 解除引用
    i = 1
  }
  while (i < this.length) {
    tmp = callback(tmp, this[i], i, this)
    i++
  }
  return tmp
}

console.log(arr.myReduce((total, item) => total += item.age, 10)) // 52
console.log(arr.myReduce((total, item) => total.age += item.age)) // 42
```

### findIndex
```js
Array.prototype.myFindIndex = function (callback) {
  if (this == null) {
    throw new TypeError('this is null or not defined')
  }
  if (typeof callback !== "function") {
    throw new TypeError(callback + ' is not a function')
  }
  for (let i = 0; i < this.length; i++) {
    if (!callback(this[i], i, this)) continue
    return i
  }
  return -1
}
console.log(arr.myFindIndex(item => item.age === 18))
```

## 35、实现Promise


## 36、实现Promise.all()


## 37、实现Promise.race()


## 38、实现Proxy


## 39、setTimeout() 实现 setInterval()


## 40、


![202302091646396.png](http://img.itchenliang.club/img/202302091646396.png)

