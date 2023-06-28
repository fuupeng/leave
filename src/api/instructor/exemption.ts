import request from '@/utils/request'

// 获取列表 待审核
export const GetExemptionListApi = () => {
  return request({
    url: `/inst/getFreeInReview`,
    method: 'GET'
  })
}

// 审核
export const ExemptionAuditingAPi = (data: any) => {
  return request({
    url: `/inst/reviewFree`,
    method: 'PUT',
    data
  })
}

// 历史
export const ExemptionHistoryAPi = () => {
  return request({
    url: `/inst/getFreeHistory`,
    method: 'GET'
  })
}
