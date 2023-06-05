import request from '@/utils/request'

// 购买使用权限
export const BuUseApi = (gid: number) => {
    return request({
        url: '/BlockChain/mine',
        method: 'POST',
        data: { gid }
    })
}
