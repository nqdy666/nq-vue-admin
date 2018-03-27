<template>
  <div class="login-content">
    <div class="lc-block" id="l-login">
      <h3 class="title">管理系统</h3>

      <div class="field">
        <p class="control has-icons-left">
          <input type="text" placeholder="请输入用户名" class="input" v-model="username" autocomplete="off" />
          <span class="icon is-small is-left">
            <i class="fa fa-zhanghao"></i>
          </span>
        </p>
      </div>
      <div class="field">
        <p class="control has-icons-left">
          <input type="password" placeholder="请输入密码" @keyup.enter="login" class="input" v-model="password" autocomplete="off" />
          <span class="icon is-small is-left">
            <i class="fa fa-mima"></i>
          </span>
        </p>
      </div>
      <p>Hosted by <a href="https://pages.coding.me" style="font-weight: bold">Coding Pages</a></p>
      <button class="button is-danger self-btn" @click.prevent="login">
        <i class="fa fa-youjiantou"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { sGetTokens } from 'apis/uc'
import message from 'components/message'

export default {
  data () {
    return {
      username: 'admin',
      password: '123456'
    }
  },
  mapActions: [
    'user/setTokens'
  ],
  methods: {
    login () {
      if (!this.username) {
        message.info('请您输入用户名')
        return
      }
      if (!this.password) {
        message.info('请您输入密码')
        return
      }
      let token
      sGetTokens({
        login_name: this.username,
        password: this.password
      }).then(res => {
        token = res
        this.setTokens(token)
        if (token && token.access_token) {
          this.$nextTick(() => {
            const redirect = decodeURIComponent(this.$route.query.redirect || '/')
            this.$router.push(redirect)
          })
        }
      }).catch(e => {
        message.info(e.message)
      })
    }
  },
  watch: {
    '$route' (to, from) {
    }
  },
  components: {
  }
}
</script>

<style src="../styles/login"></style>
