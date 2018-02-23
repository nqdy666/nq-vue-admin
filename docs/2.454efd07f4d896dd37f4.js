webpackJsonp([2],{"+k0Y":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  max: {\n    rule: 100,\n    message: '最大值不能超过100'\n  }\n}\n// 校验规则源码\nfunction max (val, arg) {\n  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) <= +(arg))\n}\n",e.exports=t.default},"1Qrr":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  func: {\n    message: '根据函数校验规则填写提示信息'\n  }\n}\n// 校验规则源码\nfunction func (val, arg) {\n  return arg(val)\n}\n",e.exports=t.default},"4oJV":function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrapper box"},[n("p",{staticClass:"title is-4"},[e._v("校验规则")]),e._v(" "),n("demo",{attrs:{title:"required",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("必填。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.required))])],1),e._v(" "),n("demo",{attrs:{title:"minlength",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("最小长度。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.minlength))])],1),e._v(" "),n("demo",{attrs:{title:"maxlength",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("最大长度。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.maxlength))])],1),e._v(" "),n("demo",{attrs:{title:"min",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("最小值。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.min))])],1),e._v(" "),n("demo",{attrs:{title:"max",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("最大值。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.max))])],1),e._v(" "),n("demo",{attrs:{title:"count",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("结果是数组，且恰好满足个数。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.count))])],1),e._v(" "),n("demo",{attrs:{title:"url",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("url地址。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.url))])],1),e._v(" "),n("demo",{attrs:{title:"email",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("邮箱。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.email))])],1),e._v(" "),n("demo",{attrs:{title:"phone",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("手机号码。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.phone))])],1),e._v(" "),n("demo",{attrs:{title:"unsignInt",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("正整数。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.unsignInt))])],1),e._v(" "),n("demo",{attrs:{title:"isInteger",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("整数校验。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.isInteger))])],1),e._v(" "),n("demo",{attrs:{title:"rangeTime",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("有效时间 起始时间和结束时间不为空。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.rangeTime))])],1),e._v(" "),n("demo",{attrs:{title:"weeklyRangeDay",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("起始时间是周一，結束时间是周天。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.weeklyRangeDay))])],1),e._v(" "),n("demo",{attrs:{title:"minBeginTime",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("最小的开始时间。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.minBeginTime))])],1),e._v(" "),n("demo",{attrs:{title:"reg",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("支持正则表达式。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.reg))])],1),e._v(" "),n("demo",{attrs:{title:"func",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("支持自定义函数校验。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.func))])],1),e._v(" "),n("demo",{attrs:{title:"注册全局自定义校验规则",vertical:!0}},[n("div",{attrs:{slot:"desc"},slot:"desc"},[n("p",[e._v("注册全局自定义校验规则。")])]),e._v(" "),n("d-code",{attrs:{slot:"code",lang:"auto"},slot:"code"},[e._v(e._s(e.code.register))])],1)],1)},l=[],s={render:a,staticRenderFns:l};t.a=s},DrGh:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  reg: {\n    rule: /^[a-z_]+$/,\n    message: '只能小写英文或下划线'\n  }\n}\n// 校验规则源码\nfunction reg (val, arg) {\n  return arg.test(val)\n}\n",e.exports=t.default},"JKr/":function(e,t,n){var a=n("Qa9t");"string"==typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);n("rjj0")("e6f59900",a,!0,{})},Qa9t:function(e,t,n){t=e.exports=n("FZ+f")(),t.push([e.i,"",""])},Qej8:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  count: {\n    rule: 3,\n    message: '请上传三张图片'\n  }\n}\n// 校验规则源码\nfunction count (val, arg) {\n  return Array.isArray(val) && !isNaN(+(arg)) && val.filter(item => item).length === arg\n}\n",e.exports=t.default},RAWh:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  url: {\n    message: '请输入正确的链接地址'\n  }\n}\n// 校验规则源码\nfunction url (val) {\n  const reg = /^(?:(?:(?:https?|ftp):)?//)(?:S+(?::S*)?@)?(?:(?!(?:10|127)(?:.d{1,3}){3})(?!(?:169.254|192.168)(?:.d{1,3}){2})(?!172.(?:1[6-9]|2d|3[0-1])(?:.d{1,3}){2})(?:[1-9]d?|1dd|2[01]d|22[0-3])(?:.(?:1?d{1,2}|2[0-4]d|25[0-5])){2}(?:.(?:[1-9]d?|1dd|2[0-4]d|25[0-4]))|(?:(?:[a-z¡-￿0-9]-*)*[a-z¡-￿0-9]+)(?:.(?:[a-z¡-￿0-9]-*)*[a-z¡-￿0-9]+)*(?:.(?:[a-z¡-￿]{2,})).?)(?::d{2,5})?(?:[/?#]S*)?$/i\n  return reg.test(val)\n}\n",e.exports=t.default},"VWo/":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  unsignInt: {\n    message: '请输入正整数'\n  }\n}\n// 校验规则源码\nfunction unsignInt (val) {\n  return /^[1-9]d*|0$/.test(val) && val <= 0x7fffffff\n}\n",e.exports=t.default},YXRn:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  minBeginTime: {\n    rule: new Date().getTime(),\n    message: '活动开始时间必须大于等于当前时间'\n  }\n}\n// 校验规则源码\nfunction minBeginTime (val, arg) {\n  return val && !isNaN(+(arg)) && val.startime && val.startime >= arg\n}\n",e.exports=t.default},boPo:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  weeklyRangeDay: {\n    message: '开始时间必须是周一，结束时间必须周天，且刚好相差7天'\n  }\n}\n// 校验规则源码\nfunction weeklyRangeDay (val) {\n  return val && val.startime && val.endtime && moment(val.startime).isoWeekday() === 1 && moment(val.endtime).isoWeekday() === 7 && (val.endtime - val.startime === 1000 * 60 * 60 * 24 * 6)\n}\n",e.exports=t.default},br2V:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  isInteger: {\n    message: '请输入整数'\n  }\n}\n// 校验规则源码\nfunction isInteger (val) {\n  return /^(-?[1-9]d*|0)$/.test(val)\n}\n",e.exports=t.default},cMeY:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  maxlength: {\n    message: '不长于16个字符'\n  }\n}\n// 校验规则源码\nexport function maxlength (val, max) {\n  if (typeof val === 'number') {\n    val = val + ''\n  }\n  if (typeof val === 'string') {\n    return isInteger(max, 10) && val.length <= parseInt(max, 10)\n  } else if (Array.isArray(val)) {\n    return val.length <= parseInt(max, 10)\n  } else {\n    return false\n  }\n}\n",e.exports=t.default},eGYo:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  phone: {\n    message: '请输入手机号码'\n  }\n}\n// 校验规则源码\nfunction phone (val) {\n  return /^1[34578]d{9}$/.test(val)\n}\n",e.exports=t.default},gnpQ:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var l=n("n9Ia"),s=a(l),r=n("Qej8"),o=a(r),d=n("1Qrr"),i=a(d),u=n("n04y"),c=a(u),v=n("br2V"),f=a(v),_=n("+k0Y"),g=a(_),m=n("cMeY"),p=a(m),y=n("mfFn"),b=a(y),j=n("YXRn"),x=a(j),h=n("wFz4"),O=a(h),M=n("eGYo"),P=a(M),I=n("zccT"),w=a(I),k=n("DrGh"),T=a(k),N=n("VWo/"),R=a(N),z=n("RAWh"),A=a(z),V=n("boPo"),D=a(V),Q=n("jG2w"),Y=a(Q);t.default={required:s.default,count:o.default,func:i.default,email:c.default,isInteger:f.default,max:g.default,maxlength:p.default,min:b.default,minBeginTime:x.default,minlength:O.default,phone:P.default,rangeTime:w.default,reg:T.default,unsignInt:R.default,url:A.default,weeklyRangeDay:D.default,register:Y.default},e.exports=t.default},jG2w:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 注册\nimport Validator, { addRule } from 'plugins/validate'\naddRule('equal', function (val, arg) {\n  if (val === arg) return true\n  return false\n})\nVue.use(Validator)\n\n// 使用\nvalidate: {\n  equal: {\n    rule: 100\n    message: '值必须是100'\n  }\n}\n",e.exports=t.default},mfFn:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  min: {\n    rule: 100,\n    message: '不能小于100'\n  }\n}\n// 校验规则源码\nfunction min (val, arg) {\n  return !isNaN(+(val)) && !isNaN(+(arg)) && (+(val) >= +(arg))\n}\n",e.exports=t.default},n04y:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  email: {\n    message: '请输入正确的邮箱地址'\n  }\n}\n// 校验规则源码\nfunction email (val) {\n  return /^[w-]+(.[w-]+)*@([w-]+.)+[a-zA-Z]+$/.test(val)\n}\n",e.exports=t.default},n9Ia:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  required: {\n    message: '请输入名称'\n  }\n}\n// 校验规则源码\nfunction isObjectEmpty (obj) {\n  if (obj && obj.toString() === '[object Object]') {\n    let ret = true\n    for (const key of Object.keys(obj)) {\n      ret = ret && isObjectEmpty(obj[key])\n    }\n    return ret\n  } else {\n    return !obj\n  }\n}\n\nfunction required (val) {\n  if (Array.isArray(val)) {\n    if (val.length !== 0) {\n      return true\n    } else {\n      return false\n    }\n  } else if (typeof val === 'number' || typeof val === 'function') {\n    return true\n  } else if (typeof val === 'boolean') {\n    return val\n  } else if (typeof val === 'string') {\n    return val.trim().length > 0\n  } else if (val !== null && typeof val === 'object') {\n    return !isObjectEmpty(val)\n  } else if (val === null || val === undefined) {\n    return false\n  }\n}\n",e.exports=t.default},pfyO:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("gnpQ"),l=function(e){return e&&e.__esModule?e:{default:e}}(a);t.default={data:function(){return{code:l.default}}},e.exports=t.default},tC1s:function(e,t,n){"use strict";function a(e){n("JKr/")}Object.defineProperty(t,"__esModule",{value:!0});var l=n("pfyO"),s=n.n(l);for(var r in l)"default"!==r&&function(e){n.d(t,e,function(){return l[e]})}(r);var o=n("4oJV"),d=n("VU/8"),i=a,u=d(s.a,o.a,!1,i,null,null);t.default=u.exports},wFz4:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  minlength: {\n    rule: 10,\n    message: '不少于10个字符'\n  }\n}\n// 校验规则源码\nfunction minlength (val, min) {\n  if (typeof val === 'number') {\n    val = val + ''\n  }\n  if (typeof val === 'string') {\n    return isInteger(min, 10) && val.length >= parseInt(min, 10)\n  } else if (Array.isArray(val)) {\n    return val.length >= parseInt(min, 10)\n  } else {\n    return false\n  }\n}\n",e.exports=t.default},zccT:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default="\n// 使用例子\nvalidate: {\n  rangeTime: {\n    message: '请选择正确的有效时间'\n  }\n}\n// 校验规则源码\nfunction rangeTime (val) {\n  return val && val.startime && val.endtime && val.startime < val.endtime\n}\n",e.exports=t.default}});