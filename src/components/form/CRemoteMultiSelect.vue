<template>
  <modal-remote-multi-select
    :button-label="extra.buttonLabel"
    :table-params="extra.tableParams"
    :modal-table-params="extra.modalTableParams"
    :tag-label-key="extra.tagLabelKey"
    v-model="value"></modal-remote-multi-select>
</template>

<script>
import mField from './mField'
import { ModalRemoteMultiSelect } from 'components/remote-multi-select'

export default {
  mixins: [mField],
  data () {
    return {}
  },
  methods: {
    getDefaultVal () {
      return []
    }
  },
  props: {
    initValue: {
      default () {
        return []
      }
    }
  },
  components: {
    ModalRemoteMultiSelect
  }
}
</script>
