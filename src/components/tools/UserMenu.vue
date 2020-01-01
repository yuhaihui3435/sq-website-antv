<template>
  <div class="user-wrapper">
    <div class="content-box" style="display: inline-flex;">
      <div style="display: flex;
    flex-direction: column;align-self: center;">
          <!-- <span class="action"> -->
          <icon-font type="icon-guoqi" style="fontSize:32px;cursor: pointer;" @click="changeLanguage('en')" v-show="currLanguage==='zh'"/>
          <!-- </span> -->
          <icon-font type="icon-meiguo" style="fontSize:32px;cursor: pointer;" @click="changeLanguage('zh')" v-show="currLanguage==='en'"/>
      </div>
      <!-- <notice-icon class="action"/> -->
      <!-- <a-button ghost>注册</a-button> -->
      <!-- <a-button ghost style="margin-left:12px">登录</a-button> -->
      <div style="display: flex;
    flex-direction: column-reverse;">
        <a-dropdown>
          <span
            class="action ant-dropdown-link user-dropdown-menu"
            v-if="!token"
            @click="loginRegist()"
          >
            <a-avatar class="avatar" size="default" :src="formatAvatar()" />
            <span>{{formatName()}}</span>
          </span>
          <span class="action ant-dropdown-link user-dropdown-menu" v-if="token">
            <a-avatar class="avatar" size="default" :src="formatAvatar()" />
            <span>{{formatName()}}</span>
          </span>
          <a-menu slot="overlay" class="user-dropdown-menu-wrapper" v-show="token">
            <a-menu-item key="1" v-show="token">
              <!-- <a-menu-item key="1"> -->
              <router-link :to="{ name: 'settings' }">
                <a-icon type="setting" />
                <span>账户设置</span>
              </router-link>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3" v-show="token">
              <a href="javascript:;" @click="handleLogout">
                <a-icon type="logout" />
                <span>退出登录</span>
              </a>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// import NoticeIcon from '@/components/NoticeIcon'
import { mapState, mapActions, mapGetters } from 'vuex'
import { mixinDevice } from '@/utils/mixin'
import { Icon } from 'ant-design-vue'
import defaultSetting from '@/config/defaultSettings'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: defaultSetting.iconfontUrl
})
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
  mixins: [mixinDevice],
  name: 'UserMenu',
  data() {
    return {
      defaultAvatarImg: defaultSetting.defaultAvatar,
      currLanguage:'zh',
    }
  },
  components: {
    IconFont
  },
  created(){
    let language=Vue.ls.get('language')
    this.currLanguage=language?language:'zh'
  },
  methods: {
    ...mapActions(['Logout']),
    // ...mapGetters(['nickname', 'avatar', 'token']),
    handleLogout() {
      const that = this
      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    },
    formatAvatar() {
      if (this.token) {
        //有token，判断有没有头像，有头像显示头像，没有显示默认图片
        if (this.avatar.avatar) {
          return this.avatar.avatar
        } else {
          return this.defaultAvatarImg
        }
      } else {
        return this.defaultAvatarImg
      }
    },
    changeLanguage(language) {
      Vue.ls.set('language',language)
      this.currLanguage=language
    },
    formatName() {
      if (this.token) {
        //有token，判断有没有头像，有头像显示头像，没有显示默认图片
        if (this.name) {
          return this.name
        } else {
          return '访客'
        }
      } else {
        return '登录&注册'
      }
    },
    loginRegist() {
      this.$router.push({
        name: 'regist'
      })
    }
  }
}
</script>
