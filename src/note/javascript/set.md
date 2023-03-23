# Set-WeakSet
## 1. Set
ES6提供了新的数据结构`Set`，它类似于数组，但是成员的值都是唯一的，没有重复的值。

### 1.1. 构造函数
`Set`本身是一个构造函数，用来生成`Set`数据结构。
> `Set`函数接收一个数组作为参数(具有iterable接口的数据都可以当做参数)，用来初始化。
```js
// 例子1
const set = new Set([1, 2, 3, 1])
// 例子2
const set = new Set(document.querySelectAll('div'))
// 例子3
const set = new Set('abcac')
```


### 1.2. 属性
#### constructor
`Set.prototype.constructor`，构造函数，默认就是`Set`函数。

#### size
`Set.prototype.size`，返回`Set`实例的成员总数。
```js
const set = new Set([1, 2, 3, 2])
set.size // 3
```

### 1.3. 方法
`Set`实例的方法分为两类: `操作方法`和`遍历方法`

#### 操作方法
用于操作数据。

##### add()
`Set.prototype.add(value)`，添加某个值，返回`Set`结构本身。
> 如果重复添加某个值，最终结果只会添加一次。
```js
const set = new Set()
set.add(1)
set.add(2)
set.add(1)
set // { 1, 2 }
```
由于`add`方法返回的是`Set`结构本身，所以我们可以通过链式调用。
```js
const set = new Set()
set.add(1).add(2)
```
重复添加某个值，只会成功添加一次
```js
const set = new Set()
set.add(1)
set.add(1)
set.add(NaN)
set.add(NaN)
set // Set(2) {1, NaN}
```
在`Set`内部，两个`NaN`是相等的。

##### delete()
`Set.prototype.delete(value)`，删除某个值，返回一个布尔值，表示删除是否成功。
```js
const set = new Set([1, 2, 3])
console.log(set.delete(2)) // true
```

##### has()
`Set.prototype.has(value)`，返回一个布尔值，表示该值是否为`Set`的成员。
```js
const set = new Set([1, 2, 3])
console.log(set.has(1)) // true
console.log(set.has(4)) // false
```

##### clear()
`Set.prototype.clear()`，清除所有成员，没有返回值。
```js
const set = new Set([1, 2, 3])
console.log(set.size) // 3
set.clear()
console.log(set.size) // 0
```

#### 遍历方法
用于遍历成员。

##### keys()
`Set.prototype.keys()`，返回键名的遍历器。
> 由于`Set`结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。
```js
const set = new Set(['red', 'yellow', 'blue'])
const keys = set.keys()
console.log(keys) // SetIterator {'red', 'yellow', 'blue'}

for (let key of keys) {
  console.log(key)
}
// red
// yellow
// blue
```

##### values()
`Set.prototype.values()`，返回键值的遍历器。
> 由于`Set`结构没有键名，只有键值（或者说键名和键值是同一个值），所以`keys`方法和`values`方法的行为完全一致。
```js
const set = new Set(['red', 'yellow', 'blue'])
const values = set.values()
console.log(values) // SetIterator {'red', 'yellow', 'blue'}

for (let value of values) {
  console.log(value)
}
// red
// yellow
// blue
```

##### entries()
`Set.prototype.entries()`，返回键值对的遍历器。
```js
const set = new Set(['red', 'yellow', 'blue'])
const entries = set.entries()
console.log(entries) // SetIterator {'red' => 'red', 'yellow' => 'yellow', 'blue' => 'blue'}

for (let item of entries) {
  console.log(item)
}
// ['red', 'red']
// ['yellow', 'yellow']
// ['blue', 'blue']
```

##### forEach()
`Set.prototype.forEach()`，使用回调函数遍历每个成员。
> `Set`结构的实例与数组一样，也拥有`forEach`方法，用于对每个成员执行某种操作，没有返回值。
```js
let set = new Set([1, 4, 9]);
set.forEach((value, key, arr) => {
  console.log(key + ' : ' + value, arr)
})
// 1 : 1 Set(3) {1, 4, 9}
// 4 : 4 Set(3) {1, 4, 9}
// 9 : 9 Set(3) {1, 4, 9}
```

#### 遍历的应用
##### Array.from()
`Array.from`方法可以将`Set`结构转为数组。
```js
const items = new Set([1, 2, 3, 4, 5]);
const array = Array.from(items);
```
这就提供了去除数组重复成员的另一种方法。
```js
function dedupe(array) {
  return Array.from(new Set(array));
}

dedupe([1, 1, 2, 3]) // [1, 2, 3]
```

