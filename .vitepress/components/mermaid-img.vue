<template>
  
  <pre class="mermaid">
    flowchart LR
      A-->B
      B-->C
      C-->D
      click A callback "Tooltip"
      click B "https://www.github.com" "This is a link"
      click C call callback() "Tooltip"
      click D href "https://www.github.com" "This is a link"
  </pre>
  <pre class="mermaid">
    sequenceDiagram
      Alice->>John: Hello John, how are you?
      John-->>Alice: Great!
      Alice-)John: See you later!
  </pre>
</template>

<script lang="ts" setup>
// 参考：https://mermaid.js.org/intro/
/**
  <div class="mermaid">
    graph LR
    A --- B
    B-->C[fa:fa-ban forbidden]
    B-->D(fa:fa-spinner)
    B-->E(fa:fa-spinner aaa)
    B-->F(fa:fa-spinner aaa)
    B-->G(fa:fa-spinner aaa)
    B-->H(fa:fa-spinner aaa)
    B-->I(fa:fa-spinner aaa)
  </div>
 */
import mermaid from 'mermaid'
import { onMounted } from 'vue';

onMounted(() => {
  // mermaid.initialize({
  //   startOnLoad: true,
  //   flowchart: { useMaxWidth: true, htmlLabels: true, curve: 'cardinal' },
  //   securityLevel: 'loose',
  // })
  mermaid.init(undefined, document.querySelectorAll('.mermaid'))
})
</script>

<style lang="scss">

</style>