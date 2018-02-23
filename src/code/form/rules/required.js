const code = `
// 使用例子
validate: {
  required: {
    message: '请输入名称'
  }
}
// 校验规则源码
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

function required (val) {
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
`
export default code
