# vue-router面试题汇总
## 1、vue-router有几种钩子函数?执行流程如何?


## 2、vue-router的两种路由模式的区别
### hash 模式
1. `location.hash`的值实际就是 URL 中#后面的东西 它的特点在于：hash 虽然出现 URL 中，但不会被包含在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。
2. 可以为 hash 的改变添加监听事件
  ```ts
  window.addEventListener("hashchange", funcRef, false);
  ```
每一次改变 hash（window.location.hash），都会在浏览器的访问历史中增加一个记录利用 hash 的以上特点，就可以来实现前端路由“更新视图但不重新请求页面”的功能了
> 特点：兼容性好但是不美观

### history 模式
利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。这两个方法应用于浏览器的历史记录站，在当前已有的 back、forward、go 的基础之上，它们提供了对历史记录进行修改的功能。这两个方法有个共同的特点：当调用他们修改浏览器历史记录栈后，虽然当前 URL 改变了，但浏览器不会刷新页面，这就为单页应用前端路由“更新视图但不重新请求页面”提供了基础。
> 特点：虽然美观，但是刷新会出现 404 需要后端进行配置(一般是将页面配置重定向到首页路由)

**总结**：hash模式是开发中默认的模式，如果想要切换到history模式，就要进行以下配置（后端也要进行配置）：
```ts
const router = new VueRouter({
  mode: 'history',
  routes: [...]
})
```



## 3、vue嵌套路由怎么定义？


## 4、怎么定义vue-router的动态路由？怎么获取传过来的动态参数？


## 5、vue-router是什么？它有哪些组件？
vue用来写路由的一个插件。router-link、router-view


## 6、$route 和 $router 的区别
- `$route`为当前router跳转对象，里面可以获取name、path、query、params等
- `$router`为VueRouter实例，想要导航到不同URL，则使用`$router.push`方法



## 7、v3（Vue2）到 v4（Vue3）Vue Router 的变化？
- `new Router`变成`createRouter`
- 废除了mode选项配置
- 取消（*）通配符路由
- `<keep-alive>`写法变更
- 新增`useRoute`、`useRouter`


## 8、vue-router怎么重定向页面？


## 9、vue-router怎么配置404页面？


## 10、切换路由时，需要保存草稿的功能，怎么实现呢？


## 11、说说你对router-link的了解


## 12、vue-router如何响应路由参数的变化？


## 13、你有看过vue-router的源码吗？说说看


## 14、切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？


## 15、在什么场景下会用到嵌套路由？


## 16、说说active-class是哪个组件的属性？


## 17、在vue组件中怎么获取到当前的路由信息？


## 18、怎么实现路由懒加载呢？


## 19、如果让你从零开始写一个vue路由，说说你的思路


## 20、说说vue-router完整的导航解析流程是什么？


## 21、路由之间是怎么跳转的？有哪些方式？


## 22、如果vue-router使用history模式，部署时要注意什么？


## 23、route和router有什么区别？


## 24、vue-router是用来做什么的？它有哪些组件？


## 25、编程式路由导航 与 声明式路由导航
编程式路由导航 --> 即写 js 的方式，相关API：
1. `this.$router.push(path)`：相当于点击路由链接(可以返回到当前路由界面) --> 队列的方式（先进先出）
2. `this.$router.replace(path)`：用新路由替换当前路由(不可以返回到当前路由界面) --> 栈的方式（先进后出）
3. `this.$router.back()`：请求(返回)上一个记录路由
4. `this.$router.go(-1)`：请求(返回)上一个记录路由
5. `this.$router.go(1)`：请求下一个记录路由


声明式路由导航 --> 即 `<router-link>`
```html
<router-link to='xxx' tag='li'>To PageB</router-link>
```
注意：`<router-link>`会默认解析成 a 标签，可以通过 tag 属性指定它解析成什么标签。


## 27、vue-router的懒加载如何实现
把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件
```ts
const List = () => import('@/components/list.vue')

const router = new VueRouter({
  routes: [
    { path: '/list', component: List }
  ]
})
```
