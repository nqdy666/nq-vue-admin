<template>
  <div class="fv-message" :style="{ top: top + 'px' }">
    <Notice
      v-for="notice in notices"
      :key="notice.name"
      :type="notice.type"
      :content="notice.content"
      :duration="notice.duration"
      :name="notice.name"
      :transition-name="notice.transitionName"
      :on-close="notice.onClose">
    </Notice>
  </div>
</template>
<script>
  import Notice from './notice.vue'

  let seed = 0
  const now = Date.now()

  function getUuid () {
    return 'Notification_' + now + '_' + (seed++)
  }

  export default {
    components: { Notice },
    props: {
      content: {
        type: String
      }
    },
    data () {
      return {
        top: 10,
        notices: []
      }
    },
    computed: {
    },
    methods: {
      add (notice) {
        const name = notice.name || getUuid()

        const _notice = Object.assign({
          content: '',
          duration: 1.5,
          name
        }, notice)

        this.notices.push(_notice)
      },
      close (name) {
        const notices = this.notices

        for (let i = 0; i < notices.length; i++) {
          if (notices[i].name === name) {
            this.notices.splice(i, 1)
            break
          }
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .fv-message {
    position: fixed;
    z-index: 9999;
    width: 100%;
    left: 0;
  }
</style>