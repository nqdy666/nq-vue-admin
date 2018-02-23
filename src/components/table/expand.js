export default {
  name: 'MTableExpand',
  functional: true,
  props: {
    idKey: String,
    rowIndex: Number,
    rowData: Object,
    column: Object
  },
  render: (h, ctx) => {
    const params = {
      idKey: ctx.props.idKey,
      rowIndex: ctx.props.rowIndex,
      rowData: ctx.props.rowData,
      data: ctx.props.rowData[ctx.props.column.dataKey] || '',
      column: ctx.props.column
    }
    return ctx.props.column.render(h, params)
  }
}
