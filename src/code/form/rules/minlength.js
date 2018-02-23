const code = `
// 使用例子
validate: {
  minlength: {
    rule: 10,
    message: '不少于10个字符'
  }
}
// 校验规则源码
function minlength (val, min) {
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
`
export default code
