<template>
  <a-locale-provider :locale="locale">
    
    <div id="app">
      <router-view />
    </div>
  </a-locale-provider>
</template>

<script>
import Vue from 'vue'
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'
import { axios } from '@/utils/request'
import { mapState, mapActions } from 'vuex'
import { ACCESS_TOKEN } from '@/store/mutation-types'
const serverUrl = process.env.VUE_APP_API_BASE_URL
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
  computed: {
    ...mapState({
      allConfig: state => state.app.allConfig
    })
  },
  metaInfo() {
    return {
      title: this.allConfig['websiteTitle'] ? this.allConfig['websiteTitle'] : 'loading...',
      meta: [
        {
          name: 'keywords',
          content: this.allConfig['websiteKeys'] ? this.allConfig['websiteKeys'] : ''
        },
        {
          name: 'description',
          content: this.allConfig['websiteDesc'] ? this.allConfig['websiteDesc'] : ''
        }
      ]
    }
  },
  data() {
    return {
      locale: zhCN,
      configData: {}
    }
  },
  mounted() {
    this.loadAllConfig()
    this.queryUserLogin()
  },
  methods: {
    loadAllConfig() {
      const vm = this
      axios({
        url: '/api/allConfig',
        method: 'post'
      })
        .then(res => {
          vm.$store.dispatch('LoadAllConfig', res)
        })
        .catch(err => {})
    },
    // 查询登录信息
    queryUserLogin() {
      if (Vue.ls.get(ACCESS_TOKEN)) {
        axios({
          url: 'api/user/getLogin',
          method: 'post',
          data: {}
        })
          .then(res => {
            this.$store.commit('SET_LOGIN', {
              login: res.userLogin
            })
            this.$store.commit('SET_INFO', {
              info: res.userInfo
            })
            if (res.userInfo.nickname) {
              this.$store.commit('SET_NAME', {
                name: res.userInfo.nickname
              })
            }
            if (res.userInfo.avatar) {
              this.$store.commit('SET_AVATAR', {
                avatar: serverUrl + '/cc/loadPic/' + res.userInfo.avatar
              })
            }
            // console.log('login', this.login)
            // console.log('info', this.info)
          })
          .catch(err => {})
      }
    },
    // 查询用户信息
    queryUserInfo(loginId) {
      console.log('登录id', loginId)
      axios({
        url: 'api/user/userInfo',
        method: 'post',
        data: { loginId: loginId }
      })
        .then(res => {
          console.log('用户结果', res)
          this.$store.commit('SET_INFO', {
            info: res
          })
          console.log('用户名', this.info.info.nickname)
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
.ant-menu-dark,
.ant-menu-dark .ant-menu-sub {
  background-color: #000;
}
.ant-menu-submenu .ant-menu-submenu-vertical {
  color: #000;
}
</style>
