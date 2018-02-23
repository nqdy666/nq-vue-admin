export function camelcaseToHyphen (str) {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export function fetchAll (getListPromise, {
  $limit = 200
} = {}) {
  return function (query = {}) {
    const all = []
    function next () {
      return getListPromise({
        ...query,
        $count: true,
        $offset: all.length,
        $limit
      }).then(res => {
        all.push(...res.items)
        if (res.items.length !== 0 && (res.count === undefined || all.length < res.count)) {
          return next()
        }
        return all
      })
    }
    return next()
  }
}
