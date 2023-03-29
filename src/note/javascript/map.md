# Map-WeakMap
## 1. Map
ES6提供了新的数据结构`Map`，它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。
> 也就是说，`Object`结构提供了“字符串—值”的对应，`Map`结构提供了“值—值”的对应，是一种更完善的`Hash`结构实现。

### 1.1. 构造函数
`Map`本身是一个构造函数，用来生成`Map`数据结构。
> `Map`接受一个数组作为参数(具有`Iterator`接口、且每个成员都是一个双元素的数组的数据结构都可以当作`Map`构造函数的参数)
```js
const items = [
  ['name', '张三'],
  ['title', 'Author']
]
const map = new Map()
map.get('name') // "张三"
map.get('title') // "Author"
```
实际上，上面的代码写法等同于下面的算法
```js
const items = [
  ['name', '张三'],
  ['title', 'Author']
];
const map = new Map();
items.forEach(([key, value]) => map.set(key, value));
```
由于只要具有`Iterator`接口且每个成员都是一个双元素的数据结构都可以作为`Map`的参数，所以`Set`和`Map`都可以用来生成新的`Map`
```js
const set = new Set([
  ['foo', 1],
  ['bar', 2]
]);
const m1 = new Map(set);
m1.get('foo') // 1

const m2 = new Map([['baz', 3]]);
const m3 = new Map(m2);
m3.get('baz') // 3
```

### 1.2. 属性
#### constructor
`Map.prototype.constructor`，构造函数，默认就是`Map`函数。

#### size
`Map.prototype.size`，返回`Map`实例的成员总数。
```js
onst map = new Map();
map.set('foo', true);
map.set('bar', false);
map.size // 2
```

### 1.3. 方法
`Map`实例的方法分为两类: `操作方法`和`遍历方法`
#### 操作方法
##### set()
`Map.prototype.set(key, value)`，添加键名为`key`，对应的值为`value`的成员，返回`Map`结构本身。
> 如果`key`已经有值，则键值会被更新(即重复添加会被覆盖)，否则就新生成该键。
```js
const m = new Map();
m.set('edition', 6)        // 键是字符串
m.set(262, 'standard')     // 键是数值
m.set(undefined, 'nah')    // 键是 undefined
```
由于`set`方法返回的是`Map`结构本身，所以我们可以通过链式调用。
```js
let map = new Map()
map.set(1, 'a').set(2, 'b').set(3, 'c');
```

##### get()
`Map.prototype.get(key)`，读取`key`对应的键值，如果找不到`key`，返回`undefined`。
```js
const m = new Map();
m.set('name', '张三')
m.get('name') // 张三
m.get('age') // undefined
```

##### has()
`Map.prototype.has(key)`，返回一个布尔值，表示某个键是否在当前`Map`对象之中。
```js
const m = new Map();
m.set('edition', 6);

m.has('edition') // true
m.has(262) // false
```

##### delete()
`Map.prototype.delete(key)`，删除某个值，返回一个布尔值，表示删除是否成功。
```js
const m = new Map();
m.set(undefined, 'nah');
m.has(undefined) // true

m.delete(undefined)
m.has(undefined) // false
```

##### clear()
`Map.prototype.clear()`，清除所有成员，没有返回值。
```js
const map = new Map();
map.set('foo', true);
map.set('bar', false);

map.size // 2
map.clear()
map.size // 0
```

#### 遍历方法
注意: `Map`的遍历顺序就是插入顺序。

##### keys()
`Map.prototype.keys()`，返回键名的遍历器。
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let key of map.keys()) {
  console.log(key);
}
// "F"
// "T"
```

##### values()
`Map.prototype.values()`，返回键值的遍历器。
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);

for (let value of map.values()) {
  console.log(value);
}
// "no"
// "yes"
```

##### entries()
`Map.prototype.entries()`，返回所有成员的遍历器。
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
for (let item of map.entries()) {
  console.log(item[0], item[1]);
}
// "F" "no"
// "T" "yes"

// 或者
for (let [key, value] of map.entries()) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"

