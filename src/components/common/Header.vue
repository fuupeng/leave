<template>
  <div class="header">
    <el-header>
      <div class="title">
        <span>请假系统</span>
        <el-icon size="24px" @click="menuChange">
          <svg aria-hidden="true">
            <use :xlink:href="icon"></use>
          </svg>
        </el-icon>
      </div>
      <div class="menu">
        <el-menu mode="horizontal" router>
          <el-sub-menu index="1">
            <template #title>
              <el-avatar
                fit="cover"
                src="ss"
                error="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              {{ name }}
            </template>
            <el-menu-item :index="'/' + identity + '/info'">个人信息</el-menu-item>
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
import { GetInfoApi } from '@/api/student/info'

let store = useStore()
let icon = ref()
icon.value = '#icon-fold'
const menuChange = () => {
  store.commit('changeShrink')
  if (store.state.shrink) {
    icon.value = '#icon-unfold'
  } else {
    icon.value = '#icon-fold'
  }
}
const logout = () => {
  removeToken('token')
}

const name = ref()
const identity = localStorage.getItem('identity')
const GetInfo = async () => {
  const identity = localStorage.getItem('identity')
  if (identity === 'student') {
    let { data: res } = await GetInfoApi('/stu')
    name.value = res.data.uname
  } else {
    let { data: res } = await GetInfoApi('/tea/info')
    name.value = res.data.tname
  }
}
GetInfo()
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
      width: 300px;
      .el-sub-menu__title {
        width: 300px;
        font-size: 30px;
      }
    }
  }
}
</style>
