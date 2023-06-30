import request from '@/utils/request'

export const UpdateInfoApi = (data: any, id: number) => {
  return request({
    url: `/user/update/info/${id}`,
    method: 'PUT',
    data
  })
}
