# vue面试题汇总
## 1、谈谈你对MVVM的理解？
MVVM模式（Model-View-ViewModel）是一种将数据模型（Model）、视图（View）和ViewModel分离开来的设计模式，旨在使开发者能够更轻松地创建响应式应用程序。它提供了一种把可重用的UI逻辑从业务逻辑中分离出来的方法，并允许开发人员更快地进行增强和修改。MVVM 是一种设计思想。
- Model 层代表数据模型，也可以在 Model 中定义数据修改和操作的业务逻辑；
- View 代表 UI 组件，它负责将数据模型转化成 UI 展现出来;
- ViewModel 是一个同步 View 和 Model 的对象（桥梁）;


## 2、❓谈谈你对Vue中响应式数据的理解？Vue3.0响应式原理是？vue2响应式原理？
参考：https://baijiahao.baidu.com/s?id=1719835163199162055&wfr=spider&for=pc


## 3、❓Vue中如何检测数组的变化?
Vue提供了一个叫做 `Vue.set(array, index, value)` 的API，用于检测数组的变化。它会监听数组并触发视图更新。此外，也可以使用 splice、push、pop 等方法来添加或删除数组中的元素，以触发视图更新。


## 4、Vue中如何进行依赖收集的?
Vue中依赖收集是通过观察者（Observer）和计算属性（Computed）实现的。观察者会在数据发生变化时将更新到计算属性，从而触发视图重新渲染。计算属性也能够监听一些其他值的变化，以便更新DOM。


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
组件之间的通信种类
- 父组件向子组件通信
- 子组件向父组件通信
- 隔代组件间通信
- 兄弟组件间通信


## 23、$attrs是为了解决什么问题出现的?


## 24、v-for和v-if哪个优先级更高?


## 25、v-mode是如何实现的?


## 26、Vue的普通Slot以及作用域Slot的区别


## 27、Vue.use是干什么的?


## 28、组件写name有啥好处?
1. 可以通过名字找到对应的组件（递归组件） 
2. 可以通过name属性实现缓存功能 (keep-alive)
3. 可以通过name来识别组件（跨级组件通信时非常重要）
```js
Vue.extend = function () {
  if(name) {
    Sub.options.componentd[name] = Sub
  }
}
```


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


## 142、vue-cli 提供的几种脚手架模板
1. webpack-simple模板
2. webpack模板


## 143、vue-cli 开发环境使用全局常量


## 144、vue-cli 生产环境使用全局常量


## 145、vue-cli 中自定义指令的使用


## 146、vue 是如何对数组方法进行变异的？例如 push、pop、splice 等方法


## 147、vue 如何优化首页的加载速度？vue 首页白屏是什么问题引起的？如何解决呢？
vue 如何优化首页的加载速度？
- 路由懒加载
- ui框架按需加载
- gzip压缩

vue 首页白屏是什么问题引起的？
- 第一种，打包后文件引用路径不对，导致找不到文件报错白屏<br>
  解决办法：修改一下config下面的index.js中bulid模块导出的路径。因为index.html里边的内容都是通过script标签引入的，而你的路径不对，打开肯定是空白的。先看一下默认的路径。
- 第二种，由于把路由模式mode设置影响<br>
  解决方法：路由里边router/index.js路由配置里边默认模式是hash，如果你改成了history模式的话，打开也会是一片空白。所以改为hash或者直接把模式配置删除，让它默认的就行 。如果非要使用history模式的话，需要你在服务端加一个覆盖所有的情况的候选资源：如果URL匹配不到任何静态资源，则应该返回一个index.html，这个页面就是你app依赖页面。<br>
  所以只要删除mode或者把mode改成hash就OK了。
