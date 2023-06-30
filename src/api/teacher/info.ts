import request from '@/utils/request'

export const GetInfoApi = () => {
  return request({
    url: `/tea/info`,
    method: 'GET'
  })
}
export const UpdateApi = (data: any) => {
  return request({
    url: `/tea/updateInfo`,
    method: 'PUT',
    data
  })
}
// 查询请假信息
export const GetLeaveList = (result: any) => {
  return request({
    url: `/tea/leLeave/${result}`,
    method: 'GET'
  })
}

//同意 或 拒绝
export const IsAgree = (rid: any, resultTea: any) => {
  return request({
    url: '/tea/examine',
    method: 'PUT',
    data: {
      rid,
      resultTea
    }
  })
}
