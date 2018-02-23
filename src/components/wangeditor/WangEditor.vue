<template>
  <div :id="'wang-editor' + id">
    <div :id="'wang-editor-text' + id" class="wang-editor"></div>
  </div>
</template>

<script>
  let count = 1

  import $ from 'jquery'
  import WangEditor from 'wangeditor'
//  import createCsimage from './csimage-menu'
  import createCsSubscript from './csSubscript-menu'
  import createCsSuperscript from './csSuperscript-menu'
  import createSourceMenu from './source-menu'
  import createFullScreenMenu from './fullscreen-menu'

  if (!__DEV__) {
    WangEditor.config.printLog = false
  }

//  createCsimage(WangEditor)
  createCsSubscript(WangEditor) // 加载下标菜单按钮
  createCsSuperscript(WangEditor) // 加载上标菜单按钮
  createSourceMenu(WangEditor)
  createFullScreenMenu(WangEditor)

  export default {
    data () {
      return {
        initHtml: this.transformHtml(this.value),
        id: count++
      }
    },
    mounted () {
      if (!this.editor) {
        this.editor = new WangEditor('wang-editor-text' + this.id)
        this.editor.config.menus = [
          'beauty-source',
          '|',
          'bold',
          'underline',
          'italic',
          'strikethrough',
          'cssubscript',
          'cssuperscript',
          'eraser',
          'forecolor',
          'bgcolor',
          '|',
          'quote',
          'fontfamily',
          'fontsize',
          'head',
          'unorderlist',
          'orderlist',
          'alignleft',
          'aligncenter',
          'alignright',
          '|',
          'link',
          'unlink',
          '|',
//          'csimage',
          'img',
          'video',
          '|',
          'undo',
          'redo',
          'fullscreen'
        ]
        this.editor.onchange = () => {
          this.emitValue()
        }
        this.editor.create()
      }
      this.reset()
      this.initEditorHtml(this.initHtml)
    },
    beforeDestroy () {
      if (this.editor) {
        this.initHtml = ''
        this.editor.destroy()
      }
    },
    methods: {
      initEditorHtml (html) {
        if (this.editor) {
          if (this.editor.$txt.html() !== html) {
            this.editor.$txt.html(html)
          }
          this.emitValue()
        }
      },
      transformHtml (val) {
        return val && val.replace('&amp;', '&')
      },
      emitValue () {
        this.$emit('input', this.editor.$txt.html(), this.editor.$txt.text())
      },
      reset () {
        // 强制关闭源码模式
        $(`#wang-editor${this.id}`).find('.wangeditor-menu-img-code').eq(1).trigger('click')
        // 强制关闭全屏模式
        $(`#wang-editor${this.id}`).find('.wangeditor-menu-img-shrink2').eq(0).trigger('click')
      }
    },
    watch: {
      value (val) {
        this.initHtml = this.transformHtml(val)
        this.initEditorHtml(val)
      }
    },
    props: {
      value: {
        type: String,
        default () {
          return ''
        }
      }
    }
  }
</script>
<style lang="less">
  .wang-editor {
    height: 224px !important;

    &.wangEditor-txt {
      background: white;
      padding-bottom: 20px !important;
    }

    b {
      font-weight: 700;
    }
  }

  .wangEditor-fullscreen {
    top: 53px !important;
  }
</style>
