webpackJsonp([15],{"/ZdV":function(e,t,a){"use strict";function n(e){a("geQf")}Object.defineProperty(t,"__esModule",{value:!0});var i=a("DpEw"),r=a.n(i);for(var d in i)"default"!==d&&function(e){a.d(t,e,function(){return i[e]})}(d);var s=a("i4Xe"),o=a("VU/8"),u=n,l=o(r.a,s.a,!1,u,null,null);t.default=l.exports},Bslv:function(e,t,a){t=e.exports=a("FZ+f")(),t.push([e.i,"",""])},DpEw:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function i(e){return(0,u.default)(e).format("YYYY-MM")}function r(e,t){return new Promise(function(a){setTimeout(function(){a(t.name+e)},1e3)})}Object.defineProperty(t,"__esModule",{value:!0});var d=a("v8HT"),s=n(d),o=a("PJh5"),u=n(o),l=[{id:"1",name:"秦",age:"18",desk_mate:1,birthday:0xea43e730a0},{id:"2",name:"赵",age:"18",desk_mate:2,birthday:1106381572e3},{id:"3",name:"王",age:"18",desk_mate:3,birthday:1206791572e3},{id:"4",name:"郑",age:"18",desk_mate:4,birthday:1306701572e3},{id:"5",name:"吴",age:"18",desk_mate:5,birthday:1406751572e3}];t.default={data:function(){return{code:s.default,columns:[{title:"ID",width:"70",dataKey:"id"},{title:"名称",width:"160",dataKey:"name"},{title:"年龄",minWidth:"30",dataKey:"age"},{title:"同桌",minWidth:"50",dataKey:"desk_mate",pFun:r},{title:"出生年月",width:"180",dataKey:"birthday",pFun:i}]}},methods:{queryDataList:function(){return new Promise(function(e){setTimeout(function(){e({items:l,count:l.length})},500)})}}},e.exports=t.default},geQf:function(e,t,a){var n=a("Bslv");"string"==typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);a("rjj0")("6c0550ea",n,!0,{})},i4Xe:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"wrapper"},[a("demo",{attrs:{title:"数据来自云端",vertical:!0}},[a("div",{attrs:{slot:"demo"},slot:"demo"},[a("vue-table",{ref:"table",attrs:{"id-key":"id",columns:e.columns,"fetch-api":e.queryDataList,"show-page":!1}})],1),e._v(" "),a("div",{attrs:{slot:"desc"},slot:"desc"},[a("p",[e._v("从服务端获取数据并渲染。")])]),e._v(" "),a("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code))])],1)],1)},i=[],r={render:n,staticRenderFns:i};t.a=r},v8HT:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n<template>\n  <vue-table ref=\"table\"\n     id-key=\"id\"\n     :columns=\"columns\"\n     :fetch-api=\"queryDataList\"\n     :show-page=\"false\">\n  </vue-table>\n</template>\n\n<script>\n  import moment from 'moment'\n\n  function transformBirthday (val) {\n    return moment(val).format('YYYY-MM')\n  }\n\n  function transformDeskMate (val, rowData) {\n    return new Promise(resolve => {\n      setTimeout(() => { resolve(rowData.name + val) }, 1000)\n    })\n  }\n\n  const tableData = [\n    { id: '1', name: '秦', age: '18', 'desk_mate': 1, birthday: 1006161572000 },\n    { id: '2', name: '赵', age: '18', 'desk_mate': 2, birthday: 1106381572000 },\n    { id: '3', name: '王', age: '18', 'desk_mate': 3, birthday: 1206791572000 },\n    { id: '4', name: '郑', age: '18', 'desk_mate': 4, birthday: 1306701572000 },\n    { id: '5', name: '吴', age: '18', 'desk_mate': 5, birthday: 1406751572000 }\n  ]\n\n  export default {\n    data () {\n      return {\n        columns: [\n          { title: 'ID', width: '70', dataKey: 'id' },\n          { title: '名称', width: '160', dataKey: 'name' },\n          { title: '年龄', minWidth: '30', dataKey: 'age' },\n          { title: '同桌', minWidth: '50', dataKey: 'desk_mate', pFun: transformDeskMate },\n          { title: '出生年月', width: '180', dataKey: 'birthday', pFun: transformBirthday }\n        ],\n        datum: tableData\n      }\n    },\n    methods: {\n      queryDataList () {\n        return new Promise(resolve => {\n          setTimeout(() => {\n            resolve({ items: tableData, count: tableData.length })\n          }, 500)\n        })\n      }\n    }\n  }\n<\/script>\n",e.exports=t.default}});