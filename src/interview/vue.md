# vue面试题汇总
## 1、谈谈你对MVVM的理解？
MVVM 是 `Model-View-ViewModel` 的缩写。MVVM 是一种设计思想。
- Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；
- View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来;
- ViewModel 是一个同步 View 和 Model 的对象（桥梁）;


## 2、❓谈谈你对Vue中响应式数据的理解？Vue3.0响应式原理是？vue2响应式原理？
参考：https://baijiahao.baidu.com/s?id=1719835163199162055&wfr=spider&for=pc


## 3、❓Vue中如何检测数组的变化?


## 4、Vue中如何进行依赖收集的?


## 5、如何理解Vue中的模板编译原理?


## 6、Vue生命周期钩子是如何实现的?


## 7、Vue组件生命周期有哪些？vue2和vue3的生命周期对比？


## 8、vue.mixin的使用场景和原理?


## 9、Vue的组件data为什么必须是一个函数?


## 10、请说明nextTick的原理？


## 11、computed、watch和method的区别是什么?


## 12、Vue.set方法是如何实现的?


## 13、Vue为什么要用虚拟Dom？


## 14、Vue的diff算法原理是什么?


## 15、既然vue通过数据劫持可以精准的探测数据变化，为什么还要进行diff检测差异?
响应式数据变化，Vue确实可以在数据变化的时候，响应式系统可以立刻得知。但是如何每个属性都添加watcher的话，性能会非常的差。

粒度过细，会导致更新不精准

所以采用watcher + Diff算法来检测差异。


## 16、请说明key的作用和原理


## 17、谈谈对组件的理解
组件化开发能大幅提高应用开发效率、测试性、复用性<br>
常用的组件化技术：属性、自定义事件、插槽<br>

特点：
- 降低更新范围，值重新渲染变化的组件
- 高内聚、低耦合、单向数据流


## 18、请描述组件的渲染流程


## 19、请描述组件的更新流程


## 20、异步组件原理


## 21、函数组件的优势和原理


## 22、组件的传值方式有哪些？Vue组件之间通信方式有哪些？


## 23、$attrs是为了解决什么问题出现的?


## 24、v-for和v-if哪个优先级更高?


## 25、v-mode是如何实现的?


## 26、Vue的普通Slot以及作用域Slot的区别


## 27、Vue.use是干什么的?


## 28、组件写name有啥好处?


## 29、vue的修饰符有哪些?


## 30、如何理解自定义指令?


## 31、keep-alive平时在哪里使用?原理是什么?


## 32、谈谈Vue的性能优化有哪些?


## 33、vue中使用了哪些设计模式?
参考：https://baijiahao.baidu.com/s?id=1719835163199162055&wfr=spider&for=pc


## 34、Watch中的deep:true是如何实现的？


## 35、Vue3速度快的原因？Vue3 为何比 Vue2 快？
参考：https://blog.csdn.net/qq_38689395/article/details/122260297


## 36、什么是递归组件？举个例子说明下？


## 37、怎样理解 Vue 的单向数据流？


## 38、为什么不建议用index作为key?


## 39、怎么缓存当前的组件？缓存后怎么更新


## 40、Vue中组件和插件有什么区别？


## 41、Composition API 与 Options API 有什么不同？


## 42、为什么要使用异步组件？


## 43、子组件可以直接改变父组件的数据么，说明原因？


## 44、怎么监听vuex数据的变化？


## 45、vue3 自定义全局指令、局部指令？


## 46、Vue computed 实现？


## 47、Vue中diff算法原理？


## 48、动态给vue的data添加一个新的属性时会发生什么？怎样解决？


## 49、v-if和v-show区别？


## 50、从0到1自己构架一个vue项目，说说有哪些步骤、哪些重要插件、目录结构你会怎么组织？


## 51、Vue2 的 Vue3 区别？
参考：https://www.cnblogs.com/guopeng27/p/16767478.html


## 52、Vue3带来了什么改变？Vue3带来了什么新特性？
参考：https://zhuanlan.zhihu.com/p/352910102
参考：https://developer.aliyun.com/article/921386


## 53、vue3响应式数据的判断？


## 54、vue3的常用 Composition API有哪些？


## 55、Composition API 实现代码逻辑复用？
https://blog.csdn.net/qq_38689395/article/details/122260297


## 56、Vue3 如何实现响应式？


## 57、v-model 参数用法？


## 58、watch 和 watchEffect 的区别？


## 59、setup 中如何获取组件实例？


## 60、如何理解ref、toRef和toRefs？
参考：https://wenku.baidu.com/aggs/0f64aceb19e8b8f67c1cb9e7.html?_wkts_=1676625074702&bdQuery=vue3%E9%9D%A2%E8%AF%95%E9%A2%98