##### 扩展运算符
扩展运算符(`...`)内部是使用`for...of`循环，所以也可以用于`Set`结构。
```js
let set = new Set(['red', 'green', 'blue'])
[...set] // ['red', 'green', 'blue']
```
扩展运算符和`Set`结构相结合，就可以去除数组的重复成员。

##### map和filter
```js
let arr = [3, 5, 2, 2, 5, 5]
[...new Set(arr)] // [3, 5, 2]
```
数组的`map`和`filter`方法也可以间接用于`Set`了。
```js
let set = new Set([1, 2, 3])
set = new Set([...set].map(x => x * 2)) // 返回Set结构：{2, 4, 6}

let set = new Set([1, 2, 3, 4, 5])
set = new Set([...set].filter(x => (x % 2) == 0)) // 返回Set结构：{2, 4}
```
使用`Set`可以很容易地实现并集(Union)、交集(Intersect)和差集(Difference)。
```js
let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);

// 并集
let union = new Set([...a, ...b]) // Set {1, 2, 3, 4}

// 交集
let intersect = new Set([...a].filter(x => b.has(x))) // set {2, 3}

// （a 相对于 b 的）差集
let difference = new Set([...a].filter(x => !b.has(x))) // Set {1}
```

##### 改变原来的Set结构
目前没有直接的方法可以修改原来的`Set`结构，但是可以使用以下两种变通方法。
- 利用原`Set`结构映射出一个新的结构，然后赋值给原来的`Set`结构
  ```js
  // 方法一
  let set = new Set([1, 2, 3])
  set = new Set([...set].map(val => val * 2)) // set的值是2, 4, 6
  ```
- 利用`Array.from`方法
  ```js
  // 方法二
  let set = new Set([1, 2, 3])
  set = new Set(Array.from(set, val => val * 2)) // set的值是2, 4, 6
  ```

## 2. WeakSet
`WeakSet`结构与`Set`类似，也是不重复的值的集合。区别在于: 
- 1、`WeakSet`的成员只能是对象，而不能是其他类型的值
  ```js
  const ws = new WeakSet();
  ws.add(1)
  // TypeError: Invalid value used in weak set
  ws.add(Symbol())
  // TypeError: invalid value used in weak set
  ```
- 2、`WeakSet`中的对象都是弱引用，即垃圾回收机制不考虑`WeakSet`对该对象的引用
  > 也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于`WeakSet`之中。
  - 注意: 由于`WeakSet`内部有多少个成员，取决于垃圾回收机制有没有运行，运行前后很可能成员个数是不一样的，而垃圾回收机制何时运行是不可预测的，因此 ES6规定`WeakSet`不可遍历。

### 2.1. 构造函数
`WeakSet`是一个构造函数，可以使用`new`命令，创建`WeakSet`数据结构。
> `WeakSet`函数接受一个数组或类似数组的对象作为参数(任何具有`Iterable`接口的对象，都可以作为`WeakSet`的参数)。该数组的所有成员，都会自动成为 `WeakSet`实例对象的成员。
```js
const ws = new WeakSet();

const a = [[1, 2], [3, 4]];
const ws = new WeakSet(a); // WeakSet {[1, 2], [3, 4]}
```

### 2.2. 属性
#### constructor
`WeakSet.prototype.constructor`，构造函数，默认就是`WeakSet`函数。
::: warning 注意
`WeakSet`没有`size`属性，没有办法遍历它的成员。
:::

### 2.3. 方法
#### add()
`WeakSet.prototype.add(value)`，向`WeakSet`实例添加一个新成员，返回`WeakSet`结构本身。
```js
const ws = new WeakSet();
const obj = {};
ws.add(window);
ws.add(obj);
```
由于`add`方法返回的是`Set`结构本身，所以我们可以通过链式调用。
```js
const ws = new WeakSet();
const obj = {};
const foo = {};
ws.add(obj).add(foo)
```

#### delete()
`WeakSet.prototype.delete(value)`，清除`WeakSet`实例的指定成员，清除成功返回`true`，如果在`WeakSet`中找不到该成员或该成员不是对象，返回`false`。
```js
const ws = new WeakSet();
const obj = {};
const foo = {};
ws.add(obj).add(foo)
console.log(ws.delete(obj)) // true
console.log(ws.delete(window)) // false
```

#### has()
`WeakSet.prototype.has(value)`，返回一个布尔值，表示某个值是否在`WeakSet`实例之中。
```js
const ws = new WeakSet();
const obj = {};
const foo = {};
ws.add(obj).add(foo)
console.log(ws.has(obj)) // true
console.log(ws.has(window)) // false
```

### 2.4. 应用
`WeakSet`不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了。
> `WeakSet`的一个用处，是储存`DOM`节点，而不用担心这些节点从文档移除时，会引发内存泄漏。