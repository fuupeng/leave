import request from '@/utils/request'

// 获取列表
export const GetSecondList = (status: number) => {
  return request({
    url: `/inst/getSecondScoreInReview/${status}`,
    method: 'GET'
  })
}

// 同意
export const SecondAgreeApi = (data: any) => {
  return request({
    url: `/inst/reviewSecondScore`,
    method: 'PUT',
    data
  })
}
