import request from '@/utils/request'

export const GetInfoApi = (identity: string) => {
  return request({
    url: identity + '',
    method: 'GET'
  })
}

export const GetHeadPicApi = (url: any) => {
  return request({
    url: `/getHeadPic/${url}`,
    method: 'GET'
  })
}
