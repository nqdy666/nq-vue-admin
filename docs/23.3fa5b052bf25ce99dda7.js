webpackJsonp([23],{AATg:function(t,e,n){e=t.exports=n("FZ+f")(),e.push([t.i,"",""])},LBO8:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.default="\n<template>\n   <c-form :cells=\"cells\" ref=\"form\" :init-data=\"initialData\">\n      <p class=\"control\" slot=\"footer\">\n        <button class=\"button is-primary\" :class=\"{ 'is-disabled': isSubmitBtnDisabled }\" @click.prevent=\"submit\">提交</button>\n      </p>\n   </c-form>\n   <p>{{formRst}}</p>\n</template>\n\n<script>\n  import message from 'components/message'\n\n  export default {\n    data () {\n      return {\n        isSubmitBtnDisabled: false,\n        initialData: {},\n        formRst: ''\n      }\n    },\n    computed: {\n      cells () {\n        return {\n          description: {\n            label: '描述',\n            type: 'textfield',\n            attrs: {\n              placeholder: '描述'\n            },\n            validate: {\n            }\n          },\n          subform: {\n            label: '第二层',\n            type: 'subform',\n            className: 'box',\n            extra: {\n              cells: {\n                description: {\n                  label: '描述',\n                  type: 'textfield',\n                  attrs: {\n                    placeholder: '描述'\n                  },\n                  validate: {\n                    required: {\n                      message: '请输入描述'\n                    }\n                  }\n                },\n                subform: {\n                  label: '第三层',\n                  type: 'subform',\n                  className: 'box',\n                  extra: {\n                    horizontal: true,  // 水平布局\n                    cells: {\n                      description: {\n                        label: '描述',\n                        type: 'textfield',\n                        attrs: {\n                          placeholder: '描述'\n                        },\n                        validate: {\n                          maxlength: {\n                            rule: 256,\n                            message: '描述不长于256个字符'\n                          }\n                        }\n                      }\n                    }\n                  },\n                  validate: {\n                  }\n                }\n              }\n            },\n            validate: {\n              required: {\n                message: '请输入描述'\n              }\n            }\n          }\n        }\n      }\n    },\n    methods: {\n      submit () {\n        this.isSubmitBtnDisabled = true\n        let step = 'validate'\n        this.$refs.form.validateAll().then(() => {\n          step = 'getData'\n          return this.$refs.form.defaultMutate()\n        }).then(data => {\n          this.formRst = JSON.stringify(data)\n        }).catch(error => {\n          if (step === 'validate') {\n            message.info('校验不通过')\n          } else if (step === 'getData') {\n            message.info(error.message)\n          }\n        }).finally(() => {\n          this.isSubmitBtnDisabled = false\n        })\n        return false\n      }\n    }\n  }\n<\/script>\n",t.exports=e.default},fL1K:function(t,e,n){"use strict";function a(t){n("n8O7")}Object.defineProperty(e,"__esModule",{value:!0});var s=n("y/OK"),l=n.n(s);for(var i in s)"default"!==i&&function(t){n.d(e,t,function(){return s[t]})}(i);var r=n("gbD7"),o=n("VU/8"),d=a,u=o(l.a,r.a,!1,d,null,null);e.default=u.exports},gbD7:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"wrapper"},[n("demo",{attrs:{title:"嵌套表单",vertical:!0}},[n("div",{attrs:{slot:"demo"},slot:"demo"},[n("c-form",{ref:"form",attrs:{cells:t.cells,"init-data":t.initialData}},[n("p",{staticClass:"control",attrs:{slot:"footer"},slot:"footer"},[n("button",{staticClass:"button is-primary",class:{"is-disabled":t.isSubmitBtnDisabled},on:{click:function(e){e.preventDefault(),t.submit(e)}}},[t._v("提交")])])]),t._v(" "),n("p",[t._v(t._s(t.formRst))])],1),t._v(" "),n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[t._v("嵌套表单，子表单亦可以包含所有表单组件，子表单可以作为一个整理进行校验，表单可以嵌套多层。")])]),t._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[t._v(t._s(t.code))])],1)],1)},s=[],l={render:a,staticRenderFns:s};e.a=l},n8O7:function(t,e,n){var a=n("AATg");"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);n("rjj0")("4934c4ff",a,!0,{})},"y/OK":function(t,e,n){"use strict";function a(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var s=n("LBO8"),l=a(s),i=n("WB2H"),r=a(i);e.default={data:function(){return{code:l.default,isSubmitBtnDisabled:!1,initialData:{},formRst:""}},computed:{cells:function(){return{description:{label:"描述",type:"textfield",attrs:{placeholder:"描述"},validate:{}},subform:{label:"第二层",type:"subform",className:"box",extra:{cells:{description:{label:"描述",type:"textfield",attrs:{placeholder:"描述"},validate:{required:{message:"请输入描述"}}},subform:{label:"第三层",type:"subform",className:"box",extra:{horizontal:!0,cells:{description:{label:"描述",type:"textfield",attrs:{placeholder:"描述"},validate:{maxlength:{rule:256,message:"描述不长于256个字符"}}}}},validate:{}}}},validate:{required:{message:"请输入描述"}}}}}},methods:{submit:function(){var t=this;this.isSubmitBtnDisabled=!0;var e="validate";return this.$refs.form.validateAll().then(function(){return e="getData",t.$refs.form.defaultMutate()}).then(function(e){t.formRst=JSON.stringify(e)}).catch(function(t){"validate"===e?r.default.info("校验不通过"):"getData"===e&&r.default.info(t.message)}).finally(function(){t.isSubmitBtnDisabled=!1}),!1}}},t.exports=e.default}});