// 等同于使用map.entries()
for (let [key, value] of map) {
  console.log(key, value);
}
// "F" "no"
// "T" "yes"
```

##### forEach()
`Map.prototype.forEach()`，与数组的`forEach`方法类似，也可以实现遍历。
```js
const map = new Map([
  ['F', 'no'],
  ['T',  'yes'],
]);
map.forEach((value, key, map) => {
  console.log(value, key, value);
});
```
`forEach`方法还可以接受第二个参数，用来绑定`this`。
```js
const reporter = {
  report: function(key, value) {
    console.log("Key: %s, Value: %s", key, value);
  }
};
map.forEach(function(value, key, map) {
  this.report(key, value);
}, reporter);
```

#### 1.4. 应用
##### 扩展运算符
`Map`结构转为数组结构，比较快速的方法是使用扩展运算符(`...`)。
```js
const map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

[...map.keys()] // [1, 2, 3]

[...map.values()] // ['one', 'two', 'three']

[...map.entries()] // [[1,'one'], [2, 'two'], [3, 'three']]

[...map] // [[1,'one'], [2, 'two'], [3, 'three']]
```
##### map和filter
结合数组的`map`方法、`filter`方法，可以实现`Map`的遍历和过滤（`Map`本身没有`map`和`filter`方法）。
```js
const map0 = new Map()
  .set(1, 'a')
  .set(2, 'b')
  .set(3, 'c');

const map1 = new Map(
  [...map0].filter(([k, v]) => k < 3)
);
// 产生 Map 结构 {1 => 'a', 2 => 'b'}

const map2 = new Map(
  [...map0].map(([k, v]) => [k * 2, '_' + v])
);
// 产生 Map 结构 {2 => '_a', 4 => '_b', 6 => '_c'}
```


## 2. WeakMap
`WeakMap`结构与`Map`结构类似，也是用于生成键值对的集合。区别在于:
1. `WeakMap`只接受对象作为键名（`null`除外），不接受其他类型的值作为键名。
  ```js
  const map = new WeakMap();
  map.set(1, 2)
  // TypeError: 1 is not an object!
  map.set(Symbol(), 2)
  // TypeError: Invalid value used as weak map key
  map.set(null, 2)
  // TypeError: Invalid value used as weak map key
  ```
2. `WeakMap`的键名所指向的对象，不计入垃圾回收机制
  > `WeakMap`的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用。请看下面的例子。
  ```js
  const e1 = document.getElementById('foo');
  const e2 = document.getElementById('bar');
  const arr = [
    [e1, 'foo 元素'],
    [e2, 'bar 元素'],
  ];
  ```
  上面代码中，e1和e2是两个对象，我们通过arr数组对这两个对象添加一些文字说明。这就形成了arr对e1和e2的引用。一旦不再需要这两个对象，我们就必须手动删除这个引用，否则垃圾回收机制就不会释放e1和e2占用的内存。
  ```js
  // 不需要 e1 和 e2 的时候
  // 必须手动删除引用
  arr [0] = null;
  arr [1] = null;
  ```
  `WeakMap`就是为了解决这个问题而诞生的，它的键名所引用的对象都是弱引用，即垃圾回收机制不将该引用考虑在内。
  > **注意**: `WeakMap`弱引用的只是键名，而不是键值。键值依然是正常引用。

### 2.1. 构造函数
`WeakMap`是一个构造函数，可以使用`new`命令，创建`WeakMap`数据结构。
```js
const wm = new WeakMap();
let key = {};
let obj = {foo: 1};

wm.set(key, obj);
obj = null;
wm.get(key)
// Object {foo: 1}
```

### 2.2. 属性
#### constructor
`WeakMap.prototype.constructor`，构造函数，默认就是`WeakMap`函数。
::: warning 注意
`WeakMap`没有`size`属性，没有办法遍历它的成员。同时也没有`forEach`和`clear`方法。
:::

### 2.3. 方法
####  set()
`WeakMap.prototype.set(key, value)`，添加键名为`key`，对应的值为`value`的成员，返回`WeakMap`结构本身。
```js
const wm = new WeakMap()
let key = {};
let obj = {foo: 1};
wm.set(key, obj);
```
由于`set`方法返回的是`WeakMap`结构本身，所以我们可以通过链式调用。
```js
const wm = new WeakMap()
let key = {};
let key2 = {};
let obj = {foo: 1};
wm.set(key, obj).set(key1, obj);
```

#### get()
`WeakMap.prototype.get(key)`，读取`key`对应的键值，如果找不到`key`，返回`undefined`。
```js
const wm = new WeakMap()
let key = {};
let obj = {foo: 1};
wm.set(key, obj);

