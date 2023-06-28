// 导入Day.js库
import dayjs from 'dayjs'

// 函数：将时间字符串转换为年月日时分秒格式
export const formatDateTime = (timestamp: any, format: string) => {
  // 解析时间字符串
  const dateTime: dayjs.Dayjs = dayjs(timestamp)

  // 格式化日期时间
  const formattedDateTime = dateTime.format(format)

  return formattedDateTime
}
// 函数：年月日时分秒
export const accurateToSeconds = (data: any, fieldName: string, format = 'YYYY-MM-DD HH:mm:ss') => {
  // 遍历数据数组
  const date = data.map((item: any) => {
    const modifiedItem = { ...item } // 创建新对象并复制原始数据属性
    const fieldValue = modifiedItem[fieldName]

    if (fieldValue) {
      modifiedItem[fieldName] = formatDateTime(fieldValue, format) // 修改新对象的字段值
    }

    return modifiedItem
  })

  return date
}

// 函数：年月日
export const accurateToDay = (data: any, fieldName: string, format = 'YYYY-MM-DD') => {
  // 遍历数据数组
  const date = data.map((item: any) => {
    const modifiedItem = { ...item } // 创建新对象并复制原始数据属性
    const fieldValue = modifiedItem[fieldName]

    if (fieldValue) {
      modifiedItem[fieldName] = formatDateTime(fieldValue, format) // 修改新对象的字段值
    }

    return modifiedItem
  })

  return date
}
// 函数：年月日时分秒
export const accurateToCustom = (data: any, fieldName: string, format: string) => {
  // 遍历数据数组
  const date = data.map((item: any) => {
    const modifiedItem = { ...item } // 创建新对象并复制原始数据属性
    const fieldValue = modifiedItem[fieldName]

    if (fieldValue) {
      modifiedItem[fieldName] = formatDateTime(fieldValue, format) // 修改新对象的字段值
    }

    return modifiedItem
  })

  return date
}
