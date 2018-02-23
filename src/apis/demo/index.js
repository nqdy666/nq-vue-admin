import datum from './data'
/**
 * 创建数据
 */
export function sAddData (data) {
  return new Promise(resolve => {
    datum.push({ ...data, id: datum[datum.length - 1].id + 1 })
    setTimeout(() => {
      resolve(data)
    }, 100)
  })
}

/**
 * 修改数据
 */
export function sModifyData (id, data) {
  return new Promise(resolve => {
    const oldData = datum.filter(item => String(item.id) === String(id))[0]
    const newData = Object.assign({}, oldData, data)
    datum.splice(datum.indexOf(oldData), 1, newData)
    setTimeout(() => {
      resolve(newData)
    }, 100)
  })
}

/**
 * 通过ID删除数据
 */
export function sDeleteData (id) {
  return new Promise(resolve => {
    const oldData = datum.filter(item => String(item.id) === String(id))[0]
    const delData = datum.splice(datum.indexOf(oldData), 1)
    setTimeout(() => {
      resolve(delData)
    }, 100)
  })
}

/**
 * 通过ID获取数据
 */
export function sGetData (id) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(datum.filter(item => String(item.id) === String(id))[0])
    }, 100)
  })
}

/**
 * 获数据列表
 */
export function sGetDataList ({
  name,  // 名称
  enable, // 启用状态
  begin_timestamp, // 开始时间
  end_timestamp, // 结束时间
  $count = true, // 总数量显示, 选填，默认false
  $offset = 0, // 偏移量, 选填，默认0
  $limit = 20, // 页大小， 选填，默认20
  order // 排序
}) {
  const filterDatum = datum.filter(item => {
    let ret = true
    if (name) {
      ret = ret && (item.name.indexOf(name) !== -1)
    }
    if (enable) {
      ret = ret && item.enable === enable
    }
    if (begin_timestamp) {
      ret = ret && item.create_time >= begin_timestamp
    }
    if (end_timestamp) {
      ret = ret && item.create_time <= end_timestamp
    }
    return ret
  })
  if (order) {
    filterDatum.sort((a, b) => {
      if (order === 'asc') {
        return a.value > b.value ? 1 : -1
      } else if (order === 'desc') {
        return a.value < b.value ? 1 : -1
      }
      return 0
    })
  }
  const ret = {
    items: filterDatum.slice($offset, $offset + Number($limit))
  }
  if ($count) {
    ret.count = filterDatum.length
  }
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(ret)
    }, 100)
  })
}
