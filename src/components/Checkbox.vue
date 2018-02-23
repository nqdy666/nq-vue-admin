<template>
  <div class="c-checkbox">
    <label v-for="option of options" class="checkbox">
      <input type="checkbox" :id="option[valueKey]" :value="option[valueKey]"
         v-model="mChecked" @input="handleInput">
      {{ option[labelKey] }}
    </label>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        mChecked: []
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
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      handleInput (e) {
        console.log(e)
      }
    },
    watch: {
      checked (val) {
        this.mChecked = val
      },
      mChecked (val, oldValue) {
        if (JSON.stringify(val) !== JSON.stringify(oldValue)) {
          this.$emit('update', val)
        }
      }
    }
  }
</script>
<style lang="less">
  .c-checkbox {
    padding: 5px 0;

    .checkbox {
      margin-right: 25px;
    }
  }
</style>