import request from '@/utils/request'

export const GetInfoApi = (identity: string) => {
  return request({
    url: identity + '',
    method: 'GET'
  })
}
