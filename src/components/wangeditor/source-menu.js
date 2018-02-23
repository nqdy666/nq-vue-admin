import $ from 'jquery'
import htmlformat from 'htmlformat'

export default E => {
  E.createMenu(function (check) {
    var menuId = 'beauty-source'
    if (!check(menuId)) {
      return
    }
    var editor = this
    var txtHtml

    const menu = new E.Menu({
      editor,
      id: menuId,
      title: '源码',
      // 正常状态和选中状态下的dom对象，样式需要自定义
      $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-code"></i></a>'),
      $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-code"></i></a>')
    })

    menu.isShowCode = false

    // 更新内容
    function updateValue () {
      var $code = menu.$codeTextarea
      var $txt = editor.txt.$txt
      var value = $.trim($code.val()) // 取值

      if (!value) {
        value = '<p><br></p>'
      }

      // 过滤js代码
      if (editor.config.jsFilter) {
        value = value.replace(/<script[\s\S]*?<\/script>/ig, '')
      }
      // 赋值
      $txt.html(value)
    }

    // 定义click事件
    menu.clickEvent = function (e) {
      var self = this
      var editor = self.editor
      var $txt = editor.txt.$txt
      var txtOuterHeight = $txt.outerHeight()
      var txtHeight = $txt.height()

      if (!self.$codeTextarea) {
        self.$codeTextarea = $('<textarea class="code-textarea"></textarea>')
      }
      var $code = self.$codeTextarea
      $code.css({
        height: txtHeight,
        'margin-top': txtOuterHeight - txtHeight
      })

      // 赋值
      $code.val(htmlformat($txt.html(), 2))

      // 渲染
      $txt.after($code).hide()
      $code.show()

      // 更新状态
      menu.isShowCode = true

      // 执行 updateSelected 事件
      this.updateSelected()

      // 禁用其他菜单
      editor.disableMenusExcept('beauty-source')

      // 记录当前html值
      txtHtml = $txt.html()
    }

    // 定义选中状态下的click事件
    menu.clickEventSelected = function (e) {
      var self = this
      var editor = self.editor
      var $txt = editor.txt.$txt
      var $code = self.$codeTextarea

      if (!$code) {
        return
      }

      // 更新内容
      updateValue()

      // 渲染
      $code.after($txt).hide()
      $txt.show()

      // 更新状态
      menu.isShowCode = false

      // 执行 updateSelected 事件
      this.updateSelected()

      // 启用其他菜单
      editor.enableMenusExcept('source')

      // 判断是否执行 onchange 事件
      if ($txt.html() !== txtHtml) {
        if (editor.onchange && typeof editor.onchange === 'function') {
          editor.onchange(editor)
        }
      }
    }

    // 定义切换选中状态事件
    menu.updateSelectedEvent = function () {
      return this.isShowCode
    }

    // 增加到editor对象中
    editor.menus[menuId] = menu
  })
}
