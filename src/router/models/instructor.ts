import { RouteRecordRaw } from 'vue-router'

const instructor: RouteRecordRaw = {
  path: '/instructor',
  meta: {
    name: '辅导员端'
  },
  component: () => import('@/view/base/Home.vue'),
  redirect: '/instructor/info',
  children: [
    {
      path: '/instructor/info',
      meta: {
        iconClass: '#icon-geren',
        name: '个人信息'
      },
      component: () => import('@/view/instructor/Info.vue')
    },
    {
      path: '/instructor/leave',
      meta: {
        iconClass: '#icon-qingjia',
        name: '课程请假'
      },
      redirect: '/instructor/leave/applying',
      children: [
        {
          path: '/instructor/leave/applying',
          component: () => import('@/view/instructor/leave/course/Applying.vue'),
          meta: {
            name: '待审批'
          }
        },
        {
          path: '/instructor/leave/history',
          component: () => import('@/view/instructor/leave/course/History.vue'),
          meta: {
            name: '请假历史'
          }
        }
      ]
    },
    {
      path: '/instructor/school',
      redirect: '/instructor/school/applying',
      meta: {
        iconClass: '#icon-shiwuzhongxin_lixiao',
        name: '离校申请'
      },
      children: [
        {
          path: '/instructor/school/applying',
          component: () => import('@/view/instructor/leave/school/Applying.vue'),
          meta: {
            name: '待审批'
          }
        },
        {
          path: '/instructor/school/history',
          component: () => import('@/view/instructor/leave/school/History.vue'),
          meta: {
            name: '请假历史'
          }
        }
      ]
    }
  ]
}

export default instructor
