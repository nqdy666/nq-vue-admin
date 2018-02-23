const code = `
// 使用例子
validate: {
  maxlength: {
    message: '不长于16个字符'
  }
}
// 校验规则源码
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
`
export default code
