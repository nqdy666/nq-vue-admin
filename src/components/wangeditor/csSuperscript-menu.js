import $ from 'jquery'

export default E => {
  E.createMenu(function (check) {
    const menuId = 'cssuperscript'
    // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
    if (!check(menuId)) {
      return
    }
    const editor = this
    const menu = new E.Menu({
      editor,
      id: menuId,
      title: '上标',
      // 正常状态和选中状态下的dom对象，样式需要自定义
      $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-super-script"></i></a>'),
      $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-super-script"></i></a>'),
      commandName: 'superscript'
    })

    menu.clickEventSelected = function (e) {
      var isRangeEmpty = editor.isRangeEmpty()
      if (!isRangeEmpty) {
        // 如果选区有内容，则执行基础命令
        editor.command(e, 'superscript')
      } else {
        // 如果选区没有内容
        editor.commandForElem('u,a', e, 'superscript')
      }
    }

    editor.menus[menuId] = menu
  })
}
