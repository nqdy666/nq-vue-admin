<template>
  <div class="t-search-cell field is-horizontal">
    <div class="t-label">
      <label class="label" v-if="model.label">{{model.label}}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      field: {
        type: String,
        default: ''
      },
      model: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style lang="less">
  .t-search-cell {
    position: relative;
    float: left;
    margin-left: 20px;
    margin-bottom: 10px !important;
    display: block !important;
    float: left;

    .t-label {
      float: left;
    }

    .field-body {
      float: left;
    }

    &.is-horizontal {
      .label {
        padding-top: 0.4rem;
        margin-right: 0.5rem;
      }
    }
    .label {
      margin-bottom: 3px
    }
  }
</style>
