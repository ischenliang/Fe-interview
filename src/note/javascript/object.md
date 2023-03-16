::: tip
这是一个提示
:::

- https://www.runoob.com/js/js-objects.html
- https://es6.ruanyifeng.com/#docs/object#%E5%B1%9E%E6%80%A7%E7%9A%84%E7%AE%80%E6%B4%81%E8%A1%A8%E7%A4%BA%E6%B3%95
- https://zhuanlan.zhihu.com/p/556955018

参考: [https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object]

# Object
是JavaScript的一种**数据类型**。它用于存储各种键值集合和更复杂的实体。`Objects`可以通过`Object()`构造函数或者使用`对象字面量`的方式创建。

## 构造函数

## 属性

## 方法
### Object.defineProperty()
该方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象。
> 备注： 应当直接在`Object`构造器对象上调用此方法，而不是在任意一个`Object`类型的实例上调用。
#### 语法
```js
Object.defineProperty(obj, prop, descriptor)
```

#### 参数
- **obj**: 要定义属性的对象。
- **prop**: 要定义或修改的属性的名称或 Symbol
- **descriptor**: 要定义或修改的属性描述符。
  - **configurable**: 当且仅当该属性的`configurable`键值为`true`时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认值 `false`。
  - **enumerable**: 当且仅当该属性的`enumerable`键值为`true`时，该属性才会出现在对象的枚举属性中。默认为`false`。
  - **value**: 该属性对应的值。可以是任何有效的JavaScript值（数值，对象，函数等）。默认为`undefined`。
  - **writable**: 当且仅当该属性的`writable`键值为`true`时，属性的值，也就是上面的`value`，才能被赋值运算符 (en-US)改变。默认为`false`。
  - **get**: 属性的`getter`函数，如果没有`getter`，则为`undefined`。当访问该属性时，会调用此函数。执行时不传入任何参数，但是会传入`this`对象（由于继承关系，这里的`this`并不一定是定义该属性的对象）。该函数的返回值会被用作属性的值。默认为`undefined`。
  - **set**: 属性的`setter`函数，如果没有`setter`，则为`undefined`。当属性值被修改时，会调用此函数。该方法接受一个参数（也就是被赋予的新值），会传入赋值时的`this`对象。 默认为`undefined`。

#### 返回值
被传递给函数的对象。

#### 示例
**writable示例**
```js
var o = {}
Object.defineProperty(o, 'name', {
  writable: false,
  value: '张三'
})
console.log(o) // {name: '张三'}
o.name = '李四' // 不会报错，严格模式会报错：Uncaught TypeError: Cannot assign to read only property 'name' of object
console.log(o) // {name: '张三'}
```
**enumerable示例**
```js
var o = {};
Object.defineProperty(o, "a", { value : 1, enumerable: true });
Object.defineProperty(o, "b", { value : 2, enumerable: false });
for (let key in o) {
  console.log(key) // a
}
console.log(Object.keys(o)) // ['a']
console.log(Object.getOwnPropertyNames(o)) // ['a', 'b']
```
**Configurable示例**
```js
var obj = {};
Object.defineProperty(obj, 'name', {
  value : '张三',
  configurable: false
})
// 测试更新配置 configurable
Object.defineProperty(obj, 'name', {
  configurable:  true // Uncaught TypeError: Cannot redefine property: name
})
// 测试更新配置 enumerable
Object.defineProperty(obj, 'name', {
  enumerable: true // Uncaught TypeError: Cannot redefine property: name
})
// 测试更新配置 value
Object.defineProperty(obj, 'name', {
  value: '李四' // Uncaught TypeError: Cannot redefine property: name
})
// 测试更新配置 set
Object.defineProperty(obj, 'name', {
  set: () => { // Uncaught TypeError: Cannot redefine property: name
    
  }
})
// 测试更新配置 get
Object.defineProperty(obj, 'name', {
  get: () => { // Uncaught TypeError: Cannot redefine property: name
    return '李四'
  }
})
// 测试删除
console.log(obj.name); // 张三
delete obj.name // 正常模式不会报错，严格模式会报错Uncaught TypeError: Cannot delete property 'name' 
console.log(obj.name); // 张三
```
**getter/setter示例**
```js
var obj = {};
let val = '张三'
Object.defineProperty(obj, 'name', {
  enumerable: true,
  configurable: true,
  get () {
    console.log('name属性被读取')
    return val
  },
  set (newVal) {
    console.log('name属性被修改')
    val = newVal
  }
})
console.log(obj.name) // name属性被读取  张三
obj.name = '李四' // name属性被修改
console.log(obj.name) // name属性被读取 李四
```



### Object.defineProperties()

### Object.assign()

### Object.create()

### Object.freeze()

### Object.keys()

### Object.values()

### Object.entries()

### Object.getPrototypeOf()

### Object.setPrototypeOf()

### Object.getOwnPropertyNames()

### Object.hasOwn()

### Object.fromEntries()

### Object.preventExtensions()

### Object.seal()

### 