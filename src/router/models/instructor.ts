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
    },
    {
      path: '/instructor/classroom',
      meta: {
        name: '教室申请',
        iconClass: '#icon-jiaoshi'
      },
      redirect: '/instructor/classroom/Application',
      children: [
        {
          path: '/instructor/classroom/applying',
          component: () => import('@/view/instructor/classroom/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/instructor/classroom/history',
          component: () => import('@/view/instructor/classroom/History.vue'),
          meta: {
            name: '申请历史'
          }
        }
      ]
    },
    {
      path: '/instructor/exemption',
      meta: {
        name: '免听免修',
        iconClass: '#icon-mianxiumiankao'
      },
      redirect: '/instructor/exemption/Application',
      children: [
        {
          path: '/instructor/exemption/applying',
          component: () => import('@/view/instructor/exemption/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/instructor/exemption/history',
          component: () => import('@/view/instructor/exemption/History.vue'),
          meta: {
            name: '申请历史'
          }
        }
      ]
    },
    {
      path: '/instructor/second',
      meta: {
        name: '第二课堂',
        iconClass: '#icon-mianxiumiankao'
      },
      redirect: '/instructor/second/Application',
      children: [
        {
          path: '/instructor/second/applying',
          component: () => import('@/view/instructor/second/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/instructor/second/history',
          component: () => import('@/view/instructor/second/History.vue'),
          meta: {
            name: '申请历史'
          }
        }
      ]
    }
  ]
}

export default instructor
