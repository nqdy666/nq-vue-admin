<template>
  <div class="wrapper box">
    <p class="title is-4">校验规则</p>
    <demo title="required":vertical="true">
      <div slot="desc">
        <p>必填。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.required }}</d-code>
    </demo>
    <demo title="minlength":vertical="true">
      <div slot="desc">
        <p>最小长度。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.minlength }}</d-code>
    </demo>
    <demo title="maxlength":vertical="true">
      <div slot="desc">
        <p>最大长度。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.maxlength }}</d-code>
    </demo>
    <demo title="min":vertical="true">
      <div slot="desc">
        <p>最小值。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.min }}</d-code>
    </demo>
    <demo title="max":vertical="true">
      <div slot="desc">
        <p>最大值。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.max }}</d-code>
    </demo>
    <demo title="count":vertical="true">
      <div slot="desc">
        <p>结果是数组，且恰好满足个数。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.count }}</d-code>
    </demo>
    <demo title="url":vertical="true">
      <div slot="desc">
        <p>url地址。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.url }}</d-code>
    </demo>
    <demo title="email":vertical="true">
      <div slot="desc">
        <p>邮箱。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.email }}</d-code>
    </demo>
    <demo title="phone":vertical="true">
      <div slot="desc">
        <p>手机号码。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.phone }}</d-code>
    </demo>
    <demo title="unsignInt":vertical="true">
      <div slot="desc">
        <p>正整数。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.unsignInt }}</d-code>
    </demo>
    <demo title="isInteger":vertical="true">
      <div slot="desc">
        <p>整数校验。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.isInteger }}</d-code>
    </demo>
    <demo title="rangeTime":vertical="true">
      <div slot="desc">
        <p>有效时间 起始时间和结束时间不为空。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.rangeTime }}</d-code>
    </demo>
    <demo title="weeklyRangeDay":vertical="true">
      <div slot="desc">
        <p>起始时间是周一，結束时间是周天。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.weeklyRangeDay }}</d-code>
    </demo>
    <demo title="minBeginTime":vertical="true">
      <div slot="desc">
        <p>最小的开始时间。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.minBeginTime }}</d-code>
    </demo>
    <demo title="reg":vertical="true">
      <div slot="desc">
        <p>支持正则表达式。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.reg }}</d-code>
    </demo>
    <demo title="func":vertical="true">
      <div slot="desc">
        <p>支持自定义函数校验。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.func }}</d-code>
    </demo>
    <demo title="注册全局自定义校验规则":vertical="true">
      <div slot="desc">
        <p>注册全局自定义校验规则。</p>
      </div>
      <d-code lang="auto" slot="code">{{ code.register }}</d-code>
    </demo>
  </div>
</template>

<script>
  import code from 'code/form/rules'

  export default {
    data () {
      return {
        code
      }
    }
  }
</script>
<style>
</style>
