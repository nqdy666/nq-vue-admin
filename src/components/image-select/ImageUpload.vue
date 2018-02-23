<template>
  <div class="image-upload">
    <div :id="id">本地上传</div>
  </div>
</template>

<script>
  import WebUploader from 'webuploader'
  import message from 'components/message'
  import { sGetUploadSession, getUploadUrl } from 'apis/cs'

  let count = 1

  export default {
    data () {
      return {
        fileNumLimit: 5,
        fileSingleSizeLimit: 2, // 单位为M
        id: 'qWebUpload' + (count++)
      }
    },
    methods: {
      init () {
        if (!this.uploader) {
          this.uploader = WebUploader.create({
            pick: {
              id: '#' + this.id,
              multiple: true
            },
            compress: false,
            accept: {
              title: '图片',
              extensions: 'gif,jpg,jpeg,bmp,png',
              mimeTypes: 'image/*'
            },
            fileNumLimit: this.fileNumLimit,
            fileSingleSizeLimit: this.fileSingleSizeLimit * 1024 * 1024,
            formData: {}
          })
          this.uploader.on('beforeFileQueued', file => {})
          this.uploader.on('fileQueued', file => {
            cs.sGetUploadSession({
              path: '/images'
            }).then(data => {
              file.formData = {
                scope: 1, // 公开
                path: data.path,
                size: file.size,
                name: file.name
              }
              file.postAction = getUploadUrl(data.session)
              this.uploader.upload(file)
            })
          })
          this.uploader.on('fileDequeued', file => {})
          this.uploader.on('startUpload', () => {})
          this.uploader.on('stopUpload', () => {})
          this.uploader.on('uploadStart', file => {
            file.closeLoading = message.loading(`${file.name}上传中...`, 0)
            this.uploader.option('server', `${file.postAction}`)
          })
          this.uploader.on('uploadBeforeSend', (block, data, headers) => {
            Object.assign(data, block.file.formData)
            delete data.id
            delete data.type
            delete data.lastModifiedDate
          })
          this.uploader.on('uploadProgress', (file, percentage) => {})
          this.uploader.on('uploadError', (file, reason) => {
            file.closeLoading()
            this.uploader.removeFile(file)
          })
          this.uploader.on('uploadSuccess', (file, response) => {
            file.closeLoading()
            message.warning(`${file.name}上传成功`)
            this.$emit('uploadsuccess')
            this.uploader.removeFile(file)
          })
          this.uploader.on('uploadFinished', () => {})
          this.uploader.on('error', type => {
            if (type === 'F_EXCEED_SIZE') {
              message.warning(`图片大小超过${this.fileSingleSizeLimit}M，请重新选择图片上传`)
            } else if (type === 'Q_EXCEED_NUM_LIMIT') {
              message.warning(`最多同时允许添加${this.fileNumLimit}张图片`)
            } else if (type === 'F_DUPLICATE') {
              message.warning('该图片已经在上传的队列中')
            } else if (type === 'Q_TYPE_DENIED') {
              message.warning('添加文件出错，不支持该图片类型')
            } else {
              message.warning(`添加文件出错，${type}`)
            }
          })
        }
      }
    }
  }
</script>

<style lang="less">
  .image-upload {
    .webuploader-container {
      position: relative;
      float: right;
    }
    .webuploader-element-invisible {
      position: absolute !important;
      clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
      clip: rect(1px,1px,1px,1px);
    }
    .webuploader-pick {
      position: relative;
      display: inline-block;
      cursor: pointer;
      background: #00b7ee;
      padding: 10px 15px;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      overflow: hidden;
    }
    .webuploader-pick-hover {
      background: #00a2d4;
    }

    .webuploader-pick-disable {
      opacity: 0.6;
      pointer-events:none;
    }
  }
</style>
