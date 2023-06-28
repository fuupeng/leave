import { formatDateTime } from '@/utils/day'
import dayjs from 'dayjs'

export class DayUtils {
  /**
   * 生成一个新的 DayUtils 实例，该实例支持从任意日期起，生成所有在指定日期范围内的日期。
   * 生成的日期可以是任意的，只要包含指定的日期范围即可。
   * 支持以下方式生成：
   * - 指定日期范围
   * - 指定起始日期和结束日期（以及其后一个日期）
   * */
  private static _date: any
  public static set date(date: any) {
    this._date = date
  }

  public static get date(): any {
    return this._date
  }

  public static formatDateTime = (timestamp: any, format: string) => {
    // 解析时间字符串
    const dateTime: dayjs.Dayjs = dayjs(timestamp)
    // 格式化日期时间
    const formattedDateTime = dateTime.format(format)
    return formattedDateTime
  }
  /**
   * 年月日时分秒
   * @param data
   * @param fieldName
   * @param format
   */
  public static accurateToSeconds = (fieldName: string, format = 'YYYY-MM-DD HH:mm:ss') => {
    // 遍历数据数组
    const date = this._date.map((item: any) => {
      const modifiedItem = { ...item } // 创建新对象并复制原始数据属性
      const fieldValue = modifiedItem[fieldName]
      if (fieldValue) {
        modifiedItem[fieldName] = formatDateTime(fieldValue, format) // 修改新对象的字段值
      }
      return modifiedItem
    })
    DayUtils.date = date
    return DayUtils
  }

  /**
   * 年月日
   * @param data
   * @param fieldName
   * @param format
   */
  public static accurateToDay = (fieldName: string, format = 'YYYY-MM-DD') => {
    // 遍历数据数组
    const date = this._date.map((item: any) => {
      const modifiedItem = { ...item } // 创建新对象并复制原始数据属性
      const fieldValue = modifiedItem[fieldName]

      if (fieldValue) {
        modifiedItem[fieldName] = formatDateTime(fieldValue, format) // 修改新对象的字段值
      }

      return modifiedItem
    })

    DayUtils.date = date
    return DayUtils
  }
  /**
   * 自定义
   * @param data
   * @param fieldName
   * @param format
   */
  public static accurateToCustom = (fieldName: string, format: string) => {
    // 遍历数据数组
    const date = this._date.map((item: any) => {
      const modifiedItem = { ...item } // 创建新对象并复制原始数据属性
      const fieldValue = modifiedItem[fieldName]

      if (fieldValue) {
        modifiedItem[fieldName] = formatDateTime(fieldValue, format) // 修改新对象的字段值
      }
      return modifiedItem
    })
    DayUtils.date = date
    return DayUtils
  }
}
