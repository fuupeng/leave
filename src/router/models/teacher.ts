import { RouteRecordRaw } from "vue-router";

const teacher: RouteRecordRaw = {
  path: "/teacher",
  meta: {
    name: "教师端",
  },
  component: () => import("@/view/base/Home.vue"),
  redirect: "/teacher/info",
  children: [
    {
      path: "/teacher/info",
      meta: {
        iconClass: "#icon-geren",
        name: "个人信息",
      },
      component: () => import("@/view/teacher/Info.vue"),
    },
    {
      path: "/teacher/course",
      meta: {
        iconClass: "#icon-qingjia",
        name: "课程请假",
      },
      redirect: "/teacher/teacher/application",
      children: [
        {
          path: "/teacher/teacher/applying",
          component: () => import("@/view/student/course/Applying.vue"),
          meta: {
            name: "申请中",
          },
        },
        {
          path: "/teacher/teacher/history",
          component: () => import("@/view/student/course/History.vue"),
          meta: {
            name: "请假历史",
          },
        },
      ],
    },
  ],
};
export default teacher;
