<template>
  <div class="valine-comments">
    <div class="valine-hr">
      <span class="iconfont icon-jiandao1"></span>
    </div>
    <div class="valine-comments-head">
      <i class="iconfont icon-comment"></i>
      <span>评论</span>
    </div>
    <div id="valine-comments"></div>
  </div>
</template>

<script lang="ts" setup>
// 参考：https://valine.js.org/configuration.html
import { onMounted } from 'vue'
import Valine from 'valine'


onMounted(() => {
  new Valine({
    el:'#valine-comments',
    appId: 'TSE4633O2NnRFdjddW2ZYJhE-gzGzoHsz',
    appKey: 'zBO3GUKCttdxmWojJALNwzfn',
    placeholder: '1.请留下您的留言,博主接收到留言会第一时间内恢复\n2.昵称填写QQ号自动填写QQ昵称,邮箱,显示QQ头像',
    path: location.pathname,
    visitor: true, // 文章访问统计
    avatarForce: true,
    recordIP: true,
    enableQQ: true,
    avatar: 'monsterid',
    lang: 'zh-CN',
    guest_info: ['nick', 'mail', 'link'],
    requiredFields: ['nick', 'mail']
  })
})
</script>

<style lang="scss">
.valine-hr {
  position: relative;
  margin: 2rem auto;
  border: 2px dashed #a4d8fa;
  width: calc(100% - 4px);
  .iconfont {
    position: absolute;
    top: 0;
    //  rotate(90deg)
    transform: translate(-50%, -50%);
    font-size: 32px;
    left: 5%;
    font-weight: bolder;
    line-height: 1;
    color: #80c8f8;
    transition: all 2s ease-in-out;
  }
  &:hover {
    .iconfont {
      left: 95%;
    }
  }
}
.valine-comments-head {
  margin-bottom: 1rem;
  font-weight: 700;
  font-size: 20px;
  i {
    font-size: 24px;
    font-weight: 900;
    margin-right: 5px;
  }
}
</style>