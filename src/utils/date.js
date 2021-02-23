export const DateUtil = {
  beginYMD (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate())
  },
  beginYM (date) {
    return new Date(date.getFullYear(), date.getMonth(), 1)
  },
  beginY (date) {
    return new Date(date.getFullYear(), 1, 1)
  },
  endYMD (date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)
  },
  endYM (date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, -1)
  },
  endY (date) {
    return new Date(date.getFullYear() + 1, 0, -1)
  },
  befor (date, ms) {
    if (!isNaN(new Date(date).getYear())) {
      date = new Date(date)
    } else {
      date = new Date()
    }
    const value = new Date()
    value.setTime(date.getTime() - ms)
    return value
  },
  beforD (date, day) {
    return this.befor(date, 3600 * 1000 * 24)
  },
  beforM (date, month) {
    return this.beforYMD(date, 0, month, 0)
  },
  beforY (date, year) {
    return this.beforYMD(date, year, 0, 0)
  },
  beforYMD (date, year, month, day) {
    return new Date(date.getFullYear() - year, date.getMonth() - month, date.getDate() - day, date.getHours(), date.getMinutes(), date.getSeconds())
  },
  format (date, fmt) {
    if (!fmt) {
      fmt = 'yyyy-MM-dd hh:mm:ss'
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    const o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    }
    for (const k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        const str = o[k] + ''
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : this.padLeftZero(str))
      }
    }
    return fmt
  },
  padLeftZero (str) {
    return ('00' + str).substr(str.length)
  },

  formatFrindy (time) {
    if (!time) {
      return ''
    }
    if (!(time instanceof Date)) {
      time = new Date(time)
    }
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    var date = time.getDate() // 系统时间月份中的日
    var day = time.getDay() // 系统时间中的星期值
    var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var week = weeks[day] // 显示为星期几
    var dh = ''
    var hour = time.getHours()
    var minutes = time.getMinutes()
    var seconds = time.getSeconds()
    // console.log(seconds)
    if (month < 10) {
      month = '0' + month
    }
    if (date < 10) {
      date = '0' + date
    }
    if (hour < 5) {
      dh = '凌晨'
    } else if (hour < 11) {
      dh = '早上'
    } else if (hour < 16) {
      dh = '中午'
    } else if (hour < 19) {
      dh = '下午'
    } else {
      dh = '晚上'
    }
    // if (hour < 10) {
    //   hour = '0' + hour
    // }
    if (minutes < 10) {
      minutes = '0' + minutes
    }
    if (seconds < 10) {
      seconds = '0' + seconds
    }
    return year + '年' + month + '月' + date + '日 ' + week + ' ' + dh + ' ' + hour + ':' + minutes + ':' + seconds
  },

  formatFrindyShort (time) {
    if (!time) {
      return ''
    }
    if (!(time instanceof Date)) {
      time = new Date(time)
    }
    var now = new Date()// 获取当前日期时间

    if (now.getFullYear() - time.getFullYear() > 2) {
      return time.getFullYear() + '年' + (time.getMonth() + 1) + '月'
    } else if (now.getFullYear() - time.getFullYear() === 2) {
      return '前年' + (time.getMonth() + 1) + '月'
    } else if (now.getFullYear() - time.getFullYear() === 1) {
      return '去年' + (time.getMonth() + 1) + '月'
    } else if (now.getMonth() - time.getMonth() > 1) {
      return (time.getMonth() + 1) + '月' + time.getDate() + '日'
    } else if (now.getMonth() - time.getMonth() === 1) {
      return '上月' + time.getDate() + '日'
    } else if (now.getDate() - time.getDate() > 2) {
      return '本月' + time.getDate() + '日'
    } else {
      let day = ''
      if (now.getDate() - time.getDate() === 2) {
        day = '前天'
      } else if (now.getDate() - time.getDate() === 1) {
        day = '昨天'
      } else {
        day = '今天'
      }

      if (now.getDate() === time.getDate() && now.getHours() === time.getHours()) {
        // debugger
        if (now.getMinutes() - time.getMinutes() < 5) {
          return '刚刚'
        } else if (now.getMinutes() - time.getMinutes() < 10) {
          return (now.getMinutes() - time.getMinutes()) + '分钟前'
        }
      }
      if (now.getDate() - time.getDate() < 1) {
        return '今天' + time.getHours() + '点'
      } else {
        let dh = ''
        let hour = time.getHours()
        if (hour < 5) {
          dh = '凌晨'
        } else if (hour < 11) {
          dh = '早上'
        } else if (hour < 16) {
          dh = '中午'
        } else if (hour < 19) {
          dh = '下午'
        } else {
          dh = '晚上'
        }
        return day + dh
      }
    }
  },
  formatMeetingTime(time,type){ //type ==='date' 格式化为2019-11-11  type==='time' 格式化为 HH:mm  //today: 今天 00:00   //aweek : 今天往后一周的 23:59
    if (!time) {
      return ''
    }
    if (!(time instanceof Date)) {
      time = new Date(time)
    }
    var year = time.getFullYear()
    var month = time.getMonth() + 1
    // var date = time.getDay() // 系统时间中的星期值
    var day = time.getDate() // 系统时间月份中的日
    var hour = time.getHours()
    var minutes = time.getMinutes()
    if (type === 'date') {
      return year+'-'+month+'-'+day
    }else if (type === 'time') {
      if (hour<10&&minutes<10){
        return '0'+hour+':'+'0'+minutes
      } else if (hour<10){
        return '0'+hour+':'+minutes
      }else if (minutes<10){
        return hour+':'+'0'+minutes
      } else {
        return hour+':'+minutes

      }
    }else if (type === 'today') {
      if (month<10&&day<10) {
        return year+'-0'+month+'-0'+day+' 00:00'
      }else if (month<10){
        return year+'-0'+month+'-'+day+' 00:00'
      }else if (day<10){
        return year+'-'+month+'-0'+day+' 00:00'
      } else {
        return year+'-'+month+'-'+day+' 00:00'
      }

    }else if (type === 'aweek') {
      let weekTime = time
      weekTime.setDate(time.getDate()+7)
      year = weekTime.getFullYear()
      month = weekTime.getMonth() + 1
      day = weekTime.getDate() // 系统时间月份中的日
      if (month<10&&day<10) {
        return year+'-0'+month+'-0'+day+' 23:59'
      }else if (month<10){
        return year+'-0'+month+'-'+day+' 23:59'
      }else if (day<10){
        return year+'-'+month+'-0'+day+' 23:59'
      } else {
        return year+'-'+month+'-'+day+' 23:59'
      }

    }
  },
  /**
   * 格式化时间
   * @param sTime 时间字符串
   * @param type  1:(格式化 yyyy-MM-dd HH:mm:ss)
   */
  formatStringToDate(sTime,type){
    if (sTime){
      if (type===1){
        let yyyyMMdd = sTime.split(' ')
        yyyyMMdd = yyyyMMdd[0].split('-')
        return new Date(yyyyMMdd[0],yyyyMMdd[1]-1,yyyyMMdd[2])
      }else {

      }
    }


  },
  /**
   *  日志管理
   * @param type   ===1 返回类型 20190101  ===2 返回类型 2019-01-01 ===3  sep 24 2019
   * @returns {string|number}
   */
  getJournalPostDate(type){
    let time = new Date()
    let year = time.getFullYear()
    let month = time.getMonth() + 1
    // var date = time.getDay() // 系统时间中的星期值
    let day = time.getDate() // 系统时间月份中的日
    if(type===1){
    if (month<10&&day<10) {
      return year+'0'+month+'0'+day
    }else if (month<10){
      return year+'0'+month+day
    }else if (day<10){
      return year+month+'0'+day
    } else {
      return year+month+day
    }
    }else if (type===2){
      if (month<10&&day<10) {
        return year+'-0'+month+'-0'+day+' 00:00:00'
      }else if (month<10){
        return year+'-0'+month+'-'+day+' 00:00:00'
      }else if (day<10){
        return year+'-'+month+'-0'+day+' 00:00:00'
      } else {
        return year+'-'+month+'-'+day+' 00:00:00'
      }
    }else if (type===3){
        if (month<10){
          return year+'-0'+month+'-'+'01'+' 00:00:00'
        } else {
          return year+'-'+month+'-'+'01'+' 00:00:00'
        }
    }
  },
  /**
   *获取今天在本月的第几周
   */
  getTodayWeekInMonth(){
    /**
    * a = d = 当前日期
    * b = 6 - w = 当前周的还有几天过完(不算今天)
    * a + b 的和在除以7 就是当天是当前月份的第几周
    */
    let date = new Date()
    let day = date.getDate()
    let b = 6-date.getDay()
    return Math.ceil((day+b)/7)
  }
}

export default DateUtil
