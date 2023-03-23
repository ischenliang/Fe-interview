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