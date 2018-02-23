import $ from 'jquery'

// 数组
function duplicates (arr) {
  const temp = []
  arr.sort()
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === arr[i + 1] && arr[i] !== arr[i - 1]) {
      temp.push(arr[i])
    }
  }
  return temp
}

export default {
  convertSize (value) {
    let v = ''
    if (value == null) return '未知'
    if (value >= 1024 && value < 1024 * 1024) {
      v = ((value / 1024).toFixed(0) * 1).toString() + 'K'
    } else if (value >= 1024 * 1024 && value < 1024 * 1024 * 1024) {
      v = ((value / (1024 * 1024)).toFixed(2) * 1).toString() + 'M'
    } else if (value >= 1024 * 1024 * 1024) {
      v = ((value / (1024 * 1024 * 1024)).toFixed(2) * 1).toString() + 'G'
    } else {
      v = value.toString()
      if (v.length > 3) {
        return value.toFixed(0).toString()
      }
    }
    return v
  },
  // 合并
  merge (...arg) {
    const keyList = []
    for (let i = 0; i < arg.length; i++) {
      keyList.push(...Object.keys(arg[i]))
    }
    var res = Object.assign.apply({}, arg)
    var resKeys = Object.keys(res)
    if (keyList.length !== resKeys.length) {
      console && console.error && console.error('应该有有' + keyList.length + '个key，但是合并后只有' + resKeys.length + '个key')
      console && console.log('重复的key有：', duplicates(keyList))
    }
    return res
  },
  // 判断一个元素是否在一个滚动容器的可视范围内
  isOnScreen (scrollLayout, element) {
    var win = $(scrollLayout)
    var viewport = win.offset()
    viewport.right = viewport.left + win.outerWidth()
    viewport.bottom = viewport.top + win.outerHeight()

    var bounds = $(element).offset()
    bounds.right = bounds.left + $(element).outerWidth()
    bounds.bottom = bounds.top + $(element).outerHeight()
    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom))
  },

  // 获取一系列颜色rgb值
  getColorList (base, amount) {
    if (!base) {
      // base = 'ff3333'
      base = 'e7903b'
    }
    // if (!offset) {
    //   offset = 75
    // }
    const offset = Math.floor(255 / (amount - 1))
    const result = []
    if (!amount || amount <= 0) {
      return result
    }
    const ff = 255

    // 按16进制分割 ['7e', '58', 'eb']
    let baseColor = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(base)
    while (amount > 0) {
      const num = parseInt(baseColor, 16)
      let RGB = [num >> 16, num >> 8 & ff, num & ff]
      RGB = RGB.map(_rgb => {
        return _rgb < offset ? (_rgb - offset + ff) : (_rgb - offset)
      })
      baseColor = ((RGB[2] | RGB[1] << 8 | RGB[0] << 16) | 1 << 24).toString(16).slice(1)
      result.push(baseColor)
      amount--
    }
    return result
  },
  // 判断浏览器是不是IE9
  isLessThenIE10 () {
    const browser = navigator.appName
    const b_version = navigator.appVersion
    const version = b_version.split(';')
    if (version[1]) {
      const trim_Version = version[1].replace(/[ ]/g, '')
      if (browser === 'Microsoft Internet Explorer') {
        const version = parseFloat(trim_Version.substring(4, trim_Version.length))
        if (version < 10.0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
    } else {
      return false
    }
  },
  /**
   * Get a data of given precision, assuring the sum of percentages
   * in valueList is 1.
   * The largest remainer method is used.
   * https://en.wikipedia.org/wiki/Largest_remainder_method
   *
   * @param {Array.<number>} valueList a list of all data
   * @param {number} idx index of the data to be processed in valueList
   * @param {number} precision integer number showing digits of precision
   * @return {number} percent ranging from 0 to 100
   */
  getPercentWithPrecision (valueList, idx, precision) {
    if (!valueList[idx]) {
      return 0
    }

    var sum = valueList.reduce(function (acc, val) {
      return acc + (isNaN(val) ? 0 : val)
    }, 0)
    if (sum === 0) {
      return 0
    }

    var digits = Math.pow(10, precision)
    var votesPerQuota = valueList.map(function (val) {
      return (isNaN(val) ? 0 : val) / sum * digits * 100
    })
    var targetSeats = digits * 100

    var seats = votesPerQuota.map(function (votes) {
      // Assign automatic seats.
      return Math.floor(votes)
    })
    var currentSum = seats.reduce(function (acc, val) {
      return acc + val
    }, 0)

    var remainder = votesPerQuota.map(function (votes, idx) {
      return votes - seats[idx]
    })

    // Has remainding votes.
    while (currentSum < targetSeats) {
      // Find next largest remainder.
      var max = Number.NEGATIVE_INFINITY
      var maxId = null
      for (var i = 0, len = remainder.length; i < len; ++i) {
        if (remainder[i] > max) {
          max = remainder[i]
          maxId = i
        }
      }

      // Add a vote to max remainder.
      ++seats[maxId]
      remainder[maxId] = 0
      ++currentSum
    }

    return seats[idx] / digits
  },
  // 排序
  sortByOrder (data, propName, order) {
    return data.sort((a, b) => {
      if (a[propName] === b[propName]) return 0
      return order === 'desc'
        ? (a[propName] < b[propName] ? 1 : -1)
        : (a[propName] > b[propName] ? 1 : -1)
    })
  }
}
