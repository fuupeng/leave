import request from '@/utils/request'

/**
 * 获取课程列表
 * @constructor
 */
export const GetCourseListApi = () => {
  return request({
    url: '/tea/teach/course',
    method: 'GET'
  })
}

/**
 * 获取教室空闲时间
 * @param data
 * @constructor
 */
export const GetFreeTimeApi = (data: any) => {
  return request({
    url: '/tea/free/section',
    method: 'GET',
    params: data
  })
}

/**
 * 获取开课列表
 * @constructor
 */
export const GetCoursesAvailableApi = () => {
  return request({
    url: '/tea/teach/list',
    method: 'GET'
  })
}

export const CourseSubmitApi = (data: any) => {
  return request({
    url: '/tea/teach/submit',
    method: 'POST',
    data
  })
}

export const GetCancelListApi = (data: any) => {
  return request({
    url: '/tea/cancel/list',
    method: 'GET',
    params: data
  })
}

export const GetCancelSubmitApi = (data: any) => {
  return request({
    url: '/tea/cancel/submit',
    method: 'POST',
    data
  })
}