- 第三种，项目中使用了es6的语法，一些浏览器不支持es6，造成编译错误不能解析而造成白屏<br>
  安装`npm install --save-dev babel-preset-es2015`<br>
  安装`npm install --save-dev babel-preset-stage-3`<br>
  在项目根目录创建一个.babelrc文件 里面内容 最基本配置是：
  ```js
  {
    // 此项指明，转码的规则
    "presets": [
        // env项是借助插件babel-preset-env，下面这个配置说的是babel对es6,es7,es8进行转码，并且设置amd,commonjs这样的模块化文件，不进行转码
        ["env", {
            "modules": false
        }],
        // 下面这个是不同阶段出现的es语法，包含不同的转码插件
        "stage-2"
    ],
    // 下面这个选项是引用插件来处理代码的转换，transform-runtime用来处理全局函数和优化babel编译
    "plugins": ["transform-runtime"],
    // 下面指的是在生成的文件中，不产生注释
    "comments": false,
    // 下面这段是在特定的环境中所执行的转码规则，当环境变量是下面的test就会覆盖上面的设置
    "env": {
        // test 是提前设置的环境变量，如果没有设置BABEL_ENV则使用NODE_ENV，如果都没有设置默认就是development
        "test": {
            "presets": ["env", "stage-2"],
            // instanbul是一个用来测试转码后代码的工具
            "plugins": ["istanbul"]
        }
    }
  }
  ```


## 148、在 Vue 中，子组件为何不可以修改父组件传递的 Prop，如果修改了，Vue 是如何监控到属性的修改并给出警告的。


## 149、说说Vue的MVVM实现原理
1. Vue作为MVVM模式的实现库的2种技术
  - 模板解析
  - 数据绑定
2. 模板解析: 实现初始化显示
  - 解析大括号表达式
  - 解析指令
3. 数据绑定: 实现更新显示
  - 通过数据劫持实现

