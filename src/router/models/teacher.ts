import { RouteRecordRaw } from 'vue-router'

const teacher: RouteRecordRaw = {
  path: '/teacher',
  meta: {
    name: '教师端'
  },
  component: () => import('@/view/base/Home.vue'),
  redirect: '/teacher/info',
  children: [
    {
      path: '/teacher/info',
      meta: {
        iconClass: '#icon-geren',
        name: '个人信息'
      },
      component: () => import('@/view/teacher/Info.vue')
    },
    {
      path: '/teacher/leave/course',
      meta: {
        iconClass: '#icon-qingjia',
        name: '课程请假'
      },
      redirect: '/teacher/leave/course/applying',
      children: [
        {
          path: '/teacher/leave/course/applying',
          component: () => import('@/view/teacher/leave/course/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/teacher/leave/course/history',
          component: () => import('@/view/teacher/leave/course/History.vue'),
          meta: {
            name: '请假历史'
          }
        }
      ]
    },
    {
      path: '/teacher/course',
      redirect: '/teacher/course/list',
      meta: {
        iconClass: '#icon-kecheng',
        name: '教师课程'
      },
      children: [
        {
          path: '/teacher/course/list',
          // todo
          component: () => import('@/view/teacher/course/List.vue'),
          meta: {
            name: '课程列表'
          }
        },
        {
          path: '/teacher/course/release',
          // todo
          component: () => import('@/view/teacher/course/Add.vue'),
          meta: {
            name: '课程发布'
          }
        }
      ]
    }
  ]
}
export default teacher
