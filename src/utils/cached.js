import { SessionStorage } from 'utils/config'

// 缓存在内存中
export function promiseCached (fn) {
  const cache = Object.create(null)
  return function cachedFn (str) {
    let key = str
    if (typeof str === 'object') {
      key = JSON.stringify(str)
    }
    const hit = cache[key]
    return hit
      ? Promise.resolve(cache[key])
      : fn(str).then(res => {
        cache[key] = res
        return Promise.resolve(res)
      })
  }
}

// 缓存在sessionStorage中
export function promiseSessionStorageCached (fn, storageKey) {
  const cache = SessionStorage.get(storageKey) || Object.create(null)
  return function cachedFn (str) {
    let key = str
    if (typeof str === 'object') {
      key = JSON.stringify(str)
    }
    const hit = cache[key]
    return hit
      ? Promise.resolve(cache[key])
      : fn(str).then(res => {
        cache[key] = res
        SessionStorage.set(storageKey, cache)
        return Promise.resolve(res)
      })
  }
}
