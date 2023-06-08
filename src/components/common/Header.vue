<template>
  <div class="header">
    <el-header>
      <div class="title">
        <span>管理系统</span>
        <el-icon size="24px" @click="menuChange">
          <svg aria-hidden="true">
            <use :xlink:href="icon"></use>
          </svg>
        </el-icon>
      </div>
      <div class="menu">
        <el-menu mode="horizontal" router>
          <el-sub-menu index="1">
            <template #title>{{ name }}</template>
            <el-menu-item index="/info/maint">信息维护</el-menu-item>
            <el-menu-item @click="logout" index="/login">退出登录</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </div>
    </el-header>
  </div>
</template>
<script lang="ts" setup>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { removeToken } from '@/utils/setToken'

let store = useStore()
let icon = ref()
icon.value = '#icon-zhedie'
const menuChange = () => {
  store.commit('changeShrink')
  if (store.state.shrink) {
    icon.value = '#icon-unfold'
  } else {
    icon.value = '#icon-fold'
  }
}
</script>
<style lang="less" scoped>
.header {
  .el-header {
    background: #fff;
    color: rgba(0, 0, 0, 0.85);
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    flex-grow: 0;
    flex-shrink: 0;
    flex-basis: auto;

    .title {
      width: 210px;
      font-size: 24px;
      display: flex;
      justify-content: space-between;

      .el-icon {
        display: flex;
        height: 60px;
      }

      .el-icon:hover {
        color: #03bf8a;
        cursor: pointer;
      }
    }

    .menu {
      width: 200px;

      .el-sub-menu__title {
        font-size: 30px;
      }
    }
  }
}
</style>