## 61、Proxy 相比于 defineProperty 的优势
Object.defineProperty() 的问题主要有三个：
- 不能监听数组的变化
- 必须深层遍历嵌套的对象
- 必须遍历对象的每个属性

Proxy 在 ES2015 规范中被正式加入，它有以下几个特点：
- 针对对象：针对整个对象，而不是对象的某个属性，所以也就不需要对 keys 进行遍历。这解决了上述 Object.defineProperty() 第二个问题
- 支持数组：Proxy 不需要对数组的方法进行重载，省去了众多 hack，减少代码量等于减少了维护成本，而且标准的就是最好的。

除了上述两点之外，Proxy 还拥有以下优势：
- Proxy 的第二个参数可以有 13 种拦截方法，这比起 Object.defineProperty() 要更加丰富
- Proxy 作为新标准受到浏览器厂商的重点关注和性能优化，相比之下 Object.defineProperty() 是一个已有的老方法。


## 62、vue2为什么不使用proxy？
兼容性


## 63、vue3性能比vue2好的原因？
1. diff算法优化
2. 静态提升hoistStatic
3. 事件侦听器缓存 cacheHandles


## 64、Proxy响应式绑定
参考：https://wenku.baidu.com/view/af7334842b4ac850ad02de80d4d8d15abe230088.html?_wkts_=1676625340205&bdQuery=vue3%E9%9D%A2%E8%AF%95%E9%A2%98


## 65、ref响应式是怎样设计的？
监听了value 的改变 劫持value属性的setter gatter, 因此ref一般用在基本数据，或者引用数据的嵌套层级不深得数据上


## 66、relative也是响应式的设计 怎么设计的？
跟ref一样 但是底层采用的是ES6的Proxy代理了整个引用数据


## 67、什么是组合式API？
组合式 API (Composition API) 是一系列 API 的集合，使我们可以使用函数而不是声明选项的方式书写 Vue 组件。它是一个概括性的术语，涵盖了以下方面的 API：
- 响应式 API：例如`ref()`和`reactive()`，使我们可以直接创建响应式状态、计算属性和侦听器。
- 生命周期钩子：例如`onMounted()`和`onUnmounted()`，使我们可以在组件各个生命周期阶段添加逻辑。
- 依赖注入：例如`provide()`和`inject()`，使我们可以在使用响应式 API 时，利用 Vue 的依赖注入系统。

组合式 API 是 Vue 3 及 Vue 2.7 的内置功能。


## 68、hook代码写在哪里？
写在vue3.0的setup函数内部


## 69、vue3中的setup函数的理解？
- 1、setup语法返回的对象的成员可以在模板中使用，也可以在组件的api中使用，但是这个函数中不能使用组件api中的东西
- 2、setup函数中可以声明一些变量、函数 然后return出去给组件使用
- 3、setup函数内部的变量可以屈设计为响应式的变量 那么可以使用官方的hook
- 4、setup函数可以设计成scipt标签中写这个同名单词的属性，然后使整个标签环境都为setup标签环境


## 70、vue全家桶包含哪些？


## 71、v-model是什么？怎么使用？vue中标签怎么绑定事件？


## 72、v-model的实现原理？


## 73、请说出至少4种vue当中的指令和它的用法？


## 74、active-class是哪个组件的属性？
vue-router模块的router-link组件。


## 75、自定义指令（v-check、v-focus）的方法有哪些？它有哪些钩子函数？还有哪些钩子函数参数？
全局定义指令：在vue对象的directive方法里面有两个参数，一个是指令名称，另外一个是函数。组件内定义指令：directives<br>
钩子函数：bind（绑定事件触发）、inserted(节点插入的时候触发)、update（组件内相关更新）<br>
钩子函数参数：el、binding


## 76、vue-loader是什么？使用它的用途有哪些？
解析`.vue`文件的一个加载器，跟`template/js/style`转换成js模块。<br>
用途：js可以写`es6`、`style`样式可以`scss`或`less`、`template`可以加jade等


## 77、请说出vue.cli项目中src目录每个文件夹和文件的用法？
```
assets文件夹是放静态资源；
components是放组件；
router是定义路由相关的配置;
view视图；
app.vue是一个应用主组件；
main.js是入口文件
```


## 78、聊聊你对Vue.js的template编译的理解？ 
简而言之，就是先转化成AST树，再得到的render函数返回VNode（Vue的虚拟DOM节点）


## 79、dom是在哪一个生命周期完成渲染的？
在 mounted 中就已经完成了


## 80、第一次页面加载会触发哪几个生命周期？
第一次页面加载时会触发 beforeCreate, created, beforeMount, mounted 这几个生命周期。


## 81、vue生命周期的作用是什么？
它的生命周期中有多个事件钩子，让我们在控制整个Vue实例的过程时更容易形成好的逻辑。


