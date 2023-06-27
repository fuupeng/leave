import request from '@/utils/request'

// 获取课程请假记录
export const GetListApi = (state: number) => {
  return request({
    url: `stu/record/${state}`,
    method: 'GET'
  })
}

// 获取出勤列表
export const GetAttendanceApi = () => {
  return request({
    url: 'stu/attend',
    method: 'GET'
  })
}

// 获取出勤详情
export const GetAttenDetailsApi = (cuid: number) => {
  return request({
    url: `/stu/detail/${cuid}`,
    method: 'GET'
  })
}

// 课程请假
export const CourseLeaveApi = (data: any) => {
  return request({
    url: `stu/courseApply`,
    method: 'POST',
    data
  })
}

// 获取课程名称
export const GetCourseNameApi = () => {
  return request({
    url: 'stu/allCourse',
    method: 'GET'
  })
}

// 获取课程请假记录
export const GetCourseLeaveListApi = (state: any) => {
  return request({
    url: `stu/courseRecord/${state}`,
    method: 'GET'
  })
}
