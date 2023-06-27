import request from '@/utils/request'
// 审核中
export const GetLeaveList = (result: any) => {
  return request({
    url: 'inst/allinReview',
    method: 'POST',
    data: {
      resultTea: result
    }
  })
}
