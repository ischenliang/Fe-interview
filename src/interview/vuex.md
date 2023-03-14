# vuex面试题汇总
## 1、vuex是什么？怎么使用？哪种功能场景使用它？
参考：https://blog.csdn.net/bb_xiaxia1998/article/details/128518681<br>
Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。可以理解成全局的公共状态。
+ **State**：定义了应用状态的数据结构，可以在这里设置默认的初始状态；
+ **Getter**：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性；
+ **Mutation**：是唯一更改 store 中状态的方法，且必须是同步函数；
+ **Action**：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作；
+ **Module**：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中；

（一）vuex 的状态存储是响应式的，当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
（二）改变 store 中的状态的唯一途径就是显式地提交 (commit)mutation。这样使得我们可以方便地跟踪每一个状态的变化。且必须是同步函数
（三）Action用于提交Mutation，并非直接改变State，他可以进行任何 异步操作，比如axios请求。
（四）getter 相当于store中的计算属性。

## 2、vuex 有哪几种属性？
参考上面第一题。


## 3、不用 Vuex 会带来什么问题？
与数据存储不同，Vuex 解决的主要问题是不同组件间的通信，以达到对当前页面数据状态的管理。既然是状态，它不会是持久化的，在页面刷新或关闭后，数据自动丢失。如果组件比较少，完全可以不用 Vuex。而且，目前有很多基于 Vuex 的插件，结合 localStorage、sessionStorage、IndexDB 等，可以达到数据持久化的目的。


## 4、vue路由实现原理? 或 vue-router原理?
说简单点，vue-router的原理就是通过对URL地址变化的监听，继而对不同的组件进行渲染。 每当URL地址改变时，就对相应的组件进行渲染。原理是很简单，实现方式可能有点复杂，主要有hash模式和history模式。 如果想了解得详细点，建议百度或者阅读源码。


## 5、你有写过vuex中store的插件吗？
Vuex 的`store`接受`plugins`选项，这个选项暴露出每次`mutation`的钩子。Vuex插件就是一个函数，它接收`store`作为唯一参数：
```js
const myPlugin = store => {
  // 当 store 初始化后调用
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
  });
};
```
然后像这样使用：
```js
const store = new Vuex.Store({
  // ...
  plugins: [myPlugin]
});
```
在插件中不允许直接修改状态——类似于组件，只能通过提交 mutation 来触发变化。
```js
const plugin = (store) => {
  socket.on('data', data => {
    store.commit('receiveData', data)
  })
  store.subscribe(mutation => {
    if (mutation.type === 'UPDATE_DATA') {
      socket.emit('update', mutation.payload)
    }
  })
}
const store = createStore({
  state,
  mutations,
  plugins: [plugin]
})
```
[官方文档](https://vuex.vuejs.org/zh/guide/plugins.html)


## 6、你有使用过vuex的module吗？主要是在什么场景下使用？
把状态全部集中在状态树上，非常难以维护。按模块分成多个`module`，状态树延伸多个分支，模块的状态内聚，主枝干放全局共享状态。


## 7、vuex中actions和mutations有什么区别？
- mutations是用于修改Vuex状态的唯一方法。它们是同步操作，意味着它们必须是纯函数，以确保状态的可预测性。这意味着mutations应该只用于同步操作。
- actions用于执行异步操作或包含异步操作的操作序列。它们可以包含任何异步代码，它不能直接修改状态，而是通过commit触发mutations来间接修改状态。


## 8、vuex使用actions时不支持多参数传递怎么办？
以载荷或对象形式.
```js
// 载荷对象
store.dispatch('increment', {
  name: '张三',
  age: 23
})

// 以对象形式分发
store.dispatch({
  type: 'incrementAsync',
  name: '张三',
  age: 23
})
```


## 9、你觉得vuex有什么缺点？
- 刷新数据会丢失，我们可以保存本地存储或者安装`vuex`的持久化插件，`vuex-persist`或`vuex-persistedstate`去实现自动本地存储。
- 用起来比较繁琐，使用模式也不统一，基本上得不到类型系统的任何支持，相比而言pinia则更友好。


## 10、vuex怎么知道state是通过mutation修改还是外部直接修改的？
Vuex 中修改`state`的唯一渠道就是执行`commit(‘xx’, payload)`方法，其底层通过执行`this._withCommit(fn)`设置`_committing`标志变量为 true，然后才能修改`state`，修改完毕还需要还原`_committing`变量。外部修改虽然能够直接修改`state`，但是并没有修改`_committing`标志位，所以只要`watch`一下`state`，`state change`时判断是否`_committing`值为`true`，即可判断修改的合法性。
```js
computed: {
  height() {
    return this.$store.state.height;
  },
  flag() {
    return this.$store.state;
  }
},
watch: {
  flag: {
    handler() {
      if (this.$store._committing) {
        console.log(this.$store._committing);
        console.log('通过commit修改');
      } else {
        console.log(this.$store._committing);
        console.log('直接修改');
      }
    },
    deep: true
    sync: true
  }
},
```


## 11、请求数据是写在组件的methods中还是在vuex的action中？
根据业务场景划分，如果该请求数据的方法是多个视图共享的话，则写在`action`中，如果是当前视图所用，则写在组件的`methods`中。


## 12、使用vuex的优势是什么？
1. 能够在vuex中,集中管理共享的数据,易于开发和后期维护
2. 能够高效地实现组件之间的数据共享,提高开发效率
3. 存放在vuex中的数据都是响应式的,能够实时保持数据与页面的同步


## 13、你理解的vuex是什么呢？哪些场景会用到？不用会有问题吗？有哪些特性？
**vuex是什么**
> vuex形象的说是一个数据共享仓库，用于在组件关系复杂的情景下也能轻松地进行组件间数据通信。

**使用场景**
- 单⻚应⽤中，组件之间的状态、⾳乐播放、登录状态、加⼊购物⻋等。


## 14、页面刷新后vuex的state数据丢失怎么解决？
**丢失原因**
- vuex存储的数据只是在页面中，相当于全局变量，页面刷新的时候vuex里的数据会重新初始化，导致数据丢失。
- 因为vuex里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，vuex里面的数据就会被重新赋值。

**解决办法**
- 将vuex中的数据直接保存到浏览器缓存中（sessionStorage、localStorage、cookie）
- 页面刷新后再从浏览器中取出


## 16、vuex的store有几个属性值？分别讲讲它们的作用是什么？
- state: 存贮公共数据的地方
- Getters：获取公共数据的地方
- mutations：放的是同步的操作和reducer有点像 通过store的commit方法来让mutations执行
- action：放的是异步的操作 通过dispatch的方法让action里面的方法执行 context是store的一个副本 Vuex就是提供一个仓库，store仓库里面放了很多对象其中state即使数据源存放地
