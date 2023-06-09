# vue-router面试题汇总
## 1、vue-router有几种钩子函数?执行流程如何?
vue-router有7种钩子函数，分别是：
1. `beforeEach`：在路由跳转之前执行，可以用来做登录验证等操作。
2. `beforeResolve`：在路由跳转之前执行，解析异步路由组件之后。
3. `afterEach`：在路由跳转之后执行，常用来做页面跟踪等操作。
4. `beforeEnter`：在进入某个路由前执行，和beforeEach类似，但只作用于某个具体的路由。
5. `beforeRouteUpdate`：在当前路由改变，但是该组件被复用时调用。
6. `beforeRouteLeave`：在离开当前路由前执行，可以用来做离开提示等操作。
7. `scrollBehavior`：在切换路由时控制滚动行为。

执行流程如下：
1. 导航触发路由改变；
2. 执行全局 beforeEach 钩子函数；
3. 执行路由独享的 beforeEnter 钩子函数；
4. 解析异步路由组件；
5. 执行全局 beforeResolve 钩子函数；
6. 执行路由组件 beforeRouteEnter 钩子函数；
7. 执行异步路由组件加载完成的回调函数；
8. 执行全局 afterEach 钩子函数；
9. 触发 DOM 更新；
10. 执行路由组件 beforeRouteUpdate 钩子函数；
11. 执行导航被确认的全局 afterEach 钩子函数；
12. 控制滚动行为，执行 scrollBehavior 钩子函数；
13. 最终更新 DOM，显示完整的页面。


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
在 Vue 中定义嵌套路由，需要在父级路由的组件中使用`<router-view>`标签来渲染子路由组件，并在父级路由的`routes`配置项中定义子路由的路径和组件。示例如下:
```js
const router = new VueRouter({
  routes: [
    {
      path: '/parent',
      component: ParentComponent,
      children: [
        {
          path: 'child',
          component: ChildComponent
        }
      ]
    }
  ]
})
```


