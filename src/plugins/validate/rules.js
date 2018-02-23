/**
 * From: https://github.com/vuejs/vue-validator
 */

/**
 * Fundamental validate functions
 */

/**
 * required
 *
 * This function validate whether the value has been filled out.
 *
 * @param {*} val
 * @return {Boolean}
 */

import moment from 'moment'

// 递归判断对象是否为空
function isObjectEmpty (obj) {
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

export function required (val) {
  if (Array.isArray(val)) {
    if (val.length !== 0) {
      return true
    } else {
      return false
    }
  } else if (typeof val === 'number' || typeof val === 'function') {
    return true
  } else if (typeof val === 'boolean') {
    return val
  } else if (typeof val === 'string') {
    return val.trim().length > 0
  } else if (val !== null && typeof val === 'object') {
    return !isObjectEmpty(val)
  } else if (val === null || val === undefined) {
    return false
  }
}

/**
 * pattern
 *
 * This function validate whether the value matches the regex pattern
 *
 * @param val
 * @param {String} pat
 * @return {Boolean}
 */

export function pattern (val, pat) {
  if (typeof pat !== 'string') { return false }

  const match = pat.match(new RegExp('^/(.*?)/([gimy]*)$'))
  if (!match) { return false }

  return new RegExp(match[1], match[2]).test(val)
}

/**
 * minlength
 *
 * This function validate whether the minimum length.
 *
 * @param {String|Array} val
 * @param {String|Number} min
 * @return {Boolean}
 */

export function minlength (val, min) {
  if (typeof val === 'number') {
    val = val + ''
  }
  if (typeof val === 'string') {
    return isInteger(min, 10) && val.length >= parseInt(min, 10)
  } else if (Array.isArray(val)) {
    return val.length >= parseInt(min, 10)
  } else {
    return false
  }
}

/**
 * maxlength
 *
 * This function validate whether the maximum length.
 *
 * @param {String|Array} val
 * @param {String|Number} max
 * @return {Boolean}
 */

export function maxlength (val, max) {
  if (typeof val === 'number') {
    val = val + ''
  }
  if (typeof val === 'string') {
    return isInteger(max, 10) && val.length <= parseInt(max, 10)
  } else if (Array.isArray(val)) {
    return val.length <= parseInt(max, 10)
  } else {
    return false
  }
}

/**
 * min
 *
 * This function validate whether the minimum value of the numberable value.
 *
 * @param {*} val
 * @param {*} arg minimum
 * @return {Boolean}
 */

export function min (val, arg) {
  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg))
}

/**
 * max
 *
 * This function validate whether the maximum value of the numberable value.
 *
 * @param {*} val
 * @param {*} arg maximum
 * @return {Boolean}
 */

export function max (val, arg) {
  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg))
}

/**
 * url
 * @param val
 * @returns {boolean}
 */
export function url (val) {
  const reg = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  return reg.test(val)
}

/**
 * 正整数
 * @param val
 * @returns {boolean}
 */
export function unsignInt (val) {
  return /^[1-9]\d*|0$/.test(val) && val <= 0x7fffffff
}

/**
 * 有效时间 起始时间和结束时间不为空
 * @param val
 * @returns
 */
export function rangeTime (val) {
  return val && val.startime && val.endtime && val.startime < val.endtime
}

/**
 * 起始时间是周一，結束时间是周天
 * @param val
 * @returns
 */
export function weeklyRangeDay (val) {
  return val && val.startime && val.endtime && moment(val.startime).isoWeekday() === 1 && moment(val.endtime).isoWeekday() === 7 && (val.endtime - val.startime === 1000 * 60 * 60 * 24 * 6)
}

/**
 * 最小的开始时间
 * @param val
 * @returns {*|boolean}
 */
export function minBeginTime (val, arg) {
  return val && !isNaN(+(arg)) && val.startime && val.startime >= arg
}

/**
 * 结果是数组，且恰好满足个数
 * @param val
 * @param arg
 * @returns {boolean}
 */
export function count (val, arg) {
  return Array.isArray(val) && !isNaN(+(arg)) && val.filter(item => item).length === arg
}

/**
 * 支持正则表达式
 * @param val
 * @returns {boolean}
 */
export function reg (val, arg) {
  return arg.test(val)
}

/**
 * 支持函数校验
 * @param val 值
 * @param arg 函数校验
 * @returns {*}
 */
export function func (val, arg) {
  return arg(val)
}

/**
 * isInteger
 *
 * This function check whether the value of the string is integer.
 *
 * @param {String} val
 * @return {Boolean}
 * @private
 */

export function isInteger (val) {
  return /^(-?[1-9]\d*|0)$/.test(val)
}

/**
 * email
 *
 * This function check whether the value of the string is email.
 *
 * @param {String} val
 * @return {Boolean}
 * @private
 */

export function email (val) {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/.test(val)
}

/**
 * phone
 *
 * This function check whether the value of the string is phone.
 *
 * @param {String} val
 * @return {Boolean}
 * @private
 */

export function phone (val) {
  return /^1[34578]\d{9}$/.test(val)
}
