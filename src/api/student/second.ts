import request from '@/utils/request'

/**
 *  申请
 * @param data
 * @constructor
 */
export const ApplyApi = (data: any) => {
  return request({
    url: '/stu/secondScoreApply',
    method: 'POST',
    data
  })
}

/**
 * 获取申请历史
 * @param state
 * @constructor
 */
export const ApplyingApi = (state: any) => {
  return request({
    url: `/stu/process/${state}`,
    method: 'GET'
  })
}
