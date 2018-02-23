import ImageSelect from './image-select.js'

let instance

// 单例
function getInstance () {
  instance = instance || ImageSelect.newInstance()
  return instance
}

export default getInstance()
