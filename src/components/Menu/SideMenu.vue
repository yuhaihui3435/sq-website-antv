
<template>
  <!-- eslint-disable  -->
  <a-layout-sider
    :class="['sider', isDesktop() ? null : 'shadow', theme, fixSiderbar ? 'ant-fixed-sidemenu' : null ]"
    width="256px"
    :collapsible="collapsible"
    v-model="collapsed"
    :trigger="null"
  >
    <logo />

    <s-menu
      :collapsed="collapsed"
      :menu="menus"
      :theme="theme"
      :mode="mode"
      @select="onSelect"
      style="padding: 16px 0px;"
    ></s-menu>
  </a-layout-sider>
</template>

<script>
import Logo from '@/components/tools/Logo'
import SMenu from './index'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  name: 'SideMenu',
  components: { Logo, SMenu },
  mixins: [mixin, mixinDevice],
  props: {
    mode: {
      type: String,
      required: false,
      default: 'inline'
    },
    theme: {
      type: String,
      required: false,
      default: 'dark'
    },
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menus: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit('menuSelect', obj)
    }
  }
}
</script>
<style >
/* .ant-menu.ant-menu-dark .ant-menu-item-selected{
  background-color: unset !important;
}
.ant-menu-submenu > .ant-menu-submenu-content > .ant-menu-item-selected {
  background-color: unset;
}
.ant-menu-dark.ant-menu-horizontal > .ant-menu-item:hover,
.ant-menu-dark.ant-menu-horizontal > .ant-menu-submenu:hover {
  background-color: #3479b2;
}
.ant-menu-dark .ant-menu-submenu-title:hover {
  background-color: #3479b2 !important;
}
.ant-menu-dark .ant-menu-submenu-title {
  color: #3479b2;
  font-size: 16px;
}

.ant-menu-dark .ant-menu-item:hover {
  color: #fff;
}
.ant-menu-root > .ant-menu-submenu > .ant-menu-submenu-title {
  color: rgba(255, 255, 255, 0.65);
}
.ant-menu-submenu-popup.ant-menu-dark > .ant-menu-submenu-content > .ant-menu-item-selected {
  background-color: unset;
}
.ant-menu-submenu-popup.ant-menu-dark > .ant-menu-submenu-content > .ant-menu-item-selected > a {
  color: #3479b2;
}
.ant-menu-submenu-popup.ant-menu-dark > .ant-menu-submenu-content > .ant-menu-item-selected:hover{
  background-color: #3479b2;
}
.ant-menu-submenu-popup.ant-menu-dark > .ant-menu-submenu-content > .ant-menu-item-selected:hover >a {
  color: #fff;
}
.ant-menu-submenu-vertical > .ant-menu-submenu-title .ant-menu-submenu-arrow{
  right: unset !important;
}
.ant-menu-submenu-popup >.ant-menu-submenu-content>.ant-menu-item>a{
  color:#3479b2
}
.ant-menu-submenu-popup> .ant-menu-submenu-content > .ant-menu-item-selected {
  background-color: unset !important;
}
.ant-menu-submenu-popup> .ant-menu-submenu-content > .ant-menu-item-selected:hover>a{
  color:#fff;
}
.ant-menu-submenu-popup> .ant-menu-submenu-content > .ant-menu-item-selected:hover{
  background-color: #3479b2 !important;
} */
</style>