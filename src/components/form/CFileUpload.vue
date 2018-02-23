<template>
  <file-uploader
    :field="field"
    :dentry-id="value"
    ref="upload"
    v-bind="attrs"
    :extra="extra"
    @imagechange="imageChangeEvent">
  </file-uploader>
</template>

<!-- @imagechange="imageChangeEvent" -->
<script>
  import mField from './mField'
  import FileUploader from '../FileUploader'

  export default {
    mixins: [mField],
    data () {
      return {
        // 自定义的校验值
        customValidateValue: ''
      }
    },
    methods: {
      // 覆盖mixins的方法发送的mutate方法， upload特殊，需要发送promise对象
      mutate () {
        return new Promise((resolve, reject) => {
          this.$refs.upload.startUpload((err, { dentryId } = {}) => {
            if (!err) {
              resolve(dentryId)
            } else {
              if (typeof (err) === 'string') {
                reject({
                  field: this.field,
                  message: err
                })
              } else {
                if (err.code === 'NO_SELECTED_IMAGE') {
                  resolve('')
                } else {
                  reject({
                    field: this.field,
                    message: err.message
                  })
                }
              }
            }
          })
        })
      },
      // 图片发现变化的回调事件
      imageChangeEvent (imageData) {
        // upload自定义校验的值为img对象url数据
        this.customValidateValue = imageData
        // 图片发送变化，强制触发校验
        this._validate(true)
      },
      // 覆盖mixins中的重置
      reset () {
        this.isResetFlag = true
        // 如果prop传进来的dentryId没有值，就删除image图像，防止选择图像后，再重回表单页面，无法重置旧图像
        if (!this.initValue) {
          this.$refs.upload.removeImage()
        }
      }
    },
    components: {
      FileUploader
    }
  }
</script>
