const itemData = {
  id: '?',
  name: '名称',
  value: 1,
  progress: 10,
  enable: 1,
  description: '我是描述',
  logo_dentry_id: '7247aae7-fe3c-42d0-939e-2fdb65b49963',
  publish_time: 1506761572000,
  create_time: 1506761572000
}

const items = []
for (let i = 0; i < 21; i++) {
  items.push(Object.assign({}, itemData, {
    id: i,
    name: itemData.name + i,
    value: i + 1,
    create_time: itemData.create_time + 1000 * 60 * 60 * 24 * i }))
}

export default items
