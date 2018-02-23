import $ from 'jquery'
import imageSelectDialog from 'components/image-select'

export default E => {
  E.createMenu(function (check) {
    const menuId = 'csimage'
    // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
    if (!check(menuId)) {
      return
    }
    const editor = this
    const menu = new E.Menu({
      editor,
      id: menuId,
      title: '图片',
      // 正常状态和选中状态下的dom对象，样式需要自定义
      $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-picture"></i></a>'),
      $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-picture"></i></a>')
    })
    // 菜单正常状态下，点击将触发该事件
    menu.clickEvent = function (e) {
      imageSelectDialog.show(selectedImages => {
        for (const imageUrl of selectedImages) {
          editor.command(e, 'insertHtml', `<img src="${imageUrl}"/>`)
        }
      })
    }
    editor.menus[menuId] = menu
  })
}
