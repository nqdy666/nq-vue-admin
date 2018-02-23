/**
 * 将路由转成带前缀的绝对路由
 * @method addPrefixToPath
 * @param  {array}        prefixes 路由前缀
 * @param  {string}       path    路由
 */
export function addPrefixToPath (prefixes, path) {
  // 首字母为 `/`，则只取根 prefix
  const prefix = path.charAt(0) === '/' ? prefixes[0] : prefixes.join('/')
  return `/${prefix}/${path}`.replace(/\/+$/, '').replace(/\/\/+/g, '/') || '/'
}
