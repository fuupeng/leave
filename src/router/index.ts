import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: '注册',
    component: () => import('@/view/base/login.vue')
  }
 ]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  // history: createWebHashHistory(),
  routes
})
// 声明全局的导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/index') {
    next()
  } else {
    next()
  }
})
export default router
