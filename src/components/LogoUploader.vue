<template>
  <div class="ui-upload">
    <div class="ui-upload-file" :title="logoFile.name" v-show="imgShow"
        @mouseover="removeBtnShow = true" @mouseout="removeBtnShow = false">
      <div class="ui-upload-file-buttons">
        <span title="完成" :class="{ hidden: !successIconShow }" class="fa fa-success"></span>
        <span title="下载" :class="{ hidden: !successIconShow || !removeBtnShow }" @click="downloadImage" class="fa fa-download"></span>
        <span title="移除" v-show="removeBtnShow && !disabledDel" @click="removeImage" class="fa fa-remove"></span>
      </div>
      <progress v-show="progressShow" class="progress is-small is-primary" :value="logoFile.progress" max="100" :title="logoFile.progress +　'%'">{{ logoFile.progress +　'%'}}</progress>
      <div class="image-box">
        <img class="ui-upload-file-img" :src="imagePreviewUrl" @error="loadImageError" width="120" height="120" :alt="logoFile.name">
      </div>
    </div>
    <div :id="id" v-show="uploaderBtnShow"></div>
  </div>
</template>

<script>
  import WebUploader from 'webuploader'
  import Vue from 'vue'
  import { sGetUploadSession, getDownloadUrl, getUploadUrl } from 'apis/cs'
  import { prettySize } from 'utils/utilFunc'
  import message from 'components/message'

  let count = 1

  export default {
    data () {
      return {
        id: 'logoWebuploadBtn' + count++,
        uploadFinishCallback: () => {},
        mDentryId: '',
        imgShow: false,
        removeBtnShow: false,
        uploaderBtnShow: true,
        uploader: undefined,
        imagePreviewUrl: '',
        logoFile: {}
      }
    },
    computed: {
      progressShow () {
        return this.logoFile.progress && this.logoFile.progress < 100
      },
      successIconShow () {
        return this.mDentryId
      }
    },
    mounted () {
      this.initWebuploader()
      if (this.dentryId) {
        this.initImageUseDentryIdFromProp(this.dentryId)
      }
    },
    watch: {
      dentryId (val) {
        this.initImageUseDentryIdFromProp(val)
      }
    },
    beforeDestroy () {
      if (this.uploader) {
        this.uploader.destroy()
        this.uploader = undefined
      }
    },
    props: {
      dentryId: {
        type: String,
        required: false,
        default: () => ''
      },
      fileSingleSizeLimit: {
        type: Number,
        required: false,
        default () {
          return 2 * 1024 * 1024
        }
      },
      disabledDel: {
        type: Boolean,
        required: false,
        default () {
          return false
        }
      }
    },
    methods: {
      initImageUseDentryIdFromProp (dentryId) {
        if (this.logoFile.name) {
          this.uploader.removeFile(this.logoFile)
          this.logoFile = {}
        }
        this.setImagePreviewUrl(getDownloadUrl(dentryId, { size: 120 }))
        this.imgShow = true
        this.uploaderBtnShow = false
        this.mDentryId = dentryId
      },
      setImagePreviewUrl (value) {
        this.imagePreviewUrl = value
        this.$emit('imagechange', value)
      },
      startUpload (callback) {
        if (typeof (callback) === 'function') {
          this.uploadFinishCallback = callback
        }
        if (this.mDentryId) {
          this.uploadFinishCallback(null, { dentryId: this.mDentryId })
        } else {
          if (this.uploader && this.logoFile.name) {
            sGetUploadSession().then(res => {
              this.logoFile.formData = {
                scope: 1, // 公开
                path: res.path,
                size: this.logoFile.size,
                name: this.logoFile.name
              }
              this.logoFile.postAction = getUploadUrl(res.session)
              this.uploader.upload(this.logoFile)
            }).catch(error => {
              this.uploadFinishCallback(error.message)
              message.info({ message: `获取上传session失败${error.message}` })
            })
          } else {
            this.uploadFinishCallback({
              code: 'NO_SELECTED_IMAGE',
              message: '您还没有选择图片'
            })
          }
        }
      },
      removeImage () {
        if (this.imagePreviewUrl) {
          this.setImagePreviewUrl('')
        }
        this.imgShow = false
        this.uploaderBtnShow = true
        this.mDentryId = '' // 置空
        if (this.logoFile.name) {
          this.uploader.removeFile(this.logoFile)
          this.logoFile = {}
        }
      },
      downloadImage () {
        const dentryId = this.mDentryId
        const a = document.createElement('a')
        a.target = '_blank'
        a.href = getDownloadUrl(dentryId, { attachment: true })
        const isIE11 = (/Trident\/7\./).test(navigator.userAgent)
        if (a.fireEvent || isIE11) {
          window.open(getDownloadUrl(dentryId, { attachment: true }))
        } else {
          var evt = document.createEvent('MouseEvents')
          evt.initEvent('click', true, true)
          a.dispatchEvent(evt)
        }
      },
      loadImageError () {
        this.removeImage()
      },
      initWebuploader () {
        if (!this.uploader) {
          this.uploader = WebUploader.create({
            pick: {
              id: `#${this.id}`,
              label: '+',
              multiple: false
            },
            compress: false,
            accept: {
              title: '图片',
              extensions: 'jpg,jpeg,png',
              mimeTypes: 'image/jpg,image/jpeg,image/png'
            },
            fileNumLimit: 1,
            fileSingleSizeLimit: this.fileSingleSizeLimit,
            formData: {}
          })
          this.uploader.on('beforeFileQueued', file => {
          })
          this.uploader.on('fileQueued', file => {
            this.uploader.makeThumb(file, (error, ret) => {
              if (error) {
                this.uploader.removeFile(file)
              } else {
                this.logoFile = file
                this.setImagePreviewUrl(ret)
                this.imgShow = true
                this.uploaderBtnShow = false
              }
            })
          })
          this.uploader.on('fileDequeued', file => {
          })
          this.uploader.on('startUpload', () => {
          })
          this.uploader.on('stopUpload', () => {
          })
          this.uploader.on('uploadFinished', () => {
          })
          this.uploader.on('uploadStart', file => {
            this.uploader.option('server', `${file.postAction}`)
          })
          this.uploader.on('uploadBeforeSend', (block, data, headers) => {
            Object.assign(data, block.file.formData)
            delete data.id
            delete data.type
            delete data.lastModifiedDate
          })
          this.uploader.on('uploadProgress', (file, percentage) => {
            const progress = 100 * percentage.toFixed(2)
            Vue.set(file, 'progress', progress)
          })
          this.uploader.on('uploadError', (file, reason) => {
            this.uploadFinishCallback(reason)
            message.info({ message: `上传文件${file.name}失败, ${reason}` })
          })
          this.uploader.on('uploadSuccess', (file, response) => {
            this.mDentryId = response.dentry_id
            this.uploadFinishCallback(null, { dentryId: this.mDentryId })
          })
          this.uploader.on('error', type => {
            if (type === 'Q_EXCEED_NUM_LIMIT') {
              message.info({ message: '只允许添加一个logo文件' })
            } else if (type === 'F_DUPLICATE') {
              message.info({ message: '该文件已经在上传的队列中' })
            } else if (type === 'Q_TYPE_DENIED') {
              message.info({ message: '添加文件出错，不支持该文件类型' })
            } else if (type === 'F_EXCEED_SIZE') {
              message.info({ message: '上传的图片应不大于' + prettySize(this.fileSingleSizeLimit) })
            } else {
              message.info({ message: `添加文件出错，${type}` })
            }
          })
        }
      }
    }
  }
