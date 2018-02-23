const code = `
// 使用例子
validate: {
  reg: {
    rule: /^[a-z_]+$/,
    message: '只能小写英文或下划线'
  }
}
// 校验规则源码
function reg (val, arg) {
  return arg.test(val)
}
`
export default code
