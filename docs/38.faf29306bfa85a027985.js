webpackJsonp([38],{Adop:function(e,t,n){t=e.exports=n("FZ+f")(),t.push([e.i,"",""])},l1cM:function(e,t,n){"use strict";function a(e){n("mipe")}Object.defineProperty(t,"__esModule",{value:!0});var l=n("lHmw"),s=n.n(l);for(var r in l)"default"!==r&&function(e){n.d(t,e,function(){return l[e]})}(r);var i=n("rskF"),o=n("VU/8"),d=a,u=o(s.a,i.a,!1,d,null,null);t.default=u.exports},lHmw:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=n("uRKP"),s=a(l),r=n("WB2H"),i=a(r);t.default={data:function(){return{code:s.default,isSubmitBtnDisabled:!1,formRst:""}},computed:{cells:function(){return{name:{label:"名称",type:"textfield",attrs:{placeholder:"名称"},validate:{required:{message:"请输入名称"},maxlength:{rule:32,message:"名称不长于32个字符"}}},enable:{label:"启用标志",type:"dropdown",extra:{options:[{label:"启用",value:1},{label:"禁用",value:2}]},validate:{}},logo_dentry_id:{label:"logo",type:"logouploader",validate:{required:{message:"请选择图片"}}},publish_time:{label:"发布时间",type:"simpledatepicker",attrs:{placeholder:"发布时间"},validate:{}},description:{label:"描述",type:"textarea",attrs:{placeholder:"值"},validate:{required:{message:"请输入值"},maxlength:{rule:2048,message:"值不长于2048个字符"}}}}}},methods:{submit:function(){var e=this;this.isSubmitBtnDisabled=!0;var t="validate";return this.$refs.form.validateAll().then(function(){return t="getData",e.$refs.form.defaultMutate()}).then(function(t){e.formRst=JSON.stringify(t)}).catch(function(e){"validate"===t?i.default.info("校验不通过"):"getData"===t&&i.default.info(e.message)}).finally(function(){e.isSubmitBtnDisabled=!1}),!1}}},e.exports=t.default},mipe:function(e,t,n){var a=n("Adop");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("e9328e98",a,!0,{})},rskF:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper"},[n("demo",{attrs:{title:"基础用法",vertical:!0}},[n("div",{attrs:{slot:"demo"},slot:"demo"},[n("c-form",{ref:"form",attrs:{cells:e.cells}},[n("p",{staticClass:"control",attrs:{slot:"footer"},slot:"footer"},[n("button",{staticClass:"button is-primary",class:{"is-disabled":e.isSubmitBtnDisabled},on:{click:function(t){t.preventDefault(),e.submit(t)}}},[e._v("提交")])])]),e._v(" "),n("p",[e._v(e._s(e.formRst))])],1),e._v(" "),n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("表单的最简单用法。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code))])],1)],1)},l=[],s={render:a,staticRenderFns:l};t.a=s},uRKP:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n<template>\n   <c-form :cells=\"cells\" ref=\"form\">\n      <p class=\"control\" slot=\"footer\">\n        <button class=\"button is-primary\" :class=\"{ 'is-disabled': isSubmitBtnDisabled }\" @click.prevent=\"submit\">提交</button>\n      </p>\n   </c-form>\n   <p>{{formRst}}</p>\n</template>\n\n<script>\n  import message from 'components/message'\n\n  export default {\n    data () {\n      return {\n        isSubmitBtnDisabled: false,\n        formRst: ''\n      }\n    },\n    computed: {\n      cells () {\n        return {\n          name: {\n            label: '名称',\n            type: 'textfield',\n            attrs: {\n              placeholder: '名称'\n            },\n            validate: {\n              required: {\n                message: '请输入名称'\n              },\n              maxlength: {\n                rule: 32,\n                message: '名称不长于32个字符'\n              }\n            }\n          },\n          enable: {\n            label: '启用标志',\n            type: 'dropdown',\n            extra: {\n              options: [\n                { label: '启用', value: 1 },\n                { label: '禁用', value: 2 }\n              ]\n            },\n            validate: {\n            }\n          },\n          logo_dentry_id: {\n            label: 'logo',\n            type: 'logouploader',\n            validate: {\n              required: {\n                message: '请选择图片'\n              }\n            }\n          },\n          publish_time: {\n            label: '发布时间',\n            type: 'simpledatepicker',\n            attrs: {\n              placeholder: '发布时间'\n            },\n            validate: {\n            }\n          },\n          description: {\n            label: '描述',\n            type: 'textarea',\n            attrs: {\n              placeholder: '值'\n            },\n            validate: {\n              required: {\n                message: '请输入值'\n              },\n              maxlength: {\n                rule: 2048,\n                message: '值不长于2048个字符'\n              }\n            }\n          }\n        }\n      }\n    },\n    methods: {\n      submit () {\n        this.isSubmitBtnDisabled = true\n        let step = 'validate'\n        this.$refs.form.validateAll().then(() => {\n          step = 'getData'\n          return this.$refs.form.defaultMutate()\n        }).then(data => {\n          this.formRst = JSON.stringify(data)\n        }).catch(error => {\n          if (step === 'validate') {\n            message.info('校验不通过')\n          } else if (step === 'getData') {\n            message.info(error.message)\n          }\n        }).finally(() => {\n          this.isSubmitBtnDisabled = false\n        })\n        return false\n      }\n    }\n  }\n<\/script>\n",e.exports=t.default}});