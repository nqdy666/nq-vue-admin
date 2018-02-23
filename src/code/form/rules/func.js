const code = `
// 使用例子
validate: {
  func: {
    message: '根据函数校验规则填写提示信息'
  }
}
// 校验规则源码
function func (val, arg) {
  return arg(val)
}
`
export default code
