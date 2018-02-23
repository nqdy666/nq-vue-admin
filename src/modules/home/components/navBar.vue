<template>
  <div class="hero is-bold app-navbar">
    <div class="hero-head">
      <nav class="nav">
        <div class="nav-left">
          <a class="nav-item hero-brand touchable" href="javascript:;">
            <span class="icon fa fa-statistics"></span>
            <div><strong class="title is-6">管理系统</strong> </div>
          </a>
        </div>
        <div class="nav-center">
        </div>
        <div class="nav-right is-flex">
          <template v-if="userId">
            <span class="nav-item">
              <img :src="avatarUrl" @error="avatarLoadOnError" :atl="userName" />
            </span>
            <span class="nav-item">{{ userName }}</span>
            <a class="nav-item" @click="logout">注销</a>
          </template>
        </div>
      </nav>
    </div>
  </div>
</template>
<script>
  import { sFetchUser, sGetAvatarUrl } from 'apis/uc'
  import { SessionStorage } from 'utils/config'
  import { TOKENS, DEFAULT_AVATAR } from 'utils/constants'
  import message from 'components/message'

  export default {
    data () {
      return {
        userId: '',
        userName: '',
        avatarUrl: DEFAULT_AVATAR
      }
    },
    mounted () {
      const { user_id } = SessionStorage.get(TOKENS) || {}
      this.userId = user_id
      if (user_id) {
        this.avatarUrl = sGetAvatarUrl({ userId: user_id })
        sFetchUser(user_id).then(user => {
          this.userName = user.name
        }).catch(err => {
          message.info(`获取用户信息失败${err.message}`)
        })
      }
    },
    mapActions: [
      'user/delTokens'
    ],
    methods: {
      logout () {
        this.delTokens().then(() => {
          this.$router.replace('/login')
        })
      },
      avatarLoadOnError () {
        this.avatarUrl = DEFAULT_AVATAR
      }
    }
  }
</script>
<style lang="less">
  .app-navbar {
    .nav {
      position: inherit;
    }
    .nav-left .title {
      color: black;
    }
  }
</style>
