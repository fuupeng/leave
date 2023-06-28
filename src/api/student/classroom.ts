import request from '@/utils/request'

// 获取教室列表
export const GetClassroomListApi = () => {
  return request({
    url: `/stu/room`,
    method: 'GET'
  })
}

/**
 *  获取教室详情
 * @param data
 * @constructor
 */
export const GetClassroomDescApi = (data: any) => {
  return request({
    url: `/stu/room/free/${data.date}/${data.roid}`,
    method: 'GET'
  })
}
/**
 * 获取时间表
 * @constructor
 */
export const GetTimeListApi = () => {
  return request({
    url: `/stu/time`,
    method: 'GET'
  })
}
/**
 * 申请教室
 * @param data
 * @constructor
 */
export const ApplicationApi = (data: any) => {
  return request({
    url: `/stu/room/apply`,
    method: 'POST',
    data
  })
}

export const GetApplyListApi = () => {
  return request({
    url: `/stu/room/all`,
    method: 'GET'
  })
}
