# Array对象
Array 对象用于在变量中存储多个值:
```js
var cars = ["Saab", "Volvo", "BMW"];
```
第一个数组元素的索引值为 0，第二个索引值为 1，以此类推。

- **创建数组**<br>
  在JavaScript中创建数组有两种常见的方式：
  - 一种是使用`new Array()`创建数组
    ```js
    //使用new Array() 创建数组
    var arr1 = new Array();     // 空数组
    var arr2 = new Array('苹果', '橘子', '香蕉', '桃子');      //含有4个元素
    ```
  - 另一种是使用`[]`字面量来创建数组
    ```js
    //使用字面量来创建数组
    var arr1 = [];      //空数组
    var arr2 = ['苹果', '橘子', '香蕉', '桃子'];     //含有4个元素
    ```
- **如何访问数组元素**<br>
  在数组中，每个元素都有索引(或称为下标)，数组中的元素使用索引来进行访问。数组中的索引是-一个数字， 从0开始，如图所示:
  ![202303061632324.png](http://img.itchenliang.club/img/202303061632324.png)
  访问数组元素的语法为`数组名[索引]`，示例代码如下:
  ```js
  var arr=['苹果','橘子','香蕉','桃子'];
  console.log(arr[0]);       //输出结果:苹果
  console.log(arr[1]);       //输出结果:橘子
  console.log(arr[2]);       //输出结果:香蕉
  console.log(arr[3]);       //输出结果:桃子
  console.log(arr[4]);       //输出结果: undefined(数组元素不存在)
  ```


## 属性
### constructor
返回创建数组对象的原型函数。
::: tip
返回值是函数的引用，不是函数名：`function Array() { [native code] }`
:::
```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.constructor) // ƒ Array() { [native code] }
```

### length
设置或返回数组元素的个数。

**获取数组的长度**
```js
const fruits = ["Banana", "Orange", "Apple", "Mango"];
console.log(fruits.length) // 4
```
**设置数组的长度**
```js
const fruits = new Array()
fruits.length = 4
console.log(fruits) // [empty × 4]
```

### prototype
允许你向数组对象添加属性或方法。
```js
Array.prototype.myUppercase = function () {
  for (let i = 0; i < this.length; i++) {
    this[i] = this[i].toUpperCase();
  }
}
const fruits = ['apple', 'Orange', 'Banana']
fruits.myUppercase()
console.log(fruits) // ['APPLE', 'ORANGE', 'BANANA']
```


## 方法
### concat()
连接两个或更多的数组，并返回结果。

### copyWithin()<c-tag text="es6"></c-tag>
从数组的指定位置拷贝元素到数组的另一个指定位置中。

### entries()<c-tag text="es6"></c-tag>
返回数组的可迭代对象。

### every()
检测数值元素的每个元素是否都符合条件。

### fill()<c-tag text="es6"></c-tag>
使用一个固定值来填充数组。

### filter()
检测数值元素，并返回符合条件所有元素的数组。

### find()<c-tag text="es6"></c-tag>
返回符合传入测试（函数）条件的数组元素。

### findLast()<c-tag text="es6"></c-tag>

### findIndex()<c-tag text="es6"></c-tag>
返回符合传入测试（函数）条件的数组元素索引。

### findLastIndex()<c-tag text="es6"></c-tag>


### forEach()
数组每个元素都执行一次回调函数。

### from()<c-tag text="es6"></c-tag>
通过给定的对象中创建一个数组。

### of()<c-tag text="es6"></c-tag>
用于将一组值，转换为数组。

### includes()<c-tag text="es6"></c-tag>
判断一个数组是否包含一个指定的值。

### indexOf()
搜索数组中的元素，并返回它所在的位置。

### isArray()
判断对象是否为数组。

### join()
把数组的所有元素放入一个字符串。

### keys()<c-tag text="es6"></c-tag>
返回数组的可迭代对象，包含原始数组的键(key)。

### values()<c-tag text="es6"></c-tag>

### lastIndexOf()
搜索数组中的元素，并返回它最后出现的位置。

### flat()<c-tag text="es6"></c-tag>

### flatMap()<c-tag text="es6"></c-tag>

### at()<c-tag text="es6"></c-tag>

### map()
通过指定函数处理数组的每个元素，并返回处理后的数组。

### pop()
删除数组的最后一个元素并返回删除的元素。

### push()
向数组的末尾添加一个或更多元素，并返回新的长度。

### reduce()
将数组元素计算为一个值（从左到右）。

### reduceRight()
将数组元素计算为一个值（从右到左）。

### reverse()
反转数组的元素顺序。

### shift()
删除并返回数组的第一个元素。

### slice()
选取数组的一部分，并返回一个新数组。

### some()
检测数组元素中是否有元素符合指定条件。

### sort()
对数组的元素进行排序。

### splice()
从数组中添加或删除元素。

### toString()
把数组转换为字符串，并返回结果。

### unshift()
向数组的开头添加一个或更多元素，并返回新的长度。

### valueOf()
返回数组对象的原始值。

### toReversed()<c-tag text="es6"></c-tag>

### toSorted()<c-tag text="es6"></c-tag>

### toSpliced()<c-tag text="es6"></c-tag>

### with()<c-tag text="es6"></c-tag>