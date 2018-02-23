<template>
  <div class="ui-images">
    <div class="c-image-view-box" v-for="(pic, index) in pics">
      <figure class="image">
        <img class="ui-image" :src="pic" @error="imageLoadError" :alt="attrs.alt || '图片不存在'" :wdith="129" :height="129" @click="fullImage(pic)">
      </figure>
    </div>
  </div>
</template>

<script>
  import mField from './mField'
  import { getDownloadUrl } from 'apis/cs'

  export default {
    mixins: [mField],
    methods: {
      imageLoadError () {
        if (typeof (this.extra.imageLoadError) === 'function') {
          this.extra.imageLoadError()
        }
      },
      fullImage (url) {
        window.open(url)
      }
    },
    computed: {
      dentryIds () {
        const value = this.value
        if (Array.isArray(value)) {
          return value
        } else if (typeof (value) === 'string') {
          return value.split(',')
        } else {
          return []
        }
      },
      pics () {
        return this.dentryIds.map(item => {
          return getDownloadUrl(item)
        })
      }
    }
  }
</script>
<style lang="less">
  .ui-images {
    border: 1px solid #ccc;
    padding: 8px 5px 0 9px;
    border-radius: 3px;

    .c-image-view-box {
      display: inline-block;
      position: relative;
      margin-left: 5px;

      .ui-image {
        position: relative;
        width: 120px;
        height: 123px;
        cursor: pointer;
      }
    }
  }
</style>