原理结构图
![202302201243274.png](https://imgs.itchenliang.club/img/202302201243274.png)


## 150、vue.use是干什么的？原理是什么？
`vue.use`是用来使用插件的，我们可以在插件中扩展全局组件、指令、原型方法等。
1. 检查插件是否注册，若已注册，则直接跳出；
2. 处理入参，将第一个参数之后的参数归集，并在首部塞入 this 上下文；
3. 执行注册方法，调用定义好的 install 方法，传入处理的参数，若没有 install 方法并且插件本身为 function 则直接进行注册；
  1. 插件不能重复的加载<br>
    install 方法的第一个参数是vue的构造函数，其他参数是Vue.set中除了第一个参数的其他参数； 代码：`args.unshift(this)`
  2. 调用插件的install 方法 代码：`typeof plugin.install === 'function'`
  3. 插件本身是一个函数，直接让函数执行。 代码：`plugin.apply(null, args)`
  4. 缓存插件。 代码：`installedPlugins.push(plugin)`


## 151、new Vue() 发生了什么？


## 152、vue3.x中Proxy只会代理对象的第一层，那么Vue3又是怎样处理这个问题的呢？
判断当前Reflect.get的返回值是否为Object，如果是则再通过reactive方法做代理， 这样就实现了深度观测。


## 153、vue3.x中监测数组的时候可能触发多次get/set，那么如何防止触发多次呢？
我们可以判断key是否为当前被代理对象target自身属性，也可以判断旧值与新值是否相等，只有满足以上两个条件之一时，才有可能执行trigger。


## 154、vue2.x和Vue3.x渲染器的diff算法分别说一下


## 155、vue 中 mixin 和 mixins 区别？
- mixin: 用于全局混入，会影响到每个组件实例。
- mixins: 应该是我们最常使用的扩展组件的方式了。如果多个组件中有相同的业务逻辑，就可以将这些逻辑剥离出来，通过 mixins 混入代码，比如上拉下拉加载数据这种逻辑等等。另外需要注意的是 mixins 混入的钩子函数会先于组件内的钩子函数执行，并且在遇到同名选项的时候也会有选择性的进行合并


## 156、使用 Object.defineProperty() 来进行数据劫持有什么缺点？
有一些对属性的操作，使用这种方法无法拦截，比如说通过下标方式修改数组数据或者给对象新增属性，vue 内部通过重写函数解决了这个问题。在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。使用 Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为这是 ES6 的语法。


## 157、什么是 Virtual DOM？为什么 Virtual DOM 比原生 DOM 快？
我对 Virtual DOM 的理解是，首先对我们将要插入到文档中的 DOM 树结构进行分析，使用 js 对象将其表示出来，比如一个元素对象，包含 TagName、props 和 Children 这些属性。然后我们将这个 js 对象树给保存下来，最后再将 DOM 片段插入到文档中。

当页面的状态发生改变，我们需要对页面的 DOM 的结构进行调整的时候，我们首先根据变更的状态，重新构建起一棵对象树，然后将这棵新的对象树和旧的对象树进行比较，记录下两棵树的的差异。

最后将记录的有差异的地方应用到真正的 DOM 树中去，这样视图就更新了。

我认为 Virtual DOM 这种方法对于我们需要有大量的 DOM 操作的时候，能够很好的提高我们的操作效率，通过在操作前确定需要做的最小修改，尽可能的减少 DOM 操作带来的重流和重绘的影响。其实 Virtual DOM 并不一定比我们真实的操作 DOM 要快，这种方法的目的是为了提高我们开发时的可维护性，在任意的情况下，都能保证一个尽量小的性能消耗去进行操作。


## 158、如何比较两个 DOM 树的差异？
两个树的完全 diff 算法的时间复杂度为 O(n^3) ，但是在前端中，我们很少会跨层级的移动元素，所以我们只需要比较同一层级的元素进行比较，这样就可以将算法的时间复杂度降低为 O(n)。

算法首先会对新旧两棵树进行一个深度优先的遍历，这样每个节点都会有一个序号。在深度遍历的时候，每遍历到一个节点，我们就将这个节点和新的树中的节点进行比较，如果有差异，则将这个差异记录到一个对象中。

在对列表元素进行对比的时候，由于 TagName 是重复的，所以我们不能使用这个来对比。我们需要给每一个子节点加上一个 key，列表对比的时候使用 key 来进行比较，这样我们才能够复用老的 DOM 树上的节点。


## 159、说下vue 中的h函数
h函数就是vue中的`createElement`方法，这个函数作用就是创建虚拟dom，追踪dom变化的，在讲h函数之前，我们先来了解下虚拟dom：虚拟dom简单来说就是一个普通的JavaScript对象，包含tag，props，children三个属性。。。
```html
<div id="app">
  <p className="text">lxc</p>
</div>
```
上边的HTML代码转为虚拟DOM如下：
```js
{
  tag:"div",
  props:{
    id:"app"
  },
  children:[
    {
      tag:"p",
      props:{
        className:"text"
      },
      children:[
        "lxc"
      ]
    }
  ]
}
```
该对象就是所谓的虚拟dom，因为dom对象是属性结构，所以使用JavaScript对象就可以简单表示。而原生dom有许多属性、事件，即使创建一个空div也要付出昂贵的代价。而虚拟dom提升性能的点在于DOM发生变化的时候，通过diff算法对比，计算出需要更改的DOM，只对变化的DOM进行操作，而不是更新整个视图。。。在vue脚手架中，我们经常会看到这样一段代码：
```js
const app = new Vue({
  ··· ···
  render: h => h(App)
})
```
这个render方法也可以写成这样：
```js
 const app = new Vue({
  ··· ···
  render:function(createElement){
      return createElement(App)
  }
})
```
所以h函数就是vue中的createElement方法，这个函数作用就是创建虚拟dom，追踪dom变化的。


## 160、Vue.prototype、Vue.component和Vue.use的区别
1. Vue.prototype
  - 在很多组件里用到数据/实用工具，但是不想污染全局作用域。这种情况下，你可以通过在原型上定义它们使其在每个 Vue 的实例中可用
  - $ 是在 Vue 所有实例中都可用的 property 的一个简单约定。这样做会避免和已被定义的数据、方法、计算属性产生冲突
  - 常用于方法与变量
  ```js
  import pinyin from 'js-pinyin';
  Vue.prototype.$pinyin = pinyin;
  ```
2. Vue.component
  - 注册全局组件
  - 第一个参数是调用组件时写的组件名
  - 第二个参数是引入组件时写的标签名称
  - 常用于注册自定义组件
  ```js
  import JsTree from '@/components/JsTree';
  Vue.component('JsTree', JsTree);
  ```
3. Vue.use
  - 注册全局插件
  - 会自动阻止多次注册相同插件，届时即使多次调用也只会注册一次该插件
  - 插件应该暴露一个 install 方法。这个方法的第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
  - 常用于注册第三方插件
  ```js
  import VueContextMenu from 'vue-contextmenu';
  Vue.use(VueContextMenu);
  ```


## 161、vue组件里的定时器要怎么销毁？
```js
const timer = setInterval(() =>{
  // 某些定时器操作
}, 500);

// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {
  clearInterval(timer);
})
```


## 162、`<template></template>`有什么用？
包裹嵌套其它元素，使元素具有区域性，自身具有三个特点：
- **隐藏性**：不会显示在页面中
- **任意性**：可以写在页面的任意地方
- **无效性**：没有一个根元素包裹，任何HTML内容都是无效的


## 163、vue组件会在什么时候下被销毁？
页面关闭、路由跳转、v-if和改变key值


## 164、vue组件里写的原生addEventListeners监听事件，要手动去销毁吗？为什么？
需要，原生DOM事件必须要手动销毁，否则会造成内存泄漏


## 165、在组件中怎么访问到根实例？
`this.$root`


## 166、vue中什么是递归组件？举个例子说明下？
组件自己调用自己，场景有用于生成树形结构菜单


## 167、在compositionAPI中如何使用生命周期函数？
需要用到哪个生命周期函数，就将对应函数的import进来，接着在setup中调用即可


## 168、vue3如何通过ref属性获取界面上的元素?
在vue2.x中，可以通过给元素添加`ref='xxx'`属性，然后在代码中通过`this.$refs.xxx`获取到对应的元素;

在vue3中：
- 在template中的写法跟vue2一样，给元素添加个`ref='xxx'`
- 在setup中，先创建一个响应式数据，并且要把响应式数据暴露出去
- 当元素被创建出来的时候，就会给对应的响应数据赋值
- 当响应式数据被赋值之后，就可以利用生命周期方法onMounted中获取对应的响应式数据，即DOM元素
- 这样做原因很简单，在setup执行时，template中的元素还没挂载到页面上，所以必须在mounted之后才能获取到元素。
```html
<template>
  <div ref='box'>I am DIV</div>
</template>
<script>
import { onMounted, ref } from 'vue';
export default{
  setup(){
    let box = ref(null);
    onMounted(()=>{
      console.log(box.value)
    });
    return {box}
  }
}
</script>
```


## 169、Vue的数据为什么频繁变化但只会更新一次
或者这样问：Vue在一个tick中多次更新数据页面只会更新一次（主线程的执行过程就是一个tick）
- 检测到数据变化
- 开启一个队列
- 在同一事件循环中缓冲所有数据改变
- 如果同一个 watcher (watcherId相同)被多次触发，只会被推入到队列中一次


## 170、你知道vue的模板语法用的是哪个web模板引擎的吗？说说你对这模板引擎的理解



## 171、你有使用过vue开发多语言项目吗？说说你的做法？


## 172、在使用计算属性的时，函数名和data数据源中的数据可以同名吗？


## 173、vue中data的属性可以和methods中的方法同名吗？为什么？


## 174、怎么给vue定义全局的方法？


## 175、vue2.0不再支持v-html中使用过滤器了怎么办？


## 176、怎么解决vue打包后静态资源图片失效的问题？


## 177、怎么解决vue动态设置img的src不生效的问题？


## 178、使用vue后怎么针对搜索引擎做SEO优化？


## 179、跟keep-alive有关的生命周期是哪些？描述下这些生命周期


## 180、你知道vue2.0兼容IE哪个版本以上吗？


## 181、使用vue开发一个todo小应用，谈下你的思路


## 182、你有看过vue推荐的风格指南吗？列举出你知道的几条


## 183、你是从vue哪个版本开始用的？你知道1.x和2.x有什么区别吗？


## 184、vue中怎么重置data？


## 185、vue渲染模板时怎么保留模板中的HTML注释呢？


## 186、Vue.observable你有了解过吗？说说看


## 187、你知道style加scoped属性的用途和原理吗？


## 188、watch的属性用箭头函数定义结果会怎么样？


## 189、在vue项目中如果methods的方法用箭头函数定义结果会怎么样？


## 190、在vue项目中如何配置favicon？


## 191、你有使用过babel-polyfill模块吗？主要是用来做什么的？


## 192、说说你对vue的错误处理的了解？


## 193、在.vue文件中style是必须的吗？那script是必须的吗？为什么？


## 194、vue怎么实现强制刷新组件？


## 195、vue自定义事件中父组件怎么接收子组件的多个参数？


## 196、实际工作中，你总结的vue最佳实践有哪些？


## 197、vue给组件绑定自定义事件无效怎么解决？


## 198、vue使用v-for遍历对象时，是按什么顺序遍历的？如何保证顺序？


## 199、vue如果想扩展某个现有的组件时，怎么做呢？


## 200、说下$attrs和$listeners的使用场景


## 201、分析下vue项目本地开发完成后部署到服务器后报404是什么原因呢？


## 202、v-once的使用场景有哪些？


## 203、说说你对vue的表单修饰符.lazy的理解


## 204、vue为什么要求组件模板只能有一个根元素？


## 205、EventBus注册在全局上时，路由切换时会重复触发事件，如何解决呢？


## 206、怎么修改vue打包后生成文件路径？


## 207、你有使用做过vue与原生app交互吗？说说vue与ap交互的方法


## 208、使用vue渲染大量数据时应该怎么优化？说下你的思路！


## 209、在vue中使用this应该注意哪些问题？


## 210、你有使用过JSX吗？说说你对JSX的理解


## 211、说说组件的命名规范


## 212、怎么配置使vue2.0+支持TypeScript写法？


## 213、vue的is这个特性你有用过吗？主要用在哪些方面？


## 214、vue的:class和:style有几种表示方式？


## 215、你了解什么是函数式组件吗？


## 216、vue怎么改变插入模板的分隔符？


## 217、说说你对provide和inject的理解


## 218、开发过程中有使用过devtools吗？


## 219、说说你对slot的理解有多少？slot使用场景有哪些？


## 220、你有使用过动态组件吗？说说你对它的理解


## 221、prop验证的type类型有哪几种？


## 222、prop是怎么做验证的？可以设置默认值吗？


## 223、说说你对vue组件的设计原则的理解


## 224、vue打包成最终的文件有哪些？


## 225、说说你对v-clock和v-pre指令的理解


## 226、写出你知道的表单修饰符和事件修饰符


## 227、用vue怎么实现一个换肤的功能？


## 228、有在vue中使用过echarts吗？踩过哪些坑？如何解决的？


## 229、vue部署上线前需要做哪些准备工作？


## 230、vue过渡动画实现的方式有哪些？


## 231、vue在created和mounted这两个生命周期中请求数据有什么区别呢？


## 232、vue父子组件双向绑定的方法有哪些？


## 233、vue怎么获取DOM节点？


## 234、vue项目有使用过npm run build --report吗？


## 235、如何解决vue打包vendor过大的问题？


## 236、webpack打包vue速度太慢怎么办？


## 237、vue在开发过程中要同时跟N个不同的后端人员联调接口（请求的url不一样）时你该怎么办？


## 238、vue要做权限管理该怎么做？如果控制到按钮级别的权限怎么做？


## 239、vue开发过程中你有使用什么辅助工具吗？


## 240、你了解什么是高阶组件吗？可否举个例子说明下？


## 241、为什么我们写组件的时候可以写在.vue里呢？可以是别的文件名后缀吗？


## 242、说说你对vue的extend（构造器）的理解，它主要是用来做什么的？


## 243、怎么捕获组件vue的错误信息？


## 244、为什么vue使用异步更新组件？


## 245、写出多种定义组件模板的方法


## 246、SPA单页面的实现方式有哪些？


## 247、组件进来请求接口时你是放在哪个生命周期？为什么？


## 248、如何引入scss？引入后如何使用？


## 249、使用vue开发过程你是怎么做接口管理的？


## 250、删除数组用delete和Vue.delete有什么区别？


## 251、组件和插件有什么区别？


## 252、说说你对选项el,template,render的理解


## 253、vue实例挂载的过程是什么？


## 254、vue在组件中引入插件的方法有哪些？


## 255、你有看过vue的源码吗？如果有那就说说看


## 256、你有写过自定义指令吗？自定义指令的生命周期（钩子函数）有哪些？

