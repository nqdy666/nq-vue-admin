const code = `
// 使用例子
validate: {
  minBeginTime: {
    rule: new Date().getTime(),
    message: '活动开始时间必须大于等于当前时间'
  }
}
// 校验规则源码
function minBeginTime (val, arg) {
  return val && !isNaN(+(arg)) && val.startime && val.startime >= arg
}
`
export default code
