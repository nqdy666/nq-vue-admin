const code = `
// 使用例子
validate: {
  max: {
    rule: 100,
    message: '最大值不能超过100'
  }
}
// 校验规则源码
function max (val, arg) {
  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg))
}
`
export default code
