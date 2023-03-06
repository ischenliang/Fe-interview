<template>
  <el-tag type="success" class="c-tag" effect="dark" size="small">{{ text }}</el-tag>
</template>

<script lang="ts" setup>
interface Props {
  text: string
}
withDefaults(defineProps<Props>(), {
  text: ''
})
</script>

<style lang="scss">
.c-tag {
  vertical-align: top;
  margin-left: 5px;
  background-color: #42b983 !important;
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  border-radius: 3px;
  padding: 0 6px;
  color: #fff;
}
</style>