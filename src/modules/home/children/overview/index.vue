<template>
  <div class="wrapper overview-wrapper">
    <h4 class="title is-4">概览</h4>
    <div class="box">
<vue-markdown>
### 特性
* 基于Vue2.0
* 基于Bulma 0.3
* 基于platojs框架
* IE10+
* 1024*768及以上分辨率
* ES6+语法
* 拥有功能完善的表格组件
* 拥有丰富的表单组件

### 依赖
* Node >= v7
* NPM >= v3
* Webpack v3

### Demos与文档
* [Demos与文档](http://admin.vue.qjzd.net)

### 项目地址
* [nd-vue-admin](https://github.com/nqdy666/nq-vue-admin)

### 使用
```
npm install
// 本地运行
npm run dev
// 打包
npm run build
```

### 其他
* [Vue](http://vuejs.org)
* [Bulma](http://bulma.io)
* [platojs](https://github.com/platojs)
</vue-markdown>
    </div>
  </div>
</template>

<script>
  import VueMarkdown from 'vue-markdown'

  export default {
    components: {
      'vue-markdown': VueMarkdown
    }
  }
</script>
<style lang="less">
  .overview-wrapper {
    ul {
      list-style: initial;
    }
    li {
      margin: 0px 10px 10px 40px;
    }
    h2 {
      margin: 10px 0;
    }
  }
</style>
