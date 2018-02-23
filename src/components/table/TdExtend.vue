<template>
  <div>
    <component
      v-if="typeof mRender === 'object'"
      :is="`${TYPE_PRE}${mRender.type}`"
      :row-index="rowIndex"
      :row-data="rowData"
      :idKey="idKey"
      :column="column"
      :async-data="asyncData"
      :render="mRender"></component>
    <expand v-else-if="typeof mRender === 'function'"
      :row-index="rowIndex"
      :row-data="rowData"
      :idKey="idKey"
      :column="column">
    </expand>
  </div>
</template>
<script>
  import expand from './expand'

  const TYPE_PRE = 't-'

  export default{
    data () {
      return {
        TYPE_PRE
      }
    },
    components: {
      expand
    },
    props: {
      idKey: {
        type: String,
        required: true
      },
      rowIndex: {
        type: Number,
        required: true
      },
      rowData: {
        type: Object,
        required: true
      },
      column: {
        type: Object,
        required: true
      },
      asyncData: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    computed: {
      mRender () {
        const render = this.column.render
        if (typeof (render) === 'string') {
          return { type: render }
        } else if (render && render.toString() === '[object Object]') {
          return Object.assign({ type: 'text' }, render)
        } else if (typeof render === 'function') {
          return render
        } else {
          return { type: 'text', html: this.column.html }
        }
      }
    }
  }
</script>
