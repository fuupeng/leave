import request from '@/utils/request'

// 出校审核中
export const GetSchoolLeave = () => {
  return request({
    url: `/inst/campusInReview`,
    method: 'GET'
  })
}

// 修改
export const update = (lid: any, result: any) => {
  return request({
    url: 'inst/examine',
    method: 'PUT',
    data: {
      lid,
      result
    }
  })
}

// suoy
export const his = () => {
  return request({
    url: '/inst/leaveHistory',
    method: 'GET'
  })
}
