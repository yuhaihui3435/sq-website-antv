<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!-- <a href="https://pro.loacg.com/docs/getting-started" target="_blank">
        <span class="action">
          <a-icon type="question-circle-o"></a-icon>
        </span>
      </a> -->
      <!-- <notice-icon class="action"/> -->
      <!-- <a-button ghost>注册</a-button> -->
      <!-- <a-button ghost style="margin-left:12px">登录</a-button> -->
      <a-dropdown >
        <span class="action ant-dropdown-link user-dropdown-menu">
          <a-avatar class="avatar" size="default" :src="token()?avatar():defaultAvatarImg"/>
          <span v-show="!isMobile()">{{ token()?nickname():'访客' }}</span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!-- <a-menu-item key="0">
            <router-link :to="{ name: 'center' }">
              <a-icon type="user"/>
              <span>个人中心</span>
            </router-link>
          </a-menu-item> -->
          <a-menu-item key="1" v-show="token()">
            <router-link :to="{ name: 'settings' }">
              <a-icon type="setting"/>
              <span>账户设置</span>
            </router-link>
          </a-menu-item>
          <!-- <a-menu-item key="4" v-show="!token()"> -->
          <a-menu-item key="4" v-show="true">
            <router-link :to="{ name: 'regist' }">
              <icon-font type="icon-zhuce" />
              <span>注册</span>
            </router-link>
          </a-menu-item>
          <!-- <a-menu-item key="5" v-show="!token()"> -->
          <a-menu-item key="5" v-show="true">
            <router-link :to="{ name: 'settings' }">
              <icon-font type="icon-denglu" />
              <span>登录</span>
            </router-link>
          </a-menu-item>
          <a-menu-item key="2">
            <router-link :to="{ name: 'settings' }">
              <icon-font type="icon-yuyan" />
              <span>英文</span>
            </router-link>
          </a-menu-item>
          <!-- <a-menu-item key="2" disabled>
            <a-icon type="setting"/>
            <span>测试</span>
          </a-menu-item> -->
          <a-menu-divider/>
          <a-menu-item key="3" v-show="token()">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout"/>
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
  </div>
</template>

<script>
// import NoticeIcon from '@/components/NoticeIcon'
import { mapActions, mapGetters } from 'vuex'
import {  mixinDevice } from '@/utils/mixin'
import { Icon } from 'ant-design-vue';
import defaultSetting from '@/config/defaultSettings'
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: defaultSetting.iconfontUrl,
})
export default {
  mixins:[mixinDevice],
  name: 'UserMenu',
  data(){
    return{
      defaultAvatarImg:defaultSetting.defaultAvatar
    }
  },
  components: {
    // NoticeIcon
    IconFont
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar','token']),
    handleLogout () {
      const that = this

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk () {
          return that.Logout({}).then(() => {
            window.location.reload()
          }).catch(err => {
            that.$message.error({
              title: '错误',
              description: err.message
            })
          })
        },
        onCancel () {
        }
      })
    }
  }
}
</script>
<style scoped>
</style>
