const { defineComponent } = Vue

const MyComponent = defineComponent({
  name: 'MyComponent',
  // 组件的 props
  props: {
    message: String,
  },
  // 组件的模板
  template: `
    <div>
      <h1>{{ message }}</h1>
    </div>
  `,
})

export default MyComponent;