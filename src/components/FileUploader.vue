<template>
  <div class="ui-file-upload">
    <div class="ui-upload-file" :title="file.name"
      v-for="(file, index) in files"
      @mouseover="showRemoveBtn(index)" @mouseout="hideRemoveBtn(index)">
      <div class="ui-upload-file-buttons">
        <span title="完成" :class="{ hidden: !file._successed }" class="fa fa-success"></span>
        <span title="移除" v-show="file.removeBtnShow" @click="removeImage(index)" class="fa fa-remove"></span>
      </div>
      <progress v-show="file.progress && file.progress < 100" class="progress is-small is-primary" :value="file.progress" max="100" :title="file.progress +　'%'">{{ file.progress +　'%'}}</progress>
      <div class="image-box" v-if="!!file">
        <img class="ui-upload-file-img"
          v-if="file.isImg"
          :src="file.preUrl" @error="loadImageError(index)"
          width="120" height="120" :alt="file.name">
        <div class="ui-upload-file-box" v-if="!file.isImg">
          <div class="ui-upload-file-icon fa fa-file"></div>
          <div class="ui-upload-file-name">{{ file.name }}</div>
        </div>
      </div>
    </div>
    <div :id="id" v-show="uploaderBtnShow"></div>
  </div>
</template>

<script>
  import WebUploader from 'webuploader'
  import Vue from 'vue'
  import { sGetUploadSession, sGetDentryList, getUploadUrl, getDownloadUrl } from 'apis/cs'
  import message from 'components/message'

  let count = 1

  export default {
    data () {
      return {
        id: 'fileWebuploadBtn' + count++,
        uploadFinishCallback: () => {},

        isSubmitting: false,
        // removeBtnShow: false,
        uploaderBtnShow: true,
        uploader: undefined,
        separator: '',

        files: [],
        multiple: false // 多文件上传标识
      }
    },
    mounted () {
      this.initWebuploader()
      this.isSubmitting = false
      this.initData()
    },
    beforeDestroy () {
      if (this.uploader) {
        this.uploader.destroy()
        this.uploader = undefined
      }
    },
    // beforeDestroy () {
    //   console.log('---0-0-0-0-0-0-')
    //   if (this.uploader) {
    //     this.uploader.destroy()
    //     this.uploader = undefined
    //   }
    // },
    props: {
      dentryId: {
        type: String,
        required: false,
        default: () => ''
      },
      extra: {
        type: Object,
        default () {}
      }
    },
    computed: {
      maxCount () {
        return (this.extra && this.extra.maxCount) || 1
      }
    },
    watch: {
      dentryId (val) {
        this.initData()
      }
    },
    methods: {
      initData () {
        this.files = [] // 清空数据
        this.multiple = this.extra.multi || false
        this.mimetype = this.extra.mimetype || 'image'

        const _separator = this.extra.separator || ','
        this.separator = _separator
        let dentryId = ''

        if (this.dentryId) {
          if (this.extra.multi) {
            if (typeof this.dentryId === 'string') {
              dentryId = this.dentryId.split(_separator)
            }
          } else {
            dentryId = [this.dentryId]
          }
          this.fetchDentryList(dentryId)
        }
      },
      fetchDentryList (ids) {
        sGetUploadSession().then(res => {
          sGetDentryList({
            dentry_ids: ids,
            session: res.session
          }).then(data => {
            if (data && data.items.length) {
              data.items.forEach(item => {
                const _id = item['dentry_id']
                let preUrl = ''
                let isImg = false
                if (this.mimetype === 'image') {
                  preUrl = getDownloadUrl(_id, { size: 120 })
                  isImg = true
                }

                this.files.push({
                  'dentry_id': _id,
                  name: item.name,
                  _successed: true,
                  removeBtnShow: false,
                  preUrl,
                  isImg
                })
                // 初始化页面元素 马上校验
                this.validateImmediate()
                // 初始化页面元素 显示标识
                this.isUploaderBtnShow()
              })
            }
          })
        }).catch(error => {
          this.uploadFinishCallback(error.message)
          message.info({
            message: `获取上传session失败${error.message}`,
            _id: Date.now()
          })
        })
      },
      // 上传按钮是否显示
      isUploaderBtnShow () {
        if (this.multiple) {
          this.uploaderBtnShow = this.files.length < this.maxCount
        } else {
          this.uploaderBtnShow = !this.files.length
        }
      },
      startUpload (callback) {
        const _files = this.files
        if (typeof (callback) === 'function') {
          this.uploadFinishCallback = callback
        }
        if (this.uploader && _files.length) {
          for (const file of _files) {
            if (file._error) {
              file._successed = false
              file._error = false
              file.progress = 0
            }
            if (file.progress === 0 || file._successed === false) {
              this.upload(file)
            } else {
              this.uploadCallback()
            }
          }
        } else {
          this.uploadFinishCallback({
            code: 'NO_SELECTED_IMAGE',
            message: '您还没有选择图片'
          })
        }
      },
      upload (file) {
        sGetUploadSession().then(res => {
          file.formData = {
            scope: 1, // 公开
            path: res.path,
            size: file.size,
            name: file.name
          }
          file.postAction = getUploadUrl(res.session)

          this.uploader.upload(file)
        }).catch(error => {
          this.uploadFinishCallback(error.message)
          message.info({
            message: `获取上传session失败${error.message}`,
            _id: Date.now()
          })
        })
      },
      uploadCallback () {
        if (this.files.every(file => file._successed)) {
          let dentryId = ''
          this.files.forEach((file, index, arr) => {
            dentryId += file['dentry_id']
            if (index + 1 < arr.length) {
              dentryId += this.separator
            }
          })
          this.uploadFinishCallback(null, { dentryId })
        }
      },
      removeImage (index) {
        if (this.files.length && this.files[index].hasOwnProperty('id')) {
          this.uploader.removeFile(this.files[index])
        }
        this.files.splice(index, 1)
        if (!this.multiple) {
          this.uploaderBtnShow = true
        }
        this.isUploaderBtnShow()
      },
      loadImageError (index) {
        this.removeImage(index)
      },
      validateImmediate () {
        this.$emit('imagechange', this.files)
      },
      initWebuploader () {
        if (!this.uploader) {
          const accept = this.extra.accept
          const fileNumLimit = this.extra.multi && this.maxCount
          const fileSingleSizeLimit = this.extra.maxSize

          this.uploader = WebUploader.create({
            pick: {
              id: `#${this.id}`,
              label: '+',
              multiple: this.extra.multi
            },
            thumb: {
              // 内容服务，仅支持 80,120,160,240,320,480,640,960
              width: 120,
              height: 120,
              quality: 100,
              // 必须 jpeg 否则 flash 环境下无法显示 png
              type: 'jpeg'
            },
            compress: false,
            accept,
            fileNumLimit,
            fileSingleSizeLimit,
            chunked: true,
            chunkSize: 5 * 1024 * 1024,
            formData: {}
          })

          this.uploader.on('beforeFileQueued', file => {
            if (this.isSubmitting) {
              message.info({
                message: '文件正在上传，不可添加新文件',
                _id: Date.now()
              })
              return false
            }
            return true
          })
          this.uploader.on('fileQueued', file => {
            if (this.mimetype !== 'image') {
              file.preUrl = ''
              file.isImg = false
              this.addFile(file)
            } else {
              this.uploader.makeThumb(file, (error, ret) => {
                if (error) {
                  this.uploader.removeFile(file)
                } else {
                  file.preUrl = ret
                  file.isImg = true
                  this.addFile(file)
                }
              })
            }
            // this.validateImmediate()
          })
          this.uploader.on('fileDequeued', file => { })
          this.uploader.on('startUpload', () => { })
          this.uploader.on('stopUpload', () => { })
          this.uploader.on('uploadFinished', () => { })
          this.uploader.on('uploadStart', file => {
            this.uploader.option('server', `${file.postAction}`)
            console.log('===========server:', this.uploader.options.server)
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
            file._error = reason || `上传文件${file.name}失败`
            message.info({
              message: `上传文件${file.name}失败, ${reason}`,
              _id: Date.now()
            })
          })
          this.uploader.on('uploadSuccess', (file, response) => {
            const dentryId = response['dentry_id']
            file['dentry_id'] = dentryId
            file._successed = true
            file.preUrl = getDownloadUrl(dentryId, { size: 120 })
            this.uploadCallback() // 上传成功回调
          })
          this.uploader.on('error', type => {
            if (type === 'Q_EXCEED_NUM_LIMIT') {
              message.info({
                message: '只允许添加' + fileNumLimit + '个logo文件',
                _id: Date.now()
              })
            } else if (type === 'F_DUPLICATE') {
              message.info({
                message: '该文件已经在上传的队列中',
                _id: Date.now()
              })
            } else if (type === 'Q_TYPE_DENIED') {
              message.info({
                message: '添加文件出错，不支持该文件类型',
                _id: Date.now()
              })
            } else if (type === 'F_EXCEED_SIZE') {
              message.info({
                message: '上传的图片应不大于' + fileSingleSizeLimit / (1024 * 1024) + 'M',
                _id: Date.now()
              })
            } else {
              message.info({
                message: `添加文件出错，${type}`,
                _id: Date.now()
              })
            }
          })
        }
      },
      addFile (file) {
        Vue.set(file, '_successed', false)
        Vue.set(file, '_error', false)
        Vue.set(file, 'progress', 0)
        Vue.set(file, 'removeBtnShow', false)

        this.files.push(file)

        if (!this.extra.multi) {
          this.uploaderBtnShow = false
        } else {
          this.uploaderBtnShow = this.files.length !== this.maxCount
        }
        this.validateImmediate()
      },
      showRemoveBtn (index) {
        this.files[index].removeBtnShow = true
      },
      hideRemoveBtn (index) {
        this.files[index].removeBtnShow = false
      },
      removeBtnToggle (file) {
        file.removeBtnShow = !file.removeBtnShow
      }
    }
  }
</script>
<style lang="less">
  .ui-file-upload {
    border: 1px solid #ccc;
    padding: 8px 5px 0 9px;
    border-radius: 3px;

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
      position: relative;
      .ui-upload-file-progress {
        z-index: 1;
        position: absolute;
        display: block;
      }
      .progress {
        position: absolute;
        z-index: 2;
        width: 120px;
        // bottom: 9px;
        top: 115px;
        margin: 0;
        color: #1fc8db;
      }
      .ui-upload-file-buttons {
        z-index: 1;
        position: absolute;
        .fa-success {
          margin-left: 5px;
          color: #97cd76;
        }
        .fa-remove {
          margin-left: 65px;
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
      .ui-upload-file-box {
        position: relative;
        width: 120px;
        height: 123px;
        text-align: center;
        .fa-file:before {
          font-size: 66px;
        }
        .ui-upload-file-name {
          overflow: hidden;
          text-align: center;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

</style>
