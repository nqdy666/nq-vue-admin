const code = `
// 使用例子
validate: {
  unsignInt: {
    message: '请输入正整数'
  }
}
// 校验规则源码
function unsignInt (val) {
  return /^[1-9]\d*|0$/.test(val) && val <= 0x7fffffff
}
`
export default code
