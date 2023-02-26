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


## 3、不用 Vuex 会带来什么问题？


## 4、vue路由实现原理? 或 vue-router原理?
说简单点，vue-router的原理就是通过对URL地址变化的监听，继而对不同的组件进行渲染。 每当URL地址改变时，就对相应的组件进行渲染。原理是很简单，实现方式可能有点复杂，主要有hash模式和history模式。 如果想了解得详细点，建议百度或者阅读源码。


## 5、你有写过vuex中store的插件吗？


## 6、你有使用过vuex的module吗？主要是在什么场景下使用？


## 7、vuex中actions和mutations有什么区别？


## 8、vuex使用actions时不支持多参数传递怎么办？


## 9、你觉得vuex有什么缺点？


## 10、vuex怎么知道state是通过mutation修改还是外部直接修改的？


## 11、请求数据是写在组件的methods中还是在vuex的action中？


## 12、怎么监听vuex数据的变化？


## 13、vuex的action和mutation的特性是什么？有什么区别？


## 14、页面刷新后vuex的state数据丢失怎么解决？


## 15、vuex的state、getter、mutation、action、module特性分别是什么？


## 16、vuex的store有几个属性值？分别讲讲它们的作用是什么？


## 17、你理解的vuex是什么呢？哪些场景会用到？不用会有问题吗？有哪些特性？


## 18、使用vuex的优势是什么？

