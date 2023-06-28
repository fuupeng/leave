import request from '@/utils/request'

/**
 * 获取课程列表
 * @constructor
 */
export const GetCourseListApi = () => {
  return request({
    url: `/stu/all/course`,
    method: 'GET'
  })
}

/**
 * 选课
 * @param ccuid
 * @constructor
 */
export const SelectionApi = (ccuid: any) => {
  return request({
    url: `/stu/select/course/${ccuid}`,
    method: 'POST'
  })
}
/**
 *  获取选课结果
 * @constructor
 */
export const SelectionedListApi = () => {
  return request({
    url: `/stu/allCourse`,
    method: 'GET'
  })
}

export const DeselectionsApi = (ccuid: any) => {
  return request({
    url: `/stu/withdraw/${ccuid}`,
    method: 'DELETE'
  })
}
