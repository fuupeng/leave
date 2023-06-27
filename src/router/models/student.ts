import { RouteRecordRaw } from 'vue-router'

const student: RouteRecordRaw = {
  path: '/student',
  component: () => import('@/view/base/Home.vue'),
  meta: {
    name: '学生端'
  },
  redirect: '/student/info',
  children: [
    {
      path: '/student/info',
      meta: {
        iconClass: '#icon-geren',
        name: '个人信息'
      },
      component: () => import('@/view/student/Info.vue')
    },
    {
      path: '/student/leave/course',
      meta: {
        iconClass: '#icon-qingjia',
        name: '课程请假'
      },
      redirect: '/student/leave/course/application',
      children: [
        {
          path: '/student/leave/course/application',
          component: () => import('@/view/student/leave/course/Application.vue'),
          meta: {
            name: '新建申请 '
          }
        },
        {
          path: '/student/leave/course/applying',
          component: () => import('@/view/student/leave/course/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/student/leave/course/history',
          component: () => import('@/view/student/leave/course/History.vue'),
          meta: {
            name: '请假历史'
          }
        }
      ]
    },
    {
      path: '/student/attend',
      meta: {
        iconClass: '#icon-kaoqintongji',
        name: '出勤查询'
      },
      component: () => import('@/view/student/attendance/AttendanceRecords.vue')
    },
    {
      path: '/student/leave/school',
      redirect: '/student/leave/school/application',
      meta: {
        iconClass: '#icon-shiwuzhongxin_lixiao',
        name: '离校申请'
      },
      children: [
        {
          path: '/student/leave/school/application',
          component: () => import('@/view/student/leave/school/Application.vue'),
          meta: {
            name: '新建申请'
          }
        },
        {
          path: '/student/leave/school/applying',
          component: () => import('@/view/student/leave/school/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/student/leave/school/history',
          component: () => import('@/view/student/leave/school/History.vue'),
          meta: {
            name: '请假历史'
          }
        }
      ]
    },
    {
      path: '/student/leave',
      redirect: '/student/course/list',
      meta: {
        iconClass: '',
        name: '学生课程'
      },
      children: [
        {
          path: '/student/course/list',
          // todo
          component: () => import('@/view/student/course/list.vue'),
          meta: {
            name: '课程列表'
          }
        },
        {
          path: '/student/course/selection',
          // todo
          component: () => import('@/view/student/course/selection.vue'),
          meta: {
            name: '学生选课'
          }
        }
      ]
    },
    {
      path: '/student/classroom',
      meta: {
        name: '教室申请',
        iconClass: ''
      },
      redirect: '/student/classroom/Application',
      children: [
        {
          path: '/student/classroom/Application',
          component: () => import('@/view/student/classroom/application.vue'),
          meta: {
            name: '教室申请'
          }
        },
        {
          path: '/student/classroom/applying',
          component: () => import('@/view/student/classroom/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/student/classroom/history',
          component: () => import('@/view/student/classroom/History.vue'),
          meta: {
            name: '申请历史'
          }
        }
      ]
    },
    {
      path: '/student/exemption',
      meta: {
        name: '免听免修',
        iconClass: ''
      },
      redirect: '/student/exemption/Application',
      children: [
        {
          path: '/student/exemption/Application',
          component: () => import('@/view/student/exemption/application.vue'),
          meta: {
            name: '免听免修申请'
          }
        },
        {
          path: '/student/exemption/applying',
          component: () => import('@/view/student/exemption/Applying.vue'),
          meta: {
            name: '申请中'
          }
        },
        {
          path: '/student/exemption/history',
          component: () => import('@/view/student/exemption/History.vue'),
          meta: {
            name: '申请历史'
          }
        }
      ]
    }
  ]
}
export default student
