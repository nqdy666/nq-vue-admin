const code = `
// 注册
import Validator, { addRule } from 'plugins/validate'
addRule('equal', function (val, arg) {
  if (val === arg) return true
  return false
})
Vue.use(Validator)

// 使用
validate: {
  equal: {
    rule: 100
    message: '值必须是100'
  }
}
`
export default code
