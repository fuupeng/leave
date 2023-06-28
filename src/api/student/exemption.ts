import request from '@/utils/request'

/**
 * 删除图片
 * @param name
 * @constructor
 */
export const DeletePicApi = (name: string) => {
  return request({
    url: `/stu/del-free-proof`,
    method: 'DELETE',
    params: {
      proof: name
    }
  })
}

/**
 * 申请
 * @param data
 * @constructor
 */
export const ApplyApi = (data: any) => {
  return request({
    url: `/stu/freeApply`,
    method: 'POST',
    data
  })
}

export const ApplyingApi = (dis: any) => {
  return request({
    url: `/stu/record/free/${dis}`,
    method: 'GET'
  })
}
