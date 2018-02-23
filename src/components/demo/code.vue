<style src="./hljs.css"></style>
<style scoped>
  div {
    position: relative;
    font-size: 14px;
  }
  pre {
    background: white;
    padding: 0;
    font-size: 1.1em;
  }
</style>
<template>
  <div>
    <pre><code :class="language" ref="code"><slot></slot></code></pre>
  </div>
</template>
<script>
  import hljs from 'highlightjs/highlight.pack.js'

  export default {
    props: {
      lang: {
        type: String,
        default: 'javascript'
      }
    },
    data () {
      return {
        code: ''
      }
    },
    computed: {
      language () {
        if (this.lang === 'auto') {
          return ''
        } else {
          return this.lang
        }
      }
    },
    mounted () {
      this.code = this.$refs.code.innerHTML.replace(/\n/, '')
      this.$refs.code.innerHTML = this.code
      hljs.highlightBlock(this.$refs.code)
    },
    methods: {}
  }
</script>