wm.get(key) // { foo: 1 }
```

#### has()
`WeakMap.prototype.has(key)`，返回一个布尔值，表示某个键是否在当前`WeakMap`对象之中。
```js
const wm = new WeakMap()
let key = {};
let obj = {foo: 1};
wm.set(key, obj);

wm.has(key)
```

#### delete()
`WeakMap.prototype.delete(key)`，删除某个值，返回一个布尔值，表示删除是否成功。
```js
const wm = new WeakMap()
let key = {};
let obj = {foo: 1};
wm.set(key, obj);

wm.delete(key)
```

### 2.4 应用
`WeakMap`应用的典型场合就是 DOM 节点作为键名。
```js
let myWeakmap = new WeakMap();

myWeakmap.set(
  document.getElementById('logo'),
  {timesClicked: 0})
;

document.getElementById('logo').addEventListener('click', function() {
  let logoData = myWeakmap.get(document.getElementById('logo'));
  logoData.timesClicked++;
}, false);
```
上面代码中，`document.getElementById('logo')`是一个 DOM 节点，每当发生`click`事件，就更新一下状态。我们将这个状态作为键值放在`WeakMap`里，对应的键名就是这个节点对象。一旦这个 DOM 节点删除，该状态就会自动消失，不存在内存泄漏风险。

`WeakMap`的另一个用处是部署私有属性。
```js
const _counter = new WeakMap();
const _action = new WeakMap();

class Countdown {
  constructor(counter, action) {
    _counter.set(this, counter);
    _action.set(this, action);
  }
  dec() {
    let counter = _counter.get(this);
    if (counter < 1) return;
    counter--;
    _counter.set(this, counter);
    if (counter === 0) {
      _action.get(this)();
    }
  }
}

const c = new Countdown(2, () => console.log('DONE'));

c.dec()
c.dec()
// DONE
```
上面代码中，`Countdown`类的两个内部属性`_counter`和`_action`，是实例的弱引用，所以如果删除实例，它们也就随之消失，不会造成内存泄漏。


## 3. WeakRef
`WeakSet`和`WeakMap`是基于弱引用的数据结构，ES2021 更进一步，提供了`WeakRef`对象，用于直接创建对象的弱引用。
```js
let target = {};
let wr = new WeakRef(target);
```
面示例中，target是原始对象，构造函数`WeakRef()`创建了一个基于`target`的新对象`wr`。这里，`wr`就是一个`WeakRef`的实例，属于对`target`的弱引用，垃圾回收机制不会计入这个引用，也就是说，`wr`的引用不会妨碍原始对象`target`被垃圾回收机制清除。

`WeakRef`实例对象有一个`deref()`方法，如果原始对象存在，该方法返回原始对象；如果原始对象已经被垃圾回收机制清除，该方法返回`undefined`。
```js
let target = {};
let wr = new WeakRef(target);

let obj = wr.deref();
if (obj) { // target 未被垃圾回收机制清除
  // ...
}
```
上面示例中，`deref()`方法可以判断原始对象是否已被清除。

弱引用对象的一大用处，就是作为缓存，未被清除时可以从缓存取值，一旦清除缓存就自动失效。
```js
function makeWeakCached(f) {
  const cache = new Map();
  return key => {
    const ref = cache.get(key);
    if (ref) {
      const cached = ref.deref();
      if (cached !== undefined) return cached;
    }

    const fresh = f(key);
    cache.set(key, new WeakRef(fresh));
    return fresh;
  };
}

const getImageCached = makeWeakCached(getImage);
```
上面示例中，`makeWeakCached()`用于建立一个缓存，缓存里面保存对原始文件的弱引用。
> 注意: 一旦使用`WeakRef()`创建了原始对象的弱引用，那么在本轮事件循环（event loop），原始对象肯定不会被清除，只会在后面的事件循环才会被清除。