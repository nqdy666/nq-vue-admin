const code = `
// 使用例子
validate: {
  email: {
    message: '请输入正确的邮箱地址'
  }
}
// 校验规则源码
function email (val) {
  return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]+$/.test(val)
}
`
export default code
