import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";
import student from "@/router/models/student";
import teacher from "@/router/models/teacher";
import instructor from "@/router/models/instructor";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/student",
  },

  {
    path: "/login",
    name: "注册",
    component: () => import("@/view/base/login.vue"),
  },
  student,
  teacher,
  instructor,
];
const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
// 声明全局的导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === "/index") {
    next();
  } else {
    next();
  }
});
export default router;
