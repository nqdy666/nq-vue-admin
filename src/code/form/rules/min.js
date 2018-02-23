const code = `
// 使用例子
validate: {
  min: {
    rule: 100,
    message: '不能小于100'
  }
}
// 校验规则源码
function min (val, arg) {
  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg))
}
`
export default code
