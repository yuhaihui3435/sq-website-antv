<template>
  <a-layout :class="['layout', device]">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
    >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
    ></side-menu>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{ paddingLeft: contentPaddingLeft, minHeight: '100vh' }"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
      />

      <!-- layout content -->
      <!-- <a-layout-content :style="{ height: '100%', margin: isMobile()?'0px 24px 0':'24px 24px 0', paddingTop: fixedHeader ? '64px' : '0' }"> -->
      <a-layout-content
        :style="{ height: '100%',background: '#353c47', paddingTop: fixedHeader ? '64px' : '0' }"
      >
        <!-- <multi-tab v-if="multiTab"></multi-tab> -->
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <a-layout-footer>
        <global-footer />
      </a-layout-footer>

      <!-- Setting Drawer (show in development mode) -->
      <!-- <setting-drawer v-if="!production"></setting-drawer> -->
    </a-layout>
    <!-- <div ref="container">
      <a-drawer
        width="300"
        placement="right"
        @close="onClose"
        :closable="false"
        :visible="visible"
        :getContainer="() => $refs.container"
      >
        <div class="setting-drawer-index-content">
          <h2>咨询流程</h2>
          <ul style="list-style-type:none;margin:0px;padding:0;">
            <li>1.选择咨询方式及时间</li>
            <li>2.选择咨询师</li>
            <li>3.联络客服确认预约信息并缴费</li>
            <li>4.如约咨询</li>
          </ul>
        </div>
        <div
          class="setting-drawer-index-handle"
          @click="consultationToggle"
          :style="{width:visible?'48px':'110px'}"
        >
          <span v-if="!visible">
            <a-icon type="question-circle" />咨询流程
          </span>
          <a-icon type="close" v-else />
        </div>
      </a-drawer>
    </div> -->
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
// import MultiTab from '@/components/MultiTab'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
// import SettingDrawer from '@/components/SettingDrawer'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    // MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter
    // SettingDrawer
  },
  data() {
    return {
      production: config.production,
      collapsed: false,
      menus: [],
      visible: true
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        return '256px'
      }
      return '80px'
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    }
  },
  created() {
    this.menus = this.mainMenu.find(item => item.path === '/').children
    this.collapsed = !this.sidebarOpened
  },
  mounted() {
    const vm = this
    setTimeout(() => {
      vm.visible = false
    }, 16)
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc() {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '256px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose() {
      this.collapsed = false
    },
    onClose() {
      this.visible = false
    },
    consultationToggle() {
      this.visible = !this.visible
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background-color: #1890ff;
  border-color: #1890ff;
  width: 110px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
  span {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
.setting-drawer-index-content {
}
</style>
