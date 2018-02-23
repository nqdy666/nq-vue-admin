// 解析 getter、actions、state，支持别名和模块名
export function analysisMap (value, scope) {
  let alias = value

  // 解析 scope/value 格式
  // 'scope/value' -> ['scope', 'value']
  // 'scope/value as value1' -> ['scope', 'value as value1']
  const formatAnalysis = value.split('/')
  if (formatAnalysis.length === 2) {
    scope = formatAnalysis[0]
    alias = value = formatAnalysis[1]
  }

  // 解析 as 别名
  // 'value as value1' -> ['value', 'value1']
  const aliasAnalysis = value.split(/\s+as\s+/)
  if (aliasAnalysis.length === 2) {
    value = aliasAnalysis[0]
    alias = aliasAnalysis[1]
  }

  return { scope, value, alias }
}
