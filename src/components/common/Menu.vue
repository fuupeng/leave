<template>
  <div class="menu">
    <el-aside width="auto">
      <el-menu
        :collapse="isCollapse"
        :default-active="activePath"
        active-text-color="#03bf8a"
        background-color="#f4f4f4"
        class="el-menu-vertical-demo"
        default-active="2"
        router
        text-color="#333"
      >
        <template v-for="item in menus" :key="item.path">
          <el-menu-item v-if="!item.children" :index="item.path" class="retraction">
            <el-icon>
              <svg aria-hidden="true" class="icon menuIcon">
                <use :xlink:href="item.meta.iconClass"></use>
              </svg>
            </el-icon>
            <!--<span>{{ item.name }}</span>-->
            <template #title>{{ item.name }}</template>
          </el-menu-item>
        </template>
        <template v-for="(item, index) in menus" :key="index">
          <el-sub-menu v-if="item.children" :key="index" :index="index + ''">
            <template #title>
              <el-icon>
                <!--                <i :class='"iconfont "+item.iconClass'></i>-->
                <svg aria-hidden="true" class="icon menuIcon">
                  <use :xlink:href="item.meta.iconClass"></use>
                </svg>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(child, index) in item.children" :key="index" :index="child.path">
              <i :class="child.iconClass"></i>
              {{ child.name }}
            </el-menu-item>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>
<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()

const router = useRouter()
const menus = router.options.routes[1].children
const activePath = computed(() => {
  return router.currentRoute.value.path
})
const isCollapse = computed(() => {
  return store.state.shrink
})
</script>
<style lang="less" scoped>
//设置了默认左边框为白色
.el-menu-item {
  //border-right: #fff solid 6px;
}

//设置鼠标悬停时el-menu-item的样式
.el-menu-item:hover {
  border-right: #03bf8a solid 6px !important;
  background-color: #e2eff9 !important;
  color: #03bf8a !important;
  //less语法，实现鼠标悬停时icon变色
  i {
    color: #03bf8a;
  }
}

//设置选中el-menu-item时的样式
.el-menu-item.is-active {
  border-right: #03bf8a solid 6px !important;
  background-color: #e2eff9 !important;
  color: #03bf8a !important;
}

.menu {
  .el-aside {
    height: 100%;

    .el-menu {
      height: 100%;
    }

    //.retraction {
    //  margin-left: -6px;
    //  border-left: solid 6px #f4f4f4;
    //}

    .el-submenu .el-menu-item {
      min-width: 0;
    }
  }
}
</style>