## 4、怎么定义vue-router的动态路由？怎么获取传过来的动态参数？
在 Vue Router 中，可以通过动态路由来创建一个路径参数，并将其传递给组件。定义动态路由的方式是在路由路径中使用冒号 : 来指定参数名，例如：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/user/:id',
      component: UserComponent
    }
  ]
})
```
当访问`/user/123`时，`:id`将会被解析为`123`，并传递给`UserComponent`组件。

在组件中获取动态路由参数的方式是通过`$route.params`对象来访问。例如，在`UserComponent`组件中，可以使用以下代码来获取 id 参数：
```js
export default {
  mounted() {
    const userId = this.$route.params.id;
    // do something with userId
  }
}
```


## 5、vue-router是什么？它有哪些组件？
vue用来写路由的一个插件。router-link、router-view


## 6、$route 和 $router 的区别
- `$router`为VueRouter的实例，是一个全局路由对象，包含了路由跳转的方法`$router.push`、钩子函数等。
- `$route`是路由信息对象||跳转的路由对象，每一个路由都会有一个route对象，是一个局部对象，包含path,params,hash,query,fullPath,matched,name等路由信息参数。



## 7、v3（Vue2）到 v4（Vue3）Vue Router 的变化？
- `new Router`变成`createRouter`
- 废除了mode选项配置
- 取消（*）通配符路由
- `<keep-alive>`写法变更
- 新增`useRoute`、`useRouter`


## 8、vue-router怎么重定向页面？
在路由配置时添加`redirect`属性
```js
{
  path: '/',
  name: 'Root',
  redirect: '/home'
},
```


## 9、vue-router怎么配置404页面？
vue-router3中使用`*`通配符
```js
{ path: '*', component: () => import('@/notFound')}
```
vue-router4中则是使用
```js
{
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/NotFound.vue'),
}
```


## 10、切换路由时，需要保存草稿的功能，怎么实现呢？
`beforeRouteLeave`写逻辑
```js
beforeRouteLeave (to, from, next) {
  const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
  if (answer) {
    next()
  } else {
    next(false)
  }
}
```


## 11、说说你对router-link的了解
`router-link`是 Vue Router 提供的一个组件，用于生成带有路由功能的锚点链接。它可以根据指定的路由名称或路径自动生成相应的链接地址，并且会自动添加激活状态的 CSS 类名。

`router-link`的使用非常简单，只需要将要跳转的路由信息传递给 to 属性即可。例如：
```html
<router-link to="/home">Home</router-link>
```
除了基本的路由跳转功能之外，`router-link`还支持以下几个重要的属性：
除了基本的路由跳转功能之外，router-link 还支持以下几个重要的属性：
- to: 用于指定要跳转的路由路径或名称。
- replace: 用于控制是否使用替换模式进行路由跳转，默认为 false。
- append: 用于控制是否在当前路径后追加新的路由路径，默认为 false。
- tag: 用于指定渲染成哪种 HTML 标签，默认为 a。
- active-class: 用于指定激活状态的 CSS 类名，默认为 "router-link-active"。
- exact: 用于控制是否进行精确匹配，默认为 false。


## 12、vue-router如何响应路由参数的变化？


## 13、你有看过vue-router的源码吗？说说看


## 14、切换到新路由时，页面要滚动到顶部或保持原先的滚动位置怎么做呢？
可以通过以下两种方式来实现：
1. 使用`scrollBehavior`方法
  ```js
  const router = new VueRouter({
    scrollBehavior(to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
  })
  ```
2. 在组件中使用`$nextTick`方法
  ```js
  export default {
    mounted() {
      this.$nextTick(() => {
        const scrollTop = sessionStorage.getItem('scrollTop')
        if (scrollTop) {
          window.scrollTo(0, scrollTop)
          sessionStorage.removeItem('scrollTop')
        }
      })
    },
    beforeRouteLeave(to, from, next) {
      sessionStorage.setItem('scrollTop', window.scrollY)
      next()
    }
  }
  ```


## 15、在什么场景下会用到嵌套路由？


## 16、说说active-class是哪个组件的属性？


## 17、在vue组件中怎么获取到当前的路由信息？


## 18、怎么实现路由懒加载呢？
Vue Router 提供了一种简单的方式来实现路由懒加载，即使用动态`import()`函数来加载组件代码。


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


## 28、能说下 vue-router 中常用的 hash 和 history 路由模式实现原理吗？
### hash 模式的实现原理
早期的前端路由的实现就是基于`location.hash`来实现的。其实现原理很简单，`location.hash`的值就是`URL`中`#`后面的内容。比如下面这个网站，它的`location.hash`的值为`#search`：
```
https://www.word.com#search
```
hash 路由模式的实现主要是基于下面几个特性：
+ URL 中 hash 值只是客户端的一种状态，也就是说当向服务器端发出请求时，hash 部分不会被发送；
+ hash 值的改变，都会在浏览器的访问历史中增加一个记录。因此我们能通过浏览器的回退、前进按钮控制hash 的切换；
+ 可以通过 a 标签，并设置 href 属性，当用户点击这个标签后，URL 的 hash 值会发生改变；或者使用 JavaScript 来对 loaction.hash 进行赋值，改变 URL 的 hash 值；
+ 我们可以使用 hashchange 事件来监听 hash 值的变化，从而对页面进行跳转（渲染）;

### history 模式的实现原理
HTML5 提供了 History API 来实现 URL 的变化。其中做最主要的 API 有以下两个：`history.pushState()`和`history.repalceState()`。这两个API可以在不进行刷新的情况下，操作浏览器的历史纪录。唯一不同的是，前者是新增一个历史记录，后者是直接替换当前的历史记录，如下所示：
```js
window.history.pushState(null, null, path);
window.history.replaceState(null, null, path);
```
history 路由模式的实现主要基于存在下面几个特性：
+ `pushState`和`repalceState`两个API来操作实现URL的变化 ；
+ 我们可以使用 popstate 事件来监听url的变化，从而对页面进行跳转（渲染）；
+ `history.pushState()`或`history.replaceState()`不会触发`popstate`事件，这时我们需要手动触发页面跳转（渲染）;


## 29、vue-router 路由模式有几种？
vue-router有3种路由模式：`hash`、`history`、`abstract`，对应的源码如下所示：
```js
switch (mode) {
  case 'history':
 this.history = new HTML5History(this, options.base)
 break
  case 'hash':
 this.history = new HashHistory(this, options.base, this.fallback)
 break
  case 'abstract':
 this.history = new AbstractHistory(this, options.base)
 break
  default:
 if (process.env.NODE_ENV !== 'production') {
   assert(false, `invalid mode: ${mode}`)
 }
}
```
其中，3 种路由模式的说明如下：
+ **hash**: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器；
+ **history**: 依赖 HTML5 History API 和服务器配置。具体可以查看 HTML5 History 模式；
+ **abstract**: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式;