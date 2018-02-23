const code = `
// 使用例子
validate: {
  rangeTime: {
    message: '请选择正确的有效时间'
  }
}
// 校验规则源码
function rangeTime (val) {
  return val && val.startime && val.endtime && val.startime < val.endtime
}
`
export default code
