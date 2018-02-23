<template>
  <div class="small-image">
    <figure class="image" @click.prevent="selectImage">
      <img :src="imageUrl">
    </figure>
    <div v-if="maskShow" class="selected-mask" @click.prevent="unSelectImage">
      <div class="inner"></div>
      <span class="icon fa fa-select"></span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        maskShow: false
      }
    },
    computed: {
      imageUrl () {
        return getDownloadUrl(this.dentryId, { size: 120 })
      }
    },
    methods: {
      selectImage () {
        this.maskShow = true
        this.$emit('statuschange', { selected: true })
      },
      unSelectImage () {
        this.maskShow = false
        this.$emit('statuschange', { selected: false })
      }
    },
    props: {
      dentryId: {
        type: String,
        required: true
      }
    }
  }
</script>

<style lang="less">
  .small-image {
    .image {
      width: 138px;
      height: 128px;
    }
    img {
      height: 128px;
      max-height: 128px;
    }
    .selected-mask {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .inner {
        position: absolute;
        width: 138px;
        height: 128px;
        opacity: .6;
        background-color: #000;
      }
      .icon {
        position: absolute;
        top: 41%;
        left: 40%;
        color: white;
        font-size: 30px;
      }
    }
  }
</style>
