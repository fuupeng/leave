<template>
  <div>
    <el-card>
      <el-breadcrumb separator-class="el-icon-arrow-right">
<!--        <el-breadcrumb-item :to="{ path: '/home' }as any">首页</el-breadcrumb-item>-->
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" :to="{ path: item.path }">
          {{ item.meta.name }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()
</script>
