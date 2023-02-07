<template>
  <div class="gitalk-container">
    <div id="gitalk-container"></div>
  </div>
</template>

<script lang="ts" setup>
// 参考：https://blog.csdn.net/qq_42611074/article/details/128451765
// https://zqy233.github.io/formatAndSave/guide/start.html
// https://github.com/zqy233/formatAndSave
import { onMounted } from 'vue'
import md5 from "md5"
import Gitalk from "gitalk"
import "gitalk/dist/gitalk.css"


onMounted(() => {
  const commentConfig = {
    clientID: "fee91d802684da645762",
    clientSecret: "b27d9cb4b73d36ab5f5dd64f59aa77587a637e1e",
    repo: "FE-interview",
    owner: "it-chenliang",
    admin: ["it-chenliang"],
    id: md5(location.pathname),
    distractionFreeMode: false,
  }
  const gitalk = new Gitalk(commentConfig)
  gitalk.render("gitalk-container")
})
</script>
<style>
.gt-container .gt-header-textarea {
  color: #000;
}
</style>