<template>
  <div class="post-meta-list">
  <!-- 判断是否开启评论 -->
    <template v-if="$frontmatter.comment">
      <div class="post-meta-item leancloud_visitors" :id="pathName">
        <span class="iconfont icon-yuedu"></span>
        <span class="post-meta-item-label">阅读量:</span>
        <span class="post-meta-item-value leancloud-visitors-count">1</span>
      </div>
      <div class="post-meta-separator">|</div>
    </template>
    <div class="post-meta-item">
      <span class="iconfont icon-date"></span>
      <span class="post-meta-item-label">更新于:</span>
      <span class="post-meta-item-value">{{ formatTime($frontmatter.updated) }}</span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import moment from 'moment'
import 'moment/dist/locale/zh-cn'
moment.locale('zh-cn')


const pathName = computed(() => {
  return window.location.pathname
})


const formatTime = (date: any) => {
  // return moment(date).fromNow()
  return moment(date).utc().format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style lang="scss">
.post-meta-list {
  width: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  font-size: 15px;
  color: #10b981;
  margin-bottom: 10px;
  .post-meta-item {
    .iconfont {
      font-size: 16px !important;
      margin-right: 5px;
    }
    .post-meta-item-label {
      margin-right: 5px;
    }
  }
  .post-meta-separator {
    margin: 0 5px;
    color: #58dfb2;
    font-size: 12px;
  }
}
</style>