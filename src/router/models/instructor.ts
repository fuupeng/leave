import { RouteRecordRaw } from "vue-router";

const instructor: RouteRecordRaw = {
  path: "/teacher",
  meta: {
    name: "辅导员端",
  },
  component: () => import("@/view/base/Home.vue"),
  redirect: "/instructor/info",
  children: [
    {
      path: "/instructor/info",
      meta: {
        iconClass: "#icon-geren",
        name: "个人信息",
      },
      component: () => import("@/view/instructor/Info.vue"),
    },
    {
      path: "/instructor/course",
      meta: {
        iconClass: "#icon-qingjia",
        name: "课程请假",
      },
      redirect: "/instructor/school/applying",
      children: [
        {
          path: "/instructor/school/applying",
          component: () => import("@/view/instructor/school/Applying.vue"),
          meta: {
            name: "待审批",
          },
        },
        {
          path: "/instructor/teacher/history",
          component: () => import("@/view/instructor/course/History.vue"),
          meta: {
            name: "请假历史",
          },
        },
      ],
    },
    {
      path: "/instructor/school",
      redirect: "/instructor/school/applying",
      meta: {
        iconClass: "#icon-shiwuzhongxin_lixiao",
        name: "离校申请",
      },
      children: [
        {
          path: "/instructor/school/applying",
          component: () => import("@/view/instructor/school/Applying.vue"),
          meta: {
            name: "待审批",
          },
        },
        {
          path: "/instructor/school/history",
          component: () => import("@/view/instructor/school/History.vue"),
          meta: {
            name: "请假历史",
          },
        },
      ],
    },
  ],
};

export default instructor;
