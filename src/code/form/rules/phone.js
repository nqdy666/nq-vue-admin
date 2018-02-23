const code = `
// 使用例子
validate: {
  phone: {
    message: '请输入手机号码'
  }
}
// 校验规则源码
function phone (val) {
  return /^1[34578]\d{9}$/.test(val)
}
`
export default code
