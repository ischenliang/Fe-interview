# pinia面试题汇总
## 1、pinia是什么？
在Vue3中，可以使用传统的Vuex来实现状态管理，也可以使用最新的pinia来实现状态管理，我们来看看官网如何解释pinia的：
> Pinia 是 Vue 的存储库，它允许您跨组件/页面共享状态。实际上，pinia就是Vuex的升级版，官网也说过，为了尊重原作者，所以取名pinia，而没有取名Vuex，所以大家可以直接将pinia比作为Vue3的Vuex


## 2、为什么要使用pinia？
- Vue2和Vue3都支持，这让我们同时使用Vue2和Vue3的小伙伴都能很快上手。
- pinia中只有state、getter、action，抛弃了Vuex中的Mutation，Vuex中mutation一直都不太受小伙伴们的待见，pinia直接抛弃它了，这无疑减少了我们工作量。
- pinia中action支持同步和异步，Vuex不支持
- 良好的Typescript支持，毕竟我们Vue3都推荐使用TS来编写，这个时候使用pinia就非常合适了
- 无需再创建各个模块嵌套了，Vuex中如果数据过多，我们通常分模块来进行管理，稍显麻烦，而pinia中每个store都是独立的，互相不影响。
- 体积非常小，只有1KB左右。
- pinia支持插件来扩展自身功能。
- 支持服务端渲染


## 3、pinia使用
1. 准备工作: 我们这里搭建一个最新的Vue3 + TS + Vite项目
  ```shell
  npm i pinia
  ```
2. pinia基础使用
  - main.ts
    ```ts
    // main.ts
    import { createApp } from "vue";
    import App from "./App.vue";
    import { createPinia } from "pinia";
    const pinia = createPinia();

    const app = createApp(App);
    app.use(pinia);
    app.mount("#app");
    ```
  - 创建store
    ```ts
    // src/store/user.ts
    import { defineStore } from 'pinia'

    // 第一个参数是应用程序中 store 的唯一 id
    export const useUsersStore = defineStore('users', {
      // 其它配置项
    })
    ```
    创建`store`很简单，调用`pinia`中的`defineStore`函数即可，该函数接收两个参数：
    - `name`：一个字符串，必传项，该`store`的唯一id。
    - `options`：一个对象，`store`的配置项，比如配置`store`内的数据，修改数据的方法等等。
    我们可以定义任意数量的store，因为我们其实一个store就是一个函数，这也是pinia的好处之一，让我们的代码扁平化了，这和Vue3的实现思想是一样的
  - 使用store
    ```html
    <!-- src/App.vue -->
    <script setup lang="ts">
      import { useUsersStore } from "@/store/user";
      const store = useUsersStore();
      console.log(store);
    </script>
    ```
  - 添加state
    ```ts
    export const useUsersStore = defineStore("users", {
      state: () => {
        return {
          name: "test",
          age: 20,
          sex: "男",
        };
      },
    });
    ```
  - 读取state数据
    ```html
    <template>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>姓名：{{ name }}</p>
      <p>年龄：{{ age }}</p>
      <p>性别：{{ sex }}</p>
    </template>
    <script setup lang="ts">
      import { ref } from "vue";
      import { useUsersStore } from "../src/store/user";
      const store = useUsersStore();
      const name = ref<string>(store.name);
      const age = ref<number>(store.age);
      const sex = ref<string>(store.sex);
    </script>
    ```
    上段代码中我们直接通过`store.age`等方式获取到了store存储的值，但是大家有没有发现，这样比较繁琐，我们其实可以用解构的方式来获取值，使得代码更简洁一点
    ```ts
    import { useUsersStore, storeToRefs } from "../src/store/user";
    const store = useUsersStore();
    const { name, age, sex } = storeToRefs(store); // storeToRefs获取的值是响应式的
    ```
  - 修改state数据
    ```html
    <template>
      <img alt="Vue logo" src="./assets/logo.png" />
      <p>姓名：{{ name }}</p>
      <p>年龄：{{ age }}</p>
      <p>性别：{{ sex }}</p>
      <button @click="changeName">更改姓名</button>
    </template>
    <script setup lang="ts">
      import child from './child.vue';
      import { useUsersStore, storeToRefs } from "../src/store/user";
      const store = useUsersStore();
      const { name, age, sex } = storeToRefs(store);
      const changeName = () => {
        store.name = "张三";
        console.log(store);
      };
    </script>
    ```
  - 重置state
    - 有时候我们修改了state数据，想要将它还原，这个时候该怎么做呢？就比如用户填写了一部分表单，突然想重置为最初始的状态。
    - 此时，我们直接调用store的$reset()方法即可，继续使用我们的例子，添加一个重置按钮
    ```ts
    <button @click="reset">重置store</button>
    // 重置store
    const reset = () => {
      store.$reset();
    };
    ```
    当我们点击重置按钮时，store中的数据会变为初始状态，页面也会更新
  - 批量更改state数据: 如果我们一次性需要修改很多条数据的话，有更加简便的方法，使用store的`$patch`方法，修改`app.vue`代码，添加一个批量更改数据的方法
    ```ts
    <button @click="patchStore">批量修改数据</button>
    // 批量修改数据
    const patchStore = () => {
      store.$patch({
        name: "张三",
        age: 100,
        sex: "女",
      });
    };
    ```
    - 有经验的小伙伴可能发现了，我们采用这种批量更改的方式似乎代价有一点大，假如我们state中有些字段无需更改，但是按照上段代码的写法，我们必须要将state中的所有字段例举出了。
    - 为了解决该问题，pinia提供的$patch方法还可以接收一个回调函数，它的用法有点像我们的数组循环回调函数了。
    ```ts
    store.$patch((state) => {
      state.items.push({ name: 'shoes', quantity: 1 })
      state.hasChanged = true
    })
    ```
  - 直接替换整个state: pinia提供了方法让我们直接替换整个state对象，使用store的`$state`方法
    ```ts
    store.$state = { counter: 666, name: '张三' }
    ```
    上段代码会将我们提前声明的state替换为新的对象，可能这种场景用得比较少



## 4、pinia和vuex的区别？
- 它没有`mutation`，他只有`state`，`getters`，`action`【同步、异步】使用他来修改`state`数据
- 他默认也是存入内存中，如果需要使用本地存储，在配置上比`vuex`麻烦一点
- 语法上比`vuex`更容易理解和使用，灵活。
- `pinia`没有`modules`配置，每一个独立的仓库都是`definStore`生成出来的
- `state`是一个对象返回一个对象和组件的`data`是一样的语法


