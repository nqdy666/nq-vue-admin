webpackJsonp([10],{"4fyp":function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.default="\n<template>\n  <vue-table ref=\"table\"\n     id-key=\"id\"\n     :columns=\"columns\"\n     :datum=\"datum\"\n     :show-page=\"false\">\n  </vue-table>\n</template>\n\n<script>\n const tableData = [\n    { id: '1', name: '进度100', progress: 100 },\n    { id: '2', name: '进度60', progress: 60 },\n    { id: '3', name: '进度40', progress: 40 },\n    { id: '4', name: '进度20', progress: 20 },\n    { id: '5', name: '进度0', progress: 0 }\n  ]\n\n  export default {\n    data () {\n      return {\n        columns: [\n          { title: 'ID', width: '30', dataKey: 'id' },\n          { title: 'JSX实现进度条', dataKey: 'progress', render: this.renderProgress }\n        ],\n        datum: tableData\n      }\n    },\n    methods: {\n      renderProgress (h, params) {\n        const percent = params.data || 0\n//        配合babel-plugin-transform-vue-jsx插件https://github.com/vuejs/babel-plugin-transform-vue-jsx，可以用以下写法代替\n//        return (\n//          <div class=\"progress-wrap\"><progress class=\"progress is-primary\" value={percent} max=\"100\"></progress><span>{percent}%</span></div>\n//        )\n        return h('div', {\n          class: { 'progress-wrap': true }\n        }, [\n          h('progress', {\n            attrs: {\n              max: 100,\n              value: percent\n            },\n            class: {\n              'progress': true,\n              'is-danger': true\n            }\n          }),\n          h('span', {}, percent + '%')\n        ])\n      }\n    }\n  }\n<\/script>\n<style lang=\"less\">\n  .progress-wrap {\n    display: flex;\n    progress {\n      margin-bottom: 0;\n    }\n    span {\n      width: 65px;\n      margin-left: 2px;\n      display: inline-block;\n      height: 12px;\n      line-height: 12px;\n    }\n  }\n</style>\n",e.exports=n.default},kiii:function(e,n,r){n=e.exports=r("FZ+f")(),n.push([e.i,".progress-wrap{display:-webkit-box;display:-webkit-flex;display:flex}.progress-wrap progress{margin-bottom:0}.progress-wrap span{width:65px;margin-left:2px;display:inline-block;height:12px;line-height:12px}",""])},rxKz:function(e,n,r){"use strict";var s=function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{staticClass:"wrapper"},[r("demo",{attrs:{title:"单元格-JSX",vertical:!0}},[r("div",{attrs:{slot:"demo"},slot:"demo"},[r("vue-table",{ref:"table",attrs:{"id-key":"id",columns:e.columns,datum:e.datum,"show-page":!1}})],1),e._v(" "),r("div",{attrs:{slot:"desc"},slot:"desc"},[r("p",[e._v("表格单元格-JSX。")])]),e._v(" "),r("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code))])],1)],1)},t=[],a={render:s,staticRenderFns:t};n.a=a},uFIS:function(e,n,r){"use strict";function s(e){r("wDtt")}Object.defineProperty(n,"__esModule",{value:!0});var t=r("vKhV"),a=r.n(t);for(var o in t)"default"!==o&&function(e){r.d(n,e,function(){return t[e]})}(o);var i=r("rxKz"),l=r("VU/8"),p=s,d=l(a.a,i.a,!1,p,null,null);n.default=d.exports},vKhV:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var s=r("4fyp"),t=function(e){return e&&e.__esModule?e:{default:e}}(s),a=[{id:"1",name:"进度100",progress:100},{id:"2",name:"进度60",progress:60},{id:"3",name:"进度40",progress:40},{id:"4",name:"进度20",progress:20},{id:"5",name:"进度0",progress:0}];n.default={data:function(){return{code:t.default,columns:[{title:"ID",width:"30",dataKey:"id"},{title:"JSX实现进度条",dataKey:"progress",render:this.renderProgress}],datum:a}},methods:{renderProgress:function(e,n){var r=n.data||0;return e("div",{class:{"progress-wrap":!0}},[e("progress",{attrs:{max:100,value:r},class:{progress:!0,"is-danger":!0}}),e("span",{},r+"%")])}}},e.exports=n.default},wDtt:function(e,n,r){var s=r("kiii");"string"==typeof s&&(s=[[e.i,s,""]]),s.locals&&(e.exports=s.locals);r("rjj0")("3e32fe2b",s,!0,{})}});