<template>
  <div class="c-image-view-wrapper">
    <div class="c-image-view-box" v-for="(item, index) of imageArr" :key="index">
      <figure class="image">
        <img :src="getDownloadUrl(item)" @error="imageLoadError" :alt="attrs.alt || '图片不存在'" :wdith="129" :height="129">
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
        if (this.extra && typeof (this.extra.imageLoadError) === 'function') {
          this.extra.imageLoadError()
        }
      },
      getDownloadUrl (dentryId) {
        return getDownloadUrl(dentryId)
      }
    },
    computed: {
      imageArr () {
        const value = this.value
        if (Array.isArray(value)) {
          return value
        } else if (typeof (value) === 'string') {
          return [value]
        } else {
          return []
        }
      }
    }
  }
</script>
<style lang="less">
  .c-image-view-wrapper {
    flex-direction: row;
    display: flex;

    .c-image-view-box {
      border-radius: 5px;
      box-shadow: 0 2px 3px rgba(17,17,17,.1),0 0 0 1px rgba(17,17,17,.1);
      display: block;
      width: 138px;
      height: 138px;
      padding: 5px;
      margin-right: 10px;
      .image {
        width: 129px;
        height: 129px;

        img {
          height: 100%;
        }
      }
    }
  }

</style>