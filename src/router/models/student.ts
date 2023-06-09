import { RouteRecordRaw } from "vue-router";

const student: RouteRecordRaw = {
  path: "/student",
  component: () => import("@/view/base/Home.vue"),
  meta: {
    name: "学生端",
  },
  redirect: "/student/info",
  children: [
    {
      path: "/student/info",
      meta: {
        iconClass: "#icon-geren",
        name: "个人信息",
      },
      component: () => import("@/view/student/Info.vue"),
    },
    {
      path: "/student/course",
      meta: {
        iconClass: "#icon-qingjia",
        name: "课程请假",
      },
      redirect: "/student/course/application",
      children: [
        {
          path: "/student/course/application",
          component: () => import("@/view/student/course/Application.vue"),
          meta: {
            name: "新建申请 ",
          },
        },
        {
          path: "/student/course/applying",
          component: () => import("@/view/student/course/Applying.vue"),
          meta: {
            name: "申请中",
          },
        },
        {
          path: "/student/course/history",
          component: () => import("@/view/student/course/History.vue"),
          meta: {
            name: "请假历史",
          },
        },
      ],
    },
    {
      path: "/student/attend",
      meta: {
        iconClass: "#icon-kaoqintongji",
        name: "出勤查询",
      },
      component: () =>
        import("@/view/student/attendance/AttendanceRecords.vue"),
    },
    {
      path: "/student/school",
      redirect: "/student/school/application",
      meta: {
        iconClass: "#icon-shiwuzhongxin_lixiao",
        name: "离校申请",
      },
      children: [
        {
          path: "/student/school/application",
          component: () => import("@/view/student/school/Application.vue"),
          meta: {
            name: "新建申请",
          },
        },
        {
          path: "/student/school/applying",
          component: () => import("@/view/student/school/Applying.vue"),
          meta: {
            name: "申请中",
          },
        },
        {
          path: "/student/school/history",
          component: () => import("@/view/student/school/History.vue"),
          meta: {
            name: "请假历史",
          },
        },
      ],
    },
  ],
};
export default student;
