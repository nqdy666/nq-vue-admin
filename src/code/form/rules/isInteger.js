const code = `
// 使用例子
validate: {
  isInteger: {
    message: '请输入整数'
  }
}
// 校验规则源码
function isInteger (val) {
  return /^(-?[1-9]\d*|0)$/.test(val)
}
`
export default code
