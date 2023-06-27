import request from '@/utils/request'
// 获取辅导员信息
export const GetInterfaceApi = () => {
  return request({
    url: 'stu/inst',
    method: 'GET'
  })
}

export const LeavingSchoolApi = (data: any) => {
  return request({
    url: 'stu',
    method: 'PUT',
    data
  })
}