## 82、如何解决vue修改数据不刷新页面这个问题？
第一种：this.set
第二种：给数组、对象赋新值 第三种：使用this.forceupdate强制刷新


## 83、为什么会出现vue修改数据后页面没有刷新这个问题？
受 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。



## 84、v-if 与 v-for 一起使用
- 当 v-if 与 v-for 一起使用时，v-for 具有比 v-if 更高的优先级。（注意这里是 2.x 的版本，3.x 反之）
- 不推荐同时使用 v-if 和 v-for。


## 85、vue.js 的两个核心是什么？
数据驱动、组件系统


## 86、Vue.js 双向绑定的原理


## 87、MVC和MVVM的区别
- MVC表示“模型-视图-控制器”，MVVM表示“模型-视图-视图模型”；
- MVVM是由MVC衍生出来的。MVC中，View会直接从Model中读取数据；
- MVVM各部分的通信是双向的，而MVC各部分通信是单向的；
- MVVM是真正将页面与数据逻辑分离放到js里去实现，而MVC里面未分离。


## 88、params和query的区别？


## 89、v-bind和v-model的区别， v-model原理知道吗？


## 90、Vue和React的区别是什么？


## 91、说说你对 SPA 单页面的理解，它的优缺点分别是什么？


## 92、Class 与 Style 如何动态绑定？


## 93、直接给一个数组项赋值，Vue 能检测到变化吗？


## 94、Vue 的父组件和子组件生命周期钩子函数执行顺序？


## 95、父组件可以监听到子组件的生命周期吗？


## 96、使用过 Vue SSR 吗？说说 SSR？


## 97、Vue 怎么用 vm.$set() 解决对象新增属性不能响应的问题 ？


## 98、虚拟 DOM 的优缺点？


## 99、虚拟 DOM 实现原理？


## 100、vue 中的性能优化


## 101、什么是 Proxy？


## 102、为什么避免 v-if 和 v-for 用在一起


## 103、组件的设计原则


## 104、vue slot是做什么的?


## 105、对于 Vue 是一套渐进式框架的理解


## 106、v-on 可以监听多个方法吗？
肯定可以的。
```html
<input type="text" :value="name" @input="onInput" @focus="onFocus" @blur="onBlur" />
```


## 107、vue-cli 工程升级 vue 版本
在项目目录里运行 npm upgrade vue vue-template-compiler，不出意外的话，可以正常运行和 build。如果有任何问题，删除 node_modules 文件夹然后重新运行 npm i 即可。（简单的说就是升级 vue 和 vue-template-compiler 两个插件）


## 108、vue 事件中如何使用 event 对象？


## 109、$nextTick 的使用


## 110、vue 中子组件调用父组件的方法


## 111、vue 中父组件调用子组件的方法



## 112、如何监听键盘事件中的按键？


## 113、vue 更新数组时触发视图更新的方法


## 114、v-for 产生的列表，实现 active 的切换


## 115、十个常用的自定义过滤器


## 116、vue 弹窗后如何禁止滚动条滚动？


## 117、vue怎么实现页面的权限控制
利用 vue-router 的 beforeEach 事件，可以在跳转页面前判断用户的权限（利用 cookie 或 token），是否能够进入此页面，如果不能则提示错误或重定向到其他页面，在后台管理系统中这种场景经常能遇到。


## 118、vue 如何优化首屏加载速度？


## 119、vue 打包命令是什么？


## 120、vue 打包后会生成哪些文件？


## 121、如何配置 vue 打包生成文件的路径？


## 122、vue 开发命令 npm run dev 输入后的执行过程


## 123、vue.js 全局运行机制


## 124、如何编译 template 模板？


### 125、批量异步更新策略及 nextTick 原理？


## 126、vue 中如何实现 proxy 代理？


## 127、vue 中如何实现 tab 切换功能？


## 129、vue 中如何利用 keep-alive 标签实现某个组件缓存功能？


## 130、vue 中实现切换页面时为左滑出效果


## 131、vue 中央事件总线的使用


## 132、vue 的渲染机制


## 133、如何让 CSS 只在当前组件中起作用
将当前组件的 `<style>` 修改为 `<style scoped>`


## 134、指令 v-el 的作用是什么?
提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标, 可以是 CSS 选择器，也可以是一个 HTMLElement 实例


## 135、你们vue项目是打包了一个js文件，一个css文件，还是有多个文件？


## 136、vue遇到的坑，如何解决的？


## 137、递归组件的使用


## 138、vue-cli 工程常用的 npm 命令有哪些？


## 139、config 文件夹 下 index.js 的对于工程 开发环境 和 生产环境 的配置


## 140、请你详细介绍一些 package.json 里面的配置


## 141、vue-cli 中常用到的加载器