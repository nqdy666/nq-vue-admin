<template lang="html">
  <div class="imageSelectModal modal" :style="{display: isActive ? 'flex': 'none'}">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">选择图片</p>
        <button class="delete" @click="hide"></button>
      </header>
      <section class="modal-card-body">
        <div class="image-pick-area">
          <image-upload ref="imageupload" @uploadsuccess="uploadSuccess"></image-upload>
        </div>
        <div class="image-wrapper">
          <ul>
            <li class="" v-for="item of imageItems">
              <div class="card">
                <div class="card-image">
                  <small-image :dentry-id="item.dentry_id" @statuschange="imageStatusChange(item.dentry_id, arguments)"></small-image>
                </div>
                <div class="card-content">
                  <div class="content"><p :title="item.name">{{ item.name }}</p></div>
                </div>
              </div>
            </li>
          </ul>
          <p v-show="showUploadPicTip">请上传图片<p>
          <div class="loading-wrapper" v-show="isShowLoadingBtn">
            <button class="button is-fullwidth is-primary" :class="{ 'is-loading': isLoading }" @click="loadingMore">加载更多</button>
          </div>
        </div>
        <div class="desc-btn-wrapper">
          <p class="desc">
            已选<span class="">{{ selectedImages.length }}</span>个
          </p>
          <div class="btn-wrapper">
            <button class="button is-success is-medium" @click="submit">确定</button>
            <button class="button is-medium" @click="hide">取消</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { sGetUploadSession, sGetDentries } from 'apis/cs'
  import SmallImage from './SmallImage'
  import ImageUpload from './ImageUpload'
  import { getDownloadUrl } from 'apis/cs'

  export default{
    data () {
      return {
        imageItems: [],
        isActive: false,
        isLoading: false,
        offset: 0,
        limit: 10,
        isNoImage: false,
        selectedImages: []
      }
    },
    computed: {
      showUploadPicTip () {
        // offset不为空，就代表从服务端有图片数据返回，此时就不显示默认提示
        return !this.offset
      },
      isNoMoreImages () {
        // 如果服务器返回的图片数量不和limit一样，就代表服务端所有图片都已经加载完了
        return (this.offset % this.limit) || this.isNoImage
      },
      isShowLoadingBtn () {
        // 不请求服务端数据，不显示加载的按钮，当服务端端加载过一次数据后，判定没有更多图片，也不显示加载的按钮
        return this.offset && !this.isNoMoreImages
      }
    },
    mounted () {
      this.$nextTick(() => {
        this.imageUpload = this.$refs.imageupload
      })
    },
    methods: {
      reloadImages () {
        this.isNoImage = false
        this.offset = 0
        this.selectedImages = []
        this.imageItems = []
        this.loadingImages()
      },
      loadingImages () {
        if (this.isNoMoreImages) {
          return
        }
        this.isLoading = true
        sGetUploadSession({
          path: '/images'
        }).then(data => {
          return sGetDentries({
            session: data.session,
            path: data.path,
            $filter: 'updateAt gt 0',
            $orderby: 'updateAt Desc', // 逆序排序
            $limit: this.limit,
            $offset: this.offset
          })
        }).then(data => {
          if (data.items.length) {
            this.offset += data.items.length
            this.imageItems = this.imageItems.concat(data.items)
          } else {
            this.isNoImage = true
          }
        }).finally(() => {
          this.isLoading = false
        })
      },
      show () {
        this.isActive = true
        // upload的组件必须在界面处于显示状态才能初始化，否则上传组件将失效
        this.imageUpload.init()
        // 每次打开选择图片的框，都重置图片选择框
        this.reloadImages()
      },
      loadingMore () {
        this.loadingImages()
      },
      hide () {
        this.isActive = false
      },
      submit () {
        // 发送事件，把已选的图片通过事件方式传递给其他组件
        this.$emit('selected', this.selectedImages)
        this.hide()
      },
      imageStatusChange (dentryId, [value]) {
        const { selected } = value
        const imageUrl = getDownloadUrl(dentryId)
        if (selected) {
          this.selectedImages.push(imageUrl)
        } else {
          this.selectedImages.splice(this.selectedImages.indexOf(imageUrl), 1)
        }
      },
      uploadSuccess () {
        // 图片上传成功后，重置图片选择框
        this.reloadImages()
      }
    },
    components: {
      SmallImage,
      ImageUpload
    }
  }
</script>
<style lang="less">
  .imageSelectModal {
    /*z-index: 2986;*/

    .modal-background {
      background-color: rgba(17,17,17,.40);
    }
    .modal-card {
      width: 800px;
    }
    .image-pick-area {
      margin-top: -12px;
      height: 47px;
    }
    .image-wrapper {
      padding: 10px 0 40px 0;
      border-top: 1px solid #e7e7eb;
      border-bottom: 1px solid #e7e7eb;

      ul {
        display: flex;
        flex-wrap: wrap;

        li {
          .card {
            width: auto;
          }
          .card-content {
            border-top: 1px solid #e7e7eb;
            text-align: center;
            padding: 5px;

            .content {
              width: 128px;
              p {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
            }
          }
          margin: 0 4px;
          margin-bottom: 6px;
        }
      }

    }
    .loading-wrapper {
      margin-top: 10px;
    }

    .desc-btn-wrapper {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      text-align: center;
      background: #f5f7fa;
      height: 50px;
      line-height: 50px;
      .btn-wrapper {
        text-align: center;
        padding-top: 5px;
        button {
          margin: 0 10px;
        }
      }
      .desc {
        position: absolute;
        left: 20px;
        top: 0;
      }
    }

  }

</style>
