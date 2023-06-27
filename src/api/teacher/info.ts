import request from '@/utils/request'

export const GetInfoApi = () => {
  return request({
    url: `/tea/info`,
    method: 'POST'
  })
}

// 查询请假信息
export const GetLeaveList = (result: any) => {
  return request({
    url: 'tea/leLeave',
    method: 'POST',
    data: {
      resultTea: result
    }
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