</script>
<style lang="less">
  .ui-upload {
    border: 1px solid #ccc;
    padding: 8px 5px 0 9px;
    border-radius: 3px;
    display:inline-block;

    .webuploader-container {
      position: relative;
      display:inline-block;
    }
    .webuploader-element-invisible {
      position: absolute !important;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
      clip: rect(1px,1px,1px,1px);
    }
    .webuploader-pick {
      position: relative;
      cursor: pointer;
      text-align: center;
      overflow: hidden;
      width: 120px;
      height: 120px;
      color: #575757;
      font-size: 4em;
      line-height: 115px;
      margin: 0 5px 5px 0;
      margin: 0 .25rem .25rem 0;
      background-color: #fff;
      border: 1px solid #e6e6e6;
    }
    .webuploader-pick-hover {
      color: #e7604a;
      background-color: #f0f0f0;
    }
    .webuploader-pick-disable {
      opacity: 0.6;
      pointer-events:none;
    }

    .ui-upload-file {
      display:inline-block;
      .ui-upload-file-progress {
        z-index: 1;
        position: absolute;
        display: block;
      }
      .progress {
        position: absolute;
        z-index: 2;
        width: 120px;
        margin: 0;
        margin-top: 111px;
        color: #1fc8db;
      }
      .ui-upload-file-buttons {
        z-index: 1;
        position: absolute;
        .fa-success {
          position: absolute;
          margin-left: 5px;
          color: #97cd76;
        }
        .fa-download {
          position: absolute;
          margin-left: 28px;
          margin-top: -2px;
          color: #1E90FF;
        }
        .fa-remove {
          position: absolute;
          margin-left: 94px;
          margin-top: -2px;
          color: #ed6c63;
        }
      }
      .image-box {
        padding-right: 4px;
        padding-bottom: 1px;
      }
      .ui-upload-file-img {
        position: relative;
        width: 120px;
        height: 123px;
      }
    }
  }

</style>
