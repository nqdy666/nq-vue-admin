import vImageSelectDialog from './ImageSelectDialog.vue'
import Vue from 'vue'

/**
 * 创建图片选择组件，并插入到body下，暴露组件方法提供其他组件调用
 * 插入body下，弹窗时可以确保整个屏幕居中
 */
vImageSelectDialog.newInstance = () => {
  const div = document.createElement('div')
  div.innerHTML = '<v-image-select-dialog></v-image-select-dialog>'
  document.body.appendChild(div)
  const imageSelectDialog = new Vue({
    el: div,
    data: {},
    components: { vImageSelectDialog }
  }).$children[0]
  return {
    show (callback) {
      // 每次显示只允许有一个事件再监听
      imageSelectDialog.$off('selected')
      imageSelectDialog.$on('selected', callback)
      imageSelectDialog.show()
    },
    hide () {
      imageSelectDialog.hide()
    },
    components: imageSelectDialog,

    destroyed () {
      document.body.removeChild(div)
    }
  }
}
export default vImageSelectDialog
