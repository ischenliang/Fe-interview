import { ref } from 'vue'
export default {
  name: 'MyComponent',
  // 组件的 props
  props: {
    message: String,
  },
  setup () {
    const count = ref(0)
    function increment () {
      count.value++
    }
    return {
      count,
      increment
    }
  },
  // 组件的模板
  /*html*/
  template: `
    <div class="myButton">
      <h1>{{ message }}</h1>
      <p>计数器: {{ count }}</p>
      <button @click="increment">增加</button>
    </div>
  `,
}