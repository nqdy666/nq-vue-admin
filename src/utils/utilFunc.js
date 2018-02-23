// Date format
function add0 (m) {
  return m < 10 ? '0' + m : m
}

export function dateFormat (timeStamp, isShort) {
  // 时间戳是整数，否则要parseInt转换
  if (!timeStamp) {
    return '-'
  }
  isShort = isShort === true
  const time = new Date(timeStamp)
  const y = time.getFullYear()
  const m = time.getMonth() + 1
  const d = time.getDate()
  const h = time.getHours()
  const mm = time.getMinutes()
  const s = time.getSeconds()
  return !isShort ? y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s) : y + '-' + add0(m) + '-' + add0(d)
}

export function isPromise (payload) {
  return payload && payload.then
}

export function strTrim (value) {
  const isString = value && value.replace
  if (!isString) {
    return value
  }
  return value.replace(/^\s+|\s+$/g, '')
}

export function strEllipsisOver120 (value) {
  const isString = value && value.replace
  if (!isString || value.length <= 120) {
    return value
  }
  return value.substr(0, 120) + '...'
}

export function prettySize (size) {
  if (!size) {
    return ''
  }
  const ENUM = [' B', ' KB', ' MB', ' GB', ' TB']
  let i = 0
  const kilo = 1024
  while (size >= kilo) {
    size /= kilo
    i++
  }
  return size.toFixed(2).replace(/\.00|0$/g, '') + ENUM[i]
}

// 递归判断对象是否为空
export function isObjectEmpty (obj) {
  if (obj && obj.toString() === '[object Object]') {
    let ret = true
    for (const key of Object.keys(obj)) {
      ret = ret && isObjectEmpty(obj[key])
    }
    return ret
  } else {
    return !obj
  }
}

export function escapeChars (str) {
  str = str.replace(/&/g, '&amp;')
  str = str.replace(/</g, '&lt;')
  str = str.replace(/>/g, '&gt;')
  str = str.replace(/'/g, '&acute;')
  str = str.replace(/"/g, '&quot;')
  str = str.replace(/\|/g, '&brvbar;')
  return str
}
