# History API
允许操作浏览器的曾经在标签页或者框架里访问的会话历史记录。

## 属性
### length
`History.length`是一个只读属性，返回当前`session`中的`history`个数，包含当前页面在内。
```js
var result = window.history.length; // 返回当前 session 中的 history 个数
```

### scrollRestoration
允许 web 应用程序在历史导航上显式地设置默认滚动恢复行为
```js
// 语法
const scrollRestore = history.scrollRestoration
```
- auto: 将恢复用户已滚动到的页面上的位置。
- manual: 未还原页上的位置。用户必须手动滚动到该位置。

```js
// 例子一：查看当前页面滚动恢复行为
const scrollRestoration = history.scrollRestoration
if (scrollRestoration === 'manual') {
  console.log('页面上的位置未恢复，用户需要手动滚动。');
}

// 例子二：防止自动恢复页面位置
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
}
```

### state
返回在`history`栈顶的`任意`值的拷贝。通过这种方式可以查看`state`值，不必等待`popstate`事件发生后再查看。
```js
// 语法
let currentState = history.state;
```

## 方法
### back()
`back()`方法会在会话历史记录中向后移动一页。如果没有上一页，则此方法调用不执行任何操作。
```js
// 语法
window.history.back()
```
示例
```html
<button id="go-back">Go back!</button>
<script>
  window.onload = function(e) {
    document.getElementById('go-back').addEventListener('click', e => {
      window.history.back();
    })
  }
</script>
```

### forward()
在会话历史中向前移动一页。它与使用`delta`参数为`1`时调用`history.go(delta)`的效果相同。
```js
// 语法
window.history.forward();
```
示例
```html
<button id='go-forward'>Go Forward!</button>
<script>
  window.onload = function(e) {
    document.getElementById('go-forward').addEventListener('click', e => {
      window.history.forward();
    })
  }
</script>
```

### go()
`go()`方法从会话历史记录中加载特定页面。你可以使用它在历史记录中前后移动，具体取决于`delta`参数的值。
```js
// 语法
window.history.go(delta);
```
示例
```js
// 向后移动一页（等价于调用back()）：
window.history.go(-1)

// 向前移动一页，就像调用了forward()：
window.history.go(1)

// 向前移动两页
window.history.go(2);

// 向后移动两页
window.history.go(-2);

// 以下任意一条语句都会重新加载当前页面
window.history.go();
window.history.go(0);
```

### pushState()
`history.pushState()`方法向当前浏览器会话的历史堆栈中添加一个状态（state）。
```js
// 语法
history.pushState(state, title[, url])
```
示例
```js
const state = { 'page_id': 1, 'user_id': 5 }
const title = ''
const url = 'hello-world.html'

history.pushState(state, title, url)
```

### replaceState()
`replaceState()`方法使用`state objects`, `title`,和`URL`作为参数，修改当前历史记录实体，如果你想更新当前的`state`对象或者当前历史实体的 URL 来响应用户的的动作的话这个方法将会非常有用。
```js
// 语法
history.replaceState(stateObj, title[, url]);
```
示例
```js
var stateObj = { foo: "bar" };
history.pushState(stateObj, "", "bar.html");
```


## 事件
如果当前处于激活状态的历史记录条目是由`history.pushState()`方法创建的或者是由`history.replaceState()`方法修改的，则`popstate`事件的 `state`属性包含了这个历史记录条目的`state`对象的一个拷贝。
```js
// 语法
window.onpopstate = funcRef;
```
示例: 假如当前网页地址为 http://example.com/example.html，则运行下述代码将触发警告对话框：
```js
window.onpopstate = function(event) {
  alert("location: " + document.location + ", state: " + JSON.stringify(event.state));
};

history.pushState({page: 1}, "title 1", "?page=1");
history.pushState({page: 2}, "title 2", "?page=2");
history.replaceState({page: 3}, "title 3", "?page=3");
history.back(); // 弹出 "location: http://example.com/example.html?page=1, state: {"page":1}"
history.back(); // 弹出 "location: http://example.com/example.html, state: null
history.go(2);  // 弹出 "location: http://example.com/example.html?page=3, state: {"page":3}
```