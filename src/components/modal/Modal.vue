<template>
  <div data-name="modal-component" :class="['modal', 'animated', visible ? 'is-active' : '']" :style="{ 'zIndex': zIndex }" :transition="transition" transition-mode="in-out">
    <template v-if="backdrop">
      <div class="modal-background" @click.prevent="handleShadowClick"></div>
    </template>
    <template v-else>
      <div class="modal-background"></div>
    </template>
    <div class="modal-content">
      <slot name="modal-body"></slot>
    </div>
    <button class="modal-close" @click="close" v-if="closable"></button>
  </div>
</template>

<script>
import BaseModal from './BaseModal'

export default {
  mixins: [BaseModal],
  props: {
    closable: {
      type: Boolean,
      default: true
    }
  }
}
</script>
