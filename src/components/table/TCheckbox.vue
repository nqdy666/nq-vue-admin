<template>
  <span class="tg-list-item">
    <input @click="handleChange($event)"
           class="tgl tgl-ios"
           :id="rowData[idKey]"
           type="checkbox"
           v-model="value">
    <label class="tgl-btn" :for="rowData[idKey]"></label>
  </span>
</template>
<script>
  import mField from './mField'

  export default{
    mixins: [mField],
    computed: {
      value: {
        get () {
          return this.rowData[this.dataKey] === 1
        },
        set (value) {
          this.rowData[this.dataKey] = value ? 1 : 2
        }
      }
    },
    mounted () {
      if (this.asyncData[this.dataKey]) {
        this.rowData[this.dataKey] = this.asyncData[this.dataKey]
      }
    },
    methods: {
      handleChange (e) {
        if (typeof (this.column.render.action) === 'function') {
          this.column.render.action(this.column.actionName, this.rowData, this.rowIndex, e.target.checked)
        }
      }
    },
    watch: {
      asyncData (asyncData, oldValue) {
        if (asyncData[this.dataKey] !== oldValue[this.dataKey]) {
          this.rowData[this.dataKey] = asyncData[this.dataKey]
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .tg-list-item {
    .tgl {
      display: none
    }
    .tgl, .tgl *, .tgl:after, .tgl:before, .tgl+.tgl-btn, .tgl:after, .tgl:before {
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box
    }
    .tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection, .tgl+.tgl-btn::-moz-selection, .tgl::-moz-selection, .tgl:after::-moz-selection, .tgl:before::-moz-selection {
      background: 0 0
    }
    .tgl::selection, .tgl:after::selection, .tgl:before::selection, .tgl+.tgl-btn::selection, .tgl::selection, .tgl:after::selection, .tgl:before::selection {
      background: 0 0
    }
    .tgl+.tgl-btn {
      outline: 0;
      display: block;
      width: 4em;
      height: 2em;
      position: relative;
      cursor: pointer
    }
    .tgl+.tgl-btn:after, .tgl+.tgl-btn:before {
      position: relative;
      display: block;
      content: "";
      width: 50%;
      height: 100%
    }
    .tgl+.tgl-btn:after {
      left: 0
    }
    .tgl+.tgl-btn:before {
      display: none
    }
    .tgl:checked+.tgl-btn:after {
      left: 50%
    }
    .tgl-ios+.tgl-btn {
      background: #fbfbfb;
      border-radius: 2em;
      padding: 2px;
      -webkit-transition: all .4s ease;
      transition: all .4s ease;
      border: 1px solid #e8eae9
    }
    .tgl-ios+.tgl-btn:after {
      border-radius: 2em;
      background: #fbfbfb;
      -webkit-transition: left .3s cubic-bezier(.175, .885, .32, 1.275), padding .3s ease, margin .3s ease;
      transition: left .3s cubic-bezier(.175, .885, .32, 1.275), padding .3s ease, margin .3s ease;
      -webkit-box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 4px 0 rgba(0, 0, 0, .08);
      box-shadow: 0 0 0 1px rgba(0, 0, 0, .1), 0 4px 0 rgba(0, 0, 0, .08)
    }
    .tgl-ios+.tgl-btn:active {
      -webkit-box-shadow: inset 0 0 0 2em #e8eae9;
      box-shadow: inset 0 0 0 2em #e8eae9
    }
    .tgl-ios+.tgl-btn:active:after {
      padding-right: .8em
    }
    .tgl-ios:checked+.tgl-btn {
      background: #86d993
    }
    .tgl-ios:checked+.tgl-btn:active {
      -webkit-box-shadow: none;
      box-shadow: none
    }
    .tgl-ios:checked+.tgl-btn:active:after {
      margin-left: -.8em
    }
  }
</style>
