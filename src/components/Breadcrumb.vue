<template>
  <nav class="breadcrumb" aria-label="breadcrumbs">
    <ul>
      <li v-for="(item, index) in list"><span  v-if="isLast(index)" class="is-active">{{item.label}}</span>
        <router-link v-else :to="item">{{item.label}}</router-link>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    }
  }
}
</script>

<style lang="less" scoped>
  .breadcrumb {
    .is-active {
      padding-left: 10px;
    }
    a {
      color: #00d1b2;
    }
  }
  .breadcrumb:not(:last-child) {
    margin-bottom: 0;
  }
</style>
