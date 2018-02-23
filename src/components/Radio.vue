<template>
  <div class="c-radio">
    <label v-for="option of options" class="radio">
      <input type="radio" :id="option[valueKey]" :value="option[valueKey]"
         v-model="mChecked">
      {{ option[labelKey] }}
    </label>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mChecked: ''
      }
    },
    created () {
      this.mChecked = this.checked
    },
    props: {
      options: {
        type: Array,
        required: true,
        default () {
          return []
        }
      },
      labelKey: {
        type: String,
        default () {
          return 'label'
        }
      },
      valueKey: {
        type: String,
        default () {
          return 'value'
        }
      },
      checked: {
        type: [String, Number],
        default () {
          return ''
        }
      }
    },
    methods: {
    },
    watch: {
      checked (val) {
        this.mChecked = val
      },
      mChecked (val) {
        this.$emit('update', val)
      }
    }
  }
</script>
<style lang="less">
  .c-radio {
    padding: 5px 0;

    .radio {
      margin-right: 25px;
    }
  }
</style>