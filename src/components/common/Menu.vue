<template>
  <div class="menu">
    <el-aside width="auto">
      <el-menu
        :collapse="isCollapse"
        :default-active="activePath"
        active-text-color="#03bf8a"
        background-color="#f4f4f4"
        class=""
        default-active="2"
        router
        text-color="#333"
      >
        <template v-for="(item, index) in menus" :key="item.path">
          <el-menu-item
            v-if="!item.children"
            :index="item.path"
            class="retraction"
          >
            <el-icon>
              <svg aria-hidden="true" class="icon menuIcon">
                <use :xlink:href="item.meta.iconClass"></use>
              </svg>
            </el-icon>
            <template #title>{{ item.meta.name }}</template>
          </el-menu-item>
          <el-sub-menu v-if="item.children" :key="item.path" :index="item.path">
            <template #title>
              <el-icon>
                <svg aria-hidden="true" class="icon menuIcon">
                  <use :xlink:href="item.meta.iconClass"></use>
                </svg>
              </el-icon>
              <span>{{ item.meta.name }}</span>
            </template>
            <template v-for="(child, index) in item.children" :key="child.path">
              <el-menu-item :index="child.path">
                <i :class="child.iconClass"></i>
                {{ child.meta.name }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>
<script lang="ts" setup>
import { RouteRecordRaw, useRouter } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();

const router = useRouter();
const menus: any = ref();
const activePath = computed(() => {
  return router.currentRoute.value.path;
});
const identity = localStorage.getItem("identity");
if (identity === "student") {
  menus.value = router.options.routes[2].children;
} else if (identity === "teacher") {
  menus.value = router.options.routes[3].children;
} else {
  menus.value = router.options.routes[4].children;
}

const isCollapse = computed(() => {
  return store.state.shrink;
});
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
