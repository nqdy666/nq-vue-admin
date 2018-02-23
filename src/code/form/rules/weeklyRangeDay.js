const code = `
// 使用例子
validate: {
  weeklyRangeDay: {
    message: '开始时间必须是周一，结束时间必须周天，且刚好相差7天'
  }
}
// 校验规则源码
function weeklyRangeDay (val) {
  return val && val.startime && val.endtime && moment(val.startime).isoWeekday() === 1 && moment(val.endtime).isoWeekday() === 7 && (val.endtime - val.startime === 1000 * 60 * 60 * 24 * 6)
}
`
export default code
