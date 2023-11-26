<template>
    <el-calendar v-model="value" class="content" />
</template>
  
<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>
 
<style>
  .content {
    margin-left: 260px; /* 导航栏宽度加上一些额外空间 */
    padding: 20px; /* 内边距 */
    transition: margin-left 0.3s ease; /* 平滑过渡效果 */
    /* 其他样式根据您的页面设计需要添加 */
  }
</style>