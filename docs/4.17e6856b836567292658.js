webpackJsonp([4],{"0cAN":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("demo",{attrs:{title:"排序-云端",vertical:!0}},[n("div",{attrs:{slot:"demo"},slot:"demo"},[n("vue-table",{ref:"table",attrs:{"id-key":"id",columns:t.columns,"fetch-api":t.queryDataList,"init-page-size":5,"show-page":!0},on:{"sort-change":t.handleSortChange}})],1),t._v(" "),n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[t._v("服务器排序。")])]),t._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[t._v(t._s(t.code))])],1)],1)},r=[],o={render:a,staticRenderFns:r};e.a=o},"0e9k":function(t,e,n){e=t.exports=n("FZ+f")(),e.push([t.i,"",""])},"6CuP":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("sort-local"),t._v(" "),n("sort-remote")],1)},r=[],o={render:a,staticRenderFns:r};e.a=o},DGyj:function(t,e,n){"use strict";function a(t,e,n){return"asc"===n?t>e?1:-1:"desc"===n?t<e?1:-1:void 0}Object.defineProperty(e,"__esModule",{value:!0});var r=n("OMU2"),o=function(t){return t&&t.__esModule?t:{default:t}}(r),s=[{id:"1",name:"秦",age:17},{id:"2",name:"赵",age:18},{id:"3",name:"王",age:25},{id:"4",name:"郑",age:20},{id:"5",name:"吴",age:21}];e.default={data:function(){return{code:o.default,columns:[{title:"ID",width:"70",dataKey:"id"},{title:"名称",width:"100",dataKey:"name"},{title:"年龄",minWidth:"50",dataKey:"age",sortable:!0,sortMethod:a}],datum:s}}},t.exports=e.default},Dz2j:function(t,e,n){"use strict";function a(t){n("itbn")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("DGyj"),o=n.n(r);for(var s in r)"default"!==s&&function(t){n.d(e,t,function(){return r[t]})}(s);var i=n("ki5D"),l=n("VU/8"),d=a,u=l(o.a,i.a,!1,d,null,null);e.default=u.exports},OMU2:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default="\n<template>\n  <vue-table ref=\"table\"\n     id-key=\"id\"\n     :columns=\"columns\"\n     :datum=\"datum\"\n     :show-page=\"false\">\n  </vue-table>\n</template>\n<script>\n  const tableData = [\n    { id: '1', name: '秦', age: 17 },\n    { id: '2', name: '赵', age: 18 },\n    { id: '3', name: '王', age: 25 },\n    { id: '4', name: '郑', age: 20 },\n    { id: '5', name: '吴', age: 21 }\n  ]\n\n  // 默认排序方式\n  function sortMethod (a, b, type) {\n    if (type === 'asc') {\n      return a > b ? 1 : -1\n    } else if (type === 'desc') {\n      return a < b ? 1 : -1\n    }\n  }\n\n  export default {\n    data () {\n      return {\n        columns: [\n          { title: 'ID', width: '70', dataKey: 'id' },\n          { title: '名称', width: '100', dataKey: 'name' },\n          { title: '年龄', minWidth: '50', dataKey: 'age', sortable: true, sortMethod }\n        ],\n        datum: tableData\n      }\n    }\n  }\n<\/script>\n",t.exports=e.default},Umct:function(t,e,n){"use strict";function a(t){n("q+mZ")}Object.defineProperty(e,"__esModule",{value:!0});var r=n("z/aX"),o=n.n(r);for(var s in r)"default"!==s&&function(t){n.d(e,t,function(){return r[t]})}(s);var i=n("0cAN"),l=n("VU/8"),d=a,u=l(o.a,i.a,!1,d,null,null);e.default=u.exports},itbn:function(t,e,n){var a=n("o27g");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("199f4390",a,!0,{})},ki5D:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("demo",{attrs:{title:"排序-本地",vertical:!1}},[n("div",{attrs:{slot:"demo"},slot:"demo"},[n("vue-table",{ref:"table",attrs:{"id-key":"id",columns:t.columns,datum:t.datum,"show-page":!1}})],1),t._v(" "),n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[t._v("本地排序。")])]),t._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[t._v(t._s(t.code))])],1)],1)},r=[],o={render:a,staticRenderFns:r};e.a=o},kv1U:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("m/6N"),r=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);var s=n("6CuP"),i=n("VU/8"),l=i(r.a,s.a,!1,null,null,null);e.default=l.exports},"l+PE":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default="\n<template>\n  <vue-table ref=\"table\"\n    id-key=\"id\"\n    :columns=\"columns\"\n    :fetch-api=\"queryDataList\"\n    :init-page-size=\"5\"\n    :show-page=\"true\"\n    @sort-change=\"handleSortChange\">\n  </vue-table>\n</template>\n<script>\n  import { sGetDataList } from 'apis/demo'\n\n  export default {\n    data () {\n      return {\n        columns: [\n          { title: 'ID', width: '70', dataKey: 'id' },\n          { title: '名称', width: '100', dataKey: 'name' },\n          { title: '值', dataKey: 'value', sortable: 'remote' }\n        ]\n      }\n    },\n    methods: {\n      queryDataList ({ $offset, $limit } = {}) {\n        return sGetDataList({\n          order: this.orderType,\n          $count: true,\n          $offset: $offset || 0,\n          $limit: $limit || 20\n        })\n      },\n      handleSortChange (column, type) {\n        if (column.dataKey === 'value') {\n          this.orderType = type === 'asc' ? 'asc' : 'desc'\n          this.$refs.table.loadData()\n        }\n      }\n    }\n  }\n<\/script>\n",t.exports=e.default},"m/6N":function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n("Dz2j"),o=a(r),s=n("Umct"),i=a(s);e.default={components:{sortLocal:o.default,sortRemote:i.default}},t.exports=e.default},o27g:function(t,e,n){e=t.exports=n("FZ+f")(),e.push([t.i,"",""])},"q+mZ":function(t,e,n){var a=n("0e9k");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("b6617b4c",a,!0,{})},"z/aX":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=n("l+PE"),r=function(t){return t&&t.__esModule?t:{default:t}}(a),o=n("jsiM");e.default={data:function(){return{code:r.default,columns:[{title:"ID",width:"70",dataKey:"id"},{title:"名称",width:"100",dataKey:"name"},{title:"值",dataKey:"value",sortable:"remote"}]}},methods:{queryDataList:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=t.$offset,n=t.$limit;return(0,o.sGetDataList)({order:this.orderType,$count:!0,$offset:e||0,$limit:n||20})},handleSortChange:function(t,e){"value"===t.dataKey&&(this.orderType="asc"===e?"asc":"desc",this.$refs.table.loadData())}}},t.exports=e.default}});