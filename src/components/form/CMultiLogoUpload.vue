<template>
  <div class="m-logo-uploader">
    <logo-uploader class="uploader" v-for="item in count" :key="item"
      :dentry-id="value && value[item - 1]"
      :file-single-size-limit="extra.fileSingleSizeLimit"
      :disabled-del="extra.disabledDel"
      v-bind="attrs"
      @imagechange="imageChangeEvent(item, arguments)">
    </logo-uploader>
  </div>
</template>

<script>
  import mField from './mField'
  import LogoUploader from '../LogoUploader'
  import Vue from 'vue'

  export default {
    mixins: [mField],
    data () {
      return {
        // 自定义的校验值
        customValidateValue: []
      }
    },
    computed: {
      count () {
        if (this.extra && this.extra.count && this.extra.count > 0) {
          return this.extra.count
        }
        return 1
      }
    },
    methods: {
      // 覆盖mixins的方法发送的mutate方法， upload特殊，需要发送promise对象
      mutate () {
        const promiseList = []
        for (const item of this.$children) {
          promiseList.push(new Promise((resolve, reject) => {
            item.startUpload((err, { dentryId } = {}) => {
              if (!err) {
                resolve(dentryId)
              } else {
                if (typeof (err) === 'string') {
                  reject({
                    field: this.field,
                    message: err
                  })
                } else {
                  if (err.code === 'NO_SELECTED_IMAGE' && (!this.validate || !this.validate.required)) {
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
          }))
        }
        return Promise.all(promiseList)
      },
      // 图片发现变化的回调事件
      imageChangeEvent (index, [imageData] = []) {
        // upload自定义校验的值为img对象url数据
        Vue.set(this.customValidateValue, index, imageData)
        // 图片发送变化，强制触发校验
        this._validate(true)
      },
      reset () {
        this.isResetFlag = true
        // 如果prop传进来的dentryId没有值，就删除image图像，防止选择图像后，再重回表单页面，无法重置旧图像
        if (!this.initValue) {
          for (const item of this.$children) {
            item.removeImage()
          }
        }
      }
    },
    components: {
      'logo-uploader': LogoUploader
    }
  }
</script>
<style lang="less">
  .m-logo-uploader {
    .uploader {
      margin-right: 10px;
    }
  }
</style>