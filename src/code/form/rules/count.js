const code = `
// 使用例子
validate: {
  count: {
    rule: 3,
    message: '请上传三张图片'
  }
}
// 校验规则源码
function count (val, arg) {
  return Array.isArray(val) && !isNaN(+(arg)) && val.filter(item => item).length === arg
}
`
export default code
