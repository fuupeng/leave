import request from '@/utils/request'

export const GetInfoApi = () => {
  return request({
    url: `/tea/info`,
    method: 'POST'
  })
}
