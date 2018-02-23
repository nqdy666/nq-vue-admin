<template>
  <div>
    <sort-local></sort-local>
    <sort-remote></sort-remote>
  </div>
</template>
<script>
  import sortLocal from './sort-local.vue'
  import sortRemote from './sort-remote.vue'

  export default{
    components: {
      sortLocal,
      sortRemote
    }
  }
</script>
