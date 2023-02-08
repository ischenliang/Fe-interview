<template>
  <div class="katex" ref="katex">
    $$
    <slot></slot>
    $$
  </div>
</template>

<script lang="ts" setup>
// 参考：https://katex.org/docs/options.html
// https://katex.org/docs/autorender.html
import renderMathInElement from 'katex/dist/contrib/auto-render'
import { onMounted, ref } from 'vue';

const katex = ref(null)

onMounted(() => {
  renderMathInElement(katex.value, {
    output: 'mathml'
  })
})
</script>

<style lang="scss">
.katex {
  margin: 20px 0;
}
</style>