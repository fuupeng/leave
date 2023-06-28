import request from '@/utils/request'
// 审核中
export const GetLeaveList = (status: any) => {
  return request({
    url: `/inst/lessonInReview/${status}`,
    method: 'GET'
  })
}

// 审核
export const ReviewLeaveApi = (rid: any, resultInst: any) => {
  return request({
    url: `/inst/examineInReview/`,
    method: 'PUT',
    data: { rid, resultInst }
  })
}
