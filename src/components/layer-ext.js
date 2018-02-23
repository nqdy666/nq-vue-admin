import layer from 'layer-dialog'

const cache = layer.cache || {}
const skin = function (type) {
  return (cache.skin ? (' ' + cache.skin + ' ' + cache.skin + '-' + type) : '')
}

if (!layer.prompt) {
  // 仿系统prompt
  layer.prompt = function (options, yes) {
    options = options || {}
    if (typeof options === 'function') yes = options
    let prompt

    const maxlengthStr = options.maxlength ? 'maxlength=' + options.maxlength : ''

    const content = options.formType === 2
      ? '<textarea class="layui-layer-input" ' + maxlengthStr + '>' + (options.value || '') + '</textarea>'
      : (function () {
        return '<input type="' + (options.formType === 1 ? 'password' : 'text') + '" style="width:100%" class="layui-layer-input" value="' + (options.value || '') + '" ' + maxlengthStr + '>'
      }())
    return layer.open($.extend({
      btn: ['&#x786E;&#x5B9A;', '&#x53D6;&#x6D88;'],
      content,
      skin: 'layui-layer-prompt' + skin('prompt'),
      success (layero) {
        prompt = layero.find('.layui-layer-input')
        prompt.focus()
      }, yes (index) {
        const value = prompt.val()
        if (value.trim() === '') {
          prompt.focus()
        } else if (value.length > (options.maxlength || 500)) {
          layer.tips('&#x6700;&#x591A;&#x8F93;&#x5165;' + (options.maxlength || 500) + '&#x4E2A;&#x5B57;&#x6570;', prompt, { tips: 1 })
        } else {
          yes && yes(value, index, prompt)
        }
      }
    }, options))
  }
}

export default layer
