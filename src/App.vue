<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'
import { axios } from '@/utils/request'
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState({
      token: state => state.user.token,
      name: state => state.user.name,
      avatar: state => state.user.avatar,
      info: state => state.user.info,
      login: state => state.user.login
    })
  },
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  mounted() {},
  activated: function() {
    this.queryUserLogin()
  },
  methods: {
    // 查询用户信息
    queryUserLogin() {
      axios({
        url: 'api/user/getLogin',
        method: 'post',
        data: {}
      })
        .then(res => {
          console.log('userlogin结果', res)
          this.$store.commit('SET_LOGIN', {
            login: res.userLogin
          })
          console.log('登录结果', this.login)
          this.queryUserInfo()
        })
        .catch(err => {})
    },
    // 查询用户信息
    queryUserInfo() {
      console.log('登录id', this.login.login.loginId)
      axios({
        url: 'api/user/userInfo',
        method: 'post',
        data: { loginId: this.login.login.loginId }
      })
        .then(res => {
          console.log('用户结果', res)
          this.$store.commit('SET_INFO', {
            info: res
          })
          if (this.info.info.nickname) {
            this.$store.commit('SET_NAME', {
              name: this.info.info.nickname
            })
            console.log('用户名', this.name)
          }
          if (this.info.info.avatar) {
            this.$store.commit('SET_AVATAR', {
              avatar: serverUrl + '/cc/loadPic/' + this.info.info.avatar
            })
            console.log('头像', this.avatar.avatar)
          }
        })
        .catch(err => {})
    }
  }
}
</script>
<style>
#app {
  height: 100%;
}
</style>
