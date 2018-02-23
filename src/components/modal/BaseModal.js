let zIndexCount = 10

export default {
  data () {
    return {
      zIndex: zIndexCount++
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    shadowClose: {
      type: Boolean,
      default () {
        return true
      }
    },
    closable: {
      type: Boolean,
      default: false
    },
    backdrop: {
      type: Boolean,
      default: true
    },
    transition: {
      type: String,
      default: 'fade'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    },
    handleShadowClick () {
      if (this.shadowClose) {
        this.close()
      }
    }
  }
}
